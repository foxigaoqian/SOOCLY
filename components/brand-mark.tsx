export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "soocly-mark soocly-mark--compact" : "soocly-mark"} aria-label="SOOCLY">
      <span className="soocly-mark__letter">S</span>
      <span className="soocly-mark__oo" aria-hidden="true">
        <span className="soocly-mark__circle soocly-mark__circle--outline" />
        <span className="soocly-mark__circle soocly-mark__circle--fill" />
      </span>
      <span className="soocly-mark__letter">CLY</span>
    </span>
  );
}
