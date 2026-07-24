import React from 'react';
import { AppState, GradientType } from '../types';
import { INGREDIENTS } from '../constants';
import { X, Plus } from 'lucide-react';

interface ClientMenuProps {
  appState: AppState;
  setGradientType: (type: GradientType) => void;
  updatePalette: (palette: string[]) => void;
}

export const ClientMenu: React.FC<ClientMenuProps> = ({
  appState,
  setGradientType,
  updatePalette,
}) => {
  const { palette } = appState;

  const addToPalette = (hex: string) => {
    const newPalette = [...palette, hex];
    updatePalette(newPalette);
  };

  const removeFromPalette = (index: number) => {
    const newPalette = [...palette];
    newPalette.splice(index, 1);
    updatePalette(newPalette);
  };

  const clearPalette = () => {
      updatePalette([]);
  };

  return (
    <div className="w-[360px] bg-white/80 backdrop-blur-2xl rounded-[32px] shadow-2xl shadow-slate-900/10 border border-white/60 overflow-hidden flex flex-col max-h-[calc(100vh-64px)] transition-all duration-500 animate-in slide-in-from-right-10 fade-in">
      
      {/* Brand Header */}
      <div className="px-8 pt-8 pb-2">
        <h1 className="text-3xl font-light text-slate-900 leading-tight">
          Liquid <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">Moods</span>
        </h1>
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-1 pb-8">
          
          {/* 1. Shape Selection */}
          <div className="px-8 py-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                1. Select Form
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGradientType('type1')}
                className={`group relative h-20 rounded-2xl border text-left transition-all duration-300 overflow-hidden flex items-center justify-center ${
                  appState.activeType === 'type1'
                    ? 'border-pink-500/50 bg-white shadow-md ring-1 ring-pink-500/20'
                    : 'border-slate-200 bg-white/40 hover:bg-white hover:border-pink-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-full blur-lg opacity-80 ${appState.activeType === 'type1' ? 'bg-gradient-to-tr from-pink-400 to-orange-300' : 'bg-slate-200'}`} />
                <span className="absolute bottom-2 text-[10px] font-bold text-slate-600 uppercase tracking-wide">Bloom</span>
              </button>
              
              <button
                onClick={() => setGradientType('type2')}
                className={`group relative h-20 rounded-2xl border text-left transition-all duration-300 overflow-hidden flex items-center justify-center ${
                  appState.activeType === 'type2'
                    ? 'border-violet-500/50 bg-white shadow-md ring-1 ring-violet-500/20'
                    : 'border-slate-200 bg-white/40 hover:bg-white hover:border-violet-200'
                }`}
              >
                 <div className={`w-16 h-8 rounded-full blur-lg opacity-80 transform rotate-45 ${appState.activeType === 'type2' ? 'bg-gradient-to-r from-violet-400 to-fuchsia-300' : 'bg-slate-200'}`} />
                 <span className="absolute bottom-2 text-[10px] font-bold text-slate-600 uppercase tracking-wide">Flow</span>
              </button>
            </div>
          </div>

          {/* 2. Palette Builder */}
          <div className="px-8 py-2">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    2. Build Palette
                </h3>
                {palette.length > 0 && (
                    <button onClick={clearPalette} className="text-[10px] text-red-400 hover:text-red-600 font-bold uppercase tracking-wider">
                        Clear
                    </button>
                )}
            </div>
            
            <div className="min-h-[60px] p-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-300 flex flex-wrap gap-2 items-center transition-all">
                {palette.length === 0 && (
                    <div className="w-full text-center text-slate-400 text-xs italic">
                        Select colors below to mix...
                    </div>
                )}
                {palette.map((color, idx) => (
                    <div key={`${color}-${idx}`} className="group relative animate-in zoom-in-50 duration-300">
                        <div 
                            className="w-8 h-8 rounded-full shadow-sm border border-black/5" 
                            style={{ backgroundColor: color }}
                        />
                        <button 
                            onClick={() => removeFromPalette(idx)}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                        >
                            <X size={10} strokeWidth={3} />
                        </button>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                            {idx + 1}
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* 3. Ingredients Grid */}
          <div className="px-8 py-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                 Ingredients
            </h3>
            <div className="grid grid-cols-6 gap-3">
                {INGREDIENTS.map((ing) => (
                    <button
                        key={ing.id}
                        onClick={() => addToPalette(ing.hex)}
                        className="group relative w-full aspect-square rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                    >
                        <span 
                            className="w-full h-full rounded-full border border-black/5 shadow-sm"
                            style={{ backgroundColor: ing.hex }} 
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                            <Plus size={14} strokeWidth={3} />
                        </span>
                    </button>
                ))}
            </div>
          </div>
          
          <div className="px-8 text-center pb-2">
             <p className="text-xs text-slate-400 leading-relaxed">
                Configure animations in Studio.
             </p>
          </div>
      </div>
    </div>
  );
};