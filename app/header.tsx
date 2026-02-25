"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isOpen) setIsOpen(false);
  }

  return (
    <nav className="content-margin mb-4" aria-label="navigation">
      <div className="flex items-center h-16 justify-between">
        <Link href="/bingwallpapers" className="text-xl font-bold tracking-wide text-white">
          Sonu Rai
        </Link>
        <div className="hidden md:flex md:items-center gap-1">
          <NavLink href="/bingwallpapers" pathname={pathname}>Bing Wallpapers</NavLink>
          <NavLink href="/bingwallpapers/tags" pathname={pathname}>Tags</NavLink>
          <NavLink href="/bingwallpapers/search" pathname={pathname}>Search</NavLink>
          <NavLink href="/about" pathname={pathname}>About</NavLink>
          <a
            href="https://amarjeet.photos/?ref=sonurai-nav"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-3 py-1.5 rounded-md border border-gray-700 text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
          >
            My Photos
          </a>
        </div>
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-gray-800">
          <MobileLink href="/bingwallpapers" pathname={pathname}>Bing Wallpapers</MobileLink>
          <MobileLink href="/bingwallpapers/tags" pathname={pathname}>Tags</MobileLink>
          <MobileLink href="/bingwallpapers/search" pathname={pathname}>Search</MobileLink>
          <MobileLink href="/about" pathname={pathname}>About</MobileLink>
          <a
            href="https://amarjeet.photos/?ref=sonurai-nav"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            My Photos
          </a>
        </div>
      )}
    </nav>
  );
};

type LinkProps = {
  href: string;
  pathname: string;
  children: React.ReactNode;
};

const NavLink = ({ href, pathname, children }: LinkProps) => (
  <Link
    href={href}
    className={`px-3 py-1.5 transition-colors ${pathname === href ? "text-white underline decoration-2 underline-offset-8 decoration-white/40" : "text-gray-400 hover:text-gray-200"}`}
  >
    {children}
  </Link>
);

const MobileLink = ({ href, pathname, children }: LinkProps) => (
  <Link
    href={href}
    className={`block px-3 py-2 rounded-md transition-colors ${pathname === href ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
  >
    {children}
  </Link>
);

export default Header;
