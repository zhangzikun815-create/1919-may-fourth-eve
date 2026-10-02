import { timelinePrelude } from "../data/timeline";
import { SourceLink } from "./SourceLink";

export function HistoryTransition() {
  return (
    <div className="history-transition" aria-label="从思想进入事件">
      <div className="transition-card transition-card--april">
        <span>{timelinePrelude.april.year}</span><small>{timelinePrelude.april.month}</small>
      </div>
      <div className="transition-card transition-card--paris">
        <span className="live-dot" />
        <small>{timelinePrelude.paris.location} / {timelinePrelude.paris.subject}</small>
        <strong>{timelinePrelude.paris.message}</strong>
        <SourceLink ids={timelinePrelude.paris.sourceIds} />
      </div>
      <div className="transition-card transition-card--alert">
        <time>{timelinePrelude.alert.date.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</time>
        <strong>{timelinePrelude.alert.title}</strong>
        <span>{timelinePrelude.alert.person}</span>
        <p>{timelinePrelude.alert.description}</p>
        <SourceLink ids={timelinePrelude.alert.sourceIds} />
      </div>
      <div className="transition-card transition-card--meeting">
        {timelinePrelude.meetingSteps.map((step, index) => (
          <span key={step}>{index > 0 && <i>↓</i>}{index === timelinePrelude.meetingSteps.length - 1 ? <strong>{step}</strong> : step}</span>
        ))}
      </div>
      <div className="transition-date">
        <span className="transition-date__year">{timelinePrelude.mayFourth.year}</span>
        <span className="transition-date__month">{timelinePrelude.mayFourth.month}</span>
        <span className="transition-date__day">{timelinePrelude.mayFourth.day}</span>
        <small>{timelinePrelude.mayFourth.location}</small>
        <strong>{timelinePrelude.mayFourth.caption}</strong>
      </div>
      <svg className="transition-river" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-30 216 C170 88 335 288 540 172 C760 48 900 246 1110 138 C1260 62 1390 106 1490 42 L1490 340 L-30 340 Z" />
      </svg>
    </div>
  );
}
