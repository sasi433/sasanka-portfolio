import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";
import { Button, ButtonLink } from "./button";
import { ExternalLink } from "./external-link";

describe("UI primitives", () => {
  it("renders accessible button variants", () => {
    render(
      <>
        <Button>Continue</Button>
        <Button variant="secondary">Cancel</Button>
        <ButtonLink href="#details">Details</ButtonLink>
      </>,
    );

    expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute(
      "type",
      "button",
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass(
      "bg-[var(--surface)]",
    );
    expect(screen.getByRole("link", { name: "Details" })).toHaveAttribute(
      "href",
      "#details",
    );
  });

  it("marks external links safely", () => {
    render(<ExternalLink href="https://example.com">Reference</ExternalLink>);

    const link = screen.getByRole("link", { name: /Reference/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("renders compact status badges", () => {
    render(<Badge>Maintained</Badge>);
    expect(screen.getByText("Maintained")).toHaveClass("font-mono");
  });
});
