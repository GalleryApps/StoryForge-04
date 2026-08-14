import { ScientificHeaderFooterConfig, ScientificHeaderFooterPreset } from '../types';

export interface ScientificPresetOption {
  id: ScientificHeaderFooterPreset;
  title: string;
  category: string;
  badge: string;
  description: string;
  config: ScientificHeaderFooterConfig;
}

export const DEFAULT_SCIENTIFIC_HEADER_FOOTER: ScientificHeaderFooterConfig = {
  preset: 'nature_ieee_journal',
  enabled: true,
  versoHeaderLeft: '{journalName}',
  versoHeaderCenter: '',
  versoHeaderRight: '{author} et al.',
  rectoHeaderLeft: '',
  rectoHeaderCenter: '',
  rectoHeaderRight: '{chapterTitle} • §{chapterNumber}',
  versoFooterLeft: 'DOI: {doi}',
  versoFooterCenter: '{volumeIssue}',
  versoFooterRight: '{pageNumber}',
  rectoFooterLeft: '© {author}',
  rectoFooterCenter: '{copyrightNotice}',
  rectoFooterRight: 'Page {pageNumber} of {totalPages}',
  headerFontFamily: 'Helvetica, Arial, sans-serif',
  headerFontSizePt: 8,
  headerFontWeight: 'normal',
  headerFontStyle: 'normal',
  headerTextTransform: 'uppercase',
  headerLetterSpacing: 0.04,
  headerTextColor: '#475569',
  headerRuleStyle: 'hairline',
  headerRuleWidthPt: 0.5,
  headerRuleColor: '#cbd5e1',
  headerOffsetMm: 4,
  footerFontFamily: 'Helvetica, Arial, sans-serif',
  footerFontSizePt: 7.5,
  footerFontWeight: 'normal',
  footerFontStyle: 'normal',
  footerTextTransform: 'none',
  footerLetterSpacing: 0.02,
  footerTextColor: '#64748b',
  footerRuleStyle: 'hairline',
  footerRuleWidthPt: 0.5,
  footerRuleColor: '#e2e8f0',
  footerOffsetMm: 4,
  folioStyle: 'academic_fraction',
  folioPrefix: '',
  folioSuffix: '',
  frontMatterFolioStyle: 'roman_lower',
  doiString: '10.1016/j.esoterica.2026.04.012',
  issnString: 'ISSN 2831-9042',
  isbnString: 'ISBN 978-0-12-345678-9',
  journalName: 'International Journal of Esoteric & Symbolic Science',
  volumeIssue: 'Vol. 28, Issue 4 (2026)',
  copyrightNotice: 'Open Access Under CC-BY 4.0 International',
  documentClassification: 'PEER-REVIEWED SCIENTIFIC MONOGRAPH',
  suppressHeaderOnChapterOpener: true,
  suppressHeaderOnFrontMatter: true,
  suppressHeaderOnBlankPages: true,
  suppressFooterOnCover: true,
  suppressFooterOnFullBleedImages: true,
};

export const SCIENTIFIC_HEADER_PRESETS: ScientificPresetOption[] = [
  {
    id: 'nature_ieee_journal',
    title: 'Nature / IEEE Scientific Journal',
    category: 'Peer-Reviewed Journal',
    badge: 'DOI & Citation Ready',
    description: 'Strict academic publishing layout with active DOI footer, journal name & lead author running on Verso, section & chapter on Recto, 0.5pt hairline separator, and fractional folios (Page X of Y).',
    config: {
      ...DEFAULT_SCIENTIFIC_HEADER_FOOTER,
      preset: 'nature_ieee_journal',
      versoHeaderLeft: '{journalName}',
      versoHeaderCenter: '',
      versoHeaderRight: '{author} et al.',
      rectoHeaderLeft: '',
      rectoHeaderCenter: '',
      rectoHeaderRight: '{chapterTitle} • §{chapterNumber}',
      versoFooterLeft: 'DOI: {doi}',
      versoFooterCenter: '{volumeIssue}',
      versoFooterRight: '{pageNumber}',
      rectoFooterLeft: '© {author}',
      rectoFooterCenter: '{copyrightNotice}',
      rectoFooterRight: 'Page {pageNumber} of {totalPages}',
      headerFontFamily: 'Helvetica, Arial, sans-serif',
      headerFontSizePt: 8,
      headerTextTransform: 'uppercase',
      headerLetterSpacing: 0.04,
      headerRuleStyle: 'hairline',
      footerRuleStyle: 'hairline',
      folioStyle: 'academic_fraction',
    }
  },
  {
    id: 'university_press_monograph',
    title: 'Cambridge / Oxford University Press',
    category: 'Academic Monograph & Textbook',
    badge: 'Small-Caps Serif',
    description: 'Formal scholarly monograph formatting with elegant small-caps running headers, alternating book title and chapter header, top outer placement, and dignified em-dash bottom folios.',
    config: {
      ...DEFAULT_SCIENTIFIC_HEADER_FOOTER,
      preset: 'university_press_monograph',
      versoHeaderLeft: '{bookTitle}',
      versoHeaderCenter: '',
      versoHeaderRight: '',
      rectoHeaderLeft: '',
      rectoHeaderCenter: '',
      rectoHeaderRight: 'CHAPTER {chapterNumber} • {chapterTitle}',
      versoFooterLeft: '',
      versoFooterCenter: '— {pageNumber} —',
      versoFooterRight: '',
      rectoFooterLeft: '',
      rectoFooterCenter: '— {pageNumber} —',
      rectoFooterRight: '',
      headerFontFamily: 'Georgia, serif',
      headerFontSizePt: 8.5,
      headerTextTransform: 'small-caps',
      headerLetterSpacing: 0.06,
      headerRuleStyle: 'hairline',
      headerRuleWidthPt: 0.35,
      footerRuleStyle: 'none',
      folioStyle: 'em_dash',
      isbnString: 'ISBN 978-0-19-852837-1',
    }
  },
  {
    id: 'scientific_manual_runbook',
    title: 'Technical Laboratory & Protocol Runbook',
    category: 'Engineering & Lab Protocol',
    badge: 'Double Rule & Doc ID',
    description: 'Engineering and laboratory handbook formatting with document control classification stamps, protocol IDs, revision dates, technical double-rule separators, and Section-Page numbering (3-14).',
    config: {
      ...DEFAULT_SCIENTIFIC_HEADER_FOOTER,
      preset: 'scientific_manual_runbook',
      versoHeaderLeft: 'DOC: {doi}',
      versoHeaderCenter: '{documentClassification}',
      versoHeaderRight: '{bookTitle}',
      rectoHeaderLeft: 'PROTOCOL §{chapterNumber}',
      rectoHeaderCenter: '{chapterTitle}',
      rectoHeaderRight: 'REV: 2026-Q2',
      versoFooterLeft: 'CONFIDENTIAL / LAB USE ONLY',
      versoFooterCenter: 'TECHNICAL RUNBOOK',
      versoFooterRight: '{chapterNumber}-{pageNumber}',
      rectoFooterLeft: 'PEER VALIDATED',
      rectoFooterCenter: '{copyrightNotice}',
      rectoFooterRight: '{chapterNumber}-{pageNumber}',
      headerFontFamily: 'Courier New, monospace',
      headerFontSizePt: 7.5,
      headerTextTransform: 'uppercase',
      headerLetterSpacing: 0.05,
      headerRuleStyle: 'double_rule',
      headerRuleWidthPt: 1.0,
      footerRuleStyle: 'solid_thin',
      footerRuleWidthPt: 0.5,
      folioStyle: 'section_page',
      documentClassification: 'CONTROLLED TECHNICAL SPECIFICATION',
    }
  },
  {
    id: 'hermetic_scholarly_treatise',
    title: 'Hermetic & Esoteric Scholarly Treatise',
    category: 'Esoteric & Symbolic Critical Edition',
    badge: 'Critical Apparatus & Codex',
    description: 'Scholarly edition for symbolic, hermetic, and esoteric treatises with Latin running headers, chapter theorem & sigil codes, scholarly ornamental asterisk rules, and codex folios (Fol. 12v / 12r).',
    config: {
      ...DEFAULT_SCIENTIFIC_HEADER_FOOTER,
      preset: 'hermetic_scholarly_treatise',
      versoHeaderLeft: 'TRACTATUS ESOTERICUS',
      versoHeaderCenter: '{bookTitle}',
      versoHeaderRight: 'LIBER {chapterNumber}',
      rectoHeaderLeft: 'CANON {chapterNumber}',
      rectoHeaderCenter: '{chapterTitle}',
      rectoHeaderRight: '✦ SYMBOLICA ✦',
      versoFooterLeft: 'CODEX CRITICUS',
      versoFooterCenter: '❦   ❦   ❦',
      versoFooterRight: 'Fol. {pageNumber}v',
      rectoFooterLeft: 'TEXTUS RECEPTUS',
      rectoFooterCenter: '❦   ❦   ❦',
      rectoFooterRight: 'Fol. {pageNumber}r',
      headerFontFamily: 'Cinzel, Georgia, serif',
      headerFontSizePt: 9,
      headerTextTransform: 'small-caps',
      headerLetterSpacing: 0.08,
      headerRuleStyle: 'academic_ornament',
      headerRuleWidthPt: 0.5,
      footerRuleStyle: 'none',
      folioStyle: 'manuscript_codex',
    }
  },
  {
    id: 'medical_clinical_reference',
    title: 'Medical & Clinical Evidence Reference',
    category: 'Medical / Healthcare Reference',
    badge: 'Clinical Evidence Grade',
    description: 'Evidence-based clinical reference layout with diagnostic criteria classifications, medical specialty headers, ISO verification timestamps, and bracketed outer folios.',
    config: {
      ...DEFAULT_SCIENTIFIC_HEADER_FOOTER,
      preset: 'medical_clinical_reference',
      versoHeaderLeft: 'CLINICAL PRACTICE GUIDELINE',
      versoHeaderCenter: '',
      versoHeaderRight: '{bookTitle}',
      rectoHeaderLeft: 'DIAGNOSTIC CRITERIA §{chapterNumber}',
      rectoHeaderCenter: '',
      rectoHeaderRight: '{chapterTitle}',
      versoFooterLeft: 'EVIDENCE GRADE: LEVEL 1A',
      versoFooterCenter: 'CLINICAL MONOGRAPH',
      versoFooterRight: '[ {pageNumber} ]',
      rectoFooterLeft: '{copyrightNotice}',
      rectoFooterCenter: 'PEER-REVIEWED ACCREDITED',
      rectoFooterRight: '[ {pageNumber} ]',
      headerFontFamily: 'Helvetica, Arial, sans-serif',
      headerFontSizePt: 8,
      headerTextTransform: 'uppercase',
      headerLetterSpacing: 0.03,
      headerRuleStyle: 'solid_thin',
      headerRuleWidthPt: 0.5,
      footerRuleStyle: 'hairline',
      folioStyle: 'bracketed',
    }
  },
  {
    id: 'conference_proceedings',
    title: 'Symposium & Conference Proceedings',
    category: 'Conference / Preprint Archive',
    badge: 'Symposium Archive',
    description: 'International symposium and whitepaper series formatting with conference metadata header, ISSN/ISBN, and Open Access distribution stamps.',
    config: {
      ...DEFAULT_SCIENTIFIC_HEADER_FOOTER,
      preset: 'conference_proceedings',
      versoHeaderLeft: 'PROCEEDINGS OF THE 2026 INTERNATIONAL SYMPOSIUM',
      versoHeaderCenter: '',
      versoHeaderRight: '{issn}',
      rectoHeaderLeft: '{chapterTitle}',
      rectoHeaderCenter: '',
      rectoHeaderRight: '{author} • {bookTitle}',
      versoFooterLeft: 'OPEN ACCESS PREPRINT ARCHIVE',
      versoFooterCenter: 'CC-BY 4.0 INTERNATIONAL',
      versoFooterRight: '{pageNumber}',
      rectoFooterLeft: 'DOI: {doi}',
      rectoFooterCenter: 'IEEE / ACM INDEXED',
      rectoFooterRight: '{pageNumber}',
      headerFontFamily: 'Times New Roman, serif',
      headerFontSizePt: 8.5,
      headerTextTransform: 'none',
      headerLetterSpacing: 0.01,
      headerRuleStyle: 'hairline',
      headerRuleWidthPt: 0.5,
      footerRuleStyle: 'hairline',
      folioStyle: 'arabic',
    }
  },
  {
    id: 'classic_literary',
    title: 'Standard Literary & Trade Publishing',
    category: 'Standard Book Trade',
    badge: 'Clean Minimalist',
    description: 'Traditional literary trade running headers with book title centered on Verso, chapter title on Recto, and clean centered page numbers.',
    config: {
      ...DEFAULT_SCIENTIFIC_HEADER_FOOTER,
      preset: 'classic_literary',
      versoHeaderLeft: '',
      versoHeaderCenter: '{bookTitle}',
      versoHeaderRight: '',
      rectoHeaderLeft: '',
      rectoHeaderCenter: '{chapterTitle}',
      rectoHeaderRight: '',
      versoFooterLeft: '',
      versoFooterCenter: '{pageNumber}',
      versoFooterRight: '',
      rectoFooterLeft: '',
      rectoFooterCenter: '{pageNumber}',
      rectoFooterRight: '',
      headerFontFamily: 'Georgia, serif',
      headerFontSizePt: 8.5,
      headerTextTransform: 'uppercase',
      headerLetterSpacing: 0.05,
      headerRuleStyle: 'none',
      headerRuleWidthPt: 0,
      footerRuleStyle: 'none',
      folioStyle: 'arabic',
    }
  }
];

/**
 * Evaluates template expressions with dynamic tokens for headers and footers
 */
export function evaluateHeaderFooterToken(
  template: string,
  context: {
    bookTitle: string;
    author: string;
    chapterNumber: number;
    chapterTitle: string;
    pageNumber: number;
    totalPages: number;
    doi?: string;
    issn?: string;
    isbn?: string;
    journalName?: string;
    volumeIssue?: string;
    copyrightNotice?: string;
    documentClassification?: string;
  }
): string {
  if (!template) return '';
  
  return template
    .replace(/\{bookTitle\}/gi, context.bookTitle || 'Book Title')
    .replace(/\{author\}/gi, context.author || 'Author Name')
    .replace(/\{chapterNumber\}/gi, String(context.chapterNumber || 1))
    .replace(/\{chapterTitle\}/gi, context.chapterTitle || 'Chapter Title')
    .replace(/\{pageNumber\}/gi, String(context.pageNumber || 1))
    .replace(/\{totalPages\}/gi, String(context.totalPages || 100))
    .replace(/\{doi\}/gi, context.doi || '10.1016/j.esoterica.2026.04.012')
    .replace(/\{issn\}/gi, context.issn || 'ISSN 2831-9042')
    .replace(/\{isbn\}/gi, context.isbn || 'ISBN 978-0-12-345678-9')
    .replace(/\{journalName\}/gi, context.journalName || 'Journal of Scientific Literature')
    .replace(/\{volumeIssue\}/gi, context.volumeIssue || 'Vol. 1, Issue 1 (2026)')
    .replace(/\{copyrightNotice\}/gi, context.copyrightNotice || 'Open Access under CC-BY 4.0')
    .replace(/\{documentClassification\}/gi, context.documentClassification || 'PEER-REVIEWED');
}

/**
 * Formats page number based on chosen folio style
 */
export function formatFolioNumber(
  num: number,
  style: string,
  totalPages = 100,
  chapterNum = 1,
  isVerso = false
): string {
  switch (style) {
    case 'roman_lower':
      return toRomanNumeral(num).toLowerCase();
    case 'roman_upper':
      return toRomanNumeral(num).toUpperCase();
    case 'section_page':
      return `${chapterNum}-${num}`;
    case 'academic_fraction':
      return `Page ${num} of ${totalPages}`;
    case 'bracketed':
      return `[ ${num} ]`;
    case 'em_dash':
      return `— ${num} —`;
    case 'manuscript_codex':
      return `Fol. ${num}${isVerso ? 'v' : 'r'}`;
    case 'arabic':
    default:
      return `${num}`;
  }
}

function toRomanNumeral(num: number): string {
  if (num <= 0) return '';
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let roman = '';
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      roman += syms[i];
      num -= val[i];
    }
  }
  return roman;
}
