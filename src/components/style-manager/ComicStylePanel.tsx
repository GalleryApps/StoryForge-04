import React from 'react';
import { SplitSquareVertical, MessageSquare, Volume2, Sparkles, Check, Sliders } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { ComicVisualLanguageSettings, SpeechBubbleStyle, StyleApplicationScope } from '../../types';

interface ComicStylePanelProps {
  selectedScope: StyleApplicationScope;
}

export const ComicStylePanel: React.FC<ComicStylePanelProps> = ({ selectedScope }) => {
  const { masterStyle, updateMasterStyle } = useStory();
  const comic = masterStyle?.comicVisualLanguage || {
    defaultSpeechBubbleStyle: 'classic_rounded',
    bubbleStyle: 'classic_rounded',
    panelBorderThicknessPt: 1.5,
    panelCornerRadius: 4,
    gutterSpacingMm: 4,
    sfxLetteringFont: 'Bangers',
    screentoneStyle: 'none',
    actionLinesEnabled: true,
    speechBubbleFont: 'Bangers',
    thoughtBubbleStyle: 'cloud',
    shoutBubbleStyle: 'jagged',
    whisperBubbleStyle: 'dashed',
    narrationBoxStyle: 'rect',
    panelBorderWidthPt: 1.5,
    panelBorderColor: '#000000',
    panelGapMm: 4,
    halftonePattern: 'none'
  };

  const updateComic = (patch: Partial<ComicVisualLanguageSettings>) => {
    updateMasterStyle(prev => {
      const prevCom = prev.comicVisualLanguage || comic;
      return {
        ...prev,
        comicVisualLanguage: {
          ...prevCom,
          ...patch
        }
      };
    });
  };

  const bubbleStyles: { id: SpeechBubbleStyle; label: string; desc: string }[] = [
    { id: 'classic_rounded', label: 'Classic Rounded Oval', desc: 'Standard dialogue balloon with elegant curved pointer tail' },
    { id: 'sharp_shout', label: 'Sharp Jagged Burst', desc: 'High-volume shouted dialogue and sudden outbursts' },
    { id: 'whisper_dashed', label: 'Dashed Dotted Whisper', desc: 'Subdued, conspiratorial, or internal speech' },
    { id: 'thought_cloud', label: 'Bubbly Thought Cloud', desc: 'Internal thoughts and silent musings' },
    { id: 'electronic_radio', label: 'Angular Radio Broadcast', desc: 'Synthesized voice, phone call, or transmission speaker' },
    { id: 'narrator_box', label: 'Architectural Narrator Caption', desc: 'Rectangular caption box establishing time and scene context' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <SplitSquareVertical className="w-4 h-4 text-indigo-600" />
            Comic & Graphic Novel Visual Language
          </h2>
          <p className="text-xs text-slate-500">
            Define panel borders, speech bubble geometry, sound effects (SFX) typography, and screentone density.
          </p>
        </div>
      </div>

      {/* Speech Bubble Presets */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Speech Bubble Styles & Balloons
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {bubbleStyles.map(bs => {
            const isSelected = comic.defaultSpeechBubbleStyle === bs.id;
            return (
              <button
                key={bs.id}
                onClick={() => updateComic({ defaultSpeechBubbleStyle: bs.id })}
                className={`text-left p-3.5 rounded-lg border transition ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{bs.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{bs.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel Borders & Gutter Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel Borders */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Panel Border & Gutter
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Panel Border Thickness: {comic.panelBorderThicknessPt ?? 1.5} pt</span>
              </div>
              <input
                type="range"
                min={0}
                max={6}
                step={0.5}
                value={comic.panelBorderThicknessPt ?? 1.5}
                onChange={e => updateComic({ panelBorderThicknessPt: parseFloat(e.target.value) || 0 })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Corner Radius: {comic.panelCornerRadius ?? 4} px</span>
              </div>
              <input
                type="range"
                min={0}
                max={16}
                value={comic.panelCornerRadius ?? 4}
                onChange={e => updateComic({ panelCornerRadius: parseInt(e.target.value) || 0 })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Gutter Spacing: {comic.gutterSpacingMm ?? 4} mm</span>
              </div>
              <input
                type="range"
                min={2}
                max={12}
                value={comic.gutterSpacingMm ?? 4}
                onChange={e => updateComic({ gutterSpacingMm: parseInt(e.target.value) || 4 })}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* SFX & Screentones */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            SFX Lettering & Screentones
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sound Effect (SFX) Lettering Font
              </label>
              <input
                type="text"
                value={comic.sfxLetteringFont || 'Bangers'}
                onChange={e => updateComic({ sfxLetteringFont: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Halftone Screentone Style
              </label>
              <select
                value={comic.screentoneStyle}
                onChange={e => updateComic({ screentoneStyle: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="none">None (Clean Modern Digital)</option>
                <option value="vintage_dot">Vintage 60s Newsprint Dot</option>
                <option value="manga_screentone">Manga Mechanical Shading</option>
                <option value="crosshatch">Fine Crosshatching Pattern</option>
              </select>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={comic.actionLinesEnabled}
                  onChange={e => updateComic({ actionLinesEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs font-semibold text-slate-700">Enable Dynamic Speed / Action Lines</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
