"use client";

export default function HeroVisualizer() {
  return (
    <div className="w-full h-[500px] relative flex items-center justify-center bg-transparent">
      {/* 1. Main Globe Container (The Glass Sphere) */}
      <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-full border border-white/10 shadow-[inset_0_0_60px_rgba(59,130,246,0.2)] flex items-center justify-center overflow-hidden">
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-20" 
             style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}} />

        {/* 2. Rotating Orbit Rings */}
        {/* Vertical Blue Ring */}
        <div className="absolute w-[95%] h-[95%] rounded-full border border-blue-500/40 animate-globe"
             style={{ transform: 'rotateX(75deg) rotateY(10deg)' }} />
        
        {/* Slanted Orange Ring */}
        <div className="absolute w-[98%] h-[98%] rounded-full border border-dashed border-orange-500/30 animate-globe-reverse"
             style={{ transform: 'rotateX(-30deg) rotateY(-20deg)' }} />

        {/* 3. The Central Rotating Logo (Cube Effect) */}
        <div className="relative z-10 w-24 h-24 md:w-32 md:h-32">
          {/* Main Logo Body */}
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.5)] flex items-center justify-center animate-bounce duration-[3000ms]">
            {/* Inner "Y" or Logo Detail */}
            <div className="w-1/2 h-1/2 border-t-4 border-l-4 border-white/80 rotate-45" />
            
            {/* Glass Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Floating Data Point (Blue Dot) */}
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa] animate-pulse" />
      </div>

      {/* 4. Deep Background Glows (For the Atmosphere) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[100px] -z-10" />
    </div>
  );
}