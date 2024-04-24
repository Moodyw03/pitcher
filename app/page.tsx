import AudioControls from "@/components/audio-controls";

export default function Home() {
  return (
    <div className="h-full grid grid-rows-3 justify-center justify-items-center items-center">
      <div className="relative sm:w-max mx-2">
        <div className="absolute transition-all duration-1000 opacity-50 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <div className="relative font-semibold text-2xl md:text-3xl text-white text-center text-wrap">
          Slowdown or Speed up your audio!
        </div>
      </div>
      <AudioControls />
    </div>
  );
}
