import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { timelineEvents } from "../data/timeline";
import { getHorizontalDistance } from "../utils/animations";
import { motionConfig } from "../utils/motionConfig";
import { HistoryEvent } from "./HistoryEvent";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HistoryRiver() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const timelineTrack = track.current;
      if (!section || !timelineTrack || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const horizontalTween = gsap.to(timelineTrack, {
        x: () => -getHorizontalDistance(timelineTrack.scrollWidth, window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getHorizontalDistance(timelineTrack.scrollWidth, window.innerWidth) + window.innerHeight * motionConfig.historyScrollPaddingVh}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".history-event", timelineTrack).forEach((event) => {
        const pieces = event.querySelectorAll("time, h3, .history-event__body, .history-event__keywords, .source-links");
        gsap.fromTo(
          pieces,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            scrollTrigger: {
              trigger: event,
              containerAnimation: horizontalTween,
              start: "left 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      let resizeTimer = 0;
      const refresh = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
      };
      window.addEventListener("resize", refresh);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        window.removeEventListener("resize", refresh);
        window.clearTimeout(resizeTimer);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="history-river" aria-labelledby="river-title">
      <div ref={track} className="timeline-track">
        <div className="river-opening">
          <span>SECTION 02 / JAN — JUN</span>
          <h2 id="river-title"><strong>1919</strong>历史开始流动</h2>
          <p>SCROLL THROUGH HISTORY</p>
        </div>
        {timelineEvents.map((event, index) => <HistoryEvent event={event} index={index} key={event.id} />)}
        <svg className="history-river__svg" viewBox="0 0 12000 600" preserveAspectRatio="none" aria-hidden="true">
          <path className="history-river__shadow" d="M0 322 C500 180 830 430 1320 302 S2200 185 2680 338 S3600 420 4150 272 S5100 170 5750 332 S6680 450 7270 300 S8200 160 8880 330 S9850 440 10500 286 S11400 178 12000 294" />
          <path className="history-river__main" d="M0 302 C500 160 830 410 1320 282 S2200 165 2680 318 S3600 400 4150 252 S5100 150 5750 312 S6680 430 7270 280 S8200 140 8880 310 S9850 420 10500 266 S11400 158 12000 274" />
        </svg>
      </div>
    </section>
  );
}
