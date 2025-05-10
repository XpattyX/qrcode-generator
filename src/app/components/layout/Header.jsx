import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="bg-white h-12">
      <div className="container flex items-center h-full justify-center">
        <Image
          src={"/logo/myqrcode-logo.png"}
          alt="logo"
          width={150}
          height={150}
          className="h-6 w-fit object-cover"
        />
      </div>
    </div>
  );
}
