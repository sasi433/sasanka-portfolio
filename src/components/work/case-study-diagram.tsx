import { ArrowRight } from "lucide-react";

const workflows: Record<string, { label: string; steps: readonly string[] }> = {
  "shared-python-libraries": {
    label: "Generic shared-library adoption workflow",
    steps: [
      "Application needs",
      "Shared interfaces",
      "Reusable libraries",
      "Tested consumers",
    ],
  },
  "container-image-delivery-workflow": {
    label: "Generic container delivery workflow",
    steps: ["Validated input", "Build and tag", "Scan", "Publish and clean up"],
  },
  "build-reliability-fail-fast-validation": {
    label: "Generic fail-fast build workflow",
    steps: [
      "Declared inputs",
      "Static validation",
      "Owned build target",
      "Actionable CI result",
    ],
  },
  "telecom-failure-triage": {
    label: "Generic incident triage workflow",
    steps: [
      "Failure report",
      "Evidence analysis",
      "Scope and reproduce",
      "Fix or escalate",
    ],
  },
};

export function CaseStudyDiagram({ slug }: { slug: string }) {
  const workflow = workflows[slug];
  if (!workflow) return null;

  return (
    <figure className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
      <figcaption className="font-mono text-xs tracking-[0.1em] text-[var(--accent-emphasis)] uppercase">
        {workflow.label}
      </figcaption>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
        {workflow.steps.map((step, index) => (
          <div key={step} className="contents">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-center text-sm font-semibold">
              {step}
            </div>
            {index < workflow.steps.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="mx-auto size-4 rotate-90 text-[var(--accent-emphasis)] sm:rotate-0"
              />
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}
