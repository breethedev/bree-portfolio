import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Breeana Payton - Senior Frontend Software Engineer",
  description:
    "Senior Frontend Software Engineer with 5+ years of experience in React, TypeScript, CSS Modules, and Frontend Architecture.",
  keywords: [
    "Frontend Engineer",
    "React",
    "TypeScript",
    "Software Engineer",
    "Frontend Development",
  ],
  authors: [{ name: "Breeana Payton" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
