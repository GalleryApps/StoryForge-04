import React, { useState } from 'react';
import { Layout, Check, Sliders, Maximize2, Columns, Bookmark, Sparkles, BookOpen } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { PageDesignSettings, PageSizePreset, StyleApplicationScope } from '../../types';
import { HeaderFooterDesignPanel } from './HeaderFooterDesignPanel';

interface PageDesignPanelProps {
  selectedScope: StyleApplicationScope;
}

export const PageDesignPanel: React.FC<PageDesignPanelProps> = ({ selectedScope }) => {
  const { masterStyle, updateMasterStyle } = useStory();
  const [activeSubSection, setActiveSubSection] = useState<'geometry' | 'headers_footers'>('geometry');

  const pageDesign = masterStyle?.pageDesign || {
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

  const topMargin = pageDesign.marginsMm?.top ?? pageDesign.margins?.topMm ?? 20;
  const bottomMargin = pageDesign.marginsMm?.bottom ?? pageDesign.margins?.bottomMm ?? 20;
  const insideMargin = (pageDesign.marginsMm as any)?.inside ?? pageDesign.marginsMm?.left ?? pageDesign.margins?.leftMm ?? 24;
  const outsideMargin = (pageDesign.marginsMm as any)?.outside ?? pageDesign.marginsMm?.right ?? pageDesign.margins?.rightMm ?? 18;

  const updatePageDesign = (patch: Partial<PageDesignSettings>) => {
    updateMasterStyle(prev => {
      const prevPd = prev.pageDesign || pageDesign;
      return {
        ...prev,
        pageDesign: {
          ...prevPd,
          ...patch
        }
      };
    });
  };

  const updateMargin = (key: 'top' | 'bottom' | 'inside' | 'outside', value: number) => {
    const top = key === 'top' ? value : topMargin;
    const bottom = key === 'bottom' ? value : bottomMargin;
    const inside = key === 'inside' ? value : insideMargin;
    const outside = key === 'outside' ? value : outsideMargin;

    const newMarginsMm = {
      top,
      bottom,
      left: inside,
      right: outside,
      inside,
      outside
    };
    const newMargins = {
      topMm: top,
      bottomMm: bottom,
      leftMm: inside,
      rightMm: outside,
    };
    updatePageDesign({
      marginsMm: newMarginsMm,
      margins: newMargins,
    });
  };

  const pageSizes: { id: PageSizePreset; label: string; desc: string; dimensions: string }[] = [
    { id: '6x9', label: '6" × 9" US Trade', desc: 'Standard industry format for literary novels & non-fiction', dimensions: '152.4 × 228.6 mm' },
    { id: '5.5x8.5', label: '5.5" × 8.5" Digest', desc: 'Popular compact size for memoirs and fiction', dimensions: '139.7 × 215.9 mm' },
    { id: 'A5', label: 'A5 European Standard', desc: 'International standard for trade fiction and poetry', dimensions: '148 × 210 mm' },
    { id: 'A4', label: 'A4 Manual & Lab', desc: 'Spacious format for scientific monographs, workbooks, and lab manuals', dimensions: '210 × 297 mm' },
    { id: 'comic', label: '7" × 10" Graphic Novel', desc: 'Standard comic book and graphic novel dimension', dimensions: '177.8 × 254 mm' },
    { id: 'manga', label: '5" × 7.5" Manga Tankobon', desc: 'Compact Japanese manga tankobon format', dimensions: '128 × 182 mm' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header with Section Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layout className="w-4 h-4 text-indigo-600" />
            Page Geometry, Grids & Scientific Headers/Footers
          </h2>
          <p className="text-xs text-slate-500">
            Configure trim dimensions, print margins in millimeters, column counts, and scientific literature headers/footers.
          </p>
        </div>

        {/* Sub-section switcher */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubSection('geometry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSubSection === 'geometry'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            Trim & Margins
          </button>
          <button
            onClick={() => setActiveSubSection('headers_footers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSubSection === 'headers_footers'
                ? 'bg-sky-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Scientific Headers & Footers
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-sky-100 text-sky-800 font-bold ml-0.5">
              Scholarly
            </span>
          </button>
        </div>
      </div>

      {activeSubSection === 'headers_footers' ? (
        <HeaderFooterDesignPanel selectedScope={selectedScope} />
      ) : (
        <div className="space-y-6">
          {/* Quick Scientific Header/Footer Callout Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-600 text-white shadow-xs shrink-0">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Scientific & Academic Running Headers / Footers Active
                </h4>
                <p className="text-[11px] text-slate-600">
                  Configure DOI citations, journal/monograph headers, small-caps running heads, and academic suppression rules.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveSubSection('headers_footers')}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold tracking-wide shadow-xs transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Open Scientific Header & Footer Studio
            </button>
          </div>

          {/* Page Size Presets */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Trim Size & Aspect Ratio
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pageSizes.map(ps => {
                const isSelected = pageDesign.pageSize === ps.id;
                return (
                  <button
                    key={ps.id}
                    onClick={() => updatePageDesign({ pageSize: ps.id })}
                    className={`text-left p-3.5 rounded-lg border transition ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{ps.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </div>
                    <div className="text-[10px] font-mono text-indigo-600 font-semibold mt-0.5">
                      {ps.dimensions}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{ps.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Margins & Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Margins (mm) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Print Margins (Millimeters)
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Top Margin (mm)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={50}
                    value={topMargin}
                    onChange={e => updateMargin('top', parseInt(e.target.value) || 20)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bottom Margin (mm)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={50}
                    value={bottomMargin}
                    onChange={e => updateMargin('bottom', parseInt(e.target.value) || 20)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Inside / Gutter (mm)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={50}
                    value={insideMargin}
                    onChange={e => updateMargin('inside', parseInt(e.target.value) || 24)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Outside Margin (mm)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={50}
                    value={outsideMargin}
                    onChange={e => updateMargin('outside', parseInt(e.target.value) || 18)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Columns & Running Headers */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Columns & Layout Density
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Column Layout
                  </label>
                  <select
                    value={pageDesign.columns}
                    onChange={e => updatePageDesign({ columns: parseInt(e.target.value) as 1 | 2 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value={1}>Single Column (Standard Monograph / Prose)</option>
                    <option value={2}>Two Columns (Scientific Journal / Lab Manual)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Default Page Number Placement
                  </label>
                  <select
                    value={pageDesign.pageNumberPosition}
                    onChange={e => updatePageDesign({ pageNumberPosition: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="bottom_center">Bottom Center</option>
                    <option value="bottom_outside">Bottom Outside Margin</option>
                    <option value="top_outside">Top Outside Margin (Running Header)</option>
                    <option value="none">Hide Page Numbers</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Figure / Illustration Ratio: {pageDesign.imageToTextRatio || 30}% Figures</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={pageDesign.imageToTextRatio || 30}
                    onChange={e => updatePageDesign({ imageToTextRatio: parseInt(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
