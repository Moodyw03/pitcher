import { Button } from "@/components/ui/button";

import { Download } from "lucide-react";

import AudioControls from "@/components/audio-controls";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-80 space-y-6">
        <AudioControls />

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
