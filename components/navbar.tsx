"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      const scrollPosition = window.scrollY + 80;

      let closestSection = null;
      let closestDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          const distance = Math.abs(offsetTop - scrollPosition);

          if (distance < closestDistance) {
            closestDistance = distance;
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
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveSection(anchor.substring(1));
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    } else if (pathname !== "/" && anchor && href === "/") {
      window.location.replace(href + anchor);
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };

  const currentTheme = mounted ? resolvedTheme : "light";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-opacity duration-200">
      <div className="container flex items-center h-16 px-4 justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
        >
          <span>SD</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={pathname === "/" && link.anchor ? link.anchor : link.href}
              onClick={(e) => handleNavigation(e, link.href, link.anchor)}
              className={`transition-colors block px-4 py-3 rounded-md text-sm font-medium ${
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
            className="ml-2"
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

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              mounted && currentTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="md:hidden"
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

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={pathname === "/" && link.anchor ? link.anchor : link.href}
                onClick={(e) => {
                  handleNavigation(e, link.href, link.anchor);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
