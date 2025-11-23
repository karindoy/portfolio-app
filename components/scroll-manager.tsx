"use client";

import { useLayoutEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Scroll manager that handles scroll behavior when navigating between pages
 * and to anchor sections within pages.
 */
export const ScrollManager = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const handleHashNavigation = () => {
      setTimeout(() => {
        const hash = window.location.hash;

        if (hash) {
          const elementId = hash.substring(1);
          const element = document.getElementById(elementId);

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    };

    handleHashNavigation();
  }, [pathname, searchParams]);

  return null;
};
