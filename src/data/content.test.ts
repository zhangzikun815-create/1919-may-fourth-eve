import { describe, expect, it } from "vitest";
import { quotes } from "./quotes";
import { sources } from "./sources";
import { timelineEvents, timelinePrelude } from "./timeline";

describe("historical content", () => {
  it("contains the four sourced messages in chronological order", () => {
    expect(quotes).toHaveLength(4);
    expect(quotes.map((quote) => quote.year)).toEqual(["1915", "1916", "1917", "1918"]);
    expect(quotes.at(-1)?.text.join("")).toContain("救救孩子");
  });

  it("contains the complete ten-event historical river", () => {
    expect(timelineEvents).toHaveLength(10);
    expect(timelineEvents[0].date).toBe("1919\n01 / 18");
    expect(timelineEvents.at(-1)?.date).toBe("1919\n06 / 28");
  });

  it("resolves every content source id", () => {
    const knownIds = new Set(sources.map((source) => source.id));
    const usedIds = [
      ...[...quotes, ...timelineEvents].flatMap((item) => item.sourceIds),
      ...timelinePrelude.paris.sourceIds,
      ...timelinePrelude.alert.sourceIds,
    ];
    expect(usedIds.length).toBeGreaterThan(0);
    expect(usedIds.filter((id) => !knownIds.has(id))).toEqual([]);
  });

  it("uses the cautious school-count wording", () => {
    const outbreak = timelineEvents.find((event) => event.id === "may-fourth");
    expect(outbreak?.description.join("")).toContain("十余所学校");
    expect(outbreak?.description.join("")).not.toContain("13所高校");
  });

  it("keeps the prelude news copy in the data layer", () => {
    expect(timelinePrelude.alert.title).toBe("《外交警报敬告国人》");
    expect(timelinePrelude.meetingSteps.at(-1)).toBe("决定次日举行示威");
    expect(timelinePrelude.alert.sourceIds).toEqual(["05", "07"]);
  });
});
