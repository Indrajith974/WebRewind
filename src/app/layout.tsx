import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WebRewind | The Internet History Archive",
    template: "%s | WebRewind"
  },
  description: "Travel back in time and explore over 50,000 historical websites from 1990 to 2024. Experience the classic retro web with our vintage browser emulators.",
  keywords: ["internet history", "web archive", "retro internet", "90s websites", "2000s websites", "wayback machine", "nostalgia", "windows 95 emulator"],
  authors: [{ name: "Indrajith" }],
  creator: "Indrajith",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://web-rewind-7jt2.vercel.app/",
    title: "WebRewind | The Internet History Archive",
    description: "Travel back in time and explore over 50,000 historical websites from 1990 to 2024.",
    siteName: "WebRewind",
    images: [
      {
        url: "/og-image.png", // Next.js will look for this in public folder, or fallback to default
        width: 1200,
        height: 630,
        alt: "WebRewind Internet Archive Time Machine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebRewind | The Internet History Archive",
    description: "Travel back in time and explore over 50,000 historical websites from 1990 to 2024.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
