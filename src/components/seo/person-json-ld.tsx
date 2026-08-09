import { profile } from "@/content/profile";
import { absoluteUrl } from "@/lib/site";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: absoluteUrl(),
    image: absoluteUrl(profile.headshot.src),
    jobTitle: "Senior Software Engineer",
    sameAs: [profile.githubUrl, profile.linkedInUrl],
    knowsAbout: [
      "Backend engineering",
      "Python",
      "DevOps",
      "Cloud-native systems",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
