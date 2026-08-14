import React, { useState } from 'react';
import { Layers, X, Sparkles, RefreshCw, Check, Copy, AlertTriangle, ArrowDown } from 'lucide-react';
import { StoryArchetype, StoryInputFormData } from '../../types';

interface Props {
  archetype: StoryArchetype;
  formData: StoryInputFormData;
  isOpen: boolean;
  onClose: () => void;
  onSelectDilemma?: (dilemma: string) => void;
}

export const DilemmaChainModal: React.FC<Props> = ({
  archetype,
  formData,
  isOpen,
  onClose,
  onSelectDilemma,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chainData, setChainData] = useState<any>(null);
  const [mode, setMode] = useState<'10_chain' | '3_quick' | 'escalating_reaction'>('10_chain');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      generateChain();
    }
  }, [isOpen, mode]);

  const generateChain = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/story-input/generate-dilemma-chain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype,
          formData,
          characterName: formData.centralCharacter?.value || 'Protagonist',
          mode,
        }),
      });
      if (!res.ok) throw new Error('Failed to generate dilemma chain');
      const data = await res.json();
      setChainData(data.chain);
    } catch (err: any) {
      alert(`Dilemma Chain error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!chainData) return;
    const text = `10-LEVEL INTERLOCKING DILEMMA CHAIN (${archetype.toUpperCase()})\n` +
      `Character: ${chainData.characterName}\n` +
      `Summary: ${chainData.dilemmaChainSummary}\n\n` +
      (chainData.levels || []).map((lvl: any) => 
        `LEVEL ${lvl.level}: ${lvl.stageName}\n` +
        `Dilemma: ${lvl.dilemmaTitle}\n` +
        `• Choice A: ${lvl.choiceA} (Cost: ${lvl.costA})\n` +
        `• Choice B: ${lvl.choiceB} (Cost: ${lvl.costB})\n` +
        `• Forced Decision: ${lvl.forcedDecision}\n` +
        `• Leads To: ${lvl.leadsToNext}\n`
      ).join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  10-Level Interlocking Dilemma Engine
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 uppercase">
                  Causal Chain Reaction
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Every decision solves one problem and creates a more severe complication.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setMode('3_quick')}
                className={`px-2.5 py-1 rounded-md transition font-medium ${
                  mode === '3_quick' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                3-Dilemma Quick
              </button>
              <button
                type="button"
                onClick={() => setMode('10_chain')}
                className={`px-2.5 py-1 rounded-md transition font-medium ${
                  mode === '10_chain' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                10-Level Master
              </button>
              <button
                type="button"
                onClick={() => setMode('escalating_reaction')}
                className={`px-2.5 py-1 rounded-md transition font-medium ${
                  mode === 'escalating_reaction' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Escalating Reaction
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <div className="w-9 h-9 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 text-xs font-medium animate-pulse">
                Constructing {mode === '3_quick' ? '3' : '10'} causal dilemma links for {formData.centralCharacter?.value || 'the protagonist'}...
              </p>
            </div>
          ) : chainData ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Chain Reaction Propulsion Rationale
                </span>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  {chainData.dilemmaChainSummary}
                </p>
              </div>

              {/* Levels Timeline */}
              <div className="space-y-3 relative">
                {(chainData.levels || []).map((lvl: any, idx: number) => (
                  <div key={idx} className="relative group">
                    <div className="p-4 bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-xl space-y-3 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs flex items-center justify-center">
                            {lvl.level || idx + 1}
                          </span>
                          <div>
                            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                              Level {lvl.level}: {lvl.stageName}
                            </span>
                            <h4 className="text-sm font-bold text-white">{lvl.dilemmaTitle}</h4>
                          </div>
                        </div>

                        {onSelectDilemma && (
                          <button
                            type="button"
                            onClick={() => onSelectDilemma(lvl.dilemmaTitle)}
                            className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white rounded-md font-medium border border-slate-700 transition"
                          >
                            Use This Dilemma
                          </button>
                        )}
                      </div>

                      {/* Choices Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg space-y-1">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">
                            Choice A
                          </span>
                          <p className="text-xs text-slate-200 font-medium">{lvl.choiceA}</p>
                          <p className="text-[11px] text-red-300/80">⚠️ Cost: {lvl.costA}</p>
                        </div>

                        <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg space-y-1">
                          <span className="text-[10px] font-bold text-sky-400 uppercase font-mono">
                            Choice B
                          </span>
                          <p className="text-xs text-slate-200 font-medium">{lvl.choiceB}</p>
                          <p className="text-[11px] text-red-300/80">⚠️ Cost: {lvl.costB}</p>
                        </div>
                      </div>

                      {/* Forced Decision & Causality */}
                      <div className="p-2.5 bg-slate-900/50 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                        <div>
                          <span className="text-amber-300 font-medium">Forced Resolution: </span>
                          <span className="text-slate-300">{lvl.forcedDecision}</span>
                        </div>
                        {lvl.leadsToNext && (
                          <div className="text-indigo-300 font-mono flex items-center gap-1">
                            <span>➔ Leads to:</span>
                            <span className="text-slate-300">{lvl.leadsToNext}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connector Arrow */}
                    {idx < (chainData.levels.length - 1) && (
                      <div className="flex justify-center my-1.5 text-amber-500/40">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            type="button"
            onClick={generateChain}
            disabled={isLoading}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Re-architect Dilemmas</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!chainData}
            className="text-xs px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition flex items-center gap-1.5 shadow-md"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy All 10 Levels'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
