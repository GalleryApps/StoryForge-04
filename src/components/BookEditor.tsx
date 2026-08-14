import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  RefreshCw,
  Sparkles,
  Play,
  Layers,
  FileText,
  MessageSquare,
  Heading,
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronLeft,
  Quote,
  SplitSquareVertical,
  HelpCircle,
  ShieldCheck,
  Send,
  Loader2
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { PageElement, ElementType, PageLayoutType } from '../types';

export const BookEditor: React.FC = () => {
  const {
    book,
    activeChapterIdx,
    activeSceneIdx,
    activePageIdx,
    isAiGenerating,
    aiStatusMessage,
    totalPageCount,
    setActiveChapterIdx,
    setActiveSceneIdx,
    setActivePageIdx,
    updateBook,
    updateElementContent,
    addElement,
    deleteElement,
    addPage,
    deletePage,
    generateChapterAi,
    continueStoryAi,
    regenerateIllustrationAi,
    extractContinuityFactsAi,
    toggleVisualStyleLock,
    referenceStudio,
    setActiveView,
  } = useStory();

  const [aiPromptInstruction, setAiPromptInstruction] = useState('');
  const [continueInstruction, setContinueInstruction] = useState('');
  const [showChapterAiModal, setShowChapterAiModal] = useState(false);
  const [editingImagePromptIdx, setEditingImagePromptIdx] = useState<number | null>(null);
  const [customImagePrompt, setCustomImagePrompt] = useState('');

  const currentChapter = book.chapters[activeChapterIdx] || book.chapters[0];
  const currentScene = currentChapter?.scenes[activeSceneIdx] || currentChapter?.scenes[0];
  const currentPage = currentScene?.pages[activePageIdx] || currentScene?.pages[0];

  if (!currentChapter || !currentScene || !currentPage) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p>No active page selected. Create a chapter to begin.</p>
      </div>
    );
  }

  const handleAddElement = (type: ElementType) => {
    const newElement: PageElement = {
      id: `el-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type,
      content: type === 'heading' ? 'Section Heading' : type === 'dialogue' ? 'Enter dialogue here...' : type === 'exercise_box' ? 'Practice Craft Exercise:' : 'Write your narrative text here...',
      speaker: type === 'dialogue' ? 'Speaker' : undefined,
      calloutType: type === 'exercise_box' ? 'exercise' : undefined,
    };
    addElement(activeChapterIdx, activeSceneIdx, activePageIdx, newElement);
  };

  const handleAddIllustration = () => {
    const newElement: PageElement = {
      id: `el-img-${Date.now()}`,
      type: 'illustration',
      content: 'Illustration caption / description',
      imagePrompt: 'A detailed scene illustration honoring the locked visual style and character bible',
      imagePosition: 'half_top',
      imageAspect: '1:1',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    };
    addElement(activeChapterIdx, activeSceneIdx, activePageIdx, newElement);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-85px)] overflow-hidden bg-slate-100 text-slate-800">
      {/* Left Sidebar: Chapter & Scene Hierarchy Tree */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden shadow-xs">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Manuscript Structure</span>
          </div>
          <button
            id="btn-add-chapter"
            onClick={() => setShowChapterAiModal(true)}
            className="flex items-center gap-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200 font-semibold transition"
            title="Generate or add new chapter with continuity context"
          >
            <Plus className="w-3 h-3" />
            <span>New Chapter</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2.5">
          {book.chapters.map((ch, chIdx) => (
            <div
              key={ch.id}
              className={`rounded-xl border transition ${
                chIdx === activeChapterIdx
                  ? 'bg-indigo-50/70 border-indigo-200 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => {
                  setActiveChapterIdx(chIdx);
                  setActiveSceneIdx(0);
                  setActivePageIdx(0);
                }}
                className="w-full text-left p-2.5 flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 px-1.5 py-0.5 rounded bg-indigo-100/80 border border-indigo-200">
                      CH {ch.number}
                    </span>
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">
                      {ch.title}
                    </span>
                  </div>
                  {ch.subtitle && (
                    <p className="text-[10px] text-slate-500 italic line-clamp-1 mt-0.5">
                      {ch.subtitle}
                    </p>
                  )}
                </div>
              </button>

              {/* Scenes & Pages list when chapter is active */}
              {chIdx === activeChapterIdx && (
                <div className="px-2 pb-2.5 pt-1 border-t border-indigo-100 space-y-2">
                  {ch.scenes.map((sc, scIdx) => (
                    <div key={sc.id} className="pl-2 border-l-2 border-indigo-200">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 py-1">
                        <span className="font-semibold text-slate-700 truncate">{sc.title || `Scene ${scIdx + 1}`}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{sc.location}</span>
                      </div>
                      
                      {/* Pages pill selector */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {sc.pages.map((pg, pgIdx) => (
                          <button
                            key={pg.id}
                            onClick={() => {
                              setActiveSceneIdx(scIdx);
                              setActivePageIdx(pgIdx);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-mono transition ${
                              scIdx === activeSceneIdx && pgIdx === activePageIdx
                                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            Pg {pg.pageNumber}
                          </button>
                        ))}
                        <button
                          onClick={() => addPage(chIdx, scIdx)}
                          className="px-1.5 py-1 rounded text-[10px] bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-600 border border-slate-200 flex items-center gap-0.5"
                          title="Add new page to this scene"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Style Lock Indicator on Sidebar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${book.memoryEngine.level1GlobalBible.visualStyleLocked ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span className="text-[11px] text-slate-600">
              Visual Style Lock: <strong className={book.memoryEngine.level1GlobalBible.visualStyleLocked ? 'text-emerald-700' : 'text-slate-400'}>{book.memoryEngine.level1GlobalBible.visualStyleLocked ? 'ACTIVE' : 'UNLOCKED'}</strong>
            </span>
          </div>
          <button
            onClick={toggleVisualStyleLock}
            className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold underline font-mono"
          >
            {book.memoryEngine.level1GlobalBible.visualStyleLocked ? 'Unlock' : 'Lock Style'}
          </button>
        </div>
      </aside>

      {/* Center Main: The Live Authoring Manuscript Page */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100">
        {/* Top Page Sub-Header */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
              Chapter {currentChapter.number} • Scene {activeSceneIdx + 1} • Page {currentPage.pageNumber}
            </span>
            <span className="text-xs text-slate-700 font-medium truncate max-w-sm hidden sm:inline">
              {currentChapter.title} — {currentScene.title}
            </span>
          </div>

          {/* Quick Page Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => extractContinuityFactsAi(activeChapterIdx)}
              disabled={isAiGenerating}
              className="flex items-center gap-1.5 text-xs bg-white hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-lg border border-slate-200 font-semibold transition shadow-2xs"
              title="Extract durable facts from this chapter into memory buffer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Sync Facts</span>
            </button>

            {/* Previous Page */}
            <button
              disabled={activePageIdx === 0 && activeSceneIdx === 0}
              onClick={() => {
                if (activePageIdx > 0) setActivePageIdx(activePageIdx - 1);
                else if (activeSceneIdx > 0) {
                  setActiveSceneIdx(activeSceneIdx - 1);
                  const prevScenePages = currentChapter?.scenes?.[activeSceneIdx - 1]?.pages || [];
                  setActivePageIdx(Math.max(0, prevScenePages.length - 1));
                }
              }}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 text-slate-600 shadow-2xs transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-slate-500">
              {currentPage.pageNumber} / {totalPageCount}
            </span>

            {/* Next Page */}
            <button
              disabled={
                activeSceneIdx === (currentChapter?.scenes?.length || 1) - 1 &&
                activePageIdx === (currentScene?.pages?.length || 1) - 1
              }
              onClick={() => {
                const currentPages = currentScene?.pages || [];
                const scenes = currentChapter?.scenes || [];
                if (activePageIdx < currentPages.length - 1) setActivePageIdx(activePageIdx + 1);
                else if (activeSceneIdx < scenes.length - 1) {
                  setActiveSceneIdx(activeSceneIdx + 1);
                  setActivePageIdx(0);
                }
              }}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 text-slate-600 shadow-2xs transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active AI Status Banner */}
        {isAiGenerating && (
          <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 flex items-center gap-2 text-xs text-indigo-800 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
            <span>{aiStatusMessage || 'AI Orchestrator drafting with 3-Level Memory Continuity...'}</span>
          </div>
        )}

        {/* The Page Canvas (Visual Book Sheet) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center">
          <div className="max-w-3xl w-full bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xl space-y-6 min-h-[600px] flex flex-col justify-between">
            {/* Page Header elements */}
            <div className="space-y-5">
              {currentPage.elements.map((el, elIdx) => (
                <div
                  key={el.id}
                  className="group relative rounded-xl p-3 transition border border-transparent hover:border-slate-200 hover:bg-slate-50/70"
                >
                  {/* Element Action toolbar (hover) */}
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-md z-10">
                    <button
                      onClick={() => deleteElement(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx)}
                      className="text-slate-400 hover:text-rose-600 p-0.5 transition"
                      title="Delete Element"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 1. Heading element */}
                  {el.type === 'heading' && (
                    <input
                      type="text"
                      value={el.content}
                      onChange={e => updateElementContent(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx, e.target.value)}
                      className="w-full bg-transparent font-serif text-xl sm:text-2xl font-bold text-slate-900 focus:outline-none border-b border-transparent focus:border-indigo-500 pb-1 tracking-tight"
                      placeholder="Heading Title..."
                    />
                  )}

                  {/* 2. Paragraph element */}
                  {el.type === 'paragraph' && (
                    <textarea
                      rows={Math.max(2, Math.ceil(el.content.length / 80))}
                      value={el.content}
                      onChange={e => updateElementContent(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx, e.target.value)}
                      className="w-full bg-transparent font-serif text-slate-800 text-sm sm:text-base leading-relaxed focus:outline-none resize-y"
                      placeholder="Paragraph text..."
                    />
                  )}

                  {/* 3. Dialogue element */}
                  {el.type === 'dialogue' && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-700 font-bold">
                          Speaker:
                        </span>
                        <input
                          type="text"
                          value={el.speaker || ''}
                          onChange={e => updateElementContent(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx, el.content, e.target.value)}
                          className="bg-slate-100 px-2 py-0.5 rounded text-xs text-indigo-900 font-mono font-medium focus:outline-none w-36 border border-slate-200"
                          placeholder="Speaker name"
                        />
                      </div>
                      <div className="flex items-start gap-2 pl-3 border-l-2 border-indigo-500">
                        <textarea
                          rows={2}
                          value={el.content}
                          onChange={e => updateElementContent(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx, e.target.value, el.speaker)}
                          className="w-full bg-transparent font-serif italic text-slate-800 text-sm sm:text-base leading-relaxed focus:outline-none resize-none"
                          placeholder="Dialogue text..."
                        />
                      </div>
                    </div>
                  )}

                  {/* 4. Illustration element */}
                  {el.type === 'illustration' && (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-indigo-700 font-bold flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5" />
                            Book Illustration
                          </span>
                          {referenceStudio?.matchMyReferences && (
                            <button
                              onClick={() => setActiveView('reference_studio')}
                              className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold flex items-center gap-1 hover:bg-amber-100 transition"
                              title="Reference DNA Active (Click to open Reference Studio)"
                            >
                              <Lock className="w-2.5 h-2.5 text-amber-600" />
                              <span>Reference DNA Locked</span>
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (editingImagePromptIdx === elIdx) {
                                setEditingImagePromptIdx(null);
                              } else {
                                setEditingImagePromptIdx(elIdx);
                                setCustomImagePrompt(el.imagePrompt || el.content || '');
                              }
                            }}
                            className="text-slate-500 hover:text-slate-800 text-[11px] underline font-mono"
                          >
                            {editingImagePromptIdx === elIdx ? 'Hide Prompt' : 'Edit Prompt'}
                          </button>
                          <button
                            onClick={() => regenerateIllustrationAi(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx, customImagePrompt)}
                            disabled={isAiGenerating}
                            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-xs transition"
                          >
                            <RefreshCw className={`w-3 h-3 ${isAiGenerating ? 'animate-spin' : ''}`} />
                            Regenerate Art
                          </button>
                        </div>
                      </div>

                      {editingImagePromptIdx === elIdx && (
                        <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-200 text-xs">
                          <label className="block text-[10px] uppercase font-mono text-slate-500 font-bold">
                            Custom Prompt (Inherits Visual Style Lock + Character Bible)
                          </label>
                          <textarea
                            rows={2}
                            value={customImagePrompt}
                            onChange={e => setCustomImagePrompt(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                          />
                        </div>
                      )}

                      {/* Display image preview */}
                      <div className="relative aspect-video sm:aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                        {el.imageUrl ? (
                          <img
                            src={el.imageUrl}
                            alt={el.content || 'Scene Illustration'}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center text-slate-400 space-y-1">
                            <ImageIcon className="w-8 h-8 mx-auto stroke-1" />
                            <p className="text-xs font-mono">No image rendered yet</p>
                          </div>
                        )}
                      </div>

                      {/* Caption */}
                      <input
                        type="text"
                        value={el.content}
                        onChange={e => updateElementContent(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx, e.target.value)}
                        className="w-full bg-transparent text-center font-serif italic text-xs text-slate-500 focus:outline-none border-b border-transparent focus:border-slate-300 pb-0.5"
                        placeholder="Add illustration caption..."
                      />
                    </div>
                  )}

                  {/* 5. Exercise / Callout box */}
                  {(el.type === 'exercise_box' || el.calloutType) && (
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-700 uppercase tracking-wide">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{el.calloutType?.toUpperCase() || 'CRAFT EXERCISE / AUTOPSY NOTE'}</span>
                      </div>
                      <textarea
                        rows={3}
                        value={el.content}
                        onChange={e => updateElementContent(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx, e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none resize-none"
                      />
                    </div>
                  )}

                  {/* 6. Quote / Epigraph */}
                  {el.type === 'quote' && (
                    <div className="px-6 py-3 border-l-2 border-indigo-500 bg-slate-50 rounded-r-lg">
                      <textarea
                        rows={2}
                        value={el.content}
                        onChange={e => updateElementContent(activeChapterIdx, activeSceneIdx, activePageIdx, elIdx, e.target.value)}
                        className="w-full bg-transparent font-serif italic text-slate-700 text-sm focus:outline-none resize-none"
                        placeholder="Quotation or thematic epigraph..."
                      />
                    </div>
                  )}

                  {/* 7. Scene Break */}
                  {el.type === 'scene_break' && (
                    <div className="py-2 text-center text-slate-400 tracking-widest font-serif text-lg">
                      *   *   *
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Element Insertion Toolbar */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase mr-1">Add to Page:</span>
              
              <button
                onClick={() => handleAddElement('paragraph')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Paragraph
              </button>

              <button
                onClick={() => handleAddElement('dialogue')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                Dialogue
              </button>

              <button
                onClick={() => handleAddElement('heading')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition shadow-2xs"
              >
                <Heading className="w-3.5 h-3.5 text-indigo-600" />
                Heading
              </button>

              <button
                onClick={handleAddIllustration}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition shadow-2xs"
              >
                <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                Illustration
              </button>

              <button
                onClick={() => handleAddElement('exercise_box')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition shadow-2xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                Exercise Box
              </button>

              <button
                onClick={() => handleAddElement('scene_break')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition shadow-2xs"
              >
                <SplitSquareVertical className="w-3.5 h-3.5 text-slate-400" />
                Divider
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Continuation & Prompt Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex-1 w-full flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={continueInstruction}
                onChange={e => setContinueInstruction(e.target.value)}
                placeholder="Direct the continuation (e.g. Maria reveals the secret audit code under pressure...)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white placeholder-slate-400 transition"
              />
            </div>

            <button
              onClick={() => continueStoryAi(currentPage.pageNumber, continueInstruction)}
              disabled={isAiGenerating}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-xs tracking-wide shadow-sm transition whitespace-nowrap active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONTINUE FROM HERE</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
            <span className="hidden lg:inline text-slate-400">Context Buffer:</span>
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold">
              {(book?.memoryEngine?.level2RollingMemory?.continuityFacts || []).filter(f => f.active).length} Active Facts
            </span>
          </div>
        </div>
      </main>

      {/* Modal: New Chapter AI Generator */}
      {showChapterAiModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Generate Chapter {(book?.chapters?.length || 0) + 1} with 3-Level Memory
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              The AI orchestrator will consult the <strong>Global Bible</strong> (locked character traits & lore), the <strong>Rolling Story Buffer</strong>, and recent unresolved threads to maintain strict narrative continuity.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chapter Direction / Narrative Goals
              </label>
              <textarea
                rows={3}
                value={aiPromptInstruction}
                onChange={e => setAiPromptInstruction(e.target.value)}
                placeholder="e.g. Arthur and Maria sneak into the Central Chronometer vault during the evening shift change, but discover Tomas has changed the lock codes..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-600 font-mono">
              <div className="text-slate-800 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Continuity Checks Prepared:
              </div>
              <div>• Character traits locked: {(book?.memoryEngine?.level1GlobalBible?.characters || []).map(c => c.name).join(', ') || 'Standard'}</div>
              <div>• Rolling summaries active: {(book?.memoryEngine?.level2RollingMemory?.chapterSummaries || []).length} chapters loaded</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowChapterAiModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isAiGenerating}
                onClick={async () => {
                  setShowChapterAiModal(false);
                  await generateChapterAi(aiPromptInstruction);
                  setAiPromptInstruction('');
                }}
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
              >
                Generate Chapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
