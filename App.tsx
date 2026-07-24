import React, { useState, useCallback, useEffect } from 'react';
import { INITIAL_TYPE_1, INITIAL_TYPE_2, INGREDIENTS } from './constants';
import { AppState, GradientType, LayerConfig } from './types';
import { GradientCanvas } from './components/GradientCanvas';
import { ClientMenu } from './components/ClientMenu';
import { SettingsMenu } from './components/SettingsMenu';
import { Settings2, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'liquid_morph_settings_v9';

// Helper to apply a palette list to a set of layers
const applyPaletteToLayers = (layers: LayerConfig[], palette: string[]): LayerConfig[] => {
  if (palette.length === 0) return layers;
  return layers.map((layer, index) => ({
    ...layer,
    color: palette[index % palette.length]
  }));
};

const App: React.FC = () => {
  // --- State Initialization ---
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
           viewMode: 'client',
           activeType: parsed.activeType || 'type1',
           selectedLayerId: parsed.selectedLayerId || null,
           canvasBg: parsed.canvasBg || '#F5F5F7',
           palette: parsed.palette || ['#FDADD8', '#E54C9F', '#FFF49B', '#FFE830'],
           isAnimated: parsed.isAnimated || false,
           configs: {
             type1: { ...INITIAL_TYPE_1, ...parsed.configs?.type1 },
             type2: { ...INITIAL_TYPE_2, ...parsed.configs?.type2 },
           }
        };
      } catch (e) {
        console.error("Failed to parse saved settings", e);
      }
    }
    return {
      viewMode: 'client',
      activeType: 'type1',
      selectedLayerId: INITIAL_TYPE_1.layers[0].id,
      canvasBg: '#F5F5F7',
      palette: ['#FDADD8', '#E54C9F', '#FFF49B', '#FFE830'],
      isAnimated: false,
      configs: {
        type1: INITIAL_TYPE_1,
        type2: INITIAL_TYPE_2,
      },
    };
  });

  // --- Animation Loop ---
  useEffect(() => {
      let interval: number;
      if (appState.isAnimated && appState.palette.length > 1) {
          // 3000ms interval matches the CSS transition duration for a smooth morph
          interval = window.setInterval(() => {
              setAppState(prev => {
                  // Rotate palette Left (Shift/Push): [A, B, C, D] -> [B, C, D, A]
                  // This causes Layer N to receive the color from Layer N+1 (Outward flow)
                  const newPalette = [...prev.palette];
                  const first = newPalette.shift();
                  if (first) newPalette.push(first);

                  // Apply to active config immediately
                  const activeConfig = prev.configs[prev.activeType];
                  const updatedLayers = applyPaletteToLayers(activeConfig.layers, newPalette);
                  
                  return {
                      ...prev,
                      palette: newPalette,
                      configs: {
                          ...prev.configs,
                          [prev.activeType]: { ...activeConfig, layers: updatedLayers }
                      }
                  };
              });
          }, 3000); 
      }
      return () => clearInterval(interval);
  }, [appState.isAnimated, appState.palette.length]); 

  // --- Handlers ---
  
  const handleUpdatePalette = (newPalette: string[]) => {
    setAppState((prev) => {
      const activeConfig = prev.configs[prev.activeType];
      const updatedLayers = applyPaletteToLayers(activeConfig.layers, newPalette);

      return {
        ...prev,
        palette: newPalette,
        configs: {
          ...prev.configs,
          [prev.activeType]: { ...activeConfig, layers: updatedLayers },
        },
      };
    });
  };

  const handleUpdateLayer = useCallback((layerId: string, updates: Partial<LayerConfig>) => {
    setAppState((prev) => {
      const activeConfig = prev.configs[prev.activeType];
      const updatedLayers = activeConfig.layers.map((l) =>
        l.id === layerId ? { ...l, ...updates } : l
      );
      return {
        ...prev,
        configs: {
          ...prev.configs,
          [prev.activeType]: { ...activeConfig, layers: updatedLayers },
        },
      };
    });
  }, []);

  const handleSelectLayer = (id: string) => {
    setAppState((prev) => ({ ...prev, selectedLayerId: id }));
  };

  const handleSetGradientType = (type: GradientType) => {
    setAppState((prev) => {
        const targetConfig = prev.configs[type];
        const updatedLayers = applyPaletteToLayers(targetConfig.layers, prev.palette);
        
        return {
            ...prev,
            activeType: type,
            configs: {
                ...prev.configs,
                [type]: { ...targetConfig, layers: updatedLayers }
            },
            selectedLayerId: targetConfig.layers[0].id,
        }
    });
  };

  const handleToggleAnimation = () => {
      setAppState(prev => ({ ...prev, isAnimated: !prev.isAnimated }));
  };

  const handleUpdateCanvasBg = (color: string) => {
    setAppState(prev => ({ ...prev, canvasBg: color }));
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  };

  const handleReset = () => {
    if (confirm('Reset to defaults?')) {
        setAppState({
            viewMode: appState.viewMode,
            activeType: 'type1',
            selectedLayerId: INITIAL_TYPE_1.layers[0].id,
            canvasBg: '#F5F5F7',
            palette: ['#FDADD8', '#E54C9F', '#FFF49B', '#FFE830'],
            isAnimated: false,
            configs: { type1: INITIAL_TYPE_1, type2: INITIAL_TYPE_2 },
        });
        localStorage.removeItem(STORAGE_KEY);
    }
  };

  const generateCodeExport = () => {
    const json1 = JSON.stringify(appState.configs.type1, null, 2);
    const json2 = JSON.stringify(appState.configs.type2, null, 2);
    const ingJson = JSON.stringify(INGREDIENTS, null, 2);
    return `import { Ingredient, PresetConfig } from './types';\n\nexport const INGREDIENTS: Ingredient[] = ${ingJson};\n\nexport const INITIAL_TYPE_1: PresetConfig = ${json1};\n\nexport const INITIAL_TYPE_2: PresetConfig = ${json2};\n`;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans text-slate-900">
      
      {/* 1. Immersive Background Canvas */}
      <div 
        className="absolute inset-0 transition-colors duration-700 z-0"
        style={{ backgroundColor: appState.canvasBg }}
      >
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${appState.activeType === 'type1' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <GradientCanvas config={appState.configs['type1']} />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${appState.activeType === 'type2' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <GradientCanvas config={appState.configs['type2']} />
        </div>
        {/* Cinematic Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
             style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} 
        />
      </div>

      {/* 2. Top Navigation Pill */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex bg-white/10 backdrop-blur-xl rounded-full shadow-lg border border-white/20 p-1.5">
            <button
                onClick={() => setAppState(prev => ({ ...prev, viewMode: 'client' }))}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                    appState.viewMode === 'client' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                }`}
            >
                <Sparkles size={14} /> Shop
            </button>
            <button
                onClick={() => setAppState(prev => ({ ...prev, viewMode: 'settings' }))}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                    appState.viewMode === 'settings' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                }`}
            >
                <Settings2 size={14} /> Studio
            </button>
        </div>
      </div>

      {/* 3. Interface Overlays */}
      <div className="relative z-40 h-full w-full pointer-events-none">
        {appState.viewMode === 'client' ? (
            <div className="absolute inset-0 flex items-center justify-end p-4 md:p-8 pointer-events-none">
                 <div className="pointer-events-auto h-auto max-h-full">
                    <ClientMenu 
                        appState={appState}
                        setGradientType={handleSetGradientType}
                        updatePalette={handleUpdatePalette}
                    />
                 </div>
            </div>
        ) : (
            <div className="absolute inset-0 pointer-events-none">
                 <SettingsMenu 
                    appState={appState}
                    updateLayer={handleUpdateLayer}
                    selectLayer={handleSelectLayer}
                    setGradientType={handleSetGradientType}
                    saveSettings={handleSave}
                    resetSettings={handleReset}
                    updateCanvasBg={handleUpdateCanvasBg}
                    generateCodeExport={generateCodeExport}
                    toggleAnimation={handleToggleAnimation}
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default App;