import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  CaseStudyDiagram,
  professionalDiagramDetails,
} from "./case-study-diagram";

describe("professional case-study diagrams", () => {
  it("renders every flow with a distinct accessible name and description", () => {
    for (const [slug, details] of Object.entries(professionalDiagramDetails)) {
      const { unmount } = render(<CaseStudyDiagram slug={slug} />);
      const figure = screen.getByRole("figure", { name: details.title });

      expect(figure).toHaveAttribute("data-professional-diagram", details.kind);
      expect(figure).toHaveAccessibleDescription(details.description);
      expect(figure.querySelectorAll("a, button, [tabindex]")).toHaveLength(0);
      unmount();
    }
  });

  it("uses only generic public labels", () => {
    const publicText = JSON.stringify(professionalDiagramDetails);

    expect(publicText).not.toMatch(
      /customer name|ticket number|repository name|registry address|credential|network identifier/i,
    );
  });

  it("does not render a diagram for an application route", () => {
    const { container } = render(
      <CaseStudyDiagram slug="document-support-rag-chatbot" />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
