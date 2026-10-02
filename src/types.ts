export interface Quote {
  id: string;
  year: string;
  location?: string;
  person: string;
  work: string;
  text: string[];
  publication: string;
  side: "left" | "right";
  sourceIds: string[];
  variant?: "quote" | "pause";
  portrait?: string;
}

export type EventVisual =
  | "shandong"
  | "warning"
  | "crowd"
  | "spread"
  | "arrests"
  | "participants"
  | "officials"
  | "paris";

export interface TimelineEvent {
  id: string;
  date: string;
  location?: string;
  title: string;
  description: string[];
  keywords?: string[];
  sourceIds: string[];
  visual?: EventVisual;
}

export interface TimelinePrelude {
  april: { year: string; month: string };
  paris: { location: string; subject: string; message: string; sourceIds: string[] };
  alert: { date: string; title: string; person: string; description: string; sourceIds: string[] };
  meetingSteps: string[];
  mayFourth: { year: string; month: string; day: string; location: string; caption: string };
}

export interface SourceItem {
  id: string;
  author?: string;
  title: string;
  publication?: string;
  year?: string;
  note?: string;
  url?: string;
}

export interface MotionConfig {
  chatSectionScrollVh: number;
  messageEnterUnits: number;
  messageHoldUnits: number;
  messageExitUnits: number;
  historyScrollPaddingVh: number;
  scrubSmoothing: number;
}
