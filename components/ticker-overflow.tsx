"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TickerItem {
  src: string;
  alt: string;
}

interface TickerOverflowProps {
  items: TickerItem[];
}

const TickerOverflow: React.FC<TickerOverflowProps> = ({ items }) => {
  // Duplicate items to ensure seamless looping
  const duplicatedItems = [...items, ...items];
  
  return (
    <div className="w-full bg-muted py-8">
      <div className="relative overflow-hidden h-16">
        {/* Single row - moving left */}
        <motion.div 
          className="flex h-full"
          style={{ display: 'flex' }}
          animate={{ 
            x: ["0%", "-100%"] 
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {[...items, ...items].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center flex-shrink-0 m-0 h-full px-4"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={64}
                height={64}
                className="max-h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TickerOverflow;