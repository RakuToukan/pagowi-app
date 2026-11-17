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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head><meta name="google-site-verification" content="rN809bxoZqAss6laDrZHH8knvho7eZiPESASIPRC89Q" /></head>
      <body className={`${jakartaSans.variable} antialiased`} tabIndex={-1}>
        {children}
      </body>
    </html>
  );
}
