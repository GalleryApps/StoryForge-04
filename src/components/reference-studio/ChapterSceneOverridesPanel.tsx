import React, { useState } from 'react';
import { 
  Lock, 
  Layers, 
  Sparkles, 
  Plus, 
  Trash2, 
  Sliders, 
  Eye, 
  Clock, 
  Moon, 
  Sun, 
  FileText, 
  Check, 
  Shuffle, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { ChapterStyleVariation, SceneReferenceOverride } from '../../types';

export const ChapterSceneOverridesPanel: React.FC = () => {
  const { 
    referenceStudio, 
    updateReferenceStudio, 
    setChapterStyleVariation, 
    setSceneReferenceOverride,
    book 
  } = useStory();

  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(1);
  const [variationMedium, setVariationMedium] = useState('');
  const [variationLighting, setVariationLighting] = useState('');
  const [variationMood, setVariationMood] = useState('');
  const [variationPaletteShift, setVariationPaletteShift] = useState<'sepia_flashback' | 'desaturated_noir' | 'dreamlike_pastel' | 'vibrant_kinetic' | 'monochrome_ink'>('sepia_flashback');

  const matchReferences = referenceStudio.matchMyReferences;

  const handleAddChapterVariation = () => {
    setChapterStyleVariation(selectedChapterNumber, {
      chapterNumber: selectedChapterNumber,
      styleShiftName: variationMood || 'Atmospheric Shift',
      mediumOverride: variationMedium || undefined,
      lightingOverride: variationLighting || undefined,
      paletteShift: variationPaletteShift,
      notes: `Custom chapter visual variation for Chapter ${selectedChapterNumber}`,
    });
    setVariationMedium('');
    setVariationLighting('');
    setVariationMood('');
  };

  const PRIORITY_TIERS = [
    { rank: 1, label: 'USER-LOCKED CHARACTER REFERENCE', desc: 'Immutable facial bone structure, signature costume, locked hair, proportions', color: 'border-red-500/40 bg-red-500/10 text-red-300' },
    { rank: 2, label: 'USER-LOCKED ART STYLE', desc: 'Master Art Bible medium, brushwork, 16-criteria rendering technique', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
    { rank: 3, label: 'GENRE ART DIRECTION', desc: 'Publication benchmarks (Comic, Illustrated Novel, Mystery, etc.)', color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300' },
    { rank: 4, label: 'BOOK PALETTE', desc: 'Harmonized 5-swatch color gamut and atmospheric lighting system', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
    { rank: 5, label: 'CHAPTER STYLE', desc: 'Chapter-specific variations (Flashbacks, Dream sequences, Memory voids)', color: 'border-purple-500/40 bg-purple-500/10 text-purple-300' },
    { rank: 6, label: 'SCENE DESCRIPTION', desc: 'Dynamic elements (staging, actions, props, character emotional beats)', color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300' },
    { rank: 7, label: 'AI CREATIVE INTERPRETATION', desc: 'Minor atmospheric details, background depth, subtle incidental textures', color: 'border-zinc-700 bg-zinc-800/40 text-zinc-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Master Toggle: MATCH MY REFERENCES */}
      <div className="p-5 bg-gradient-to-r from-amber-500/15 via-zinc-900 to-zinc-900 rounded-2xl border border-amber-500/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-100">MATCH MY REFERENCES</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                matchReferences ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {matchReferences ? 'Enforcing All Locks' : 'Disabled'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              When enabled, all subsequent generation requests strictly enforce your Master Character & Art Bibles before general scene prose.
            </p>
          </div>
        </div>

        <button
          onClick={() => updateReferenceStudio(prev => ({ ...prev, matchMyReferences: !prev.matchMyReferences }))}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
            matchReferences
              ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/20'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
          }`}
        >
          {matchReferences ? 'Lock Active (Click to Pause)' : 'Enable "Match My References"'}
        </button>
      </div>

      {/* Strict Priority Hierarchy Visualizer */}
      <div className="p-5 bg-zinc-900/80 rounded-2xl border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Strict Priority Hierarchy Engine
            </h4>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">Enforced in prompt compilation</span>
        </div>

        <div className="space-y-2">
          {PRIORITY_TIERS.map((tier) => (
            <div
              key={tier.rank}
              className={`p-3 rounded-xl border flex items-center gap-3.5 transition-all ${tier.color}`}
            >
              <div className="w-6 h-6 rounded-lg bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-center font-bold text-xs font-mono">
                {tier.rank}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold block">{tier.label}</span>
                <span className="text-[11px] opacity-80 block truncate">{tier.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter-Specific Art Variations */}
      <div className="p-5 bg-zinc-900/80 rounded-2xl border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Chapter-Specific Style Variations (Flashbacks, Dream Sequences)</span>
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Shift palette or atmosphere for specific chapters without breaking underlying character anatomy or identity locks.
            </p>
          </div>
        </div>

        {/* Existing Chapter Variations List */}
        {(referenceStudio?.chapterVariations || []).length > 0 && (
          <div className="space-y-2">
            {(referenceStudio?.chapterVariations || []).map((v, idx) => (
              <div
                key={idx}
                className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-400">Chapter {v.chapterNumber}:</span>
                    <span className="text-xs font-semibold text-zinc-200">{v.styleShiftName}</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400">
                      {v.paletteShift}
                    </span>
                  </div>
                  {v.notes && <p className="text-[11px] text-zinc-500 mt-0.5">{v.notes}</p>}
                </div>

                <button
                  onClick={() => {
                    updateReferenceStudio(prev => ({
                      ...prev,
                      chapterVariations: (prev.chapterVariations || []).filter(cv => cv.chapterNumber !== v.chapterNumber)
                    }));
                  }}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Variation Form */}
        <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/80 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Target Chapter
              </label>
              <select
                value={selectedChapterNumber}
                onChange={(e) => setSelectedChapterNumber(parseInt(e.target.value))}
                className="w-full bg-zinc-900 text-xs text-zinc-200 rounded-lg px-2.5 py-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
              >
                {book.chapters.map(ch => (
                  <option key={ch.number} value={ch.number}>
                    Chapter {ch.number}: {ch.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Atmospheric Shift Name
              </label>
              <input
                type="text"
                value={variationMood}
                onChange={(e) => setVariationMood(e.target.value)}
                placeholder="e.g. 1970s Noir Flashback"
                className="w-full bg-zinc-900 text-xs text-zinc-200 rounded-lg px-2.5 py-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Palette Shift Preset
              </label>
              <select
                value={variationPaletteShift}
                onChange={(e) => setVariationPaletteShift(e.target.value as any)}
                className="w-full bg-zinc-900 text-xs text-zinc-200 rounded-lg px-2.5 py-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
              >
                <option value="sepia_flashback">Sepia Tinted Flashback</option>
                <option value="desaturated_noir">Desaturated Noir Shadows</option>
                <option value="dreamlike_pastel">Dreamlike Ethereal Pastel</option>
                <option value="vibrant_kinetic">Vibrant High-Stakes Kinetic</option>
                <option value="monochrome_ink">High-Contrast Monochrome Ink</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleAddChapterVariation}
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                + Add Chapter Variation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
