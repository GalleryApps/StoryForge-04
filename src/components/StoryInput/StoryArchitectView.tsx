import React, { useState } from 'react';
import { useStory } from '../../context/StoryContext';
import { UniversalStoryForm } from './UniversalStoryForm';
import { GenreSpecializedForms } from './GenreSpecializedForms';
import { StoryBlueprintViewer } from './StoryBlueprintViewer';
import { NarrativePowerToolsModal } from './NarrativePowerToolsModal';
import { TemplateManagerModal } from './TemplateManagerModal';
import { SimplifiedStoryQA } from './SimplifiedStoryQA';
import { StoryArchetype, FactTier, StoryBlueprint } from '../../types';
import { getInitialFormData } from '../../data/storyInputDefaults';
import {
  Sparkles,
  Zap,
  Flame,
  ShieldAlert,
  HelpCircle,
  Bookmark,
  Shuffle,
  Compass,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Sliders,
  FileText,
  BookOpen,
  ChevronRight,
  Lock,
  MessageSquare,
} from 'lucide-react';

export const StoryArchitectView: React.FC = () => {
  const {
    storyInputState,
    setStoryInputState,
    selectedArchetype,
    setSelectedArchetype,
    activeStoryBlueprint,
    setActiveStoryBlueprint,
    savedStoryTemplates,
    saveStoryTemplate,
    loadStoryTemplate,
    deleteStoryTemplate,
    applyBlueprintToBook,
    setActiveView,
  } = useStory();

  // Mode: 'qa' (Simplified conversational Q&A) or 'advanced' (Granular 50-field editable studio)
  const [architectMode, setArchitectMode] = useState<'qa' | 'advanced'>('qa');
  const [activeFormSection, setActiveFormSection] = useState<'universal' | 'specialized' | 'blueprint'>('universal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activePowerTool, setActivePowerTool] = useState<'make-richer' | 'make-harder' | 'what-could-go-wrong' | 'novelists-room' | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Calculate fact counts for the status pill
  const calculateFactCounts = () => {
    let userFacts = 0;
    let aiSuggestions = 0;
    let skipped = 0;

    const checkField = (f: any) => {
      if (!f) return;
      if (f.isSkipped) {
        skipped++;
        return;
      }
      if (f.tier === 'USER_FACT') userFacts++;
      else if (f.tier === 'AI_SUGGESTION' || f.tier === 'AI_INFERRED') aiSuggestions++;
    };

    Object.values(storyInputState).forEach(val => {
      if (val && typeof val === 'object' && 'tier' in val) {
        checkField(val);
      }
    });

    return { userFacts, aiSuggestions, skipped };
  };

  const { userFacts, aiSuggestions } = calculateFactCounts();

  // Archetype change handler
  const handleArchetypeChange = (newArch: StoryArchetype) => {
    setSelectedArchetype(newArch);
    // If empty or fresh, reset specialized defaults
    if (!storyInputState.coreIdea?.value) {
      setStoryInputState(getInitialFormData(newArch));
    }
  };

  // 1. [GENERATE FROM MY INPUT] -> Constructs 11-point Master Blueprint
  const handleGenerateBlueprint = async () => {
    setIsProcessing(true);
    setStatusMessage('Constructing 11-Point Master Narrative Blueprint with locked traits and scene beats...');
    try {
      const res = await fetch('/api/gemini/story-input/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: storyInputState,
          archetype: selectedArchetype,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate blueprint from input');
      const data = await res.json();
      const blueprint: StoryBlueprint = data.blueprint || data;
      setActiveStoryBlueprint(blueprint);
      setArchitectMode('advanced');
      setActiveFormSection('blueprint');
    } catch (err: any) {
      alert(`Blueprint generation error: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setStatusMessage(null);
    }
  };

  // 2. [HELP ME DEVELOP THIS] -> Fills unfilled fields with AI suggestions while preserving user facts
  const handleHelpDevelop = async () => {
    setIsProcessing(true);
    setStatusMessage('Brainstorming narrative architecture and proposing options for empty fields...');
    try {
      const res = await fetch('/api/gemini/story-input/develop-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: storyInputState,
          archetype: selectedArchetype,
        }),
      });

      if (!res.ok) throw new Error('Development assistant failed');
      const data = await res.json();
      const developedForm = data.formData || data;
      setStoryInputState(developedForm);
    } catch (err: any) {
      alert(`Development error: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setStatusMessage(null);
    }
  };

  // 3. [SURPRISE ME] -> Instant high-craft concept
  const handleSurpriseMe = async () => {
    setIsProcessing(true);
    setStatusMessage(`Generating high-craft ${(selectedArchetype || 'story').replace(/_/g, ' ')} premise with rich subtext...`);
    try {
      const res = await fetch('/api/gemini/story-input/surprise-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: selectedArchetype,
        }),
      });

      if (!res.ok) throw new Error('Surprise Me generation failed');
      const data = await res.json();
      const surprisedForm = data.formData || data;
      setStoryInputState(surprisedForm);
    } catch (err: any) {
      alert(`Surprise Me error: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setStatusMessage(null);
    }
  };

  // Field AI suggest helper
  const handleSuggestSingleField = async (fieldName: string, label: string) => {
    try {
      const res = await fetch('/api/gemini/story-input/suggest-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: storyInputState,
          archetype: selectedArchetype,
          fieldName,
          fieldLabel: label,
        }),
      });

      if (!res.ok) throw new Error('Field suggestion failed');
      const data = await res.json();
      const suggestionText = data.data?.bestSuggestion || data.bestSuggestion || data.suggestion;
      if (suggestionText) {
        setStoryInputState(prev => ({
          ...prev,
          [fieldName]: {
            value: suggestionText,
            tier: 'AI_SUGGESTION',
            isSkipped: false,
          },
        }));
      }
    } catch (e: any) {
      console.warn('Field suggestion error:', e);
    }
  };

  // Apply power tool enrichment back to form
  const handleApplyPowerToolEnrichment = (enrichmentResult: any) => {
    if (enrichmentResult.suggestedSubplots && enrichmentResult.suggestedSubplots.length > 0) {
      const newSubplots = enrichmentResult.suggestedSubplots.map((s: any, idx: number) => ({
        id: `enriched-sub-${Date.now()}-${idx}`,
        title: s.title,
        purpose: { value: s.conflict || '', tier: 'AI_SUGGESTION' as FactTier, isSkipped: false },
        conflict: { value: s.conflict || '', tier: 'AI_SUGGESTION' as FactTier, isSkipped: false },
        connectionToMainPlot: { value: s.intersectionWithMainPlot || '', tier: 'AI_SUGGESTION' as FactTier, isSkipped: false },
        resolution: { value: s.whyThisHelps || '', tier: 'AI_SUGGESTION' as FactTier, isSkipped: false },
        charactersInvolved: { value: 'Secondary Characters', tier: 'AI_SUGGESTION' as FactTier, isSkipped: false },
      }));

      setStoryInputState(prev => ({
        ...prev,
        subplots: [...(prev.subplots || []), ...newSubplots],
      }));
    }
  };

  const archetypes: { id: StoryArchetype; name: string }[] = [
    { id: 'satire', name: 'Satire & Comedy' },
    { id: 'illustrated_novel', name: 'Illustrated Novel' },
    { id: 'mystery', name: 'Mystery & Detective' },
    { id: 'comic', name: 'Comic Book' },
    { id: 'graphic_novel', name: 'Graphic Novel' },
    { id: 'writing_manual', name: 'Craft Writing Manual' },
    { id: 'sci_fi', name: 'Science Fiction' },
    { id: 'fantasy', name: 'Epic Fantasy' },
    { id: 'thriller', name: 'Suspense & Thriller' },
    { id: 'romance', name: 'Romance & Drama' },
    { id: 'horror', name: 'Horror & Supernatural' },
    { id: 'adventure', name: 'Adventure & Quest' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden">
      {/* Top Header Banner */}
      <div className="bg-slate-900 text-white px-6 py-3.5 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-bold tracking-tight text-white">
                Structured Story Architect
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 border border-indigo-700 uppercase font-semibold">
                {architectMode === 'qa' ? 'Guided Q&A Mode' : 'Deep Studio Mode'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              {architectMode === 'qa'
                ? 'Begin with a simplified, step-by-step Q&A to shape the core narrative.'
                : 'Granular 50-field architecture, immutable user facts, and 11-point narrative blueprinting.'}
            </p>
          </div>
        </div>

        {/* Mode Switcher & Top Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle between Simplified Q&A and Advanced Studio */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setArchitectMode('qa')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                architectMode === 'qa'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Simplified Q&A</span>
            </button>

            <button
              type="button"
              onClick={() => setArchitectMode('advanced')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                architectMode === 'advanced'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Advanced Studio</span>
            </button>
          </div>

          {/* Genre Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-[11px] text-slate-400 font-medium">Format:</span>
            <select
              value={selectedArchetype}
              onChange={e => handleArchetypeChange(e.target.value as StoryArchetype)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              {archetypes.map(a => (
                <option key={a.id} value={a.id} className="bg-slate-800 text-white">
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Master Action: GENERATE FROM MY INPUT */}
          <button
            type="button"
            onClick={handleGenerateBlueprint}
            disabled={isProcessing}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">GENERATE BLUEPRINT</span>
          </button>
        </div>
      </div>

      {/* RENDER MODE 1: SIMPLIFIED Q&A */}
      {architectMode === 'qa' && (
        <div className="flex-1 overflow-y-auto bg-slate-100/80">
          <SimplifiedStoryQA
            onSwitchToAdvanced={() => setArchitectMode('advanced')}
            onGenerateBlueprint={handleGenerateBlueprint}
            isProcessing={isProcessing}
          />
        </div>
      )}

      {/* RENDER MODE 2: HIGHLY EDITABLE ADVANCED STUDIO */}
      {architectMode === 'advanced' && (
        <>
          {/* Narrative Power Tools Bar */}
          <div className="bg-slate-900/95 border-b border-slate-800 px-6 py-2 flex items-center justify-between gap-3 overflow-x-auto text-xs">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Developmental Suite:
              </span>
              <button
                onClick={() => setActivePowerTool('make-richer')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-900/60 text-slate-200 hover:text-indigo-200 rounded-lg font-medium border border-slate-700 transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Make It Richer</span>
              </button>
              <button
                onClick={() => setActivePowerTool('make-harder')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-rose-900/60 text-slate-200 hover:text-rose-200 rounded-lg font-medium border border-slate-700 transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <Flame className="w-3 h-3 text-rose-400" />
                <span>Make It Harder (9 Obstacles)</span>
              </button>
              <button
                onClick={() => setActivePowerTool('what-could-go-wrong')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-amber-900/60 text-slate-200 hover:text-amber-200 rounded-lg font-medium border border-slate-700 transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                <span>What Could Go Wrong?</span>
              </button>
              <button
                onClick={() => setActivePowerTool('novelists-room')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-purple-900/60 text-slate-200 hover:text-purple-200 rounded-lg font-medium border border-slate-700 transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <Zap className="w-3 h-3 text-purple-400" />
                <span>Novelist&apos;s Room (Diagnostics)</span>
              </button>
              <button
                type="button"
                onClick={() => setShowTemplateModal(true)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium border border-slate-700 transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <Bookmark className="w-3 h-3 text-sky-400" />
                <span>Templates</span>
              </button>
            </div>

            {/* Fact Tiers Ledger Pill */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 text-[11px] bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-300 font-medium">{userFacts} User Facts</span>
                <span className="text-slate-500">•</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-slate-300 font-medium">{aiSuggestions} AI Suggestions</span>
              </div>
            </div>
          </div>

          {/* Main Body with Section Navigation & Form/Blueprint Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Navigation Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
                  Architecture Phases
                </span>

                <button
                  type="button"
                  onClick={() => setActiveFormSection('universal')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    activeFormSection === 'universal'
                      ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-600" />
                    <span>1. Universal Foundation</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFormSection('specialized')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    activeFormSection === 'specialized'
                      ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span className="capitalize">2. {(selectedArchetype || 'genre').replace(/_/g, ' ')} Engine</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFormSection('blueprint')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    activeFormSection === 'blueprint'
                      ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${activeStoryBlueprint ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>3. Master Blueprint</span>
                  </div>
                  {activeStoryBlueprint && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </button>
              </div>

              {/* Quick Info Box */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Immutable Constraint Rule</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Any field marked with a green <strong>USER FACT</strong> badge is treated by the AI as an absolute truth and will never be altered or contradicted.
                </p>
              </div>
            </div>

            {/* Scrollable Center Canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Status Processing Banner */}
                {isProcessing && (
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3 animate-pulse">
                    <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
                    <div className="text-xs text-indigo-950 font-medium">
                      {statusMessage || 'Processing narrative operation...'}
                    </div>
                  </div>
                )}

                {/* View Switching */}
                {activeFormSection === 'universal' && (
                  <UniversalStoryForm
                    formData={storyInputState}
                    onChange={setStoryInputState}
                    archetype={selectedArchetype}
                    onSuggestField={handleSuggestSingleField}
                  />
                )}

                {activeFormSection === 'specialized' && (
                  <GenreSpecializedForms
                    archetype={selectedArchetype}
                    formData={storyInputState}
                    onChange={setStoryInputState}
                    onSuggestField={handleSuggestSingleField}
                  />
                )}

                {activeFormSection === 'blueprint' && (
                  <div>
                    {activeStoryBlueprint ? (
                      <StoryBlueprintViewer
                        blueprint={activeStoryBlueprint}
                        onApproveAndApply={() => applyBlueprintToBook(activeStoryBlueprint)}
                        onRegenerate={handleGenerateBlueprint}
                        isGenerating={isProcessing}
                      />
                    ) : (
                      <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
                        <Compass className="w-10 h-10 text-slate-300 mx-auto" />
                        <h3 className="text-sm font-bold text-slate-800">No Blueprint Generated Yet</h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                          Fill out your story foundation and click &quot;Generate From My Input&quot; to synthesize an 11-point Master Narrative Blueprint.
                        </p>
                        <button
                          type="button"
                          onClick={handleGenerateBlueprint}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
                        >
                          Generate Blueprint Now
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Narrative Power Tools Modal */}
      {activePowerTool && (
        <NarrativePowerToolsModal
          isOpen={true}
          onClose={() => setActivePowerTool(null)}
          toolType={activePowerTool}
          formData={storyInputState}
          archetype={selectedArchetype}
          onApplyEnrichment={handleApplyPowerToolEnrichment}
        />
      )}

      {/* Template Manager Modal */}
      {showTemplateModal && (
        <TemplateManagerModal
          isOpen={true}
          onClose={() => setShowTemplateModal(false)}
          templates={savedStoryTemplates}
          onSaveCurrentAsTemplate={saveStoryTemplate}
          onLoadTemplate={loadStoryTemplate}
          onDeleteTemplate={deleteStoryTemplate}
          currentArchetype={selectedArchetype}
        />
      )}
    </div>
  );
};
