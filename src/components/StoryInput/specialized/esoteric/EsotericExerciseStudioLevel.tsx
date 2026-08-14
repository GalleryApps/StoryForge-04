import React, { useState } from 'react';
import {
  Zap,
  Sparkles,
  Plus,
  Trash2,
  Sliders,
  Clock,
  CheckCircle2,
  Layers,
  Wand2,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { ExerciseItem } from './EsotericBlueprintTypes';

interface Props {
  exercises: ExerciseItem[];
  onUpdateExercises: (updater: (prev: ExerciseItem[]) => ExerciseItem[]) => void;
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
}

const DEFAULT_EXERCISE_TEMPLATES: Record<string, Partial<ExerciseItem>> = {
  Observation: {
    type: 'Warm-Up',
    title: 'Daily Microcosm Observation',
    difficulty: 3,
    timeEstimate: '15 min',
    materialsNeeded: 'Journal and pen',
    instructions: 'Observe a natural or architectural phenomenon for 15 minutes. Note 3 correspondences to human emotional states.',
    expectedOutcome: 'Direct sensory verification of the Hermetic principle of Correspondence.',
    selfAssessment: 'Did I observe without projecting preconceived intellectual narratives?',
  },
  Analysis: {
    type: 'Core',
    title: 'Alchemical Emblem Deconstruction',
    difficulty: 6,
    timeEstimate: '30 min',
    materialsNeeded: 'Emblem Plate (e.g. Atalanta Fugiens)',
    instructions: 'Identify the 4 elemental quadrants, the central vessel, and the hidden bird motif. Trace their transformative sequence.',
    expectedOutcome: 'Ability to decode multi-layered 17th-century symbolic engravings.',
    selfAssessment: 'Can I articulate the meaning of each animal and color without looking at commentary?',
  },
  Creation: {
    type: 'Creative',
    title: 'Personal Sigil & Talismanic Matrix',
    difficulty: 7,
    timeEstimate: '1 hour',
    materialsNeeded: 'Parchment paper, drawing compass, ink',
    instructions: 'Condense a spiritual aspiration into a geometric glyph using the planetary kamea of the Sun.',
    expectedOutcome: 'A balanced geometric sigil reflecting harmonious mathematical proportions.',
    selfAssessment: 'Is the design mathematically sound according to the 6x6 solar grid?',
  },
  Research: {
    type: 'Advanced',
    title: 'Primary Source Variant Collation',
    difficulty: 8,
    timeEstimate: 'Multi-session',
    materialsNeeded: 'Translations of Corpus Hermeticum by Copenhaver and Mead',
    instructions: 'Compare the Greek "Poimandres" translation variants regarding the creation of the Anthropos.',
    expectedOutcome: 'Clear understanding of theological nuances introduced by Renaissance translators.',
    selfAssessment: 'Have I documented specific textual divergences with line citations?',
  },
  Reflection: {
    type: 'Reflection',
    title: 'The Mirror of Polarity Meditation',
    difficulty: 4,
    timeEstimate: '15 min',
    materialsNeeded: 'Quiet room, dim lighting',
    instructions: 'Identify a persistent negative psychological state. Locate its exact positive polar opposite on the same emotional spectrum and shift mental focus along the axis.',
    expectedOutcome: 'Experiential mastery of mental transmutation through polarization.',
    selfAssessment: 'Did I transmute the state through polarity shift or merely suppress it?',
  },
  Comparison: {
    type: 'Core',
    title: 'Hermetic Spheres vs Kabbalistic Sephirot',
    difficulty: 6,
    timeEstimate: '30 min',
    materialsNeeded: 'Diagram of the 7 Planetary Spheres and the 10 Sephirot',
    instructions: 'Draw cross-system correspondence lines between Tiferet and the Solar Sphere, and Gevurah with Mars.',
    expectedOutcome: 'Integrated comparative map of Western esoteric cosmology.',
    selfAssessment: 'Are the philosophical distinctions between Emanationism and Planetary Ascents preserved?',
  },
  Application: {
    type: 'Professional',
    title: 'Theurgic Sacred Space Consecration',
    difficulty: 9,
    timeEstimate: '1 hour',
    materialsNeeded: 'Compass, natural incense, salt, bowl of spring water',
    instructions: 'Execute a four-directional boundary alignment invoking elemental intelligences with sacred geometric gestures.',
    expectedOutcome: 'Creation of a somatically distinct, consecrated working perimeter.',
    selfAssessment: 'Was the protocol conducted with rigorous solemnity, correct orientation, and clear intent?',
  },
  Debate: {
    type: 'Group',
    title: 'The Great Scholarly Trial: Material vs Spiritual Alchemy',
    difficulty: 7,
    timeEstimate: '30 min',
    materialsNeeded: 'Extracts from Principe (historicism) and Jung (psychological)',
    instructions: 'Stage a formal debate defending whether Renaissance alchemists were proto-chemists or esoteric spiritual initiates.',
    expectedOutcome: 'Nuanced synthesis transcending simplistic historical dichotomies.',
    selfAssessment: 'Did the defense address empirical metallurgical evidence alongside mystical treatises?',
  },
};

export const EsotericExerciseStudioLevel: React.FC<Props> = ({
  exercises,
  onUpdateExercises,
  onExecuteAIGenerator,
  isGeneratingAI,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Observation');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);

  const addFromTemplate = (templateName: string) => {
    const t = DEFAULT_EXERCISE_TEMPLATES[templateName];
    if (!t) return;
    const newEx: ExerciseItem = {
      id: `ex_${Date.now()}`,
      title: t.title || 'New Exercise',
      type: t.type || 'Core',
      difficulty: t.difficulty || 5,
      timeEstimate: t.timeEstimate || '30 min',
      materialsNeeded: t.materialsNeeded || 'Journal',
      instructions: t.instructions || 'Follow step-by-step instructions...',
      expectedOutcome: t.expectedOutcome || 'Expected transformation...',
      selfAssessment: t.selfAssessment || 'Verification criteria...',
    };
    onUpdateExercises(prev => [...prev, newEx]);
    setActiveExerciseIndex(exercises.length);
  };

  const activeEx = exercises[activeExerciseIndex] || exercises[0];

  const updateActiveExercise = (field: keyof ExerciseItem, value: any) => {
    onUpdateExercises(prev => {
      const copy = [...prev];
      if (copy[activeExerciseIndex]) {
        copy[activeExerciseIndex] = { ...copy[activeExerciseIndex], [field]: value };
      }
      return copy;
    });
  };

  const removeExercise = (idx: number) => {
    onUpdateExercises(prev => prev.filter((_, i) => i !== idx));
    if (activeExerciseIndex >= exercises.length - 1) {
      setActiveExerciseIndex(Math.max(0, exercises.length - 2));
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Level 4: Exercise Architecture & 8 Pedagogical Templates
            </h4>
            <p className="text-xs text-slate-400">
              Each exercise contains a complete Container (Difficulty 1-10, Time, Materials, Instructions, Example, Outcome, Self-Assessment, AI Help).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={isGeneratingAI}
              onClick={() =>
                onExecuteAIGenerator(
                  '7-Tier Progressive Curriculum',
                  'Generate a full set of 8 progressive exercises from Tier 1 (Warm-Up Observation) to Tier 8 (Master Theurgic Consecration).',
                  'exSuite'
                )
              }
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5" /> AI Generate 8 Tiers
            </button>
          </div>
        </div>

        {/* 4.2 8 EXERCISE TEMPLATES QUICK-ADD */}
        <div className="space-y-2">
          <div className="font-bold text-xs text-slate-400">4.2 Quick-Add from 8 Exercise Archetypes:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 text-xs">
            {Object.keys(DEFAULT_EXERCISE_TEMPLATES).map(tmpl => (
              <button
                key={tmpl}
                onClick={() => addFromTemplate(tmpl)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-center font-bold text-amber-300 hover:text-amber-200 transition text-[11px] flex flex-col items-center gap-1"
              >
                <Plus className="w-3 h-3 text-amber-400" />
                <span>{tmpl}</span>
              </button>
            ))}
          </div>
        </div>

        {/* EXERCISE LIST / CAROUSEL */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {exercises.map((ex, idx) => (
            <button
              key={ex.id || idx}
              onClick={() => setActiveExerciseIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border ${
                activeExerciseIndex === idx
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-950 font-mono">
                #{idx + 1}
              </span>
              <span>{ex.title.slice(0, 18)}...</span>
            </button>
          ))}
        </div>

        {/* ACTIVE EXERCISE EDITOR CONTAINER (4.1) */}
        {activeEx && (
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-200 text-sm">
                4.1 Exercise Container #{activeExerciseIndex + 1}
              </span>
              <div className="flex items-center gap-2">
                {/* AI HELP ACTIONS (4.1 AI Help Options) */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-amber-400 font-bold px-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Help:
                  </span>
                  <button
                    onClick={() =>
                      onExecuteAIGenerator(
                        'Make Harder',
                        `Elevate the difficulty of exercise "${activeEx.title}" by adding historical Latin primary texts and strict hermetic constraints.`,
                        'makeHarder'
                      )
                    }
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 text-[10px] font-semibold transition"
                  >
                    Harder
                  </button>
                  <button
                    onClick={() =>
                      onExecuteAIGenerator(
                        'Simplify',
                        `Simplify exercise "${activeEx.title}" into a fast 5-minute accessible mindfulness practice for beginners.`,
                        'simplifyEx'
                      )
                    }
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 text-[10px] font-semibold transition"
                  >
                    Simplify
                  </button>
                  <button
                    onClick={() =>
                      onExecuteAIGenerator(
                        'Add Creative Variation',
                        `Add a creative artistic or journaling variation to exercise "${activeEx.title}".`,
                        'creativeVar'
                      )
                    }
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 text-[10px] font-semibold transition"
                  >
                    Creative
                  </button>
                </div>
                {exercises.length > 1 && (
                  <button
                    onClick={() => removeExercise(activeExerciseIndex)}
                    className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 border border-red-800 text-red-300 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 font-semibold">Exercise Title</label>
                <input
                  type="text"
                  value={activeEx.title}
                  onChange={e => updateActiveExercise('title', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Exercise Type</label>
                <select
                  value={activeEx.type}
                  onChange={e => updateActiveExercise('type', e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300"
                >
                  <option>Warm-Up</option>
                  <option>Core</option>
                  <option>Advanced</option>
                  <option>Professional</option>
                  <option>Experiment</option>
                  <option>Reflection</option>
                  <option>Creative</option>
                  <option>Group</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-400 font-semibold">
                  <span>Difficulty (1-10)</span>
                  <span className="text-amber-400 font-mono font-bold">{activeEx.difficulty}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={activeEx.difficulty}
                  onChange={e => updateActiveExercise('difficulty', parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Time Estimate</label>
                <select
                  value={activeEx.timeEstimate}
                  onChange={e => updateActiveExercise('timeEstimate', e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                >
                  <option>5 min</option>
                  <option>15 min</option>
                  <option>30 min</option>
                  <option>1 hour</option>
                  <option>Multi-session</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-3">
                <label className="text-slate-400 font-semibold">Materials Needed</label>
                <input
                  type="text"
                  value={activeEx.materialsNeeded}
                  onChange={e => updateActiveExercise('materialsNeeded', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="space-y-1 sm:col-span-4">
                <label className="text-slate-400 font-semibold">Step-by-Step Instructions</label>
                <textarea
                  rows={3}
                  value={activeEx.instructions}
                  onChange={e => updateActiveExercise('instructions', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 font-semibold">Expected Outcome</label>
                <textarea
                  rows={2}
                  value={activeEx.expectedOutcome}
                  onChange={e => updateActiveExercise('expectedOutcome', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-white"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 font-semibold">Self-Assessment Question / Metric</label>
                <textarea
                  rows={2}
                  value={activeEx.selfAssessment}
                  onChange={e => updateActiveExercise('selfAssessment', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
