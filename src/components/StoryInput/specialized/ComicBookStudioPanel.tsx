import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Zap,
  Smile,
  Volume2,
  Sliders,
  Maximize2,
  Copy,
  Check,
  Flame,
  MessageSquare,
  Shuffle,
  Grid,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const YONKOMA_BEATS = [
  { step: '1. Ki (Introduction)', label: 'Setup', desc: 'Establish the premise, characters, and ordinary baseline.', placeholder: 'e.g. Detective sits down with a fresh cup of ultra-hot espresso.' },
  { step: '2. Shō (Development)', label: 'Development', desc: 'The situation progresses or an obstacle emerges.', placeholder: 'e.g. He notices a fingerprint on the bottom of the porcelain saucer.' },
  { step: '3. Ten (The Twist)', label: 'Complication / Turn', desc: 'An unexpected absurdity, disruption, or sudden escalation.', placeholder: 'e.g. The barista steps in with a UV light showing the entire cup is made of hardened coffee.' },
  { step: '4. Ketsu (Conclusion)', label: 'Punchline / Payoff', desc: 'The visual payoff, deadpan reaction, or slapstick aftermath.', placeholder: 'e.g. Detective attempts to take a bite out of the saucer with complete poker-faced seriousness.' },
];

const ONOMATOPOEIA_BANK = [
  { sfx: 'KRAK-THOOM', category: 'Impact & Energy', mood: 'Thunderous explosion or heavy blow' },
  { sfx: 'SKRRRRRT', category: 'Friction & Motion', mood: 'High-speed emergency braking or slip' },
  { sfx: 'BZZZZT-ZAP', category: 'Electrical & Sci-Fi', mood: 'Faulty cybernetics or short-circuit' },
  { sfx: 'SQUELCH', category: 'Tactile & Slapstick', mood: 'Stepping in slime or mud pie impact' },
  { sfx: 'SHWIIIING', category: 'Blades & Precision', mood: 'Drawing a katana or razor focus' },
  { sfx: 'PLOINK!', category: 'Cartoon & Whimsical', mood: 'Lightbulb eureka or comedic bounce' },
  { sfx: 'RUUUUMBLE', category: 'Environmental', mood: 'Distant seismic shift or approaching dread' },
  { sfx: 'DOKI-DOKI', category: 'Interior Reaction', mood: 'Heart racing in panic or romantic tension' },
];

const SPEECH_BALLOON_STYLES = [
  { id: 'standard', name: 'Standard Oval', desc: 'Neutral conversational cadence with smooth outline' },
  { id: 'burst', name: 'Spiky Burst / Scream', desc: 'High-decibel shouting, alarm, or explosive sound' },
  { id: 'whisper', name: 'Dashed Outline', desc: 'Subdued whisper, conspiracy, or internal mumble' },
  { id: 'thought', name: 'Cloud & Bubbles', desc: 'Silent interior monologue or private reflection' },
  { id: 'cyber', name: 'Angular Hexagonal', desc: 'Synthetic AI voice, radio transmission, or intercom' },
  { id: 'wobbly', name: 'Wobbly Shaking', desc: 'Trembling fear, drunken slurring, or utter exhaustion' },
];

const SLAPSTICK_PACING = [
  'Deadpan Hold (Beat of silence before reaction)',
  'Rapid Double-Take (Look away, look back in horror)',
  'Smash Cut to Consequences (Skip the fall, show the cast)',
  'Cartoon Physics Physics Stretch (Exaggerated kinetic smear)',
  'Micro-Expression Twitch (Single eyebrow twitch of despair)',
];

export const ComicBookStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [selectedSfx, setSelectedSfx] = useState<string[]>(['KRAK-THOOM', 'PLOINK!']);
  const [selectedBalloon, setSelectedBalloon] = useState('standard');
  const [selectedPacing, setSelectedPacing] = useState(SLAPSTICK_PACING[0]);
  const [gutterTiming, setGutterTiming] = useState(65);
  const [beatContent, setBeatContent] = useState<string[]>([
    'Detective sits down with a fresh cup of ultra-hot espresso.',
    'He notices a fingerprint on the bottom of the porcelain saucer.',
    'The barista steps in with a UV light showing the entire cup is made of hardened coffee.',
    'Detective attempts to take a bite out of the saucer with complete poker-faced seriousness.',
  ]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [simOutput, setSimOutput] = useState<string | null>(null);

  const toggleSfx = (sfx: string) => {
    setSelectedSfx(prev =>
      prev.includes(sfx) ? prev.filter(s => s !== sfx) : [...prev, sfx]
    );
  };

  const handleSimulateStrip = async () => {
    setIsSimulating(true);
    setSimOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'comic_book',
          actionKey: 'simulate_comic_strip',
          actionLabel: 'Choreograph 4-Panel Strip',
          formData: {
            beats: beatContent,
            sfx: selectedSfx,
            balloon: selectedBalloon,
            pacing: selectedPacing,
            gutterTiming,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setSimOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Comic strip scripted with visual pacing.');
      } else {
        setSimOutput(`[PANEL 1 - ESTABLISHING] ${beatContent[0]} [SFX: Subtle steam hiss]\n[PANEL 2 - REACTION] ${beatContent[1]}\n[PANEL 3 - TURN / EXPLOSION] ${beatContent[2]} [SFX: ${selectedSfx[0] || 'KRAK!'}]\n[PANEL 4 - PUNCHLINE] ${beatContent[3]} [Pacing: ${selectedPacing}]`);
      }
    } catch {
      setSimOutput(`[PANEL 1 - ESTABLISHING] ${beatContent[0]}\n[PANEL 2 - REACTION] ${beatContent[1]}\n[PANEL 3 - TURN] ${beatContent[2]} [SFX: ${selectedSfx.join(', ')}]\n[PANEL 4 - PUNCHLINE] ${beatContent[3]} [Balloon: ${selectedBalloon}]`);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-rose-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/30 to-amber-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shadow-md shadow-rose-500/10">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Comic Book & Strip Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800 uppercase font-semibold">
                Sequential Slapstick & 4-Panel Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ki-shō-ten-ketsu rhythm, onomatopoeia sound design, gutter timing, and balloon expressiveness.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Visual Dilemmas
          </button>
        </div>
      </div>

      {/* 4-PANEL YONKOMA BEAT MATRIX */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            4-Panel Strip Choreography (Ki-Shō-Ten-Ketsu)
          </label>
          <span className="text-[11px] text-slate-400">Click a panel to script its visual action</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {YONKOMA_BEATS.map((beat, idx) => {
            const isActive = activeBeatIndex === idx;
            return (
              <div
                key={beat.step}
                onClick={() => setActiveBeatIndex(idx)}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-500/10'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-200">{beat.step}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {beat.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{beat.desc}</p>
                <textarea
                  rows={2}
                  value={beatContent[idx]}
                  onChange={e => {
                    const updated = [...beatContent];
                    updated[idx] = e.target.value;
                    setBeatContent(updated);
                  }}
                  placeholder={beat.placeholder}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* SFX SOUND BANK & BALLOON STYLING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Onomatopoeia Sound FX Bank */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-rose-400" />
              Onomatopoeia & Sound FX Palette
            </span>
            <span className="text-[10px] font-mono text-slate-400">{selectedSfx.length} Active SFX</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ONOMATOPOEIA_BANK.map(item => {
              const isSelected = selectedSfx.includes(item.sfx);
              return (
                <button
                  key={item.sfx}
                  type="button"
                  onClick={() => toggleSfx(item.sfx)}
                  className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-500/20 border-rose-500/60 text-rose-200 shadow-xs'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-mono tracking-wider">{item.sfx}</span>
                    <span className="text-[10px]">{isSelected ? '✓' : '+'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">{item.mood}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Speech Balloon & Slapstick Controls */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <div>
            <label className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
              Speech Balloon Expression
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SPEECH_BALLOON_STYLES.map(balloon => (
                <button
                  key={balloon.id}
                  type="button"
                  onClick={() => setSelectedBalloon(balloon.id)}
                  className={`p-2 rounded-lg border text-xs text-left transition ${
                    selectedBalloon === balloon.id
                      ? 'bg-rose-500/20 border-rose-500/60 text-rose-200 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="truncate">{balloon.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Gutter Beat Timing (Closure Velocity)</label>
              <span className="text-xs font-mono text-rose-300">{gutterTiming}% Snap</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={gutterTiming}
              onChange={e => setGutterTiming(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>Leisurely Slow Burn</span>
              <span>Brisk Kinetic Snap</span>
              <span>Ultra-Fast Comic Gag</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Comedic Pacing Style</label>
            <select
              value={selectedPacing}
              onChange={e => setSelectedPacing(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              {SLAPSTICK_PACING.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* QUICK MAGIC ACTIONS BAR */}
      <div className="p-4 bg-slate-950/80 border border-rose-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Comic Studio AI Generators
            </span>
          </div>
          <button
            onClick={handleSimulateStrip}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Scripting Strip...' : 'Generate 4-Panel Script'}
          </button>
        </div>

        {simOutput && (
          <div className="p-3.5 bg-slate-900 border border-rose-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {simOutput}
          </div>
        )}
      </div>
    </div>
  );
};
