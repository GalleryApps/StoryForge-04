import React from 'react';
import {
  HelpCircle,
  Sparkles,
  Scale,
  CheckCircle2,
  AlertCircle,
  Compass,
  Layers,
  Wand2,
} from 'lucide-react';
import { DilemmaChainConfig } from './EsotericBlueprintTypes';

interface Props {
  dilemmas: DilemmaChainConfig;
  onUpdateDilemmas: (updater: (prev: DilemmaChainConfig) => DilemmaChainConfig) => void;
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
}

export const EsotericDilemmaChainLevel: React.FC<Props> = ({
  dilemmas,
  onUpdateDilemmas,
  onExecuteAIGenerator,
  isGeneratingAI,
}) => {
  const updateField = (field: keyof DilemmaChainConfig, val: any) => {
    onUpdateDilemmas(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Scale className="w-4 h-4" /> Level 7: Dilemma Chain (7 Core & 6 Advanced Narrative Decisions)
            </h4>
            <p className="text-xs text-slate-400">
              Establish the editorial stance, truth claims, and epistemic contract with the reader.
            </p>
          </div>
          <button
            disabled={isGeneratingAI}
            onClick={() =>
              onExecuteAIGenerator(
                'Dilemma Harmonizer Matrix',
                `Evaluate the tension between '${dilemmas.authorStance}' stance, '${dilemmas.mysteryLevel}' revelation level, and '${dilemmas.truthClaim}' truth claim. Generate a cohesive authorial manifesto.`,
                'dilemmaManifesto'
              )
            }
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Harmonize Dilemmas
          </button>
        </div>

        {/* 7.1 CORE NARRATIVE DILEMMAS */}
        <div className="space-y-3">
          <div className="font-bold text-xs text-amber-200 border-b border-slate-800 pb-1">
            7.1 Core Narrative Dilemmas (Editorial Mandates)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Reveal Depth */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">1. Revelation Depth</label>
              <select
                value={dilemmas.revealDepth}
                onChange={e => updateField('revealDepth', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300"
              >
                <option>Reveal all secrets</option>
                <option>Keep mysteries</option>
                <option>Reveal gradually</option>
              </select>
            </div>

            {/* Author Stance */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">2. Author Stance</label>
              <select
                value={dilemmas.authorStance}
                onChange={e => updateField('authorStance', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300"
              >
                <option>Neutral scholar</option>
                <option>Passionate advocate</option>
                <option>Skeptical investigator</option>
              </select>
            </div>

            {/* Reader Relationship */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">3. Reader Relationship</label>
              <select
                value={dilemmas.readerRelationship}
                onChange={e => updateField('readerRelationship', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300"
              >
                <option>Teacher-student</option>
                <option>Fellow traveler</option>
                <option>Provocateur</option>
              </select>
            </div>

            {/* Structure Type */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">4. Structure Type</label>
              <select
                value={dilemmas.structureType}
                onChange={e => updateField('structureType', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300"
              >
                <option>Linear learning</option>
                <option>Spiral deepening</option>
                <option>Thematic exploration</option>
              </select>
            </div>

            {/* Evidence Type */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">5. Evidence Type</label>
              <select
                value={dilemmas.evidenceType}
                onChange={e => updateField('evidenceType', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300"
              >
                <option>Pure primary</option>
                <option>Heavy scholarship</option>
                <option>Balanced</option>
              </select>
            </div>

            {/* Exercise Density */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">6. Exercise Density</label>
              <select
                value={dilemmas.exerciseDensity}
                onChange={e => updateField('exerciseDensity', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-amber-300"
              >
                <option>Many, active</option>
                <option>Few, reflective</option>
                <option>None, pure reading</option>
              </select>
            </div>
          </div>
        </div>

        {/* 7.2 ADVANCED NARRATIVE DILEMMAS */}
        <div className="space-y-3 pt-2">
          <div className="font-bold text-xs text-indigo-300 border-b border-slate-800 pb-1">
            7.2 Advanced Narrative Dilemmas (Epistemology & Voice)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Narrator Identity */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">1. Narrator Identity</label>
              <select
                value={dilemmas.narratorIdentity}
                onChange={e => updateField('narratorIdentity', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-indigo-300 font-medium"
              >
                <option>Scholar</option>
                <option>Practitioner</option>
                <option>Both</option>
                <option>Collective voice</option>
              </select>
            </div>

            {/* Reader Role */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">2. Reader Role</label>
              <select
                value={dilemmas.readerRole}
                onChange={e => updateField('readerRole', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-indigo-300 font-medium"
              >
                <option>Passive learner</option>
                <option>Active practitioner</option>
                <option>Critical analyst</option>
                <option>Co-explorer</option>
              </select>
            </div>

            {/* Mystery Level */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">3. Mystery Level</label>
              <select
                value={dilemmas.mysteryLevel}
                onChange={e => updateField('mysteryLevel', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-indigo-300 font-medium"
              >
                <option>Full revelation</option>
                <option>Partial revelation</option>
                <option>Evocative suggestion</option>
                <option>Initiation model</option>
              </select>
            </div>

            {/* Truth Claim */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">4. Truth Claim</label>
              <select
                value={dilemmas.truthClaim}
                onChange={e => updateField('truthClaim', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-indigo-300 font-medium"
              >
                <option>This is true</option>
                <option>This is one view</option>
                <option>This is a lens</option>
                <option>This is a mystery</option>
              </select>
            </div>

            {/* Ending Type */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">5. Climax / Ending Type</label>
              <select
                value={dilemmas.endingType}
                onChange={e => updateField('endingType', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-indigo-300 font-medium"
              >
                <option>Resolution</option>
                <option>Open question</option>
                <option>Call to action</option>
                <option>Return to beginning</option>
              </select>
            </div>

            {/* Chapter Relationship */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <label className="text-slate-300 font-semibold block">6. Chapter Relationship</label>
              <select
                value={dilemmas.chapterRelationship}
                onChange={e => updateField('chapterRelationship', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-indigo-300 font-medium"
              >
                <option>Sequential</option>
                <option>Thematic clusters</option>
                <option>Interconnected web</option>
                <option>Independent units</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
