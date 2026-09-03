import CrossfadeNavigation from "@/components/CrossfadeNavigation";
import Nav from "@/components/Nav";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

// The reference site's own two faces: InterVariable for everything, and
// LoraItalicVariable — italic only — for the nav.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haocui.dev"),
  title: {
    default: "Hao Cui",
    template: "%s — Hao Cui",
  },
  description:
    "Hao Cui is a software engineer from Vancouver working across web, mobile, and machine learning.",
  icons: {
    icon: [{ url: "/favicon.png" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-base text-foreground antialiased",
          inter.variable,
          lora.variable,
        )}
      >
        {/* Anchored to the top-left corner, not centred — the whole block
            sits at the left edge and the page runs out to the right. */}
        <CrossfadeNavigation />
        <div className="px-6 py-12 sm:py-16">
          <div className="sm:flex sm:items-start">
            <Nav />
            <main className="w-full max-w-[700px] sm:border-l sm:border-rule sm:pl-[52px]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
