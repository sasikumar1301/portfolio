import { useEffect, useState } from "react";
import { reducedMotion } from "../hooks";

// Stages light up one after another, hold, then loop. Fully driven by the pipeline[] array.
export default function Pipeline({ stages, label }) {
  const still = reducedMotion();
  const [step, setStep] = useState(still ? stages.length : 0);

  useEffect(() => {
    if (still) return;
    const t = setInterval(() => setStep((s) => (s > stages.length + 1 ? 0 : s + 1)), 600);
    return () => clearInterval(t);
  }, [still, stages.length]);

  return (
    <ol className="pipeline" aria-label={label}>
      {stages.map((s, i) => (
        <li key={s.name} className={`stage${i < step ? " lit" : ""}${i === step - 1 ? " now" : ""}`}>
          <span className="stage-n mono" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <strong>{s.name}</strong>
          {s.note && <small>{s.note}</small>}
        </li>
      ))}
    </ol>
  );
}
