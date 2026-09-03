"use client";

import { useCrossfadeNavigation } from "@/lib/useCrossfadeNavigation";

/** Installs the site-wide crossfade once, at the root. Renders nothing. */
export default function CrossfadeNavigation() {
  useCrossfadeNavigation();
  return null;
}
