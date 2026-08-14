import React from 'react';
import { FileCheck, Download, Sliders, Check, Printer, ShieldCheck } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { PdfPublishingSettings } from '../../types';

export const PdfPublishingPanel: React.FC = () => {
  const { masterStyle, updateMasterStyle } = useStory();
  const pdf = masterStyle?.pdfPublishing || {
    bleedMm: 3.175,
    cropMarks: true,
    twoSidedPrinting: true,
    colorProfile: 'sRGB',
    rasterQuality: '300dpi',
    targetDpi: 300,
    cmykProfile: 'FOGRA39',
    bleed: 3.175,
    includeCropMarks: true,
    includeColorBars: false,
    fontSizeAdjustmentPercent: 100,
    lineSpacingAdjustmentPercent: 100
  };

  const updatePdf = (patch: Partial<PdfPublishingSettings>) => {
    updateMasterStyle(prev => {
      const prevPdf = prev.pdfPublishing || pdf;
      return {
        ...prev,
        pdfPublishing: {
          ...prevPdf,
          ...patch
        }
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            PDF & Press-Ready Publishing Specifications
          </h2>
          <p className="text-xs text-slate-500">
            Configure bleed, crop marks, CMYK/sRGB color space conversions, and high-resolution 300 DPI exports.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Printer className="w-3.5 h-3.5" />
          <span>IngramSpark & KDP Compliant</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bleed & Crop Marks */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Bleed & Printer Marks
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Bleed: {pdf.bleedMm} mm</span>
              </div>
              <input
                type="range"
                min={0}
                max={6}
                step={0.5}
                value={pdf.bleedMm}
                onChange={e => updatePdf({ bleedMm: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
              <span className="text-[11px] text-slate-500">Standard offset printing requires 3.175 mm (0.125 in) bleed.</span>
            </div>

            <div className="pt-2 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdf.cropMarks}
                  onChange={e => updatePdf({ cropMarks: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs font-semibold text-slate-700">Include Corner Crop Marks</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdf.twoSidedPrinting}
                  onChange={e => updatePdf({ twoSidedPrinting: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs font-semibold text-slate-700">Two-Sided Mirrored Margins (Gutter Shift)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Color Profile & Resolution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Color Profile & Asset Resolution
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Output Color Profile
              </label>
              <select
                value={pdf.colorProfile}
                onChange={e => updatePdf({ colorProfile: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="sRGB">sRGB (High-Quality Digital & E-Reader)</option>
                <option value="CMYK_FOGRA39">CMYK FOGRA39 (European Commercial Offset)</option>
                <option value="CMYK_SWOP">CMYK SWOP (US Commercial Press)</option>
                <option value="Grayscale">Grayscale / Black & White (Cost-effective Print)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Image Raster Quality
              </label>
              <select
                value={pdf.rasterQuality}
                onChange={e => updatePdf({ rasterQuality: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="300dpi">300 DPI (Archival Press Quality)</option>
                <option value="150dpi">150 DPI (Fast Proofing PDF)</option>
                <option value="vector_preferred">Vector Preferred + 300 DPI</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
