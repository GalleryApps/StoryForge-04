import React, { useState } from 'react';
import {
  Palette,
  Type,
  Layout,
  Brush,
  Users,
  BookOpen,
  Image as ImageIcon,
  Sliders,
  Sparkles,
  ShieldCheck,
  History,
  Wand2,
  FileCheck,
  Check,
  ChevronRight,
  Layers,
  Eye,
  Lock,
  Unlock,
  RotateCcw,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Copy,
  ExternalLink,
  SplitSquareVertical,
  Maximize2,
  Bookmark
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import {
  MasterStylePreset,
  StyleApplicationScope,
  StyleAuditIssue,
  MasterStyleProfile,
  TextHierarchyStyleItem,
  ArtMediumType,
  LineQualityType,
  TextureType,
  RenderingStyleType,
  SpeechBubbleStyleType,
  AdultAestheticType
} from '../../types';
import { ALL_STYLE_PRESET_OPTIONS, MASTER_STYLE_PRESETS } from '../../data/stylePresets';
import { TypographyPanel } from './TypographyPanel';
import { ColorPalettePanel } from './ColorPalettePanel';
import { ChapterDesignPanel } from './ChapterDesignPanel';
import { PageDesignPanel } from './PageDesignPanel';
import { ArtDirectionPanel } from './ArtDirectionPanel';
import { CharactersEnvironmentsPanel } from './CharactersEnvironmentsPanel';
import { ComicStylePanel } from './ComicStylePanel';
import { CoverDesignerPanel } from './CoverDesignerPanel';
import { PdfPublishingPanel } from './PdfPublishingPanel';
import { AiArtDirectorPanel } from './AiArtDirectorPanel';
import { StyleAuditVersioningPanel } from './StyleAuditVersioningPanel';
import { HeaderFooterDesignPanel } from './HeaderFooterDesignPanel';

export type StyleTab =
  | 'presets'
  | 'typography'
  | 'color'
  | 'chapters'
  | 'page_design'
  | 'headers_footers'
  | 'illustration'
  | 'characters_env'
  | 'comic'
  | 'cover'
  | 'pdf'
  | 'ai_director'
  | 'audit_versions';

export const StyleManagerView: React.FC = () => {
  const {
    book,
    masterStyle,
    updateMasterStyle,
    applyStylePreset,
    applyStyleScope,
    isAiGenerating,
    aiStatusMessage,
    activeChapterIdx,
    activeSceneIdx,
    activePageIdx,
    setActiveView
  } = useStory();

  const [activeTab, setActiveTab] = useState<StyleTab>('presets');
  const [selectedScope, setSelectedScope] = useState<StyleApplicationScope>('entire_book');
  const [showLivePreviewModal, setShowLivePreviewModal] = useState(false);
  const [quickRestylePrompt, setQuickRestylePrompt] = useState('');
  const [isRestyling, setIsRestyling] = useState(false);

  const tabs: { id: StyleTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'presets', label: 'Style Presets', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'typography', label: 'Typography', icon: <Type className="w-4 h-4" /> },
    { id: 'color', label: 'Color Palette', icon: <Palette className="w-4 h-4" /> },
    { id: 'chapters', label: 'Chapter Design', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'page_design', label: 'Page & Grid', icon: <Layout className="w-4 h-4" /> },
    { id: 'headers_footers', label: 'Headers & Footers', icon: <Bookmark className="w-4 h-4 text-sky-500" />, badge: 'Scientific' },
    { id: 'illustration', label: 'Art Direction', icon: <Brush className="w-4 h-4" /> },
    { id: 'characters_env', label: 'Cast & Worlds', icon: <Users className="w-4 h-4" /> },
    { id: 'comic', label: 'Comic Language', icon: <SplitSquareVertical className="w-4 h-4" /> },
    { id: 'cover', label: 'Cover & Spine', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'pdf', label: 'PDF Publishing', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'ai_director', label: 'AI Art Director', icon: <Wand2 className="w-4 h-4 text-indigo-500" />, badge: 'AI' },
    { id: 'audit_versions', label: 'Audit & History', icon: <History className="w-4 h-4 text-emerald-500" /> },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Top Banner: Master Style Scope & Quick Actions */}
      <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-sm shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                Book Style & Art Direction Engine
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {masterStyle.name || 'Custom Theme'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Single Designed Object Philosophy • Universal typography, palettes, and art locks
            </p>
          </div>
        </div>

        {/* Scope Control Selector */}
        <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-2 pr-1 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-slate-400" /> Scope:
          </span>
          {(['entire_book', 'chapter', 'scene', 'page'] as StyleApplicationScope[]).map(scope => (
            <button
              key={scope}
              onClick={() => setSelectedScope(scope)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                selectedScope === scope
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {scope === 'entire_book' && 'Entire Book'}
              {scope === 'chapter' && `Chapter ${book.chapters[activeChapterIdx]?.number || 1}`}
              {scope === 'scene' && `Scene ${activeSceneIdx + 1}`}
              {scope === 'page' && `Page ${activePageIdx + 1}`}
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('preview')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>Open Book Preview</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body: Side Navigation + Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Sub-Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto select-none">
          <div className="p-3 border-b border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Design Systems
            </div>
            <div className="flex flex-col gap-0.5 mt-1">
              {tabs.map(t => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                        {t.icon}
                      </span>
                      <span>{t.label}</span>
                    </div>
                    {t.badge && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-md">
                        {t.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Style Locks Summary */}
          <div className="p-3.5 mt-auto border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Style Locks
              </span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                ACTIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Lock className="w-3 h-3 text-emerald-600" /> Typography
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Lock className="w-3 h-3 text-emerald-600" /> Palette
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Lock className="w-3 h-3 text-emerald-600" /> Characters
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Lock className="w-3 h-3 text-emerald-600" /> Medium
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveView('reference_studio')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200/60 text-amber-900 text-xs font-semibold transition"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Reference Studio</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Active Panel Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/80">
          <div className="max-w-6xl mx-auto space-y-6">
            {activeTab === 'presets' && <PresetsGalleryPanel onSelectTab={setActiveTab} />}
            {activeTab === 'typography' && <TypographyPanel selectedScope={selectedScope} />}
            {activeTab === 'color' && <ColorPalettePanel selectedScope={selectedScope} />}
            {activeTab === 'chapters' && <ChapterDesignPanel selectedScope={selectedScope} />}
            {activeTab === 'page_design' && <PageDesignPanel selectedScope={selectedScope} />}
            {activeTab === 'headers_footers' && <HeaderFooterDesignPanel selectedScope={selectedScope} />}
            {activeTab === 'illustration' && <ArtDirectionPanel selectedScope={selectedScope} />}
            {activeTab === 'characters_env' && <CharactersEnvironmentsPanel />}
            {activeTab === 'comic' && <ComicStylePanel selectedScope={selectedScope} />}
            {activeTab === 'cover' && <CoverDesignerPanel />}
            {activeTab === 'pdf' && <PdfPublishingPanel />}
            {activeTab === 'ai_director' && <AiArtDirectorPanel />}
            {activeTab === 'audit_versions' && <StyleAuditVersioningPanel />}
          </div>
        </main>
      </div>
    </div>
  );
};

// Sub-component: Preset Gallery with Groupings & Instant 1-Click Switcher
const PresetsGalleryPanel: React.FC<{ onSelectTab: (tab: StyleTab) => void }> = ({ onSelectTab }) => {
  const { masterStyle, applyStylePreset, restyleEntireBookAi, isAiGenerating } = useStory();
  const [customRestyleInput, setCustomRestyleInput] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  const groups = ['All', 'Literary & Editorial', 'Illustrated & Painted', 'Comics & Graphic', 'Historical & Decorative', 'Educational & Craft'];

  const filteredPresets = selectedGroup === 'All'
    ? ALL_STYLE_PRESET_OPTIONS
    : ALL_STYLE_PRESET_OPTIONS.filter(p => p.group === selectedGroup);

  return (
    <div className="space-y-6">
      {/* Hero Restyle Callout */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-indigo-900/50">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            Universal AI Book Restyler
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Restyle the Entire Book in One Command
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Change the complete visual, typographic, color, and art direction of the manuscript without altering a single word of your underlying story.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={customRestyleInput}
              onChange={e => setCustomRestyleInput(e.target.value)}
              placeholder="e.g. Turn into a 1960s European illustrated bande dessinée album with rich ochre tones..."
              className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              disabled={isAiGenerating || !customRestyleInput.trim()}
              onClick={() => {
                if (customRestyleInput.trim()) {
                  restyleEntireBookAi(customRestyleInput.trim());
                  setCustomRestyleInput('');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition disabled:opacity-50 shadow-sm shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Restyle Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Filtering Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Master Style Presets (26 Curated Archetypes)
          </h3>
          <p className="text-xs text-slate-500">
            Click any archetype to apply its complete typography, color harmonies, art medium, and chapter architecture.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedGroup === g
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPresets.map(preset => {
          const isCurrent = masterStyle.preset === preset.key;
          const templateData = MASTER_STYLE_PRESETS[preset.key];

          return (
            <div
              key={preset.key}
              onClick={() => applyStylePreset(preset.key)}
              className={`group relative bg-white rounded-xl p-4 border transition cursor-pointer flex flex-col justify-between hover:shadow-md ${
                isCurrent
                  ? 'border-indigo-600 ring-2 ring-indigo-600/20 bg-indigo-50/20 shadow-xs'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {preset.group}
                  </span>
                  {isCurrent && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> ACTIVE
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {preset.label}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {preset.description}
                  </p>
                </div>

                {/* Color Swatch Preview */}
                {templateData?.colorPalette && (
                  <div className="flex items-center gap-1 pt-1">
                    <div className="w-4 h-4 rounded-full border border-slate-200 shadow-2xs" style={{ backgroundColor: templateData.colorPalette.primary }} />
                    <div className="w-4 h-4 rounded-full border border-slate-200 shadow-2xs" style={{ backgroundColor: templateData.colorPalette.accent1 }} />
                    <div className="w-4 h-4 rounded-full border border-slate-200 shadow-2xs" style={{ backgroundColor: templateData.colorPalette.accent2 }} />
                    <div className="w-4 h-4 rounded-full border border-slate-200 shadow-2xs" style={{ backgroundColor: templateData.colorPalette.background }} />
                    <span className="text-[10px] text-slate-400 font-mono ml-1.5">
                      {templateData.pageDesign?.pageSize || '6x9'} • {(templateData.artDirection?.medium || 'Art').replace(/_/g, ' ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className={isCurrent ? 'text-indigo-600' : 'text-slate-500 group-hover:text-indigo-600'}>
                  {isCurrent ? 'Current Master Style' : 'Apply Preset'}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
