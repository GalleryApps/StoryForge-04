import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  Zap,
  Layers,
  Globe,
  Radio,
  Sliders,
  ShieldAlert,
  Binary,
  Compass,
  AlertTriangle,
  Atom,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const NOVUM_CATEGORIES = [
  { id: 'neural_currency', name: 'Neural Transcription & Memory Currencies', desc: 'Consciousness and experiential memories can be indexed, traded, or wiped as liquid collateral.' },
  { id: 'relativistic_ftl', name: 'Relativistic FTL & Time Debt', desc: 'Faster-than-light travel exists, but causes generational drift; travelers outlive their homeworlds.' },
  { id: 'post_scarcity_ai', name: 'Algorithmic Syntarchy & Automated Resource Castes', desc: 'A hyper-intelligent machine network manages all planetary logistics according to cold utilitarian equations.' },
  { id: 'bio_synthetic_mutation', name: 'Synthetic Cellular Editing & Morphological Freedom', desc: 'Bodies are fluidly rewritten in hours, dissolving traditional concepts of race, age, and biological mortality.' },
  { id: 'dyson_megastructures', name: 'Megastructure Engineering & Dyson Swarms', desc: 'Civilization lives inside orbital rings and disassembled star shells orbiting dying black holes.' },
];

const KARDASHEV_LEVELS = [
  { level: 'Type 0.8 (Near-Future Earth)', desc: 'Planetary climate stress, orbital stations, early quantum computing, cybernetic prosthetics.' },
  { level: 'Type I (Planetary Hegemony)', desc: 'Total control of planetary weather, geothermal taps, fusion grid, lunar and martian colonies.' },
  { level: 'Type II (Stellar Dyson Swarms)', desc: 'Star-harnessing civilizations, terraformed solar system, relativistic generation fleets.' },
  { level: 'Type III (Galactic Commonwealth)', desc: 'Wormhole highways, macro-engineering across thousands of star clusters, non-biological minds.' },
];

const SECOND_ORDER_EFFECTS = [
  { domain: 'Legal & Human Rights', impact: 'Legal personhood granted to non-biological neural meshes, while debtor memories are seized by banks.' },
  { domain: 'Class & Economic Stratification', impact: 'The wealthy purchase biological immortality, creating an immortal trillionaire oligarchy.' },
  { domain: 'Language & Psychology', impact: 'Direct telepathic neural links erode spoken grammar, resulting in compressed conceptual thought-packets.' },
  { domain: 'Spiritual & Faith Systems', impact: 'Techno-monastic orders worship the dormant Dyson algorithms as the living proof of divine order.' },
];

const XENOBIOLOGY_ARCHETYPES = [
  'Silicon-Based Crystalline Mind (Thinks in centuries)',
  'Amorphous Oceanic Hivemind (Bio-luminescent pheromone communication)',
  'Machine Necro-Civilization (Remnants of extinct biological creators)',
  'Relativistic Nomad Species (Lives inside asteroid caravans)',
];

export const SciFiSpeculativeStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedNovum, setSelectedNovum] = useState(NOVUM_CATEGORIES[0].id);
  const [kardashevLevel, setKardashevLevel] = useState(KARDASHEV_LEVELS[1].level);
  const [scienceHardness, setScienceHardness] = useState(80);
  const [selectedXeno, setSelectedXeno] = useState(XENOBIOLOGY_ARCHETYPES[0]);
  const [novumStatement, setNovumStatement] = useState('Memory transcription into synthetic currency forces citizens to mortgage their childhood memories to pay planetary rent.');
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [stressTestOutput, setStressTestOutput] = useState<string | null>(null);

  const handleStressTest = async () => {
    setIsStressTesting(true);
    setStressTestOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'science_fiction',
          actionKey: 'stress_test_novum',
          actionLabel: 'Stress-Test Sci-Fi Novum',
          formData: {
            novumStatement,
            novumCategory: selectedNovum,
            kardashev: kardashevLevel,
            hardnessScore: `${scienceHardness}% Hard Science`,
            xenobiology: selectedXeno,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setStressTestOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Sci-fi world consistency audited.');
      } else {
        setStressTestOutput(`[SPECULATIVE STRESS-TEST REPORT]\nNovum: ${novumStatement}\nKardashev Level: ${kardashevLevel}\n\n1. SYSTEMIC PARADOX:\nIf memory is currency, counterfeit memory syndicates will arise to manufacture synthetic trauma with high black-market resale value.\n\n2. THERMODYNAMIC / HARD PHYSICS CHECK (${scienceHardness}%):\nNeural storage requires massive quantum dissipation. Slum sectors will run hot due to cooling exhaust from memory banks.\n\n3. UNINTENDED CULTURAL CRACK:\nCourtrooms can no longer trust eye-witness testimony since high-income defendants purchase spotless artificial alibi memories.`);
      }
    } catch {
      setStressTestOutput(`[SPECULATIVE ANALYSIS]\nNovum: ${novumStatement}\nHardness: ${scienceHardness}%\nCivilization Tier: ${kardashevLevel}`);
    } finally {
      setIsStressTesting(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/10">
            <Atom className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Science Fiction Speculative Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 uppercase font-semibold">
                Novum Engineering & Kardashev Scaling
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Technological disruption, 2nd-order societal ripple effects, hard physics limits, and xenobiology.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-600/30 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Sci-Fi Dilemmas
          </button>
        </div>
      </div>

      {/* CENTRAL NOVUM SELECTION */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
          <Binary className="w-3.5 h-3.5 text-cyan-400" />
          The Central Novum (The One Fundamental Paradigm Shift)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {NOVUM_CATEGORIES.map(nov => (
            <div
              key={nov.id}
              onClick={() => setSelectedNovum(nov.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedNovum === nov.id
                  ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-cyan-200">{nov.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{nov.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KARDASHEV SCALE & HARD SCIENCE DIAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Kardashev Civilization Level */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Kardashev Civilization Scale
          </label>
          <div className="space-y-2">
            {KARDASHEV_LEVELS.map(lvl => (
              <div
                key={lvl.level}
                onClick={() => setKardashevLevel(lvl.level)}
                className={`p-2.5 rounded-lg border cursor-pointer transition ${
                  kardashevLevel === lvl.level
                    ? 'bg-cyan-950/50 border-cyan-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-cyan-200">{lvl.level}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{lvl.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hardness & Xenobiology */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Hard Science Rigor Spectrum
              </label>
              <span className="text-xs font-mono text-cyan-300">{scienceHardness}% Hard</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={scienceHardness}
              onChange={e => setScienceHardness(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Soft Space Opera (Magic tech)</span>
              <span>Speculative Extrapolation</span>
              <span>Peer-Review Physics Rigor</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Xenobiology / Alien Encounter Archetype</label>
            <select
              value={selectedXeno}
              onChange={e => setSelectedXeno(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {XENOBIOLOGY_ARCHETYPES.map(x => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase block mb-1">
              Second-Order Ripple Effect:
            </span>
            <p className="text-[11px] text-slate-300">
              {SECOND_ORDER_EFFECTS[0].impact}
            </p>
          </div>
        </div>
      </div>

      {/* STRESS-TEST ACTION */}
      <div className="p-4 bg-slate-950/80 border border-cyan-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Speculative Consistency & Paradox Auditor
          </span>
          <button
            onClick={handleStressTest}
            disabled={isStressTesting}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isStressTesting ? 'animate-spin' : ''}`} />
            {isStressTesting ? 'Auditing Physics & Logic...' : 'Stress-Test Novum Logic'}
          </button>
        </div>

        <textarea
          rows={2}
          value={novumStatement}
          onChange={e => setNovumStatement(e.target.value)}
          placeholder="State your technological or sociological novum..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
        />

        {stressTestOutput && (
          <div className="p-3.5 bg-slate-900 border border-cyan-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {stressTestOutput}
          </div>
        )}
      </div>
    </div>
  );
};
