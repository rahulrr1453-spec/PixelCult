"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${scrolled
        ? "border-b border-white/10 bg-black/80 backdrop-blur-2xl"
        : "border-b border-transparent bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12 md:py-4">
        <Link
          href="/"
          className="group flex items-center gap-4 transition-transform hover:scale-[1.01]"
        >
          <img
            src="/bglogo.png"
            alt="PixelCult Icon"
            className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"
          />
          <img
            src="/bgtext.png"
            alt="PixelCult"
            className="h-4 w-20 object-contain brightness-125"
          />
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 lg:flex">
            {["Engineering", "Works", "Training", "Team"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-zinc-300 transition-all hover:text-accent hover:tracking-[0.25em]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-5 py-2.5 font-sans text-[10px] font-black uppercase tracking-[0.2em] text-accent backdrop-blur-md transition-all duration-300 hover:bg-accent hover:text-black sm:inline-flex"
          >
            Contact Us
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      </div>
    </header>
  );
}
