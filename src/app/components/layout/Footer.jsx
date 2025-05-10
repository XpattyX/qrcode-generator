import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#f0ebd8] py-2 fixed bottom-0 w-full">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} QR Code Generator. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
