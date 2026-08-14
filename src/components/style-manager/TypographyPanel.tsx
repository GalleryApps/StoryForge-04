import React, { useState, useEffect } from 'react';
import { Type, Check, Sliders, Lock, HelpCircle, Eye, Sparkles, RefreshCw, BookOpen, Layers } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { StyleApplicationScope, TextHierarchyStyleItem, TextHierarchyStyles, TypographyPreset } from '../../types';
import { POPULAR_FONTS, detectSystemFonts, TYPOGRAPHY_PRESETS } from '../../utils/fontDetector';

interface TypographyPanelProps {
  selectedScope: StyleApplicationScope;
}

export const TypographyPanel: React.FC<TypographyPanelProps> = ({ selectedScope }) => {
  const { masterStyle, updateMasterStyle, book, updateTypography } = useStory();
  const typo = masterStyle?.typographyHierarchy || ({} as TextHierarchyStyles);

  const [selectedTag, setSelectedTag] = useState<keyof TextHierarchyStyles>('body');
  const [detectedSystemFonts, setDetectedSystemFonts] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [sampleProse, setSampleProse] = useState('Arthur Vance placed his worn mechanical pencil precisely parallel to the edge of the municipal ledger. In Department 4-B, precision was not merely an administrative habit; it was the sole recognized form of insubordination.');

  useEffect(() => {
    handleScanFonts();
  }, []);

  const handleScanFonts = async () => {
    setIsScanning(true);
    try {
      const fonts = await detectSystemFonts();
      setDetectedSystemFonts(fonts);
    } catch (e) {
      console.warn('Font scan error:', e);
    } finally {
      setIsScanning(false);
    }
  };

  const applyPreset = (presetKey: TypographyPreset) => {
    const preset = TYPOGRAPHY_PRESETS[presetKey];
    if (preset) {
      updateTypography(preset);
      // Sync master style hierarchy
      updateMasterStyle(prev => ({
        ...prev,
        typographyHierarchy: {
          ...prev.typographyHierarchy,
          h1: { ...prev.typographyHierarchy.h1, family: preset.chapterHeadings.family, sizePt: preset.chapterHeadings.sizePt },
          h2: { ...prev.typographyHierarchy.h2, family: preset.chapterHeadings.family, sizePt: Math.max(14, preset.chapterHeadings.sizePt - 6) },
          body: { ...prev.typographyHierarchy.body, family: preset.bodyText.family, sizePt: preset.bodyText.sizePt, lineHeight: preset.bodyText.lineHeight },
          dialogue: { ...prev.typographyHierarchy.dialogue, family: preset.dialogue.family || preset.bodyText.family, sizePt: preset.dialogue.sizePt || preset.bodyText.sizePt },
        }
      }));
    }
  };

  const updateItem = (tag: keyof TextHierarchyStyles, patch: Partial<TextHierarchyStyleItem>) => {
    updateMasterStyle(prev => {
      const prevHier = prev.typographyHierarchy || typo;
      const target = prevHier[tag] || { family: 'Cinzel', sizePt: 12, weight: 400, lineHeight: 1.5, letterSpacing: 0 };
      return {
        ...prev,
        typographyHierarchy: {
          ...prevHier,
          [tag]: {
            ...target,
            ...patch
          }
        }
      };
    });

    // Also keep book.typography synced if modifying core body or heading
    if (tag === 'body' && patch.family) {
      updateTypography({
        ...book.typography,
        bodyText: {
          ...book.typography.bodyText,
          family: patch.family,
          sizePt: patch.sizePt || book.typography.bodyText.sizePt,
          lineHeight: patch.lineHeight || book.typography.bodyText.lineHeight,
        }
      });
    } else if (tag === 'h1' && patch.family) {
      updateTypography({
        ...book.typography,
        chapterHeadings: {
          ...book.typography.chapterHeadings,
          family: patch.family,
          sizePt: patch.sizePt || book.typography.chapterHeadings.sizePt,
        }
      });
    }
  };

  const currentItem: TextHierarchyStyleItem = typo[selectedTag] || typo.body || {
    family: 'Cinzel',
    fallback: 'Georgia, serif',
    generic: 'serif',
    weight: 400,
    sizePt: 12,
    lineHeight: 1.5,
    letterSpacing: 0
  };

  const tagsList: { key: keyof TextHierarchyStyles; label: string; group: string }[] = [
    { key: 'h1', label: 'Heading 1 (Book / Title)', group: 'Headings' },
    { key: 'h2', label: 'Heading 2 (Chapter Title)', group: 'Headings' },
    { key: 'h3', label: 'Heading 3 (Section / Scene)', group: 'Headings' },
    { key: 'h4', label: 'Heading 4 (Subheading)', group: 'Headings' },
    { key: 'body', label: 'Body Text', group: 'Prose & Reading' },
    { key: 'leadParagraph', label: 'Lead Paragraph (Opening)', group: 'Prose & Reading' },
    { key: 'dialogue', label: 'Dialogue Lines', group: 'Prose & Reading' },
    { key: 'quote', label: 'Blockquote / Epigraph', group: 'Prose & Reading' },
    { key: 'pullQuote', label: 'Editorial Pull Quote', group: 'Prose & Reading' },
    { key: 'caption', label: 'Image Caption', group: 'Annotation & Meta' },
    { key: 'footnote', label: 'Footnote / Citation', group: 'Annotation & Meta' },
    { key: 'exercise', label: 'Exercise Header & Body', group: 'Worksheets & Labs' },
    { key: 'example', label: 'Example Box', group: 'Worksheets & Labs' },
    { key: 'tip', label: 'Tip & Strategy Box', group: 'Worksheets & Labs' },
    { key: 'warning', label: 'Warning Box', group: 'Worksheets & Labs' },
    { key: 'callout', label: 'Callout Box', group: 'Worksheets & Labs' },
    { key: 'comicSpeechBubble', label: 'Comic Speech Lettering', group: 'Graphic & Comic' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Presets */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Type className="w-5 h-5 text-indigo-600" />
                Universal Typographic Hierarchy
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                17 Specialized Roles
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Configure system fonts, web typography stacks, paragraph metrics, and page sizing for digital and print publication.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-2 pr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" /> Preset:
            </span>
            <button
              onClick={() => applyPreset('literary')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:shadow-2xs transition"
            >
              Literary
            </button>
            <button
              onClick={() => applyPreset('satirical')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white shadow-2xs transition"
            >
              Satire
            </button>
            <button
              onClick={() => applyPreset('comic')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:shadow-2xs transition"
            >
              Comic
            </button>
            <button
              onClick={() => applyPreset('writing_manual')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:shadow-2xs transition"
            >
              Manual
            </button>
          </div>
        </div>

        {/* System Font Detector Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Native System Fonts:</span>
            <span className="text-slate-500">{detectedSystemFonts.length > 0 ? `${detectedSystemFonts.length} detected on host` : 'Scanning...'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1 max-w-md overflow-hidden">
              {detectedSystemFonts.slice(0, 5).map(sf => (
                <span key={sf} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700">
                  {sf}
                </span>
              ))}
              {detectedSystemFonts.length > 5 && (
                <span className="text-[10px] text-slate-400 self-center">+{detectedSystemFonts.length - 5} more</span>
              )}
            </div>
            <button
              onClick={handleScanFonts}
              disabled={isScanning}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] transition"
            >
              <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
              <span>Rescan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Hierarchy & Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Role Selector (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-3 shadow-2xs space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1">
            Hierarchy Roles (17 Elements)
          </div>
          <div className="space-y-1 max-h-[580px] overflow-y-auto pr-1">
            {tagsList.map(t => {
              const item = typo[t.key] || { family: 'Cinzel', sizePt: 12, weight: 400 };
              const isSelected = selectedTag === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setSelectedTag(t.key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="block">{t.label}</span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {item.family} • {item.sizePt}pt
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {item.weight}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle & Right: Inspector & Live Specimen Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tag Editor Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Target: {tagsList.find(t => t.key === selectedTag)?.label}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Font & Metric Controls
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Font Family Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Font Family
                </label>
                <select
                  value={currentItem.family}
                  onChange={e => updateItem(selectedTag, { family: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <optgroup label="Curated Typography Fonts">
                    {POPULAR_FONTS.map(f => (
                      <option key={f.name} value={f.name}>
                        {f.name} ({f.category})
                      </option>
                    ))}
                  </optgroup>
                  {detectedSystemFonts.length > 0 && (
                    <optgroup label="Detected Native System Fonts">
                      {detectedSystemFonts.map(sf => (
                        <option key={sf} value={sf}>
                          {sf} (System Native)
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              {/* Font Weight */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Font Weight ({currentItem.weight})
                </label>
                <select
                  value={currentItem.weight}
                  onChange={e => updateItem(selectedTag, { weight: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value={300}>300 - Light</option>
                  <option value={400}>400 - Regular / Normal</option>
                  <option value={500}>500 - Medium</option>
                  <option value={600}>600 - Semi-Bold</option>
                  <option value={700}>700 - Bold</option>
                  <option value={800}>800 - Extra Bold</option>
                  <option value={900}>900 - Black</option>
                </select>
              </div>

              {/* Font Size (pt) */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Size: {currentItem.sizePt} pt</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={48}
                  step={0.5}
                  value={currentItem.sizePt}
                  onChange={e => updateItem(selectedTag, { sizePt: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Line Height */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Line Height: {currentItem.lineHeight}</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={2.4}
                  step={0.05}
                  value={currentItem.lineHeight}
                  onChange={e => updateItem(selectedTag, { lineHeight: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Letter Spacing (Tracking) */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Letter Spacing: {currentItem.letterSpacing} em</span>
                </div>
                <input
                  type="range"
                  min={-0.05}
                  max={0.2}
                  step={0.01}
                  value={currentItem.letterSpacing}
                  onChange={e => updateItem(selectedTag, { letterSpacing: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* First-Line Paragraph Indent (when body or prose) */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Paragraph Indent: {book.typography.paragraphIndent || 4} mm</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={12}
                  step={0.5}
                  value={book.typography.paragraphIndent || 4}
                  onChange={e => updateTypography({ ...book.typography, paragraphIndent: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Text Transform */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Casing Transform
                </label>
                <select
                  value={currentItem.textTransform || 'none'}
                  onChange={e => updateItem(selectedTag, { textTransform: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="none">None (Standard)</option>
                  <option value="uppercase">UPPERCASE</option>
                  <option value="capitalize">Capitalize Words</option>
                  <option value="lowercase">lowercase</option>
                </select>
              </div>

              {/* Quick Styling Toggles */}
              <div className="flex items-end gap-2">
                <button
                  onClick={() => updateItem(selectedTag, { isItalic: !currentItem.isItalic })}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition ${
                    currentItem.isItalic
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Italic Toggle
                </button>
                <button
                  onClick={() => updateItem(selectedTag, { isSmallCaps: !currentItem.isSmallCaps })}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition ${
                    currentItem.isSmallCaps
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Small Caps
                </button>
              </div>
            </div>
          </div>

          {/* Live Page Typesetting Preview Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Live Render Specimen & Typesetting Page</span>
              <span>{currentItem.family} @ {currentItem.sizePt}pt</span>
            </div>

            <div
              className="p-6 rounded-xl bg-[#fdfcfa] border border-slate-200 shadow-inner transition space-y-3"
            >
              {/* Heading Sample */}
              <h2
                className="font-bold text-slate-900 border-b border-slate-200 pb-2"
                style={{
                  fontFamily: typo.h1?.family || 'Cinzel',
                  fontSize: `${(typo.h1?.sizePt || 22) * 0.9}px`,
                  letterSpacing: `${typo.h1?.letterSpacing || 0}em`,
                  textTransform: typo.h1?.textTransform || 'none',
                }}
              >
                Chapter 1: The Discrepancy of 8:03 AM
              </h2>

              {/* Active Element Specimen */}
              <div
                style={{
                  fontFamily: currentItem.family,
                  fontSize: `${currentItem.sizePt * 1.25}px`,
                  fontWeight: currentItem.weight,
                  lineHeight: currentItem.lineHeight,
                  letterSpacing: `${currentItem.letterSpacing}em`,
                  textTransform: currentItem.textTransform || 'none',
                  fontStyle: currentItem.isItalic ? 'italic' : 'normal',
                  fontVariant: currentItem.isSmallCaps ? 'small-caps' : 'normal',
                  color: masterStyle.colorPalette.text || '#1e293b',
                  textIndent: selectedTag === 'body' ? `${book.typography.paragraphIndent || 4}mm` : undefined,
                }}
              >
                {selectedTag === 'h1' && 'The Architect of Unforgiving Mondays'}
                {selectedTag === 'h2' && 'Chapter I: The Ledger of Small Defiances'}
                {selectedTag === 'h3' && 'Section 2: The Red Ink in the Drawer'}
                {selectedTag === 'body' && sampleProse}
                {selectedTag === 'leadParagraph' && 'In the quiet hours before dawn, when the municipal clocks ticked backward by an imperceptible second, the ledger revealed what the council had spent forty years attempting to bury.'}
                {selectedTag === 'dialogue' && '“If we adjust the chronological variance by even three minutes,” Maria whispered, “the entire ninth floor will arrive before Tuesday.”'}
                {selectedTag === 'quote' && '“Every empire collapses not from barbarians at the gates, but from the slow, deliberate misplacement of index cards.”'}
                {selectedTag === 'caption' && 'Fig 1.2: Cross-sectional perspective of the municipal filing catacombs.'}
                {selectedTag === 'exercise' && 'CRAFT EXERCISE: Write a 150-word scene where an object holds unexpressed hostility.'}
                {selectedTag === 'warning' && 'WARNING: Avoid adjective stacking when establishing high-stakes institutional urgency.'}
                {selectedTag === 'tip' && 'TIP: Ground emotional stakes in concrete tactile resistance.'}
                {selectedTag === 'comicSpeechBubble' && 'WE HAVE EXACTLY FOUR MINUTES UNTIL THE CLOCKTOWER STRIKES!'}
                {!['h1', 'h2', 'h3', 'body', 'leadParagraph', 'dialogue', 'quote', 'caption', 'exercise', 'warning', 'tip', 'comicSpeechBubble'].includes(selectedTag) &&
                  'The quick brown fox jumps over the lazy dog. 0123456789'}
              </div>

              {/* Formatted Dialogue Box */}
              <div
                className="italic border-l-2 border-indigo-600 pl-3 py-1 text-slate-800 text-xs"
                style={{
                  fontFamily: typo.dialogue?.family || typo.body?.family || 'Cinzel',
                }}
              >
                <strong>ARTHUR:</strong> “Fourteen minutes. It isn’t an error in the sum; it’s an error in the universe.”
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

