import { certifications, education, experience, profile, sections, ui } from "../data";
import { Reveal, Section } from "./ui";

export default function Experience() {
  return (
    <Section id="experience" {...sections.experience}>
      <div className="row g-4 g-lg-5">
        <div className="col-lg-7">
          <ol className="timeline list-unstyled">
            {experience.map((job) => (
              <li key={job.role + job.period} className="tl-item">
                <Reveal>
                  <p className="mono tl-period">{job.period}</p>
                  <h3 className="h5">
                    {job.role}
                    {profile.showCompany && <span className="text-body-secondary"> · {job.company}</span>}
                  </h3>
                  <ul className="tl-points">
                    {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <div className="col-lg-5 d-grid gap-3 align-content-start">
          {[[ui.education, education], [ui.certifications, certifications]].map(([title, items]) => (
            <Reveal key={title} className="glass p-4">
              <h3 className="kicker">{title}</h3>
              <ul className="list-unstyled d-grid gap-3 m-0">
                {items.map((it) => (
                  <li key={it.title}>
                    <strong className="d-block">{it.title}</strong>
                    <small className="text-body-secondary">{[it.org, it.period, it.note].filter(Boolean).join(" · ")}</small>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
