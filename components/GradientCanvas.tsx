import React from 'react';
import { PresetConfig, LayerConfig } from '../types';

interface GradientCanvasProps {
  config: PresetConfig;
  className?: string;
}

const LayerRenderer: React.FC<{ layer: LayerConfig }> = ({ layer }) => {
  const isEllipse = !layer.pathData;
  const filterId = `blur-${layer.id}`;

  const style: React.CSSProperties = {
    opacity: layer.opacity,
    mixBlendMode: layer.blendMode,
    // Synced with App.tsx interval (3000ms) for smooth continuous flow
    transition: 'opacity 3s ease-in-out, mix-blend-mode 0.5s', 
  };
  
  // Styles specifically for animating attributes
  const shapeStyle: React.CSSProperties = {
      fill: layer.color,
      transformOrigin: 'center',
      transition: 'fill 3s ease-in-out, d 3s ease-in-out, transform 3s ease-in-out, rx 3s ease-in-out, ry 3s ease-in-out'
  };

  return (
    <g style={style} filter={layer.blur > 0 ? `url(#${filterId})` : undefined}>
      {/* Define the blur filter locally for this layer */}
      {layer.blur > 0 && (
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation={layer.blur} result="blur" />
          </filter>
        </defs>
      )}

      {isEllipse ? (
        <ellipse
          cx={layer.x}
          cy={layer.y}
          rx={(layer.baseRx || 100) * layer.scaleX}
          ry={(layer.baseRy || 100) * layer.scaleY}
          transform={`rotate(${layer.rotation} ${layer.x} ${layer.y})`}
          style={shapeStyle}
        />
      ) : (
        <path
          d={layer.pathData}
          transform={`translate(${layer.x}, ${layer.y}) scale(${layer.scaleX}, ${layer.scaleY}) rotate(${layer.rotation})`}
          style={shapeStyle}
        />
      )}
    </g>
  );
};

export const GradientCanvas: React.FC<GradientCanvasProps> = ({ config, className }) => {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox={config.viewBox}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {config.layers.map((layer) => (
          <LayerRenderer key={layer.id} layer={layer} />
        ))}
      </svg>
    </div>
  );
};