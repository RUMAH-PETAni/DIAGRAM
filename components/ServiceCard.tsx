'use client';

import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

interface ServiceCardProps {
  icon: LucideIcon;
  titleKey: string;
  badgeTextKey?: string;
  className?: string;
}

export default function ServiceCard({
  icon: Icon,
  titleKey,
  badgeTextKey,
  className = ''
}: ServiceCardProps) {
  const { t } = useI18n();
  const [showTitle, setShowTitle] = useState(false);

  const handleMouseEnter = () => {
    setShowTitle(true);
  };

  const handleMouseLeave = () => {
    setShowTitle(false);
  };

  const title = t(titleKey);
  const badgeText = badgeTextKey ? t(badgeTextKey) : '';

  return (
    <div
      className={`border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md relative aspect-square w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {badgeText && (
        <div className="absolute top-1 right-1 z-10">
          <span className="bg-primary text-primary-foreground text-[0.6rem] px-2 py-0.5 rounded-full">
            {badgeText}
          </span>
        </div>
      )}
      
      {showTitle ? (
        <div className="flex flex-col items-center justify-center w-full h-full p-2">
          <h3 className="font-bold text-xs text-center">{title}</h3>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Icon className="w-8 h-8" />
        </div>
      )}
    </div>
  );
}