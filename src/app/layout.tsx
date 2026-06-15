import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { DigitalCore } from "@/components/ui/DigitalCore";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "PixelCult — Engineering Scale & Logic",
  description:
    "We architect high-performance websites, native Android applications, complex full-stack webapps, and intelligent AI integrations.",
  metadataBase: new URL("https://pixelcult.com"),
  icons: {
    icon: "/bglogo.png",
    shortcut: "/bglogo.png",
    apple: "/bglogo.png",
  },
  verification: {
    google: "YbFEAU-9qLLGzmD8zLPSHJXhMep6haMsQznSWvTJb1c",
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body 
        className="relative min-h-full bg-background text-foreground grain"
        suppressHydrationWarning
      >
        <DigitalCore />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
