import React, { useState } from 'react';
import { Sparkles, Check, ChevronDown, RefreshCw, X, ShieldAlert, Zap, Edit3, HelpCircle } from 'lucide-react';
import { FactTier, FieldItem } from '../../types';

interface FieldInputWrapperProps {
  label: string;
  description?: string;
  field: FieldItem<string>;
  onChange: (updatedField: FieldItem<string>) => void;
  onSuggestAi?: () => Promise<void>;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  options?: string[]; // predefined suggestions or select options
  isSelect?: boolean;
  badgeOnly?: boolean;
}

export const FieldInputWrapper: React.FC<FieldInputWrapperProps> = ({
  label,
  description,
  field,
  onChange,
  onSuggestAi,
  multiline = false,
  rows = 3,
  placeholder = '',
  options = [],
  isSelect = false,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

  const tier = field?.tier || 'USER_FACT';
  const isSkipped = field?.isSkipped || false;

  const getTierBadge = (t: FactTier) => {
    switch (t) {
      case 'USER_FACT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200" title="Immutable user constraint. AI will never violate or alter this.">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
            USER FACT
          </span>
        );
      case 'USER_PREFERENCE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200" title="User stylistic guidance and structural preference.">
            <Edit3 className="w-2.5 h-2.5" />
            USER PREFERENCE
          </span>
        );
      case 'AI_SUGGESTION':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse" title="Proposed by AI. Not established as canon until accepted.">
            <Sparkles className="w-2.5 h-2.5 text-amber-600" />
            AI SUGGESTION
          </span>
        );
      case 'AI_INFERRED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200" title="Inferred logically by AI from your user facts.">
            <Zap className="w-2.5 h-2.5 text-purple-600" />
            AI INFERRED
          </span>
        );
    }
  };

  const handleValueChange = (val: string) => {
    onChange({
      ...field,
      value: val,
      tier: tier === 'AI_SUGGESTION' || tier === 'AI_INFERRED' ? 'USER_FACT' : tier,
      isSkipped: false,
    });
  };

  const handleSkipToggle = () => {
    onChange({
      ...field,
      isSkipped: !isSkipped,
    });
  };

  const handleAcceptAsFact = () => {
    onChange({
      ...field,
      tier: 'USER_FACT',
      isSkipped: false,
    });
  };

  const handleSuggest = async () => {
    if (!onSuggestAi) return;
    try {
      setIsGenerating(true);
      await onSuggestAi();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`p-3.5 rounded-xl border transition-all duration-150 ${
      isSkipped 
        ? 'bg-slate-50/70 border-slate-200 opacity-60' 
        : tier === 'AI_SUGGESTION'
        ? 'bg-amber-50/30 border-amber-200 shadow-xs'
        : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
    }`}>
      {/* Header with Label and Status Badge */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-xs font-semibold text-slate-800 tracking-tight">
              {label}
            </label>
            {getTierBadge(tier)}
            {isSkipped && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 font-medium">
                SKIPPED
              </span>
            )}
          </div>
          {description && (
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              {description}
            </p>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {(tier === 'AI_SUGGESTION' || tier === 'AI_INFERRED') && (
            <button
              type="button"
              onClick={handleAcceptAsFact}
              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-medium flex items-center gap-1 shadow-xs transition"
              title="Lock this suggestion into an established User Fact"
            >
              <Check className="w-3 h-3" />
              <span className="hidden sm:inline">Accept Fact</span>
            </button>
          )}

          {onSuggestAi && (
            <button
              type="button"
              onClick={handleSuggest}
              disabled={isGenerating}
              className="px-2 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1 border border-slate-200 transition"
              title="Ask AI to generate a high-craft proposal for this specific field"
            >
              <Sparkles className={`w-3 h-3 text-indigo-600 ${isGenerating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">AI Suggest</span>
            </button>
          )}

          {options.length > 0 && !isSelect && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1 border border-slate-200 transition"
              >
                <span>Options</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
              {showOptionsDropdown && (
                <div className="absolute right-0 top-full mt-1 w-64 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        handleValueChange(opt);
                        setShowOptionsDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 truncate"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={handleSkipToggle}
            className={`px-1.5 py-1 rounded text-[11px] font-medium transition ${
              isSkipped ? 'bg-slate-200 text-slate-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isSkipped ? "Unskip this field" : "Skip this field (AI will infer if needed)"}
          >
            {isSkipped ? "Unskip" : "Skip"}
          </button>
        </div>
      </div>

      {/* Input Element */}
      {!isSkipped && (
        <div className="mt-2">
          {isSelect ? (
            <select
              value={field?.value || ''}
              onChange={e => handleValueChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            >
              {placeholder && <option value="">{placeholder}</option>}
              {options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : multiline ? (
            <textarea
              rows={rows}
              value={field?.value || ''}
              onChange={e => handleValueChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-y leading-relaxed font-sans placeholder:text-slate-400"
            />
          ) : (
            <input
              type="text"
              value={field?.value || ''}
              onChange={e => handleValueChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-slate-400"
            />
          )}
        </div>
      )}
    </div>
  );
};
