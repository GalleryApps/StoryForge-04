import React, { useState } from 'react';
import { Clock, Heart, Skull, Feather, Flame, AlertTriangle, Layers, ShieldCheck, Zap } from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  mode: 'suspense_thriller' | 'craft_writing_manual' | 'romance_drama' | 'horror_supernatural';
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

export const DramaticTensionPanel: React.FC<Props> = ({ mode, onExecuteTool, onOpenDilemmaModal }) => {
  const [tickingHours, setTickingHours] = useState<number>(24);
  const [threatLevel, setThreatLevel] = useState<string>('Severe / Immediate Catastrophe');

  return (
    <div className="space-y-6 bg-slate-900/90 border border-rose-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            {mode === 'suspense_thriller' && <Clock className="w-5 h-5" />}
            {mode === 'craft_writing_manual' && <Feather className="w-5 h-5" />}
            {mode === 'romance_drama' && <Heart className="w-5 h-5" />}
            {mode === 'horror_supernatural' && <Skull className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {mode === 'suspense_thriller' && 'Suspense & Ticking Clock Studio'}
                {mode === 'craft_writing_manual' && 'Craft Masterclass & 7-Level Dilemma Lab'}
                {mode === 'romance_drama' && 'Romance & Emotional Arc Studio'}
                {mode === 'horror_supernatural' && 'Horror Escalation & Dread Studio'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                {mode.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {mode === 'suspense_thriller' && 'Configure tight deadlines, irreversible consequences, and escalating paranoia.'}
              {mode === 'craft_writing_manual' && 'Execute writing masterclasses, deliberate practice drills, and 7-level progressive dilemmas.'}
              {mode === 'romance_drama' && 'Track relationship bibles, vulnerabilities, secrets, and the 9-stage emotional arc.'}
              {mode === 'horror_supernatural' && 'Manage the 8 stages of dread, uncanny rules, and psychological isolation.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDilemmaModal}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 transition flex items-center gap-1.5"
        >
          <Layers className="w-3.5 h-3.5" />
          {mode === 'craft_writing_manual' ? '7-Level Craft Dilemma' : 'Tension Dilemma Chain'}
        </button>
      </div>

      {/* Mode-specific content */}
      {mode === 'suspense_thriller' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Ticking Clock Timeframe
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="72"
                value={tickingHours}
                onChange={e => setTickingHours(Number(e.target.value))}
                className="flex-1 accent-rose-500"
              />
              <span className="font-mono text-sm font-bold text-rose-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {tickingHours} Hours
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Time remaining before catastrophic consequence triggers.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Threat Consequence Severity
            </label>
            <div className="text-xs font-bold text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
              {threatLevel}
            </div>
            <p className="text-[11px] text-slate-400">Irreversible fallout if protagonist fails or surrenders.</p>
          </div>
        </div>
      )}

      {mode === 'craft_writing_manual' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">Module 1</span>
            <div className="text-xs font-bold text-white">Scene Architecture & Micro-Tension</div>
            <p className="text-[11px] text-slate-400">Every beat must alter the character's relative leverage.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">Module 2</span>
            <div className="text-xs font-bold text-white">Subtext & Unspoken Motives</div>
            <p className="text-[11px] text-slate-400">What is said vs. what is meant vs. what is feared.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">Module 3</span>
            <div className="text-xs font-bold text-white">7-Level Dilemma Progression</div>
            <p className="text-[11px] text-slate-400">Micro-friction escalating to existential narrative collapse.</p>
          </div>
        </div>
      )}

      {mode === 'romance_drama' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
          {['1. Attraction Spark', '2. Reluctant Alliance', '3. Secret Shared', '4. False Security', '5. Deep Betrayal / Rift', '6. The Grand Gesture', '7. Earned Union'].map((stg, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[10px] font-mono text-pink-400 font-bold">Stage {i + 1}</span>
              <div className="font-semibold text-slate-200 mt-0.5">{stg.split('. ')[1]}</div>
            </div>
          ))}
        </div>
      )}

      {mode === 'horror_supernatural' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
          {['1. Baseline Normality', '2. Uncanny Glitch', '3. Rationalization Failure', '4. Isolation & Containment', '5. First Direct Encounter', '6. Psychological Collapse', '7. Sacrificial Stand'].map((stg, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[10px] font-mono text-rose-400 font-bold">Phase {i + 1}</span>
              <div className="font-semibold text-slate-200 mt-0.5">{stg.split('. ')[1]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
