import { FiArrowUpRight, FiLock, FiX } from "react-icons/fi";
import { earlierWork, projects, sections, ui } from "../data";
import { spotlight, usesSkill } from "../hooks";
import { Reveal, Section } from "./ui";

const MAX_CHIPS = 5;

export default function Projects({ filter, setFilter, onOpen }) {
  const isOn = (s) => filter && s.toLowerCase() === filter.toLowerCase();
  return (
    <Section id="projects" {...sections.projects}>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <span className="badge-hud mono"><FiLock aria-hidden="true" /> {ui.confidential}</span>
        {filter && (
          <button type="button" className="badge-hud badge-filter mono" onClick={() => setFilter(null)} aria-label={`Clear highlight: ${filter}`}>
            {ui.filterOn}: {filter} <FiX aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="row g-3 g-lg-4">
        {projects.map((p, i) => {
          const state = !filter ? "" : usesSkill(p, filter) ? " is-match" : " is-dim";
          const extra = p.stack.length - MAX_CHIPS;
          return (
            <Reveal key={p.slug} className="col-md-6 col-xl-4" delay={(i % 3) * 0.06}>
              <article className={`card-hud h-100${state}`} onMouseMove={spotlight}>
                <p className="mono tag">{p.tag}</p>
                <h3 className="card-title">
                  {/* Real href keeps middle-click / copy-link working; JS just avoids the jump. */}
                  <a href={`#/p/${p.slug}`} className="stretched-link" onClick={(e) => { e.preventDefault(); onOpen(p.slug); }}>{p.title}</a>
                </h3>
                <p className="card-text">{p.summary}</p>
                <ul className="chips mt-auto" aria-label="Stack">
                  {p.stack.slice(0, MAX_CHIPS).map((s) => <li key={s} className={`chip${isOn(s) ? " on" : ""}`}>{s}</li>)}
                  {extra > 0 && <li className="chip">+{extra}</li>}
                </ul>
                <span className="more mono" aria-hidden="true">{ui.openCase} →</span>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-5">
        <h3 className="kicker">{ui.earlierTitle}</h3>
        <ul className="earlier list-unstyled">
          {earlierWork.filter((w) => w.public !== false).map((w) => (
            <li key={w.url}>
              <a href={w.url} target="_blank" rel="noopener noreferrer">
                {w.title}{w.note && <small> · {w.note}</small>}<FiArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
