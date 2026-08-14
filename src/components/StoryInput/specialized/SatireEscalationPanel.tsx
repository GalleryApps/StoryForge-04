import React, { useState } from 'react';
import { Smile, Sparkles, Zap, Flame, ShieldAlert, ArrowRight, Check, RefreshCw, Layers } from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const SATIRE_TARGETS = [
  'Corporate Tech Messianism',
  'Bureaucratic Circular Procedures',
  'Academic Publish-or-Perish Feuds',
  'Political Partisan Hypocrisy',
  'Social Media Status Anxiety',
  'Wellness & Biohacking Fads',
  'Human Resources Speak & Corporate Buzzwords',
  'Consulting Firm Jargon & Slide Decks',
  'University Administrative Bloat',
  'Celebrity Philanthropy & Virtue Signaling',
  'Algorithmic Life Optimization',
  'Government Red Tape & Form 109-B',
];

const COMEDY_MECHANISMS = [
  'Incongruity & Contrast',
  'Malicious Compliance',
  'Deadpan Understatement',
  'Absurd Institutional Logic',
  'Running Gag Escalation',
  'Ironic Reversal',
  'Literal Interpretation',
  'Compounding Falsehoods',
  'Over-Complicated Solutions',
  'Sarcastic Bureaucratic Tone',
  'The Unflappable Straight Man',
  'Farce & Mistaken Identity',
  'Subversive Parody',
  'Disproportionate Reaction',
];

const ESCALATION_STAGES = [
  { stage: 1, name: 'Normal System', desc: 'The baseline mundane operating state.' },
  { stage: 2, name: 'Small Absurdity', desc: 'A tiny administrative glitch is codified into law.' },
  { stage: 3, name: 'Institutional Defense', desc: 'Four new committees are formed to manage the glitch.' },
  { stage: 4, name: 'Normalization', desc: 'Citizens treat the impossible rule as completely logical.' },
  { stage: 5, name: 'Malicious Compliance', desc: 'Employees follow the rule to its absolute literal ruin.' },
  { stage: 6, name: 'System Paralysis', desc: 'Contradictory rules bring all real work to a complete halt.' },
  { stage: 7, name: 'Farcical Summit', desc: 'The emergency conference collapses into farcical chaos.' },
  { stage: 8, name: 'The Ironic Punchline', desc: 'The new reform is even more preposterous than the original.' },
];

export const SatireEscalationPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedTargets, setSelectedTargets] = useState<string[]>([
    'Bureaucratic Circular Procedures',
    'Corporate Tech Messianism',
  ]);
  const [selectedMechanisms, setSelectedMechanisms] = useState<string[]>([
    'Malicious Compliance',
    'Deadpan Understatement',
    'Absurd Institutional Logic',
  ]);
  const [activeStage, setActiveStage] = useState<number>(2);

  const toggleTarget = (target: string) => {
    setSelectedTargets(prev =>
      prev.includes(target) ? prev.filter(t => t !== target) : [...prev, target]
    );
  };

  const toggleMechanism = (mech: string) => {
    setSelectedMechanisms(prev =>
      prev.includes(mech) ? prev.filter(m => m !== mech) : [...prev, mech]
    );
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Smile className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Satire & Comedy Studio Engine
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 uppercase">
                Irony & Absurdity
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Configure satire targets, comedic mechanisms, and the 8-stage escalation feedback loop.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDilemmaModal}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 transition flex items-center gap-2"
        >
          <Layers className="w-4 h-4" />
          Satirical Dilemma Chain
        </button>
      </div>

      {/* Satire Targets */}
      <div className="space-y-2 relative z-10">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Primary Satire Targets & Institutional Hypocrisies (Select All That Apply):
        </label>
        <div className="flex flex-wrap gap-2">
          {SATIRE_TARGETS.map(t => {
            const active = selectedTargets.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTarget(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border flex items-center gap-1.5 ${
                  active
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {active && <Check className="w-3 h-3 text-amber-400" />}
                <span>{t}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comedy Mechanisms */}
      <div className="space-y-2 relative z-10">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Comedy & Irony Mechanisms:
        </label>
        <div className="flex flex-wrap gap-2">
          {COMEDY_MECHANISMS.map(m => {
            const active = selectedMechanisms.includes(m);
            return (
              <button
                key={m}
                onClick={() => toggleMechanism(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border flex items-center gap-1.5 ${
                  active
                    ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {active && <Check className="w-3 h-3 text-indigo-400" />}
                <span>{m}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 8-Stage Escalation Visualizer */}
      <div className="space-y-3 pt-2 relative z-10">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          8-Stage Satirical Escalation Architecture
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ESCALATION_STAGES.map(s => {
            const isCurrent = activeStage === s.stage;
            return (
              <button
                key={s.stage}
                onClick={() => setActiveStage(s.stage)}
                className={`text-left p-3 rounded-xl border transition ${
                  isCurrent
                    ? 'bg-amber-950/50 border-amber-500 text-amber-200 ring-1 ring-amber-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  Stage {s.stage}
                </div>
                <div className="text-xs font-bold text-white mt-0.5 truncate">{s.name}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{s.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
