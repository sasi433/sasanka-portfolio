import {
  AppWindow,
  ArrowDown,
  ArrowRight,
  Blocks,
  Box,
  Braces,
  CheckCircle2,
  ClipboardCheck,
  FileCode2,
  GitBranch,
  Hammer,
  MessageSquareWarning,
  PackageCheck,
  ScanLine,
  Search,
  Send,
  ShieldCheck,
  TestTube2,
  Trash2,
  UploadCloud,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import styles from "./case-study-diagram.module.css";

export const professionalDiagramDetails = {
  "shared-python-libraries": {
    title: "Shared capability adoption",
    description:
      "Generic applications consume stable public interfaces backed by reusable capability libraries, shared tests, build integration and documentation.",
    kind: "shared-capabilities",
  },
  "container-image-delivery-workflow": {
    title: "Validated container delivery",
    description:
      "Declared inputs move through validation, image build and tagging, security scanning, publishing and cleanup, with failures returning actionable feedback.",
    kind: "delivery-pipeline",
  },
  "build-reliability-fail-fast-validation": {
    title: "Fail-fast build ownership",
    description:
      "Module, template and static inputs pass ownership, missing-input and duplicate-input checks before an owned build target produces an actionable CI result.",
    kind: "validation-gates",
  },
  "telecom-failure-triage": {
    title: "Evidence-led failure triage",
    description:
      "A failure report moves through evidence analysis, scope determination and reproduction before a team-owned fix or a concise evidence-based escalation.",
    kind: "triage-decision",
  },
} as const;

type DiagramSlug = keyof typeof professionalDiagramDetails;

export function CaseStudyDiagram({ slug }: { slug: string }) {
  if (!(slug in professionalDiagramDetails)) return null;

  const diagramSlug = slug as DiagramSlug;
  const details = professionalDiagramDetails[diagramSlug];
  const titleId = `${diagramSlug}-diagram-title`;
  const descriptionId = `${diagramSlug}-diagram-description`;

  return (
    <figure
      className={styles.figure}
      data-professional-diagram={details.kind}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <figcaption>
        <span className={styles.eyebrow}>Sanitised engineering flow</span>
        <span id={titleId} className={styles.title}>
          {details.title}
        </span>
      </figcaption>
      <p id={descriptionId} className={styles.description}>
        {details.description}
      </p>

      {diagramSlug === "shared-python-libraries" ? (
        <SharedCapabilityDiagram />
      ) : null}
      {diagramSlug === "container-image-delivery-workflow" ? (
        <ContainerDeliveryDiagram />
      ) : null}
      {diagramSlug === "build-reliability-fail-fast-validation" ? (
        <BuildValidationDiagram />
      ) : null}
      {diagramSlug === "telecom-failure-triage" ? (
        <FailureTriageDiagram />
      ) : null}
    </figure>
  );
}

function SharedCapabilityDiagram() {
  return (
    <div className={`${styles.canvas} ${styles.sharedCanvas}`}>
      <DiagramGroup title="Application consumers">
        <NodeList
          items={[
            ["Application A", AppWindow],
            ["Application B", AppWindow],
            ["Application C", AppWindow],
          ]}
        />
      </DiagramGroup>
      <FlowArrow label="Stable public interfaces" />
      <DiagramGroup title="Reusable capability layer" emphasized>
        <NodeList
          items={[
            ["Authentication", ShieldCheck],
            ["Data interaction", Braces],
            ["Templates", FileCode2],
            ["Specifications", Blocks],
          ]}
          compact
        />
      </DiagramGroup>
      <FlowArrow label="Shared ownership" />
      <DiagramGroup title="Adoption controls">
        <NodeList
          items={[
            ["Automated tests", TestTube2],
            ["Build integration", PackageCheck],
            ["Documentation", ClipboardCheck],
          ]}
        />
      </DiagramGroup>
    </div>
  );
}

function ContainerDeliveryDiagram() {
  const stages: readonly [string, LucideIcon][] = [
    ["Declared inputs", ClipboardCheck],
    ["Validate", CheckCircle2],
    ["Build and tag", Box],
    ["Security scan", ScanLine],
    ["Publish", UploadCloud],
    ["Clean up", Trash2],
  ];

  return (
    <div className={`${styles.canvas} ${styles.pipelineCanvas}`}>
      <ol className={styles.pipeline} aria-label="Container delivery stages">
        {stages.map(([label, Icon], index) => (
          <li className={styles.pipelineStage} key={label}>
            <span className={styles.stageNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ol>
      <div className={styles.feedbackLane}>
        <GitBranch aria-hidden="true" />
        <span>
          Invalid input or failed validation returns actionable feedback before
          publishing.
        </span>
      </div>
    </div>
  );
}

function BuildValidationDiagram() {
  return (
    <div className={`${styles.canvas} ${styles.gatesCanvas}`}>
      <DiagramGroup title="Declared inputs">
        <NodeList
          items={[
            ["Python modules", Braces],
            ["Templates", FileCode2],
            ["Static assets", Blocks],
          ]}
        />
      </DiagramGroup>
      <FlowArrow label="Validate early" />
      <section className={styles.validationGate} aria-labelledby="gate-heading">
        <div className={styles.gateHeading}>
          <ShieldCheck aria-hidden="true" />
          <h3 id="gate-heading">Fail-fast checks</h3>
        </div>
        <ul>
          <li>Ownership is explicit</li>
          <li>Missing inputs are reported</li>
          <li>Duplicate inputs are rejected</li>
        </ul>
      </section>
      <FlowArrow label="Build only valid state" />
      <DiagramGroup title="Owned result">
        <NodeList
          items={[
            ["Build target", Hammer],
            ["Packaged inputs", PackageCheck],
            ["Actionable CI result", CheckCircle2],
          ]}
        />
      </DiagramGroup>
    </div>
  );
}

function FailureTriageDiagram() {
  return (
    <div className={`${styles.canvas} ${styles.triageCanvas}`}>
      <ol className={styles.triagePath} aria-label="Initial triage stages">
        <TriageStep icon={MessageSquareWarning} label="Failure report" />
        <TriageStep icon={Search} label="Evidence analysis" />
        <TriageStep icon={GitBranch} label="Scope and reproduce" />
      </ol>
      <div className={styles.decision}>
        <span>Ownership decision</span>
        <ArrowDown aria-hidden="true" />
      </div>
      <div className={styles.triageBranches}>
        <section>
          <span className={styles.branchLabel}>Team-owned issue</span>
          <Wrench aria-hidden="true" />
          <h3>Fix and verify</h3>
          <p>Resolve where possible and confirm the observed behaviour.</p>
        </section>
        <section>
          <span className={styles.branchLabel}>Different ownership</span>
          <Send aria-hidden="true" />
          <h3>Escalate with context</h3>
          <p>
            Share concise scope, reproduction and evidence with the right team.
          </p>
        </section>
      </div>
      <p className={styles.collaborationNote}>
        Clear evidence supports efficient cross-team collaboration without
        exposing customer or system details.
      </p>
    </div>
  );
}

function DiagramGroup({
  title,
  children,
  emphasized = false,
}: {
  title: string;
  children: ReactNode;
  emphasized?: boolean;
}) {
  return (
    <section
      className={`${styles.group} ${emphasized ? styles.emphasized : ""}`}
    >
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function NodeList({
  items,
  compact = false,
}: {
  items: readonly (readonly [string, LucideIcon])[];
  compact?: boolean;
}) {
  return (
    <ul className={compact ? styles.compactList : undefined}>
      {items.map(([label, Icon]) => (
        <li key={label}>
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className={styles.flowArrow} aria-hidden="true">
      <span>{label}</span>
      <ArrowRight />
    </div>
  );
}

function TriageStep({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <li>
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </li>
  );
}
