import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Finale() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".finale__line", {
      autoAlpha: 0,
      y: 24,
      stagger: 0.22,
      duration: 0.8,
      scrollTrigger: { trigger: root.current, start: "top 58%", toggleActions: "play none none reverse" },
    });
  }, { scope: root });

  return (
    <section ref={root} className="finale" aria-labelledby="finale-title">
      <span className="finale__index">SECTION 03 / EPILOGUE</span>
      <p className="finale__year finale__line">1919</p>
      <h2 id="finale-title" className="finale__line">五四运动并不是<br />突然发生的一天。</h2>
      <div className="finale__copy finale__line">
        <p>它之前，<br />思想已经流动多年。</p>
        <p>它之后，<br />历史继续向前。</p>
      </div>
      <footer className="finale__line"><span>1915 — 1919</span><i /><small>THE END<br />/ 继续向前</small></footer>
    </section>
  );
}
