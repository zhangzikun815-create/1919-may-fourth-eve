import { useState } from "react";

interface MediaFallbackProps {
  src?: string;
  name: string;
  className?: string;
}

export function MediaFallback({ src, name, className = "" }: MediaFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`media-fallback ${className}`} aria-hidden="true">
        <span>{name.slice(0, 1)}</span>
        <small>ARCHIVE</small>
      </div>
    );
  }

  return <img className={className} src={src} alt={name} onError={() => setFailed(true)} />;
}
