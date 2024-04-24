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

  async function create() {
    const formData = new FormData();
    formData.append("speedFactor", speedFactor.toString());
    formData.append("audio", audioFile as Blob);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <form action={create}>
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
