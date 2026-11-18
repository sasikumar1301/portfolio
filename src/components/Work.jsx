import { earlierWork, projects } from "../data";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title">
      <h2 id="work-title">Work</h2>
      <p>These come from my job, so I've left out client names and screenshots.</p>
      <div className="project-list">
        {projects.map((project) => (
          <article id={project.slug} key={project.slug}>
            <h3><a className="project-link" href={`#${project.slug}`}>{project.title}</a></h3>
            <p className="meta">{project.stack.join(" · ")}</p>
            <p>{project.description}</p>
            <ul>{project.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="meta pipeline">{project.pipeline}</p>
          </article>
        ))}
      </div>
      <div className="earlier-work">
        <h3>Earlier work</h3>
        <ul>
          {earlierWork.map((item) => (
            <li key={item.title}>
              <a href={item.url} target="_blank" rel="noreferrer">{item.title} ↗</a>
              {item.note && <span> ({item.note})</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
