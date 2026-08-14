import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  Zap,
  Layers,
  AlertTriangle,
  ShieldAlert,
  Sliders,
  Eye,
  Lock,
  Activity,
  Bomb,
  Radio,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const TICKING_CLOCK_TYPES = [
  { id: 'lethal_countdown', name: 'Lethal Biochemical Countdown', desc: 'A slow-acting neurotoxin or bomb detonation set to 48 hours with no antidote in sight.' },
  { id: 'closing_perimeter', name: 'Evaporating Borders & Manhunt', desc: 'Police barricades closing in block by block; safe houses systematically compromised.' },
  { id: 'deadline_blackmail', name: 'Extortion Drop & Hostage Clock', desc: 'A secret payload or confession must be delivered before midnight or catastrophic leaks occur.' },
  { id: 'approaching_storm', name: 'Natural Isolation & Approaching Tempest', desc: 'The ferry is the last one off the island before a category 5 hurricane cuts power.' },
];

const ASYMMETRIC_KNOWLEDGE = [
  { perspective: 'What the Reader Knows', fact: 'The killer is hiding in the attic directly above the bedroom with a wiretap active.' },
  { perspective: 'What the Hunter Knows', fact: 'The protagonist has hidden the encrypted USB drive inside a vintage hollow book.' },
  { perspective: 'What the Protagonist Believes', fact: 'The chief of police is their trusted ally and on the way to rescue them.' },
];

const PARANOIA_TRIGGERS = [
  'Phone calls echoing with faint audio latency clicks',
  'A misplaced set of spare keys found in the hallway',
  'The trusted mentor subtly repeating a phrase only the blackmailer knew',
  'A stranger sitting in a parked car across the street with wipers off in heavy rain',
];

export const SuspenseThrillerStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedClock, setSelectedClock] = useState(TICKING_CLOCK_TYPES[0].id);
  const [urgencyLevel, setUrgencyLevel] = useState(90);
  const [activeParanoia, setActiveParanoia] = useState(PARANOIA_TRIGGERS[2]);
  const [cliffhangerBeat, setCliffhangerBeat] = useState('The protagonist opens the secure locker to find it empty, except for a fresh Polaroid of them opening the locker taken 10 seconds ago.');
  const [isEscalating, setIsEscalating] = useState(false);
  const [suspenseOutput, setSuspenseOutput] = useState<string | null>(null);

  const handleEscalateSuspense = async () => {
    setIsEscalating(true);
    setSuspenseOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'suspense_thriller',
          actionKey: 'escalate_ticking_clock',
          actionLabel: 'Escalate Suspense & Tighten Clock',
          formData: {
            tickingClock: selectedClock,
            urgencyScore: `${urgencyLevel}% Heart Rate`,
            paranoiaTrigger: activeParanoia,
            cliffhanger: cliffhangerBeat,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setSuspenseOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Tension escalated and escape routes cut.');
      } else {
        setSuspenseOutput(`[TICKING CLOCK ESCALATION REPORT]\nUrgency: ${urgencyLevel}% | Deadline Mechanism: ${selectedClock}\n\n1. ASYMMETRIC TENSION SURGE:\nThe hunter is already aware the locker is compromised. The Polaroid isn't just a threat—it's a trigger for the building's magnetic fire doors to lock down.\n\n2. ESCAPE ROUTE EVAPORATION:\nElevators are dead. The basement exit is flooded. The only path forward is the service stairwell where the security cameras have just turned off one by one.\n\n3. MORAL COMPROMISE CHECK:\nTo disable the alarm, the protagonist must cut the emergency generator supporting the adjoining hospital wing. 90 seconds to decide.`);
      }
    } catch {
      setSuspenseOutput(`[SUSPENSE ANALYSIS]\nClock: ${selectedClock}\nUrgency: ${urgencyLevel}%\nCliffhanger: ${cliffhangerBeat}`);
    } finally {
      setIsEscalating(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-orange-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/30 to-red-500/20 border border-orange-500/40 flex items-center justify-center text-orange-300 shadow-md shadow-orange-500/10">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Suspense & Ticking Clock Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-800 uppercase font-semibold">
                Relentless Pressure & Asymmetric Threat
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaporating escape routes, paranoia vectors, asymmetric reader knowledge, and lethal countdowns.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-orange-600/30 hover:bg-orange-600 text-orange-300 hover:text-white border border-orange-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Thriller Dilemmas
          </button>
        </div>
      </div>

      {/* TICKING CLOCK ARCHITECTURE */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-orange-300 uppercase tracking-wider flex items-center gap-1.5">
          <Bomb className="w-3.5 h-3.5 text-orange-400" />
          The Unforgiving Ticking Clock Mechanism
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {TICKING_CLOCK_TYPES.map(clock => (
            <div
              key={clock.id}
              onClick={() => setSelectedClock(clock.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedClock === clock.id
                  ? 'bg-orange-950/50 border-orange-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-orange-200">{clock.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{clock.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ASYMMETRIC KNOWLEDGE & PARANOIA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Asymmetric Information Matrix */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-orange-300 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-orange-400" />
            Asymmetric Information Cross-Check
          </label>
          <div className="space-y-2">
            {ASYMMETRIC_KNOWLEDGE.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                <div className="text-[10px] font-mono text-orange-400 uppercase font-semibold">{item.perspective}</div>
                <div className="text-xs text-slate-200 mt-0.5">{item.fact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Paranoia & Pressure Slider */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-orange-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-orange-400" />
                Claustrophobic Pressure Gauge
              </label>
              <span className="text-xs font-mono text-orange-300">{urgencyLevel}% Heart Rate</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={urgencyLevel}
              onChange={e => setUrgencyLevel(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Simmering Unease</span>
              <span>Constricting Net</span>
              <span>Maximum Panic & Suffocation</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Active Paranoia Vector</label>
            <select
              value={activeParanoia}
              onChange={e => setActiveParanoia(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            >
              {PARANOIA_TRIGGERS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CLIFFHANGER TIGHTENING ENGINE */}
      <div className="p-4 bg-slate-950/80 border border-orange-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-400" />
            Chapter-End Cliffhanger & Trap Tightener
          </span>
          <button
            onClick={handleEscalateSuspense}
            disabled={isEscalating}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isEscalating ? 'animate-spin' : ''}`} />
            {isEscalating ? 'Tightening Noose...' : 'Escalate Suspense & Cut Exits'}
          </button>
        </div>

        <textarea
          rows={2}
          value={cliffhangerBeat}
          onChange={e => setCliffhangerBeat(e.target.value)}
          placeholder="Describe the current cliffhanger or confrontation..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
        />

        {suspenseOutput && (
          <div className="p-3.5 bg-slate-900 border border-orange-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {suspenseOutput}
          </div>
        )}
      </div>
    </div>
  );
};
