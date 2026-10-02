import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollProgress() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fill = root.current.querySelector<HTMLElement>(".scroll-progress__fill");
    const label = root.current.querySelector<HTMLElement>(".scroll-progress__label");
    if (!fill || !label) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(fill, { scaleY: self.progress });
        label.textContent = self.progress < 0.47 ? "1915 ↓ 1919" : "1919.01 → 1919.06";
      },
    });
    return () => trigger.kill();
  }, { scope: root });

  return (
    <div ref={root} className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__label">1915 ↓ 1919</span>
      <i><b className="scroll-progress__fill" /></i>
    </div>
  );
}
