export default function Nav() {
  return (
    <nav className="min-h-16 flex items-center justify-center">
      <div className="relative w-max mx-2">
        <div className="absolute transition-all duration-1000 opacity-50 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <div className="relative font-semibold text-2xl md:text-3xl text-white text-center">
          Slowdown or Speed up your audio!
        </div>
      </div>
    </nav>
  );
}
