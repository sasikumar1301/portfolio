import { intro, profile } from "../data";

const external = { target: "_blank", rel: "noreferrer" };

export default function Intro() {
  return (
    <section className={`intro${profile.photo ? " has-photo" : ""}`} aria-labelledby="intro-title">
      <div>
        <h1 id="intro-title">{profile.name}</h1>
        <p className="intro-summary">{intro.summary}</p>
        <p>{intro.about}</p>
        <p>{intro.availability} <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        <p className="social-links">
          <a href={profile.linkedin} {...external}>LinkedIn ↗</a>
          <a href={profile.github} {...external}>GitHub ↗</a>
        </p>
      </div>
      {profile.photo && <img src={profile.photo} alt={profile.photoAlt} width="128" height="128" />}
    </section>
  );
}
