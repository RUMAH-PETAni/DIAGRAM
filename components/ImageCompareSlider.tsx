'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageCompareSlider({
  before,
  after,
  width = 800,
  height = 450,
}: {
  before: string;
  after: string;
  width?: number;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dividerX, setDividerX] = useState(0.5); // posisi awal slider di tengah
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Mobile breakpoint
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
      setDividerX(x / rect.width);
    };

    const stopMove = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
    };

    const startMove = () => {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('mouseup', stopMove);
      document.addEventListener('touchend', stopMove);
    };

    const bar = containerRef.current?.querySelector('.slider-bar');
    if (bar) {
      bar.addEventListener('mousedown', startMove);
      bar.addEventListener('touchstart', startMove);
    }

    return () => {
      if (bar) {
        bar.removeEventListener('mousedown', startMove);
        bar.removeEventListener('touchstart', startMove);
      }
    };
  }, []);

  // Determine aspect ratio based on device
  const aspectRatio = isMobile ? '1/1' : `${width}/${height}`;

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto select-none cursor-ew-resize overflow-hidden rounded-xl shadow-lg"
      style={{ aspectRatio, maxWidth: '100%' }}
    >
      {/* Gambar After (full background) */}
      <div className="absolute inset-0">
        <Image
          src={after}
          alt="After"
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Gambar Before (clip pakai mask) - POSISI FIXED */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - dividerX * 100}% 0 0)` }}
      >
        <div className="absolute inset-0">
          <Image
            src={before}
            alt="Before"
            fill
            className="object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* Garis dan tombol slider */}
      <div
        className="slider-bar absolute top-0 bottom-0 w-[2px] bg-white"
        style={{ left: `${dividerX * 100}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        bg-white rounded-full border border-gray-400 w-6 h-6 
                        flex items-center justify-center shadow-md">
          <div className="w-2 h-2 bg-gray-700 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
