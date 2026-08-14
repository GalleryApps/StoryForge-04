import React, { useState } from 'react';
import { History, FileCheck, AlertTriangle, AlertCircle, CheckCircle2, RotateCcw, Plus, Sparkles, Lock } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { StyleAuditIssue } from '../../types';

export const StyleAuditVersioningPanel: React.FC = () => {
  const { masterStyle, saveStyleVersion, restoreStyleVersion, runStyleAuditAi, isAiGenerating } = useStory();

  const [auditIssues, setAuditIssues] = useState<StyleAuditIssue[]>([]);
  const [hasAudited, setHasAudited] = useState(false);
  const [snapshotNote, setSnapshotNote] = useState('');

  const handleRunAudit = async () => {
    const issues = await runStyleAuditAi();
    setAuditIssues(issues);
    setHasAudited(true);
  };

  const handleCreateSnapshot = () => {
    saveStyleVersion(snapshotNote.trim() || 'Manual Design Checkpoint');
    setSnapshotNote('');
  };

  const versions = masterStyle.versions || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-600" />
            Style Consistency Audit & Version Checkpoints
          </h2>
          <p className="text-xs text-slate-500">
            Forensic analysis of color collisions, font inconsistencies, and timeline snapshots of your design systems.
          </p>
        </div>
      </div>

      {/* Feature 1: Style Consistency Audit */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Forensic Manuscript Style Audit
            </h3>
          </div>

          <button
            disabled={isAiGenerating}
            onClick={handleRunAudit}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition disabled:opacity-50 flex items-center gap-1.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAiGenerating ? 'Auditing Manuscript...' : 'Run Consistency Audit'}</span>
          </button>
        </div>

        {hasAudited && (
          <div className="space-y-3 pt-2">
            {auditIssues.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero style inconsistencies found! All 500-page typography, palettes, and character profiles are 100% harmonious.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700">
                  Found {auditIssues.length} Potential Style Drift Issues:
                </div>
                {auditIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-lg border text-xs flex items-start gap-3 ${
                      issue.severity === 'error'
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : issue.severity === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                    }`}
                  >
                    {issue.severity === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                    {issue.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                    {issue.severity === 'suggestion' && <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />}

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold uppercase text-[10px] tracking-wider px-1.5 py-0.2 rounded bg-white/70">
                          {issue.category} • {issue.location || 'Manuscript Scope'}
                        </span>
                        <span className="text-[10px] uppercase font-bold">{issue.severity}</span>
                      </div>
                      <p className="font-medium">{issue.description}</p>
                      {issue.suggestedFix && (
                        <p className="text-[11px] opacity-80 mt-1">
                          <strong>Fix:</strong> {issue.suggestedFix}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feature 2: Style Versioning & Snapshots */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Style Version Snapshots & History
            </h3>
          </div>
        </div>

        {/* Create Snapshot Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={snapshotNote}
            onChange={e => setSnapshotNote(e.target.value)}
            placeholder="Snapshot label (e.g. Before Noir Palette Shift, After Editorial Review)..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleCreateSnapshot}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shrink-0 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Save Style Snapshot</span>
          </button>
        </div>

        {/* History List */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Checkpoint History ({versions.length})
          </div>

          {versions.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">
              No saved snapshots yet. Create one above to preserve your design state.
            </p>
          ) : (
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {versions.slice().reverse().map(ver => (
                <div key={ver.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{ver.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(ver.timestamp).toLocaleString()} • {ver.note}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Restore snapshot "${ver.name}"? This will overwrite your current active master style.`)) {
                        restoreStyleVersion(ver.id);
                      }
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-indigo-600 text-xs font-semibold transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restore</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
