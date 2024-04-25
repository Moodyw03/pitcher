"use client";

import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import DownloadAudio from "./download-audio";

export default function AudioControls() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [player, setPlayer] = useState<Tone.Player | null>(null);
  const [rate, setRate] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const newPlayer = new Tone.Player().toDestination();
    newPlayer.onstop = () => {
      setIsPlaying(false);
    };

    setPlayer(newPlayer);

    return () => {
      newPlayer.dispose();
    };
  }, []);

  function handleOnFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setAudioFile(file);
    if (player) {
      player.load(url);
    }
  }

  function handlePlay() {
    if (player && !isPlaying) {
      player.start();
      setIsPlaying(true);
    }
  }

  function handleStop() {
    if (player && isPlaying) {
      player.stop();
    }
  }

  function handleChangeRate(value: number[]) {
    setRate(value);
    if (player) {
      player.playbackRate = value[0];
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
