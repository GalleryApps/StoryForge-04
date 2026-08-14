import React from 'react';
import {
  Compass,
  Sparkles,
  Users,
  MessageCircle,
  HelpCircle,
  Footprints,
  Ghost,
  Shield,
  Layers,
  Wand2,
} from 'lucide-react';
import { NarrativeFrameConfig } from './EsotericBlueprintTypes';

interface Props {
  narrative: NarrativeFrameConfig;
  onUpdateNarrative: (updater: (prev: NarrativeFrameConfig) => NarrativeFrameConfig) => void;
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
}

const NARRATIVE_FRAMES = [
  {
    name: 'Chronological Journey',
    desc: 'Origins in Alexandria → Medieval Transmission → Florentine Rebirth → Modern Revival',
    icon: '⏳',
  },
  {
    name: 'Thematic Exploration',
    desc: 'Each chapter addresses a standalone universal theme (Cosmology, Sacred Math, Death, Transmutation)',
    icon: '🔮',
  },
  {
    name: 'Detective Investigation',
    desc: 'Begins with an unsolved historical mystery / cipher; each chapter unearths new archival clues',
    icon: '🕵️',
  },
  {
    name: "Apprentice's Quest",
    desc: 'Structured initiation rites from Neophyte threshold to Adept theurgic mastery',
    icon: '⚔️',
  },
  {
    name: 'Dialogue/Debate',
    desc: 'Socratic dialogues between a Skeptical Empirical Scientist and an Initiated Hermetic Scholar',
    icon: '💬',
  },
  {
    name: 'Anthology of Voices',
    desc: 'Polyphonic chorus featuring direct translations of ancient voices alongside modern commentaries',
    icon: '📜',
  },
  {
    name: 'Discover-as-You-Go',
    desc: 'Interactive puzzle textbook where solving symbolic diagrams unlocks subsequent conceptual insights',
    icon: '🧩',
  },
  {
    name: 'Spiral Learning',
    desc: 'Core principles are introduced simply, then revisited at increasing philosophical & operational depths',
    icon: '🌀',
  },
];

const NARRATIVE_DEVICES = [
  {
    name: 'Companion Character',
    desc: 'A curious fellow seeker who asks the awkward, practical questions the modern reader is wondering.',
    icon: Users,
  },
  {
    name: 'Historical Ghost',
    desc: 'Marsilio Ficino or Paracelsus appears in marginal soliloquies to clarify original 16th-century context.',
    icon: Ghost,
  },
  {
    name: 'Skeptical Interlocutor',
    desc: 'A sharp rationalist voice challenging magical claims with materialist explanations before synthesis.',
    icon: Shield,
  },
  {
    name: 'Mysterious Mentor',
    desc: 'An anonymous senior adept who drops cryptic riddles and high-level cautionary aphorisms.',
    icon: HelpCircle,
  },
  {
    name: 'Letters/Correspondence',
    desc: 'Epistolary dispatches between two masters across continents discussing real-time laboratory struggles.',
    icon: MessageCircle,
  },
  {
    name: 'Journey Metaphor',
    desc: 'An expedition through the 7 planetary gates with maps, keys, waypoints, and threshold guardians.',
    icon: Footprints,
  },
  {
    name: 'Unreliable Narrator',
    desc: 'An author whose personal bias starts materialist and unravels into deep theurgic participation.',
    icon: Compass,
  },
  {
    name: 'Multiple Perspectives',
    desc: 'A round-table commentary where Hermeticism, Sufism, Kabbalah, and Daoism analyze the same symbol.',
    icon: Layers,
  },
];

export const EsotericNarrativeEngineLevel: React.FC<Props> = ({
  narrative,
  onUpdateNarrative,
  onExecuteAIGenerator,
  isGeneratingAI,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Compass className="w-4 h-4" /> Level 6: Narrative Structure Options & Immersion Devices
            </h4>
            <p className="text-xs text-slate-400">
              Select the macro narrative container and the interactive interlocutor voice guiding the reader.
            </p>
          </div>
          <button
            disabled={isGeneratingAI}
            onClick={() =>
              onExecuteAIGenerator(
                'Narrative Immersion Engine',
                `Generate a sample dialogue between the reader and the ${narrative.device} within the ${narrative.frame} structure.`,
                'narrativeSample'
              )
            }
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Wand2 className="w-3.5 h-3.5" /> AI Generate Voice Interlocutor
          </button>
        </div>

        {/* 6.1 NARRATIVE FRAMES (8 Options) */}
        <div className="space-y-2">
          <div className="font-bold text-xs text-amber-200">6.1 Select Macro Narrative Frame (1 of 8):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {NARRATIVE_FRAMES.map(nf => (
              <button
                key={nf.name}
                onClick={() => onUpdateNarrative(n => ({ ...n, frame: nf.name as any }))}
                className={`p-3 rounded-xl border text-left transition space-y-1.5 ${
                  narrative.frame === nf.name
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span>{nf.icon}</span> {nf.name}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">{nf.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 6.2 NARRATIVE DEVICES (8 Options) */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="font-bold text-xs text-amber-200">6.2 Select Narrative Interlocutor Device (1 of 8):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {NARRATIVE_DEVICES.map(nd => {
              const Icon = nd.icon;
              const isSelected = narrative.device === nd.name;
              return (
                <button
                  key={nd.name}
                  onClick={() => onUpdateNarrative(n => ({ ...n, device: nd.name as any }))}
                  className={`p-3 rounded-xl border text-left transition space-y-1.5 ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{nd.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight">{nd.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* COMPANION DETAILS CONFIG */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-semibold">Custom Companion / Ghost Name</label>
            <input
              type="text"
              placeholder="e.g. Master Marsilio or Skeptical Student Lucia"
              value={narrative.companionName || ''}
              onChange={e => onUpdateNarrative(n => ({ ...n, companionName: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 font-semibold">Companion Personality & Voice Tone</label>
            <input
              type="text"
              placeholder="e.g. Acerbic humanist with dry humor and deep Greek archival memory"
              value={narrative.companionPersonality || ''}
              onChange={e =>
                onUpdateNarrative(n => ({ ...n, companionPersonality: e.target.value }))
              }
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
