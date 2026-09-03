"use client";

import routesData from "@/data/routes.json";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = routesData.routes.filter((route) => route.showInNav);

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 w-full shrink-0 border-b border-rule pb-6 text-right sm:mb-0 sm:w-[152px] sm:border-b-0 sm:pb-0 sm:pr-12">
      <ul className="flex justify-end gap-5 sm:block sm:gap-0">
        {navLinks.map((route) => {
          const isActive =
            route.path === "/"
              ? pathname === "/"
              : pathname.startsWith(route.path);

          return (
            <li key={route.path}>
              <Link
                href={route.path}
                title={route.description}
                aria-current={isActive ? "page" : undefined}
                className={cn("nav-link", isActive && "nav-link-active")}
              >
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
