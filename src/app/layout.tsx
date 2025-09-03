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
  title: "The Escape 2026 - European Adventure",
  description: "5 friends voting on European destinations for June 2026 holiday. Join us on our epic journey!",
  keywords: ["travel", "europe", "vacation", "friends", "2026", "adventure"],
  openGraph: {
    title: "The Escape 2026",
    description: "5 friends, 1 epic European journey, unlimited memories",
    type: "website",
    url: "https://theescape2026.nl",
  },
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
