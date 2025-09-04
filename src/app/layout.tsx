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
  authors: [{ name: "The Escape Crew" }],
  creator: "Ronald & Friends",
  publisher: "TheEscape2026",
  metadataBase: new URL("https://theescape2026.nl"),
  openGraph: {
    title: "De Ontsnapping 2026",
    description: "5 vrienden, 1 epische Europese reis, ontelbare herinneringen",
    type: "website",
    url: "https://theescape2026.nl",
    siteName: "De Ontsnapping 2026",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "De Ontsnapping 2026 - Europees Avontuur",
      },
    ],
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "De Ontsnapping 2026",
    description: "5 vrienden op Europees avontuur in juni 2026",
    images: ["/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
