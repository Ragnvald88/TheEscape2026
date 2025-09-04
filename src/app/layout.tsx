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
  title: "De Ontsnapping 2026 - Europees Avontuur",
  description: "5 vrienden stemmen op Europese bestemmingen voor juni 2026 vakantie. Van Springsteen concerten naar nieuwe horizonten!",
  keywords: ["reizen", "europa", "vakantie", "vrienden", "2026", "avontuur", "nederland", "springsteen"],
  openGraph: {
    title: "De Ontsnapping 2026",
    description: "5 vrienden, 1 epische Europese reis, ontelbare herinneringen",
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
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
