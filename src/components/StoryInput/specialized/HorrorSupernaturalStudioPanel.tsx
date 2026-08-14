import React, { useState } from 'react';
import {
  Skull,
  Sparkles,
  Zap,
  Layers,
  Eye,
  Sliders,
  AlertOctagon,
  Moon,
  VolumeX,
  Ghost,
  ShieldOff,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const ENTITY_MANIFESTATIONS = [
  { id: 'mimic_entity', name: 'The Voice Mimic & Doppelgänger', desc: 'Preys on empathy; speaks in the voices of missing loved ones from behind locked doors.' },
  { id: 'spatial_bleed', name: 'Non-Euclidean Spatial Corruption', desc: 'The architecture warps; hallways stretch infinitely; doors lead back into the room you just fled.' },
  { id: 'ancestral_parasite', name: 'Generational Blood Parasite', desc: 'Inherited physical decay that slowly replaces the host’s consciousness with an ancient ancestor.' },
  { id: 'cosmic_indifference', name: 'Eldritch Void & Cosmic Madness', desc: 'A vast, uncaring celestial entity whose mere observation disintegrates human logic.' },
];

const DREAD_LEVELS = [
  { stage: '1. Atmospheric Unease', desc: 'Unseasonable cold, dying batteries, faint scratching inside drywall.' },
  { stage: '2. The Subtle Wrongness', desc: 'Family photographs show an extra face standing in the background trees.' },
  { stage: '3. Paralyzing Dread', desc: 'Realization that the rules of physics and biology no longer apply in this house.' },
  { stage: '4. Visceral Terror', desc: 'Direct physical confrontation and body horror manifestation.' },
  { stage: '5. Abjection & Oblivion', desc: 'Total collapse of the protagonist’s sanity; cosmic despair.' },
];

const SENSORY_DECAYS = [
  'Odor of wet copper and rotting autumn leaves',
  'Auditory tone frequency that silences all ambient insects and birds',
  'Flickering shadow that moves 0.5 seconds slower than the body casting it',
  'Teeth feeling loose and spongy inside the mouth during panic',
];

export const HorrorSupernaturalStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedEntity, setSelectedEntity] = useState(ENTITY_MANIFESTATIONS[0].id);
  const [dreadStage, setDreadStage] = useState(2);
  const [activeDecay, setActiveDecay] = useState(SENSORY_DECAYS[0]);
  const [tabooStatement, setTabooStatement] = useState('An old cassette tape containing the final interview of a missing asylum director is played backwards in the church crypt.');
  const [isSummoningDread, setIsSummoningDread] = useState(false);
  const [horrorOutput, setHorrorOutput] = useState<string | null>(null);

  const handleSummonDread = async () => {
    setIsSummoningDread(true);
    setHorrorOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'horror_supernatural',
          actionKey: 'escalate_horror_dread',
          actionLabel: 'Escalate Supernatural Dread & Terror',
          formData: {
            entity: selectedEntity,
            dreadLevel: DREAD_LEVELS[dreadStage].stage,
            sensoryDecay: activeDecay,
            tabooBreach: tabooStatement,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setHorrorOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Dread escalated and entity summoned.');
      } else {
        setHorrorOutput(`[SUPERNATURAL DREAD DECONSTRUCTION]\nEntity: ${selectedEntity} | Stage: ${DREAD_LEVELS[dreadStage].stage}\n\n1. SENSORY MANIFESTATION:\nThe copper scent overwhelms the room. The audio on the tape stops, but the cassette player keeps spinning silently. Then, the tape begins to speak in the protagonist’s own voice from five minutes in the future.\n\n2. THE INVIOLABLE TABOO CONSEQUENCE:\nBecause the tape was played on consecrated ground, the entity can now perceive the listener's exact heartbeat. Closing one's eyes makes its breathing closer.\n\n3. PSYCHOLOGICAL BREAK:\nThe protagonist notices their own shadow is standing upright while they are kneeling on the stone floor.`);
      }
    } catch {
      setHorrorOutput(`[HORROR TRANSFORMATION]\nTaboo: ${tabooStatement}\nSensory: ${activeDecay}\nDread Stage: ${DREAD_LEVELS[dreadStage].stage}`);
    } finally {
      setIsSummoningDread(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-rose-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md shadow-purple-500/10">
            <Skull className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Horror & Supernatural Dread Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800 uppercase font-semibold">
                Atmospheric Dread & Entity Taboos
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              The uncanny valley, sensory decay, inviolable supernatural rules, and psychological abjection.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Horror Dilemmas
          </button>
        </div>
      </div>

      {/* ENTITY CLASSIFICATION */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
          <Ghost className="w-3.5 h-3.5 text-purple-400" />
          Supernatural Entity & Manifestation Vector
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {ENTITY_MANIFESTATIONS.map(ent => (
            <div
              key={ent.id}
              onClick={() => setSelectedEntity(ent.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedEntity === ent.id
                  ? 'bg-purple-950/50 border-purple-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-purple-200">{ent.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{ent.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DREAD LADDER & SENSORY CORRUPTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Dread Ladder */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-purple-400" />
            The 5-Stage Dread Escalation Ladder
          </label>
          <div className="space-y-1.5">
            {DREAD_LEVELS.map((lvl, idx) => (
              <div
                key={lvl.stage}
                onClick={() => setDreadStage(idx)}
                className={`p-2.5 rounded-lg border cursor-pointer transition ${
                  dreadStage === idx
                    ? 'bg-purple-950/50 border-purple-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-purple-200">{lvl.stage}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{lvl.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sensory Corruption & Taboo Breached */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <div>
            <label className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <VolumeX className="w-3.5 h-3.5 text-purple-400" />
              Sensory Distortion & Decay Trigger
            </label>
            <div className="space-y-1.5">
              {SENSORY_DECAYS.map(decay => (
                <div
                  key={decay}
                  onClick={() => setActiveDecay(decay)}
                  className={`p-2 rounded-lg border cursor-pointer text-xs transition ${
                    activeDecay === decay
                      ? 'bg-purple-950/50 border-purple-500 text-white font-medium'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {decay}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] font-mono text-purple-400 font-semibold uppercase block mb-1">
              Inviolable Entity Rule:
            </span>
            <p className="text-[11px] text-slate-300">
              The creature cannot cross threshold salt unless invited by someone actively lying.
            </p>
          </div>
        </div>
      </div>

      {/* SUMMON DREAD ENGINE */}
      <div className="p-4 bg-slate-950/80 border border-purple-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Dread & Supernatural Climactic Transformer
          </span>
          <button
            onClick={handleSummonDread}
            disabled={isSummoningDread}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isSummoningDread ? 'animate-spin' : ''}`} />
            {isSummoningDread ? 'Escalating Nightmare...' : 'Amplify Horror & Taboo'}
          </button>
        </div>

        <textarea
          rows={2}
          value={tabooStatement}
          onChange={e => setTabooStatement(e.target.value)}
          placeholder="Describe the taboo breach or entity confrontation..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
        />

        {horrorOutput && (
          <div className="p-3.5 bg-slate-900 border border-purple-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {horrorOutput}
          </div>
        )}
      </div>
    </div>
  );
};
