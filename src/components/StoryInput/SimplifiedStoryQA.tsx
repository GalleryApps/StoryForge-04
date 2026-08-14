import React, { useState, useMemo } from 'react';
import { useStory } from '../../context/StoryContext';
import { StoryArchetype, FactTier } from '../../types';
import { DynamicGenreWorkspace } from './DynamicGenreWorkspace';
import {
  resolveEffectiveGenreConfig,
  ALL_ADAPTIVE_GENRES,
  AVAILABLE_ADAPTIVE_LAYERS,
  AdaptiveStoryLayerId,
} from '../../data/genreFieldMatrix';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  Shuffle,
  BookOpen,
  Compass,
  Sliders,
  Flame,
  Search,
  Smile,
  Layers,
  Feather,
  Cpu,
  Ghost,
  Heart,
  CheckCircle2,
  Wand2,
  GraduationCap,
  Wrench,
  HelpCircle,
  Info,
  ShieldCheck,
  X,
  FileText,
  LayoutGrid,
} from 'lucide-react';

interface SimplifiedStoryQAProps {
  onSwitchToAdvanced: () => void;
  onGenerateBlueprint: () => void;
  isProcessing: boolean;
}

type GenreCategoryFilter = 'all' | 'fiction' | 'visual_sequential' | 'scholarly_nonfiction' | 'practical_reference';
type WorkspaceUIMode = 'ontology_workspace' | 'adaptive_qa';

export const SimplifiedStoryQA: React.FC<SimplifiedStoryQAProps> = ({
  onSwitchToAdvanced,
  onGenerateBlueprint,
  isProcessing,
}) => {
  const {
    storyInputState,
    setStoryInputState,
    selectedArchetype,
    setSelectedArchetype,
  } = useStory();

  const [uiMode, setUiMode] = useState<WorkspaceUIMode>('ontology_workspace');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<GenreCategoryFilter>('all');
  const [isAiSuggesting, setIsAiSuggesting] = useState<string | null>(null);
  const [showSecondarySelect, setShowSecondarySelect] = useState<boolean>(false);
  const [activeLayerDrawer, setActiveLayerDrawer] = useState<boolean>(false);

  // If in ontology workspace mode, render the full dynamic genre workspace!
  if (uiMode === 'ontology_workspace') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-2.5 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300">Creation Mode:</span>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-0.5 rounded-md">
              Dynamic Genre Workspace (Ontology Engine)
            </span>
          </div>
          <button
            onClick={() => setUiMode('adaptive_qa')}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            Switch to Step-by-Step Questionnaire
          </button>
        </div>
        <DynamicGenreWorkspace
          onSwitchToAdvanced={onSwitchToAdvanced}
          onGenerateBlueprint={onGenerateBlueprint}
          isProcessing={isProcessing}
        />
      </div>
    );
  }

  // Compute active effective genre configuration based on selected archetype, secondary hybrid, and active layers
  const effectiveConfig = useMemo(() => {
    return resolveEffectiveGenreConfig(
      selectedArchetype,
      storyInputState.secondaryArchetype,
      (storyInputState.enabledLayers as AdaptiveStoryLayerId[]) || []
    );
  }, [selectedArchetype, storyInputState.secondaryArchetype, storyInputState.enabledLayers]);

  const primary = effectiveConfig.primary;

  // Helper to safely update a field in storyInputState as a canonical USER_FACT
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

  // Helper to get raw string value of a field
  const getFieldValue = (fieldName: string): string => {
    const field = (storyInputState as any)[fieldName];
    return field?.value || '';
  };

  // Helper to toggle a dynamic feature layer
  const toggleDynamicLayer = (layerId: AdaptiveStoryLayerId) => {
    const currentLayers = (storyInputState.enabledLayers as AdaptiveStoryLayerId[]) || [];
    const exists = currentLayers.includes(layerId);
    const updated = exists
      ? currentLayers.filter(id => id !== layerId)
      : [...currentLayers, layerId];

    setStoryInputState(prev => ({
      ...prev,
      enabledLayers: updated,
    }));
  };

  // Set secondary hybrid archetype
  const handleSetSecondaryArchetype = (arch: StoryArchetype | null) => {
    setStoryInputState(prev => ({
      ...prev,
      secondaryArchetype: arch,
    }));
    setShowSecondarySelect(false);
  };

  // AI Field Suggestion caller
  const handleAiSuggest = async (fieldName: string, fieldLabel: string) => {
    setIsAiSuggesting(fieldName);
    try {
      const res = await fetch('/api/gemini/story-input/suggest-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: storyInputState,
          archetype: selectedArchetype,
          fieldName,
          fieldLabel,
        }),
      });

      if (!res.ok) throw new Error('Suggestion failed');
      const data = await res.json();
      if (data.data?.bestSuggestion) {
        handleUpdateField(fieldName, data.data.bestSuggestion);
      } else if (data.suggestion) {
        handleUpdateField(fieldName, data.suggestion);
      }
    } catch (err: any) {
      console.warn('AI suggestion error:', err);
    } finally {
      setIsAiSuggesting(null);
    }
  };

  // Surprise Me caller
  const handleSurpriseMe = async () => {
    setIsAiSuggesting('surprise');
    try {
      const res = await fetch('/api/gemini/story-input/surprise-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archetype: selectedArchetype }),
      });
      if (!res.ok) throw new Error('Surprise Me failed');
      const responseData = await res.json();
      if (responseData.data?.formData) {
        setStoryInputState(prev => ({
          ...prev,
          ...responseData.data.formData,
        }));
      }
    } catch (err: any) {
      console.warn('Surprise Me error:', err);
    } finally {
      setIsAiSuggesting(null);
    }
  };

  // Helper icon lookup
  const getArchetypeIcon = (archId: StoryArchetype) => {
    switch (archId) {
      case 'monograph':
      case 'textbook':
        return GraduationCap;
      case 'handbook':
        return Wrench;
      case 'trivia':
        return HelpCircle;
      case 'pop_science':
        return Sparkles;
      case 'satire':
      case 'dark_comedy':
        return Smile;
      case 'mystery':
        return Search;
      case 'comic':
        return Zap;
      case 'graphic_novel':
        return Layers;
      case 'sci_fi':
        return Cpu;
      case 'fantasy':
      case 'adventure':
        return Compass;
      case 'thriller':
        return Flame;
      case 'writing_manual':
      case 'dilemma_workshop':
        return Feather;
      case 'romance':
        return Heart;
      case 'horror':
        return Ghost;
      case 'biography':
      case 'narrative_nonfiction':
      case 'historical_fiction':
        return FileText;
      case 'illustrated_novel':
      default:
        return BookOpen;
    }
  };

  // Filtered archetypes list
  const filteredArchetypes = useMemo(() => {
    const list = Object.values(ALL_ADAPTIVE_GENRES);
    if (categoryFilter === 'all') return list;
    return list.filter(a => a.category === categoryFilter);
  }, [categoryFilter]);

  // Dynamic step titles based on the effective genre configuration
  const steps = [
    {
      num: 1,
      title: 'Format & Genre',
      subtitle: `Configuring for ${effectiveConfig.combinedName}`,
    },
    {
      num: 2,
      title: primary.coreIdea.label,
      subtitle: primary.coreIdea.subtitle,
    },
    {
      num: 3,
      title:
        effectiveConfig.characterRelevance === 'character_irrelevant'
          ? 'Structure & Subject'
          : primary.characterSection.nameLabel,
      subtitle:
        effectiveConfig.characterRelevance === 'character_irrelevant'
          ? 'Concept & Scope Definition'
          : primary.characterSection.sublabel,
    },
    {
      num: 4,
      title: primary.problemSection.visible
        ? primary.problemSection.obstacleLabel
        : 'Key Challenge & Stakes',
      subtitle: primary.problemSection.visible
        ? primary.problemSection.stakesLabel
        : 'Scale of impact and failure costs',
    },
    {
      num: 5,
      title: 'Tone & Style',
      subtitle: 'Voice, register, and outcome resolution',
    },
    {
      num: 6,
      title: primary.specializedSection.title,
      subtitle: primary.specializedSection.subtitle,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-[11px] uppercase tracking-wider border border-indigo-100 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              Adaptive Book & Story Builder
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px] flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-slate-500" />
              {effectiveConfig.combinedName}
            </span>
            {storyInputState.secondaryArchetype && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium text-[11px] border border-purple-100 flex items-center gap-1">
                <Layers className="w-3 h-3 text-purple-600" />
                Hybrid: {ALL_ADAPTIVE_GENRES[storyInputState.secondaryArchetype]?.name}
              </span>
            )}
            <span className="text-xs text-slate-400 font-medium ml-auto md:ml-0">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-xs text-slate-500">
            {steps[currentStep - 1].subtitle} — Dynamic schema adapted to{' '}
            <span className="font-semibold text-slate-700">{effectiveConfig.combinedName}</span>.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setUiMode('ontology_workspace')}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 flex items-center gap-1.5 transition"
            title="Switch to full Dynamic Genre Workspace (Ontology Engine)"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
            <span>Genre Workspace</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveLayerDrawer(!activeLayerDrawer)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
              (storyInputState.enabledLayers as string[])?.length
                ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Add dynamic feature layers (e.g. Clues, Visual Panels, SOP Checklists, Character Arcs)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>
              Layers{' '}
              {(storyInputState.enabledLayers as string[])?.length
                ? `(${(storyInputState.enabledLayers as string[]).length})`
                : ''}
            </span>
          </button>

          <button
            type="button"
            onClick={onSwitchToAdvanced}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-2 transition"
            title="Switch to full 50-field granular editor, power tools, and deep architecture"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Advanced Studio</span>
          </button>
        </div>
      </div>

      {/* Dynamic Layer Drawer (Optional extra layers) */}
      {activeLayerDrawer && (
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 space-y-3 transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                Dynamic Feature Layers & Hybrid Expansions
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setActiveLayerDrawer(false)}
              className="text-purple-700 hover:text-purple-950 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-purple-800">
            Enrich your book with cross-genre modules without changing your primary layout.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
            {AVAILABLE_ADAPTIVE_LAYERS.map(layer => {
              const isEnabled = (
                (storyInputState.enabledLayers as AdaptiveStoryLayerId[]) || []
              ).includes(layer.id);
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => toggleDynamicLayer(layer.id)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                    isEnabled
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-white text-slate-700 border-purple-200 hover:border-purple-300'
                  }`}
                >
                  <Layers
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      isEnabled ? 'text-white' : 'text-purple-600'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold">{layer.name}</span>
                      {isEnabled && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        isEnabled ? 'text-purple-100' : 'text-slate-500'
                      }`}
                    >
                      {layer.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* "Hidden but Preserved" Safety Badge */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border border-slate-200/70 rounded-xl text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            <strong>Adaptive Engine Active:</strong> Irrelevant fields are safely hidden. Stored data is 100% preserved across genre switches.
          </span>
        </div>
        <button
          type="button"
          onClick={onSwitchToAdvanced}
          className="text-indigo-600 hover:text-indigo-800 font-semibold underline text-[11px]"
        >
          View Master Schema
        </button>
      </div>

      {/* Step Stepper Progress Bar */}
      <div className="grid grid-cols-6 gap-2 bg-slate-200/60 p-1.5 rounded-xl">
        {steps.map(s => {
          const isDone = s.num < currentStep;
          const isCurrent = s.num === currentStep;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition text-center truncate ${
                isCurrent
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isDone
                  ? 'bg-white text-indigo-700 border border-indigo-100'
                  : 'text-slate-500 hover:bg-white/50'
              }`}
            >
              {isDone ? (
                <Check className="w-3 h-3 shrink-0 text-emerald-600" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-black/10 text-[10px] flex items-center justify-center shrink-0">
                  {s.num}
                </span>
              )}
              <span className="hidden sm:inline truncate">{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Step Content Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 min-h-[420px] flex flex-col justify-between">
        {/* STEP 1: FORMAT & GENRE MATRIX */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  What kind of book or story are you creating?
                </h3>
                <p className="text-xs text-slate-500">
                  Select your primary format. The interface, memory rules, and field visibility will adapt automatically.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 overflow-x-auto">
                {[
                  { id: 'all', label: 'All Formats' },
                  { id: 'fiction', label: 'Fiction & Story' },
                  { id: 'visual_sequential', label: 'Visual & Graphic' },
                  { id: 'scholarly_nonfiction', label: 'Scholarly & Research' },
                  { id: 'practical_reference', label: 'Practical & Guide' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id as GenreCategoryFilter)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                      categoryFilter === cat.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Archetypes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              {filteredArchetypes.map(arch => {
                const Icon = getArchetypeIcon(arch.id);
                const isSelected = selectedArchetype === arch.id;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => {
                      setSelectedArchetype(arch.id);
                    }}
                    className={`p-4 rounded-xl border text-left transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{arch.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {arch.description}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                        {arch.category.replace('_', ' ').toUpperCase()}
                      </span>
                      {arch.characterRelevance === 'character_irrelevant' ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-100">
                          Concept-Driven
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-100">
                          Character-Driven
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Secondary Hybrid Genre Selector */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Optional: Hybrid Secondary Genre Blend
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Mix storytelling patterns (e.g. Science Fiction + Mystery, or Monograph + Graphic Novel).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSecondarySelect(!showSecondarySelect)}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg"
                >
                  {storyInputState.secondaryArchetype
                    ? 'Change Secondary'
                    : '+ Add Hybrid Secondary'}
                </button>
              </div>

              {showSecondarySelect && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleSetSecondaryArchetype(null)}
                    className={`p-2 rounded-lg text-xs text-center border font-medium ${
                      !storyInputState.secondaryArchetype
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    None (Pure {primary.name})
                  </button>
                  {Object.values(ALL_ADAPTIVE_GENRES)
                    .filter(a => a.id !== selectedArchetype)
                    .map(a => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => handleSetSecondaryArchetype(a.id)}
                        className={`p-2 rounded-lg text-xs text-center border font-medium ${
                          storyInputState.secondaryArchetype === a.id
                            ? 'bg-purple-50 border-purple-500 text-purple-700 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        + {a.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: ADAPTIVE CORE SPARK */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {primary.coreIdea.label}
                </h3>
                <p className="text-xs text-slate-500">
                  {primary.coreIdea.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSurpriseMe}
                disabled={isAiSuggesting === 'surprise'}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {isAiSuggesting === 'surprise' ? 'Architecting...' : 'Surprise Me'}
                </span>
              </button>
            </div>

            {/* Adaptive Core Idea / Premise Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">
                  {primary.coreIdea.label}
                </label>
                <button
                  type="button"
                  onClick={() =>
                    handleAiSuggest('coreIdea', primary.coreIdea.label)
                  }
                  disabled={isAiSuggesting === 'coreIdea'}
                  className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Wand2 className="w-3 h-3" />
                  <span>Suggest with AI</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={getFieldValue('coreIdea')}
                onChange={e => handleUpdateField('coreIdea', e.target.value)}
                placeholder={primary.coreIdea.placeholder}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* Quick Spark Presets Tailored to Genre */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Or click an idea spark to initialize:
              </span>
              <div className="space-y-1.5">
                {primary.coreIdea.sparkPrompts.map((spark, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleUpdateField('coreIdea', spark)}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-xs text-slate-700 transition flex items-start gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{spark}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ADAPTIVE PRIMARY SUBJECT / CHARACTER */}
        {currentStep === 3 && (
          <div className="space-y-4">
            {effectiveConfig.characterRelevance === 'character_irrelevant' ? (
              <div className="space-y-4">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Concept-Driven Book Format
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {primary.name} is <strong>concept-, reference-, or procedure-driven</strong>. Character architecture (Protagonist flaws, wants, needs) is hidden by default to keep your workflow clear and uncluttered.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => toggleDynamicLayer('narrative_layer')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                        ((storyInputState.enabledLayers as AdaptiveStoryLayerId[]) || []).includes(
                          'narrative_layer'
                        )
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>
                        {((storyInputState.enabledLayers as AdaptiveStoryLayerId[]) || []).includes(
                          'narrative_layer'
                        )
                          ? 'Narrative Layer Active'
                          : '+ Enable Narrative & Character Layer'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* If Narrative layer was enabled, show character fields */}
                {((storyInputState.enabledLayers as AdaptiveStoryLayerId[]) || []).includes(
                  'narrative_layer'
                ) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Historical / Case Study Figure
                      </label>
                      <input
                        type="text"
                        value={getFieldValue('protagonistName')}
                        onChange={e => handleUpdateField('protagonistName', e.target.value)}
                        placeholder="e.g. John Harrison, Horologist"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Primary Inquiry / Goal
                      </label>
                      <input
                        type="text"
                        value={getFieldValue('protagonistWant')}
                        onChange={e => handleUpdateField('protagonistWant', e.target.value)}
                        placeholder="e.g. Prove mechanical accuracy under equatorial heat"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {primary.characterSection.label}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {primary.characterSection.sublabel}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Protagonist Name / Central Figure */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        {primary.characterSection.nameLabel}
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          handleAiSuggest(
                            'protagonistName',
                            primary.characterSection.nameLabel
                          )
                        }
                        disabled={isAiSuggesting === 'protagonistName'}
                        className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Suggest</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={getFieldValue('protagonistName')}
                      onChange={e => handleUpdateField('protagonistName', e.target.value)}
                      placeholder={primary.characterSection.namePlaceholder}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  {/* External Goal */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        {primary.characterSection.goalLabel}
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          handleAiSuggest(
                            'protagonistWant',
                            primary.characterSection.goalLabel
                          )
                        }
                        disabled={isAiSuggesting === 'protagonistWant'}
                        className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Suggest</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={getFieldValue('protagonistWant')}
                      onChange={e => handleUpdateField('protagonistWant', e.target.value)}
                      placeholder={primary.characterSection.goalPlaceholder}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  {/* Internal Need / Fatal Flaw */}
                  <div className="space-y-1.5 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        {primary.characterSection.internalNeedLabel}
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          handleAiSuggest(
                            'protagonistNeed',
                            primary.characterSection.internalNeedLabel
                          )
                        }
                        disabled={isAiSuggesting === 'protagonistNeed'}
                        className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Suggest</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={getFieldValue('protagonistNeed')}
                      onChange={e => handleUpdateField('protagonistNeed', e.target.value)}
                      placeholder={primary.characterSection.internalNeedPlaceholder}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: ADAPTIVE PROBLEM, CONFLICT & STAKES */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {primary.problemSection.obstacleLabel}
              </h3>
              <p className="text-xs text-slate-500">
                {primary.problemSection.stakesLabel}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Obstacle / Central Friction */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    {primary.problemSection.obstacleLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleAiSuggest(
                        'primaryObstacle',
                        primary.problemSection.obstacleLabel
                      )
                    }
                    disabled={isAiSuggesting === 'primaryObstacle'}
                    className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Suggest</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={getFieldValue('primaryObstacle')}
                  onChange={e => handleUpdateField('primaryObstacle', e.target.value)}
                  placeholder={primary.problemSection.obstaclePlaceholder}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* The Stakes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    {primary.problemSection.stakesLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleAiSuggest('stakes', primary.problemSection.stakesLabel)
                    }
                    disabled={isAiSuggesting === 'stakes'}
                    className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Suggest</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={getFieldValue('stakes')}
                  onChange={e => handleUpdateField('stakes', e.target.value)}
                  placeholder={primary.problemSection.stakesPlaceholder}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Quick Stakes Presets Tailored to Genre */}
              {primary.problemSection.presetStakesOptions && (
                <div className="md:col-span-2 space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Quick Stakes Ideas ({primary.name}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {primary.problemSection.presetStakesOptions.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleUpdateField('stakes', s)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 transition"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: ADAPTIVE TONE & STYLE */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Tone, Register & Resolution Model
              </h3>
              <p className="text-xs text-slate-500">
                Establish the stylistic attitude, analytical voice, and concluding framework.
              </p>
            </div>

            <div className="space-y-4">
              {/* Tone Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Narrative / Pedagogical Tone
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {[
                    'Rigorous & Analytical',
                    'Witty, Dry & Satirical',
                    'Atmospheric & Literary',
                    'Fast-Paced & Kinetic',
                    'Direct & Actionable',
                    'Luminous & Thoughtful',
                    'Dark & Psychological',
                    'Whimsical & Playful',
                  ].map((tone, idx) => {
                    const isSelected = getFieldValue('tone') === tone;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleUpdateField('tone', tone)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {tone}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ending / Outcome Resolution Tailored to Genre */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {primary.outcomeSection.title}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {primary.outcomeSection.resolutionOptions.map((ending, idx) => {
                    const isSelected = getFieldValue('endingPreference') === ending.label;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleUpdateField('endingPreference', ending.label)}
                        className={`p-3 rounded-xl border text-left transition ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <h5 className="text-xs font-bold text-slate-900">{ending.label}</h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">{ending.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SPECIALIZED GENRE ENGINE */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {primary.specializedSection.title}
              </h3>
              <p className="text-xs text-slate-500">
                {primary.specializedSection.subtitle}
              </p>
            </div>

            {/* Specialized Fields for this Genre */}
            <div className="space-y-4">
              {/* Primary Specialized Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 block">
                    {primary.specializedSection.label}
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleAiSuggest(
                        primary.specializedSection.fieldKey,
                        primary.specializedSection.label
                      )
                    }
                    disabled={isAiSuggesting === primary.specializedSection.fieldKey}
                    className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Suggest</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={getFieldValue(primary.specializedSection.fieldKey)}
                  onChange={e =>
                    handleUpdateField(
                      primary.specializedSection.fieldKey,
                      e.target.value
                    )
                  }
                  placeholder={primary.specializedSection.placeholder}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Multi-option select buttons if available */}
              {primary.specializedSection.multiOptions &&
                primary.specializedSection.multiOptions.map(mOpt => {
                  const currentValue =
                    (storyInputState as any)[mOpt.key] || mOpt.choices[0];
                  return (
                    <div key={mOpt.key} className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        {mOpt.label}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {mOpt.choices.map(choice => (
                          <button
                            key={choice}
                            type="button"
                            onClick={() =>
                              setStoryInputState(prev => ({
                                ...prev,
                                [mOpt.key]: choice,
                              }))
                            }
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                              currentValue === choice
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

              {/* Ready to synthesize banner */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2 mt-4">
                <div className="flex items-center gap-2 font-bold text-xs text-indigo-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Ready to Synthesize {effectiveConfig.combinedName} Master Blueprint
                  </span>
                </div>
                <p className="text-[11px] text-indigo-900 leading-relaxed">
                  Clicking below will construct your <strong>11-Point Master Blueprint</strong> tailored to {effectiveConfig.combinedName}, locking all established facts, structuring chapter architecture, and opening the full deep-editing studio.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3 mt-6">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onSwitchToAdvanced}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium underline"
              >
                Skip to Full Studio
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onGenerateBlueprint}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>{isProcessing ? 'Synthesizing...' : 'GENERATE MASTER BLUEPRINT'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
