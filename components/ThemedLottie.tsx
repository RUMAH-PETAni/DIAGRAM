'use client';

import { useTheme } from 'next-themes';
import Lottie, { type LottieProps } from 'lottie-react';
import { useEffect, useState } from 'react';

interface ThemedLottieProps extends Omit<LottieProps, 'animationData'> {
  animationData: any;
  darkColor?: string;
  lightColor?: string;
}

export default function ThemedLottie({
  animationData,
  darkColor = '#e0e0e0', // Light gray for dark theme to match the original dark gray
  lightColor = '#2e2e2e', // Dark gray for light theme to match the original
  ...props
}: ThemedLottieProps) {
  const { theme } = useTheme();
  const [themedAnimationData, setThemedAnimationData] = useState(animationData);

  useEffect(() => {
    if (!animationData) return;

    // Clone the animation data to avoid mutating the original
    const clonedData = JSON.parse(JSON.stringify(animationData));
    
    // Define the original color to look for [0.149, 0.149, 0.149] which is a dark gray
    const originalColor = [0.149, 0.149, 0.149];
    
    const updateColor = (obj: any) => {
      if (obj && typeof obj === 'object') {
        // Check if this object represents color data following Lottie format: { k: [R, G, B] }
        if (
          obj.k && 
          Array.isArray(obj.k) && 
          obj.k.length === 3 && 
          typeof obj.k[0] === 'number' &&
          typeof obj.k[1] === 'number' &&
          typeof obj.k[2] === 'number' &&
          obj.k.every(val => val >= 0 && val <= 1) // Ensure values are in normalized 0-1 range
        ) {
          // Only modify colors that match the original color [0.149, 0.149, 0.149]
          if (
            Math.abs(obj.k[0] - originalColor[0]) < 0.01 &&
            Math.abs(obj.k[1] - originalColor[1]) < 0.01 &&
            Math.abs(obj.k[2] - originalColor[2]) < 0.01
          ) {
            // This looks like the original color array [R, G, B] in 0-1 format
            const color = theme === 'dark' ? darkColor : lightColor;
            
            // Convert hex color to RGB normalized values
            const normalizedRgb = hexToNormalizedRgb(color);
            obj.k = normalizedRgb;
          }
        }
        
        // Recursively process all properties
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            updateColor(obj[key]);
          }
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(item => updateColor(item));
      }
    };

    updateColor(clonedData);
    setThemedAnimationData(clonedData);
  }, [animationData, theme, darkColor, lightColor]);

  // Helper function to convert hex color to normalized RGB (0-1 range)
  const hexToNormalizedRgb = (hex: string): [number, number, number] => {
    // Expand shorthand hex if needed
    const fullHex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    if (!result) return [0, 0, 0]; // Default to black if invalid hex

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    return [r, g, b];
  };

  return <Lottie animationData={themedAnimationData} {...props} />;
}