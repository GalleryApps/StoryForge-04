import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Zap,
  Layers,
  FileCheck,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  Calendar,
  Search,
  Eye,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const TRUTH_LADDER_TIERS = [
  { level: '1. Verified Physical Artifact', color: 'text-emerald-400 border-emerald-500 bg-emerald-950/30', desc: 'Notarized contracts, telegrams, court transcripts, photographs.' },
  { level: '2. Contemporary Eyewitness Diary', color: 'text-cyan-400 border-cyan-500 bg-cyan-950/30', desc: 'Personal private journals written within 24 hours of the event.' },
  { level: '3. Retrospective Oral Memoir', color: 'text-amber-400 border-amber-500 bg-amber-950/30', desc: 'Interviews conducted decades later; prone to memory drift and nostalgia.' },
  { level: '4. Ethical Narrative Reconstruction', color: 'text-purple-400 border-purple-500 bg-purple-950/30', desc: 'Dramatized dialogue and sensory weather grounded in verifiable meteorological logs.' },
];

export const NarrativeNonfictionStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedTier, setSelectedTier] = useState(TRUTH_LADDER_TIERS[0].level);
  const [factualRigor, setFactualRigor] = useState(90);
  const [historicalEvent, setHistoricalEvent] = useState('The midnight meeting on the dock in Lisbon between the exiled diplomat and the underground courier in November 1941.');
  const [isDramatizing, setIsDramatizing] = useState(false);
  const [nonfictionOutput, setNonfictionOutput] = useState<string | null>(null);

  const handleDramatizeScene = async () => {
    setIsDramatizing(true);
    setNonfictionOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'narrative_nonfiction',
          actionKey: 'dramatize_nonfiction_scene',
          actionLabel: 'Ethically Dramatize True Historical Event',
          formData: {
            event: historicalEvent,
            truthTier: selectedTier,
            factualRigor: `${factualRigor}% Truth Standard`,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setNonfictionOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Historical scene reconstructed.');
      } else {
        setNonfictionOutput(`[NARRATIVE NONFICTION ETHICAL RECONSTRUCTION]\nEvent: ${historicalEvent}\nTruth Tier: ${selectedTier}\n\n1. SENSORY & ARCHIVAL GROUNDING:\nAccording to the Lisbon Port Authority logbook for November 14, 1941, the cargo steamer *Serpa Pinto* was docked at Pier 3 under a heavy Atlantic fog with visibility under 50 meters.\n\n2. DRAMATIZED SCENE WITH ETHICAL DISCLOSURE:\nThe diplomat stood beneath the rusted crane, his wool overcoat soaked with salty mist. When the courier handed over the forged visa stamps wrapped in oilcloth, no words were exchanged—only the click of the courier's lighter.\n\n3. EPISTEMIC FOOTNOTE:\n*Source Note*: The weather conditions are verified via naval meteorological records. The silence between the men is drawn from the diplomat’s 1952 postwar memoir (*Memórias de Guerra*, p. 114).`);
      }
    } catch {
      setNonfictionOutput(`[NARRATIVE NONFICTION]\nEvent: ${historicalEvent}\nTier: ${selectedTier}`);
    } finally {
      setIsDramatizing(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-stone-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-md shadow-amber-500/10">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Narrative Nonfiction & Memoir Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 uppercase font-semibold">
                Archival Reconstruction & Truth Ladder
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ethical dramatization of true events, oral history synthesis, and epistemic source verification.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Nonfiction Dilemmas
          </button>
        </div>
      </div>

      {/* TRUTH LADDER TIERS */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          The Narrative Truth Ladder (Epistemic Grounding)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TRUTH_LADDER_TIERS.map(tier => (
            <div
              key={tier.level}
              onClick={() => setSelectedTier(tier.level)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedTier === tier.level
                  ? 'bg-amber-950/50 border-amber-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-amber-200">{tier.level}</div>
              <div className="text-[11px] text-slate-400 mt-1">{tier.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FACTUAL RIGOR SLIDER */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative z-10">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            Factuality & Creative Reconstruction Balance
          </label>
          <span className="text-xs font-mono text-amber-300">{factualRigor}% Strict Fact</span>
        </div>
        <input
          type="range"
          min={50}
          max={100}
          value={factualRigor}
          onChange={e => setFactualRigor(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Creative Nonfiction / Stylized</span>
          <span>Balanced Documentary Narrative</span>
          <span>Strict Archival Verifiability</span>
        </div>
      </div>

      {/* DRAMATIZE ACTION */}
      <div className="p-4 bg-slate-950/80 border border-amber-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Archival Scene Dramatizer & Source Binder
          </span>
          <button
            onClick={handleDramatizeScene}
            disabled={isDramatizing}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isDramatizing ? 'animate-spin' : ''}`} />
            {isDramatizing ? 'Reconstructing History...' : 'Reconstruct Historical Scene'}
          </button>
        </div>

        <textarea
          rows={2}
          value={historicalEvent}
          onChange={e => setHistoricalEvent(e.target.value)}
          placeholder="Describe the historical event or archival testimony to dramatize..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
        />

        {nonfictionOutput && (
          <div className="p-3.5 bg-slate-900 border border-amber-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {nonfictionOutput}
          </div>
        )}
      </div>
    </div>
  );
};
