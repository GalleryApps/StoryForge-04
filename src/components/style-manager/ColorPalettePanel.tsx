import React, { useState } from 'react';
import { Palette, Sparkles, Lock, Unlock, RefreshCw, Check, Sliders, Eye } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { ColorPaletteSettings, PaletteVariationType, StyleApplicationScope } from '../../types';

interface ColorPalettePanelProps {
  selectedScope: StyleApplicationScope;
}

export const ColorPalettePanel: React.FC<ColorPalettePanelProps> = ({ selectedScope }) => {
  const { masterStyle, updateMasterStyle, isAiGenerating, aiConfig } = useStory();
  const palette = masterStyle?.colorPalette || {
    primary: '#0f172a',
    secondary: '#475569',
    accent1: '#d97706',
    accent2: '#0284c7',
    background: '#ffffff',
    text: '#1e293b',
    border: '#e2e8f0',
    highlight: '#fef3c7',
    illustrationPalette: ['#1e293b', '#475569', '#d97706', '#f59e0b', '#f8fafc'],
    illustrationColors: ['#1e293b', '#475569', '#d97706', '#f59e0b', '#f8fafc'],
    lockedPalette: true,
    locked: true,
    paletteVariation: 'exact',
    variation: 'exact'
  };

  const illustrationColors = palette.illustrationColors || palette.illustrationPalette || ['#1e293b', '#475569', '#d97706', '#f59e0b', '#f8fafc'];

  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const updatePalette = (patch: Partial<ColorPaletteSettings>) => {
    updateMasterStyle(prev => {
      const prevPal = prev.colorPalette || palette;
      return {
        ...prev,
        colorPalette: {
          ...prevPal,
          ...patch
        }
      };
    });
  };

  const handleAiGeneratePalette = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);

    try {
      const response = await fetch('/api/gemini/style/generate-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: aiPrompt,
          genre: masterStyle.name,
          mood: masterStyle.artDirection.adultAesthetic,
          model: aiConfig.textModel
        })
      });

      const result = await response.json();
      if (result.success && result.palette) {
        updatePalette({
          ...result.palette,
          locked: true
        });
      }
    } catch (e) {
      console.error('Failed to generate AI palette:', e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const coreColors: { key: keyof Pick<ColorPaletteSettings, 'primary' | 'secondary' | 'accent1' | 'accent2' | 'background' | 'text'>; label: string; desc: string }[] = [
    { key: 'primary', label: 'Primary Brand / Header', desc: 'Main structural headings and chapter numbers' },
    { key: 'secondary', label: 'Secondary Tone', desc: 'Section headings, meta borders, running headers' },
    { key: 'accent1', label: 'Primary Accent', desc: 'Callouts, drop caps, highlights, active badges' },
    { key: 'accent2', label: 'Secondary Accent', desc: 'Exercise boxes, secondary flourishes, markers' },
    { key: 'background', label: 'Page Background', desc: 'Canvas backdrop (pure paper, ivory, or dark tone)' },
    { key: 'text', label: 'Body Text Color', desc: 'High-contrast readable body prose' },
  ];

  const variations: { id: PaletteVariationType; label: string; desc: string }[] = [
    { id: 'exact', label: 'Exact Strict Colors', desc: 'Use exact HEX values across every illustration and page' },
    { id: 'harmonious', label: 'Harmonious Shifts', desc: 'Allow subtle tonal shifts matching scene temperature' },
    { id: 'tinted', label: 'Tinted Wash', desc: 'Apply a delicate unified color glaze over all artwork' },
    { id: 'monochrome', label: 'Monochrome / Duotone', desc: 'Strict two-tone printing aesthetic' },
    { id: 'soft', label: 'Soft Desaturated', desc: 'Subdued, muted literary atmosphere' },
    { id: 'dramatic', label: 'High Contrast Drama', desc: 'Deep shadows, vibrant luminous highlights' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-600" />
            Universal Color & Palette Engine
          </h2>
          <p className="text-xs text-slate-500">
            Control the 6 core book colors, 5 illustration pigments, variation rules, and AI color generation.
          </p>
        </div>

        <button
          onClick={() => updatePalette({ locked: !palette.locked })}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
            palette.locked
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          {palette.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>{palette.locked ? 'Palette Locked Across Book' : 'Palette Unlocked'}</span>
        </button>
      </div>

      {/* AI Palette Generator Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            AI Palette Generator
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={e => setAiPrompt(e.target.value)}
            placeholder="e.g. 1920s Paris rainy night, warm incandescent bistro glow, charcoal pavement, worn mahogany..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            disabled={isGeneratingAi || !aiPrompt.trim()}
            onClick={handleAiGeneratePalette}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition disabled:opacity-50 flex items-center gap-1.5 shrink-0 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGeneratingAi ? 'Harmonizing...' : 'Generate Palette'}</span>
          </button>
        </div>
      </div>

      {/* 6 Core Colors Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Core Manuscript Palette (6 Architectural Roles)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreColors.map(c => (
            <div key={c.key} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{c.label}</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                  {palette[c.key]}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{c.desc}</p>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="color"
                  value={palette[c.key]}
                  onChange={e => updatePalette({ [c.key]: e.target.value })}
                  className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={palette[c.key]}
                  onChange={e => updatePalette({ [c.key]: e.target.value })}
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Color Illustration Pigment Swatches */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Illustration & Scene Swatches (5 Cohesive Pigments)
            </h3>
            <p className="text-[11px] text-slate-500">
              Injected directly into Gemini image generation prompts to guarantee tonal harmony.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {illustrationColors.map((color, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <div
                className="w-full h-12 rounded-lg border border-slate-300 shadow-inner"
                style={{ backgroundColor: color }}
              />
              <input
                type="color"
                value={color}
                onChange={e => {
                  const newCols = [...illustrationColors];
                  newCols[idx] = e.target.value;
                  updatePalette({ illustrationColors: newCols, illustrationPalette: newCols });
                }}
                className="w-6 h-6 rounded cursor-pointer"
              />
              <span className="text-[10px] font-mono text-slate-600 font-semibold">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Palette Variations Selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Palette Variations & Application Rule
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {variations.map(v => {
            const isSelected = palette.variation === v.id;
            return (
              <button
                key={v.id}
                onClick={() => updatePalette({ variation: v.id })}
                className={`text-left p-3 rounded-lg border transition ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{v.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{v.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
