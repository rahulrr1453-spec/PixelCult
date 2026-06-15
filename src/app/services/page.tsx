import type { Metadata } from "next";
import { ServicesClient } from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services — PixelCult",
  description:
    "Explore PixelCult's services: Custom website & webapp designs, immersive 3D interfaces, native Android application development, professional technical courses with company-endorsed certificates, and dual-accredited final year college project training.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
