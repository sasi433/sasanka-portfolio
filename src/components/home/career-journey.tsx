const milestones = [
  {
    label: "Systems foundations",
    title: "C/C++ and Linux",
    description:
      "Built strong foundations in performance-sensitive, multithreaded and distributed software.",
  },
  {
    label: "Ericsson · 2019–2025",
    title: "Telecom engineering and production support",
    description:
      "Developed Linux-based telecom software while expanding into automation, CI/CD and evidence-led failure triage.",
  },
  {
    label: "Volvo Group client assignment · 2025–2026",
    title: "Python, tooling and cloud-native delivery",
    description:
      "Built reusable Python capabilities and improved build, container and deployment workflows in a client engineering environment.",
  },
  {
    label: "Present",
    title: "Reliable systems and AI-assisted engineering",
    description:
      "Applying broad systems experience to backend projects, developer tooling, reliability work and modern engineering workflows.",
  },
] as const;

export function CareerJourney() {
  return (
    <ol className="relative grid gap-5 lg:grid-cols-4 lg:gap-4">
      <span
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-[0.4375rem] w-px bg-[var(--border)] lg:top-[0.4375rem] lg:right-5 lg:bottom-auto lg:left-5 lg:h-px lg:w-auto"
      />
      {milestones.map((milestone, index) => (
        <li
          key={milestone.title}
          className="journey-milestone relative pl-8 lg:pt-8 lg:pl-0"
          style={
            { "--journey-delay": `${index * 45}ms` } as React.CSSProperties
          }
        >
          <span
            aria-hidden="true"
            className="absolute top-1.5 left-0 size-3.5 rounded-full border-2 border-[var(--background)] bg-[var(--accent-emphasis)] shadow-[0_0_0_1px_var(--accent)] lg:top-0 lg:left-0"
          />
          <p className="font-mono text-xs tracking-[0.08em] text-[var(--accent-emphasis)] uppercase">
            {milestone.label}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{milestone.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {milestone.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
