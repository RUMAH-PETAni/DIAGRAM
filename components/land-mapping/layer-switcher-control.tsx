import { useRControl } from 'maplibre-react-components';
import { Map as MapIcon, Satellite } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

const styles = {
  'Dark': '/styles/dark.json', // Using local dark map style
  'Satellite': 'https://tiles.stadiamaps.com/styles/alidade_satellite.json',
};

export type StyleID = keyof typeof styles;

interface LayerSwitcherControlProps {
  style: StyleID;
  setStyle: Dispatch<SetStateAction<StyleID>>;
}

export function LayerSwitcherControl({
  style,
  setStyle,
}: LayerSwitcherControlProps) {
  const { container } = useRControl({
    position: 'top-right',
  });

  const toggleStyle = () => {
    setStyle(prev => prev === 'Dark' ? 'Satellite' : 'Dark');
  };

  return createPortal(
    <div className="bg-white dark:bg-gray-800 rounded-full">
      <button
        onClick={toggleStyle}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          style === 'Dark' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
        aria-label={style === 'Dark' ? 'Switch to Satellite view' : 'Switch to Map view'}
      >
        {style === 'Dark' ? <MapIcon size={20} /> : <Satellite size={20} />}
      </button>
    </div>,
    container,
  );
}