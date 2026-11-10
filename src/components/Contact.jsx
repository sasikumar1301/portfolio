import { useState } from "react";
import { FiCheck, FiCopy, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { profile, sections, ui } from "../data";
import { copyToClipboard } from "../hooks";
import { Reveal, Section } from "./ui";

const env = import.meta.env;
const KEYS = [env.VITE_EMAILJS_SERVICE_ID, env.VITE_EMAILJS_TEMPLATE_ID, env.VITE_EMAILJS_PUBLIC_KEY];
const EMPTY = { name: "", email: "", message: "", website: "" }; // "website" is the honeypot
const ext = { target: "_blank", rel: "noopener noreferrer" };

function validate({ name, email, message }) {
  const errs = {};
  if (name.trim().length < 2) errs.name = ui.errors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errs.email = ui.errors.email;
  if (message.trim().length < 10) errs.message = ui.errors.message;
  return errs;
}

function Field({ name, label, error, as: Tag = "input", ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={`f-${name}`} className="form-label mono small">{label}</label>
      <Tag id={`f-${name}`} name={name} className={`form-control${error ? " is-invalid" : ""}`}
        aria-invalid={!!error} aria-describedby={error ? `e-${name}` : undefined} required {...rest} />
      {error && <div id={`e-${name}`} className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | mailto
  const [copied, setCopied] = useState(false);
  const bind = (name) => ({ name, value: form[name], error: errors[name], onChange: (e) => setForm({ ...form, [name]: e.target.value }) });
  const copyEmail = () => copyToClipboard(profile.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }, () => {});

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
    if (form.website) return setStatus("sent"); // honeypot filled by a bot: fake success, send nothing
    if (!KEYS.every(Boolean)) {
      setStatus("mailto"); // no EmailJS keys configured: hand off to the visitor's mail app
      const body = encodeURIComponent(`${form.message}\n\n${form.name} <${form.email}>`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(ui.mailSubject(form.name))}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(KEYS[0], KEYS[1], { from_name: form.name, reply_to: form.email, message: form.message }, { publicKey: KEYS[2] });
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" {...sections.contact}>
      <div className="row g-4">
        <Reveal className="col-lg-7">
          <form className="glass p-4" onSubmit={submit} noValidate>
            <div className="row">
              <div className="col-sm-6"><Field label={ui.form.name} autoComplete="name" {...bind("name")} /></div>
              <div className="col-sm-6"><Field label={ui.form.email} type="email" autoComplete="email" {...bind("email")} /></div>
            </div>
            <Field label={ui.form.message} as="textarea" rows={5} {...bind("message")} />
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-website">Website</label>
              <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            </div>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <button type="submit" className="btn btn-hud" disabled={status === "sending"}>
                <FiSend aria-hidden="true" /> {status === "sending" ? ui.form.sending : ui.form.send}
              </button>
              <p role="status" className={`form-status mb-0 ${status}`}>
                {status === "sent" && ui.sent}
                {status === "mailto" && ui.mailtoNote}
                {status === "error" && <>{ui.failed} <a href={`mailto:${profile.email}`}>{profile.email}</a></>}
              </p>
            </div>
          </form>
        </Reveal>
        <Reveal className="col-lg-5">
          <div className="glass p-4 h-100 d-grid gap-3 align-content-start">
            <p className="mb-0">{ui.contactBlurb}</p>
            <div className="email-row">
              <a href={`mailto:${profile.email}`} className="mono">{profile.email}</a>
              <button type="button" className="btn-icon" onClick={copyEmail} aria-label={ui.form.copy}>
                {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              </button>
              <span role="status" className="visually-hidden">{copied ? ui.form.copied : ""}</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <a className="btn btn-ghost" href={profile.linkedin} {...ext}><FiLinkedin aria-hidden="true" /> LinkedIn</a>
              <a className="btn btn-ghost" href={profile.github} {...ext}><FiGithub aria-hidden="true" /> GitHub</a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
