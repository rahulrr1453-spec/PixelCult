import { ArrowUpRight, EnvelopeSimple, WhatsappLogo, MapPin } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/5 py-24 px-6 md:px-12 overflow-hidden">
      {/* Faded Background Layer */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm -z-10" />
      
      <div className="mx-auto max-w-[1400px] text-center">
        <h2 className="mb-8 font-sans text-[clamp(2.5rem,7vw,5rem)] font-black leading-none tracking-tighter text-foreground">
          Let's Build <span className="text-accent">It.</span>
        </h2>
        
        <p className="mx-auto mb-12 max-w-2xl text-xl text-zinc-400">
          Whether you need a full-stack application, an AI integration, or expert training—we are ready to deploy.
        </p>

        <div className="mb-20 flex flex-wrap justify-center gap-6">
          <a
            href="mailto:rahulrr1453@gmail.com"
            className="group interactive inline-flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 px-8 py-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent transition-all duration-300 hover:bg-accent/10 hover:border-accent/40 hover:text-white"
          >
            <EnvelopeSimple size={24} />
            Email the Team
          </a>
          <a
            href="https://wa.me/6361676632"
            target="_blank"
            rel="noopener noreferrer"
            className="group interactive inline-flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-500 transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-white"
          >
            <WhatsappLogo size={24} />
            WhatsApp Us
          </a>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          <div className="flex items-center gap-4">
            <img src="/bglogo.png" alt="PixelCult" className="h-8 w-8 object-contain" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              © 2026 PixelCult. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" />
              Operating Globally
            </span>
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
