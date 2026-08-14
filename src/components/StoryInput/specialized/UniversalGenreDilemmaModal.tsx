import React, { useState, useEffect } from 'react';
import { Layers, X, Sparkles, RefreshCw, Copy, Check, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { GenreWorkspaceProfile } from '../../../data/genreOntology';

interface Props {
  workspace: GenreWorkspaceProfile;
  isOpen: boolean;
  onClose: () => void;
  bookContext: {
    title: string;
    coreIdea: string;
    subgenre?: string;
  };
}

export const UniversalGenreDilemmaModal: React.FC<Props> = ({
  workspace,
  isOpen,
  onClose,
  bookContext,
}) => {
  const [generationMode, setGenerationMode] = useState<'3_quick' | '10_standalone' | 'chain_10' | 'craft_7_level'>('chain_10');
  const [loading, setLoading] = useState<boolean>(false);
  const [dilemmaData, setDilemmaData] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    }
  }, [isOpen, generationMode]);

  const handleGenerate = async () => {
    setLoading(true);
    setDilemmaData(null);
    try {
      const res = await fetch('/api/gemini/genre/generate-dilemmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: workspace.id,
          broadCategory: workspace.broadCategory,
          mode: generationMode,
          context: {
            title: bookContext.title || 'Untitled Work',
            coreIdea: bookContext.coreIdea || 'Core domain concept and narrative premise',
            subgenre: bookContext.subgenre || workspace.subgenres[0]?.name,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to generate dilemmas');
      const data = await res.json();
      setDilemmaData(data);
    } catch (err: any) {
      console.error('Dilemma generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!dilemmaData) return;
    const text = JSON.stringify(dilemmaData, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: workspace.accentColor }}
            >
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Universal Dilemma & Escalation Engine
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700 uppercase">
                  {workspace.title}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate domain-specific high-stakes dilemmas, cascading reactions, or progressive craft sequences.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!dilemmaData}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy All'}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap gap-2">
          {[
            { id: 'chain_10', label: '10-Stage Causal Chain Reaction' },
            { id: 'craft_7_level', label: '7-Level Progressive Craft Dilemma' },
            { id: '10_standalone', label: '10 Standalone High-Stakes Dilemmas' },
            { id: '3_quick', label: '3 Quick Core Dilemmas' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setGenerationMode(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                generationMode === tab.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading && (
            <div className="p-12 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3 text-center">
              <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
              <p className="text-sm font-bold text-white">
                Synthesizing {generationMode.replace('_', ' ')} for {workspace.title}...
              </p>
              <p className="text-xs text-slate-500">
                Calculating trade-offs, forced choices, and compounding narrative consequences with Gemini.
              </p>
            </div>
          )}

          {!loading && dilemmaData && (
            <div className="space-y-4">
              {/* If Chain 10 Mode */}
              {dilemmaData.levels && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                    <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-1">
                      Causal Chain Summary
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {dilemmaData.dilemmaChainSummary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {dilemmaData.levels.map((lvl: any, i: number) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase font-bold text-amber-400">
                            Level {lvl.level}: {lvl.stageName}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            Stage {i + 1} of 10
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{lvl.dilemmaTitle}</h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                            <span className="text-emerald-400 font-bold font-mono">Choice A:</span> {lvl.choiceA}
                            <div className="text-[11px] text-slate-500 mt-1 font-mono">Cost: {lvl.costA}</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                            <span className="text-rose-400 font-bold font-mono">Choice B:</span> {lvl.choiceB}
                            <div className="text-[11px] text-slate-500 mt-1 font-mono">Cost: {lvl.costB}</div>
                          </div>
                        </div>

                        <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                          <ArrowRight className="w-3 h-3 text-indigo-400 shrink-0" />
                          <span><strong className="text-slate-300">Next Complication:</strong> {lvl.leadsToNext}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* If Standalone Dilemmas */}
              {dilemmaData.dilemmas && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dilemmaData.dilemmas.map((d: any, i: number) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-bold">
                          Dilemma #{i + 1}
                        </span>
                        {d.severity && (
                          <span className="text-[9px] font-mono uppercase bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                            {d.severity}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white">{d.title || d.dilemma}</h4>
                      <p className="text-xs text-slate-400">{d.description || d.context}</p>
                      <div className="p-2 rounded bg-slate-900 text-xs text-slate-300 space-y-1 font-mono">
                        <div><strong className="text-emerald-400">Opt 1:</strong> {d.optionA || d.choiceA}</div>
                        <div><strong className="text-rose-400">Opt 2:</strong> {d.optionB || d.choiceB}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-between items-center bg-slate-950/80">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate Dilemmas
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
