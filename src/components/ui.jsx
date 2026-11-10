import { m } from "framer-motion";
import { reducedMotion } from "../hooks";

// Fade-and-rise on first scroll into view. Static under prefers-reduced-motion.
export function Reveal({ children, className, delay = 0 }) {
  if (reducedMotion()) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

export function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="section container" aria-labelledby={`${id}-title`}>
      <Reveal>
        <p className="kicker">{`// ${kicker}`}</p>
        <h2 id={`${id}-title`} className="section-title">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
