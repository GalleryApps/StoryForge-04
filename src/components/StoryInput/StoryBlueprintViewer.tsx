import React, { useState } from 'react';
import {
  StoryBlueprint,
  StoryArchetype,
} from '../../types';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Edit3,
  Layers,
  Flame,
  Shield,
  Eye,
  Film,
  Download,
  RefreshCw,
  GitMerge,
  Maximize2,
  ChevronRight,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface StoryBlueprintViewerProps {
  blueprint: StoryBlueprint;
  onApproveAndApply: () => void;
  onRegenerate: () => Promise<void>;
  onEditBlueprint?: (updated: StoryBlueprint) => void;
  isGenerating?: boolean;
}

export const StoryBlueprintViewer: React.FC<StoryBlueprintViewerProps> = ({
  blueprint,
  onApproveAndApply,
  onRegenerate,
  onEditBlueprint,
  isGenerating = false,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'characters' | 'chapters' | 'dilemmas' | 'visuals'>('overview');
  const [isCopied, setIsCopied] = useState(false);

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(blueprint, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(blueprint.title || 'narrative').toLowerCase().replace(/\s+/g, '_')}_blueprint.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
      {/* Blueprint Header */}
      <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest font-semibold">
              11-Point Master Blueprint
            </span>
            <span className="text-xs text-slate-400 capitalize">
              • {(blueprint.archetype || 'novel').replace(/_/g, ' ')}
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-serif">
            {blueprint.title || 'Untitled Narrative Blueprint'}
          </h2>
          {blueprint.subtitle && (
            <p className="text-xs text-slate-300 mt-0.5">
              {blueprint.subtitle}
            </p>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportJson}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition"
            title="Download full blueprint JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export JSON</span>
          </button>

          <button
            type="button"
            onClick={onRegenerate}
            disabled={isGenerating}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            type="button"
            onClick={onApproveAndApply}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2 transition"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>APPROVE &amp; BUILD BOOK</span>
          </button>
        </div>
      </div>

      {/* Blueprint Sub-Navigation Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Premise &amp; Conflict
        </button>
        <button
          onClick={() => setActiveTab('characters')}
          className={`py-3 px-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'characters'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Characters &amp; Arcs ({blueprint.mainCharacters?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('dilemmas')}
          className={`py-3 px-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'dilemmas'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Dilemmas &amp; Escalation
        </button>
        <button
          onClick={() => setActiveTab('chapters')}
          className={`py-3 px-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'chapters'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          4. Chapter Architecture ({blueprint.chapterArchitecture?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('visuals')}
          className={`py-3 px-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'visuals'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          5. Visual Direction &amp; Ending
        </button>
      </div>

      {/* Blueprint Content Area */}
      <div className="p-6 overflow-y-auto max-h-[600px] space-y-6">
        {/* TAB 1: PREMISE & CONFLICT */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Section 1: Premise & Story Promise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Point 1 • Core Narrative Premise
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-sans font-medium">
                  {blueprint.premise}
                </p>
              </div>

              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  Point 2 • The Story Promise to Reader
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-sans font-medium">
                  {blueprint.storyPromise}
                </p>
              </div>
            </div>

            {/* Section 5: Central Conflict */}
            {blueprint.centralConflict && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Point 5 • Central Conflict &amp; Philosophical Stakes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Opposing Forces
                    </span>
                    <p className="text-xs text-slate-600 leading-snug">
                      {blueprint.centralConflict.coreOpposingForces}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Philosophical Stakes
                    </span>
                    <p className="text-xs text-slate-600 leading-snug">
                      {blueprint.centralConflict.philosophicalStakes}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Cost of Total Failure
                    </span>
                    <p className="text-xs text-slate-600 leading-snug">
                      {blueprint.centralConflict.consequencesOfFailure}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Subplots */}
            {blueprint.subplots && blueprint.subplots.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Point 8 • Interwoven Subplots
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {blueprint.subplots.map((sub, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{sub.name}</span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                          {sub.characters?.join(', ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">
                        <strong>Tension:</strong> {sub.coreTension}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        <strong>Intersection:</strong> {sub.connectionToMainPlot}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CHARACTERS & ARCS */}
        {activeTab === 'characters' && (
          <div className="space-y-6">
            {/* Point 3: Main Characters with Locked Traits */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Point 3 • Main Characters (With Immutable Locked Traits)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blueprint.mainCharacters?.map((char, cIdx) => (
                  <div key={cIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{char.name}</h4>
                        <span className="text-[10px] uppercase font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                          {char.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
                        {char.lockedTraits?.map((trait, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold"
                            title="Locked Trait: Must never be violated in chapter generations"
                          >
                            🔒 {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{char.bio}</p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">External Goal</span>
                        <span className="text-slate-700 font-medium">{char.externalGoal}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">Internal Need</span>
                        <span className="text-slate-700 font-medium">{char.internalNeed}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">Core Flaw</span>
                        <span className="text-slate-700">{char.flaw}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">Hidden Secret</span>
                        <span className="text-slate-700">{char.secret}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Point 4: Character Arcs */}
            {blueprint.characterArcs && blueprint.characterArcs.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Point 4 • 5-Stage Character Arcs
                </span>
                <div className="space-y-3">
                  {blueprint.characterArcs.map((arc, aIdx) => (
                    <div key={aIdx} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                      <span className="text-xs font-bold text-slate-800">{arc.characterName} Arc</span>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                        <div className="p-2 bg-slate-50 rounded">
                          <span className="text-[10px] font-bold text-slate-400 block">1. Starting State</span>
                          <span className="text-slate-700">{arc.startingState}</span>
                        </div>
                        <div className="p-2 bg-slate-50 rounded">
                          <span className="text-[10px] font-bold text-slate-400 block">2. Pressure Catalyst</span>
                          <span className="text-slate-700">{arc.catalystPressure}</span>
                        </div>
                        <div className="p-2 bg-slate-50 rounded">
                          <span className="text-[10px] font-bold text-slate-400 block">3. Midpoint Shift</span>
                          <span className="text-slate-700">{arc.midpointShift}</span>
                        </div>
                        <div className="p-2 bg-slate-50 rounded">
                          <span className="text-[10px] font-bold text-slate-400 block">4. Point of No Return</span>
                          <span className="text-slate-700">{arc.pointOfNoReturn}</span>
                        </div>
                        <div className="p-2 bg-indigo-50 rounded">
                          <span className="text-[10px] font-bold text-indigo-600 block">5. Final Transformation</span>
                          <span className="text-indigo-900 font-medium">{arc.finalTransformation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DILEMMAS & ESCALATION */}
        {activeTab === 'dilemmas' && (
          <div className="space-y-6">
            {/* Point 6: Major Dilemmas */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Point 6 • Major Thematic Dilemmas
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blueprint.majorDilemmas?.map((dil, dIdx) => (
                  <div key={dIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{dil.title}</span>
                      <span className="text-[10px] text-slate-500 font-medium">Thematic Dilemma</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-700 block">Choice A: {dil.choiceA}</span>
                        <span className="text-[11px] text-rose-600">Cost: {dil.costA}</span>
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-700 block">Choice B: {dil.choiceB}</span>
                        <span className="text-[11px] text-rose-600">Cost: {dil.costB}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">
                      Thematic weight: {dil.thematicWeight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Point 7: Escalation Structure */}
            {blueprint.escalationStructure && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Point 7 • 5-Stage Dramatic Escalation Structure
                </span>
                <div className="space-y-2">
                  {blueprint.escalationStructure.map((stage, sIdx) => (
                    <div key={sIdx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {stage.stage || sIdx + 1}
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-slate-800">{stage.title}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">{stage.description}</p>
                        <p className="text-[11px] text-indigo-600 font-medium">
                          Trigger: {stage.causalTrigger}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CHAPTER ARCHITECTURE */}
        {activeTab === 'chapters' && (
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Point 9 • Chapter Architecture &amp; Scene Sequences
            </span>
            <div className="space-y-3">
              {blueprint.chapterArchitecture?.map((ch, cIdx) => (
                <div key={cIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800">
                      Chapter {ch.chapterNumber || cIdx + 1}: {ch.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {ch.coreSceneBeats?.length || 0} Scene Beats
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans">{ch.summary}</p>

                  {ch.coreSceneBeats && ch.coreSceneBeats.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Core Scene Beats
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {ch.coreSceneBeats.map((beat, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{beat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ch.visualPromptOrIllustrationNote && (
                    <div className="p-2 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs text-indigo-900 mt-2">
                      <span className="font-bold block text-[10px] uppercase text-indigo-600 mb-0.5">
                        🎨 Illustration &amp; Visual Direction
                      </span>
                      {ch.visualPromptOrIllustrationNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: VISUAL DIRECTION & ENDING */}
        {activeTab === 'visuals' && (
          <div className="space-y-6">
            {/* Point 10: Visual Direction */}
            {blueprint.visualDirection && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Point 10 • Visual Direction &amp; Layout Palette
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Visual Tone</span>
                    <p className="text-slate-800">{blueprint.visualDirection.visualTone}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Page Layout Preset</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded font-mono text-slate-700">
                      {blueprint.visualDirection.pageLayoutStyle}
                    </span>
                  </div>
                </div>

                {blueprint.visualDirection.colorPalette && (
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-500 block mb-1.5">Chromatic Palette</span>
                    <div className="flex items-center gap-2">
                      {blueprint.visualDirection.colorPalette.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-slate-200">
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: c }} />
                          <span className="text-[10px] font-mono text-slate-600">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Point 11: Ending Strategy */}
            {blueprint.endingStrategy && (
              <div className="p-4 bg-indigo-900 text-white rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                  Point 11 • Ending Strategy &amp; Final Image
                </span>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-300 block">Thematic Resolution</span>
                    <p className="text-slate-200">{blueprint.endingStrategy.thematicResolution}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-300 block">Character Arc Payoff</span>
                    <p className="text-slate-200">{blueprint.endingStrategy.characterPayoff}</p>
                  </div>
                  <div className="p-3 bg-indigo-950/80 border border-indigo-800 rounded-lg">
                    <span className="text-[10px] font-bold text-indigo-300 block mb-1">Final Lingering Image</span>
                    <p className="text-indigo-100 italic font-serif leading-relaxed">
                      &quot;{blueprint.endingStrategy.finalImage}&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Blueprint Footer Bar */}
      <div className="bg-slate-100 border-t border-slate-200 p-4 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Status: <span className="font-bold text-slate-700 uppercase">{blueprint.status || 'Draft'}</span> • Ready for StoryForge generation &amp; memory binding
        </div>
        <button
          type="button"
          onClick={onApproveAndApply}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2 transition"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>APPROVE &amp; APPLY TO STUDIO</span>
        </button>
      </div>
    </div>
  );
};
