import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  BrainCircuit,
  Sliders,
  Type,
  Download,
  Sparkles,
  Layers,
  Plus,
  BookmarkCheck,
  ChevronDown,
  AlertTriangle,
  Feather,
  Wand2,
  Compass,
  Palette,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { BookType } from '../types';

interface NavigationHeaderProps {
  onOpenExportModal: () => void;
  onOpenModelSettings: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onOpenExportModal,
  onOpenModelSettings,
}) => {
  const {
    book,
    savedBooks,
    activeView,
    totalPageCount,
    pageLimitWarning,
    setActiveView,
    switchBook,
    createNewBook,
    createNewVolume,
  } = useStory();

  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showNewBookModal, setShowNewBookModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newType, setNewType] = useState<BookType>('illustrated_novel');

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createNewBook(newType, newTitle, newAuthor || 'Author');
    setShowNewBookModal(false);
    setNewTitle('');
    setNewAuthor('');
  };

  const formatBookTypeLabel = (t: string) => {
    switch (t) {
      case 'illustrated_novel': return 'Illustrated Novel';
      case 'comic_graphic_novel': return 'Graphic Novel / Comic';
      case 'writing_manual': return 'Writing Manual & Lab';
      case 'non_fiction_satire': return 'Satirical Novel';
      default: return 'Literary Novel';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-800 px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm select-none">
      {/* Left: Brand + Project Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-slate-800 text-base font-sans">
                STORYFORGE
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-600 font-mono font-bold border border-indigo-100">
                v2.4.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans hidden sm:block">
              AI Publishing & Continuity Engine
            </p>
          </div>
        </div>

        {/* Project Selector Dropdown */}
        <div className="relative">
          <button
            id="btn-project-selector"
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 transition max-w-[220px]"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <div className="truncate text-left">
              <span className="font-medium truncate block text-slate-800">{book.title}</span>
              <span className="text-[10px] text-slate-400">Vol {book.volume || 1} • {formatBookTypeLabel(book.bookType)}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0" />
          </button>

          {showProjectDropdown && (
            <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Active Projects & Volumes
              </div>
              <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
                {savedBooks.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      switchBook(b.id);
                      setShowProjectDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 transition ${
                      b.id === book.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <span className="truncate">{b.title}</span>
                    <span className="text-[10px] text-slate-400">
                      Vol {b.volume || 1} • {b.chapters.length} Chapters • {formatBookTypeLabel(b.bookType)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 mt-2 pt-2 px-2 flex flex-col gap-1">
                <button
                  onClick={() => {
                    createNewVolume();
                    setShowProjectDropdown(false);
                  }}
                  className="w-full text-left px-2 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-lg flex items-center gap-2 font-medium"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Create Volume { (book.volume || 1) + 1 } (Inherit Memory)
                </button>
                <button
                  onClick={() => {
                    setShowNewBookModal(true);
                    setShowProjectDropdown(false);
                  }}
                  className="w-full text-left px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                  Create New Book Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: View Navigation Tabs */}
      <nav className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
        <button
          id="tab-view-story-architect"
          onClick={() => setActiveView('story_architect')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            activeView === 'story_architect'
              ? 'bg-indigo-600 text-white shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Story Architect</span>
        </button>

        <button
          id="tab-view-reference-studio"
          onClick={() => setActiveView('reference_studio')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            activeView === 'reference_studio'
              ? 'bg-amber-500 text-zinc-950 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden md:inline">Reference Studio</span>
        </button>

        <button
          id="tab-view-style"
          onClick={() => setActiveView('style_manager')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            activeView === 'style_manager'
              ? 'bg-white text-indigo-700 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Style & Art</span>
        </button>

        <button
          id="tab-view-editor"
          onClick={() => setActiveView('editor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            activeView === 'editor'
              ? 'bg-white text-indigo-700 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Studio Editor</span>
        </button>

        <button
          id="tab-view-preview"
          onClick={() => setActiveView('preview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            activeView === 'preview'
              ? 'bg-white text-indigo-700 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Book Preview</span>
        </button>

        <button
          id="tab-view-memory"
          onClick={() => setActiveView('memory_engine')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            activeView === 'memory_engine'
              ? 'bg-white text-indigo-700 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">3-Level Memory</span>
        </button>

        <button
          id="tab-view-manual-lab"
          onClick={() => setActiveView('manual_lab')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            activeView === 'manual_lab'
              ? 'bg-white text-indigo-700 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Craft Lab</span>
        </button>
      </nav>

      {/* Right: Active Model Pill + Capacity + Settings + Export Button */}
      <div className="flex items-center gap-2.5">
        {/* Model Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
            Gemini 3.7 Flash Active
          </span>
        </div>

        {/* Page Counter */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border ${
            pageLimitWarning
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
          title={`${totalPageCount} of ${book.metadata.maxPageLimit || 500} maximum volume pages`}
        >
          {pageLimitWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
          <span>
            Pg {totalPageCount} / {book.metadata.maxPageLimit || 500}
          </span>
        </div>

        {/* AI Model Settings trigger */}
        <button
          id="btn-model-settings"
          onClick={onOpenModelSettings}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition border border-transparent hover:border-slate-200"
          title="AI Model Orchestration & Settings"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Primary EXPORT BOOK Button */}
        <button
          id="btn-export-book"
          onClick={onOpenExportModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-xs tracking-wide shadow-sm transition active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT BOOK</span>
        </button>
      </div>

      {/* Modal for Creating New Book */}
      {showNewBookModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Create New Book Project
            </h3>
            <form onSubmit={handleCreateBook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Book Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Chronometer of Saint Jude"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
                <input
                  type="text"
                  placeholder="e.g. Arthur Vance"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Book Format & Genre</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as BookType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                >
                  <option value="illustrated_novel">Illustrated Novel (Prose + Embedded Full/Half Art)</option>
                  <option value="comic_graphic_novel">Graphic Novel / Comic (Multi-Panel + Dialogue Bubbles)</option>
                  <option value="literary_novel">Literary Fiction / Prose Novel</option>
                  <option value="writing_manual">Creative-Writing Manual & Masterclass Lab</option>
                  <option value="non_fiction_satire">Satirical Non-Fiction / Chronicle</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewBookModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
                >
                  Start Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
