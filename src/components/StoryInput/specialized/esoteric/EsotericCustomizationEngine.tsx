import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  Wand2,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  Flame,
  Layers,
  Send,
} from 'lucide-react';
import { CustomizationDimensions } from './EsotericBlueprintTypes';

interface Props {
  customization: CustomizationDimensions;
  onUpdateCustomization: (updater: (prev: CustomizationDimensions) => CustomizationDimensions) => void;
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
}

const AI_CUSTOMIZATION_PROMPTS = [
  { id: 'author_style', label: 'Make Feel Like Author Style', template: 'Rewrite the stylistic register to mirror the prose cadence and scholarly passion of Manly P. Hall and Frances Yates.' },
  { id: 'audience_adjust', label: 'Adjust for Audience Readership', template: 'Calibrate the cognitive load, jargon, and exercises for university students seeking authentic practical gnosis.' },
  { id: 'cut_pages', label: 'Where to Cut 50 Pages', template: 'Identify redundant sections, overly dense historical sub-clauses, and secondary debates to trim 50 pages while preserving core wisdom.' },
  { id: 'expand_topics', label: 'Identify Topics Needing Expansion', template: 'Audit the 22 chapters and flag where metaphysical concepts require clearer visual diagrams or everyday modern analogies.' },
  { id: 'reduce_jargon', label: 'Make Less Dry / Academic', template: 'Inject visceral sensory imagery, lively storytelling hooks, and conversational clarity without sacrificing philosophical depth.' },
  { id: 'add_debate', label: 'Add Compelling Scholarly Debate', template: 'Insert a high-stakes controversy between the Perennialist school and the Historical Revisionists in Chapter 15.' },
  { id: 'strengthen_exercises', label: 'Strengthen Chapter Exercises', template: 'Design 3 high-impact transformative exercises for Chapter 10 (Sacred Geometry & Divine Proportion).' },
  { id: 'historical_context', label: 'Generate Historical Context Matrix', template: 'Generate deep socio-political context for the 1460 Medici Florence Hermetic revival during the fall of Constantinople.' },
];

export const EsotericCustomizationEngine: React.FC<Props> = ({
  customization,
  onUpdateCustomization,
  onExecuteAIGenerator,
  isGeneratingAI,
}) => {
  const [customQuery, setCustomQuery] = useState('');

  const updateDimension = (field: keyof CustomizationDimensions, val: any) => {
    onUpdateCustomization(prev => ({ ...prev, [field]: val }));
  };

  const handleRunCustomQuery = () => {
    if (!customQuery.trim()) return;
    onExecuteAIGenerator('Custom AI Transformation', customQuery, 'customTransform');
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Level 10: Customization Engine (9 Dimensions & 8 AI Transformation Routines)
            </h4>
            <p className="text-xs text-slate-400">
              Fine-tune macro publishing parameters and execute targeted AI developmental rewrites.
            </p>
          </div>
        </div>

        {/* 10.1 THE 9 DIMENSIONS */}
        <div className="space-y-2">
          <div className="font-bold text-xs text-amber-200 border-b border-slate-800 pb-1">
            10.1 The 9 Core Publishing Dimensions
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Depth */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">1. Philosophical Depth</label>
              <select
                value={customization.depth}
                onChange={e => updateDimension('depth', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300 font-medium"
              >
                <option>Overview</option>
                <option>Standard</option>
                <option>Deep</option>
                <option>Masterclass</option>
              </select>
            </div>

            {/* Length */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">2. Target Length / Scope</label>
              <select
                value={customization.length}
                onChange={e => updateDimension('length', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Short (50-100p)</option>
                <option>Medium (100-200p)</option>
                <option>Long (200-300p)</option>
                <option>Epic (300-500p)</option>
              </select>
            </div>

            {/* Structure */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">3. Structural Organization</label>
              <select
                value={customization.structure}
                onChange={e => updateDimension('structure', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Linear</option>
                <option>Thematic</option>
                <option>Spiral</option>
                <option>Modular</option>
              </select>
            </div>

            {/* Reader Role */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">4. Reader Identity</label>
              <select
                value={customization.readerRole}
                onChange={e => updateDimension('readerRole', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Passive</option>
                <option>Active</option>
                <option>Practitioner</option>
                <option>Co-creator</option>
              </select>
            </div>

            {/* Primary Focus */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">5. Primary Focus Domain</label>
              <select
                value={customization.focus}
                onChange={e => updateDimension('focus', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>History</option>
                <option>Concepts</option>
                <option>Symbols</option>
                <option>Practice</option>
                <option>Comparative</option>
              </select>
            </div>

            {/* Tone */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">6. Narrative Voice Tone</label>
              <select
                value={customization.tone}
                onChange={e => updateDimension('tone', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Academic</option>
                <option>Mystical</option>
                <option>Humorous</option>
                <option>Dramatic</option>
                <option>Conversational</option>
              </select>
            </div>

            {/* Visual Density */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">7. Visual Plates & Emblem Density</label>
              <select
                value={customization.visualDensity}
                onChange={e => updateDimension('visualDensity', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Text-only</option>
                <option>Occasional images</option>
                <option>Frequent images</option>
                <option>Visual-driven</option>
              </select>
            </div>

            {/* Exercise Density */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">8. Exercise & Drill Density</label>
              <select
                value={customization.exerciseDensity}
                onChange={e => updateDimension('exerciseDensity', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>None</option>
                <option>Few</option>
                <option>Moderate</option>
                <option>Many</option>
              </select>
            </div>

            {/* Scholarly Apparatus */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <label className="text-slate-400 font-semibold">9. Scholarly Apparatus & Footnotes</label>
              <select
                value={customization.scholarlyApparatus}
                onChange={e => updateDimension('scholarlyApparatus', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Minimal</option>
                <option>Standard</option>
                <option>Extensive</option>
                <option>Critical edition</option>
              </select>
            </div>
          </div>
        </div>

        {/* 10.2 THE 8 AI CUSTOMIZATION QUESTIONS */}
        <div className="space-y-3 pt-2">
          <div className="font-bold text-xs text-amber-200 border-b border-slate-800 pb-1">
            10.2 The 8 AI Customization Routines
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {AI_CUSTOMIZATION_PROMPTS.map(p => (
              <button
                key={p.id}
                disabled={isGeneratingAI}
                onClick={() => onExecuteAIGenerator(p.label, p.template, p.id)}
                className="p-3 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-left transition space-y-1.5 group disabled:opacity-50"
              >
                <div className="font-bold text-amber-300 group-hover:text-amber-200 text-[11px] flex items-center justify-between">
                  <span>{p.label}</span>
                  <Sparkles className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                  {p.template}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CUSTOM QUERY PROMPT BAR */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs">
          <div className="font-bold text-slate-300 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Custom AI Editorial Directive</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Expand Chapter 9 with a comparative section on Sufi sacred geometry..."
              value={customQuery}
              onChange={e => setCustomQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleRunCustomQuery()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <button
              disabled={isGeneratingAI || !customQuery.trim()}
              onClick={handleRunCustomQuery}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg transition flex items-center gap-1.5 text-xs shadow-md"
            >
              <Send className="w-3.5 h-3.5" /> Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
