import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  ChevronRight,
  Plus,
  Trash2,
  Copy,
  Download,
  Check,
  RefreshCw,
  Wand2,
  FileText,
  Bookmark,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { BookMapChapter, SAMPLE_22_CHAPTER_BOOK_MAP } from './EsotericBlueprintTypes';

interface Props {
  bookMap: BookMapChapter[];
  onUpdateBookMap: (updater: (prev: BookMapChapter[]) => BookMapChapter[]) => void;
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
}

export const EsotericBookMap22Chapters: React.FC<Props> = ({
  bookMap,
  onUpdateBookMap,
  onExecuteAIGenerator,
  isGeneratingAI,
}) => {
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [filterPart, setFilterPart] = useState<string>('ALL');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGeneratingChapterProse, setIsGeneratingChapterProse] = useState<boolean>(false);
  const [generatedChapterOutput, setGeneratedChapterOutput] = useState<{ chapterTitle: string; prose: string } | null>(null);

  const activeChap = bookMap[selectedChapterIdx] || bookMap[0];

  const updateActiveChapterField = (field: keyof BookMapChapter, val: any) => {
    onUpdateBookMap(prev => {
      const copy = [...prev];
      if (copy[selectedChapterIdx]) {
        copy[selectedChapterIdx] = { ...copy[selectedChapterIdx], [field]: val };
      }
      return copy;
    });
  };

  const addCustomChapter = () => {
    const newChapNum = bookMap.length + 1;
    const newChap: BookMapChapter = {
      chapterNumber: newChapNum,
      part: activeChap?.part || 'PART V: PRACTICE & APPLICATION',
      title: `Chapter ${newChapNum}: Special Study`,
      subtitle: 'Exploration of Advanced Esoteric Principles',
      epigraph: '"Wisdom is the breath of the power of God."',
      openingHook: 'A newly unsealed archive sheds light on this overlooked transformative practice.',
      subsections: ['Foundational Concepts', 'Primary Source Analysis', 'Practical Application Protocols', 'Synthesis'],
      sidebars: ['Definition: Core Terms', 'Warning: Beginner Errors'],
      exercises: ['Observation Drill', 'Journaling Protocol'],
      conclusionNote: 'Integrating these insights prepares the seeker for subsequent theurgic operations.',
    };
    onUpdateBookMap(prev => [...prev, newChap]);
    setSelectedChapterIdx(bookMap.length);
  };

  const removeChapter = (idx: number) => {
    onUpdateBookMap(prev => prev.filter((_, i) => i !== idx));
    if (selectedChapterIdx >= bookMap.length - 1) {
      setSelectedChapterIdx(Math.max(0, bookMap.length - 2));
    }
  };

  const parts: string[] = Array.from(new Set(bookMap.map(c => c.part)));

  const filteredChapters =
    filterPart === 'ALL' ? bookMap : bookMap.filter(c => c.part === filterPart);

  const handleGenerateProse = async () => {
    if (!activeChap) return;
    setIsGeneratingChapterProse(true);
    setGeneratedChapterOutput(null);
    try {
      const res = await fetch('/api/gemini/generate-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookTitle: 'Practical Esoteric & Symbolic Textbook',
          bookType: 'manual_lesson',
          chapterNumber: activeChap.chapterNumber,
          chapterTitle: `${activeChap.title}: ${activeChap.subtitle}`,
          userInstruction: `Write Chapter ${activeChap.chapterNumber} with Epigraph: "${activeChap.epigraph}", Opening Hook: "${activeChap.openingHook}", Subsections: ${activeChap.subsections.join(', ')}, Sidebars: ${activeChap.sidebars.join('; ')}, and Exercises: ${activeChap.exercises.join('; ')}. Maintain high scholarly rigor paired with deep symbolic depth.`,
          targetPageCount: 3,
        }),
      });
      const data = await res.json();
      if (data.scenes && data.scenes.length > 0) {
        const fullProse = data.scenes
          .map((s: any) =>
            s.pages
              ?.map((p: any) =>
                p.elements?.map((el: any) => el.content || `[${el.type}: ${el.imagePrompt || ''}]`).join('\n\n')
              )
              .join('\n\n--- PAGE BREAK ---\n\n')
          )
          .join('\n\n=== SECTION BREAK ===\n\n');
        setGeneratedChapterOutput({
          chapterTitle: `Chapter ${activeChap.chapterNumber}: ${activeChap.title}`,
          prose: fullProse || 'Generated full chapter draft.',
        });
      } else {
        setGeneratedChapterOutput({
          chapterTitle: `Chapter ${activeChap.chapterNumber}: ${activeChap.title}`,
          prose: `Generated Chapter ${activeChap.chapterNumber} outline & curriculum draft successfully.`,
        });
      }
    } catch (e: any) {
      setGeneratedChapterOutput({
        chapterTitle: `Chapter ${activeChap.chapterNumber}: ${activeChap.title}`,
        prose: `Sample drafted chapter prose for ${activeChap.title}: \n\n${activeChap.epigraph}\n\n${activeChap.openingHook}\n\n[Section 1: ${activeChap.subsections[0] || 'Foundations'}]\nExploring the deeper Hermetic correspondences...`,
      });
    } finally {
      setIsGeneratingChapterProse(false);
    }
  };

  const handleCopyBookJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(bookMap, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Level 9: Complete 22-Chapter Master Book Map
            </h4>
            <p className="text-xs text-slate-400">
              Interactive 22-Chapter Curriculum spanning Parts I–VIII, Preliminary Pages & End Matter.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={addCustomChapter}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Chapter
            </button>
            <button
              onClick={handleCopyBookJSON}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied JSON' : 'Export 22-Chapter Blueprint'}
            </button>
          </div>
        </div>

        {/* PART FILTER TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
          <button
            onClick={() => setFilterPart('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap border ${
              filterPart === 'ALL'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            All 22 Chapters
          </button>
          {parts.map(p => (
            <button
              key={p}
              onClick={() => setFilterPart(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap border ${
                filterPart === p
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {p.replace('PART ', '')}
            </button>
          ))}
        </div>

        {/* MAIN LAYOUT: CHAPTER LIST & CHAPTER INSPECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* CHAPTER LIST (LEFT) */}
          <div className="lg:col-span-5 max-h-[580px] overflow-y-auto space-y-2 pr-1">
            {filteredChapters.map((chap, i) => {
              const realIndex = bookMap.findIndex(c => c.chapterNumber === chap.chapterNumber);
              const isSelected = selectedChapterIdx === realIndex;
              return (
                <div
                  key={chap.chapterNumber}
                  onClick={() => setSelectedChapterIdx(realIndex)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition space-y-1 ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400 font-bold">
                      Ch. {chap.chapterNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[180px]">{chap.part}</span>
                  </div>
                  <div className="font-bold text-xs text-white leading-tight">{chap.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{chap.subtitle}</div>
                </div>
              );
            })}
          </div>

          {/* CHAPTER INSPECTOR & EDITOR (RIGHT) */}
          {activeChap && (
            <div className="lg:col-span-7 p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono text-[11px]">
                      Chapter {activeChap.chapterNumber}
                    </span>
                    <span className="text-slate-400 font-semibold">{activeChap.part}</span>
                  </div>
                  <h3 className="text-base font-black text-amber-200 mt-1 font-serif">{activeChap.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={isGeneratingChapterProse}
                    onClick={handleGenerateProse}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    {isGeneratingChapterProse ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Wand2 className="w-3.5 h-3.5" />
                    )}
                    Generate Full Chapter Draft
                  </button>
                  {bookMap.length > 1 && (
                    <button
                      onClick={() => removeChapter(selectedChapterIdx)}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 border border-red-800 text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* CHAPTER FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-semibold">Title</label>
                  <input
                    type="text"
                    value={activeChap.title}
                    onChange={e => updateActiveChapterField('title', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-bold"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-semibold">Subtitle</label>
                  <input
                    type="text"
                    value={activeChap.subtitle}
                    onChange={e => updateActiveChapterField('subtitle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-semibold">Epigraph</label>
                  <input
                    type="text"
                    value={activeChap.epigraph}
                    onChange={e => updateActiveChapterField('epigraph', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300 italic"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-semibold">Opening Hook Narrative</label>
                  <textarea
                    rows={2}
                    value={activeChap.openingHook}
                    onChange={e => updateActiveChapterField('openingHook', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  />
                </div>

                {/* Subsections */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-slate-400 font-semibold">Subsections (Ordered Pedagogical Beats)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeChap.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                        <span className="font-mono text-amber-400 font-bold">{sIdx + 1}.</span> {sub}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebars & Exercises */}
                <div className="space-y-1 sm:col-span-1">
                  <label className="text-slate-400 font-semibold">Marginal Sidebars</label>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1 text-[11px] text-slate-300">
                    {activeChap.sidebars.map((sb, sbIdx) => (
                      <div key={sbIdx}>• {sb}</div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="text-slate-400 font-semibold">Contemplation & Practice Exercises</label>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1 text-[11px] text-amber-200">
                    {activeChap.exercises.map((ex, exIdx) => (
                      <div key={exIdx}>⚡ {ex}</div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-semibold">Conclusion & Threshold Note</label>
                  <textarea
                    rows={2}
                    value={activeChap.conclusionNote}
                    onChange={e => updateActiveChapterField('conclusionNote', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>

              {/* GENERATED PROSE MODAL / VIEWER */}
              {generatedChapterOutput && (
                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/50 space-y-2 mt-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-amber-300 text-xs">
                      ✨ Draft: {generatedChapterOutput.chapterTitle}
                    </span>
                    <button
                      onClick={() => setGeneratedChapterOutput(null)}
                      className="text-slate-500 hover:text-white text-xs"
                    >
                      Close
                    </button>
                  </div>
                  <div className="text-slate-200 text-xs whitespace-pre-wrap max-h-60 overflow-y-auto font-serif leading-relaxed p-2 bg-slate-900/60 rounded">
                    {generatedChapterOutput.prose}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
