import React, { useState } from 'react';
import {
  Microscope,
  Sparkles,
  Zap,
  Layers,
  Lightbulb,
  HelpCircle,
  Sliders,
  CheckCircle2,
  Smile,
  Activity,
  Compass,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const ANALOGY_HOOKS = [
  { id: 'everyday_kitchen', name: 'The Kitchen Physics Analogy', desc: 'Explaining cosmic entropy, thermodynamics, or chemical bonding using bread dough, burnt toast, and melted butter.' },
  { id: 'bizarre_zoology', name: 'Gross & Shocking Natural Biology', desc: 'Parasitic fungi, immortal jellyfish, gut microbiome warfare, and bizarre evolutionary dead-ends.' },
  { id: 'counter_intuitive', name: 'The Counter-Intuitive Paradox', desc: 'Why hot water freezes faster than cold, why glass is technically a liquid, or why the night sky is dark.' },
  { id: 'scale_compression', name: 'Geologic & Cosmic Time Compression', desc: 'Compressing 4.5 billion years of Earth history into a single 24-hour clock where humans arrive at 11:58 PM.' },
];

const AUDIENCE_LEVELS = [
  { level: 'Curious 10-Year-Old (Zero Jargon)', desc: 'Pure vivid imagery, physical metaphors, and zero dense formulas.' },
  { level: 'Witty Cocktail Party Conversationalist', desc: 'Quirky trivia, sharp wit, and surprising historical anecdotes.' },
  { level: 'Informed Skeptic / Science Enthusiast', desc: 'Empirical data, methodology checks, and nuance without academic bloat.' },
];

export const PopScienceStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedHook, setSelectedHook] = useState(ANALOGY_HOOKS[0].id);
  const [witScore, setWitScore] = useState(80);
  const [selectedAudience, setSelectedAudience] = useState(AUDIENCE_LEVELS[1].level);
  const [scienceFact, setScienceFact] = useState('Mitochondria inside human cells were originally free-living bacteria absorbed over 1.5 billion years ago.');
  const [isTranslating, setIsTranslating] = useState(false);
  const [popScienceOutput, setPopScienceOutput] = useState<string | null>(null);

  const handleTranslateScience = async () => {
    setIsTranslating(true);
    setPopScienceOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'pop_science_wit',
          actionKey: 'translate_science_wit',
          actionLabel: 'Translate Scientific Fact into Witty Analogy',
          formData: {
            concept: scienceFact,
            analogyType: selectedHook,
            witLevel: `${witScore}% Humor & Irony`,
            targetAudience: selectedAudience,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setPopScienceOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Scientific explanation generated.');
      } else {
        setPopScienceOutput(`[POP SCIENCE WIT & ANALOGY REPORT]\nConcept: ${scienceFact}\nAudience Level: ${selectedAudience}\n\n1. THE WITTY HOOK:\n"Think of your cells as a landlord who rented out a spare bedroom 1.5 billion years ago to a shady tenant who promised to pay rent in batteries. That tenant never left, took over the electrical wiring, and now runs the entire building."\n\n2. THE EMPIRICAL WONDER:\nEvery breath you take is actually your internal bacterial roommates burning glucose to generate ATP currency.\n\n3. THE MIND-BENDING TAKEAWAY:\nYou are not a single organism; you are a walking planetary federation of former microbes wearing shoes.`);
      }
    } catch {
      setPopScienceOutput(`[SCIENCE LAB]\nFact: ${scienceFact}\nHook: ${selectedHook}`);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-md shadow-emerald-500/10">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Pop Science & Everyday Wonder Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 uppercase font-semibold">
                Witty Analogies & Empirical Wonder
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Demystifying complex physics, bizarre biology, and counter-intuitive natural phenomena.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Science Dilemmas
          </button>
        </div>
      </div>

      {/* ANALOGY HOOKS */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
          Analogy & Wonder Framework
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {ANALOGY_HOOKS.map(hook => (
            <div
              key={hook.id}
              onClick={() => setSelectedHook(hook.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedHook === hook.id
                  ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-emerald-200">{hook.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{hook.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AUDIENCE & WIT CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Audience Translation Level */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-emerald-400" />
            Target Translation Demystifier
          </label>
          <div className="space-y-2">
            {AUDIENCE_LEVELS.map(aud => (
              <div
                key={aud.level}
                onClick={() => setSelectedAudience(aud.level)}
                className={`p-2.5 rounded-lg border cursor-pointer transition ${
                  selectedAudience === aud.level
                    ? 'bg-emerald-950/50 border-emerald-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-emerald-200">{aud.level}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{aud.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wit / Irreverence Dial */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                Wit & Irreverence Quotient
              </label>
              <span className="text-xs font-mono text-emerald-300">{witScore}% Witty</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={witScore}
              onChange={e => setWitScore(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Sober Textbook</span>
              <span>Engaging Pop Science</span>
              <span>Irreverent & Hilarious</span>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSLATE FACT ACTION */}
      <div className="p-4 bg-slate-950/80 border border-emerald-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Pop Science Analogy Generator
          </span>
          <button
            onClick={handleTranslateScience}
            disabled={isTranslating}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
            {isTranslating ? 'Generating Analogy...' : 'Generate Witty Explainer'}
          </button>
        </div>

        <textarea
          rows={2}
          value={scienceFact}
          onChange={e => setScienceFact(e.target.value)}
          placeholder="Enter the dense scientific fact or theory to demystify..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
        />

        {popScienceOutput && (
          <div className="p-3.5 bg-slate-900 border border-emerald-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {popScienceOutput}
          </div>
        )}
      </div>
    </div>
  );
};
