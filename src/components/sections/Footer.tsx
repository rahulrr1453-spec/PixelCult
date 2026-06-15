"use client";

import { useState } from "react";
import { ArrowUpRight, EnvelopeSimple, WhatsappLogo, MapPin, CircleNotch, CheckCircle, Warning, InstagramLogo, XLogo } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    const payload = {
      Name: name,
      Organization: orgName || "Not Specified",
      Email: email,
      Message: message
    };

    try {
      // Step 1: Try custom API route (uses SMTP Nodemailer if credentials exist)
      const apiResponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const apiData = await apiResponse.json();

      if (apiResponse.ok && !apiData.useFallback) {
        setSubmitStatus("success");
        setName("");
        setOrgName("");
        setEmail("");
        setMessage("");
        setIsSubmitting(false);
        return;
      }
      if (!apiResponse.ok && apiData && apiData.error) {
        console.warn("API route failed with error:", apiData.error);
      }
    } catch (apiError) {
      console.warn("API route failed, falling back to FormSubmit:", apiError);
    }

    // Step 2: Fallback to FormSubmit (styled with color customizer)
    try {
      const response = await fetch("https://formsubmit.co/ajax/info.pixelcult@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...payload,
          _subject: `PixelCult Contact Form: Submission from ${name}`,
          _template: "table",
          _color: "#10b981"
        })
      });

      const data = await response.json();
      if (response.ok && data.success === "true") {
        setSubmitStatus("success");
        setName("");
        setOrgName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmitStatus("error");
        setErrorMessage(data?.message || "Submission was not processed successfully by FormSubmit.");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error?.message || "A network error occurred while sending.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 py-16 md:py-20 px-6 md:px-12 overflow-hidden">
      {/* Faded Background Layer */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm -z-10" />
      
      <div className="mx-auto max-w-[1400px] text-center">
        <h2 className="mb-4 font-sans text-[clamp(2.5rem,7vw,5rem)] font-black leading-none tracking-tighter text-foreground">
          Let's Build <span className="text-accent">It.</span>
        </h2>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-zinc-400">
          Whether you need a full-stack application, an AI integration, or expert training—we are ready to deploy.
        </p>

        {/* Quick Contact Links */}
        <div className="mb-10 flex flex-wrap justify-center gap-6">
          <a
            href="mailto:info.pixelcult@gmail.com"
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

        {/* Contact Form Container */}
        <div className="mx-auto mb-20 max-w-2xl rounded-2xl border border-white/10 bg-slate-950/40 p-6 sm:p-8 text-left relative overflow-hidden backdrop-blur-md">
          {/* Inner ambient glow */}
          <div className="absolute -right-24 -top-24 h-48 w-48 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="form-name" className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  id="form-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-sans text-sm text-foreground focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Org Name Field */}
              <div className="space-y-2">
                <label htmlFor="form-org" className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                  Organization Name <span className="text-zinc-500 font-normal">(Optional)</span>
                </label>
                <input
                  id="form-org"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. PixelCult"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-sans text-sm text-foreground focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="form-email" className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                Email Address <span className="text-accent">*</span>
              </label>
              <input
                id="form-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. aarav@pixelcult.com"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-sans text-sm text-foreground focus:border-accent/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="form-message" className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="form-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project, timeline, or training requirements..."
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-sans text-sm text-foreground focus:border-accent/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              id="form-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full group flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-mono text-xs font-black uppercase tracking-[0.2em] text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <CircleNotch className="animate-spin text-background" size={16} weight="bold" />
                  Transmitting...
                </>
              ) : (
                <>
                  Transmit Message
                  <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Success / Error Messages */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-xl border border-accent/20 bg-accent/5 flex items-start gap-3 text-xs md:text-sm text-accent animate-pulse"
              >
                <CheckCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono font-bold uppercase tracking-wider">[ SYSTEM MESSAGE: TRANSMISSION SUCCESSFUL ]</span>
                  <p className="mt-1 text-zinc-300">Thank you! Your message has been sent to info.pixelcult@gmail.com. We will get back to you shortly.</p>
                </div>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start gap-3 text-xs md:text-sm text-red-400"
              >
                <Warning size={20} className="shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono font-bold uppercase tracking-wider">[ SYSTEM WARNING: TRANSMISSION FAILED ]</span>
                  <p className="mt-1 text-zinc-300">
                    An error occurred while sending{errorMessage ? `: ${errorMessage}` : ""}. Please try again or email us directly at <a href="mailto:info.pixelcult@gmail.com" className="text-accent underline font-semibold">info.pixelcult@gmail.com</a>.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Sub-Links */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-12 md:flex-row">
          <div className="flex items-center gap-4">
            <img src="/bglogo.png" alt="PixelCult" className="h-8 w-8 object-contain" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              © 2026 PixelCult. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300">
            <span className="flex items-center gap-2 text-zinc-400">
              <MapPin size={14} className="text-accent" />
              Operating Globally
            </span>
            <a
              href="https://www.instagram.com/pixelcult_in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-accent transition-all duration-300 hover:scale-110 flex items-center justify-center p-1"
              aria-label="Instagram"
            >
              <InstagramLogo size={18} />
            </a>
            <a
              href="https://x.com/PixelCult_in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-accent transition-all duration-300 hover:scale-110 flex items-center justify-center p-1"
              aria-label="X (Twitter)"
            >
              <XLogo size={18} />
            </a>
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
