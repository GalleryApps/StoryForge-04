import React from 'react';
import {
  BookMarked,
  Sparkles,
  Sliders,
  Compass,
  Layers,
  Zap,
  Activity,
  Flame,
} from 'lucide-react';
import { ChapterStructureConfig } from './EsotericBlueprintTypes';

interface Props {
  chapterConfig: ChapterStructureConfig;
  onUpdateChapterConfig: (updater: (prev: ChapterStructureConfig) => ChapterStructureConfig) => void;
  activeSectionType: string;
  onUpdateSectionType: (val: any) => void;
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
}

export const EsotericChapterStructureLevel: React.FC<Props> = ({
  chapterConfig,
  onUpdateChapterConfig,
  activeSectionType,
  onUpdateSectionType,
  onExecuteAIGenerator,
  isGeneratingAI,
}) => {
  return (
    <div className="space-y-6">
      {/* LEVEL 2: CHAPTER STRUCTURE & PERSONALITY */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <BookMarked className="w-4 h-4" /> Level 2: Chapter Container & Personality Architecture
            </h4>
            <p className="text-xs text-slate-400">
              Control the anatomical sequence and psychological rhythm of each chapter.
            </p>
          </div>
          <button
            disabled={isGeneratingAI}
            onClick={() =>
              onExecuteAIGenerator(
                'Chapter Rhythm Optimizer',
                'Design a chapter pacing blueprint optimizing cognitive load, esoteric revelation, and practical exercises.',
                'chapRhythm'
              )
            }
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Rhythm Harmonizer
          </button>
        </div>

        {/* CHAPTER CONTAINER ANATOMY (2.1) */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="font-bold text-xs text-amber-200">2.1 The 11-Part Chapter Anatomy</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-[11px]">
            {[
              '1. Number & Style',
              '2. Main Title',
              '3. Subtitle Hook',
              '4. Initiatic Epigraph',
              '5. Opening Hook',
              '6. Body & Subheadings',
              '7. Marginal Sidebars',
              '8. Visual Plates',
              '9. Active Exercises',
              '10. Synthesis Conclusion',
              '11. Threshold Transition',
            ].map(part => (
              <div key={part} className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 font-medium">
                {part}
              </div>
            ))}
          </div>
        </div>

        {/* CHAPTER PERSONALITY CONTROLS (2.2) */}
        <div className="space-y-2">
          <div className="font-bold text-xs text-amber-200">2.2 Chapter Personality Controls</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">1. Dominant Tone</label>
              <select
                value={chapterConfig.tone}
                onChange={e =>
                  onUpdateChapterConfig(c => ({ ...c, tone: e.target.value as any }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300 font-medium"
              >
                <option>Academic</option>
                <option>Mystical</option>
                <option>Humorous</option>
                <option>Dramatic</option>
                <option>Conversational</option>
                <option>Philosophical</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">2. Narrative Pace</label>
              <select
                value={chapterConfig.pace}
                onChange={e =>
                  onUpdateChapterConfig(c => ({ ...c, pace: e.target.value as any }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Slow (deep dive)</option>
                <option>Medium (balanced)</option>
                <option>Fast (overview)</option>
                <option>Variable</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">3. Information Density</label>
              <select
                value={chapterConfig.density}
                onChange={e =>
                  onUpdateChapterConfig(c => ({ ...c, density: e.target.value as any }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Light</option>
                <option>Standard</option>
                <option>Dense</option>
                <option>Expert</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">4. Primary Reader Experience</label>
              <select
                value={chapterConfig.experience}
                onChange={e =>
                  onUpdateChapterConfig(c => ({ ...c, experience: e.target.value as any }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Read</option>
                <option>Study</option>
                <option>Practice</option>
                <option>Reflect</option>
                <option>Create</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-slate-400 font-semibold">5. Cognitive Journey Archetype</label>
              <select
                value={chapterConfig.journey}
                onChange={e =>
                  onUpdateChapterConfig(c => ({ ...c, journey: e.target.value as any }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Beginning→Knowledge</option>
                <option>Question→Answer</option>
                <option>Mystery→Revelation</option>
                <option>Problem→Solution</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 3: SECTION STRUCTURE & TYPES */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Level 3: Section Structure & 7 Pedagogical Section Types
            </h4>
            <p className="text-xs text-slate-400">
              Each section inside a chapter follows a disciplined Container + Type methodology.
            </p>
          </div>
          <button
            onClick={() =>
              onExecuteAIGenerator(
                'Section Type Demonstration',
                `Generate a sample paragraph showing how the ${activeSectionType} section type handles the Hermetic principle of Polarity.`,
                'secSample'
              )
            }
            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Preview {activeSectionType} Style
          </button>
        </div>

        {/* 3.1 Container */}
        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-amber-200">3.1 Section Container:</span>
          <div className="flex items-center gap-2 text-slate-300 text-[11px]">
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Heading</span> →
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Intro Hook</span> →
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Body Exploration</span> →
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Concrete Examples</span> →
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Summary Synthesis</span>
          </div>
        </div>

        {/* 3.2 7 Section Types */}
        <div className="space-y-2">
          <div className="font-bold text-xs text-slate-400">3.2 Select Section Mode:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
            {[
              { type: 'Expository', desc: 'Clear, direct explanation of symbols and facts', icon: '📖' },
              { type: 'Analytical', desc: 'Dissecting components, causes, and mechanisms', icon: '🔍' },
              { type: 'Interpretive', desc: 'Uncovering multiple layers of hidden meaning', icon: '🗝️' },
              { type: 'Narrative', desc: 'Telling the historical story or mythic journey', icon: '📜' },
              { type: 'Comparative', desc: 'Side-by-side tradition analysis & parallels', icon: '⚖️' },
              { type: 'Practical', desc: 'Step-by-step how-to protocol or exercise', icon: '⚡' },
              { type: 'Reflective', desc: 'Philosophical inquiry provoking contemplation', icon: '🌌' },
            ].map(st => (
              <button
                key={st.type}
                onClick={() => onUpdateSectionType(st.type)}
                className={`p-3 rounded-xl border text-left transition space-y-1 ${
                  activeSectionType === st.type
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span>{st.icon}</span> {st.type}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">{st.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
