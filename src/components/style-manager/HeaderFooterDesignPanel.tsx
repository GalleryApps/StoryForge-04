import React, { useState } from 'react';
import {
  Bookmark,
  Check,
  Sparkles,
  Sliders,
  Eye,
  Type,
  BookOpen,
  FileText,
  Copy,
  Info,
  ShieldCheck,
  Layers,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Hash,
  Compass,
  FileCode,
  Columns
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import {
  ScientificHeaderFooterConfig,
  ScientificHeaderFooterPreset,
  FolioNumberingStyle,
  HeaderRuleStyle,
  StyleApplicationScope
} from '../../types';
import {
  SCIENTIFIC_HEADER_PRESETS,
  DEFAULT_SCIENTIFIC_HEADER_FOOTER,
  evaluateHeaderFooterToken,
  formatFolioNumber
} from '../../data/scientificHeaderPresets';

interface HeaderFooterDesignPanelProps {
  selectedScope?: StyleApplicationScope;
}

export const HeaderFooterDesignPanel: React.FC<HeaderFooterDesignPanelProps> = ({
  selectedScope = 'entire_book'
}) => {
  const { book, masterStyle, updateMasterStyle } = useStory();

  const hfConfig: ScientificHeaderFooterConfig =
    masterStyle?.pageDesign?.headersAndFooters ||
    masterStyle?.pageDesign?.headerFooter ||
    DEFAULT_SCIENTIFIC_HEADER_FOOTER;

  const [activeSubTab, setActiveSubTab] = useState<'presets' | 'header' | 'footer' | 'metadata' | 'rules'>('presets');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [previewChapterIdx, setPreviewChapterIdx] = useState<number>(0);
  const [previewPageNum, setPreviewPageNum] = useState<number>(14);

  const updateHf = (patch: Partial<ScientificHeaderFooterConfig>) => {
    updateMasterStyle(prev => {
      const prevPageDesign = prev.pageDesign || {
        pageSize: '6x9',
        orientation: 'portrait',
        margins: { topMm: 20, bottomMm: 20, leftMm: 24, rightMm: 18 },
        columns: 1,
        guttersMm: 4,
        grid: 'golden_ratio',
        headerText: '',
        headerPosition: 'top_outside',
        footerText: '',
        pageNumberPosition: 'bottom_center',
        imagePlacement: 'top',
        textImageBalance: 30
      };

      const updatedHf: ScientificHeaderFooterConfig = {
        ...(prevPageDesign.headersAndFooters || DEFAULT_SCIENTIFIC_HEADER_FOOTER),
        ...patch
      };

      return {
        ...prev,
        pageDesign: {
          ...prevPageDesign,
          headersAndFooters: updatedHf,
          headerFooter: updatedHf,
          headerText: updatedHf.rectoHeaderRight || updatedHf.versoHeaderLeft || prevPageDesign.headerText
        }
      };
    });
  };

  const applyPreset = (presetId: ScientificHeaderFooterPreset) => {
    const preset = SCIENTIFIC_HEADER_PRESETS.find(p => p.id === presetId);
    if (preset) {
      updateHf(preset.config);
    }
  };

  const activeChapter = book.chapters[previewChapterIdx] || book.chapters[0] || {
    number: 1,
    title: 'Hermetic Foundations & Symbolic Resonance'
  };

  const evalContext = {
    bookTitle: book.title || 'Practical Esoteric & Symbolic Studio',
    author: book.author || 'Scholarly Author',
    chapterNumber: activeChapter.number || 1,
    chapterTitle: activeChapter.title || 'Foundations of Symbolic Transmission',
    pageNumber: previewPageNum,
    totalPages: 240,
    doi: hfConfig.doiString || '10.1016/j.esoterica.2026.04.012',
    issn: hfConfig.issnString || 'ISSN 2831-9042',
    isbn: hfConfig.isbnString || 'ISBN 978-0-12-345678-9',
    journalName: hfConfig.journalName || 'International Journal of Esoteric & Symbolic Science',
    volumeIssue: hfConfig.volumeIssue || 'Vol. 28, Issue 4 (2026)',
    copyrightNotice: hfConfig.copyrightNotice || 'Open Access Under CC-BY 4.0 International',
    documentClassification: hfConfig.documentClassification || 'PEER-REVIEWED SCIENTIFIC MONOGRAPH'
  };

  const tokens = [
    { token: '{bookTitle}', label: 'Book Title' },
    { token: '{author}', label: 'Author Name' },
    { token: '{chapterNumber}', label: 'Chapter #' },
    { token: '{chapterTitle}', label: 'Chapter Title' },
    { token: '{doi}', label: 'DOI String' },
    { token: '{issn}', label: 'ISSN' },
    { token: '{isbn}', label: 'ISBN' },
    { token: '{journalName}', label: 'Journal/Series' },
    { token: '{volumeIssue}', label: 'Vol / Issue' },
    { token: '{pageNumber}', label: 'Page #' },
    { token: '{totalPages}', label: 'Total Pages' },
    { token: '{copyrightNotice}', label: 'License Notice' },
    { token: '{documentClassification}', label: 'Classification' }
  ];

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Render Rule based on rule style
  const renderRuleElement = (ruleStyle: HeaderRuleStyle, widthPt: number, color: string) => {
    if (ruleStyle === 'none') return null;

    if (ruleStyle === 'double_rule') {
      return (
        <div className="w-full my-1 space-y-[1.5px]">
          <div className="w-full border-t border-slate-400" style={{ borderColor: color, borderWidth: `${Math.max(0.5, widthPt * 0.75)}px` }} />
          <div className="w-full border-t border-slate-400" style={{ borderColor: color, borderWidth: `${Math.max(0.5, widthPt * 0.75)}px` }} />
        </div>
      );
    }

    if (ruleStyle === 'academic_ornament') {
      return (
        <div className="w-full my-1 flex items-center justify-center gap-2">
          <div className="flex-1 border-t" style={{ borderColor: color }} />
          <span className="text-[9px] tracking-widest px-1 text-slate-400">✦ — ✦</span>
          <div className="flex-1 border-t" style={{ borderColor: color }} />
        </div>
      );
    }

    if (ruleStyle === 'dashed') {
      return <div className="w-full my-1 border-t border-dashed" style={{ borderColor: color, borderWidth: `${widthPt}px` }} />;
    }

    if (ruleStyle === 'dotted') {
      return <div className="w-full my-1 border-t border-dotted" style={{ borderColor: color, borderWidth: `${widthPt}px` }} />;
    }

    return (
      <div
        className="w-full my-1 border-t"
        style={{
          borderColor: color,
          borderWidth: `${Math.max(0.5, widthPt)}px`
        }}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
              <Bookmark className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Headers & Footers for Scientific Literature
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Academic & Scholarly Specs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure alternating Recto/Verso running heads, DOI & citation footers, small-caps typography, and academic suppression rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <input
              type="checkbox"
              checked={hfConfig.enabled}
              onChange={e => updateHf({ enabled: e.target.checked })}
              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
            />
            <span className="text-xs font-semibold text-slate-800">
              Enable Running Heads & Footers
            </span>
          </label>

          <button
            onClick={() => updateHf(DEFAULT_SCIENTIFIC_HEADER_FOOTER)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Interactive Two-Page Spread Live Simulator */}
      <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg space-y-4 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Live Two-Page Spread Preview (Verso / Recto Simulation)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span>Chapter:</span>
              <select
                value={previewChapterIdx}
                onChange={e => setPreviewChapterIdx(parseInt(e.target.value))}
                className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-0.5 text-xs focus:outline-none"
              >
                {book.chapters.map((ch, idx) => (
                  <option key={idx} value={idx}>
                    Ch {ch.number}: {ch.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <span>Page:</span>
              <input
                type="number"
                min={2}
                max={500}
                value={previewPageNum}
                onChange={e => setPreviewPageNum(parseInt(e.target.value) || 14)}
                className="w-14 bg-slate-800 border border-slate-700 text-slate-200 rounded px-1.5 py-0.5 text-xs text-center focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Spread Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
          {/* VERSO (Left / Even Page) */}
          <div className="bg-[#fcfbf9] text-slate-900 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-inner border border-slate-300 min-h-[300px]">
            {/* Verso Header */}
            <div>
              <div
                className="flex items-center justify-between text-[11px] leading-tight select-none"
                style={{
                  fontFamily: hfConfig.headerFontFamily || 'Helvetica, sans-serif',
                  fontSize: `${hfConfig.headerFontSizePt || 8}pt`,
                  fontStyle: hfConfig.headerFontStyle || 'normal',
                  fontWeight: hfConfig.headerFontWeight || 'normal',
                  textTransform: (hfConfig.headerTextTransform as any) || 'uppercase',
                  letterSpacing: `${hfConfig.headerLetterSpacing || 0.04}em`,
                  color: hfConfig.headerTextColor || '#475569'
                }}
              >
                <span>{evaluateHeaderFooterToken(hfConfig.versoHeaderLeft, evalContext)}</span>
                <span>{evaluateHeaderFooterToken(hfConfig.versoHeaderCenter, evalContext)}</span>
                <span>{evaluateHeaderFooterToken(hfConfig.versoHeaderRight, evalContext)}</span>
              </div>
              {renderRuleElement(hfConfig.headerRuleStyle, hfConfig.headerRuleWidthPt, hfConfig.headerRuleColor)}
            </div>

            {/* Verso Page Body Simulation */}
            <div className="py-4 space-y-2 text-slate-600 font-serif text-[11px] leading-relaxed">
              <p className="indent-3 text-slate-700">
                In scholarly inquiry, rigorous formal apparatus guarantees reproducibility and textual provenance across scholarly monograph traditions. Every hermetic symbol and scientific proposition is cross-referenced through rigorous metadata indexing.
              </p>
              <div className="p-2.5 rounded border border-slate-200 bg-slate-50 font-mono text-[9.5px] text-slate-700">
                <span className="font-bold text-sky-700">Theorem 4.12:</span> The operational matrix reflects harmonic conservation across all symbolic state vectors.
              </div>
              <p className="indent-3">
                Recto and Verso alternate symmetrically to uphold the physical ergonomics of printed scientific volumes and archival folios.
              </p>
            </div>

            {/* Verso Footer */}
            <div>
              {renderRuleElement(hfConfig.footerRuleStyle, hfConfig.footerRuleWidthPt, hfConfig.footerRuleColor)}
              <div
                className="flex items-center justify-between text-[10px] leading-tight select-none pt-0.5"
                style={{
                  fontFamily: hfConfig.footerFontFamily || 'Helvetica, sans-serif',
                  fontSize: `${hfConfig.footerFontSizePt || 7.5}pt`,
                  fontStyle: hfConfig.footerFontStyle || 'normal',
                  fontWeight: hfConfig.footerFontWeight || 'normal',
                  textTransform: (hfConfig.footerTextTransform as any) || 'none',
                  letterSpacing: `${hfConfig.footerLetterSpacing || 0.02}em`,
                  color: hfConfig.footerTextColor || '#64748b'
                }}
              >
                <span>{evaluateHeaderFooterToken(hfConfig.versoFooterLeft, evalContext)}</span>
                <span>{evaluateHeaderFooterToken(hfConfig.versoFooterCenter, evalContext)}</span>
                <span className="font-mono font-semibold">
                  {evaluateHeaderFooterToken(hfConfig.versoFooterRight, {
                    ...evalContext,
                    pageNumber: formatFolioNumber(previewPageNum, hfConfig.folioStyle, evalContext.totalPages, evalContext.chapterNumber, true) as any
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* RECTO (Right / Odd Page) */}
          <div className="bg-[#fcfbf9] text-slate-900 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-inner border border-slate-300 min-h-[300px]">
            {/* Recto Header */}
            <div>
              <div
                className="flex items-center justify-between text-[11px] leading-tight select-none"
                style={{
                  fontFamily: hfConfig.headerFontFamily || 'Helvetica, sans-serif',
                  fontSize: `${hfConfig.headerFontSizePt || 8}pt`,
                  fontStyle: hfConfig.headerFontStyle || 'normal',
                  fontWeight: hfConfig.headerFontWeight || 'normal',
                  textTransform: (hfConfig.headerTextTransform as any) || 'uppercase',
                  letterSpacing: `${hfConfig.headerLetterSpacing || 0.04}em`,
                  color: hfConfig.headerTextColor || '#475569'
                }}
              >
                <span>{evaluateHeaderFooterToken(hfConfig.rectoHeaderLeft, evalContext)}</span>
                <span>{evaluateHeaderFooterToken(hfConfig.rectoHeaderCenter, evalContext)}</span>
                <span className="font-semibold text-right">
                  {evaluateHeaderFooterToken(hfConfig.rectoHeaderRight, evalContext)}
                </span>
              </div>
              {renderRuleElement(hfConfig.headerRuleStyle, hfConfig.headerRuleWidthPt, hfConfig.headerRuleColor)}
            </div>

            {/* Recto Page Body Simulation */}
            <div className="py-4 space-y-2 text-slate-600 font-serif text-[11px] leading-relaxed">
              <h4 className="font-sans font-bold text-xs text-slate-900 uppercase tracking-wider">
                § {evalContext.chapterNumber}.2 Experimental Validation
              </h4>
              <p className="indent-3 text-slate-700">
                Observational metrics documented under peer review validate the primary hypothesis regarding symbolic cohesion. The active running head on the Recto page displays the current chapter and section.
              </p>
              <p className="indent-3">
                Meanwhile, running footers provide permanent digital object identifiers (DOI) and licensing metadata for immediate bibliographic attribution in worldwide indexing repositories.
              </p>
            </div>

            {/* Recto Footer */}
            <div>
              {renderRuleElement(hfConfig.footerRuleStyle, hfConfig.footerRuleWidthPt, hfConfig.footerRuleColor)}
              <div
                className="flex items-center justify-between text-[10px] leading-tight select-none pt-0.5"
                style={{
                  fontFamily: hfConfig.footerFontFamily || 'Helvetica, sans-serif',
                  fontSize: `${hfConfig.footerFontSizePt || 7.5}pt`,
                  fontStyle: hfConfig.footerFontStyle || 'normal',
                  fontWeight: hfConfig.footerFontWeight || 'normal',
                  textTransform: (hfConfig.footerTextTransform as any) || 'none',
                  letterSpacing: `${hfConfig.footerLetterSpacing || 0.02}em`,
                  color: hfConfig.footerTextColor || '#64748b'
                }}
              >
                <span>{evaluateHeaderFooterToken(hfConfig.rectoFooterLeft, evalContext)}</span>
                <span className="text-center">{evaluateHeaderFooterToken(hfConfig.rectoFooterCenter, evalContext)}</span>
                <span className="font-mono font-semibold text-right">
                  {evaluateHeaderFooterToken(hfConfig.rectoFooterRight, {
                    ...evalContext,
                    pageNumber: formatFolioNumber(previewPageNum + 1, hfConfig.folioStyle, evalContext.totalPages, evalContext.chapterNumber, false) as any
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Token Chips for Quick Insertion */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-sky-400" />
              Dynamic Variable Tokens (Click to Copy into Template):
            </span>
            {copiedToken && (
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Copied {copiedToken}!
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tokens.map(t => (
              <button
                key={t.token}
                onClick={() => handleCopyToken(t.token)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[11px] font-mono transition flex items-center gap-1"
                title={`Copy ${t.token}`}
              >
                <span>{t.token}</span>
                <span className="text-[9px] text-slate-500 font-sans">({t.label})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveSubTab('presets')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
            activeSubTab === 'presets'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Scientific Literature Presets
        </button>

        <button
          onClick={() => setActiveSubTab('header')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
            activeSubTab === 'header'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Running Header (Verso & Recto)
        </button>

        <button
          onClick={() => setActiveSubTab('footer')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
            activeSubTab === 'footer'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          Running Footer & Folios
        </button>

        <button
          onClick={() => setActiveSubTab('metadata')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
            activeSubTab === 'metadata'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          DOI & Scholarly Metadata
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
            activeSubTab === 'rules'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Academic Suppression Rules
        </button>
      </div>

      {/* TAB 1: SCIENTIFIC PRESETS */}
      {activeSubTab === 'presets' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SCIENTIFIC_HEADER_PRESETS.map(preset => {
              const isSelected = hfConfig.preset === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition text-left relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50/50 ring-2 ring-sky-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {preset.category}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-sky-600">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mb-1">{preset.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{preset.description}</p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-sky-700 font-semibold">{preset.badge}</span>
                    <span>{preset.config.headerRuleStyle.replace('_', ' ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: RUNNING HEADER DESIGN */}
      {activeSubTab === 'header' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verso Header Settings */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Columns className="w-3.5 h-3.5 text-sky-600" />
                Verso Running Head (Left / Even Pages)
              </h3>
              <span className="text-[10px] font-mono text-slate-400 font-medium">Usually Book / Journal Title</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verso Left Zone
                </label>
                <input
                  type="text"
                  value={hfConfig.versoHeaderLeft}
                  onChange={e => updateHf({ versoHeaderLeft: e.target.value })}
                  placeholder="{journalName} or {bookTitle}"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verso Center Zone
                </label>
                <input
                  type="text"
                  value={hfConfig.versoHeaderCenter}
                  onChange={e => updateHf({ versoHeaderCenter: e.target.value })}
                  placeholder="Optional center header text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verso Right Zone
                </label>
                <input
                  type="text"
                  value={hfConfig.versoHeaderRight}
                  onChange={e => updateHf({ versoHeaderRight: e.target.value })}
                  placeholder="{author} et al."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Recto Header Settings */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Columns className="w-3.5 h-3.5 text-sky-600" />
                Recto Running Head (Right / Odd Pages)
              </h3>
              <span className="text-[10px] font-mono text-slate-400 font-medium">Usually Chapter / Section</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recto Left Zone
                </label>
                <input
                  type="text"
                  value={hfConfig.rectoHeaderLeft}
                  onChange={e => updateHf({ rectoHeaderLeft: e.target.value })}
                  placeholder="Optional left section marker"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recto Center Zone
                </label>
                <input
                  type="text"
                  value={hfConfig.rectoHeaderCenter}
                  onChange={e => updateHf({ rectoHeaderCenter: e.target.value })}
                  placeholder="Optional center chapter title"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recto Right Zone
                </label>
                <input
                  type="text"
                  value={hfConfig.rectoHeaderRight}
                  onChange={e => updateHf({ rectoHeaderRight: e.target.value })}
                  placeholder="{chapterTitle} • §{chapterNumber}"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Header Typography & Separator Rules */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 lg:col-span-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Header Typography & Separator Rules
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Font Family
                </label>
                <select
                  value={hfConfig.headerFontFamily}
                  onChange={e => updateHf({ headerFontFamily: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="Helvetica, Arial, sans-serif">Helvetica / Arial (Standard Scientific)</option>
                  <option value="Times New Roman, serif">Times New Roman (Academic Journal)</option>
                  <option value="Georgia, serif">Georgia / Bembo (Monograph)</option>
                  <option value="EB Garamond, Georgia, serif">EB Garamond (Literary Scholarly)</option>
                  <option value="Courier New, monospace">Courier (Lab Protocol & Monospace)</option>
                  <option value="Cinzel, Georgia, serif">Cinzel (Hermetic Codex / Classical)</option>
                  <option value="Inter, sans-serif">Inter (Modern Editorial UI)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Font Size (pt): {hfConfig.headerFontSizePt}pt
                </label>
                <input
                  type="range"
                  min={6}
                  max={12}
                  step={0.5}
                  value={hfConfig.headerFontSizePt}
                  onChange={e => updateHf({ headerFontSizePt: parseFloat(e.target.value) })}
                  className="w-full accent-sky-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Letter Spacing / Tracking: {hfConfig.headerLetterSpacing}em
                </label>
                <input
                  type="range"
                  min={0}
                  max={0.15}
                  step={0.01}
                  value={hfConfig.headerLetterSpacing}
                  onChange={e => updateHf({ headerLetterSpacing: parseFloat(e.target.value) })}
                  className="w-full accent-sky-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Text Transform
                </label>
                <select
                  value={hfConfig.headerTextTransform}
                  onChange={e => updateHf({ headerTextTransform: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="uppercase">ALL UPPERCASE</option>
                  <option value="small-caps">Small-Caps (Scholarly)</option>
                  <option value="capitalize">Capitalize Words</option>
                  <option value="none">Standard As-Entered</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Separator Rule Style
                </label>
                <select
                  value={hfConfig.headerRuleStyle}
                  onChange={e => updateHf({ headerRuleStyle: e.target.value as HeaderRuleStyle })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="none">None (Clean Margin)</option>
                  <option value="hairline">Hairline 0.25pt (Nature / Springer)</option>
                  <option value="solid_thin">Solid 0.5pt (Standard Academic)</option>
                  <option value="solid_medium">Solid 1.0pt (Bold Technical)</option>
                  <option value="double_rule">Double Rule (Scientific Classic)</option>
                  <option value="dashed">Dashed Rule</option>
                  <option value="dotted">Dotted Rule</option>
                  <option value="academic_ornament">Scholarly Asterism (✦ — ✦)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rule Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={hfConfig.headerRuleColor || '#cbd5e1'}
                    onChange={e => updateHf({ headerRuleColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={hfConfig.headerRuleColor || '#cbd5e1'}
                    onChange={e => updateHf({ headerRuleColor: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Header Offset from Top Margin (mm)
                </label>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={hfConfig.headerOffsetMm || 4}
                  onChange={e => updateHf({ headerOffsetMm: parseInt(e.target.value) || 4 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RUNNING FOOTER & FOLIOS */}
      {activeSubTab === 'footer' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verso Footer */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-sky-600" />
              Verso Footer (Left Page)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verso Footer Left (e.g. DOI)
                </label>
                <input
                  type="text"
                  value={hfConfig.versoFooterLeft}
                  onChange={e => updateHf({ versoFooterLeft: e.target.value })}
                  placeholder="DOI: {doi}"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verso Footer Center
                </label>
                <input
                  type="text"
                  value={hfConfig.versoFooterCenter}
                  onChange={e => updateHf({ versoFooterCenter: e.target.value })}
                  placeholder="{volumeIssue}"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verso Footer Right (Page Number)
                </label>
                <input
                  type="text"
                  value={hfConfig.versoFooterRight}
                  onChange={e => updateHf({ versoFooterRight: e.target.value })}
                  placeholder="{pageNumber}"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Recto Footer */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-sky-600" />
              Recto Footer (Right Page)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recto Footer Left (e.g. Copyright)
                </label>
                <input
                  type="text"
                  value={hfConfig.rectoFooterLeft}
                  onChange={e => updateHf({ rectoFooterLeft: e.target.value })}
                  placeholder="© {author}"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recto Footer Center (e.g. License)
                </label>
                <input
                  type="text"
                  value={hfConfig.rectoFooterCenter}
                  onChange={e => updateHf({ rectoFooterCenter: e.target.value })}
                  placeholder="{copyrightNotice}"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recto Footer Right (Folio Fraction)
                </label>
                <input
                  type="text"
                  value={hfConfig.rectoFooterRight}
                  onChange={e => updateHf({ rectoFooterRight: e.target.value })}
                  placeholder="Page {pageNumber} of {totalPages}"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Folio Numbering Format */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 lg:col-span-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Folio (Page Number) Numbering Scheme
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Body Folio Format
                </label>
                <select
                  value={hfConfig.folioStyle}
                  onChange={e => updateHf({ folioStyle: e.target.value as FolioNumberingStyle })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="arabic">Arabic (1, 2, 3...)</option>
                  <option value="academic_fraction">Academic Fraction (Page 14 of 240)</option>
                  <option value="em_dash">Em-Dash Formal (— 14 —)</option>
                  <option value="bracketed">Bracketed Citation ([ 14 ])</option>
                  <option value="section_page">Section-Page Technical (3-14)</option>
                  <option value="roman_lower">Lowercase Roman (xiv)</option>
                  <option value="roman_upper">Uppercase Roman (XIV)</option>
                  <option value="manuscript_codex">Codex Manuscript (Fol. 14v / 14r)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Front Matter Folio Format
                </label>
                <select
                  value={hfConfig.frontMatterFolioStyle}
                  onChange={e => updateHf({ frontMatterFolioStyle: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="roman_lower">Lowercase Roman (i, ii, iii, iv...)</option>
                  <option value="arabic">Arabic Numbers (1, 2, 3...)</option>
                  <option value="none">No Page Numbers on Front Matter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Footer Separator Rule Style
                </label>
                <select
                  value={hfConfig.footerRuleStyle}
                  onChange={e => updateHf({ footerRuleStyle: e.target.value as HeaderRuleStyle })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="none">None (Clean Margin)</option>
                  <option value="hairline">Hairline 0.25pt (Nature / IEEE)</option>
                  <option value="solid_thin">Solid 0.5pt (Academic)</option>
                  <option value="double_rule">Double Rule (Technical)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DOI & SCHOLARLY METADATA */}
      {activeSubTab === 'metadata' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              Digital Object Identifier (DOI) & Catalog Registry
            </h3>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono">
              Auto-interpolates into {'{doi}'}, {'{issn}'}, {'{isbn}'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                DOI String (Digital Object Identifier)
              </label>
              <input
                type="text"
                value={hfConfig.doiString || ''}
                onChange={e => updateHf({ doiString: e.target.value })}
                placeholder="10.1016/j.esoterica.2026.04.012"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Standard DOI for CrossRef / ScienceDirect indexing.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ISSN / ISBN Identifier
              </label>
              <input
                type="text"
                value={hfConfig.issnString || ''}
                onChange={e => updateHf({ issnString: e.target.value })}
                placeholder="ISSN 2831-9042"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Journal or Monograph Series Name
              </label>
              <input
                type="text"
                value={hfConfig.journalName || ''}
                onChange={e => updateHf({ journalName: e.target.value })}
                placeholder="International Journal of Esoteric & Symbolic Science"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Volume & Issue String
              </label>
              <input
                type="text"
                value={hfConfig.volumeIssue || ''}
                onChange={e => updateHf({ volumeIssue: e.target.value })}
                placeholder="Vol. 28, Issue 4 (2026)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Copyright & Open Access License Notice
              </label>
              <input
                type="text"
                value={hfConfig.copyrightNotice || ''}
                onChange={e => updateHf({ copyrightNotice: e.target.value })}
                placeholder="Open Access Under CC-BY 4.0 International"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Document Classification Stamp
              </label>
              <input
                type="text"
                value={hfConfig.documentClassification || ''}
                onChange={e => updateHf({ documentClassification: e.target.value })}
                placeholder="PEER-REVIEWED SCIENTIFIC MONOGRAPH"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ACADEMIC SUPPRESSION RULES */}
      {activeSubTab === 'rules' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            Scholarly & Academic Suppression Rules
          </h3>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={hfConfig.suppressHeaderOnChapterOpener}
                onChange={e => updateHf({ suppressHeaderOnChapterOpener: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Suppress Running Header on Chapter Opener Pages
                </span>
                <span className="text-[11px] text-slate-500">
                  Universal university press standard: First page of a chapter displays clean drop cap or chapter title without running head distractions.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={hfConfig.suppressHeaderOnFrontMatter}
                onChange={e => updateHf({ suppressHeaderOnFrontMatter: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Suppress Running Header on Front Matter Pages
                </span>
                <span className="text-[11px] text-slate-500">
                  Omits running heads on Title Page, Copyright & Cataloging page, Dedication, and Table of Contents.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={hfConfig.suppressHeaderOnBlankPages}
                onChange={e => updateHf({ suppressHeaderOnBlankPages: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Suppress Running Header on Blank / Section Divider Spreads
                </span>
                <span className="text-[11px] text-slate-500">
                  Leaves intentional blank pages (e.g. preceding odd-page chapter starts) completely unprinted.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={hfConfig.suppressFooterOnCover}
                onChange={e => updateHf({ suppressFooterOnCover: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Suppress Running Footer on Covers & Color Plates
                </span>
                <span className="text-[11px] text-slate-500">
                  Full-bleed artwork and front/back covers remain unblemished without page folios.
                </span>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
