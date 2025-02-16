"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  return (
    <nav className="flex items-center h-16 mx-4 md:mx-0" aria-label="navigation">
      <Link
        href="/bingwallpapers"
        className={`text-xl text-white`}
      >
        Sonu Rai
      </Link>
      <ActiveLink href="/about">
        About
      </ActiveLink>
      <ActiveLink href="/bingwallpapers/tags">
        Tags
      </ActiveLink>
      <ActiveLink href="/bingwallpapers/search">
        Search
      </ActiveLink>
    </nav>
  );
};

const ActiveLink = ({ href, children }: any) => {
  const p = usePathname();

  return (
    <Link
      href={href}
      className={`ml-4 px-3 py-2 rounded-md ${p === href ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
    >
      {children}
    </Link>
  );
}

export default Header;
