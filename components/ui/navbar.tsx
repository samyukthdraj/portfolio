"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSun } from "react-icons/fa";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-transparent sticky top-0 z-50 backdrop-blur-sm border-b border-slate-800/50 pb-2 pt-4">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-8 text-lg font-medium text-slate-400">
          <Link 
            href="/" 
            className={`transition-colors ${pathname === "/" ? "text-slate-100 font-bold" : "hover:text-slate-200"}`}
          >
            Home
          </Link>
          <Link 
            href="/projects" 
            className={`transition-colors ${pathname === "/projects" ? "text-slate-100 font-bold" : "hover:text-slate-200"}`}
          >
            Projects
          </Link>
          <Link 
            href="/contact" 
            className={`transition-colors ${pathname === "/contact" ? "text-slate-100 font-bold" : "hover:text-slate-200"}`}
          >
            Contact
          </Link>
        </div>
        <div className="text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
          <FaSun className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );
}
