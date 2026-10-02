import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { quotes } from "../data/quotes";
import { motionConfig } from "../utils/motionConfig";
import { ChatMessage } from "./ChatMessage";
import { HistoryTransition } from "./HistoryTransition";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ChatHistory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const messages = gsap.utils.toArray<HTMLElement>(".chat-message", section);
      const transitionCards = gsap.utils.toArray<HTMLElement>(".transition-card", section);
      const dateParts = gsap.utils.toArray<HTMLElement>(".transition-date > *", section);
      const river = section.querySelector<SVGElement>(".transition-river");

      gsap.set([...messages, ...transitionCards, ...dateParts], { autoAlpha: 0 });
      gsap.set(river, { autoAlpha: 0, scaleX: 0.12, scaleY: 0.45, transformOrigin: "100% 100%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${motionConfig.chatSectionScrollVh}%`,
          pin: true,
          scrub: motionConfig.scrubSmoothing,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      messages.forEach((message, index) => {
        tl.addLabel(`quote-${String(index + 1).padStart(2, "0")}`)
          .fromTo(
            message,
            { autoAlpha: 0, y: 35, scale: 0.97 },
            { autoAlpha: 1, y: 0, scale: 1, duration: motionConfig.messageEnterUnits },
          );

        if (message.dataset.message === "lu-xun") {
          const ellipsis = message.querySelector(".chat-message__ellipsis");
          const quote = message.querySelector("blockquote");
          tl.fromTo(ellipsis, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, "<")
            .to({}, { duration: 0.55 })
            .to(ellipsis, { autoAlpha: 0, duration: 0.25 })
            .fromTo(quote, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, "<0.05");
        }

        tl.to({}, { duration: motionConfig.messageHoldUnits }).to(message, {
          autoAlpha: 0,
          y: -30,
          scale: 0.98,
          duration: motionConfig.messageExitUnits,
        });
      });

      const labels = ["april", "paris-alert", "diplomatic-warning", "student-meeting"];
      transitionCards.forEach((card, index) => {
        tl.addLabel(labels[index])
          .fromTo(card, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.6 })
          .to({}, { duration: index === 2 ? 1.15 : 0.8 })
          .to(card, { autoAlpha: 0, y: -22, duration: 0.45 });
      });

      tl.addLabel("silence").to({}, { duration: 0.65 }).addLabel("may-fourth");
      dateParts.forEach((part, index) => {
        tl.fromTo(part, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.42 }, `>-${index ? 0.16 : 0}`);
      });
      tl.to({}, { duration: 1.1 }).addLabel("river-transition").to(river, {
        autoAlpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 1.35,
        ease: "power1.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="chat-history" aria-labelledby="chat-title">
      <header className="chapter-header">
        <span>SECTION 01</span>
        <div>
          <h2 id="chat-title">思想正在发送……</h2>
          <p>1915 — 1919</p>
        </div>
      </header>
      <div className="chat-stage">
        {quotes.map((quote) => <ChatMessage quote={quote} key={quote.id} />)}
        <HistoryTransition />
      </div>
    </section>
  );
}
