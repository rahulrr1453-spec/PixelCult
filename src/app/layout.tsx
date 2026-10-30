import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { DigitalCore } from "@/components/ui/DigitalCore";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "PixelCult — Engineering Scale & Logic",
  description:
    "We architect high-performance websites, native Android applications, complex full-stack webapps, and intelligent AI integrations.",
  metadataBase: new URL("https://pixelcult.net"),
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
      className="h-full antialiased overflow-x-hidden"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Outfit:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        className="relative min-h-full w-full max-w-full overflow-x-hidden bg-background text-foreground grain"
        suppressHydrationWarning
      >
        <DigitalCore />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
