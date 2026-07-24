export type GradientType = 'type1' | 'type2';
export type ViewMode = 'client' | 'settings';

export type BlendMode = 
  | 'normal' 
  | 'multiply' 
  | 'screen' 
  | 'overlay' 
  | 'darken' 
  | 'lighten' 
  | 'color-dodge' 
  | 'color-burn' 
  | 'hard-light' 
  | 'soft-light' 
  | 'difference' 
  | 'exclusion' 
  | 'hue' 
  | 'saturation' 
  | 'color' 
  | 'luminosity';

export interface LayerConfig {
  id: string;
  name: string;
  color: string;
  blur: number; // stdDeviation
  opacity: number;
  x: number; // Offset X or cx
  y: number; // Offset Y or cy
  scaleX: number; 
  scaleY: number;
  rotation: number;
  blendMode: BlendMode;
  // Specific to shape types
  pathData?: string; 
  baseRx?: number;
  baseRy?: number;
}

export interface PresetConfig {
  id: GradientType;
  name: string;
  viewBox: string;
  width: number;
  height: number;
  layers: LayerConfig[];
}

export interface Ingredient {
  id: string;
  name: string;
  hex: string;
}

export interface AppState {
  viewMode: ViewMode;
  activeType: GradientType;
  configs: Record<GradientType, PresetConfig>;
  selectedLayerId: string | null;
  canvasBg: string;
  palette: string[];
  isAnimated: boolean;
}