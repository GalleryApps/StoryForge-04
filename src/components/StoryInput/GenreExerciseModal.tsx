import React, { useState } from 'react';
import { BookOpen, X, Sparkles, RefreshCw, Check, Copy, Play, CheckCircle2 } from 'lucide-react';
import { StoryArchetype, StoryInputFormData } from '../../types';

interface Props {
  archetype: StoryArchetype;
  exerciseId: string;
  exerciseTitle: string;
  formData: StoryInputFormData;
  isOpen: boolean;
  onClose: () => void;
}

export const GenreExerciseModal: React.FC<Props> = ({
  archetype,
  exerciseId,
  exerciseTitle,
  formData,
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseData, setExerciseData] = useState<any>(null);
  const [userWriting, setUserWriting] = useState('');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen && exerciseId) {
      loadExercise();
    } else {
      setExerciseData(null);
      setUserWriting('');
    }
  }, [isOpen, exerciseId]);

  const loadExercise = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/story-input/genre-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype,
          exerciseId,
          exerciseTitle,
          storyContext: formData,
        }),
      });
      if (!res.ok) throw new Error('Failed to load exercise');
      const data = await res.json();
      setExerciseData(data.exercise);
    } catch (err: any) {
      alert(`Exercise error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!exerciseData) return;
    const text = `EXERCISE: ${exerciseData.exerciseTitle} (${archetype.toUpperCase()})\n\n` +
      `MISSION: ${exerciseData.mission}\n\n` +
      `CONSTRAINTS:\n${(exerciseData.constraints || []).map((c: string) => `• ${c}`).join('\n')}\n\n` +
      `PROMPT:\n${exerciseData.starterPrompt}\n\n` +
      `DEMONSTRATION:\n${exerciseData.demonstration}\n\n` +
      (userWriting ? `MY DRAFT:\n${userWriting}\n` : '');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {exerciseTitle}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                  Author Lab
                </span>
              </div>
              <p className="text-xs text-slate-400">
                High-craft constraint workshop tailored to {(archetype || '').replace(/_/g, ' ')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <div className="w-9 h-9 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 text-xs font-medium animate-pulse">
                Setting up specialized laboratory constraints for {exerciseTitle}...
              </p>
            </div>
          ) : exerciseData ? (
            <div className="space-y-5">
              {/* Mission */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  Craft Objective & Mission
                </span>
                <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                  {exerciseData.mission}
                </p>
              </div>

              {/* Strict Constraints */}
              {exerciseData.constraints && exerciseData.constraints.length > 0 && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                    <span>⚡ Hard Constraints (Forces Mastery)</span>
                  </span>
                  <ul className="space-y-1.5">
                    {exerciseData.constraints.map((c: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <span className="text-amber-400 font-bold">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Starter Prompt */}
              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 font-mono">
                  Exercise Starter Scenario
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-serif italic">
                  &ldquo;{exerciseData.starterPrompt}&rdquo;
                </p>
              </div>

              {/* Demonstration */}
              {exerciseData.demonstration && (
                <div className="p-4 bg-slate-950/90 border border-indigo-950 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
                    Masterclass Example
                  </span>
                  <p className="text-xs text-slate-300 font-serif leading-relaxed whitespace-pre-wrap">
                    {exerciseData.demonstration}
                  </p>
                </div>
              )}

              {/* Interactive Writing Sandbox */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                    Your Exercise Draft Sandbox
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {userWriting.length} characters • {userWriting.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  value={userWriting}
                  onChange={(e) => setUserWriting(e.target.value)}
                  placeholder="Draft your scene or lines here under the constraints..."
                  rows={6}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/70 leading-relaxed font-serif"
                />
              </div>

              {/* Revision Checklist */}
              {exerciseData.revisionChecklist && exerciseData.revisionChecklist.length > 0 && (
                <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Self-Critique Checklist
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exerciseData.revisionChecklist.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            type="button"
            onClick={loadExercise}
            disabled={isLoading}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Generate New Variation</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!exerciseData}
            className="text-xs px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition flex items-center gap-1.5 shadow-md"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Exercise & Draft' : 'Copy Exercise'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
