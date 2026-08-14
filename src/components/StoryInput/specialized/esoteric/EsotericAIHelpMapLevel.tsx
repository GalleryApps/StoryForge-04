import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  Layers,
  Zap,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Feather,
} from 'lucide-react';

interface Props {
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
  lastAIResult: { title: string; text: string; details?: any } | null;
}

const AI_HELP_CATEGORIES = [
  {
    id: 'content',
    title: '8.1 Content Generation Help',
    icon: BookOpen,
    color: 'border-amber-500/40 text-amber-300',
    actions: [
      { id: 'outline', label: 'Generate Chapter Outline', prompt: 'Generate a detailed 5-part section outline for Chapter 1 with primary sources, citations, and exercises.' },
      { id: 'explain', label: 'Explain Complex Concept', prompt: 'Explain the difference between Theurgy, Goetia, and Natural Magic in rigorous Renaissance terms.' },
      { id: 'history', label: 'Provide Historical Background', prompt: 'Provide historical background on Cosimo de Medici, Marsilio Ficino, and the 1460 translation of the Corpus Hermeticum.' },
      { id: 'symbol', label: 'Interpret an Ancient Symbol', prompt: 'Provide an exhaustive 4-level symbolic interpretation of the Ouroboros (Physical, Psychological, Metaphysical, Theurgic).' },
      { id: 'exercise', label: 'Create Custom Exercise', prompt: 'Design an original 30-minute contemplation drill on the Hermetic Law of Vibration with practical journaling prompts.' },
      { id: 'sidebar', label: 'Write Marginal Sidebar', prompt: 'Write a high-impact "Myths vs Facts" sidebar debunking common 19th-century occult fabrications regarding the Emerald Tablet.' },
      { id: 'compare', label: 'Compare Two Traditions', prompt: 'Generate a side-by-side comparative table analyzing Western Alchemical Nigredo vs Daoist Internal Alchemy (Neidan).' },
    ],
  },
  {
    id: 'structure',
    title: '8.2 Structure & Architecture Help',
    icon: Layers,
    color: 'border-indigo-500/40 text-indigo-300',
    actions: [
      { id: 'full_book', label: 'Design Full 22-Chapter Structure', prompt: 'Synthesize the entire 22-chapter master blueprint with coherent cognitive escalation from Novice to Master.' },
      { id: 'order', label: 'Suggest Chapter Flow & Pacing', prompt: 'Audit the chapter sequencing to ensure empirical and historical foundations precede advanced theurgic operations.' },
      { id: 'balance', label: 'Balance Chapter Lengths', prompt: 'Calculate optimal page allocations across Introduction, History, Core Philosophy, Practice, and Advanced Study.' },
      { id: 'frame', label: 'Create Narrative Frame Hook', prompt: 'Construct an evocative overarching narrative frame casting the reader as an archival investigator in Florence.' },
      { id: 'difficulty', label: 'Check Difficulty Progression', prompt: 'Analyze the difficulty curve of the exercises to ensure a smooth 1-to-10 pedagogical ladder without cognitive cliffs.' },
    ],
  },
  {
    id: 'exercise_tools',
    title: '8.3 Exercise & Curriculum Help',
    icon: Zap,
    color: 'border-emerald-500/40 text-emerald-300',
    actions: [
      { id: 'more_ex', label: 'Generate 5 More Exercises', prompt: 'Generate 5 brand new creative and empirical exercises for understanding Sacred Geometry with compass and straightedge.' },
      { id: 'make_harder', label: 'Elevate to Adept Tier (Harder)', prompt: 'Transform an introductory exercise into an advanced masterclass protocol requiring close Latin textual collation.' },
      { id: 'simplify', label: 'Simplify for Quick 5-Min Drill', prompt: 'Distill an intricate ritual alignment into a fast 5-minute somatic centering technique accessible to beginners.' },
      { id: 'creative_var', label: 'Add Creative / Artistic Variation', prompt: 'Generate a visual emblem-drawing or poetry-writing variation for an analytical meditation exercise.' },
      { id: 'answer_key', label: 'Write Discussion & Answer Guide', prompt: 'Write an authoritative master teacher discussion guide detailing common errors and signs of genuine insight.' },
    ],
  },
  {
    id: 'narrative_tools',
    title: '8.4 Narrative & Voice Immersion',
    icon: Feather,
    color: 'border-purple-500/40 text-purple-300',
    actions: [
      { id: 'hooks', label: 'Write 5 Contrasting Opening Hooks', prompt: 'Generate 5 distinct opening hooks (Dramatic Scene, Mysterious Question, Archival Discovery, Confession, Paradox).' },
      { id: 'transitions', label: 'Craft Smooth Chapter Transitions', prompt: 'Write 3 seamless bridge paragraphs linking the end of Historical Foundations directly into the Conceptual Core.' },
      { id: 'companion', label: 'Develop Companion Voice Soliloquy', prompt: 'Write a dialogue excerpt where the historical ghost of Paracelsus interrupts the modern narrator to correct an error.' },
      { id: 'dialogue', label: 'Generate Socratic Debate', prompt: 'Stage a 500-word rigorous debate between an Empirical Neuroscientist and an Adept on the nature of visionary gnosis.' },
      { id: 'conclusion', label: 'Write Magnum Opus Afterword', prompt: 'Draft an unforgettable, inspiring concluding blessing that invites the reader to step into the world as a living initiate.' },
    ],
  },
  {
    id: 'quality_tools',
    title: '8.5 Scholarly Rigor & Quality Polish',
    icon: ShieldCheck,
    color: 'border-cyan-500/40 text-cyan-300',
    actions: [
      { id: 'fact_check', label: 'Fact-Check Historical Manuscripts', prompt: 'Audit all citations to the Corpus Hermeticum, Asclepius, and Picatrix for historical philological accuracy.' },
      { id: 'balance_views', label: 'Balance Scholarly Perspectives', prompt: 'Ensure both traditionalist (perennial) and academic (historicist) scholarship are fairly represented without bias.' },
      { id: 'clarity', label: 'Clarity & Cognitive Load Check', prompt: 'Scan the conceptual definitions and rewrite obtuse passages into crystalline, highly readable prose.' },
      { id: 'jargon', label: 'Reduce Academic Jargon', prompt: 'Translate heavy academic terminology (e.g., "ontological syncretism") into crisp, sensory, and evocative language.' },
      { id: 'consistency', label: 'Audit Cross-Chapter Continuity', prompt: 'Check that technical definitions and symbolic correspondences remain 100% consistent across all chapters.' },
    ],
  },
];

export const EsotericAIHelpMapLevel: React.FC<Props> = ({
  onExecuteAIGenerator,
  isGeneratingAI,
  lastAIResult,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Wand2 className="w-4 h-4" /> Level 8: AI Help Map (27 One-Click Publishing Engines)
            </h4>
            <p className="text-xs text-slate-400">
              Trigger specialized Gemini 3.7 Flash developmental editor routines categorized across 5 core workflows.
            </p>
          </div>
        </div>

        {/* 5 CATEGORIES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {AI_HELP_CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-md"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 border-b border-slate-800/80 pb-2">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{cat.title}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.actions.map(act => (
                    <button
                      key={act.id}
                      disabled={isGeneratingAI}
                      onClick={() => onExecuteAIGenerator(act.label, act.prompt, act.id)}
                      className="p-2.5 rounded-lg bg-slate-950 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-left transition space-y-1 group disabled:opacity-50"
                    >
                      <div className="font-bold text-amber-300 group-hover:text-amber-200 text-[11px] flex items-center justify-between">
                        <span>{act.label}</span>
                        <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 text-amber-400 transition" />
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{act.prompt}</div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI OUTPUT CONTAINER */}
        {isGeneratingAI && (
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center gap-3 text-amber-200 text-xs">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>AI Editor is processing your request with deep historical and symbolic rigor...</span>
          </div>
        )}

        {lastAIResult && (
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/50 space-y-3 text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-300 flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" /> {lastAIResult.title}
              </span>
              <button
                onClick={() => handleCopy(lastAIResult.text)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Output'}
              </button>
            </div>
            <div className="text-slate-200 leading-relaxed font-sans whitespace-pre-wrap max-h-96 overflow-y-auto p-2 bg-slate-900/50 rounded-lg border border-slate-800">
              {lastAIResult.text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
