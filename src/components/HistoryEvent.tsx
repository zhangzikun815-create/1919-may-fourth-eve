import type { TimelineEvent } from "../types";
import { SourceLink } from "./SourceLink";

function EventVisual({ event }: { event: TimelineEvent }) {
  switch (event.visual) {
    case "shandong":
      return <div className="event-visual event-visual--word">SHANDONG</div>;
    case "warning":
      return <div className="event-visual event-visual--seal">外交警报</div>;
    case "crowd":
      return (
        <div className="event-visual event-visual--crowd">
          <strong>3000+</strong>
          <div className="route"><span>天安门</span><i /><span>东交民巷</span><i /><span>赵家楼</span></div>
        </div>
      );
    case "spread":
      return <div className="event-visual event-visual--cities">{event.keywords?.map((city) => <span key={city}>{city}</span>)}</div>;
    case "arrests":
      return <div className="event-visual event-visual--bars"><i /><i /><i /><i /></div>;
    case "participants":
      return <div className="event-visual event-visual--participants"><span>学生</span><span>工人</span><span>商人</span></div>;
    case "officials":
      return <div className="event-visual event-visual--names">{event.keywords?.map((name) => <span key={name}>{name}</span>)}</div>;
    case "paris":
      return <div className="event-visual event-visual--paris">PARIS</div>;
    default:
      return null;
  }
}

export function HistoryEvent({ event, index }: { event: TimelineEvent; index: number }) {
  return (
    <article className={`history-event history-event--${index % 2 ? "below" : "above"} history-event--${event.visual ?? "plain"}`} data-event={event.id}>
      <EventVisual event={event} />
      <div className="history-event__content">
        <time>{event.date.split("\n").map((line) => <span key={line}>{line}</span>)}</time>
        {event.location && <p className="history-event__location">{event.location}</p>}
        <h3>{event.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
        <div className="history-event__body">
          {event.description.map((line) => <p key={line}>{line}</p>)}
        </div>
        {event.keywords && !["spread", "officials"].includes(event.visual ?? "") && (
          <ul className="history-event__keywords">
            {event.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
          </ul>
        )}
        <SourceLink ids={event.sourceIds} />
      </div>
    </article>
  );
}
