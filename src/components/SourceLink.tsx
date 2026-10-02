interface SourceLinkProps {
  ids: string[];
}

export function SourceLink({ ids }: SourceLinkProps) {
  return (
    <span className="source-links" aria-label={`资料来源 ${ids.join("、")}`}>
      {ids.map((id) => (
        <button
          type="button"
          className="source-link"
          key={id}
          onClick={() => window.dispatchEvent(new CustomEvent("open-source", { detail: id }))}
        >
          [{id}]
        </button>
      ))}
    </span>
  );
}
