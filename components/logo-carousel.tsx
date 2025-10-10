"use client";

import { useState, useEffect } from "react";

type LogoProps = {
  children: React.ReactNode;
  href: string;
  alt: string;
};

export default function LogoCarousel({ logos }: { logos: LogoProps[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div className="relative w-full overflow-hidden h-16">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {logos.map((logo, index) => (
          <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
            <a
              href={logo.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-80 flex items-center"
            >
              {logo.children}
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2 space-x-1">
        {logos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-foreground" : "bg-foreground/30"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}