import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Zap,
  Layers,
  CheckSquare,
  AlertTriangle,
  GitBranch,
  Sliders,
  CheckCircle2,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const RUNBOOK_STRUCTURES = [
  { id: 'incident_response', name: 'Emergency Incident Response SOP', desc: 'Step-by-step triage, containment, escalation thresholds, and post-mortem protocol.' },
  { id: 'operational_field_manual', name: 'Field Operational Handbook', desc: 'Checklists, equipment loadouts, environmental contingencies, and quick lookups.' },
  { id: 'decision_tree_troubleshooting', name: 'Diagnostic Decision Tree & Triage', desc: 'Binary decision logic branching from observed symptoms to definitive fixes.' },
  { id: 'compliance_audit_guide', name: 'Regulatory Compliance & Audit Guide', desc: 'Checklist verification, evidentiary documentation, and failure mode mitigations.' },
];

const CALLOUT_TYPES = [
  { type: 'DANGER / CRITICAL', color: 'border-rose-500 bg-rose-950/40 text-rose-200', desc: 'Irreversible data loss, legal violation, or physical hazard.' },
  { type: 'WARNING / PREREQUISITE', color: 'border-amber-500 bg-amber-950/40 text-amber-200', desc: 'Required system state before initiating the procedure.' },
  { type: 'OPERATIONAL TIP', color: 'border-emerald-500 bg-emerald-950/40 text-emerald-200', desc: 'Efficiency shortcut or performance optimization.' },
];

export const HandbookRunbookStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedStructure, setSelectedStructure] = useState(RUNBOOK_STRUCTURES[0].id);
  const [procedureName, setProcedureName] = useState('Emergency Database Replica Failover & Partition Recovery');
  const [isGeneratingSop, setIsGeneratingSop] = useState(false);
  const [sopOutput, setSopOutput] = useState<string | null>(null);

  const handleGenerateSop = async () => {
    setIsGeneratingSop(true);
    setSopOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'handbook',
          actionKey: 'generate_sop_runbook',
          actionLabel: 'Generate Standard Operating Procedure (SOP)',
          formData: {
            procedure: procedureName,
            framework: selectedStructure,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setSopOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'SOP generated.');
      } else {
        setSopOutput(`[SOP RUNBOOK SPECIFICATION: ${procedureName.toUpperCase()}]\nFramework: ${selectedStructure}\n\n1. PREREQUISITES & ACCESS CHECKS:\n- Root access to secondary replica node\n- Verified cluster health status via command: \`cluster-ctl status\`\n\n2. STEP-BY-STEP EXECUTION:\n[STEP 1] Isolate split-brain partition by routing read traffic to cold cache.\n[STEP 2] Promote Node B to Primary Leader.\n[STEP 3 - CRITICAL STOP-GATE] Confirm zero replication lag before unlocking write queues.\n\n3. VERIFICATION & SUCCESS CRITERIA:\n- API latency returns below 45ms.\n- Zero dropped transactions in audit ledger.\n\n4. TROUBLESHOOTING BRANCH:\nIF sync fails > 120s → Trigger Snapshot Restore Protocol (Section 4.2).`);
      }
    } catch {
      setSopOutput(`[RUNBOOK SOP]\nProcedure: ${procedureName}\nStructure: ${selectedStructure}`);
    } finally {
      setIsGeneratingSop(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/30 to-emerald-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 shadow-md shadow-teal-500/10">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Handbook & Field Runbook Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950/80 text-teal-300 border border-teal-800 uppercase font-semibold">
                SOP Protocols & Decision Trees
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Step-by-step procedures, failure mode triage, safety callouts, and rapid verification checklists.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600/30 hover:bg-teal-600 text-teal-300 hover:text-white border border-teal-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Operational Dilemmas
          </button>
        </div>
      </div>

      {/* RUNBOOK STRUCTURES */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-teal-400" />
          Procedural Architecture & Framework
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {RUNBOOK_STRUCTURES.map(struc => (
            <div
              key={struc.id}
              onClick={() => setSelectedStructure(struc.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedStructure === struc.id
                  ? 'bg-teal-950/50 border-teal-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-teal-200">{struc.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{struc.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CALLOUT SAMPLES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
        {CALLOUT_TYPES.map(callout => (
          <div key={callout.type} className={`p-3 rounded-xl border ${callout.color}`}>
            <div className="text-[10px] font-mono font-bold uppercase">{callout.type}</div>
            <div className="text-xs mt-1">{callout.desc}</div>
          </div>
        ))}
      </div>

      {/* SOP GENERATOR */}
      <div className="p-4 bg-slate-950/80 border border-teal-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-400" />
            Standard Operating Procedure (SOP) Builder
          </span>
          <button
            onClick={handleGenerateSop}
            disabled={isGeneratingSop}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isGeneratingSop ? 'animate-spin' : ''}`} />
            {isGeneratingSop ? 'Generating SOP...' : 'Draft Complete SOP'}
          </button>
        </div>

        <input
          type="text"
          value={procedureName}
          onChange={e => setProcedureName(e.target.value)}
          placeholder="Enter the title of the procedure or operational runbook..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
        />

        {sopOutput && (
          <div className="p-3.5 bg-slate-900 border border-teal-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {sopOutput}
          </div>
        )}
      </div>
    </div>
  );
};
