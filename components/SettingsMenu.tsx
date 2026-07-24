import React, { useState } from 'react';
import { AppState, GradientType, LayerConfig, BlendMode } from '../types';
import { INGREDIENTS } from '../constants';
import { 
  Layers, Sliders, Save, RotateCcw, Monitor, Code, 
  CheckCircle, Eye, EyeOff, Move, Maximize2, Zap, Play, Pause, Activity
} from 'lucide-react';

interface SettingsMenuProps {
  appState: AppState;
  updateLayer: (layerId: string, updates: Partial<LayerConfig>) => void;
  selectLayer: (layerId: string) => void;
  setGradientType: (type: GradientType) => void;
  saveSettings: () => void;
  resetSettings: () => void;
  updateCanvasBg: (color: string) => void;
  generateCodeExport: () => string;
  toggleAnimation?: () => void;
}

const BLEND_MODES: BlendMode[] = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 
  'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference'
];

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  appState,
  updateLayer,
  selectLayer,
  setGradientType,
  saveSettings,
  resetSettings,
  updateCanvasBg,
  generateCodeExport,
  toggleAnimation
}) => {
  const currentConfig = appState.configs[appState.activeType];
  const activeLayer = currentConfig.layers.find(l => l.id === appState.selectedLayerId) || currentConfig.layers[0];
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const code = generateCodeExport();
    navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
        {/* LEFT PANEL: Layer Tree & Global Config */}
        <div className="absolute top-4 bottom-4 left-4 w-72 bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-left-4 fade-in duration-500">
             {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Zap size={16} className="text-pink-500"/>
                        <span className="text-xs font-bold uppercase tracking-widest">Studio Mode</span>
                    </div>
                </div>
                {/* Type Switcher */}
                <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 mb-4">
                    <button
                        onClick={() => setGradientType('type1')}
                        className={`py-1.5 px-3 text-[10px] font-bold uppercase tracking-wide rounded transition-all ${
                        appState.activeType === 'type1'
                            ? 'bg-slate-700 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        Bloom
                    </button>
                    <button
                        onClick={() => setGradientType('type2')}
                        className={`py-1.5 px-3 text-[10px] font-bold uppercase tracking-wide rounded transition-all ${
                        appState.activeType === 'type2'
                            ? 'bg-slate-700 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        Abstract
                    </button>
                </div>

                {/* Animation Control Section */}
                {toggleAnimation && (
                    <div className="bg-slate-900/50 rounded-lg p-2 border border-slate-800">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                             <Activity size={10} /> Animation Control
                        </label>
                        <button
                            onClick={toggleAnimation}
                            className={`w-full py-2 px-3 text-[10px] font-bold uppercase tracking-wide rounded border transition-all flex items-center justify-center gap-2 ${
                                appState.isAnimated
                                ? 'bg-pink-500 text-white border-pink-600 shadow-lg shadow-pink-900/20'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                            }`}
                        >
                            {appState.isAnimated ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                            {appState.isAnimated ? 'Pause Loop' : 'Play Loop'}
                        </button>
                    </div>
                )}
            </div>

            {/* Layer List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <Layers size={12} /> Composition Layers
                </label>
                <div className="space-y-1">
                    {currentConfig.layers.map((layer) => (
                        <div 
                            key={layer.id} 
                            onClick={() => selectLayer(layer.id)}
                            className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer border transition-all ${
                                activeLayer.id === layer.id 
                                ? 'bg-slate-800 border-pink-500/50 text-white shadow-sm' 
                                : 'bg-transparent border-transparent hover:bg-slate-900 text-slate-400'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-2.5 h-2.5 rounded-full ring-1 ring-white/10"
                                    style={{ backgroundColor: layer.color }}
                                />
                                <span className="text-xs font-medium">{layer.name}</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateLayer(layer.id, { opacity: layer.opacity === 0 ? 1 : 0 });
                                    }}
                                    className="text-slate-500 hover:text-white"
                                >
                                    {layer.opacity > 0 ? <Eye size={12}/> : <EyeOff size={12}/>}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Canvas Settings */}
                <div className="mt-8 pt-4 border-t border-slate-800">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                        <Monitor size={12} /> Environment
                    </label>
                    <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <input
                            type="color"
                            value={appState.canvasBg}
                            onChange={(e) => updateCanvasBg(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer border-none bg-transparent"
                        />
                        <span className="text-xs font-mono text-slate-400">{appState.canvasBg}</span>
                    </div>
                </div>
            </div>

             {/* Actions */}
             <div className="p-4 border-t border-slate-800 bg-slate-950/50 grid grid-cols-2 gap-2">
                 <button 
                    onClick={saveSettings}
                    className="flex items-center justify-center gap-2 py-2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase hover:bg-slate-700"
                >
                    <Save size={12} /> Save
                </button>
                 <button 
                    onClick={handleCopyCode}
                    className="flex items-center justify-center gap-2 py-2 rounded bg-pink-900/20 border border-pink-500/30 text-pink-400 text-[10px] font-bold uppercase hover:bg-pink-900/40"
                >
                    {copied ? <CheckCircle size={12} /> : <Code size={12} />}
                    {copied ? 'Copied' : 'Export'}
                </button>
             </div>
        </div>

        {/* RIGHT PANEL: Property Inspector */}
        <div className="absolute top-4 bottom-4 right-4 w-80 bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-right-4 fade-in duration-500 delay-100">
            <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Sliders size={12} /> Properties
                </label>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                {/* Active Layer Indicator */}
                <div className="flex items-center gap-3 mb-6">
                     <div 
                        className="w-8 h-8 rounded-lg shadow-inner"
                        style={{ backgroundColor: activeLayer.color }}
                    />
                    <div>
                        <div className="text-sm font-bold text-white">{activeLayer.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{activeLayer.id}</div>
                    </div>
                </div>

                {/* Color Palette */}
                <div>
                    <label className="text-[10px] uppercase text-slate-600 font-bold mb-2 block">Ingredient Color</label>
                    <div className="flex flex-wrap gap-1.5">
                        {INGREDIENTS.map(ing => (
                            <button
                                key={ing.id}
                                onClick={() => updateLayer(activeLayer.id, { color: ing.hex })}
                                className={`w-5 h-5 rounded-full border transition-all ${
                                    activeLayer.color === ing.hex 
                                    ? 'border-white shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110' 
                                    : 'border-transparent opacity-40 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: ing.hex }}
                                title={ing.name}
                            />
                        ))}
                    </div>
                </div>

                <hr className="border-slate-800/50" />

                {/* Dimensions & Position */}
                <div>
                     <label className="text-[10px] uppercase text-slate-600 font-bold mb-3 flex items-center gap-1">
                        <Move size={10} /> Position & Scale
                     </label>
                     <div className="grid grid-cols-2 gap-3 mb-3">
                         <NumberInput label="X" value={activeLayer.x} onChange={v => updateLayer(activeLayer.id, { x: v })} />
                         <NumberInput label="Y" value={activeLayer.y} onChange={v => updateLayer(activeLayer.id, { y: v })} />
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                         <NumberInput label="W Scale" value={activeLayer.scaleX} step={0.1} onChange={v => updateLayer(activeLayer.id, { scaleX: v })} />
                         <NumberInput label="H Scale" value={activeLayer.scaleY} step={0.1} onChange={v => updateLayer(activeLayer.id, { scaleY: v })} />
                     </div>
                </div>

                <div className="space-y-4">
                     <RangeControl label="Rotation" value={activeLayer.rotation} max={360} onChange={v => updateLayer(activeLayer.id, { rotation: v })} />
                     <RangeControl label="Blur Radius" value={activeLayer.blur} max={150} onChange={v => updateLayer(activeLayer.id, { blur: v })} />
                     <RangeControl label="Opacity" value={activeLayer.opacity} max={1} step={0.01} onChange={v => updateLayer(activeLayer.id, { opacity: v })} />
                </div>

                {/* Blend Mode */}
                <div>
                    <label className="text-[10px] uppercase text-slate-600 font-bold mb-2 block">Blend Mode</label>
                    <div className="relative">
                        <select
                            value={activeLayer.blendMode}
                            onChange={(e) => updateLayer(activeLayer.id, { blendMode: e.target.value as BlendMode })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-xs text-slate-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none appearance-none"
                        >
                            {BLEND_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <div className="absolute right-3 top-2.5 pointer-events-none text-slate-500">
                            <Maximize2 size={10} className="rotate-45"/>
                        </div>
                    </div>
                </div>
            </div>
             <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                 <button 
                    onClick={resetSettings}
                    className="w-full py-2 rounded border border-slate-800 text-slate-500 text-[10px] font-bold uppercase hover:text-red-400 hover:border-red-900/50 transition-colors"
                >
                    <RotateCcw size={10} className="inline mr-1" /> Reset to Defaults
                </button>
             </div>
        </div>
    </>
  );
};

// UI Helpers
const NumberInput = ({ label, value, onChange, step = 1 }: any) => (
    <div className="bg-slate-900 rounded p-1.5 border border-slate-800 flex items-center justify-between">
        <span className="text-[10px] text-slate-500 font-bold px-1">{label}</span>
        <input 
            type="number" 
            step={step}
            value={Math.round(value * 100) / 100} 
            onChange={e => onChange(parseFloat(e.target.value))}
            className="bg-transparent w-16 text-right text-xs text-slate-200 focus:outline-none"
        />
    </div>
);

const RangeControl = ({ label, value, max, step = 1, onChange }: any) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-[10px]">
            <span className="text-slate-500 font-bold uppercase">{label}</span>
            <span className="text-slate-400 font-mono">{Math.round(value)}</span>
        </div>
        <input
            type="range"
            min={0}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400"
        />
    </div>
);
