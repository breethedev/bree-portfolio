import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { New_Amsterdam, Fira_Code, Cascadia_Code } from "next/font/google";

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

const newAmsterdam = New_Amsterdam({
  weight: "400",
  variable: "--btd-font-mono",
});

const firaCode = Fira_Code({
  weight: ["400", "500", "600", "700"],
  variable: "--btd-font-main",
});

const cascadiaCode = Cascadia_Code({
  weight: ["400", "700"],
  variable: "--btd-font-code",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${newAmsterdam.variable} ${firaCode.variable} ${cascadiaCode.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
