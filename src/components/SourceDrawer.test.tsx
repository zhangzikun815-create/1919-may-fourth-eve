import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SourceDrawer } from "./SourceDrawer";

describe("SourceDrawer", () => {
  it("opens from the source control and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<SourceDrawer />);

    await user.click(screen.getByRole("button", { name: /资料来源/i }));
    expect(screen.getByRole("dialog", { name: /资料来源/i })).toBeVisible();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: /资料来源/i })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("reveals the requested citation when a source marker is activated", async () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(<SourceDrawer />);

    window.dispatchEvent(new CustomEvent("open-source", { detail: "07" }));

    expect(await screen.findByText("北京大学校史：新文化运动中心与五四运动策源地")).toBeVisible();
    expect(scrollIntoView).toHaveBeenCalled();
  });
});
