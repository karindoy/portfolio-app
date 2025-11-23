'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Scroll manager that handles scroll behavior when navigating between pages
 * and to anchor sections within pages.
 */
export const ScrollManager = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const handleHashNavigation = () => {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        // Check for hash in the URL
        const hash = window.location.hash;

        if (hash) {
          // Remove the '#' to get the ID
          const elementId = hash.substring(1);
          const element = document.getElementById(elementId);

          if (element) {
            // Scroll to the element with smooth behavior
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          } else {
            // If no element found with the hash, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          // No hash in URL, scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure DOM is ready
    };

    // Execute on route change
    handleHashNavigation();
  }, [pathname, searchParams]);

  return null;
};