import React, { useState } from 'react';
import { FieldInputWrapper } from './FieldInputWrapper';
import {
  StoryArchetype,
  StoryInputFormData,
  FieldItem,
  SuspectItem,
  ClueItem,
  SubplotItem,
  RunningGagItem,
} from '../../types';
import {
  Sparkles,
  Plus,
  Trash2,
  AlertCircle,
  Search,
  Zap,
  BookOpen,
  Clock,
  Compass,
  Layers,
  Smile,
  Eye,
  GitBranch,
  Shield,
  Flame,
  Heart,
  Ghost,
  Cpu,
  Feather,
  CheckCircle2,
  Sliders,
  Scale,
  Film,
  RefreshCw,
} from 'lucide-react';
import { createField } from '../../data/storyInputDefaults';
import { GenreActionModal } from './GenreActionModal';
import { DilemmaChainModal } from './DilemmaChainModal';
import { GenreExerciseModal } from './GenreExerciseModal';

interface GenreSpecializedFormsProps {
  archetype: StoryArchetype;
  formData: StoryInputFormData;
  onChange: (updated: StoryInputFormData) => void;
  onSuggestField: (fieldName: string, label: string) => Promise<void>;
}

export const GenreSpecializedForms: React.FC<GenreSpecializedFormsProps> = ({
  archetype,
  formData,
  onChange,
  onSuggestField,
}) => {
  // Modal states
  const [activeAction, setActiveAction] = useState<{ key: string; label: string } | null>(null);
  const [showDilemmaChain, setShowDilemmaChain] = useState(false);
  const [activeExercise, setActiveExercise] = useState<{ id: string; title: string } | null>(null);
  const [fairPlayAudit, setFairPlayAudit] = useState<any>(null);
  const [isAuditingMystery, setIsAuditingMystery] = useState(false);

  const updateField = (key: keyof StoryInputFormData, fieldItem: any) => {
    onChange({
      ...formData,
      [key]: fieldItem,
    });
  };

  // Helper for subplots
  const addSubplot = () => {
    const newSub: SubplotItem = {
      id: `sub-${Date.now()}`,
      title: 'New Subplot',
      charactersInvolved: createField('Secondary character names'),
      purpose: createField('Complicates protagonist external goal'),
      conflict: createField('Conflicting priority or loyalty'),
      connectionToMainPlot: createField('Intersects at midpoint reversal'),
      resolution: createField('Resolved before climax'),
    };
    updateField('subplots', [...(formData.subplots || []), newSub]);
  };

  const removeSubplot = (id: string) => {
    updateField('subplots', (formData.subplots || []).filter(s => s.id !== id));
  };

  // Helper for suspects in mystery
  const addSuspect = () => {
    const newSuspect: SuspectItem = {
      id: `susp-${Date.now()}`,
      name: 'Suspect Name',
      motive: createField('Financial or personal grudge'),
      means: createField('Access to weapon or poison'),
      opportunity: createField('Present during critical timeline gap'),
      secret: createField('Hiding an unrelated crime or affair'),
      alibi: createField('Alibi that initially checks out but has one flaw'),
      relationshipToVictim: createField('Former partner / employee'),
      whatTheyAreHiding: createField('Document or item removed from scene'),
      isLying: createField(true),
    };
    updateField('suspectMatrix', [...(formData.suspectMatrix || []), newSuspect]);
  };

  const removeSuspect = (id: string) => {
    updateField('suspectMatrix', (formData.suspectMatrix || []).filter(s => s.id !== id));
  };

  // Helper for clues in mystery
  const addClue = () => {
    const newClue: ClueItem = {
      id: `clue-${Date.now()}`,
      clueName: 'Physical Clue or Document',
      whatItReveals: createField('Specific timestamp or contradictory statement'),
      whoDiscoversIt: createField('Detective in Chapter 2'),
      whenDiscovered: createField('Early investigation'),
      appearsToMean: createField('Appears to incriminate the primary heir'),
      actuallyMeans: createField('Proves the victim died before the will was signed'),
      isRedHerring: createField(false),
    };
    updateField('clueSystem', [...(formData.clueSystem || []), newClue]);
  };

  const removeClue = (id: string) => {
    updateField('clueSystem', (formData.clueSystem || []).filter(c => c.id !== id));
  };

  // Helper for comic running gags
  const addRunningGag = () => {
    const newGag: RunningGagItem = {
      id: `gag-${Date.now()}`,
      title: 'Recurring Visual Gag',
      firstAppearance: createField('Page 1: Minor background mistake'),
      escalation: createField('Page 2: Characters attempt to fix it and make it worse'),
      variation: createField('Page 3: Authority figure unwittingly adopts it'),
      payoff: createField('Final Page: Saves the day in an absurd, accidental climax'),
    };
    updateField('comicRunningGags', [...(formData.comicRunningGags || []), newGag]);
  };

  const removeRunningGag = (id: string) => {
    updateField('comicRunningGags', (formData.comicRunningGags || []).filter(g => g.id !== id));
  };

  // Mystery fair play audit
  const runFairPlayAudit = async () => {
    setIsAuditingMystery(true);
    try {
      const res = await fetch('/api/gemini/story-input/check-mystery-logic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mysterySetup: {
            crime: formData.mysteryCrimeType?.value,
            victim: formData.mysteryVictim?.value,
            method: formData.mysteryMethod?.value,
            location: formData.setting?.value,
          },
          suspects: formData.suspectMatrix,
          clues: formData.clueSystem,
          solution: formData.mysterySolution?.value,
        }),
      });
      if (!res.ok) throw new Error('Fair-play audit failed');
      const data = await res.json();
      setFairPlayAudit(data.audit);
    } catch (err: any) {
      alert(`Fair-play error: ${err.message}`);
    } finally {
      setIsAuditingMystery(false);
    }
  };

  // Specialized AI Button Component
  const ActionButton = ({ actionKey, label, icon: Icon = Zap }: { actionKey: string; label: string; icon?: any }) => (
    <button
      type="button"
      onClick={() => setActiveAction({ key: actionKey, label })}
      className="text-[11px] px-2.5 py-1.5 bg-slate-800/90 hover:bg-indigo-600/90 text-slate-200 hover:text-white rounded-lg font-medium border border-slate-700 hover:border-indigo-500 transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"
    >
      <Icon className="w-3.5 h-3.5 text-indigo-400 group-hover:text-white" />
      <span>{label}</span>
    </button>
  );

  // Exercise Launcher Button Component
  const ExerciseButton = ({ id, title }: { id: string; title: string }) => (
    <button
      type="button"
      onClick={() => setActiveExercise({ id, title })}
      className="text-[11px] px-2.5 py-1.5 bg-emerald-950/40 hover:bg-emerald-700/80 text-emerald-300 hover:text-white rounded-lg font-medium border border-emerald-800/50 hover:border-emerald-500 transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"
    >
      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
      <span>{title}</span>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* 1. SATIRE & COMEDY */}
      {(archetype === 'satire' || archetype === 'dark_comedy' || archetype === 'absurdist') && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-sm">Satire & Dark Comedy Architecture</h4>
                <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono">
                  Irony & Absurdity Engine
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Absurd systems, bureaucratic mutiny, social hypocrisy, institutional madness, and razor-sharp wit.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>10-Level Satiric Dilemmas</span>
              </button>
            </div>
          </div>

          {/* AI Specialized Actions Bar */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Specialized Satire AI Accelerators
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="more_absurd" label="MAKE IT MORE ABSURD" />
              <ActionButton actionKey="more_deadpan" label="MAKE IT MORE DEADPAN" />
              <ActionButton actionKey="social_satire" label="INCREASE SOCIAL SATIRE" />
              <ActionButton actionKey="bureaucratic_logic" label="CREATE BUREAUCRATIC LOGIC" />
              <ActionButton actionKey="escalate_joke" label="ESCALATE THE JOKE" />
              <ActionButton actionKey="running_gag" label="CREATE A RUNNING GAG" />
              <ActionButton actionKey="ironic_reversal" label="ADD IRONIC REVERSAL" />
              <ActionButton actionKey="literal_system" label="MAKE SYSTEM TAKE IT LITERALLY" />
              <ActionButton actionKey="darker_ending" label="MAKE ENDING DARKER" />
            </div>
          </div>

          {/* Core Satire Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldInputWrapper
              label="Primary Target of Satire"
              description="Institution, Bureaucracy, Ideology, Corporate Culture, etc."
              field={formData.satireTarget || createField('Corporate Bureaucracy & Performative Efficiency')}
              onChange={f => updateField('satireTarget', f)}
              options={[
                'Corporate Bureaucracy & Performative Efficiency',
                'Government Agency & Red Tape',
                'Tech Industry & Silicon Valley Solutionism',
                'Academic Politics & Institutional Inertia',
                'Media Sensationalism & Celebrity Culture',
                'Social Conformity & Middle-Class Anxieties',
                'Legal System & Semantic Loopholes',
              ]}
              isSelect
            />
            <FieldInputWrapper
              label="The Absurd Foundational Rule"
              description="The unbending premise everyone in this world treats as normal"
              placeholder="e.g. Employee value is calculated strictly by email word count"
              field={formData.satireAbsurdRule || createField('')}
              onChange={f => updateField('satireAbsurdRule', f)}
              onSuggestAi={() => onSuggestField('satireAbsurdRule', 'Absurd Foundational Rule')}
            />
            <FieldInputWrapper
              label="Comedic Mechanism"
              field={formData.satireMechanism || createField('Deadpan Escalation with Bureaucratic Literalism')}
              onChange={f => updateField('satireMechanism', f)}
              options={[
                'Deadpan Escalation with Bureaucratic Literalism',
                'Socratic Irony (Protagonist plays naive)',
                'Absurdist Incongruity (High stakes over triviality)',
                'Satirical Reversal (Criminals behave like auditors)',
                'Kafkaesque Nightmare (Rules change without notice)',
              ]}
              isSelect
            />
          </div>

          {/* Exercises */}
          <div className="p-3.5 bg-emerald-950/20 border border-emerald-800/30 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Satire Craft Workshops
            </span>
            <div className="flex flex-wrap gap-2">
              <ExerciseButton id="deadpan_description" title="The Deadpan Description" />
              <ExerciseButton id="bureaucratic_nightmare" title="Bureaucratic Nightmare Scene" />
              <ExerciseButton id="satire_flip" title="The Institutional Reversal" />
              <ExerciseButton id="absurd_rule" title="The Law of Unintended Compliance" />
            </div>
          </div>
        </div>
      )}

      {/* 2. ILLUSTRATED NOVEL */}
      {archetype === 'illustrated_novel' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-sky-400" />
                <h4 className="font-bold text-sm">Illustrated Novel Architecture</h4>
                <span className="text-[10px] bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded font-mono">
                  Prose & Visual Harmony
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Lush literary prose paired with atmospheric, painterly full-page plates and visual continuity.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>10-Level Narrative Dilemmas</span>
              </button>
            </div>
          </div>

          {/* AI Actions */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Illustrated Novel Visual & Prose AI Actions
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="atmospheric_plate" label="CREATE ATMOSPHERIC PLATE" />
              <ActionButton actionKey="visualize_scene" label="VISUALIZE THIS SCENE" />
              <ActionButton actionKey="symbolic_image" label="CREATE SYMBOLIC IMAGE" />
              <ActionButton actionKey="character_plate" label="CREATE CHARACTER PLATE" />
              <ActionButton actionKey="environment_plate" label="CREATE ENVIRONMENT PLATE" />
              <ActionButton actionKey="foreshadow_art" label="FORESHADOW THROUGH ART" />
              <ActionButton actionKey="art_contradiction" label="MAKE ART CONTRADICT NARRATOR" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldInputWrapper
              label="Illustration Frequency & Placement"
              field={formData.illustrationFrequency || createField('Every Chapter Opener (Full Page Plate)')}
              onChange={f => updateField('illustrationFrequency', f)}
              options={[
                'Every Chapter Opener (Full Page Plate)',
                'Every Major Climax / Dramatic Turning Point',
                'Dual Spread (Prose Left, Full Plate Right)',
                'Half-Page Vignettes with Atmospheric Borders',
              ]}
              isSelect
            />
            <FieldInputWrapper
              label="Prose to Art Relationship"
              field={formData.visualProseRelationship || createField('Art Reveals What Text Hides / Subtext')}
              onChange={f => updateField('visualProseRelationship', f)}
              options={[
                'Art Reveals What Text Hides / Subtext',
                'Atmospheric Landscape Setting the Mood',
                'Character Psychology & Interiority Focus',
                'Symbolic Metaphor Reinforcing Thematic Conflict',
              ]}
              isSelect
            />
            <FieldInputWrapper
              label="Master Art Style Descriptor"
              placeholder="e.g. Gouache and ink wash on heavy textured linen paper"
              field={formData.artStyleDescriptor || createField('Painterly editorial gouache with warm chiaroscuro and fine ink line accents')}
              onChange={f => updateField('artStyleDescriptor', f)}
              onSuggestAi={() => onSuggestField('artStyleDescriptor', 'Master Art Style')}
            />
          </div>
        </div>
      )}

      {/* 3. MYSTERY & DETECTIVE */}
      {archetype === 'mystery' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-sm">Mystery & Detective Architecture</h4>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  Fair-Play Whodunit Engine
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Watertight clue timelines, suspect motives, deceptive red herrings, and verifiable fair-play deductions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={runFairPlayAudit}
                disabled={isAuditingMystery}
                className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Scale className={`w-3.5 h-3.5 ${isAuditingMystery ? 'animate-spin' : ''}`} />
                <span>Audit Fair-Play Rules</span>
              </button>
            </div>
          </div>

          {/* AI Actions */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Mystery AI Investigation Tools
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="create_mystery" label="GENERATE LOCKED PUZZLE" />
              <ActionButton actionKey="add_suspect_ai" label="GENERATE CREDIBLE SUSPECT" />
              <ActionButton actionKey="add_red_herring" label="CREATE RED HERRING" />
              <ActionButton actionKey="hide_clue" label="HIDE THE REAL CLUE IN PLAIN SIGHT" />
              <ActionButton actionKey="test_solution" label="TEST LOGICAL DEDUCTION" />
              <ActionButton actionKey="create_twist" label="ADD MIDPOINT PARADOX" />
              <ActionButton actionKey="check_logic" label="CHECK TIMELINE WATERTIGHTNESS" />
            </div>
          </div>

          {/* Fair-Play Audit Panel if active */}
          {fairPlayAudit && (
            <div className="p-4 bg-slate-950 border border-emerald-800/60 rounded-xl space-y-3 animate-fadeIn text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h5 className="font-bold text-white">Golden Age Fair-Play Verdict: {fairPlayAudit.verdict}</h5>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950 rounded">
                  Score: {fairPlayAudit.fairPlayScore}/100
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                {(fairPlayAudit.watertightnessChecklist || []).map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className={item.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {item.passed ? '✓' : '✗'}
                    </span>
                    <span className="text-slate-200">{item.item}</span>
                  </div>
                ))}
              </div>

              {fairPlayAudit.missingCluesNeeded?.length > 0 && (
                <div className="p-2.5 bg-amber-950/40 border border-amber-800/40 rounded-lg text-amber-200 text-[11px] space-y-1">
                  <span className="font-bold uppercase tracking-wider font-mono text-[10px]">
                    ⚠️ Missing Evidence Needed Before Final Reveal:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {fairPlayAudit.missingCluesNeeded.map((clue: string, idx: number) => (
                      <li key={idx}>{clue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Suspect Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                Suspect Ledger & Motive Matrix
              </h5>
              <button
                type="button"
                onClick={addSuspect}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Suspect
              </button>
            </div>

            {(formData.suspectMatrix || []).length === 0 ? (
              <div className="text-xs text-slate-400 p-4 border border-dashed border-slate-800 rounded-xl text-center bg-slate-900/30">
                No suspects registered. Click &ldquo;Add Suspect&rdquo; to build motive, means, and alibis.
              </div>
            ) : (
              <div className="space-y-3">
                {(formData.suspectMatrix || []).map((susp, idx) => (
                  <div key={susp.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={susp.name}
                        onChange={e => {
                          const updated = [...(formData.suspectMatrix || [])];
                          updated[idx].name = e.target.value;
                          updateField('suspectMatrix', updated);
                        }}
                        className="text-xs font-bold text-white bg-transparent border-b border-slate-700 focus:border-emerald-500 focus:outline-none"
                        placeholder="Suspect Full Name"
                      />
                      <button
                        type="button"
                        onClick={() => removeSuspect(susp.id)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <FieldInputWrapper
                        label="Motive"
                        field={susp.motive}
                        onChange={f => {
                          const updated = [...(formData.suspectMatrix || [])];
                          updated[idx].motive = f;
                          updateField('suspectMatrix', updated);
                        }}
                      />
                      <FieldInputWrapper
                        label="Means & Opportunity"
                        field={susp.opportunity}
                        onChange={f => {
                          const updated = [...(formData.suspectMatrix || [])];
                          updated[idx].opportunity = f;
                          updateField('suspectMatrix', updated);
                        }}
                      />
                      <FieldInputWrapper
                        label="Secret & Alibi Flaw"
                        field={susp.secret}
                        onChange={f => {
                          const updated = [...(formData.suspectMatrix || [])];
                          updated[idx].secret = f;
                          updateField('suspectMatrix', updated);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clues Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                Physical Clues & Red Herrings
              </h5>
              <button
                type="button"
                onClick={addClue}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Clue
              </button>
            </div>

            {(formData.clueSystem || []).length === 0 ? (
              <div className="text-xs text-slate-400 p-4 border border-dashed border-slate-800 rounded-xl text-center bg-slate-900/30">
                No clues registered. Add physical or testimonial clues for a watertight logical puzzle.
              </div>
            ) : (
              <div className="space-y-3">
                {(formData.clueSystem || []).map((clue, cIdx) => (
                  <div key={clue.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={clue.clueName}
                        onChange={e => {
                          const updated = [...(formData.clueSystem || [])];
                          updated[cIdx].clueName = e.target.value;
                          updateField('clueSystem', updated);
                        }}
                        className="text-xs font-bold text-white bg-transparent border-b border-slate-700 focus:border-emerald-500 focus:outline-none"
                        placeholder="Clue Name (e.g. Broken Pocketwatch, Smudged Guest Ledger)"
                      />
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-[11px] text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={clue.isRedHerring?.value}
                            onChange={e => {
                              const updated = [...(formData.clueSystem || [])];
                              updated[cIdx].isRedHerring = createField(e.target.checked);
                              updateField('clueSystem', updated);
                            }}
                            className="rounded text-amber-500"
                          />
                          <span>Red Herring</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => removeClue(clue.id)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <FieldInputWrapper
                        label="Appears to Mean (Deceptive / False Lead)"
                        field={clue.appearsToMean}
                        onChange={f => {
                          const updated = [...(formData.clueSystem || [])];
                          updated[cIdx].appearsToMean = f;
                          updateField('clueSystem', updated);
                        }}
                      />
                      <FieldInputWrapper
                        label="Actually Means (The Real Truth)"
                        field={clue.actuallyMeans}
                        onChange={f => {
                          const updated = [...(formData.clueSystem || [])];
                          updated[cIdx].actuallyMeans = f;
                          updateField('clueSystem', updated);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. COMIC BOOK & GRAPHIC NOVEL */}
      {(archetype === 'comic' || archetype === 'graphic_novel') && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-400" />
                <h4 className="font-bold text-sm">
                  {archetype === 'comic' ? 'Comic Book & Gag Architecture' : 'Cinematic Graphic Novel Framework'}
                </h4>
                <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-mono">
                  Sequential Visual Storytelling
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Dynamic panel layouts, punchy dialogue, visual pacing, reaction shots, and subtextual visual storytelling.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>10-Level Visual Dilemmas</span>
              </button>
            </div>
          </div>

          {/* AI Actions */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Sequential Art AI Directors
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="create_comic_page" label="GENERATE 4-PANEL PAGE" />
              <ActionButton actionKey="splash_page" label="DESIGN SPLASH PAGE REVEAL" />
              <ActionButton actionKey="punchy_dialogue" label="MAKE DIALOGUE PUNCHIER" />
              <ActionButton actionKey="remove_exposition" label="REPLACE EXPOSITION WITH VISUALS" />
              <ActionButton actionKey="reaction_shot" label="ADD COMEDIC REACTION SHOT" />
              <ActionButton actionKey="cinematic_transition" label="ADD ASPECT-TO-ASPECT TRANSITION" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldInputWrapper
              label="Visual Style & Line Weight"
              field={formData.comicVisualStyle || createField('Clean European Ligne Claire with dynamic expressive shadows')}
              onChange={f => updateField('comicVisualStyle', f)}
            />
            <FieldInputWrapper
              label="Visual Hook / Iconic Silhouette"
              placeholder="e.g. A solitary clocktower glowing through thick purple smog"
              field={formData.visualHook || createField('')}
              onChange={f => updateField('visualHook', f)}
              onSuggestAi={() => onSuggestField('visualHook', 'Visual Hook')}
            />
            <FieldInputWrapper
              label="Shown Instead of Explained"
              placeholder="e.g. Protagonist's frayed uniform badges reveal past dishonorable discharge"
              field={formData.shownInsteadOfExplained || createField('')}
              onChange={f => updateField('shownInsteadOfExplained', f)}
            />
          </div>

          {/* Running Gags for Comic */}
          {archetype === 'comic' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-amber-400" />
                  Running Gags & Multi-Page Escalation
                </h5>
                <button
                  type="button"
                  onClick={addRunningGag}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Running Gag
                </button>
              </div>

              {(formData.comicRunningGags || []).length === 0 ? (
                <div className="text-xs text-slate-400 p-4 border border-dashed border-slate-800 rounded-xl text-center bg-slate-900/30">
                  No running gags registered. Add multi-page visual gags with setup, variation, and payoff.
                </div>
              ) : (
                <div className="space-y-3">
                  {(formData.comicRunningGags || []).map((gag, gIdx) => (
                    <div key={gag.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300">Gag #{gIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeRunningGag(gag.id)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        <FieldInputWrapper
                          label="1. First Appearance"
                          field={gag.firstAppearance}
                          onChange={f => {
                            const updated = [...(formData.comicRunningGags || [])];
                            updated[gIdx].firstAppearance = f;
                            updateField('comicRunningGags', updated);
                          }}
                        />
                        <FieldInputWrapper
                          label="2. Escalation"
                          field={gag.escalation}
                          onChange={f => {
                            const updated = [...(formData.comicRunningGags || [])];
                            updated[gIdx].escalation = f;
                            updateField('comicRunningGags', updated);
                          }}
                        />
                        <FieldInputWrapper
                          label="3. Variation"
                          field={gag.variation}
                          onChange={f => {
                            const updated = [...(formData.comicRunningGags || [])];
                            updated[gIdx].variation = f;
                            updateField('comicRunningGags', updated);
                          }}
                        />
                        <FieldInputWrapper
                          label="4. Climax Payoff"
                          field={gag.payoff}
                          onChange={f => {
                            const updated = [...(formData.comicRunningGags || [])];
                            updated[gIdx].payoff = f;
                            updateField('comicRunningGags', updated);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. SCIENCE FICTION */}
      {archetype === 'sci_fi' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-sm">Science Fiction Speculative Engine</h4>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-mono">
                  Worldbuilding & Tech Bible
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Technological disruption, systemic consequences, artificial intelligence, and cosmic scale.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>10-Level Sci-Fi Dilemmas</span>
              </button>
            </div>
          </div>

          {/* AI Actions */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Speculative AI Engineering Tools
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="invent_tech" label="INVENT SPECULATIVE TECHNOLOGY" />
              <ActionButton actionKey="stress_test_tech" label="STRESS-TEST TECHNOLOGY" />
              <ActionButton actionKey="alien_culture" label="BUILD ALIEN CULTURE" />
              <ActionButton actionKey="ethical_dilemma" label="GENERATE ETHICAL TECH PARADOX" />
              <ActionButton actionKey="world_consistency" label="CHECK WORLD CONSISTENCY" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldInputWrapper
              label="Central Novum / Core Invention"
              description="The single technological or scientific shift altering this world"
              placeholder="e.g. Memory transcription into synthetic synthetic currency"
              field={formData.sciFiNovum || createField('')}
              onChange={f => updateField('sciFiNovum', f)}
              onSuggestAi={() => onSuggestField('sciFiNovum', 'Central Invention')}
            />
            <FieldInputWrapper
              label="The Unintended Social Consequence"
              placeholder="e.g. Human rights are pegged to recorded neural bandwidth"
              field={formData.sciFiSocialConsequence || createField('')}
              onChange={f => updateField('sciFiSocialConsequence', f)}
            />
            <FieldInputWrapper
              label="Who Controls & Who Suffers?"
              placeholder="e.g. Controlled by cartels; marginalized outer colonies are stripped of archives"
              field={formData.sciFiPowerStructure || createField('')}
              onChange={f => updateField('sciFiPowerStructure', f)}
            />
          </div>
        </div>
      )}

      {/* 6. EPIC FANTASY */}
      {archetype === 'fantasy' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-sm">Epic Fantasy & Magic Engine</h4>
                <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono">
                  Mythic Lore & Hard Magic
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Ancient lineages, hard magic limits and visceral costs, broken prophecies, and mythic stakes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>10-Level Fantasy Dilemmas</span>
              </button>
            </div>
          </div>

          {/* AI Actions */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Mythic Fantasy AI Tools
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="build_magic_system" label="BUILD MAGIC SYSTEM & HARD RULES" />
              <ActionButton actionKey="ancient_prophecy" label="GENERATE AMBIGUOUS PROPHECY" />
              <ActionButton actionKey="break_prophecy" label="SUBVERT / BREAK PROPHECY" />
              <ActionButton actionKey="create_dynasty" label="BUILD RIVAL NOBLE HOUSES" />
              <ActionButton actionKey="legendary_artifact" label="INVENT CURSED RELIC" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldInputWrapper
              label="Magic System Rules & Source"
              placeholder="e.g. Bloodline heat transfer: casting creates frostbite in the caster"
              field={formData.fantasyMagicSystem || createField('')}
              onChange={f => updateField('fantasyMagicSystem', f)}
              onSuggestAi={() => onSuggestField('fantasyMagicSystem', 'Magic System')}
            />
            <FieldInputWrapper
              label="The Visceral Cost of Magic"
              placeholder="e.g. Each memory used as fuel cannot be remembered ever again"
              field={formData.fantasyMagicCost || createField('')}
              onChange={f => updateField('fantasyMagicCost', f)}
            />
            <FieldInputWrapper
              label="Ancient Betrayal / Secret Lore"
              placeholder="e.g. The holy gods were artificial constructs created by mortal kings"
              field={formData.fantasyAncientSecret || createField('')}
              onChange={f => updateField('fantasyAncientSecret', f)}
            />
          </div>
        </div>
      )}

      {/* 7. SUSPENSE & THRILLER */}
      {archetype === 'thriller' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <h4 className="font-bold text-sm">Suspense & Ticking Clock Engine</h4>
                <span className="text-[10px] bg-orange-950 text-orange-300 border border-orange-800 px-2 py-0.5 rounded font-mono">
                  Relentless Escalation
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Shortening deadlines, evaporating escape routes, compounding paranoia, and existential peril.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>10-Level Thriller Dilemmas</span>
              </button>
            </div>
          </div>

          {/* AI Actions */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              High-Tension AI Escalators
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="shorten_clock" label="SHORTEN THE TICKING CLOCK" />
              <ActionButton actionKey="remove_escape" label="REMOVE ESCAPE ROUTE" />
              <ActionButton actionKey="reveal_new_threat" label="REVEAL HIGHER THREAT LEVEL" />
              <ActionButton actionKey="false_safety" label="PULL THE RUG ON SAFE HARBOR" />
              <ActionButton actionKey="trap_character" label="TRAP PROTAGONIST IN CORNER" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldInputWrapper
              label="The Ticking Clock"
              placeholder="e.g. 72 hours before the quarantine breach goes irreversible"
              field={formData.thrillerClock || createField('')}
              onChange={f => updateField('thrillerClock', f)}
              onSuggestAi={() => onSuggestField('thrillerClock', 'Ticking Clock')}
            />
            <FieldInputWrapper
              label="The Disappearing Escape Route"
              placeholder="e.g. The only bridge out is mined and guarded by compromised allies"
              field={formData.thrillerEscapeCost || createField('')}
              onChange={f => updateField('thrillerEscapeCost', f)}
            />
            <FieldInputWrapper
              label="The Paranoia Factor (Who is compromised?)"
              placeholder="e.g. The mentor gave the antagonist the decryption codes"
              field={formData.thrillerParanoiaFactor || createField('')}
              onChange={f => updateField('thrillerParanoiaFactor', f)}
            />
          </div>
        </div>
      )}

      {/* 8. CRAFT WRITING MANUAL */}
      {archetype === 'writing_manual' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <h4 className="font-bold text-sm">Creative Writing Manual & Lab Architecture</h4>
                <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">
                  Pedagogical Masterclass
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Pedagogical objectives, 7-tier mastery exercises, diagnostic checklists, and scene surgery protocols.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>7-Tier Writing Dilemmas</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FieldInputWrapper
              label="Learning Objective"
              description="What core narrative muscle will the reader develop?"
              placeholder="e.g. Mastering Dramatic Subtext & The Unspoken Conflict in Dialogue"
              field={formData.manualLearningObjective || createField('')}
              onChange={f => updateField('manualLearningObjective', f)}
              onSuggestAi={() => onSuggestField('manualLearningObjective', 'Learning Objective')}
            />
            <FieldInputWrapper
              label="Target Audience Level"
              field={formData.manualAudience || createField('Intermediate to Advanced Authors')}
              onChange={f => updateField('manualAudience', f)}
              options={['Beginner / Aspiring Novelist', 'Intermediate to Advanced Authors', 'Professional Novelists & Editors', 'Genre Specialists']}
              isSelect
            />
            <FieldInputWrapper
              label="Craft Subject"
              field={formData.manualSubject || createField('Dialogue & Dramatic Tension')}
              onChange={f => updateField('manualSubject', f)}
              options={['Character Arc & Flaw Engineering', 'Plot Architecture & Reversals', 'Dialogue Subtext & Voice', 'Scene Surgery & Pacing', 'Anti-Cliché & Trope Inversion', 'Worldbuilding & Sensory Lore']}
              isSelect
            />
            <FieldInputWrapper
              label="Teaching Voice & Style"
              field={formData.manualTeachingStyle || createField('Surgical, witty, workshop-driven')}
              onChange={f => updateField('manualTeachingStyle', f)}
              options={['Surgical, witty, workshop-driven', 'Academic & Rigorous', 'Conversational & Encouraging', 'Cynical Editor & Tough Love']}
              isSelect
            />
          </div>

          {/* Author Labs */}
          <div className="p-3.5 bg-purple-950/20 border border-purple-800/30 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider font-mono">
              7-Tier Masterclass Labs
            </span>
            <div className="flex flex-wrap gap-2">
              <ExerciseButton id="scene_without_exposition" title="The Scene Without Exposition" />
              <ExerciseButton id="dialogue_subtext" title="The Unspoken Conflict in Dialogue" />
              <ExerciseButton id="character_flaw_surgery" title="Character Flaw Pressure Test" />
              <ExerciseButton id="anti_cliche_reversal" title="Trope Inversion Protocol" />
            </div>
          </div>
        </div>
      )}

      {/* 9. ROMANCE & DRAMA */}
      {archetype === 'romance' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <h4 className="font-bold text-sm">Romance & Emotional Intimacy Engine</h4>
                <span className="text-[10px] bg-pink-950 text-pink-300 border border-pink-800 px-2 py-0.5 rounded font-mono">
                  Bonds & Vulnerability
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Emotional vulnerability, deep relationship arcs, conflicting desires, heartbreak, and transformative love.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>10-Level Romance Dilemmas</span>
              </button>
            </div>
          </div>

          {/* AI Actions */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Emotional Depth & Subtext Accelerators
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="deepen_emotion" label="DEEPEN EMOTIONAL VULNERABILITY" />
              <ActionButton actionKey="subtext_dialogue" label="ADD SUBTEXT TO CONVERSATION" />
              <ActionButton actionKey="honest_misunderstanding" label="CREATE HIGH-STAKES MISUNDERSTANDING" />
              <ActionButton actionKey="romantic_tension" label="INCREASE PROXIMITY TENSION" />
              <ActionButton actionKey="heartbreak_choice" label="CREATE AGONIZING EMOTIONAL SACRIFICE" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldInputWrapper
              label="The Core Vulnerability Barrier"
              placeholder="e.g. Fear of repeating parental financial ruin"
              field={formData.romanceBarrier || createField('')}
              onChange={f => updateField('romanceBarrier', f)}
              onSuggestAi={() => onSuggestField('romanceBarrier', 'Vulnerability Barrier')}
            />
            <FieldInputWrapper
              label="Why They Cannot Be Together (Yet)"
              placeholder="e.g. Professional conflict of interest and opposing career postings"
              field={formData.romanceExternalConflict || createField('')}
              onChange={f => updateField('romanceExternalConflict', f)}
            />
            <FieldInputWrapper
              label="The Moment the Mask Slipped"
              placeholder="e.g. Late night in the flooded basement archive sharing childhood sketches"
              field={formData.romanceIntimacyMoment || createField('')}
              onChange={f => updateField('romanceIntimacyMoment', f)}
            />
          </div>
        </div>
      )}

      {/* 10. HORROR & SUPERNATURAL */}
      {archetype === 'horror' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Ghost className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-sm">Horror & Uncanny Dread Engine</h4>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  Psychological & Cosmic Dread
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Eerie escalations, uncanny disruptions of normal reality, forbidden rules, and inescapable dread.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDilemmaChain(true)}
                className="text-xs px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>10-Level Dread Dilemmas</span>
              </button>
            </div>
          </div>

          {/* AI Actions */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Atmospheric Dread AI Accelerators
            </span>
            <div className="flex flex-wrap gap-2">
              <ActionButton actionKey="create_dread" label="CREATE UNCANNY DETAIL" />
              <ActionButton actionKey="hide_monster" label="CONCEAL THE ENTITY" />
              <ActionButton actionKey="false_explanation" label="CREATE FALSE RATIONAL EXPLANATION" />
              <ActionButton actionKey="reveal_rule" label="REVEAL THE ENTITY'S TERRIBLE RULE" />
              <ActionButton actionKey="break_rule" label="PUNISH RULE VIOLATION" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldInputWrapper
              label="The First Impossible Detail"
              placeholder="e.g. The sound of running water inside a dry brick pillar"
              field={formData.horrorFirstAnomaly || createField('')}
              onChange={f => updateField('horrorFirstAnomaly', f)}
              onSuggestAi={() => onSuggestField('horrorFirstAnomaly', 'First Anomaly')}
            />
            <FieldInputWrapper
              label="The Entity's Inflexible Rule"
              placeholder="e.g. It only attacks when you look directly into the reflection"
              field={formData.horrorEntityRule || createField('')}
              onChange={f => updateField('horrorEntityRule', f)}
            />
            <FieldInputWrapper
              label="The Failed Rational Explanation"
              placeholder="e.g. The architect insists it is normal structural settling"
              field={formData.horrorRationalCoverup || createField('')}
              onChange={f => updateField('horrorRationalCoverup', f)}
            />
          </div>
        </div>
      )}

      {/* Universal Subplot Manager (Accessible across all genres) */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
            Interlocking Subplots & Thematic Mirrors
          </h5>
          <button
            type="button"
            onClick={addSubplot}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Subplot
          </button>
        </div>

        {(formData.subplots || []).length === 0 ? (
          <div className="text-xs text-slate-400 p-4 border border-dashed border-slate-800 rounded-xl text-center bg-slate-900/30">
            No secondary subplots registered. Add subplots that mirror or conflict with the protagonist&apos;s primary struggle.
          </div>
        ) : (
          <div className="space-y-3">
            {(formData.subplots || []).map((sub, sIdx) => (
              <div key={sub.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={sub.title}
                    onChange={e => {
                      const updated = [...(formData.subplots || [])];
                      updated[sIdx].title = e.target.value;
                      updateField('subplots', updated);
                    }}
                    className="text-xs font-bold text-white bg-transparent border-b border-slate-700 focus:border-indigo-500 focus:outline-none"
                    placeholder="Subplot Title"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubplot(sub.id)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                  <FieldInputWrapper
                    label="Characters"
                    field={sub.charactersInvolved}
                    onChange={f => {
                      const updated = [...(formData.subplots || [])];
                      updated[sIdx].charactersInvolved = f;
                      updateField('subplots', updated);
                    }}
                  />
                  <FieldInputWrapper
                    label="Conflict"
                    field={sub.conflict}
                    onChange={f => {
                      const updated = [...(formData.subplots || [])];
                      updated[sIdx].conflict = f;
                      updateField('subplots', updated);
                    }}
                  />
                  <FieldInputWrapper
                    label="Main Plot Connection"
                    field={sub.connectionToMainPlot}
                    onChange={f => {
                      const updated = [...(formData.subplots || [])];
                      updated[sIdx].connectionToMainPlot = f;
                      updateField('subplots', updated);
                    }}
                  />
                  <FieldInputWrapper
                    label="Resolution"
                    field={sub.resolution}
                    onChange={f => {
                      const updated = [...(formData.subplots || [])];
                      updated[sIdx].resolution = f;
                      updateField('subplots', updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {activeAction && (
        <GenreActionModal
          archetype={archetype}
          actionKey={activeAction.key}
          actionLabel={activeAction.label}
          formData={formData}
          isOpen={true}
          onClose={() => setActiveAction(null)}
          onApplyPatch={(patch) => {
            onChange({
              ...formData,
              ...Object.keys(patch).reduce((acc: any, key) => {
                acc[key] = createField(patch[key], 'AI_SUGGESTION');
                return acc;
              }, {})
            });
          }}
        />
      )}

      {showDilemmaChain && (
        <DilemmaChainModal
          archetype={archetype}
          formData={formData}
          isOpen={true}
          onClose={() => setShowDilemmaChain(false)}
        />
      )}

      {activeExercise && (
        <GenreExerciseModal
          archetype={archetype}
          exerciseId={activeExercise.id}
          exerciseTitle={activeExercise.title}
          formData={formData}
          isOpen={true}
          onClose={() => setActiveExercise(null)}
        />
      )}
    </div>
  );
};
