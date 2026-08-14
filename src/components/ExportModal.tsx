import React, { useState } from 'react';
import {
  Download,
  FileText,
  BookOpen,
  Settings,
  CheckCircle2,
  X,
  Loader2,
  FileCode,
  FileBox,
  Layers,
  Sparkles,
  Printer,
  ChevronDown
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { generateBookPdf, ExportProgress, sanitizeFilename } from '../utils/pdfGenerator';
import { generateEpub, generateMarkdown, generatePlainText } from '../utils/epubGenerator';
import { PageSize, PdfExportSettings } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { book, updatePdfSettings } = useStory();
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [activeTab, setActiveTab] = useState<'pdf' | 'epub' | 'text' | 'json'>('pdf');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const pdfSettings = book.pdfSettings;

  if (!isOpen) return null;

  const handleUpdatePdf = (field: keyof PdfExportSettings, value: any) => {
    updatePdfSettings({
      ...pdfSettings,
      [field]: value,
    });
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setProgress({ stage: 'Initiating typesetting engine...', percent: 5 });
    setDownloadSuccess(null);

    try {
      const result = await generateBookPdf(book, pdfSettings, (p) => {
        setProgress(p);
      });

      // Trigger standard browser download
      const a = document.createElement('a');
      a.href = result.url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadSuccess(`Successfully exported "${result.filename}"`);
    } catch (e: any) {
      console.error('PDF export error:', e);
      alert(`PDF Generation failed: ${e.message}`);
    } finally {
      setIsExporting(false);
      setProgress(null);
    }
  };

  const handleDownloadEpub = async () => {
    setIsExporting(true);
    try {
      const { blob, filename } = await generateEpub(book);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloadSuccess(`Successfully exported "${filename}"`);
    } catch (e: any) {
      console.error('EPUB export error:', e);
      alert(`EPUB Generation failed: ${e.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const { content, filename } = generateMarkdown(book);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadSuccess(`Successfully exported "${filename}"`);
  };

  const handleDownloadPlainText = () => {
    const { content, filename } = generatePlainText(book);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadSuccess(`Successfully exported "${filename}"`);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(book, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sanitizeFilename(`${book.author}_${book.title}_Volume${book.volume || 1}`)}.storyforge.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadSuccess('Exported complete JSON manuscript backup.');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black shadow-xs">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Publish & Export Book Package
              </h2>
              <p className="text-xs text-slate-500">
                Generate high-resolution digital book with complete cover, copyright, pagination, and illustrations.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'pdf' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Digital PDF Book</span>
          </button>

          <button
            onClick={() => setActiveTab('epub')}
            className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'epub' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>EPUB 3.0 (E-Reader)</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'text' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Markdown / TXT</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'json' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Raw JSON</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* TAB 1: PDF PUBLISHING SETTINGS */}
          {activeTab === 'pdf' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Page Size */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <label className="font-bold text-slate-700">Trim / Page Size</label>
                  <select
                    value={pdfSettings.pageSize}
                    onChange={e => handleUpdatePdf('pageSize', e.target.value as PageSize)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="6x9">6" x 9" Digest (Standard Trade Fiction)</option>
                    <option value="A4">A4 (210 x 297 mm)</option>
                    <option value="A5">A5 (148 x 210 mm)</option>
                    <option value="Letter">US Letter (8.5" x 11")</option>
                    <option value="Comic">Comic & Graphic (170 x 260 mm)</option>
                    <option value="Square">Square Art Edition (200 x 200 mm)</option>
                  </select>
                </div>

                {/* Page Numbering Position */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <label className="font-bold text-slate-700">Pagination Position</label>
                  <select
                    value={pdfSettings.pageNumbering}
                    onChange={e => handleUpdatePdf('pageNumbering', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="bottom_outside">Bottom Outside (Alternate Left/Right)</option>
                    <option value="bottom_center">Bottom Center</option>
                    <option value="none">No Page Numbers</option>
                  </select>
                </div>
              </div>

              {/* Margins */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Page Margins (mm)</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Top: {pdfSettings.marginTopMm}mm | Bottom: {pdfSettings.marginBottomMm}mm | Left: {pdfSettings.marginLeftMm}mm | Right: {pdfSettings.marginRightMm}mm
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Top</label>
                    <input
                      type="number"
                      value={pdfSettings.marginTopMm}
                      onChange={e => handleUpdatePdf('marginTopMm', parseFloat(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-center text-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Bottom</label>
                    <input
                      type="number"
                      value={pdfSettings.marginBottomMm}
                      onChange={e => handleUpdatePdf('marginBottomMm', parseFloat(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-center text-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Left (Gutter)</label>
                    <input
                      type="number"
                      value={pdfSettings.marginLeftMm}
                      onChange={e => handleUpdatePdf('marginLeftMm', parseFloat(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-center text-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Right</label>
                    <input
                      type="number"
                      value={pdfSettings.marginRightMm}
                      onChange={e => handleUpdatePdf('marginRightMm', parseFloat(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-center text-slate-900 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input
                    type="checkbox"
                    checked={pdfSettings.includeCover}
                    onChange={e => handleUpdatePdf('includeCover', e.target.checked)}
                    className="accent-indigo-600 rounded w-4 h-4"
                  />
                  <span className="text-slate-700 font-medium">Include Cover Artwork Page</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input
                    type="checkbox"
                    checked={pdfSettings.chapterNumbering}
                    onChange={e => handleUpdatePdf('chapterNumbering', e.target.checked)}
                    className="accent-indigo-600 rounded w-4 h-4"
                  />
                  <span className="text-slate-700 font-medium">Include Chapter Number Badges</span>
                </label>
              </div>

              {/* Progress indicator during compilation */}
              {isExporting && progress && (
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-indigo-800 font-mono font-semibold flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                      {progress.stage}
                    </span>
                    <span className="font-mono text-indigo-700 font-bold">{progress.percent}%</span>
                  </div>
                  <div className="w-full bg-indigo-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EPUB 3.0 */}
          {activeTab === 'epub' && (
            <div className="space-y-4 text-xs bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-sm text-slate-800">Reflowable EPUB 3.0 Package</h3>
              <p className="text-slate-600 leading-relaxed">
                Generates a clean, validated EPUB package with embedded CSS stylesheet, table of contents navigation (toc.xhtml), and full chapter hierarchy. Compatible with Apple Books, Kindle (via Send to Kindle), Kobo, and Google Play Books.
              </p>
              <button
                onClick={handleDownloadEpub}
                disabled={isExporting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>DOWNLOAD EPUB E-BOOK</span>
              </button>
            </div>
          )}

          {/* TAB 3: MARKDOWN / PLAIN TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Clean Markdown (.md)</h3>
                <p className="text-slate-600">
                  Formatted Markdown preserving chapter headings, dialogue quotes, illustration captions, and craft callout boxes.
                </p>
                <button
                  onClick={handleDownloadMarkdown}
                  className="bg-white hover:bg-slate-100 text-slate-800 font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2 border border-slate-200 shadow-2xs transition"
                >
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Download .MD File</span>
                </button>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Plain Text (.txt)</h3>
                <p className="text-slate-600">
                  Universal text document typeset with classic ASCII dividers and standard scene breaks.
                </p>
                <button
                  onClick={handleDownloadPlainText}
                  className="bg-white hover:bg-slate-100 text-slate-800 font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2 border border-slate-200 shadow-2xs transition"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Download .TXT File</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: RAW JSON BACKUP */}
          {activeTab === 'json' && (
            <div className="space-y-4 text-xs bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-sm text-slate-800">Complete StoryForge JSON Schema</h3>
              <p className="text-slate-600 leading-relaxed">
                Exports the entire raw document tree including the 3-Level Memory Engine, Character Bible locked traits, Extracted Continuity Facts, and Typography configurations. Can be imported or transferred seamlessly.
              </p>
              <button
                onClick={handleDownloadJson}
                className="w-full bg-white hover:bg-slate-100 text-slate-800 font-bold py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-200 shadow-2xs transition"
              >
                <FileCode className="w-4 h-4 text-indigo-600" />
                <span>DOWNLOAD JSON BACKUP</span>
              </button>
            </div>
          )}

          {/* Success Banner */}
          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
          )}
        </div>

        {/* Modal Footer / Primary PDF Action */}
        {activeTab === 'pdf' && (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              Output: High-Resolution Typeset PDF
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition"
              >
                Close
              </button>
              <button
                id="btn-confirm-download-pdf"
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs tracking-wider shadow-sm active:scale-95 transition disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>GENERATING BOOK...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD PDF BOOK</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
