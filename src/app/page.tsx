"use client";

import { useRef } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Engineering } from "@/components/sections/Engineering";
import { Works } from "@/components/sections/Works";
import { Training } from "@/components/sections/Training";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />

      <main ref={containerRef} className="relative z-10">
        <Hero />

        <div id="engineering" className="relative bg-transparent">
          <Engineering />
        </div>

        <div id="works" className="relative bg-transparent">
          <Works showViewMore={true} />
        </div>

        <div id="training" className="relative bg-transparent">
          <Training />
        </div>

        <div id="team" className="relative bg-transparent">
          <Team />
        </div>
      </main>

      <div id="contact">
        <Footer />
      </div>
    </>
  );
}
