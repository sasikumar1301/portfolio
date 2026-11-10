import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { hero, profile, ui } from "../data";
import { reducedMotion } from "../hooks";

export default function Hero() {
  const still = reducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (still) return;
    const t = setInterval(() => setI((n) => (n + 1) % hero.roles.length), 2600);
    return () => clearInterval(t);
  }, [still]);

  return (
    <section id="top" className="hero container" aria-labelledby="hero-title">
      <div className="row align-items-center gy-5">
        <div className="col-lg-7">
          <p className="kicker">{`// ${hero.kicker}`}</p>
          <p className="status-chip mono">
            <span className="dot" aria-hidden="true" /> {hero.status}
          </p>
          <h1 id="hero-title" className="display-title">
            {hero.lead} <span className="grad">{hero.accent}</span>
          </h1>
          <p className="role-line mono">
            <span className="visually-hidden">{hero.roles.join(", ")}</span>
            <span aria-hidden="true">{"> "}</span>
            {still ? (
              <span aria-hidden="true">{hero.roles.join(" · ")}</span>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <m.span key={i} aria-hidden="true" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  {hero.roles[i]}
                </m.span>
              </AnimatePresence>
            )}
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="hero-sub">{hero.sub}</p>
          <div className="d-flex flex-wrap gap-2">
            <a className="btn btn-hud" href="#projects">{ui.ctas.work} <FiArrowRight aria-hidden="true" /></a>
            <a className="btn btn-ghost" href={profile.resumeUrl} download><FiDownload aria-hidden="true" /> {ui.ctas.resume}</a>
            <a className="btn btn-ghost" href="#contact"><FiMail aria-hidden="true" /> {ui.ctas.contact}</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="photo-wrap mx-auto">
            <div className="photo-frame">
              <img src={profile.photo} alt={hero.photoAlt} width="380" height="380" decoding="async" />
            </div>
            {hero.chips.map((c, k) => (
              <span key={c} className={`float-chip mono c${k}`} style={{ "--d": `${k * -1.2}s` }} aria-hidden="true">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
