"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = ({ text, size = 256 }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(text, {
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };

    if (text) {
      generateQRCode();
    }
  }, [text, size]);

  if (!text) {
    return null;
  }

  return (
    <div>
      {qrCodeUrl && (
        <img
          src={qrCodeUrl}
          alt="QR Code"
          className="rounded-lg shadow-lg"
          width={size}
          height={size}
        />
      )}
      
    </div>
  );
};

export default QRCodeGenerator;
