import { FiDownload } from "react-icons/fi";
import { about, profile, sections, ui } from "../data";
import { experienceLabel } from "../hooks";

export default function About() {
  const experience = experienceLabel(profile.startDate);
  return (
    <section id="about" className="content-section" aria-labelledby="about-title">
      <h2 id="about-title" className="section-label">{sections.about}</h2>
      <div className="about-copy">
        {profile.photo && <img className="about-photo" src={profile.photo} alt="" width="64" height="64" />}
        {about.map((paragraph) => <p key={paragraph}>{paragraph.replace("{experience}", experience)}</p>)}
      </div>
      <p className="availability"><span aria-hidden="true" />{profile.location} · {profile.availability}</p>
      <a className="text-link" href={profile.resumeUrl} download><FiDownload aria-hidden="true" />{ui.resume}</a>
    </section>
  );
}
