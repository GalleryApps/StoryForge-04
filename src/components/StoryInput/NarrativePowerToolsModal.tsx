import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  ShieldAlert,
  HelpCircle,
  X,
  Check,
  RefreshCw,
  Plus,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { StoryInputFormData, StoryArchetype } from '../../types';

interface NarrativePowerToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolType: 'make-richer' | 'make-harder' | 'what-could-go-wrong' | 'novelists-room';
  formData: StoryInputFormData;
  archetype: StoryArchetype;
  onApplyEnrichment: (result: any) => void;
}

export const NarrativePowerToolsModal: React.FC<NarrativePowerToolsModalProps> = ({
  isOpen,
  onClose,
  toolType,
  formData,
  archetype,
  onApplyEnrichment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getToolTitle = () => {
    switch (toolType) {
      case 'make-richer':
        return {
          title: 'MAKE THIS STORY RICHER',
          subtitle: 'Inject compelling subplots, hidden secrets, dramatic reversals, and thematic motifs.',
          icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
        };
      case 'make-harder':
        return {
          title: 'MAKE IT HARDER',
          subtitle: '9-Category Obstacle Matrix: Elevate resistance, strip advantages, and close easy exits.',
          icon: <Flame className="w-5 h-5 text-rose-400" />,
        };
      case 'what-could-go-wrong':
        return {
          title: 'WHAT COULD GO WRONG?',
          subtitle: 'Rigorous consequence testing: Attack character flaws, invert assumptions, and generate crisis.',
          icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
        };
      case 'novelists-room':
        return {
          title: "NOVELIST'S ROOM",
          subtitle: 'Tough-love developmental editor feedback: Find where it is too easy, passive, or predictable.',
          icon: <Zap className="w-5 h-5 text-purple-400" />,
        };
    }
  };

  const handleRunTool = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const endpointMap = {
        'make-richer': '/api/gemini/story-input/make-richer',
        'make-harder': '/api/gemini/story-input/make-harder',
        'what-could-go-wrong': '/api/gemini/story-input/what-could-go-wrong',
        'novelists-room': '/api/gemini/story-input/novelists-room',
      };

      const res = await fetch(endpointMap[toolType], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, archetype }),
      });

      if (!res.ok) throw new Error('Narrative power tool analysis failed.');
      const data = await res.json();
      setResultData(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setResultData(null);
      handleRunTool();
    }
  }, [isOpen, toolType]);

  if (!isOpen) return null;

  const toolMeta = getToolTitle();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg">{toolMeta.icon}</div>
            <div>
              <h3 className="font-bold text-base tracking-tight text-white">{toolMeta.title}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{toolMeta.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-xs font-semibold text-slate-700">
                Running narrative developmental diagnostics...
              </p>
              <p className="text-[11px] text-slate-400">Evaluating subplots, tensions, obstacles, and psychological stakes</p>
            </div>
          ) : errorMsg ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Analysis Error</p>
                <p>{errorMsg}</p>
                <button
                  onClick={handleRunTool}
                  className="mt-2 text-rose-800 underline font-semibold"
                >
                  Retry Analysis
                </button>
              </div>
            </div>
          ) : resultData ? (
            <div className="space-y-4">
              {/* MAKE RICHER RESULTS */}
              {toolType === 'make-richer' && (
                <div className="space-y-4">
                  {/* Proposed Subplots */}
                  {resultData.suggestedSubplots && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Interwoven Subplot Proposals
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {resultData.suggestedSubplots.map((sub: any, idx: number) => (
                          <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                            <span className="text-xs font-bold text-slate-800 block">{sub.title}</span>
                            <p className="text-xs text-slate-600"><strong>Conflict:</strong> {sub.conflict}</p>
                            <p className="text-[11px] text-indigo-600"><strong>Intersection:</strong> {sub.intersectionWithMainPlot}</p>
                            <p className="text-[11px] text-slate-500 italic">{sub.whyThisHelps}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Character Secrets */}
                  {resultData.hiddenSecrets && (
                    <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                        Hidden Character Secrets &amp; Reversals
                      </span>
                      <div className="space-y-2">
                        {resultData.hiddenSecrets.map((sec: any, idx: number) => (
                          <div key={idx} className="p-2.5 bg-white rounded-lg border border-indigo-100 text-xs">
                            <span className="font-bold text-slate-800">{sec.character}: </span>
                            <span className="text-slate-700">{sec.secret} </span>
                            <span className="text-indigo-600 block mt-1">Reveal: {sec.howItIsRevealed}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Thematic Motifs */}
                  {resultData.thematicMotifs && (
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-bold text-slate-700 block mb-1">
                        Atmospheric Motifs &amp; Symbols
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {resultData.thematicMotifs.map((m: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-xs text-slate-700 font-medium">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MAKE HARDER RESULTS */}
              {toolType === 'make-harder' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    9-Category Obstacle &amp; Escalation Matrix
                  </span>
                  <div className="space-y-2.5">
                    {resultData.obstacles?.map((obs: any, idx: number) => (
                      <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase">
                            {obs.category} Obstacle
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">Severity: Extreme</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">{obs.title}</h4>
                        <p className="text-xs text-slate-600">{obs.description}</p>
                        <div className="p-2 bg-white rounded border border-slate-200 text-xs">
                          <span className="text-rose-600 font-semibold">Cost to Protagonist: </span>
                          <span className="text-slate-700">{obs.costToProtagonist}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WHAT COULD GO WRONG RESULTS */}
              {toolType === 'what-could-go-wrong' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Unforeseen Failures &amp; Plot Complications
                  </span>
                  <div className="space-y-2.5">
                    {resultData.failurePoints?.map((fail: any, idx: number) => (
                      <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-800">{fail.unintendedConsequence}</h4>
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                            Consequence
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          <strong>Flaw Exploited:</strong> {fail.characterFlawAttacked}
                        </p>
                        <div className="p-2 bg-amber-50/70 border border-amber-100 rounded text-xs text-amber-900">
                          <strong>New Narrative Opportunity:</strong> {fail.narrativeOpportunity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NOVELIST'S ROOM RESULTS */}
              {toolType === 'novelists-room' && (
                <div className="space-y-4">
                  {/* What Works */}
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                      ✓ What Is Strong &amp; Working
                    </span>
                    <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                      {resultData.whatWorks}
                    </p>
                  </div>

                  {/* Where It Is Too Easy */}
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                      ⚠ Where the Journey Is Too Easy or Convenient
                    </span>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      {resultData.whereTooEasy}
                    </p>
                  </div>

                  {/* Passive Protagonist & Stakes Checks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 block">
                        Agency Check
                      </span>
                      <p className="text-xs text-slate-600">{resultData.passiveProtagonistCheck}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 block">
                        Stakes Legibility Check
                      </span>
                      <p className="text-xs text-slate-600">{resultData.unclearStakesCheck}</p>
                    </div>
                  </div>

                  {/* Actionable Fixes */}
                  {resultData.actionableFixes && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Recommended Surgical Revisions
                      </span>
                      <div className="space-y-2">
                        {resultData.actionableFixes.map((fix: string, idx: number) => (
                          <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-snug">{fix}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunTool}
              disabled={isLoading}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Rerun Diagnostic</span>
            </button>
            {resultData && (
              <button
                onClick={() => {
                  onApplyEnrichment(resultData);
                  onClose();
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Findings to Form</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
