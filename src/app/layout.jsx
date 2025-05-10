import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Free QR Code Generator | Create QR Codes Online",
  description:
    "Generate QR codes instantly for free. Create QR codes for URLs, text, vCards, and more. No sign-up required. Easy to use and download in multiple formats.",
  keywords:
    "qr code generator, free qr code, create qr code, qr code maker, online qr generator, qr code creator",
  openGraph: {
    title: "Free QR Code Generator | Create QR Codes Online",
    description:
      "Generate QR codes instantly for free. Create QR codes for URLs, text, vCards, and more. No sign-up required.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Code Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator | Create QR Codes Online",
    description:
      "Generate QR codes instantly for free. Create QR codes for URLs, text, vCards, and more. No sign-up required.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense or any script you need */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4003202903244366"
          crossorigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#1d2d44] flex flex-col gap-3`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
