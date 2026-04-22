import { useEffect, useRef, useState } from "react";
import "../index.css";

const data = [
  {
    image: "https://picsum.photos/id/1011/400/600",
    title: "Client 1",
    desc: "Dubai, United Arab Emirates",
  },
  {
    image: "https://picsum.photos/id/1018/400/600",
    title: "Client 2",
    desc: "Islamic Republic of Iran",
  },
  {
    image: "https://picsum.photos/id/1015/400/600",
    title: "Client 3",
    desc: "Islamic Republic of Pakistan",
  },
  {
    image: "https://picsum.photos/id/1016/400/600",
    title: "Client 4",
    desc: "United States",
  },
];

export default function Product() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [index]);

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  const prevIndex = (index - 1 + data.length) % data.length;
  const nextIndex = (index + 1) % data.length;

  const visibleSlides = [data[prevIndex], data[index], data[nextIndex]];

  const handleDragStart = (e) => {
    const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;

    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;

    setDragOffset(clientX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    if (dragOffset > 60) prev();
    if (dragOffset < -60) next();

    setIsDragging(false);
    setDragOffset(0);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={sectionRef}
      className="py-20 bg-[#f5f5f5] text-center overflow-hidden"
    >
      <h2
        className={`text-4xl mb-4 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        Quality Products
      </h2>

      <p
        className={`px-6 max-w-xl mx-auto text-gray-500 mb-20 transition-all duration-700 delay-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      {/* Slider */}

      <div className="relative flex justify-center items-end h-[390px] lg:h-[690px] overflow-hidden px-4">
        {visibleSlides.map((item, i) => {
          const isCenter = i === 1;

          return (
            <div
              key={item.image}
              className="absolute transition-all duration-700  ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                zIndex: isCenter ? 30 : 10,

                /* side cards lower + center card little up */
                transform: isCenter
                  ? `translateY(-10px) translateX(${
                      isDragging ? dragOffset * 0.25 : 0
                    }px) scale(1)`
                  : i === 0
                    ? "translateX(-88%) translateY(28px) rotate(-14deg) scale(.92)"
                    : "translateX(88%) translateY(28px) rotate(14deg) scale(.92)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[232px] h-[331px] lg:w-[435px] lg:h-[619px] object-cover "
              />

              {/* drag button */}
              {isCenter && (
                <div
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  className="hidden lg:flex absolute inset-0 m-auto w-[100px] h-[100px] bg-white rounded-full items-center justify-center shadow-xl cursor-grab active:cursor-grabbing"
                >
                  Drag
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h3 className="mt-10 text-xl font-medium">{data[index].title}</h3>
      <p className="mt-4 text-gray-500">{data[index].desc}</p>
    </div>
  );
}