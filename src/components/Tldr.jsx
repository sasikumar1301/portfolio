import { about, facts, sections, stats } from "../data";
import { experienceLabel, useCountUp, useInView } from "../hooks";
import { Reveal } from "./ui";

function Stat({ value, label, hint, run }) {
  const n = useCountUp(value, run);
  return (
    <li className="col-6 col-md-3">
      <div className="stat h-100">
        <span className="stat-num" aria-hidden="true">{n}</span>
        <span className="visually-hidden">{value}</span>
        <span className="stat-label mono">{label}</span>
        {hint && <small className="stat-hint">{hint}</small>}
      </div>
    </li>
  );
}

export default function Tldr() {
  const [ref, seen] = useInView();
  return (
    <section id="tldr" className="container" aria-labelledby="tldr-title">
      <Reveal className="glass tldr">
        <p className="kicker">{`// ${sections.tldr.kicker}`}</p>
        <h2 id="tldr-title" className="h4 mb-4">{sections.tldr.title}</h2>
        <dl className="row facts">
          {facts.map((f) => (
            <div key={f.label} className="col-sm-6 col-lg-4">
              <dt className="mono">{f.label}</dt>
              <dd>{f.value ?? experienceLabel(f.since)}</dd>
            </div>
          ))}
        </dl>
        <p className="about">{about.join(" ")}</p>
        <ul ref={ref} className="row g-3 list-unstyled mb-0">
          {stats.map((s) => <Stat key={s.label} {...s} run={seen} />)}
        </ul>
      </Reveal>
    </section>
  );
}
