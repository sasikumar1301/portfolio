import { projects, sections, skills, ui } from "../data";
import { usesSkill } from "../hooks";
import { Reveal, Section } from "./ui";

const countFor = (skill) => projects.filter((p) => usesSkill(p, skill)).length;

export default function Skills({ filter, setFilter }) {
  return (
    <Section id="skills" {...sections.skills}>
      <p className="text-body-secondary mb-4" aria-live="polite">
        {filter ? ui.skillMatches(countFor(filter), filter) : ui.skillsHint}
      </p>
      <div className="row g-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} className="col-md-6 col-lg-4" delay={i * 0.05}>
            <div className="glass skill-group h-100">
              <h3 className="mono">{g.group}</h3>
              <ul className="chips">
                {g.items.map((s) => {
                  const n = countFor(s);
                  const on = filter === s;
                  return (
                    <li key={s}>
                      {n ? (
                        <button type="button" className={`chip chip-btn${on ? " on" : ""}`} aria-pressed={on} onClick={() => setFilter(on ? null : s)}>
                          {s}
                          <span className="chip-count">
                            {n}<span className="visually-hidden"> {ui.projectCount(n)}</span>
                          </span>
                        </button>
                      ) : (
                        <span className="chip">{s}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
