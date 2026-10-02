import { ChatHistory } from "./components/ChatHistory";
import { Finale } from "./components/Finale";
import { HistoryRiver } from "./components/HistoryRiver";
import { Intro } from "./components/Intro";
import { ScrollProgress } from "./components/ScrollProgress";
import { SourceDrawer } from "./components/SourceDrawer";

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <SourceDrawer />
      <ScrollProgress />
      <main id="main-content">
        <Intro />
        <ChatHistory />
        <HistoryRiver />
        <Finale />
      </main>
    </>
  );
}
