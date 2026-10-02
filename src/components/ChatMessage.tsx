import type { Quote } from "../types";
import { MediaFallback } from "./MediaFallback";
import { SourceLink } from "./SourceLink";

export function ChatMessage({ quote }: { quote: Quote }) {
  return (
    <article className={`chat-message chat-message--${quote.side}`} data-message={quote.id}>
      <div className="chat-message__meta">
        <span>{quote.year}</span>
        {quote.location && <span>{quote.location}</span>}
      </div>
      <div className="chat-message__body">
        <MediaFallback name={quote.person} src={quote.portrait} />
        <div className="chat-message__copy">
          <header>
            <strong>{quote.person}</strong>
            <span>{quote.work}</span>
          </header>
          {quote.variant === "pause" && <span className="chat-message__ellipsis">……</span>}
          <blockquote>
            {quote.text.map((line) => <span key={line}>{line}</span>)}
          </blockquote>
          <footer>
            <span>{quote.publication}</span>
            <SourceLink ids={quote.sourceIds} />
          </footer>
        </div>
      </div>
    </article>
  );
}
