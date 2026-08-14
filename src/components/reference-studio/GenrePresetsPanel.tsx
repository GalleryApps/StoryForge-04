import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Check, 
  Layers, 
  Palette, 
  Brush, 
  Sun, 
  ShieldAlert, 
  ArrowRight,
  Tv,
  Compass,
  FileCode
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { GENRE_REFERENCE_GUIDES } from '../../data/genreReferenceDefaults';

export const GenrePresetsPanel: React.FC = () => {
  const { referenceStudio, applyGenreArtPreset, isAiGenerating } = useStory();
  const currentGenreKey = referenceStudio.activeGenre;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 rounded-2xl border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">Genre-Specific Art Reference Systems</h3>
            <p className="text-xs text-zinc-400">
              Each genre adapts prompt weights, medium parameters, and visual continuity rules to match industry publication benchmarks.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(GENRE_REFERENCE_GUIDES).map((guide) => {
          const isCurrent = currentGenreKey === guide.genreKey;

          return (
            <div
              key={guide.genreKey}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isCurrent
                  ? 'bg-zinc-900 border-amber-500 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/5'
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-100">{guide.genreTitle}</span>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {guide.assistantTip}
                </p>

                {/* Medium & Technique Summary */}
                <div className="p-2.5 bg-zinc-950/80 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-300 space-y-1 font-mono">
                  <div><strong className="text-amber-400">Medium:</strong> {guide.sampleArtBible.medium}</div>
                  <div><strong className="text-amber-400">Technique:</strong> {guide.sampleArtBible.renderingTechnique}</div>
                  <div><strong className="text-amber-400">Lighting:</strong> {guide.sampleArtBible.lighting}</div>
                </div>

                {/* Palette Previews */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                    Curated Genre Palettes:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {guide.artStylePresets.slice(0, 2).map((preset, pIdx) => (
                      <div key={pIdx} className="flex items-center justify-between p-1.5 bg-zinc-950/60 rounded-lg border border-zinc-800/60">
                        <span className="text-[10px] text-zinc-400 truncate max-w-[120px]">{preset.label}</span>
                        <div className="flex items-center gap-1">
                          {preset.paletteSuggestions.map((c, cIdx) => (
                            <div
                              key={cIdx}
                              className="w-3.5 h-3.5 rounded-full border border-zinc-700 shadow-sm"
                              style={{ backgroundColor: c }}
                              title={c}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-zinc-800/80">
                <button
                  onClick={() => applyGenreArtPreset(guide.genreKey)}
                  disabled={isCurrent || isAiGenerating}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-zinc-800 text-zinc-500 cursor-default'
                      : 'bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 border border-zinc-700 hover:border-amber-500'
                  }`}
                >
                  <span>{isCurrent ? 'Current Visual Framework' : `Apply ${guide.genreTitle} DNA`}</span>
                  {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
