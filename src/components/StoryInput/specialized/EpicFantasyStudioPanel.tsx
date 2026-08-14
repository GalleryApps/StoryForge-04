import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  Zap,
  Layers,
  Shield,
  Crown,
  Scroll,
  Sliders,
  Feather,
  Compass,
  AlertCircle,
  Gem,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const MAGIC_SOURCES = [
  { id: 'thermodynamic_exchange', name: 'Thermal & Kinetic Equal Exchange', cost: 'Casting intense fire draws ambient heat directly from the caster’s internal organs, risking rapid hypothermia.' },
  { id: 'mnemonic_fuel', name: 'Mnemonic Sacrifice (Memory as Fuel)', cost: 'Every spell burns away an irreplaceable personal memory; powerful archmages forget their own childhood and family names.' },
  { id: 'bloodline_purity', name: 'Alchemical Blood Tithe', cost: 'Magic exists as an infectious heavy metal in bloodlines; excessive sorcery causes crystalline calcification of the veins.' },
  { id: 'divine_oath_binding', name: 'Inflexible Divine Compacts', cost: 'Power is leased from sleeping titans; breaking a single moral stricture causes immediate cataclysmic soul implosion.' },
  { id: 'linguistic_true_names', name: 'Primeval True-Name Resonance', cost: 'Speaking the true name of an element or creature vibrates the speaker’s vocal cords to the threshold of permanent muteness.' },
];

const DYNASTIC_FACTIONS = [
  { house: 'House Vael-Morr (The Obsidian Falcon)', motto: '"In Silence, We Endure"', flaw: 'Dynastic inbreeding and a hidden vault of forbidden necromancy.' },
  { house: 'The Sun-Forged Regency', motto: '"Unbroken by Winter"', flaw: 'Religious fanaticism and deep debt to maritime banking cartels.' },
  { house: 'The Pale Marsh Coven', motto: '"Roots Drink Deepest"', flaw: 'Bound to an ancient bog demon demanding yearly royal sacrifices.' },
];

const ANCIENT_BETRAYALS = [
  'The Creator God was murdered by the first mortal kings and buried beneath the capital city.',
  'The sacred holy order was founded by the very warlord they claim to have defeated.',
  'The protective barrier keeping out the dark wilderness is actually a cage keeping humanity trapped for harvesting.',
];

export const EpicFantasyStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedMagicSource, setSelectedMagicSource] = useState(MAGIC_SOURCES[0].id);
  const [magicHardness, setMagicHardness] = useState(85);
  const [selectedHouse, setSelectedHouse] = useState(DYNASTIC_FACTIONS[0].house);
  const [activeBetrayal, setActiveBetrayal] = useState(ANCIENT_BETRAYALS[0]);
  const [prophecyText, setProphecyText] = useState('"When the red star weeps upon the twin crowns, the true heir shall drown the kingdom in light."');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [loreOutput, setLoreOutput] = useState<string | null>(null);

  const handleSubvertProphecy = async () => {
    setIsSynthesizing(true);
    setLoreOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'epic_fantasy',
          actionKey: 'subvert_fantasy_prophecy',
          actionLabel: 'Subvert Ancient Prophecy & Magic Rules',
          formData: {
            prophecy: prophecyText,
            magicSystem: selectedMagicSource,
            hardness: `${magicHardness}% Hard Magic (Sanderson Rules)`,
            dynasty: selectedHouse,
            ancientBetrayal: activeBetrayal,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setLoreOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Prophecy subversion and lore system engineered.');
      } else {
        setLoreOutput(`[EPIC FANTASY LORE & PROPHECY SUBVERSION]\n\n1. THE SURFACE READING:\nThe common folk believe the "true heir" will vanquish the dark tyrant and bring glorious sunlit peace.\n\n2. THE DEVASTATING SUBVERSION:\n"Drown the kingdom in light" literally means the heir's blood awakens the sleeping solar titan buried beneath the throne room, incinerating both armies into glass ash.\n\n3. MAGIC COST & THERMODYNAMIC INTEGRATION (${magicHardness}% Hardness):\nThe magic requires equal heat exchange. To summon the final solar flame, the heir must freeze their own heart solid, turning into a living statue of ice at the climax.`);
      }
    } catch {
      setLoreOutput(`[LORE DECREE]\nProphecy: ${prophecyText}\nMagic Source: ${selectedMagicSource}\nFaction: ${selectedHouse}`);
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-md shadow-amber-500/10">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Epic Fantasy & Worldbuilding Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 uppercase font-semibold">
                Hard Magic Thermodynamics & Dynastic Lore
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Sanderson-level magic constraints, visceral physical costs, ambiguous prophecies, and noble house intrigues.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Fantasy Dilemmas
          </button>
        </div>
      </div>

      {/* HARD MAGIC THERMODYNAMICS */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Magic System Source & Visceral Cost
          </label>
          <span className="text-[11px] text-slate-400">Sanderson's First Law: Limitations &gt; Powers</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {MAGIC_SOURCES.map(source => (
            <div
              key={source.id}
              onClick={() => setSelectedMagicSource(source.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedMagicSource === source.id
                  ? 'bg-amber-950/50 border-amber-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-amber-200">{source.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{source.cost}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DYNASTIES & ANCIENT BETRAYAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Noble Houses & Heraldry */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            Noble Houses & Secret Dynastic Flaws
          </label>
          <div className="space-y-2">
            {DYNASTIC_FACTIONS.map(fac => (
              <div
                key={fac.house}
                onClick={() => setSelectedHouse(fac.house)}
                className={`p-2.5 rounded-lg border cursor-pointer transition ${
                  selectedHouse === fac.house
                    ? 'bg-amber-950/50 border-amber-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-200">{fac.house}</span>
                  <span className="text-[10px] font-serif italic text-slate-400">{fac.motto}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Flaw: {fac.flaw}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ancient Betrayal & Hardness Dial */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Magic Rule Rigidity (Hard vs Soft)
              </label>
              <span className="text-xs font-mono text-amber-300">{magicHardness}% Hard</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={magicHardness}
              onChange={e => setMagicHardness(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Soft Mythic Wonder (Tolkien)</span>
              <span>Balanced Arcana</span>
              <span>Strict Hard Laws (Sanderson)</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">The Ancient Mythic Betrayal</label>
            <select
              value={activeBetrayal}
              onChange={e => setActiveBetrayal(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {ANCIENT_BETRAYALS.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* PROPHECY SUBVERSION ENGINE */}
      <div className="p-4 bg-slate-950/80 border border-amber-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Prophecy & Climax Subversion Architect
          </span>
          <button
            onClick={handleSubvertProphecy}
            disabled={isSynthesizing}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
            {isSynthesizing ? 'Subverting Prophecy...' : 'Subvert Prophecy & Climax'}
          </button>
        </div>

        <textarea
          rows={2}
          value={prophecyText}
          onChange={e => setProphecyText(e.target.value)}
          placeholder="Enter the sacred prophecy or ancient legend..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
        />

        {loreOutput && (
          <div className="p-3.5 bg-slate-900 border border-amber-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {loreOutput}
          </div>
        )}
      </div>
    </div>
  );
};
