import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FiSearch } from "react-icons/fi";
import { nav, profile, projects, ui } from "../data";
import { copyToClipboard } from "../hooks";

const P = ui.palette;
const download = (href) => Object.assign(document.createElement("a"), { href, download: "" }).click();
const newTab = (url) => window.open(url, "_blank", "noopener");

// Subsequence match: "dsp" matches "Durable job Scheduling Platform".
function fuzzy(q, text) {
  let at = 0;
  const t = text.toLowerCase();
  for (const ch of q.replace(/\s+/g, "")) if (!(at = t.indexOf(ch, at) + 1)) return false;
  return true;
}

export default function Palette({ show, onClose, actions }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [note, setNote] = useState("");
  const pending = useRef(null);

  // Built from data.js, so new sections and projects show up automatically.
  const all = [
    ...nav.map((n) => ({ id: `go-${n.id}`, group: P.go, label: n.label, run: () => actions.go(n.id) })),
    ...projects.map((p) => ({ id: `p-${p.slug}`, group: P.open, label: p.title, run: () => actions.open(p.slug) })),
    { id: "resume", group: P.act, label: P.resume, run: () => download(profile.resumeUrl) },
    { id: "email", group: P.act, label: P.email, keep: true, run: () => copyToClipboard(profile.email).then(() => setNote(ui.form.copied), () => setNote(profile.email)) },
    { id: "theme", group: P.act, label: P.theme, keep: true, run: actions.theme },
    { id: "linkedin", group: P.act, label: P.linkedin, run: () => newTab(profile.linkedin) },
    { id: "github", group: P.act, label: P.github, run: () => newTab(profile.github) },
  ];
  const needle = q.trim().toLowerCase();
  const rank = (a) => (needle && !a.label.toLowerCase().includes(needle) ? 1 : 0); // plain substring hits first
  const results = all.filter((a) => !needle || fuzzy(needle, `${a.group} ${a.label}`)).sort((a, b) => rank(a) - rank(b));
  const current = results[Math.min(active, results.length - 1)];

  useEffect(() => {
    if (current) document.getElementById(`opt-${current.id}`)?.scrollIntoView({ block: "nearest" });
  }, [current]);

  // Navigating actions run after the dialog has closed, so focus restore and scroll lock can't fight them.
  const run = (a) => (a.keep ? a.run() : ((pending.current = a.run), onClose()));

  const onKeyDown = (e) => {
    const n = results.length;
    if (n && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      setActive((i) => (Math.min(i, n - 1) + (e.key === "ArrowDown" ? 1 : n - 1)) % n);
    } else if (e.key === "Enter" && current) {
      e.preventDefault();
      run(current);
    }
  };

  const onExited = () => {
    pending.current?.();
    pending.current = null;
    setQ(""); setActive(0); setNote("");
  };

  return (
    <Modal show={show} onHide={onClose} onExited={onExited} className="palette" dialogClassName="palette-dialog"
      aria-label="Command palette" restoreFocusOptions={{ preventScroll: true }}>
      <div className="palette-search">
        <FiSearch aria-hidden="true" />
        <input autoFocus className="palette-input" role="combobox" aria-expanded="true" aria-controls="palette-list"
          aria-autocomplete="list" aria-activedescendant={current ? `opt-${current.id}` : undefined}
          aria-label={P.placeholder} placeholder={P.placeholder} spellCheck="false" autoComplete="off"
          value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} onKeyDown={onKeyDown} />
        <kbd>Esc</kbd>
      </div>
      <ul id="palette-list" role="listbox" aria-label="Commands" className="palette-list">
        {results.map((a, i) => (
          <li key={a.id} id={`opt-${a.id}`} role="option" aria-selected={a === current} className={a === current ? "active" : undefined}
            onMouseMove={() => setActive(i)} onClick={() => run(a)}>
            <span className="group mono">{a.group}</span>
            <span>{a.label}</span>
          </li>
        ))}
        {!results.length && <li role="option" aria-disabled="true" aria-selected="false" className="empty">{P.empty}</li>}
      </ul>
      <p role="status" className="palette-note mono">{note}</p>
    </Modal>
  );
}
