import React, { useState } from 'react';
import { Wand2, Sparkles, Check, ArrowRight, ShieldAlert, Sliders, RefreshCw, Eye } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { ArtDirectorCritiqueResult } from '../../types';

export const AiArtDirectorPanel: React.FC = () => {
  const { masterStyle, applyArtDirectorPatch, book, aiConfig } = useStory();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critiqueResult, setCritiqueResult] = useState<ArtDirectorCritiqueResult | null>(null);

  // Style Match state
  const [matchDescription, setMatchDescription] = useState('');
  const [isMatching, setIsMatching] = useState(false);

  const handleRunArtDirector = async () => {
    setIsAnalyzing(true);
    setCritiqueResult(null);

    try {
      const response = await fetch('/api/gemini/style/art-director-critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          masterStyle,
          bookSummary: {
            title: book.title,
            genre: book.genre,
            bookType: book.bookType
          },
          model: aiConfig.textModel
        })
      });

      const result = await response.json();
      if (result.success && result.data) {
        setCritiqueResult(result.data);
      }
    } catch (e) {
      console.error('Failed to run AI Art Director critique:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunStyleMatch = async () => {
    if (!matchDescription.trim()) return;
    setIsMatching(true);

    try {
      const response = await fetch('/api/gemini/style/match-reference-style', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceDescription: matchDescription,
          targetBookType: book.bookType,
          model: aiConfig.textModel
        })
      });

      const result = await response.json();
      if (result.success && result.masterStyleProfile) {
        applyArtDirectorPatch(result.masterStyleProfile);
        setMatchDescription('');
        alert('Style successfully matched and applied!');
      }
    } catch (e) {
      console.error('Failed to match reference style:', e);
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-indigo-600" />
            AI Art Director & Style Match Engine
          </h2>
          <p className="text-xs text-slate-500">
            Get professional forensic design critiques, improve contrast and harmony, or reverse-engineer a reference art aesthetic.
          </p>
        </div>
      </div>

      {/* Feature 1: Make It Look Better Diagnostic */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Diagnostic: “Make It Look Better”
            </h3>
          </div>

          <button
            disabled={isAnalyzing}
            onClick={handleRunArtDirector}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition disabled:opacity-50 flex items-center gap-1.5 shadow-2xs"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? 'Analyzing Manuscript Aesthetics...' : 'Run Art Director Audit'}</span>
          </button>
        </div>

        {critiqueResult && (
          <div className="mt-4 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-indigo-600">Critique & Analysis</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  Overall Aesthetic Evaluation
                </h4>
              </div>
              <button
                onClick={() => {
                  if (critiqueResult.recommendedProfilePatch) {
                    applyArtDirectorPatch(critiqueResult.recommendedProfilePatch);
                    alert('Art Director recommendations applied to Master Style!');
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Recommended Patch</span>
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {critiqueResult.aestheticCritique}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-800 block mb-1">Typography Verdict</span>
                <p className="text-[11px] text-slate-500 leading-normal">{critiqueResult.typographyCritique}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-800 block mb-1">Color Harmony Verdict</span>
                <p className="text-[11px] text-slate-500 leading-normal">{critiqueResult.colorHarmonyCritique}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-800 block mb-1">Art Medium Cohesion</span>
                <p className="text-[11px] text-slate-500 leading-normal">{critiqueResult.artMediumCohesionCritique}</p>
              </div>
            </div>

            {critiqueResult.specificActionableImprovements?.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-slate-800">Actionable Steps:</span>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                  {critiqueResult.specificActionableImprovements.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feature 2: Style Match Reference Reverse-Engineering */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Style Match: Reverse-Engineer from Visual Reference
          </h3>
        </div>

        <p className="text-xs text-slate-500">
          Describe any book, movie, artist, or vintage publication. The engine will extract the exact font pairing, palette rules, and medium parameters.
        </p>

        <div className="space-y-3">
          <textarea
            rows={3}
            value={matchDescription}
            onChange={e => setMatchDescription(e.target.value)}
            placeholder="e.g. Wes Anderson's Grand Budapest Hotel: strict pastel symmetry, muted pinks, rich mustard yellow, Cormorant Garamond headings, crisp vintage hotel stationery feel..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-end">
            <button
              disabled={isMatching || !matchDescription.trim()}
              onClick={handleRunStyleMatch}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition disabled:opacity-50 flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMatching ? 'Reverse-Engineering Aesthetics...' : 'Match & Apply Style'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
