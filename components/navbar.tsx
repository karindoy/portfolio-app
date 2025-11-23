"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const NAVIGATION_LINKS = [
  { name: "Home", href: "/", anchor: "#hero", id: "hero" },
  { name: "About", href: "/about", anchor: "#about", id: "about" },
  { name: "Skills", href: "/skills", anchor: "#skills", id: "skills" },
  { name: "Projects", href: "/projects", anchor: "#projects", id: "projects" },
  {
    name: "Experience",
    href: "/experience",
    anchor: "#experience",
    id: "experience",
  },
  { name: "Contact", href: "/contact", anchor: "#contact", id: "contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        setActiveSection(hash.substring(1));
      }
    }
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = [
        "hero",
        "highlights",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      // Get the navbar height to account for the fixed header in scroll position calculation
      const navbarHeight =
        document.querySelector("header")?.getBoundingClientRect().height || 64;
      const scrollPosition = window.scrollY + navbarHeight; // No buffer to properly align with fixed navbar

      let closestSection = null;
      let closestDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const top = offsetTop;
          const bottom = offsetTop + offsetHeight;

          // Check if scroll position is within this section (with proper bounds checking)
          if (scrollPosition >= top && scrollPosition < bottom) {
            closestSection = section;
            closestDistance = 0; // Exact match
            break;
          }

          // Calculate distance to top and bottom of section for fallback
          const distanceToTop = Math.abs(top - scrollPosition);
          const distanceToBottom = Math.abs(bottom - scrollPosition);
          const minDistance = Math.min(distanceToTop, distanceToBottom);

          if (minDistance < closestDistance) {
            closestDistance = minDistance;
            closestSection = section;
          }
        }
      }

      if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleNavigation = (
    e: React.MouseEvent,
    href: string,
    anchor?: string
  ) => {
    if (pathname === "/" && anchor) {
      e.preventDefault();
      const element = document.getElementById(anchor.substring(1));
      if (element) {
        // Get the navbar height to account for the fixed header
        const navbarHeight =
          document.querySelector("header")?.getBoundingClientRect().height ||
          64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          window.pageYOffset + elementPosition - navbarHeight;

        // For better mobile compatibility, use a custom scroll with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update active section
        setActiveSection(anchor.substring(1));
      }
    } else if (pathname !== "/" && anchor && href === "/") {
      window.location.replace(href + anchor);
    }
  };

  const currentTheme = mounted ? resolvedTheme : "light";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-opacity duration-200">
      {/* Navigation for desktop - right aligned */}
      <nav
        className="hidden md:flex items-center gap-2 p-4 	
 justify-center"
      >
        {NAVIGATION_LINKS.map((link) => (
          <Link
            key={link.href}
            href={pathname === "/" && link.anchor ? link.anchor : link.href}
            onClick={(e) => handleNavigation(e, link.href, link.anchor)}
            className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
              (pathname === link.href &&
                link.id === "hero" &&
                activeSection === "") ||
              (pathname === "/" && activeSection === link.id) ||
              (pathname !== "/" &&
                typeof window !== "undefined" &&
                window.location.hash.substring(1) === link.id)
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                : "text-foreground/70 hover:text-foreground hover:bg-muted"
            }`}
          >
            {link.name}
          </Link>
        ))}
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={
            mounted && currentTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="ml-1"
        >
          {mounted ? (
            currentTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )
          ) : (
            <Sun className="h-5 w-5 opacity-0" />
          )}
        </Button>
      </nav>

      {/* Mobile layout - centered */}
      <div className="md:hidden container flex flex-col items-center px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xl font-bold text-foreground hover:text-foreground/80 transition-colors my-2"
        >
          <span>Suellen Dev</span>
        </Link>
        <nav className="flex flex-wrap justify-center items-center gap-2">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={pathname === "/" && link.anchor ? link.anchor : link.href}
              onClick={(e) => handleNavigation(e, link.href, link.anchor)}
              className={`transition-colors px-4 py-2.5 rounded-md text-sm font-medium ${
                (pathname === link.href &&
                  link.id === "hero" &&
                  activeSection === "") ||
                (pathname === "/" && activeSection === link.id) ||
                (pathname !== "/" &&
                  typeof window !== "undefined" &&
                  window.location.hash.substring(1) === link.id)
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              mounted && currentTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="ml-1"
          >
            {mounted ? (
              currentTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <Sun className="h-5 w-5 opacity-0" />
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
