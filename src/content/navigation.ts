export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Work", href: "/work" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
