"use client";

import QRCodeGenerator from "@/app/components/create/Qrcode";
import Qrtype from "@/app/components/create/Qrtype";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { RiDownload2Fill } from "react-icons/ri";

export default function HomePage() {
  const [type, setType] = useState("url");
  const [input, setInput] = useState("www.example.com");

  const handleSetInput = (value) => {
    if (!value) {
      setInput("www.example.com");
      return;
    }

    setInput(value);
  };

  return (
    <div className="container bg-white lg:rounded-lg h-[90vh] px-10 py-6 flex flex-col gap-4">
      <div className="flex flex-col gap-5 justify-center items-center">
        <Qrtype type={type} setType={setType} />
        <Input
          type="text"
          placeholder={`Enter your ${type}`}
          className="w-[20rem]"
          onChange={(e) => handleSetInput(e.target.value)}
        />
        <div className="flex flex-col gap-5 justify-center items-center bg-[#001d3d] p-6 rounded-lg">
          <p className="text-white">Live Preview</p>
          <QRCodeGenerator text={input} size={256} />
          <p className="text-white">{input}</p>
        </div>
        <Button
          onClick={() => {
            const link = document.createElement("a");
            link.href = input;
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className={"cursor-pointer bg-[#001d3d] rounded-full text-white p-5"}
        >
          <RiDownload2Fill />
        </Button>
      </div>
    </div>
  );
}
