"use client";

import { useState, useEffect } from "react";
import * as Tone from "tone";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";

export default function AudioControls() {
  const [player, setPlayer] = useState<Tone.Player | null>(null);
  const [recorder, setRecorder] = useState<Tone.Recorder | null>(null);

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [rate, setRate] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const newPlayer = new Tone.Player().toDestination();
    const newRecorder = new Tone.Recorder();
    newPlayer.onstop = () => {
      setIsPlaying(false);
    };

    newPlayer.connect(newRecorder);

    setPlayer(newPlayer);
    setRecorder(newRecorder);

    return () => {
      newPlayer.dispose();
      newRecorder.dispose();
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

    if (recorder?.state === "started") recorder.stop();
    if (player?.state === "started") player.stop();
  }

  async function handlePlay() {
    if (player && recorder && !isPlaying) {
      if (recorder?.state === "paused") await recorder.stop(); // Stop recording if paused
      recorder.start();
      player.start();
      setIsPlaying(true);
    }
  }

  async function handleStop() {
    if (player && isPlaying) {
      player.stop();
      if (recorder && recorder.state === "started") {
        recorder.pause();
      }
    }
  }

  function handleChangeRate(value: number[]) {
    setRate(value);
    if (player) player.playbackRate = value[0];
  }

  async function handleDownload() {
    if (!recorder) return alert("Nothing recorded.");

    if (recorder.state === "stopped")
      return alert("Nothing recorded. Please play the audio to record.");

    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = audioFile?.name + "-processed.webm";
    document.body.appendChild(a);
    a.click();
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
          step={0.01}
          value={rate}
          onValueChange={handleChangeRate}
        />
      </div>
      <div className="flex space-x-4">
        <Button
          variant="secondary"
          className="w-full"
          disabled={!audioFile || !player || !recorder || isPlaying}
          onClick={handlePlay}
        >
          Play
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleStop}>
          Stop
        </Button>
      </div>

      <div className="relative">
        <div className="absolute transition-all duration-1000 opacity-75 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <Button
          className="w-full relative"
          disabled={!audioFile || !recorder}
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    </div>
  );
}
