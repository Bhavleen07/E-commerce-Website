import React, { useState, useEffect } from "react";
import first from "../../assets/1_slider.png";
import second from "../../assets/2_slider.png";
import third from "../../assets/3_slider.png";

const slides = [
  {
    src: first,
    alt: "Embroidery Hoop 1",
  },
  {
    src: second,
    alt: "Embroidery Hoop 2",
  },
  {
    src: third,
    alt: "Kiroshiya Work",
  },
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] bg-white overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-48 sm:h-64 md:h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-black scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
