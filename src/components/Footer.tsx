import Link from "next/link";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="w-full pt-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-8 pb-32">
        <Socials />
      </div>
    </footer>
  );
}
