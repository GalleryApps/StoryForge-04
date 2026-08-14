import React, { useState } from 'react';
import { Search, ShieldAlert, AlertTriangle, CheckCircle2, Plus, Trash2, Key, Eye, Layers } from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Suspect {
  id: string;
  name: string;
  relation: string;
  motive: string;
  opportunity: string;
  means: string;
  secret: string;
  alibi: string;
  isGuilty: boolean;
}

interface Clue {
  id: string;
  description: string;
  location: string;
  type: 'true_clue' | 'red_herring' | 'hidden_detail';
  pointsTo: string;
}

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const MYSTERY_SETUPS = [
  'Locked Room Murder in High-Security Penthouse',
  'Poisoned Wine at an Exclusive Family Will Reading',
  'The Stolen Manuscript from Sealed Vault',
  'Vanishing Passenger on a Moving Express Train',
  'The Staged Suicide on the Lighthouse Cliff',
  'The Impossible Alibi (Suspect in Two Places at Once)',
  'The Cold Case Resurfaced by Anonymous Letter',
  'The Museum Heist During Blackout',
  'The Double Murder with Contradictory Weapons',
  'The Secret Society Execution',
];

export const MysteryClueMatrixPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedSetup, setSelectedSetup] = useState<string>(MYSTERY_SETUPS[0]);
  const [fairPlayMode, setFairPlayMode] = useState<boolean>(true);

  const [suspects, setSuspects] = useState<Suspect[]>([
    {
      id: '1',
      name: 'Victoria Vance',
      relation: 'Business Partner',
      motive: 'Embezzlement about to be uncovered',
      opportunity: 'Left meeting at 8:15 PM for "phone call"',
      means: 'Access to the private study keycard',
      secret: 'Secretly insolvent',
      alibi: 'Claims she was speaking with her lawyer',
      isGuilty: true,
    },
    {
      id: '2',
      name: 'Julian Croft',
      relation: 'Disinherited Nephew',
      motive: 'Desperate for inheritance to pay gambling debts',
      opportunity: 'Seen wandering the garden terrace at 8:20 PM',
      means: 'Pocket knife found with victim’s blood',
      secret: 'Met with a blackmailer earlier that afternoon',
      alibi: 'Claims he was smoking outside alone',
      isGuilty: false,
    },
    {
      id: '3',
      name: 'Dr. Clara Thorne',
      relation: 'Personal Physician',
      motive: 'Victim threatened to expose falsified clinical trial',
      opportunity: 'Administered evening medication at 7:45 PM',
      means: 'Medical knowledge of rare botanical toxins',
      secret: 'Forged her medical credentials 10 years ago',
      alibi: 'Was in the conservatory reviewing patient files',
      isGuilty: false,
    },
  ]);

  const [clues, setClues] = useState<Clue[]>([
    {
      id: 'c1',
      description: 'Slightly scuffed copper keycard found behind the radiator',
      location: 'Private Study',
      type: 'true_clue',
      pointsTo: 'Victoria Vance',
    },
    {
      id: 'c2',
      description: 'Bloody handkerchief with Julian Croft’s embroidered initials',
      location: 'Garden Terrace',
      type: 'red_herring',
      pointsTo: 'Julian Croft (Planted / Cut his finger)',
    },
    {
      id: 'c3',
      description: 'Grandfather clock stopped precisely at 8:17 PM due to broken pendulum spring',
      location: 'Study Mantelpiece',
      type: 'hidden_detail',
      pointsTo: 'Proves crime occurred before 8:20 PM',
    },
  ]);

  return (
    <div className="space-y-6 bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Mystery, Detective & Fair-Play Engine
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 uppercase">
                Clues & Deduction Matrix
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Manage suspect motives, alibis, red herrings, and strict fair-play deduction compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFairPlayMode(!fairPlayMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
              fairPlayMode
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Fair-Play Mode: {fairPlayMode ? 'ACTIVE' : 'OFF'}
          </button>
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 border border-sky-500/40 transition flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            Mystery Dilemmas
          </button>
        </div>
      </div>

      {/* Mystery Setup Selector */}
      <div className="space-y-2 relative z-10">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Select Crime Archetype & Setup:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MYSTERY_SETUPS.slice(0, 6).map(setup => (
            <button
              key={setup}
              onClick={() => setSelectedSetup(setup)}
              className={`text-left p-2.5 rounded-lg text-xs font-medium border transition ${
                selectedSetup === setup
                  ? 'bg-sky-950/50 border-sky-500 text-sky-200 ring-1 ring-sky-500'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {setup}
            </button>
          ))}
        </div>
      </div>

      {/* Suspect Matrix */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Suspect Matrix ({suspects.length} Suspects Tracked)
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {suspects.map((s, idx) => (
            <div
              key={s.id}
              className={`p-4 rounded-xl border space-y-2.5 relative ${
                s.isGuilty
                  ? 'bg-slate-950/90 border-sky-500/40 shadow-md'
                  : 'bg-slate-950 border-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{s.name}</h4>
                  <span className="text-[11px] text-sky-400 font-mono">{s.relation}</span>
                </div>
                {s.isGuilty && (
                  <span className="text-[9px] font-mono uppercase bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800">
                    True Culprit
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div><span className="text-slate-500 font-mono">Motive:</span> {s.motive}</div>
                <div><span className="text-slate-500 font-mono">Means:</span> {s.means}</div>
                <div><span className="text-slate-500 font-mono">Alibi:</span> {s.alibi}</div>
                <div><span className="text-slate-500 font-mono">Secret:</span> {s.secret}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clue Board & Red Herrings */}
      <div className="space-y-3 relative z-10 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Clue Board & Red Herring Ledger
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {clues.map(c => (
            <div
              key={c.id}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">{c.location}</span>
                <span
                  className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                    c.type === 'true_clue'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : c.type === 'red_herring'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                  }`}
                >
                  {c.type.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs font-semibold text-white">{c.description}</p>
              <p className="text-[11px] text-sky-400 font-mono">Significance: {c.pointsTo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
