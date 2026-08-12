const milestones = [
  {
    label: "2011–2020",
    organisation: "Academic foundations",
    title: "Signal processing and practical experimentation",
    description:
      "Built early foundations through OFDM channel-estimation simulation and native Android sensor applications, connecting theory with implementation and testing.",
  },
  {
    label: "2018–2019",
    organisation: "One Planet Rating",
    title: "Python and Django backend development",
    description:
      "Built user-facing backend features, REST APIs, authentication flows and SQL-backed application logic while collaborating across product disciplines.",
  },
  {
    label: "2019–2025",
    organisation: "Ericsson",
    title: "Telecom systems and production support",
    description:
      "Developed Linux-based C/C++ telecom software and expanded into automation, CI/CD, secure-development awareness and evidence-led failure triage.",
  },
  {
    label: "2025–2026",
    organisation: "Volvo Group client assignment",
    title: "Python, tooling and cloud-native delivery",
    description:
      "Built reusable Python capabilities and improved build, container and deployment workflows in a client engineering environment.",
  },
  {
    label: "Present",
    organisation: "Continued engineering",
    title: "Reliable systems and AI-assisted delivery",
    description:
      "Applying broad systems experience to backend projects, developer tooling, reliability work and modern engineering workflows.",
  },
] as const;

export function CareerJourney() {
  return (
    <ol className="career-route">
      {milestones.map((milestone, index) => (
        <li
          key={milestone.organisation}
          className="career-route-stop"
          style={
            { "--journey-delay": `${index * 45}ms` } as React.CSSProperties
          }
        >
          <div className="career-route-marker" aria-hidden="true">
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <article>
            <p className="font-mono text-xs tracking-[0.1em] text-[var(--accent-emphasis)] uppercase">
              {milestone.label} · {milestone.organisation}
            </p>
            <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
              {milestone.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {milestone.description}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}
