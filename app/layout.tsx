import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./globalicon.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  fallback: ["Helvetica", "sans-serif"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PAG OWI - Photomosaic Art Generator",
  description: "Photomosaic Art Generator",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" bbai-tooltip-injected="true" className="scroll-smooth">
      <body className={`${jakartaSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
