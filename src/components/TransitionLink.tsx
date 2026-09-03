"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ComponentProps, type MouseEvent } from "react";

declare global {
  interface Document {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      finished: Promise<void>;
    };
  }
}

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * A Link that crossfades the page using the View Transitions API. Browsers
 * without it, and modified clicks, fall through to normal Link behaviour.
 */
export default function TransitionLink({ href, onClick, ...props }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // startViewTransition holds the old frame until its callback resolves, and
  // the callback can only resolve once React has committed the new route.
  const commit = useRef<(() => void) | null>(null);

  useEffect(() => {
    commit.current?.();
    commit.current = null;
  }, [pathname]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      href === pathname ||
      !document.startViewTransition
    ) {
      return;
    }

    event.preventDefault();
    document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          commit.current = resolve;
          router.push(href);
        }),
    );
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
