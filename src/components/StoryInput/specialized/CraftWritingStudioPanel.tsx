import React, { useState } from 'react';
import {
  Feather,
  Sparkles,
  Zap,
  Layers,
  BookOpen,
  CheckCircle2,
  Sliders,
  Split,
  Edit3,
  Award,
  ListOrdered,
  FileCheck,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const CRAFT_MODULES = [
  { id: 'scene_vs_summary', name: 'Scene vs. Summary Calibration', desc: 'Expand critical emotional crises into real-time visceral scenes; compress transitional travel into muscular summaries.' },
  { id: 'subtext_dialogue', name: 'Subtextual Dialogue & Indirect Warfare', desc: 'Characters never say what they actually mean; emotional combat conducted through loaded questions and deflection.' },
  { id: 'micro_tension', name: 'Micro-Tension on Every Page', desc: 'Infusing constant small friction between character desires and mundane obstacles to eliminate narrative drag.' },
  { id: 'sensory_grounding', name: 'Sensory Texture & Specificity', desc: 'Replacing generic nouns and filter verbs with tactile, auditory, and olfactive anchors.' },
  { id: 'interiority_balance', name: 'Interiority vs. Kinetic Staging', desc: 'Preventing characters from thinking in vacuums by anchoring internal reflection to physical actions.' },
];

const WRITING_DRILLS = [
  { id: 'no_sight', name: 'The Zero-Sight Scene Drill', rule: 'Write a 150-word scene conveying high danger using only smell, sound, and tactile skin temperature—zero visual words.' },
  { id: 'no_naming_emotion', name: 'The Anti-Adjective Emotion Drill', rule: 'Convey profound grief without using the words "sad", "cried", "grief", "tears", or "lost".' },
  { id: 'subtext_banter', name: 'The Cold War Breakfast Drill', rule: 'Two spouses discuss making toast while deciding whether to sign divorce papers.' },
  { id: 'micro_fiction_100', name: 'The 100-Word Climax Challenge', rule: 'Deliver a complete narrative arc with setup, crisis, and twist in exactly 100 words.' },
];

const CRITIQUE_CHECKLIST = [
  'Filter verbs removed ("he saw", "she felt", "he heard")',
  'Every scene contains at least two distinct conflicting agendas',
  'Sensory anchors ground the physical space within the first two sentences',
  'Dialogue tags simplified to "said" / "asked" or replaced by action beats',
  'Pacing rhythm modulates between staccato sentences and flowing periods',
];

export const CraftWritingStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedModule, setSelectedModule] = useState(CRAFT_MODULES[0].id);
  const [selectedDrill, setSelectedDrill] = useState(WRITING_DRILLS[0].id);
  const [tactileDensity, setTactileDensity] = useState(85);
  const [draftSnippet, setDraftSnippet] = useState('John was very angry when he walked into the room. He felt betrayed by his brother and looked at him with hate. "Why did you do it?" he asked sadly.');
  const [isTransforming, setIsTransforming] = useState(false);
  const [mentorOutput, setMentorOutput] = useState<string | null>(null);

  const handleMentorTransform = async () => {
    setIsTransforming(true);
    setMentorOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'craft_writing_manual',
          actionKey: 'mentor_scene_transformation',
          actionLabel: 'Perform Masterclass Scene Transformation',
          formData: {
            craftFocus: selectedModule,
            drillType: selectedDrill,
            tactileScore: `${tactileDensity}% Sensory Grounding`,
            amateurDraft: draftSnippet,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setMentorOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Mentor craft transformation applied.');
      } else {
        setMentorOutput(`[MASTERCLASS CRAFT TRANSFORMATION]\n\nBEFORE (FLAT / SUMMARY):\n"${draftSnippet}"\n\nAFTER (VISCERAL / SHOWING WITH SUBTEXT):\nJohn kicked the oak door shut with the heel of his boot, the latch clicking like a cocked pistol. He didn't look at his brother. Instead, he pulled out a bent cigarette, striking three matches against the damp stone before one finally caught. Smoke hissed between his clenched teeth.\n\n"The barn's empty, Michael. Even the harness leather is gone."\n\nCRAFT BREAKDOWN:\n1. Filter verbs deleted ("felt", "looked", "asked sadly").\n2. Emotion externalized through physical action (striking three matches, smoke hissing).\n3. Dialogue weaponized into concrete evidentiary detail.`);
      }
    } catch {
      setMentorOutput(`[CRAFT WORKSHOP]\nFocus: ${selectedModule}\nOriginal: "${draftSnippet}"`);
    } finally {
      setIsTransforming(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-violet-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 shadow-md shadow-violet-500/10">
            <Feather className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Creative Writing Craft & Masterclass Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-800 uppercase font-semibold">
                Mentor Transformations & Narrative Drills
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Scene vs. summary calibration, subtextual dialogue warfare, and hands-on writing exercises.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-violet-600/30 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Craft Dilemmas
          </button>
        </div>
      </div>

      {/* CRAFT TAXONOMY SELECTION */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-violet-400" />
          Narrative Craft Dimensions
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {CRAFT_MODULES.map(mod => (
            <div
              key={mod.id}
              onClick={() => setSelectedModule(mod.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedModule === mod.id
                  ? 'bg-violet-950/50 border-violet-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-violet-200">{mod.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{mod.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WRITING DRILLS & CHECKLIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Active Writing Drills */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-violet-400" />
            Masterclass Micro-Drill
          </label>
          <div className="space-y-2">
            {WRITING_DRILLS.map(drill => (
              <div
                key={drill.id}
                onClick={() => setSelectedDrill(drill.id)}
                className={`p-2.5 rounded-lg border cursor-pointer transition ${
                  selectedDrill === drill.id
                    ? 'bg-violet-950/50 border-violet-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-violet-200">{drill.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{drill.rule}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Critique Checklist */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-violet-400" />
            Line-Edit & Polish Checklist
          </label>
          <div className="space-y-2">
            {CRITIQUE_CHECKLIST.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-300">Sensory Density Gauge</span>
              <span className="text-xs font-mono text-violet-300">{tactileDensity}% Tactile</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={tactileDensity}
              onChange={e => setTactileDensity(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* MENTOR TRANSFORM ENGINE */}
      <div className="p-4 bg-slate-950/80 border border-violet-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-violet-400" />
            Mentor Scene Rewriter & Craft Clinic
          </span>
          <button
            onClick={handleMentorTransform}
            disabled={isTransforming}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isTransforming ? 'animate-spin' : ''}`} />
            {isTransforming ? 'Transforming Scene...' : 'Execute Masterclass Rewrite'}
          </button>
        </div>

        <textarea
          rows={2}
          value={draftSnippet}
          onChange={e => setDraftSnippet(e.target.value)}
          placeholder="Paste a flat amateur scene to receive a professional craft transformation..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-violet-500"
        />

        {mentorOutput && (
          <div className="p-3.5 bg-slate-900 border border-violet-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {mentorOutput}
          </div>
        )}
      </div>
    </div>
  );
};
