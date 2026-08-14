import React, { useState } from 'react';
import { Sparkles, X, Check, Copy, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { StoryArchetype, StoryInputFormData } from '../../types';

interface Props {
  archetype: StoryArchetype;
  actionKey: string;
  actionLabel: string;
  formData: StoryInputFormData;
  isOpen: boolean;
  onClose: () => void;
  onApplyPatch?: (patch: any) => void;
}

export const GenreActionModal: React.FC<Props> = ({
  archetype,
  actionKey,
  actionLabel,
  formData,
  isOpen,
  onClose,
  onApplyPatch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  React.useEffect(() => {
    if (isOpen && actionKey) {
      executeAction();
    } else {
      setResult(null);
      setApplied(false);
    }
  }, [isOpen, actionKey]);

  const executeAction = async () => {
    setIsLoading(true);
    setApplied(false);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype,
          actionKey,
          actionLabel,
          formData,
        }),
      });
      if (!res.ok) throw new Error('Genre action execution failed');
      const data = await res.json();
      setResult(data.result);
    } catch (err: any) {
      alert(`Action error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.title || actionLabel}\n\n${result.narrativeAddition || ''}\n\n${(result.bulletPoints || []).map((b: string) => `• ${b}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApply = () => {
    if (!result?.suggestedPatch || !onApplyPatch) return;
    onApplyPatch(result.suggestedPatch);
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">{actionLabel}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
                  {(archetype || '').replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Genre-specific AI transformation engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-200">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 text-xs font-medium animate-pulse">
                Executing {actionLabel} with specialized {(archetype || '').replace(/_/g, ' ')} rules...
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4">
              {/* Title & Craft Analysis */}
              <div className="p-3.5 bg-slate-800/80 border border-slate-700/80 rounded-xl space-y-1.5">
                <h4 className="text-sm font-bold text-indigo-300">{result.title}</h4>
                {result.craftAnalysis && (
                  <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    💡 Craft Impact: {result.craftAnalysis}
                  </p>
                )}
              </div>

              {/* Narrative Addition */}
              {result.narrativeAddition && (
                <div className="p-4 bg-slate-950 border border-indigo-900/40 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
                    Narrative Evolution / Scene Beat
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {result.narrativeAddition}
                  </p>
                </div>
              )}

              {/* Bullet Points */}
              {result.bulletPoints && result.bulletPoints.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Key Specific Developments
                  </span>
                  <ul className="space-y-1.5">
                    {result.bulletPoints.map((bp: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Visual Prompt if applicable */}
              {result.visualPrompt && (
                <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl space-y-1 text-amber-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                    Visual / Illustration Direction
                  </span>
                  <p className="text-[11px] leading-relaxed italic">&ldquo;{result.visualPrompt}&rdquo;</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400">Ready to execute.</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={executeAction}
            disabled={isLoading}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium border border-slate-700 transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {onApplyPatch && result?.suggestedPatch && (
              <button
                type="button"
                onClick={handleApply}
                disabled={applied || !result}
                className="text-xs px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition flex items-center gap-1.5 shadow-md"
              >
                {applied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{applied ? 'Applied to Form' : 'Apply to Story'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
