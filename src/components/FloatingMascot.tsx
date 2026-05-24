import { useEffect, useState } from "react";

const emojis = ["🐱", "🦄", "👾", "🛸", "🤖", "⚡"];

export default function FloatingMascot() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % emojis.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <button
      aria-label="Floating mascot"
      title="Click to change"
      onClick={() => setIdx((i) => (i + 1) % emojis.length)}
      className="floating-mascot"
    >
      <span className="text-2xl" style={{ lineHeight: 1 }}>
        {emojis[idx]}
      </span>
    </button>
  );
}
