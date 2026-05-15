"use client";

import { useEffect, useRef } from "react";

export function VideoScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Load video metadata
    video.load();

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || !video.duration) return;

      const section = container.closest("section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      if (video.readyState >= 2) {
        video.currentTime = progress * video.duration;
      }
    };

    const renderFrame = () => {
      if (video.readyState >= 2) {
        const width = video.videoWidth;
        const height = video.videoHeight;
        
        if (canvas.width !== width) {
          canvas.width = width;
          canvas.height = height;
        }

        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, width, height);

        // Get image data to remove background
        const frame = ctx.getImageData(0, 0, width, height);
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Luma-to-alpha: Make darker pixels more transparent
          // This creates a clean keying effect
          const brightness = (r + g + b) / 3;
          if (brightness < 40) {
             data[i + 3] = (brightness / 40) * 255;
          }
          
          // Boost the emerald color if it's already green-ish
          if (g > r && g > b) {
            data[i + 1] = Math.min(255, g * 1.2);
          }
        }

        ctx.putImageData(frame, 0, 0);
      }
      requestRef.current = requestAnimationFrame(renderFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    requestRef.current = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none absolute -right-[15%] top-1/2 z-20 w-[90%] -translate-y-[45%] opacity-100 md:w-[75%] lg:w-[65%]"
    >
      {/* Hidden video element for sourcing frames */}
      <video
        ref={videoRef}
        src="/anilogo.mp4"
        muted
        playsInline
        className="hidden"
      />
      {/* Visible canvas for the keyed video */}
      <canvas
        ref={canvasRef}
        className="h-full w-full object-contain filter drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]"
      />
    </div>
  );
}
