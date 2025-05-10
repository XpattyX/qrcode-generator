import Image from "next/image";
import HomePage from "./(page)/create/page";

export const metadata = {
  title: "Free QR Code Generator | Create QR Codes Online",
  description: "Generate QR codes instantly for free. Create QR codes for URLs, text, vCards, and more. No sign-up required. Easy to use and download in multiple formats.",
  keywords: "qr code generator, free qr code, create qr code, qr code maker, online qr generator, qr code creator",
  openGraph: {
    title: "Free QR Code Generator | Create QR Codes Online",
    description: "Generate QR codes instantly for free. Create QR codes for URLs, text, vCards, and more. No sign-up required.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Code Generator Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator | Create QR Codes Online",
    description: "Generate QR codes instantly for free. Create QR codes for URLs, text, vCards, and more. No sign-up required.",
    images: ["/og-image.png"]
  }
};

export default function Home() {
  return (
    <HomePage/>
  );
}
