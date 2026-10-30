"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";


export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Build an href that works whether we're on home (anchor) or another page (/#section)
  const sectionHref = (section: string) =>
    isHome ? `#${section}` : `/#${section}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // On other pages: let the Link navigate normally to "/"
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[300] w-full max-w-[100vw] transition-[background-color,backdrop-filter,border-color] duration-300 ${scrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
          }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 md:px-12 py-3.5 sm:py-4">
          {/* Logo — scrolls to top on home, navigates to / on other pages */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2.5 sm:gap-4 transition-transform hover:scale-[1.01] shrink-0"
          >
            <img
              src="/bglogo.png"
              alt="PixelCult Icon"
              className="h-7 w-auto sm:h-8 object-contain drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"
            />
            <img
              src="/bgtext.png"
              alt="PixelCult"
              className="h-3.5 w-16 sm:h-4 sm:w-20 object-contain brightness-125"
            />
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-8 shrink-0">
            <nav className="hidden items-center gap-8 lg:flex">
              {["Engineering"].map((item) => (
                <a
                  key={item}
                  href={sectionHref(item.toLowerCase())}
                  className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-zinc-300 transition-all hover:text-accent hover:tracking-[0.25em]"
                >
                  {item}
                </a>
              ))}
              <Link
                href="/services"
                className={`font-sans text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-accent hover:tracking-[0.25em] ${
                  pathname === "/services" ? "text-accent" : "text-zinc-300"
                }`}
              >
                Our Services
              </Link>
              <Link
                href="/work"
                className={`font-sans text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-accent hover:tracking-[0.25em] ${
                  pathname === "/work" ? "text-accent" : "text-zinc-300"
                }`}
              >
                Our Work
              </Link>
            </nav>

            <a
              href={sectionHref("contact")}
              className="group hidden items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 sm:px-5 py-2 sm:py-2.5 font-sans text-[10px] font-black uppercase tracking-[0.2em] text-accent backdrop-blur-md transition-all duration-300 hover:bg-accent hover:text-black sm:inline-flex shrink-0"
            >
              Contact Us
              <ArrowUpRight size={14} weight="bold" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[310] flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-foreground transition-all duration-200 hover:bg-white/15 active:scale-95 lg:hidden"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[290] flex flex-col bg-[#020617] lg:hidden"
            style={{ isolation: "isolate" }}
          >

            <div className="flex flex-col items-center justify-center flex-grow gap-6 px-6 pt-20">
              {["Engineering"].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={sectionHref(item.toLowerCase())}
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-3xl font-black uppercase tracking-tighter text-foreground active:text-accent"
                >
                  {item}<span className="text-accent">.</span>
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className={`font-sans text-3xl font-black uppercase tracking-tighter ${
                    pathname === "/services" ? "text-accent" : "text-foreground"
                  } active:text-accent`}
                >
                  Our Services<span className="text-accent">.</span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Link
                  href="/work"
                  onClick={() => setIsOpen(false)}
                  className={`font-sans text-3xl font-black uppercase tracking-tighter ${
                    pathname === "/work" ? "text-accent" : "text-foreground"
                  } active:text-accent`}
                >
                  Our Work<span className="text-accent">.</span>
                </Link>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href={sectionHref("contact")}
                onClick={() => setIsOpen(false)}
                className="mt-6 flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 font-sans text-xs font-black uppercase tracking-[0.2em] text-black"
              >
                Start a Project
                <ArrowUpRight size={16} weight="bold" />
              </motion.a>
            </div>

            <div className="p-12 border-t border-white/5 flex justify-between items-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">PixelCult &copy; 2026</p>
              <div className="flex gap-4">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Systems Nominal</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
