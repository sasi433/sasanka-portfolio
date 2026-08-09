import { NavigationLinks } from "@/components/layout/navigation-links";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function DesktopNavigation() {
  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-2 md:flex"
    >
      <NavigationLinks className="gap-0.5" />
      <ThemeToggle className="ml-2" />
    </nav>
  );
}
