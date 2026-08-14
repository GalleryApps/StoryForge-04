import React, { useState, useMemo } from 'react';
import { useStory } from '../../context/StoryContext';
import { FactTier, StoryArchetype } from '../../types';
import {
  BROAD_CATEGORIES,
  BroadCategoryKey,
  GENRE_WORKSPACES,
  GenreWorkspaceProfile,
  GenreMagicTool,
  GenreExerciseDef,
  getWorkspaceForArchetype,
  FactualityLevel,
} from '../../data/genreOntology';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  BookOpen,
  Compass,
  Sliders,
  Flame,
  Search,
  Smile,
  Layers,
  Feather,
  Cpu,
  GraduationCap,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Clock,
  Shapes,
  CheckSquare,
  Wand2,
  Activity,
  Split,
  Eye,
  Table,
  GitBranch,
  RefreshCw,
  Copy,
  ChevronRight,
  BookMarked,
  Upload,
  Palette,
  Layout,
  Type,
  Maximize2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { SatireEscalationPanel } from './specialized/SatireEscalationPanel';
import { MysteryClueMatrixPanel } from './specialized/MysteryClueMatrixPanel';
import { ComicBookStudioPanel } from './specialized/ComicBookStudioPanel';
import { GraphicNovelStudioPanel } from './specialized/GraphicNovelStudioPanel';
import { IllustratedNovelStudioPanel } from './specialized/IllustratedNovelStudioPanel';
import { SciFiSpeculativeStudioPanel } from './specialized/SciFiSpeculativeStudioPanel';
import { EpicFantasyStudioPanel } from './specialized/EpicFantasyStudioPanel';
import { SuspenseThrillerStudioPanel } from './specialized/SuspenseThrillerStudioPanel';
import { HorrorSupernaturalStudioPanel } from './specialized/HorrorSupernaturalStudioPanel';
import { RomanceTensionStudioPanel } from './specialized/RomanceTensionStudioPanel';
import { CraftWritingStudioPanel } from './specialized/CraftWritingStudioPanel';
import { PopScienceStudioPanel } from './specialized/PopScienceStudioPanel';
import { AcademicMonographStudioPanel } from './specialized/AcademicMonographStudioPanel';
import { HandbookRunbookStudioPanel } from './specialized/HandbookRunbookStudioPanel';
import { NarrativeNonfictionStudioPanel } from './specialized/NarrativeNonfictionStudioPanel';
import { ComicSequentialPanel } from './specialized/ComicSequentialPanel';
import { SpeculativeWorldbiblePanel } from './specialized/SpeculativeWorldbiblePanel';
import { DramaticTensionPanel } from './specialized/DramaticTensionPanel';
import { PracticalEsotericStudioPanel } from './specialized/PracticalEsotericStudioPanel';
import { UniversalGenreDilemmaModal } from './specialized/UniversalGenreDilemmaModal';

interface DynamicGenreWorkspaceProps {
  onSwitchToAdvanced: () => void;
  onGenerateBlueprint: () => void;
  isProcessing: boolean;
}

// Icon mapping helper
const ICON_MAP: Record<string, React.FC<any>> = {
  GraduationCap,
  Feather,
  Briefcase,
  BookOpen,
  Microscope: Activity,
  Sparkles,
  Smile,
  Layers,
  BookMarked,
  Shapes,
  Clock,
  CheckSquare,
  Wand2,
  Search,
  Flame,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Eye,
  Split,
  Table,
  GitBranch,
  FileText,
  HelpCircle,
  Activity,
};

export const DynamicGenreWorkspace: React.FC<DynamicGenreWorkspaceProps> = ({
  onSwitchToAdvanced,
  onGenerateBlueprint,
  isProcessing,
}) => {
  const {
    storyInputState,
    setStoryInputState,
    selectedArchetype,
    setSelectedArchetype,
    activeBook,
    setActiveBook,
  } = useStory();

  // Progressive Step state (1: Category, 2: Subgenre & Purpose, 3: Structure & Modules, 4: Magic Tools & Exercises, 5: Visual Style & References, 6: Blueprint Review)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedBroadCategory, setSelectedBroadCategory] = useState<BroadCategoryKey>('academic_scholarly');
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('monograph');

  // Interactive Magic Tool Modal State
  const [activeToolModal, setActiveToolModal] = useState<GenreMagicTool | null>(null);
  const [toolInputPrompt, setToolInputPrompt] = useState<string>('');
  const [toolExecuting, setToolExecuting] = useState<boolean>(false);
  const [toolResultText, setToolResultText] = useState<string | null>(null);

  // Interactive Exercise Modal State
  const [activeExerciseModal, setActiveExerciseModal] = useState<GenreExerciseDef | null>(null);

  // Active Factuality Filter State
  const [selectedFactualityFilter, setSelectedFactualityFilter] = useState<FactualityLevel | 'ALL'>('ALL');

  // Universal Dilemma Modal State
  const [isDilemmaModalOpen, setIsDilemmaModalOpen] = useState<boolean>(false);

  // Resolve current active workspace profile
  const activeWorkspace: GenreWorkspaceProfile = useMemo(() => {
    return GENRE_WORKSPACES[selectedWorkspaceId] || getWorkspaceForArchetype(selectedWorkspaceId, selectedBroadCategory);
  }, [selectedWorkspaceId, selectedBroadCategory]);

  // Handle Category Selection
  const handleSelectBroadCategory = (catKey: BroadCategoryKey) => {
    setSelectedBroadCategory(catKey);
    const catDef = BROAD_CATEGORIES.find(c => c.id === catKey);
    if (catDef) {
      setSelectedWorkspaceId(catDef.defaultWorkspaceId);
      // Map archetype to StoryArchetype
      if (catDef.defaultWorkspaceId === 'monograph') setSelectedArchetype('monograph' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'craft_writing_manual' || catDef.defaultWorkspaceId === 'creative_writing_textbook') setSelectedArchetype('writing_manual' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'handbook') setSelectedArchetype('handbook' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'narrative_nonfiction') setSelectedArchetype('narrative_nonfiction' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'pop_science_wit') setSelectedArchetype('pop_science' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'comic_book' || catDef.defaultWorkspaceId === 'graphic_novel_cinematic' || catDef.defaultWorkspaceId === 'graphic_nonfiction') setSelectedArchetype('graphic_novel' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'satire_comedy' || catDef.defaultWorkspaceId === 'science_humor') setSelectedArchetype('satire' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'mystery_detective') setSelectedArchetype('mystery_thriller' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'science_fiction') setSelectedArchetype('speculative_fiction' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'epic_fantasy') setSelectedArchetype('epic_fantasy' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'suspense_thriller') setSelectedArchetype('mystery_thriller' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'romance_drama') setSelectedArchetype('literary_novel' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'horror_supernatural') setSelectedArchetype('horror' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'illustrated_novel') setSelectedArchetype('illustrated_novel' as StoryArchetype);
      else if (catDef.defaultWorkspaceId === 'trivia_fact_book') setSelectedArchetype('trivia' as StoryArchetype);
      else setSelectedArchetype('monograph' as StoryArchetype);
    }
    setCurrentStep(2);
  };

  // Helper to update a string field safely
  const handleUpdateField = (fieldName: string, value: string) => {
    setStoryInputState(prev => ({
      ...prev,
      [fieldName]: {
        value,
        tier: value.trim() ? ('USER_FACT' as FactTier) : ('UNSPECIFIED' as FactTier),
        isSkipped: false,
      },
    }));
  };

  const getFieldValue = (fieldName: string): string => {
    const field = (storyInputState as any)[fieldName];
    return field?.value || '';
  };

  // Execute Genre Magic Tool with Gemini backend
  const handleExecuteMagicTool = async (tool: GenreMagicTool) => {
    setActiveToolModal(tool);
    setToolExecuting(true);
    setToolResultText(null);

    try {
      const res = await fetch('/api/gemini/genre/execute-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: activeWorkspace.id,
          toolId: tool.id,
          toolName: tool.name,
          actionType: tool.actionType,
          promptTemplate: tool.promptTemplate,
          bookContext: {
            title: activeBook?.title || getFieldValue('coreIdea') || 'Untitled Work',
            broadCategory: activeWorkspace.broadCategory,
            subgenre: activeWorkspace.subgenres[0]?.name,
            coreIdea: getFieldValue('coreIdea'),
            centralThesis: getFieldValue('centralThesis') || getFieldValue('oneSentencePremise'),
            researchQuestion: getFieldValue('researchQuestion'),
            methodology: getFieldValue('methodology'),
            targetAudience: getFieldValue('essayAudience') || activeWorkspace.audiences[0]?.label,
            formData: storyInputState,
          },
          activeInputText: toolInputPrompt || getFieldValue('coreIdea'),
        }),
      });

      if (!res.ok) throw new Error('Tool execution failed');
      const data = await res.json();
      if (data.result?.text) {
        setToolResultText(data.result.text);
      }
    } catch (err: any) {
      console.error('Magic tool error:', err);
      setToolResultText(`Error executing tool: ${err.message || 'Network error'}. Please check your connection and API key.`);
    } finally {
      setToolExecuting(false);
    }
  };

  // Apply visual style presets to active book
  const handleApplyVisualPreset = () => {
    const vt = activeWorkspace.visualTreatment;
    setActiveBook(prev => ({
      ...prev,
      format: (vt.recommendedPageSizes[0] as any) || prev.format,
      globalBible: {
        ...prev.globalBible,
        visualStyleGuide: `${vt.defaultArtMedium} with ${vt.typographyPairing.headingFont} titles and ${vt.recommendedPalette.join(', ')} color palette.`,
        writingStyleGuide: `${activeWorkspace.title} - ${activeWorkspace.tagline}`,
      },
    }));
  };

  // Dynamic icon renderer
  const renderIcon = (iconName: string, className: string = 'w-5 h-5') => {
    const IconComp = ICON_MAP[iconName] || BookOpen;
    return <IconComp className={className} />;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-16">
      {/* TOP HEADER: WORKSPACE BANNER & CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: activeWorkspace.accentColor }}
              >
                {renderIcon(activeWorkspace.iconName, 'w-6 h-6')}
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
                  DYNAMIC GENRE WORKSPACE • {activeWorkspace.broadCategory.replace('_', ' ').toUpperCase()}
                </span>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {activeWorkspace.title}
                </h1>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              {activeWorkspace.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDilemmaModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 transition flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5" />
              Dilemma Chain Engine
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Switch Category
            </button>
            <button
              onClick={onSwitchToAdvanced}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition flex items-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Full 50-Field Schema
            </button>
          </div>
        </div>

        {/* PROGRESS STEPPER */}
        <div className="grid grid-cols-6 gap-2 mt-6 pt-6 border-t border-slate-800/80">
          {[
            { step: 1, label: '1. What Are You Making?' },
            { step: 2, label: '2. Subtype & Purpose' },
            { step: 3, label: '3. Structure & Modules' },
            { step: 4, label: '4. Magic Tools & Drills' },
            { step: 5, label: '5. Visual Style & Assets' },
            { step: 6, label: '6. Blueprint Review' },
          ].map(item => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step)}
              className={`text-left p-2.5 rounded-lg text-xs font-medium transition border ${
                currentStep === item.step
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                  : currentStep > item.step
                  ? 'bg-slate-800/50 text-slate-300 border-slate-700/50'
                  : 'bg-slate-900/30 text-slate-500 border-transparent hover:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {currentStep > item.step ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] shrink-0">
                    {item.step}
                  </span>
                )}
                <span className="truncate">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: WHAT ARE YOU MAKING? (BROAD CATEGORY CARDS) */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              STEP 1 OF 6
            </span>
            <h2 className="text-3xl font-extrabold text-white">What are you making?</h2>
            <p className="text-sm text-slate-400">
              Select your broad publishing category. The entire workspace will immediately adapt its subgenres, structures, exercises, visual templates, and AI tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BROAD_CATEGORIES.map(cat => {
              const isSelected = selectedBroadCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectBroadCategory(cat.id)}
                  className={`group text-left p-6 rounded-2xl border transition duration-200 relative overflow-hidden flex flex-col justify-between h-56 ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500'
                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition group-hover:scale-105"
                        style={{ backgroundColor: cat.accentColor }}
                      >
                        {renderIcon(cat.iconName, 'w-6 h-6')}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
                        {cat.availableWorkspaces.length} Sub-Workspaces
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {cat.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-indigo-400">
                    <span>Enter Workspace</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: SUBTYPES, PURPOSE, & AUDIENCE */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                STEP 2 OF 6
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Select Subgenre & Core Purpose for {activeWorkspace.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Pinpoint the exact subtype and publishing objective to configure the underlying generative engine.
              </p>
            </div>

            {/* MULTI-WORKSPACE SELECTOR (IF CATEGORY HAS MULTIPLE WORKSPACES) */}
            {(() => {
              const catDef = BROAD_CATEGORIES.find(c => c.id === selectedBroadCategory);
              if (catDef && catDef.availableWorkspaces.length > 1) {
                return (
                  <div className="space-y-2 pb-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Choose Specialized Studio Workspace:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {catDef.availableWorkspaces.map(wsId => {
                        const ws = GENRE_WORKSPACES[wsId];
                        if (!ws) return null;
                        const isCurrent = selectedWorkspaceId === wsId;
                        return (
                          <button
                            key={wsId}
                            onClick={() => setSelectedWorkspaceId(wsId)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border flex items-center gap-1.5 ${
                              isCurrent
                                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            {renderIcon(ws.iconName, 'w-3.5 h-3.5')}
                            <span>{ws.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* SUBGENRE SELECTOR TILES */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                1. Specialized Subgenre / Focus Area
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeWorkspace.subgenres.map(sub => {
                  const isSelected = getFieldValue('subgenre') === sub.name || (!getFieldValue('subgenre') && activeWorkspace.subgenres[0].name === sub.name);
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleUpdateField('subgenre', sub.name)}
                      className={`text-left p-4 rounded-xl border transition ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 text-white ring-1 ring-indigo-500'
                          : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{sub.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {sub.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BOOK PURPOSE SELECTOR */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                2. Primary Publishing Purpose
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeWorkspace.purposes.map(purp => {
                  const isSelected = getFieldValue('bookPurpose') === purp.label || (!getFieldValue('bookPurpose') && activeWorkspace.purposes[0].label === purp.label);
                  return (
                    <button
                      key={purp.id}
                      onClick={() => handleUpdateField('bookPurpose', purp.label)}
                      className={`text-left p-3.5 rounded-xl border transition ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 text-white ring-1 ring-indigo-500'
                          : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="text-sm font-semibold text-white">{purp.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{purp.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TARGET AUDIENCE SELECTOR */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                3. Target Readership
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeWorkspace.audiences.map(aud => {
                  const isSelected = getFieldValue('targetAudience') === aud.label || (!getFieldValue('targetAudience') && activeWorkspace.audiences[0].label === aud.label);
                  return (
                    <button
                      key={aud.id}
                      onClick={() => handleUpdateField('targetAudience', aud.label)}
                      className={`text-left p-3.5 rounded-xl border transition ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 text-white ring-1 ring-indigo-500'
                          : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="text-sm font-semibold text-white">{aud.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{aud.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CORE IDEA / THESIS INPUT */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                4. Core Premise / Central Thesis / Subject
              </label>
              <textarea
                value={getFieldValue('coreIdea')}
                onChange={e => handleUpdateField('coreIdea', e.target.value)}
                placeholder={`Describe the core concept of your ${activeWorkspace.title.toLowerCase()}...`}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* DEDICATED GENRE-SPECIFIC STUDIO PANELS */}
          {activeWorkspace.id === 'satire_comedy' && (
            <SatireEscalationPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'mystery_detective' && (
            <MysteryClueMatrixPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'comic_book' && (
            <ComicBookStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'graphic_novel_cinematic' && (
            <GraphicNovelStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'illustrated_novel' && (
            <IllustratedNovelStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'science_fiction' && (
            <SciFiSpeculativeStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'epic_fantasy' && (
            <EpicFantasyStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'suspense_thriller' && (
            <SuspenseThrillerStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'horror_supernatural' && (
            <HorrorSupernaturalStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'romance_drama' && (
            <RomanceTensionStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {(activeWorkspace.id === 'craft_writing_manual' ||
            activeWorkspace.id === 'creative_writing_textbook' ||
            activeWorkspace.id === 'fiction_workshop') && (
            <CraftWritingStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {activeWorkspace.id === 'practical_esoteric_textbook' && (
            <PracticalEsotericStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {(activeWorkspace.id === 'pop_science_wit' || activeWorkspace.id === 'gross_science') && (
            <PopScienceStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {(activeWorkspace.id === 'monograph' ||
            activeWorkspace.id === 'scholarly_history' ||
            activeWorkspace.id === 'skeptical_expose') && (
            <AcademicMonographStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {(activeWorkspace.id === 'handbook' || activeWorkspace.id === 'practical_reference') && (
            <HandbookRunbookStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          {(activeWorkspace.id === 'narrative_nonfiction' || activeWorkspace.id === 'biography_memoir') && (
            <NarrativeNonfictionStudioPanel
              onExecuteTool={handleExecuteMagicTool}
              onOpenDilemmaModal={() => setIsDilemmaModalOpen(true)}
            />
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Categories
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              Next: Structure & Modules <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: CONTENT STRUCTURE & SPECIALIZED MODULES */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                STEP 3 OF 6
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Chapter Architecture & Content Modules for {activeWorkspace.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {activeWorkspace.structuralTemplate.name}: {activeWorkspace.structuralTemplate.description}
              </p>
            </div>

            {/* DEFAULT CHAPTER ARCHITECTURE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Recommended Chapter Sequence ({activeWorkspace.structuralTemplate.defaultChapters.length} Sections)
                </label>
                <span className="text-xs text-indigo-400 font-mono">Auto-Configured for {activeWorkspace.title}</span>
              </div>

              <div className="space-y-2">
                {activeWorkspace.structuralTemplate.defaultChapters.map(chap => (
                  <div
                    key={chap.number}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 font-mono">
                        {chap.number}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">{chap.title}</div>
                        <div className="text-xs text-slate-400">{chap.description}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 shrink-0">
                      {chap.sectionRole}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTENT MODULES TOGGLE */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Active Content Modules & Layout Components
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeWorkspace.contentModules.map(mod => (
                  <div
                    key={mod.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-200">{mod.name}</span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {mod.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{mod.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FACTUALITY GUARDRAIL BANNER */}
            {activeWorkspace.factualityGuardrail.enabled && (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" /> Factuality Guardrail System Active
                  </div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Mode: {activeWorkspace.factualityGuardrail.mode}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {activeWorkspace.factualityGuardrail.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeWorkspace.factualityGuardrail.badges.map(b => (
                    <span
                      key={b.key}
                      className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Purpose
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              Next: Magic AI Tools & Drills <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: GENRE-SPECIFIC MAGIC TOOLS & EXERCISES */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                STEP 4 OF 6
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Dedicated AI Magic Tools & Craft Drills for {activeWorkspace.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Every genre has its own specialized interactive AI tools. Click any button to run live domain actions with Gemini.
              </p>
            </div>

            {/* MAGIC TOOLS GRID */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Genre "Magic Action Buttons"
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeWorkspace.magicTools.map(tool => (
                  <div
                    key={tool.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-indigo-400">{renderIcon(tool.iconName, 'w-4 h-4')}</div>
                          <h4 className="text-sm font-bold text-white">{tool.name}</h4>
                        </div>
                        {tool.badge && (
                          <span className="text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleExecuteMagicTool(tool)}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 transition flex items-center justify-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {tool.buttonLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* INNOVATIVE EXERCISES SECTION */}
            {activeWorkspace.exercises.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Innovative Genre Craft Drills
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeWorkspace.exercises.map(ex => (
                    <div
                      key={ex.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                          {ex.type.toUpperCase()} • {ex.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{ex.title}</h4>
                      <p className="text-xs text-slate-400">{ex.description}</p>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                        {ex.starterPrompt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Structure
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              Next: Visual Style & Assets <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: GENRE-SPECIFIC VISUAL STYLE & REFERENCES */}
      {/* ========================================================================= */}
      {currentStep === 5 && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                STEP 5 OF 6
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Visual Treatment & Style Guidance for {activeWorkspace.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                The visual style guide, typography, and reference upload recommendations automatically adapt to your book archetype.
              </p>
            </div>

            {/* VISUAL PRESETS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TYPOGRAPHY & LAYOUT */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  <Type className="w-4 h-4" /> Recommended Typographic Hierarchy
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-500 font-mono">Headings Font</div>
                    <div className="text-lg font-bold text-white">
                      {activeWorkspace.visualTreatment.typographyPairing.headingFont}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-500 font-mono">Body & Content Font</div>
                    <div className="text-sm font-medium text-slate-200">
                      {activeWorkspace.visualTreatment.typographyPairing.bodyFont}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 pt-1">
                    {activeWorkspace.visualTreatment.typographyPairing.description}
                  </p>
                </div>
              </div>

              {/* COLOR PALETTE & PAGE SIZES */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  <Palette className="w-4 h-4" /> Coordinated Color Palette & Formats
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 font-mono mb-2">Recommended Palette Swatches</div>
                    <div className="flex items-center gap-2">
                      {activeWorkspace.visualTreatment.recommendedPalette.map((hex, i) => (
                        <div
                          key={i}
                          className="h-10 flex-1 rounded-lg border border-slate-700 shadow-inner flex items-end p-1"
                          style={{ backgroundColor: hex }}
                        >
                          <span className="text-[9px] font-mono text-white/80 bg-black/60 px-1 rounded">
                            {hex}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 font-mono mb-1.5">Standard Page Formats</div>
                    <div className="flex gap-2">
                      {activeWorkspace.visualTreatment.recommendedPageSizes.map(size => (
                        <span
                          key={size}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* REFERENCE UPLOAD GUIDANCE */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Upload className="w-4 h-4" /> Genre-Specific Visual Asset Guide
              </div>
              <p className="text-xs text-slate-300">
                {activeWorkspace.visualTreatment.referenceGuideNote}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                {activeWorkspace.visualTreatment.referenceUploadTypes.map((refType, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{refType}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ADOPT PRESET BUTTON */}
            <button
              onClick={handleApplyVisualPreset}
              className="w-full py-3 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/50 text-indigo-200 text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              Apply {activeWorkspace.title} Visual Master Style to Book Settings
            </button>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Magic Tools
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              Next: Review & Generate <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: BLUEPRINT REVIEW & GENERATION */}
      {/* ========================================================================= */}
      {currentStep === 6 && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                FINAL STEP • READY FOR SYNTHESIS
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Synthesize & Build Your {activeWorkspace.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Your customized genre workspace configuration is complete. Review your core parameters and generate the full 11-point Master Blueprint.
              </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-500 font-mono">Archetype & Subtype</div>
                <div className="text-sm font-bold text-white mt-1">{activeWorkspace.title}</div>
                <div className="text-xs text-indigo-400 mt-0.5">{getFieldValue('subgenre') || activeWorkspace.subgenres[0]?.name}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-500 font-mono">Purpose & Audience</div>
                <div className="text-sm font-bold text-white mt-1">{getFieldValue('bookPurpose') || activeWorkspace.purposes[0]?.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{getFieldValue('targetAudience') || activeWorkspace.audiences[0]?.label}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-500 font-mono">Structure & Chapters</div>
                <div className="text-sm font-bold text-white mt-1">{activeWorkspace.structuralTemplate.defaultChapters.length} Chapters</div>
                <div className="text-xs text-emerald-400 mt-0.5">SOP & Module Linked</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-500 font-mono">Core Premise & Thesis</div>
              <p className="text-sm text-slate-200 font-medium">
                {getFieldValue('coreIdea') || 'No core idea entered yet. The AI orchestrator will extrapolate an exemplar concept.'}
              </p>
            </div>

            {/* ACTION BUTTON */}
            <div className="pt-4">
              <button
                onClick={onGenerateBlueprint}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Synthesizing Domain Architecture...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Build {activeWorkspace.title} Blueprint
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-start">
            <button
              onClick={() => setCurrentStep(5)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Visual Style
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MAGIC TOOL OUTPUT MODAL */}
      {/* ========================================================================= */}
      {activeToolModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* MODAL HEADER */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  {renderIcon(activeToolModal.iconName, 'w-5 h-5')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{activeToolModal.name}</h3>
                  <p className="text-xs text-slate-400">{activeToolModal.description}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveToolModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Input / Focus Context for this Tool:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={toolInputPrompt}
                    onChange={e => setToolInputPrompt(e.target.value)}
                    placeholder="Enter specific claim, chapter topic, or scenario (optional)..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleExecuteMagicTool(activeToolModal)}
                    disabled={toolExecuting}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {toolExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                    Run AI Tool
                  </button>
                </div>
              </div>

              {toolExecuting && (
                <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3 text-center">
                  <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                  <p className="text-sm font-semibold text-white">Running {activeToolModal.name} with Gemini...</p>
                  <p className="text-xs text-slate-500">Applying domain-specific heuristics and stress tests.</p>
                </div>
              )}

              {toolResultText && !toolExecuting && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Output Generated
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(toolResultText)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
                    >
                      <Copy className="w-3 h-3" /> Copy Result
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                    {toolResultText}
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-950/80">
              <button
                onClick={() => setActiveToolModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIVERSAL GENRE DILEMMA MODAL */}
      <UniversalGenreDilemmaModal
        workspace={activeWorkspace}
        isOpen={isDilemmaModalOpen}
        onClose={() => setIsDilemmaModalOpen(false)}
        bookContext={{
          title: activeBook?.title || getFieldValue('coreIdea') || 'Untitled Book',
          coreIdea: getFieldValue('coreIdea') || 'Dynamic book premise and stakes',
          subgenre: getFieldValue('subgenre') || activeWorkspace.subgenres[0]?.name,
        }}
      />
    </div>
  );
};
