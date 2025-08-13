import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thinkr - AI-Powered Google Cloud Certification Assistant",
  description: "Get expert guidance on Google Cloud certifications with our AI assistant. Ask questions about exam requirements, study materials, career paths, and certification strategies.",
  keywords: ["Google Cloud", "GCP", "certification", "AI assistant", "cloud computing", "exam prep"],
  authors: [{ name: "Thinkr Team" }],
  creator: "Thinkr",
  publisher: "Thinkr",
  robots: "index, follow",
  openGraph: {
    title: "Thinkr - AI-Powered Google Cloud Certification Assistant",
    description: "Get expert guidance on Google Cloud certifications with our AI assistant. Ask questions about exam requirements, study materials, career paths, and certification strategies.",
    type: "website",
    locale: "en_US",
    siteName: "Thinkr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thinkr - AI-Powered Google Cloud Certification Assistant",
    description: "Get expert guidance on Google Cloud certifications with our AI assistant.",
    creator: "@thinkr",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
