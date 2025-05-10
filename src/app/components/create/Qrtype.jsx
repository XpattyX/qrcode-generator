import { Button } from "@/components/ui/button";
import React from "react";

export default function Qrtype({ type, setType }) {
  const handleClick = (selectedType) => {
    setType(selectedType);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        className={`cursor-pointer ${
          type === "url" ? "bg-[#001d3d] text-white" : ""
        }`}
        variant={type === "url" ? "default" : "outline"}
        onClick={() => handleClick("url")}
      >
        URL
      </Button>
      <Button
        className={`cursor-pointer ${
          type === "text" ? "bg-[#001d3d] text-white" : ""
        }`}
        variant={type === "text" ? "default" : "outline"}
        onClick={() => handleClick("text")}
      >
        Text
      </Button>
    </div>
  );
}
