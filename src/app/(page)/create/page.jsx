"use client";
import QRCodeGenerator from "@/app/components/create/Qrcode";
import Qrtype from "@/app/components/create/Qrtype";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useRef } from "react";
import { RiDownload2Fill, RiAddLine, RiDeleteBin6Line } from "react-icons/ri";
import JSZip from "jszip";

export default function HomePage() {
  const [type, setType] = useState("url");
  const [bulkMode, setBulkMode] = useState(false);
  const [singleInput, setSingleInput] = useState("www.example.com");
  const [bulkInputs, setBulkInputs] = useState([
    { id: 1, value: "www.example.com", filename: "qrcode_1" },
  ]);
  const [bulkTextArea, setBulkTextArea] = useState("");
  const canvasRefs = useRef([]);

  const handleSetSingleInput = (value) => {
    if (!value) {
      setSingleInput("www.example.com");
      return;
    }
    setSingleInput(value);
  };

  const addBulkInput = () => {
    const newId = Math.max(...bulkInputs.map((item) => item.id)) + 1;
    setBulkInputs([
      ...bulkInputs,
      {
        id: newId,
        value: "",
        filename: `qrcode_${newId}`,
      },
    ]);
  };

  const removeBulkInput = (id) => {
    if (bulkInputs.length > 1) {
      setBulkInputs(bulkInputs.filter((item) => item.id !== id));
    }
  };

  const updateBulkInput = (id, field, value) => {
    setBulkInputs(
      bulkInputs.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const processBulkTextArea = () => {
    if (!bulkTextArea.trim()) return;

    const lines = bulkTextArea.split("\n").filter((line) => line.trim());
    const newInputs = lines.map((line, index) => ({
      id: Date.now() + index,
      value: line.trim(),
      filename: `qrcode_${index + 1}`,
    }));

    setBulkInputs(newInputs);
    setBulkTextArea("");
  };

  const downloadSingleQR = async () => {
    try {
      // Create a canvas to generate QR code
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // You'll need to implement QR code generation here
      // This is a placeholder - replace with your actual QR generation logic
      const qrCanvas = await generateQRCanvas(singleInput, 256);

      // Convert to blob and download
      qrCanvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `qrcode_${sanitizeFilename(singleInput)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      });
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  const downloadBulkQR = async () => {
    try {
      const zip = new JSZip();

      for (const item of bulkInputs) {
        if (item.value.trim()) {
          const qrCanvas = await generateQRCanvas(item.value, 256);

          // Convert canvas to blob
          const blob = await new Promise((resolve) => {
            qrCanvas.toBlob(resolve);
          });

          // Add to zip with custom filename
          const filename = item.filename || `qrcode_${item.id}`;
          zip.file(`${sanitizeFilename(filename)}.png`, blob);
        }
      }

      // Generate and download zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `qr-codes-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading bulk QR codes:", error);
    }
  };

  // Helper function to generate QR code canvas
  const generateQRCanvas = async (text, size) => {
    // Create a temporary div to render the QR code
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.visibility = "hidden";
    document.body.appendChild(tempDiv);

    // Create QR code using your component (assuming it creates SVG or Canvas)
    // This is a more direct approach
    try {
      // If your QRCodeGenerator creates an SVG
      tempDiv.innerHTML = `<div id="temp-qr"></div>`;

      // You might need to use your QR library directly here
      // For example, if you're using qrcode library:
      const QRCode = require("qrcode");
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, text, {
        width: size,
        margin: 1, // Reduced margin (default is usually 4)
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      document.body.removeChild(tempDiv);
      return canvas;
    } catch (error) {
      // Fallback: try to find existing QR code canvas on page
      const existingCanvas = document.querySelector("canvas");
      if (existingCanvas) {
        const clonedCanvas = document.createElement("canvas");
        clonedCanvas.width = size;
        clonedCanvas.height = size;
        const ctx = clonedCanvas.getContext("2d");
        ctx.drawImage(existingCanvas, 0, 0, size, size);
        document.body.removeChild(tempDiv);
        return clonedCanvas;
      }

      // Ultimate fallback
      console.error("Could not generate QR code:", error);
      const fallbackCanvas = document.createElement("canvas");
      fallbackCanvas.width = size;
      fallbackCanvas.height = size;
      const ctx = fallbackCanvas.getContext("2d");
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText("QR Generation Failed", 10, size / 2);

      document.body.removeChild(tempDiv);
      return fallbackCanvas;
    }
  };

  const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-z0-9.-]/gi, "_").substring(0, 100);
  };

  return (
    <div className="container bg-white lg:rounded-lg min-h-[90vh] px-10 py-6 flex flex-col gap-4">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setBulkMode(false)}
            className={`px-4 py-2 rounded-md transition-colors ${
              !bulkMode
                ? "bg-[#001d3d] text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Single QR Code
          </button>
          <button
            onClick={() => setBulkMode(true)}
            className={`px-4 py-2 rounded-md transition-colors ${
              bulkMode
                ? "bg-[#001d3d] text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Bulk Generator
          </button>
        </div>
      </div>

      {!bulkMode ? (
        /* Single QR Code Mode */
        <div className="flex flex-col gap-5 justify-center items-center">
          <Qrtype type={type} setType={setType} />
          <Input
            type="text"
            placeholder={`Enter your ${type}`}
            className="w-[20rem]"
            value={singleInput}
            onChange={(e) => handleSetSingleInput(e.target.value)}
          />
          <div className="flex flex-col gap-5 justify-center items-center bg-[#001d3d] p-6 rounded-lg">
            <p className="text-white">Live Preview</p>
            <QRCodeGenerator text={singleInput} size={256} />
            <p className="text-white text-center break-all max-w-[300px]">
              {singleInput}
            </p>
          </div>
          <Button
            onClick={downloadSingleQR}
            className="cursor-pointer bg-[#001d3d] rounded-full text-white p-5"
          >
            <RiDownload2Fill />
          </Button>
        </div>
      ) : (
        /* Bulk QR Code Mode */
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#001d3d] mb-2">
              Bulk QR Code Generator
            </h2>
            <p className="text-gray-600">Generate multiple QR codes at once</p>
          </div>

          <Qrtype type={type} setType={setType} />

          {/* Quick Import from Text Area */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Quick Import (One per line)</h3>
            <Textarea
              placeholder={`Enter multiple ${type}s, one per line...`}
              value={bulkTextArea}
              onChange={(e) => setBulkTextArea(e.target.value)}
              className="mb-2"
              rows={4}
            />
            <Button
              onClick={processBulkTextArea}
              className="bg-[#001d3d] text-white"
              disabled={!bulkTextArea.trim()}
            >
              Import List
            </Button>
          </div>

          {/* Individual Inputs */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Individual Entries</h3>
              <Button
                onClick={addBulkInput}
                className="bg-green-600 text-white p-2 rounded-full"
                size="sm"
              >
                <RiAddLine />
              </Button>
            </div>

            {bulkInputs.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-2 items-center p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                <Input
                  placeholder={`Enter ${type}`}
                  value={item.value}
                  onChange={(e) =>
                    updateBulkInput(item.id, "value", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  placeholder="Filename"
                  value={item.filename}
                  onChange={(e) =>
                    updateBulkInput(item.id, "filename", e.target.value)
                  }
                  className="w-32"
                />
                {bulkInputs.length > 1 && (
                  <Button
                    onClick={() => removeBulkInput(item.id)}
                    className="bg-red-500 text-white p-2 rounded-full"
                    size="sm"
                  >
                    <RiDeleteBin6Line />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Preview Grid */}
          <div className="bg-[#001d3d] p-6 rounded-lg">
            <h3 className="text-white text-center mb-4">
              Preview ({bulkInputs.filter((item) => item.value.trim()).length}{" "}
              QR Codes)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bulkInputs
                .filter((item) => item.value.trim())
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-3 rounded-lg text-center"
                  >
                    <QRCodeGenerator text={item.value} size={128} />
                    <p className="text-xs mt-2 break-all">{item.filename}</p>
                    <p className="text-xs text-gray-500 break-all">
                      {item.value}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <Button
              onClick={downloadBulkQR}
              className="cursor-pointer bg-[#001d3d] text-white px-8 py-3 rounded-full"
              disabled={!bulkInputs.some((item) => item.value.trim())}
            >
              <RiDownload2Fill className="mr-2" />
              Download All QR Codes as ZIP
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Downloads {bulkInputs.filter((item) => item.value.trim()).length}{" "}
              QR codes
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
