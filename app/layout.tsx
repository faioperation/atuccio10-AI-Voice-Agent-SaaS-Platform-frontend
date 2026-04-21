import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clinch — AI Voice Agents for Insurance Sales Teams",
  description:
    "Precision-milled AI Voice Agents for high-volume insurance teams. Instant lead qualification, real-time agent coaching, and seamless CRM sync.",
  keywords: "insurance AI, voice agents, lead qualification, insurance sales, AI coaching",
  openGraph: {
    title: "Clinch — Close More Insurance Deals with AI",
    description: "AI Voice Agents that qualify leads in seconds and coach agents in real time.",
    type: "website",
  },
};

import { QueryProvider } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}