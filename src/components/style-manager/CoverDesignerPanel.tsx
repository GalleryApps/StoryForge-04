import React, { useState } from 'react';
import { Image as ImageIcon, Book, Sparkles, Wand2, Check, QrCode, Bookmark } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { CoverDesignSettings, CoverLayoutStyle } from '../../types';

export const CoverDesignerPanel: React.FC = () => {
  const { masterStyle, updateMasterStyle, book } = useStory();
  const cover = masterStyle?.coverDesign || {
    coverLayout: 'editorial_minimal',
    layoutStyle: 'editorial_minimal',
    titleFont: 'Cinzel',
    authorFont: 'Spectral',
    titleSizePt: 28,
    authorSizePt: 14,
    showSubtitle: true,
    showImprint: true,
    publisherImprint: 'StoryForge Press',
    barcodeEnabled: true,
    spineText: '',
    backCoverSynopsis: '',
    accentLineEnabled: true
  };

  const updateCover = (patch: Partial<CoverDesignSettings>) => {
    updateMasterStyle(prev => {
      const prevCov = prev.coverDesign || cover;
      return {
        ...prev,
        coverDesign: {
          ...prevCov,
          ...patch
        }
      };
    });
  };

  const layouts: { id: CoverLayoutStyle; label: string; desc: string }[] = [
    { id: 'editorial_minimal', label: 'Editorial Minimalist', desc: 'Refined typography with subtle border rule and centered focal art' },
    { id: 'full_illustration', label: 'Full Bleed Artwork', desc: 'Hero illustration spanning entire front cover with integrated lettering' },
    { id: 'architectural_frame', label: 'Architectural Framing', desc: 'Double framing border with filigree corners and prominent crest' },
    { id: 'typographic_dominance', label: 'Typographic Dominance', desc: 'Oversized bold title taking 60% of vertical canvas' },
    { id: 'split_duotone', label: 'Split Duotone', desc: 'Two-tone geometric block dividing imagery and manuscript title' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            Cover, Spine & Back Cover Architecture
          </h2>
          <p className="text-xs text-slate-500">
            Design front cover typography, back cover marketing copy, publisher imprint, and barcode placement.
          </p>
        </div>
      </div>

      {/* Cover Layout Presets */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Front Cover Layout Structure
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {layouts.map(ly => {
            const isSelected = cover.layoutStyle === ly.id;
            return (
              <button
                key={ly.id}
                onClick={() => updateCover({ layoutStyle: ly.id })}
                className={`text-left p-3.5 rounded-lg border transition ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{ly.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{ly.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Front Cover Settings */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Front Cover Lettering & Palette
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title Font
                </label>
                <input
                  type="text"
                  value={cover.titleFont || masterStyle.typographyHierarchy.h1.family}
                  onChange={e => updateCover({ titleFont: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Author Byline Font
                </label>
                <input
                  type="text"
                  value={cover.authorFont || masterStyle.typographyHierarchy.h4.family}
                  onChange={e => updateCover({ authorFont: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cover Art Directing Prompt / Concept
                </label>
                <textarea
                  rows={2}
                  value={cover.frontCoverIllustrationPrompt || ''}
                  onChange={e => updateCover({ frontCoverIllustrationPrompt: e.target.value })}
                  placeholder="e.g. Solitary bureaucrat standing in an impossible hall of towering filing cabinets, dramatic chiaroscuro beam..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Back Cover Settings */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Back Cover Copy & Publishing Meta
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hook / Praise Quote
                </label>
                <input
                  type="text"
                  value={cover.backCoverPraiseQuote || ''}
                  onChange={e => updateCover({ backCoverPraiseQuote: e.target.value })}
                  placeholder="“A biting, masterfully orchestrated portrait of administrative madness.”"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Back Cover Synopsis
                </label>
                <textarea
                  rows={3}
                  value={cover.backCoverSynopsis || ''}
                  onChange={e => updateCover({ backCoverSynopsis: e.target.value })}
                  placeholder="In the labyrinthine corridors of Department 4-B..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Publisher Imprint
                  </label>
                  <input
                    type="text"
                    value={cover.publisherImprint || 'Storyforge Press'}
                    onChange={e => updateCover({ publisherImprint: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ISBN-13
                  </label>
                  <input
                    type="text"
                    value={cover.isbn || '978-1-954321-00-8'}
                    onChange={e => updateCover({ isbn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Cover Specimen Mockup */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Cover Mockup Preview
            </h3>

            {/* Front Cover Card */}
            <div
              className="aspect-[1/1.5] rounded-xl p-5 border shadow-lg flex flex-col justify-between relative overflow-hidden transition"
              style={{
                backgroundColor: masterStyle?.colorPalette?.background || '#ffffff',
                borderColor: masterStyle?.colorPalette?.secondary || '#cbd5e1',
                color: masterStyle?.colorPalette?.text || '#1e293b'
              }}
            >
              <div className="space-y-1.5 z-10 text-center">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">
                  {book.genre || 'A NOVEL'}
                </span>
                <h4
                  className="text-base font-bold leading-tight"
                  style={{
                    fontFamily: cover.titleFont || masterStyle?.typographyHierarchy?.h1?.family || 'Cinzel',
                    color: masterStyle?.colorPalette?.primary || '#0f172a'
                  }}
                >
                  {book.title}
                </h4>
                {book.subtitle && (
                  <p className="text-[10px] text-slate-500 italic">
                    {book.subtitle}
                  </p>
                )}
              </div>

              <div className="my-auto py-4 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 rounded-lg bg-slate-50/50">
                <ImageIcon className="w-6 h-6 mb-1 text-slate-300" />
                <span className="text-[10px] font-medium text-center px-2">
                  {((cover?.layoutStyle || cover?.coverLayout || 'editorial_minimal')).replace(/_/g, ' ').toUpperCase()} COVER ART
                </span>
              </div>

              <div className="text-center z-10 pt-2 border-t border-slate-200">
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: cover.authorFont || masterStyle?.typographyHierarchy?.h4?.family || 'Spectral',
                    color: masterStyle?.colorPalette?.text || '#1e293b'
                  }}
                >
                  {book.author}
                </p>
                <span className="text-[9px] font-mono text-slate-400">
                  {cover.publisherImprint || 'STORYFORGE PRESS'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
