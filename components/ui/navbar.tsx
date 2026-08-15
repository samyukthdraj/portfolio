"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function Navbar() {
  const pathname = usePathname();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("light")) {
      requestAnimationFrame(() => setIsLight(true));
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      setIsLight(true);
    }
  };

  return (
    <nav className="w-full bg-transparent sticky top-0 z-50 backdrop-blur-sm border-b border-slate-800/50 pb-2 pt-4">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-8 text-lg font-medium text-slate-400">
          <Link 
            href="/" 
            className={`transition-colors ${pathname === "/" ? "text-slate-100 font-bold" : "hover:text-slate-200"}`}
            aria-label="Home page"
          >
            Home
          </Link>
          <Link 
            href="/projects" 
            className={`transition-colors ${pathname === "/projects" ? "text-slate-100 font-bold" : "hover:text-slate-200"}`}
            aria-label="Projects page"
          >
            Projects
          </Link>
          <Link 
            href="/contact" 
            className={`transition-colors ${pathname === "/contact" ? "text-slate-100 font-bold" : "hover:text-slate-200"}`}
            aria-label="Contact page"
          >
            Contact
          </Link>
        </div>
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
          title={isLight ? "Toggle dark mode" : "Toggle light mode"}
          aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
        >
          {isLight ? <FaMoon className="w-4.5 h-4.5 text-slate-900 -translate-y-px" /> : <FaSun className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
}
