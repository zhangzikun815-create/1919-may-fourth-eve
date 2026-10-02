import { useEffect, useRef, useState } from "react";
import { sources } from "../data/sources";

export function SourceDrawer() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const openAtSource = (event: Event) => {
      setActiveId((event as CustomEvent<string>).detail);
      setOpen(true);
    };
    window.addEventListener("open-source", openAtSource);
    return () => window.removeEventListener("open-source", openAtSource);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = [...drawerRef.current.querySelectorAll<HTMLElement>("button, a[href]")];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open && activeId) triggerRef.current?.focus();
  }, [open, activeId]);

  useEffect(() => {
    if (!open || !activeId) return;
    document.getElementById(`source-${activeId}`)?.scrollIntoView({ block: "center" });
  }, [open, activeId]);

  return (
    <>
      <button ref={triggerRef} className="source-trigger" type="button" aria-label="资料来源" onClick={() => { setActiveId(undefined); setOpen(true); }} aria-expanded={open}>
        <span>资料</span><small>SOURCE</small>
      </button>
      {open && (
        <div className="source-layer">
          <button className="source-backdrop" type="button" aria-label="关闭资料来源" onClick={() => setOpen(false)} />
          <aside ref={drawerRef} className="source-drawer" role="dialog" aria-modal="true" aria-label="资料来源">
            <header>
              <div><span>ARCHIVE</span><h2>资料来源</h2></div>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="关闭资料来源">×</button>
            </header>
            <ol>
              {sources.map((source) => (
                <li id={`source-${source.id}`} key={source.id} className={activeId === source.id ? "is-active" : ""}>
                  <span className="source-number">{source.id}</span>
                  <div>
                    {source.author && <strong>{source.author}</strong>}
                    <h3>{source.title}</h3>
                    <p>{[source.publication, source.year].filter(Boolean).join(" · ")}</p>
                    {source.note && <small>{source.note}</small>}
                    {source.url && <a href={source.url} target="_blank" rel="noreferrer">查看资料 ↗</a>}
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      )}
    </>
  );
}
