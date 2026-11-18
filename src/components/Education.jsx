import { certifications, education, sections, ui } from "../data";

function CompactList({ title, items }) {
  return (
    <div>
      <h3 className="list-heading">{title}</h3>
      <ul className="compact-list list-unstyled">
        {items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{[item.org, item.period, item.note].filter(Boolean).join(" · ")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="content-section" aria-labelledby="education-title">
      <h2 id="education-title" className="section-label">{sections.education}</h2>
      <div className="education-grid">
        <CompactList title={ui.education} items={education} />
        <CompactList title={ui.certifications} items={certifications} />
      </div>
    </section>
  );
}
