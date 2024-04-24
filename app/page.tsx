import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Download, Pause, Play } from "lucide-react";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-80 space-y-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="audio">Select an audio file</Label>
          <Input id="audio" type="file" />
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            <Play className="mr-2 h-4 w-4" /> Play
          </Button>
          <Button variant="outline" className="w-full">
            <Pause className="mr-2 h-4 w-4" /> Stop
          </Button>
        </div>

        <Button variant="default" className="w-full">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>

        {/* 
        <input type="file" id="audioFile" accept="audio/*" />
        <button id="playButton" className="btn btn-light">
            Play
          </button>
          <button id="stopButton" className="btn btn-light">
            Stop
          </button>
        <div>
          <input
            type="range"
            id="rateControl"
            min="0.5"
            max="2"
            value="1"
            step="0.05"
          />
        </div>
        <button id="downloadButton" className="btn btn-dark">
            Download
        </button> 
        */}
      </div>
    </div>
  );
}
