"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Document {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      finished: Promise<void>;
    };
  }
}

/**
 * The longest the old page may stay on screen waiting for the next one. Past
 * this the navigation paints without a crossfade — a page that is visibly
 * stuck is worse than one that arrives without an animation.
 */
const HOLD_LIMIT_MS = 250;

/** Anything with a file extension is an asset, not a route: `/resume.pdf`. */
const ASSET = /\.[a-z0-9]+$/i;

/**
 * Crossfades every internal navigation on the site.
 *
 * Mounted once at the root, it captures clicks on any same-origin link before
 * anything else sees them, so a page change animates no matter what rendered
 * the anchor — the nav, prose, Markdown, or a link to a route that does not
 * exist. External links, asset links, new-tab and modified clicks fall through
 * to the browser untouched.
 */
export function useCrossfadeNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  // startViewTransition holds the old frame until its callback resolves, and
  // the callback can only resolve once React has committed the new route.
  const commit = useRef<(() => void) | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const release = useCallback(() => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    commit.current?.();
    commit.current = null;
  }, []);

  // The new route has committed — let the transition play.
  useEffect(release, [pathname, release]);
  useEffect(() => release, [release]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !document.startViewTransition
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      if (ASSET.test(url.pathname)) return;
      if (url.pathname === location.pathname) return;

      // Own the navigation so the crossfade covers it, whatever rendered the
      // link. Stopping propagation keeps next/link from also handling it.
      event.preventDefault();
      event.stopPropagation();

      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            commit.current = resolve;
            // A route still compiling or fetching must not freeze the page it
            // was clicked from; give up the hold and paint instead.
            holdTimer.current = setTimeout(release, HOLD_LIMIT_MS);
            router.push(url.pathname + url.search + url.hash);
          }),
      );
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [release, router]);
}
