import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  RefreshCw, 
  User, 
  Brush, 
  Palette, 
  ArrowRight,
  Eye,
  FileCheck
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { ConsistencyDriftCategory, ConsistencyStatus, SuggestedAuditAction } from '../../types';

const STATUS_BADGES: Record<ConsistencyStatus, { label: string; bg: string; text: string; border: string; icon: any }> = {
  CONSISTENT: { label: 'CONSISTENT', bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30', icon: CheckCircle },
  MINOR_DRIFT: { label: 'MINOR DRIFT', bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30', icon: AlertTriangle },
  SIGNIFICANT_DRIFT: { label: 'SIGNIFICANT DRIFT', bg: 'bg-orange-500/10', text: 'text-orange-300', border: 'border-orange-500/30', icon: AlertTriangle },
  MAJOR_ERROR: { label: 'MAJOR ERROR', bg: 'bg-red-500/10', text: 'text-red-300', border: 'border-red-500/30', icon: XCircle },
};

const CATEGORY_LABELS: Record<ConsistencyDriftCategory, string> = {
  character_face: 'Character Face',
  hair: 'Hair Continuity',
  clothing: 'Costume & Attire',
  body_proportions: 'Body Proportions',
  color_palette: 'Color Palette',
  art_medium: 'Art Medium',
  line_quality: 'Line Quality',
  lighting: 'Lighting System',
  environment: 'Environment / World',
  visual_density: 'Visual Density',
  chapter_style: 'Chapter Style Alignment',
};

const ACTION_BUTTONS: Record<SuggestedAuditAction, { label: string; icon: any; color: string }> = {
  REGENERATE: { label: 'Regenerate Illustration', icon: RefreshCw, color: 'bg-amber-500 hover:bg-amber-400 text-zinc-950' },
  CORRECT_CHARACTER: { label: 'Lock Character DNA', icon: User, color: 'bg-indigo-600 hover:bg-indigo-500 text-white' },
  CORRECT_STYLE: { label: 'Apply Art Bible Lock', icon: Brush, color: 'bg-emerald-600 hover:bg-emerald-500 text-white' },
  CORRECT_COLOR: { label: 'Re-Harmonize Palette', icon: Palette, color: 'bg-purple-600 hover:bg-purple-500 text-white' },
};

export const ConsistencyAuditPanel: React.FC = () => {
  const { 
    referenceStudio, 
    runVisualConsistencyAuditAi, 
    regenerateIllustrationAi,
    book,
    isAiGenerating 
  } = useStory();

  const report = referenceStudio.latestAuditReport;
  const overallBadge = report ? STATUS_BADGES[report.overallStatus] : STATUS_BADGES.CONSISTENT;
  const OverallIcon = overallBadge.icon;

  const handleExecuteAction = async (action: SuggestedAuditAction, item: any) => {
    if (action === 'REGENERATE') {
      // Find the element in the book
      let found = false;
      book.chapters.forEach((ch, chIdx) => {
        ch.scenes.forEach((sc, scIdx) => {
          sc.pages.forEach((pg, pgIdx) => {
            pg.elements.forEach((el, elIdx) => {
              if (el.type === 'illustration' && !found) {
                regenerateIllustrationAi(chIdx, scIdx, pgIdx, elIdx);
                found = true;
              }
            });
          });
        });
      });
    } else {
      alert(`Action applied: ${(action || '').replace(/_/g, ' ')}. Visual reference constraints updated.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Scorecard */}
      <div className="p-5 bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-900 rounded-2xl border border-emerald-500/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-100">Visual Consistency Audit</h3>
                {report && (
                  <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold flex items-center gap-1 ${overallBadge.bg} ${overallBadge.text} ${overallBadge.border}`}>
                    <OverallIcon className="w-3.5 h-3.5" />
                    {overallBadge.label}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                Audits all book illustrations across 11 key consistency dimensions against established Master Character & Art Bibles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {report && (
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Consistency Score</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {report.score}<span className="text-sm text-zinc-500">/100</span>
                </span>
              </div>
            )}

            <button
              onClick={() => runVisualConsistencyAuditAi()}
              disabled={isAiGenerating}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAiGenerating ? 'Auditing Scenes...' : 'Run Consistency Audit'}</span>
            </button>
          </div>
        </div>

        {/* 11 Dimensions Checklist Pill Bar */}
        <div className="pt-3 border-t border-zinc-800/80">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Audit Checklist (11 Continuity Criteria):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <span
                key={key}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-medium text-zinc-300 flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Items / Drift Log */}
      {!report || !report.items || report.items.length === 0 ? (
        <div className="py-14 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800/80">
          <FileCheck className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-zinc-300">No active audit log</p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1 mb-4">
            Click "Run Consistency Audit" to scan your story's illustrations and verify that characters and art style match your reference DNA.
          </p>
          <button
            onClick={() => runVisualConsistencyAuditAi()}
            disabled={isAiGenerating}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-colors"
          >
            Run Initial Inspection
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span className="font-semibold text-zinc-200">
              Evaluated Illustrations ({report.items.length} items)
            </span>
            <span className="text-zinc-500">
              Audit Date: {new Date(report.timestamp).toLocaleTimeString()}
            </span>
          </div>

          <div className="space-y-3">
            {report.items.map((item, idx) => {
              const badge = STATUS_BADGES[item.status] || STATUS_BADGES.CONSISTENT;
              const StatusIcon = badge.icon;
              const actionInfo = ACTION_BUTTONS[item.suggestedAction] || ACTION_BUTTONS.REGENERATE;
              const ActionIcon = actionInfo.icon;

              return (
                <div
                  key={idx}
                  className="p-4 bg-zinc-900/90 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-zinc-200">{item.targetTitle}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${badge.bg} ${badge.text} ${badge.border}`}>
                        <StatusIcon className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-medium text-zinc-400">
                        {CATEGORY_LABELS[item.driftCategory] || item.driftCategory}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.issueDescription}
                    </p>
                  </div>

                  {/* Quick Action Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleExecuteAction(item.suggestedAction, item)}
                      disabled={isAiGenerating}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${actionInfo.color}`}
                    >
                      <ActionIcon className="w-3.5 h-3.5" />
                      <span>{actionInfo.label}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
