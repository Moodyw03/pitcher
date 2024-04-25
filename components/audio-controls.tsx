"use client";

import { useState, useRef, useEffect } from "react";
import { Howl } from "howler";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import DownloadAudio from "./download-audio";

export default function AudioControls() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audio, setAudio] = useState<Howl | null>(null);
  const [rate, setRate] = useState([1]);
  const audioRef = useRef<Howl | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  function handleOnFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const fileExtension = file.name.split(".").pop();
    if (!fileExtension) return;

    setAudioFile(file);

    // Cleanup the old Howl object if it exists
    if (audioRef.current) {
      audioRef.current.unload();
    }

    // Create a new Howl object for the new file
    const newAudio = new Howl({
      src: [url],
      format: [fileExtension],
      html5: true, // Force to use HTML5 Audio
      preload: true,
      onplay: () => {
        setIsPlaying(true);
        console.log("Audio is playing!");
      },
      onload: () => console.log("Audio loaded successfully!"),
      onend: () => {
        setIsPlaying(false);
        console.log("Audio has ended!");
      },
      onloaderror: (id, err) => console.log("Failed to load audio:", err),
      onplayerror: (id, err) => console.log("Error during playback:", err),
    });

    // Store the new Howl object in the ref
    audioRef.current = newAudio;
    setAudio(newAudio);
    setRate([1]);
  }

  function handlePlay() {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  function handleStop() {
    if (audioRef.current) {
      audioRef.current.stop();
      setIsPlaying(false);
    }
  }

  function handleChangeRate(value: number[]) {
    setRate(value);
    const rate = value[0];
    if (audioRef.current) {
      audioRef.current.rate(rate);
    }
  }

  return (
    <div className="w-80 space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="audio" className="text-white font-semibold">
          Select an audio file
        </Label>
        <Input
          id="audio"
          type="file"
          accept="audio/*"
          onChange={handleOnFileChange}
        />
      </div>
      <div className="relative w-4/5 mx-auto">
        <div className="absolute transition-all duration-1000 opacity-75 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <Slider
          defaultValue={[1]}
          min={0.5}
          max={2}
          step={0.05}
          value={rate}
          onValueChange={handleChangeRate}
        />
      </div>
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          className="w-full"
          disabled={isPlaying}
          onClick={handlePlay}
        >
          Play
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleStop}>
          Stop
        </Button>
      </div>

      <DownloadAudio audioFile={audioFile} rate={rate} />
    </div>
  );
}
