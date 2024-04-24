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
          <Button variant="secondary" className="w-full">
            <Play className="mr-2 h-4 w-4" /> Play
          </Button>
          <Button variant="secondary" className="w-full">
            <Pause className="mr-2 h-4 w-4" /> Stop
          </Button>
        </div>

        <div className="relative">
          <div className="absolute transition-all duration-1000 opacity-75 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <Button className="w-full relative">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>

        {/* <div class="background-image">
          <div class="code-box">
            <div class="control-container">
              <input type="file" id="audioFile" accept="audio/*">
              <button id="playButton"
                class="btn btn-light">Play</button>
              <button id="stopButton" class="btn btn-light">Stop</button>
              <div>
                <style>
                  .center {
                      text-align: center;
                      color: white;
                  }
                </style>
                <input type="range" id="rateControl" min="0.5" max="2"
                  value="1" step="0.05">
              </div>
              <button id="downloadButton"
                class="btn btn-dark">Download</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
