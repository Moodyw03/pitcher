"use client";

import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import { Play, Square } from "lucide-react";

export default function AudioControls() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [rate, setRate] = useState([1]); // [0.5, 2]
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const audio = new Audio(URL.createObjectURL(file));
    setAudio(audio);
    setIsPlaying(false); // Reset playing state on new file load

    initializeAudioContext(file);
  }

  function initializeAudioContext(file: File) {
    if (audioContextRef.current) {
      audioContextRef.current.close(); // Ensure to close the existing context properly
    }

    const audioContext = new AudioContext();
    const sourceNode = audioContext.createBufferSource();
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        audioContext.decodeAudioData(result, (decodedData) => {
          sourceNode.buffer = decodedData;
          sourceNode.connect(audioContext.destination);
          sourceNodeRef.current = sourceNode;
        });
      }
    };
    reader.readAsArrayBuffer(file);
    audioContextRef.current = audioContext;
  }

  function handlePlay() {
    // Check if audio context is initialized
    if (!audioContextRef.current) {
      console.error("Audio context is not initialized");
      return;
    }

    // Stop any currently playing audio if isPlaying is true
    if (isPlaying) {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop(); // Stop the current source node
        sourceNodeRef.current.disconnect(); // Disconnect it from the context
      }
      setIsPlaying(false); // Update the isPlaying state to false
    }

    // Reinitialize the source node every time play is clicked
    const sourceNode = audioContextRef.current.createBufferSource();

    // Ensure we have the buffer available from the last loaded file
    if (!sourceNodeRef.current || !sourceNodeRef.current.buffer) {
      console.error(
        "Audio buffer is not loaded or source node is not initialized"
      );
      return;
    }

    // Set the buffer from the previous node
    sourceNode.buffer = sourceNodeRef.current.buffer;
    sourceNode.connect(audioContextRef.current.destination);
    sourceNode.start(0);
    sourceNode.onended = () => setIsPlaying(false); // Update isPlaying when audio ends

    // Update the reference to the new node
    sourceNodeRef.current = sourceNode;

    setIsPlaying(true);
    console.log("Playing audio");

    // Handle the audio context state, resuming if necessary
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().then(() => {
        console.log("Audio context resumed");
      });
    }
  }

  function handleStop() {
    if (!sourceNodeRef.current || !isPlaying) {
      console.error("Audio is not playing or source node is not initialized");
      return;
    }

    sourceNodeRef.current.stop();
    setIsPlaying(false);
    console.log("Stopped audio");
  }

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="audio" className="text-white font-semibold">
          Select an audio file
        </Label>
        <Input
          id="audio"
          type="file"
          accept="audio/*"
          onChange={onFileChange}
        />
      </div>

      <Slider
        defaultValue={[1]}
        min={0.5}
        max={2}
        step={0.05}
        value={rate}
        onValueChange={(value) => setRate(value)}
      />

      <div className="space-y-3">
        <Button
          variant="secondary"
          className="w-full"
          disabled={isPlaying}
          onClick={handlePlay}
        >
          <Play className="mr-2 h-4 w-4" /> Play
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleStop}>
          <Square className="mr-2 h-4 w-4" /> Stop
        </Button>
      </div>
    </>
  );
}
