interface ScrollHintProps {
  label?: string;
}

export function ScrollHint({ label = "SCROLL" }: ScrollHintProps) {
  return (
    <div className="scroll-hint" aria-hidden="true">
      <span className="scroll-hint__arrow">↓</span>
      <span>{label}</span>
    </div>
  );
}
