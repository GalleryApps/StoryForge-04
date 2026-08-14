import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  FileText,
  Bookmark,
  Feather,
  Copy,
  Wand2,
  RefreshCw,
  Layers,
  HelpCircle,
  Shield,
  Compass,
} from 'lucide-react';
import { PreliminaryPageConfig, MainBodySectionConfig, EndMatterConfig } from './EsotericBlueprintTypes';

interface Props {
  preliminary: PreliminaryPageConfig;
  mainBody: MainBodySectionConfig;
  endMatter: EndMatterConfig;
  onUpdatePrelim: (updater: (prev: PreliminaryPageConfig) => PreliminaryPageConfig) => void;
  onUpdateMainBody: (updater: (prev: MainBodySectionConfig) => MainBodySectionConfig) => void;
  onUpdateEndMatter: (updater: (prev: EndMatterConfig) => EndMatterConfig) => void;
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
}

export const EsotericBookFrameLevel: React.FC<Props> = ({
  preliminary,
  mainBody,
  endMatter,
  onUpdatePrelim,
  onUpdateMainBody,
  onUpdateEndMatter,
  onExecuteAIGenerator,
  isGeneratingAI,
}) => {
  const [subTab, setSubTab] = useState<'1.1' | '1.2' | '1.3'>('1.1');
  const [activeMainSection, setActiveMainSection] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I'>('A');

  return (
    <div className="space-y-6">
      {/* SUB-NAVIGATION */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSubTab('1.1')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 border ${
            subTab === '1.1'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> 1.1 Preliminary Pages (12 Parts)
        </button>
        <button
          onClick={() => setSubTab('1.2')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 border ${
            subTab === '1.2'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> 1.2 Main Body Architecture (Sections A–I)
        </button>
        <button
          onClick={() => setSubTab('1.3')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 border ${
            subTab === '1.3'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" /> 1.3 End Matter (5 Modules)
        </button>
      </div>

      {/* 1.1 PRELIMINARY PAGES */}
      {subTab === '1.1' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <FileText className="w-4 h-4" /> 1.1 Preliminary Pages Configuration & AI Help
              </h4>
              <p className="text-xs text-slate-400">
                Setup the ceremonial threshold and academic apparatus before Chapter 1.
              </p>
            </div>
            <button
              disabled={isGeneratingAI}
              onClick={() =>
                onExecuteAIGenerator(
                  'Preliminary Pages Suite',
                  'Generate evocative, publication-ready text for Frontispiece, Dedication, Epigraph, Preface, and Foreword for a Practical Esoteric Textbook.',
                  'prelimSuite'
                )
              }
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5" /> AI Generate All Prelims
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            {/* Half Title */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-200">1. Half Title Page</span>
                <input
                  type="checkbox"
                  checked={preliminary.halfTitle.included}
                  onChange={e =>
                    onUpdatePrelim(p => ({
                      ...p,
                      halfTitle: { ...p.halfTitle, included: e.target.checked },
                    }))
                  }
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">Clean single-line title page on the right side facing inside cover.</p>
              <input
                type="text"
                placeholder="Custom half-title..."
                value={preliminary.halfTitle.customTitle || ''}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    halfTitle: { ...p.halfTitle, customTitle: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            {/* Frontispiece */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-200">2. Frontispiece</span>
                <select
                  value={preliminary.frontispiece.type}
                  onChange={e =>
                    onUpdatePrelim(p => ({
                      ...p,
                      frontispiece: { ...p.frontispiece, type: e.target.value as any },
                    }))
                  }
                  className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-amber-300"
                >
                  <option>None</option>
                  <option>Symbol</option>
                  <option>Illustration</option>
                  <option>Historical image</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Frontispiece visual description / plate..."
                value={preliminary.frontispiece.description || ''}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    frontispiece: { ...p.frontispiece, description: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            {/* Title Page */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-200">3. Title Page Info</span>
              <input
                type="text"
                placeholder="Full Title"
                value={preliminary.titlePage.fullTitle}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    titlePage: { ...p.titlePage, fullTitle: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={preliminary.titlePage.subtitle}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    titlePage: { ...p.titlePage, subtitle: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>

            {/* Dedication */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-200">5. Dedication</span>
                <select
                  value={preliminary.dedication.type}
                  onChange={e =>
                    onUpdatePrelim(p => ({
                      ...p,
                      dedication: { ...p.dedication, type: e.target.value as any },
                    }))
                  }
                  className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-amber-300"
                >
                  <option>Person</option>
                  <option>Abstract concept</option>
                  <option>Tradition</option>
                  <option>None</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Dedication text (e.g. To the seekers of light...)"
                value={preliminary.dedication.text}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    dedication: { ...p.dedication, text: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            {/* Epigraph */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-200">6. Opening Epigraph</span>
                <button
                  onClick={() =>
                    onExecuteAIGenerator(
                      'Epigraph Suggestion',
                      'Generate 3 profound Hermetic/Alchemical epigraph quotes with authentic historical attributions (Corpus Hermeticum, Emerald Tablet, Ficino, Paracelsus).',
                      'epigraph'
                    )
                  }
                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-2.5 h-2.5" /> AI Suggest
                </button>
              </div>
              <input
                type="text"
                placeholder="Epigraph quote..."
                value={preliminary.epigraph.quote}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    epigraph: { ...p.epigraph, quote: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Attribution (e.g. Hermes Trismegistus, Asclepius III)"
                value={preliminary.epigraph.attribution}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    epigraph: { ...p.epigraph, attribution: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-300"
              />
            </div>

            {/* Table of Contents & Figures */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-200">7-9. TOC & Lists</span>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">TOC Style:</span>
                <select
                  value={preliminary.tableOfContents.style}
                  onChange={e =>
                    onUpdatePrelim(p => ({
                      ...p,
                      tableOfContents: { style: e.target.value as any },
                    }))
                  }
                  className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                >
                  <option>Simple</option>
                  <option>Detailed</option>
                  <option>Illustrated</option>
                  <option>Annotated</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 text-slate-300">
                  <input
                    type="checkbox"
                    checked={preliminary.listOfFigures.included}
                    onChange={e =>
                      onUpdatePrelim(p => ({
                        ...p,
                        listOfFigures: { included: e.target.checked },
                      }))
                    }
                    className="rounded border-slate-700 text-amber-500"
                  />
                  List of Figures
                </label>
                <label className="flex items-center gap-1.5 text-slate-300">
                  <input
                    type="checkbox"
                    checked={preliminary.listOfTables.included}
                    onChange={e =>
                      onUpdatePrelim(p => ({
                        ...p,
                        listOfTables: { included: e.target.checked },
                      }))
                    }
                    className="rounded border-slate-700 text-amber-500"
                  />
                  List of Tables
                </label>
              </div>
            </div>

            {/* Foreword */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-200">10. Foreword</span>
                <select
                  value={preliminary.foreword.authorType}
                  onChange={e =>
                    onUpdatePrelim(p => ({
                      ...p,
                      foreword: { ...p.foreword, authorType: e.target.value as any },
                    }))
                  }
                  className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-amber-300"
                >
                  <option>By author</option>
                  <option>By guest scholar</option>
                  <option>Skip</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Guest Scholar Name (if applicable)"
                value={preliminary.foreword.guestName || ''}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    foreword: { ...p.foreword, guestName: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>

            {/* Preface */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-200">11. Preface</span>
                <select
                  value={preliminary.preface.angle}
                  onChange={e =>
                    onUpdatePrelim(p => ({
                      ...p,
                      preface: { ...p.preface, angle: e.target.value as any },
                    }))
                  }
                  className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-amber-300"
                >
                  <option>Why this book</option>
                  <option>How to use this book</option>
                  <option>Author's journey</option>
                  <option>Skip</option>
                </select>
              </div>
              <textarea
                placeholder="Preface statement / core argument..."
                rows={2}
                value={preliminary.preface.text || ''}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    preface: { ...p.preface, text: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>

            {/* Acknowledgments */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-200">12. Acknowledgments</span>
                <select
                  value={preliminary.acknowledgments.scope}
                  onChange={e =>
                    onUpdatePrelim(p => ({
                      ...p,
                      acknowledgments: { ...p.acknowledgments, scope: e.target.value as any },
                    }))
                  }
                  className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-amber-300"
                >
                  <option>Personal</option>
                  <option>Academic</option>
                  <option>Both</option>
                  <option>Skip</option>
                </select>
              </div>
              <textarea
                placeholder="Mentors, archives, libraries, lineages..."
                rows={2}
                value={preliminary.acknowledgments.notes || ''}
                onChange={e =>
                  onUpdatePrelim(p => ({
                    ...p,
                    acknowledgments: { ...p.acknowledgments, notes: e.target.value },
                  }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* 1.2 MAIN BODY SECTIONS A-I */}
      {subTab === '1.2' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Layers className="w-4 h-4" /> 1.2 Main Body Architecture (Sections A through I)
            </h4>
            <span className="text-xs text-slate-400">Exhaustive Masterclass Framework</span>
          </div>

          {/* SECTION TABS A-I */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800">
            {[
              { key: 'A', name: 'A. Intro & Scope' },
              { key: 'B', name: 'B. Historical Foundation' },
              { key: 'C', name: 'C. Conceptual Core' },
              { key: 'D', name: 'D. Symbolic Language' },
              { key: 'E', name: 'E. Practice & Ritual' },
              { key: 'F', name: 'F. Debates & Heresy' },
              { key: 'G', name: 'G. Advanced Study' },
              { key: 'H', name: 'H. Exercises' },
              { key: 'I', name: 'I. Appendices' },
            ].map(sec => (
              <button
                key={sec.key}
                onClick={() => setActiveMainSection(sec.key as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition border ${
                  activeMainSection === sec.key
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {sec.name}
              </button>
            ))}
          </div>

          {/* SECTION A: INTRODUCTION */}
          {activeMainSection === 'A' && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-amber-200 text-xs">Section A: Introduction & Reader Framing</h5>
                <button
                  onClick={() =>
                    onExecuteAIGenerator(
                      'Introduction Hook & Scope',
                      `Generate a brilliant Opening Hook (${mainBody.openingHookType}) and concise scope statement for the Esoteric Textbook.`,
                      'secA'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI Suggest Hook
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Opening Hook Type</label>
                  <select
                    value={mainBody.openingHookType}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, openingHookType: e.target.value as any }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  >
                    <option>Dramatic scene</option>
                    <option>Mysterious question</option>
                    <option>Personal confession</option>
                    <option>Historical mystery</option>
                    <option>Weird fact</option>
                    <option>Unexpected quote</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Author's Relationship to Tradition</label>
                  <select
                    value={mainBody.authorRelationship}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, authorRelationship: e.target.value as any }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  >
                    <option>Insider</option>
                    <option>Outsider</option>
                    <option>Hybrid</option>
                    <option>Skeptic</option>
                    <option>Practitioner</option>
                  </select>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-slate-400 font-semibold">Opening Hook Content</label>
                  <textarea
                    rows={2}
                    value={mainBody.openingHookText}
                    onChange={e => onUpdateMainBody(m => ({ ...m, openingHookText: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">What Book Covers</label>
                  <textarea
                    rows={2}
                    value={mainBody.scopeWhatBookCovers}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, scopeWhatBookCovers: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">What Book Does NOT Cover (Guardrail)</label>
                  <textarea
                    rows={2}
                    value={mainBody.scopeWhatBookDoesNotCover}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, scopeWhatBookDoesNotCover: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION B: HISTORICAL & CONTEXTUAL */}
          {activeMainSection === 'B' && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-amber-200">Section B: Historical & Contextual Foundation</h5>
                <button
                  onClick={() =>
                    onExecuteAIGenerator(
                      'Historical Timeline & Figures',
                      'Generate a rigorous historical sequence with 4 primary historical figures and key hermetic texts from Alexandria to the Florentine Renaissance.',
                      'secB'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI Historical Matrix
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 font-semibold">Origins & Emergence Narrative</label>
                <textarea
                  rows={2}
                  value={mainBody.originsEmergence}
                  onChange={e =>
                    onUpdateMainBody(m => ({ ...m, originsEmergence: e.target.value }))
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 font-semibold">Transmission History & Geopolitics</label>
                <textarea
                  rows={2}
                  value={mainBody.transmissionHistory}
                  onChange={e =>
                    onUpdateMainBody(m => ({ ...m, transmissionHistory: e.target.value }))
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                />
              </div>
            </div>
          )}

          {/* SECTION C: CONCEPTUAL & PHILOSOPHICAL CORE */}
          {activeMainSection === 'C' && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-amber-200">Section C: Conceptual & Philosophical Core</h5>
                <button
                  onClick={() =>
                    onExecuteAIGenerator(
                      'Cosmology & Metaphysics Core',
                      'Outline the core cosmology, metaphysics, epistemology (noesis vs doxa), and tripartite anthropology (soma, psyche, pneuma).',
                      'secC'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI Philosophy Engine
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Cosmology / Worldview</label>
                  <textarea
                    rows={2}
                    value={mainBody.cosmologyWorldview}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, cosmologyWorldview: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Metaphysics & Causality</label>
                  <textarea
                    rows={2}
                    value={mainBody.metaphysics}
                    onChange={e => onUpdateMainBody(m => ({ ...m, metaphysics: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Epistemology (How knowledge is acquired)</label>
                  <textarea
                    rows={2}
                    value={mainBody.epistemology}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, epistemology: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Anthropology (Nature of the Human Being)</label>
                  <textarea
                    rows={2}
                    value={mainBody.anthropology}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, anthropology: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION D: SYMBOLIC & VISUAL */}
          {activeMainSection === 'D' && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-amber-200">Section D: Symbolic & Visual Language</h5>
                <button
                  onClick={() =>
                    onExecuteAIGenerator(
                      'Symbolic Glyphs & Sacred Geometry',
                      'Generate rich correspondence table for 7 sacred symbols (Ouroboros, Caduceus, Vesica Piscis, Tetractys, Seal of Solomon, Tree of Life, Alchemical Flask) with visual prompts.',
                      'secD'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI Sacred Geometry
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Symbol System Overview</label>
                  <textarea
                    rows={2}
                    value={mainBody.symbolSystemOverview}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, symbolSystemOverview: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Sacred Geometry Rules & Proportions</label>
                  <textarea
                    rows={2}
                    value={mainBody.sacredGeometry}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, sacredGeometry: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION E: PRACTICE & APPLICATION */}
          {activeMainSection === 'E' && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-amber-200">Section E: Practice & Application</h5>
                <button
                  onClick={() =>
                    onExecuteAIGenerator(
                      'Ritual & Contemplation Protocols',
                      'Design rigorous 3-stage practical meditation and theurgic alignment protocol with ethical guardrails.',
                      'secE'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI Practice Builder
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 font-semibold">Ritual & Practice Structure</label>
                <textarea
                  rows={2}
                  value={mainBody.ritualStructure}
                  onChange={e =>
                    onUpdateMainBody(m => ({ ...m, ritualStructure: e.target.value }))
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 font-semibold">Practical Ethics & Guardrails</label>
                <textarea
                  rows={2}
                  value={mainBody.practicalEthics}
                  onChange={e =>
                    onUpdateMainBody(m => ({ ...m, practicalEthics: e.target.value }))
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                />
              </div>
            </div>
          )}

          {/* SECTIONS F, G, H, I QUICK OVERVIEWS */}
          {['F', 'G', 'H', 'I'].includes(activeMainSection) && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-amber-200">
                  {activeMainSection === 'F' && 'Section F: Interpretations & Scholarly Debates'}
                  {activeMainSection === 'G' && 'Section G: Advanced Primary Source Study'}
                  {activeMainSection === 'H' && 'Section H: Exercises & Interactive Engagement'}
                  {activeMainSection === 'I' && 'Section I: 9 Comprehensive Appendices'}
                </h5>
                <button
                  onClick={() =>
                    onExecuteAIGenerator(
                      `Section ${activeMainSection} Deepen`,
                      `Generate specialized scholarly content for Section ${activeMainSection} of the practical esoteric blueprint.`,
                      `sec${activeMainSection}`
                    )
                  }
                  className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI Generate Module
                </button>
              </div>

              {activeMainSection === 'F' && (
                <div className="space-y-2">
                  <label className="text-slate-400 font-semibold">Controversies & Modern Relevance</label>
                  <textarea
                    rows={3}
                    value={mainBody.modernRelevance}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, modernRelevance: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
              )}

              {activeMainSection === 'G' && (
                <div className="space-y-2">
                  <label className="text-slate-400 font-semibold">Primary Source Analysis & Textual Study</label>
                  <textarea
                    rows={3}
                    value={mainBody.primarySourceAnalysis}
                    onChange={e =>
                      onUpdateMainBody(m => ({ ...m, primarySourceAnalysis: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
              )}

              {activeMainSection === 'H' && (
                <div className="p-3 bg-slate-900/80 rounded-lg text-slate-300 space-y-1">
                  <div className="font-bold text-amber-300">Active Exercise Tiers:</div>
                  <p className="text-[11px] text-slate-400">
                    Warm-Up, Core Craft, Advanced Challenge, Professional Theurgy, Empirical Experimentation, Self-Assessment. (Configure deeper in Level 4: Exercise Architecture).
                  </p>
                </div>
              )}

              {activeMainSection === 'I' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {[
                    '1. Chronology/Timeline',
                    '2. Comprehensive Glossary',
                    '3. Correspondence Tables',
                    '4. Primary Source Compendium',
                    '5. Biographical Register',
                    '6. Visual Glyph Gallery',
                    '7. Annotated Further Reading',
                    '8. Latin/Greek Translation Notes',
                    '9. Bibliographic Essay',
                  ].map(app => (
                    <div key={app} className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {app}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 1.3 END MATTER */}
      {subTab === '1.3' && (
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> 1.3 End Matter (5 Modules)
            </h4>
            <button
              onClick={() =>
                onExecuteAIGenerator(
                  'End Matter Suite',
                  'Generate Conclusion, Comprehensive Academic Bibliography format, Author Bio, and Colophon details.',
                  'endMatter'
                )
              }
              className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> AI Generate End Matter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-slate-400 font-semibold">1. Conclusion / Afterword Type</label>
              <select
                value={endMatter.conclusionType}
                onChange={e =>
                  onUpdateEndMatter(em => ({ ...em, conclusionType: e.target.value as any }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              >
                <option>Summary</option>
                <option>Final thoughts</option>
                <option>Invitation</option>
                <option>Open questions</option>
              </select>
              <textarea
                rows={3}
                placeholder="Concluding statement / blessing / challenge..."
                value={endMatter.conclusionText}
                onChange={e =>
                  onUpdateEndMatter(em => ({ ...em, conclusionText: e.target.value }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-semibold">2. About the Author Biography</label>
              <textarea
                rows={5}
                placeholder="Author persona, academic background, esoteric lineage..."
                value={endMatter.aboutAuthorBio}
                onChange={e =>
                  onUpdateEndMatter(em => ({ ...em, aboutAuthorBio: e.target.value }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
