import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Zap,
  Layers,
  Flame,
  Sliders,
  Split,
  MessageCircle,
  Eye,
  Shield,
  Smile,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const ROMANTIC_TROPES = [
  { id: 'enemies_to_lovers', name: 'Enemies-to-Lovers & Rivalry', desc: 'Sharp cutting banter masking intense mutual fascination; competitive hostility melting into protective obsession.' },
  { id: 'fake_dating', name: 'Fake Dating / Convenience Pact', desc: 'Strict contractual boundaries repeatedly shattered by involuntary genuine emotional vulnerability.' },
  { id: 'forced_proximity', name: 'Forced Proximity & Trapped Together', desc: 'Snowbound in a remote cabin or sharing the single remaining hotel room with one bed.' },
  { id: 'second_chance', name: 'Second Chance & Unresolved History', desc: 'Years of lingering regret, unfinished conversations, and the agonizing rediscovery of old habits.' },
  { id: 'grumpy_sunshine', name: 'Grumpy & Sunshine Dynamic', desc: 'Cynical, battle-hardened protector captivated by an irrepressibly vibrant optimist.' },
  { id: 'forbidden_allegiance', name: 'Forbidden Cross-Faction Allegiance', desc: 'Duty vs desire; every stolen touch carries the risk of treason and social exile.' },
];

const EMOTIONAL_LIES = [
  { perspective: 'Lead A (The Cynic)', lie: '"If I let anyone truly see my flaws, they will use them to destroy my independence."' },
  { perspective: 'Lead B (The Martyr)', lie: '"I am only valuable when I am sacrificing my own happiness to fix everyone else’s problems."' },
];

const MICRO_TENSION_MOMENTS = [
  'Accidentally brushing knuckles while reaching for the same book',
  'Holding eye contact two seconds longer than polite society permits',
  'Removing a stray raindrop or lock of hair with trembling tenderness',
  'A tense whispered argument in a crowded elevator where neither can step back',
];

export const RomanceTensionStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedTrope, setSelectedTrope] = useState(ROMANTIC_TROPES[0].id);
  const [chemistryHeat, setChemistryHeat] = useState(85);
  const [selectedMoment, setSelectedMoment] = useState(MICRO_TENSION_MOMENTS[0]);
  const [blackMomentConflict, setBlackMomentConflict] = useState('Lead A discovers the original contract Lead B signed with their rival firm, believing the entire relationship was an orchestrated corporate trap.');
  const [isIgniting, setIsIgniting] = useState(false);
  const [romanceOutput, setRomanceOutput] = useState<string | null>(null);

  const handleIgniteTension = async () => {
    setIsIgniting(true);
    setRomanceOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'romance_drama',
          actionKey: 'ignite_romantic_chemistry',
          actionLabel: 'Ignite Romantic Chemistry & Banter',
          formData: {
            trope: selectedTrope,
            heatLevel: `${chemistryHeat}% Slow-Burn Tension`,
            microMoment: selectedMoment,
            blackMoment: blackMomentConflict,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setRomanceOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Romantic subtext and banter orchestrated.');
      } else {
        setRomanceOutput(`[ROMANTIC SLOW-BURN TENSION BLUEPRINT]\nTrope: ${selectedTrope} | Tension Index: ${chemistryHeat}%\n\n1. DUAL POV SUBTEXT & BANTER:\nLead A uses mockery to deflect from the fact that their hands are shaking. Lead B notices the tremor and steps forward instead of defending themselves.\n\n2. MICRO-MOMENT CHOREOGRAPHY:\n${selectedMoment}. The silence stretches until the ambient cafe noise fades into background white noise.\n\n3. THE BLACK MOMENT RESOLUTION:\nThe grand gesture is NOT a public spectacle—it is an act of total emotional surrender: Lead A hands over the single key to their private archive, saying, "If you ruin me, at least it was your choice."`);
      }
    } catch {
      setRomanceOutput(`[ROMANCE LAB]\nTrope: ${selectedTrope}\nHeat: ${chemistryHeat}%\nConflict: ${blackMomentConflict}`);
    } finally {
      setIsIgniting(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-pink-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300 shadow-md shadow-pink-500/10">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Romance & Emotional Tension Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-800 uppercase font-semibold">
                Slow-Burn Chemistry & Dual POV
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Trope dynamics, banter rhythm, emotional armor dismantling, and high-stakes vulnerability.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-pink-600/30 hover:bg-pink-600 text-pink-300 hover:text-white border border-pink-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Romance Dilemmas
          </button>
        </div>
      </div>

      {/* ROMANTIC TROPE MATRIX */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-pink-400" />
          Core Romantic Dynamic & Foundational Trope
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ROMANTIC_TROPES.map(trope => (
            <div
              key={trope.id}
              onClick={() => setSelectedTrope(trope.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedTrope === trope.id
                  ? 'bg-pink-950/50 border-pink-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-pink-200">{trope.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{trope.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EMOTIONAL LIES & TENSION DIAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Dual POV Protective Armor */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-pink-400" />
            The "Lie They Believe" (Emotional Armor)
          </label>
          <div className="space-y-2">
            {EMOTIONAL_LIES.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                <div className="text-[10px] font-mono text-pink-400 uppercase font-semibold">{item.perspective}</div>
                <div className="text-xs text-slate-200 mt-0.5 italic">{item.lie}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slow-Burn Tension Slider & Micro-Moment */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-pink-400" />
                Slow-Burn Chemistry & Banter Heat
              </label>
              <span className="text-xs font-mono text-pink-300">{chemistryHeat}% Intensity</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={chemistryHeat}
              onChange={e => setChemistryHeat(Number(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Torturous Yearning & Distance</span>
              <span>Loaded Verbal Banter</span>
              <span>Unbearable Physical Proximity</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Micro-Tension Touchpoint</label>
            <select
              value={selectedMoment}
              onChange={e => setSelectedMoment(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              {MICRO_TENSION_MOMENTS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* BANTER & GRAND GESTURE ENGINE */}
      <div className="p-4 bg-slate-950/80 border border-pink-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Slow-Burn Dialogue & Vulnerability Architect
          </span>
          <button
            onClick={handleIgniteTension}
            disabled={isIgniting}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isIgniting ? 'animate-spin' : ''}`} />
            {isIgniting ? 'Igniting Chemistry...' : 'Choreograph Banter & Subtext'}
          </button>
        </div>

        <textarea
          rows={2}
          value={blackMomentConflict}
          onChange={e => setBlackMomentConflict(e.target.value)}
          placeholder="Describe the Black Moment conflict or devastating misunderstanding..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-pink-500"
        />

        {romanceOutput && (
          <div className="p-3.5 bg-slate-900 border border-pink-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {romanceOutput}
          </div>
        )}
      </div>
    </div>
  );
};
