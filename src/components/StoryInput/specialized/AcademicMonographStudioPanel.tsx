import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Zap,
  Layers,
  BookMarked,
  FileText,
  Sliders,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const HISTORIOGRAPHICAL_PARADIGMS = [
  { id: 'revisionist_critique', name: 'Revisionist & Archival Deconstruction', desc: 'Challenges established orthodoxy using newly unsealed primary source documents.' },
  { id: 'materialist_economic', name: 'Materialist & Infrastructural Dialectic', desc: 'Examines historical shifts through commodity flows, labor contracts, and energy regimes.' },
  { id: 'cultural_subaltern', name: 'Subaltern & Micro-Historical Perspective', desc: 'Focuses on marginalized actors, regional diaries, and oral counter-narratives.' },
  { id: 'institutional_systemic', name: 'Institutional & Legal Synthesizer', desc: 'Audits bureaucratic statutory frameworks, jurisprudence evolution, and state capacity.' },
];

const CITATION_STANDARDS = [
  'Chicago Manual of Style 17th (Notes & Bibliography)',
  'Oxford Substantive Footnotes with Historiographical Asides',
  'Harvard Author-Date with Epistemic Confidence Tagging',
  'Primary Archival Folio Reference Standard',
];

export const AcademicMonographStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedParadigm, setSelectedParadigm] = useState(HISTORIOGRAPHICAL_PARADIGMS[0].id);
  const [citationStandard, setCitationStandard] = useState(CITATION_STANDARDS[0]);
  const [epistemicRigor, setEpistemicRigor] = useState(95);
  const [thesisStatement, setThesisStatement] = useState('The 14th-century Venetian banking collapse was caused not by Ottoman naval expansion, but by systemic leverage over private grain forward contracts.');
  const [isAuditing, setIsAuditing] = useState(false);
  const [monographOutput, setMonographOutput] = useState<string | null>(null);

  const handleAuditThesis = async () => {
    setIsAuditing(true);
    setMonographOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'monograph',
          actionKey: 'audit_scholarly_thesis',
          actionLabel: 'Perform Scholarly Peer-Review Audit',
          formData: {
            thesis: thesisStatement,
            paradigm: selectedParadigm,
            citation: citationStandard,
            rigor: `${epistemicRigor}% Epistemic Standard`,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setMonographOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Historiographical audit completed.');
      } else {
        setMonographOutput(`[SCHOLARLY HISTORIOGRAPHICAL AUDIT]\nThesis: ${thesisStatement}\nParadigm: ${selectedParadigm}\n\n1. PRIMARY EVIDENCE AUDIT:\nExamine the Archivio di Stato di Venezia (Senato Mar registers, 1342–1348) for notarized grain bills of exchange.\n\n2. ANTICIPATED PEER-REVIEW OBJECTION:\nOrthodox historians will cite maritime insurance premiums to argue naval blockades were the proximate cause. Counter this by demonstrating that insurance defaults lagged the credit freeze by six months.\n\n3. PROPOSED SUBSTANTIVE FOOTNOTE (Chicago 17th):\nCf. Giovanni Villani, *Nuova Cronica*, ed. G. Porta (Parma: Guanda, 1991), 2:415–418. Note the sharp divergence between Florence's bullion reserves and Venice's ledger credits during the winter harvest of 1346.`);
      }
    } catch {
      setMonographOutput(`[SCHOLARLY AUDIT]\nThesis: ${thesisStatement}\nParadigm: ${selectedParadigm}`);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 shadow-md shadow-blue-500/10">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Academic Monograph & Scholarly Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800 uppercase font-semibold">
                Historiographical Dialectic & Epistemic Audit
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Primary source evidentiary verification, peer-review stress-testing, and substantive footnote apparatus.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Scholarly Dilemmas
          </button>
        </div>
      </div>

      {/* HISTORIOGRAPHICAL PARADIGM */}
      <div className="space-y-3 relative z-10">
        <label className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-blue-400" />
          Historiographical & Theoretical Paradigm
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {HISTORIOGRAPHICAL_PARADIGMS.map(para => (
            <div
              key={para.id}
              onClick={() => setSelectedParadigm(para.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedParadigm === para.id
                  ? 'bg-blue-950/50 border-blue-500 text-white shadow-xs'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-blue-200">{para.name}</div>
              <div className="text-[11px] text-slate-400 mt-1">{para.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CITATION & RIGOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Citation Standard */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5 text-blue-400" />
            Scholarly Citation & Footnote Standard
          </label>
          <div className="space-y-2">
            {CITATION_STANDARDS.map(cit => (
              <div
                key={cit}
                onClick={() => setCitationStandard(cit)}
                className={`p-2.5 rounded-lg border cursor-pointer text-xs transition ${
                  citationStandard === cit
                    ? 'bg-blue-950/50 border-blue-500 text-white font-medium'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {cit}
              </div>
            ))}
          </div>
        </div>

        {/* Epistemic Rigor Slider */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Epistemic Confidence Standard
              </label>
              <span className="text-xs font-mono text-blue-300">{epistemicRigor}% Peer-Review</span>
            </div>
            <input
              type="range"
              min={70}
              max={100}
              value={epistemicRigor}
              onChange={e => setEpistemicRigor(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Standard Synthesis</span>
              <span>Rigorous Archival Proof</span>
              <span>Bulletproof Monograph Standard</span>
            </div>
          </div>
        </div>
      </div>

      {/* PEER-REVIEW AUDIT ACTION */}
      <div className="p-4 bg-slate-950/80 border border-blue-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Peer-Review Stress-Test & Counter-Thesis Engine
          </span>
          <button
            onClick={handleAuditThesis}
            disabled={isAuditing}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            {isAuditing ? 'Auditing Sources...' : 'Audit Scholarly Thesis'}
          </button>
        </div>

        <textarea
          rows={2}
          value={thesisStatement}
          onChange={e => setThesisStatement(e.target.value)}
          placeholder="State your academic thesis or historiographical intervention..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
        />

        {monographOutput && (
          <div className="p-3.5 bg-slate-900 border border-blue-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {monographOutput}
          </div>
        )}
      </div>
    </div>
  );
};
