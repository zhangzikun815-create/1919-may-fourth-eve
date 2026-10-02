import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ScrollHint } from "./ScrollHint";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .from(".intro__year", { opacity: 0, scale: 0.96, duration: 1.2, delay: 0.4 })
        .from(".intro__title", { opacity: 0, y: 12, duration: 0.8 }, "-=0.35")
        .from(".intro .scroll-hint", { opacity: 0, duration: 0.8 }, "-=0.2");

      gsap.to(".intro__content", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom 35%",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="intro" aria-labelledby="intro-title">
      <div className="intro__index">SECTION 00 / PROLOGUE</div>
      <div className="intro__content">
        <p className="intro__year">1919</p>
        <h1 id="intro-title" className="intro__title">五四前夜</h1>
        <p className="intro__subtitle">当思想成为消息，当历史开始流动</p>
      </div>
      <ScrollHint label="进入 1919" />
    </section>
  );
}
