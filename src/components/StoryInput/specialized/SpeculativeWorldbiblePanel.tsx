import React, { useState } from 'react';
import { Sparkles, Cpu, Compass, ShieldCheck, Flame, BookOpen, Layers, Zap } from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  mode: 'science_fiction' | 'epic_fantasy';
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const SCI_FI_SPHERES = [
  'Astrophysics & FTL Travel Mechanics',
  'Cybernetics, AI & Neural Implants',
  'Planetary Ecology & Terraform Scarcity',
  'Galactic Trade & Post-Scarcity Economy',
  'Xenobiology & First Contact Protocols',
  'Quantum Computing & Chrono-Displacement',
  'Corporate Megastructures & Orbital Class Divide',
  'Transhumanism & Genetic Caste Systems',
];

const FANTASY_ELEMENTS = [
  'Hard vs. Soft Magic Conservation Laws',
  'The Cost & Biological Toll of Spellcasting',
  'Ancient Pantheons & Dead God Relics',
  'Feudal Royal Dynasties & Bloodline Pacts',
  'Forbidden Thaumaturgy & Corruption',
  'Mythic Geography, Portals & Ley Lines',
  'Prophecies with Double-Edged Meanings',
  'Monster Ecology & Alchemical Reagents',
];

export const SpeculativeWorldbiblePanel: React.FC<Props> = ({ mode, onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedSpheres, setSelectedSpheres] = useState<string[]>([
    mode === 'science_fiction' ? SCI_FI_SPHERES[0] : FANTASY_ELEMENTS[0],
    mode === 'science_fiction' ? SCI_FI_SPHERES[1] : FANTASY_ELEMENTS[1],
  ]);

  const toggleSphere = (item: string) => {
    setSelectedSpheres(prev =>
      prev.includes(item) ? prev.filter(s => s !== item) : [...prev, item]
    );
  };

  return (
    <div
      className={`space-y-6 bg-slate-900/90 border rounded-2xl p-6 shadow-xl relative overflow-hidden ${
        mode === 'science_fiction' ? 'border-cyan-500/30' : 'border-purple-500/30'
      }`}
    >
      <div
        className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          mode === 'science_fiction' ? 'bg-cyan-500/10' : 'bg-purple-500/10'
        }`}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
              mode === 'science_fiction'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
                : 'bg-purple-500/20 border border-purple-500/40 text-purple-400'
            }`}
          >
            {mode === 'science_fiction' ? <Cpu className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {mode === 'science_fiction'
                  ? 'Sci-Fi Worldbuilding & Tech Bible Studio'
                  : 'Epic Fantasy Magic System & World Bible'}
              </h3>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                  mode === 'science_fiction'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'bg-purple-950 text-purple-300 border border-purple-800'
                }`}
              >
                {mode === 'science_fiction' ? 'Speculative Rules' : 'Magic & Pantheons'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {mode === 'science_fiction'
                ? 'Define hard science rules, technology constraints, and societal consequences.'
                : 'Formulate magic costs, ancient dynasties, mythic relics, and prophecy mechanics.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDilemmaModal}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
            mode === 'science_fiction'
              ? 'bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40'
              : 'bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/40'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {mode === 'science_fiction' ? 'Sci-Fi Dilemma Engine' : 'Epic Quest Dilemmas'}
        </button>
      </div>

      {/* Worldbuilding Spheres */}
      <div className="space-y-2 relative z-10">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          {mode === 'science_fiction'
            ? 'Core Worldbuilding Spheres & Technologies:'
            : 'Core Magic & Lore Pillars:'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(mode === 'science_fiction' ? SCI_FI_SPHERES : FANTASY_ELEMENTS).map(item => {
            const active = selectedSpheres.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggleSphere(item)}
                className={`text-left p-2.5 rounded-xl border text-xs font-medium transition ${
                  active
                    ? mode === 'science_fiction'
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500'
                      : 'bg-purple-950/60 border-purple-500 text-purple-200 ring-1 ring-purple-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
