import React from 'react';
import { BookOpen, Sparkles, Wand2, Check, Sliders, Palette } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { ChapterDesignSettings, ChapterOpenerStyle, StyleApplicationScope } from '../../types';

interface ChapterDesignPanelProps {
  selectedScope: StyleApplicationScope;
}

export const ChapterDesignPanel: React.FC<ChapterDesignPanelProps> = ({ selectedScope }) => {
  const { masterStyle, updateMasterStyle, harmonizeChaptersAi, isAiGenerating, book } = useStory();
  const chapterStyle = masterStyle?.chapterDesign || {
    chapterOpener: 'large_number',
    openerStyle: 'large_number',
    chapterTemplate: 'classic_novel',
    numberFormat: 'CHAPTER 01',
    numberingFormat: 'roman',
    showChapterNumber: true,
    showChapterTitle: true,
    showSubtitle: false,
    showEpigraph: true,
    showOpeningIllustration: false,
    dropCap: true,
    dropCapEnabled: true,
    dropCapLines: 3,
    dropCapFont: 'Cinzel',
    ornamentStyle: 'fleuron',
    chapterColors: []
  };

  const updateChapterDesign = (patch: Partial<ChapterDesignSettings>) => {
    updateMasterStyle(prev => {
      const prevCh = prev.chapterDesign || chapterStyle;
      return {
        ...prev,
        chapterDesign: {
          ...prevCh,
          ...patch
        }
      };
    });
  };

  const openers: { id: ChapterOpenerStyle; label: string; desc: string }[] = [
    { id: 'large_number', label: 'Large Architectural Number', desc: 'Dramatic oversized numeral resting above the chapter title' },
    { id: 'full_illustration', label: 'Full Hero Illustration', desc: 'Full-bleed or header plate artwork anchoring the chapter introduction' },
    { id: 'drop_cap_focus', label: 'Classic Drop Cap Focus', desc: 'Spacious editorial title with a multi-line illuminated initial' },
    { id: 'split_text_image', label: 'Split Text & Vignette', desc: 'Horizontal or side-by-side spot illustration with chapter argument' },
    { id: 'minimalist', label: 'Minimalist Clean', desc: 'Generous negative space with crisp high-contrast centered typography' },
  ];

  const ornaments: { id: ChapterDesignSettings['ornamentStyle']; label: string }[] = [
    { id: 'fleuron', label: 'Classic Fleuron (❦)' },
    { id: 'geometric_line', label: 'Modern Geometric Rule (— ◇ —)' },
    { id: 'filigree', label: 'Vintage Filigree Vignette' },
    { id: 'double_rule', label: 'Classic Double Border Rules' },
    { id: 'none', label: 'None (Pure Whitespace)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Chapter Design & Opener Architecture
          </h2>
          <p className="text-xs text-slate-500">
            Set opener layouts, illuminated drop caps, decorative section dividers, and individual chapter color themes.
          </p>
        </div>

        <button
          disabled={isAiGenerating}
          onClick={harmonizeChaptersAi}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Harmonize Chapter Colors (AI)</span>
        </button>
      </div>

      {/* Opener Style Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Chapter Opener Layout
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {openers.map(op => {
            const isSelected = chapterStyle.openerStyle === op.id;
            return (
              <button
                key={op.id}
                onClick={() => updateChapterDesign({ openerStyle: op.id })}
                className={`text-left p-3.5 rounded-lg border transition ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{op.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{op.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Drop Cap & Numbering Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drop Cap Controls */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Drop Cap (Initial Letter)
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={chapterStyle.dropCapEnabled}
                onChange={e => updateChapterDesign({ dropCapEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-semibold text-slate-700">Enable</span>
            </label>
          </div>

          {chapterStyle.dropCapEnabled && (
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Lines Tall: {chapterStyle.dropCapLines} lines</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={5}
                  value={chapterStyle.dropCapLines}
                  onChange={e => updateChapterDesign({ dropCapLines: parseInt(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Drop Cap Font Family
                </label>
                <input
                  type="text"
                  value={chapterStyle.dropCapFont || masterStyle?.typographyHierarchy?.h1?.family || 'Cinzel'}
                  onChange={e => updateChapterDesign({ dropCapFont: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Decorative Ornaments & Numbering */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Decorative Dividers & Fleurons
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Divider Ornament
              </label>
              <select
                value={chapterStyle.ornamentStyle}
                onChange={e => updateChapterDesign({ ornamentStyle: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {ornaments.map(o => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Numbering Format
              </label>
              <select
                value={chapterStyle.numberingFormat}
                onChange={e => updateChapterDesign({ numberingFormat: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="roman">Roman Numerals (CHAPTER IV)</option>
                <option value="arabic">Arabic Numerals (CHAPTER 4)</option>
                <option value="word">Written Out (CHAPTER FOUR)</option>
                <option value="none">Minimal Title Only (No Number)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Color Harmonies Palette Preview */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Individual Chapter Color Theme Wheel
          </h3>
          <span className="text-[11px] text-slate-400">
            {chapterStyle.chapterColors?.length || book.chapters.length} active chapter themes
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-1">
          {book.chapters.map((ch, idx) => {
            const color = chapterStyle.chapterColors?.[idx] || masterStyle?.colorPalette?.accent1 || '#d97706';
            return (
              <div key={ch.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col items-center gap-1.5">
                <div
                  className="w-7 h-7 rounded-full border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[11px] font-bold text-slate-700 truncate w-full text-center">
                  Ch {ch.number}: {ch.title.slice(0, 10)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{color}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
