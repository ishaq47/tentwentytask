import { useEffect, useState } from "react";
import "../index.css";
import slides from "../layout/SliderData";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    setProgressKey((prev) => prev + 1);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000
          ${i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        >
          <img src={slide.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />

         
          <div className="absolute left-10 lg:left-32 top-1/2 -translate-y-1/2 text-white">
          <h5 className="mb-4">Welcome to TenTwenty Farms</h5>
            <h1 key={slide.title} className="text-5xl animate-fadeUp">
              {slide.title}
            </h1>
            <h2 className="text-5xl mt-2 animate-fadeUp delay-200">
              {slide.subtitle}
            </h2>
          </div>
        </div>
      ))}

   
      <div className="absolute bottom-16 left-10 lg:left-32 flex items-center gap-8 text-white">

    
        <div className="relative w-28 h-28 flex items-center justify-center ">

         
          <svg className="absolute inset-0 w-full h-full -rotate-30 ">
            <rect
              x="4"
              y="4"
              width="104"
              height="104"
              className="stroke-white fill-none"
              strokeWidth="5"
              
              strokeDasharray="416"
              strokeDashoffset="416"
              style={{
                
                animation: "borderProgress 5s linear forwards",
              }}
              key={progressKey}
            />
          </svg>

          <div className="w-16 h-16 relative">

            <img
              src={slides[(index + 1) % slides.length].image}
              className="w-full h-full object-cover"
            />

            <button
              onClick={nextSlide}
              className="absolute inset-0  flex items-center justify-center text-white text-sm"
            >
              Next
            </button>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center gap-4 text-sm tracking-widest">
          <span>{String(index + 1).padStart(2, "0")}</span>

          <div className="w-24 h-[1px] bg-white/50 relative overflow-hidden">
            <span
              key={progressKey}
              className="absolute left-0 top-0 h-full bg-white"
              style={{
                animation: "lineProgress 5s linear forwards",
              }}
            />
          </div>

          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}