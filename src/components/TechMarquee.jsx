import { techStack } from "../data";
import { techIcons } from "./techIcons";
import { Reveal } from "./ui";

function TechItem({ item }) {
  const Icon = techIcons[item.icon];
  const color = item.color || "currentColor";

  return (
    <li className="tech-marquee-item">
      <span
        className={`tech-pill glass${item.level === "familiar" ? " familiar" : ""}`}
        style={{
          "--tech-color-dark": item.darkColor || color,
          "--tech-color-light": item.lightColor || color,
        }}
        title={item.level === "familiar" ? "Familiar" : undefined}
      >
        <Icon className="tech-icon" aria-hidden="true" focusable="false" />
        <span className="mono">{item.name}</span>
      </span>
    </li>
  );
}

export default function TechMarquee() {
  return (
    <section className="tech-marquee-section" aria-label="Tech stack">
      <Reveal>
        <p className="container tech-marquee-caption mono">{techStack.caption}</p>
        <div className="tech-marquee">
          {techStack.rows.map((row, rowIndex) => {
            const labelId = `tech-marquee-row-${rowIndex}`;

            return (
              <div
                className={`tech-marquee-row${row.direction === "right" ? " reverse" : ""}`}
                style={{ "--marquee-duration": row.duration }}
                key={row.label}
              >
                <p className="container tech-marquee-label mono" id={labelId}>{row.label}</p>
                <div className="tech-marquee-window">
                  <div className="tech-marquee-track">
                    {[false, true].map((duplicate) => (
                      <ul
                        className="tech-marquee-list"
                        aria-hidden={duplicate ? "true" : undefined}
                        aria-labelledby={duplicate ? undefined : labelId}
                        key={duplicate ? "duplicate" : "primary"}
                      >
                        {row.items.map((item) => <TechItem item={item} key={item.name} />)}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
