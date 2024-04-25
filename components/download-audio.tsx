"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Download } from "lucide-react";

interface Props {
  audioFile: File | null;
  rate: number[];
}

export default function DownloadAudio({ audioFile, rate }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const speedFactor = rate[0];

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!audioFile) {
      alert("Please upload a file.");
      return;
    }
    if (speedFactor <= 0.5) {
      alert("Please enter a valid speed factor (greater than 0.5).");
      return;
    }

    const formData = new FormData();
    formData.append("audioFile", audioFile);
    formData.append("speedFactor", speedFactor.toString());

    try {
      const response = await fetch(
        "https://audio-speed-changer.onrender.com/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Assuming the server sends the processed file as a response
        response.blob().then((blob) => {
          const url = window.URL.createObjectURL(blob);

          console.log("Download URL:", url);

          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          a.download =
            audioFile.name.replace(/\.[^/.]+$/, "") + "-processed.mp3";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          alert("Your file has been downloaded!");
        });
      } else {
        response.text().then((text) => {
          console.error("Server response:", text);
          alert("Error: " + text);
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file.");
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="relative">
        <div className="absolute transition-all duration-1000 opacity-75 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <Button
          className="w-full relative"
          type="submit"
          disabled={!audioFile || isLoading}
        >
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    </form>
  );
}
