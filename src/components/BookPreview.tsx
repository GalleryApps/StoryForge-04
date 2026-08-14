import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  FileCheck,
  Columns,
  Square
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { BookPage, PageElement, ScientificHeaderFooterConfig } from '../types';
import { resolveElementStyle } from '../utils/styleEngineResolver';
import {
  DEFAULT_SCIENTIFIC_HEADER_FOOTER,
  evaluateHeaderFooterToken,
  formatFolioNumber
} from '../data/scientificHeaderPresets';

interface BookPreviewProps {
  onOpenExportModal: () => void;
}

export const BookPreview: React.FC<BookPreviewProps> = ({ onOpenExportModal }) => {
  const { book, totalPageCount } = useStory();
  const [spreadIndex, setSpreadIndex] = useState(0); // 0 = Cover/Title, then 1, 2, ...
  const [viewMode, setViewMode] = useState<'spread' | 'single'>('spread');
  const [zoomLevel, setZoomLevel] = useState(100);

  // Flatten all printable pages across FrontMatter + Chapters + EndMatter
  interface FlatPage {
    type: 'cover' | 'title' | 'copyright' | 'dedication' | 'toc' | 'chapter_start' | 'page' | 'end_matter';
    pageNumber: number;
    chapterTitle?: string;
    chapterNumber?: number;
    subtitle?: string;
    pageData?: BookPage;
  }

  const flattenedPages: FlatPage[] = [];
  let pageCounter = 1;

  // 1. Cover
  if (book.pdfSettings.includeCover) {
    flattenedPages.push({ type: 'cover', pageNumber: pageCounter++ });
  }

  // 2. Front Matter
  if (book.frontMatter.titlePage) {
    flattenedPages.push({ type: 'title', pageNumber: pageCounter++ });
  }
  if (book.frontMatter.copyrightPage) {
    flattenedPages.push({ type: 'copyright', pageNumber: pageCounter++ });
  }
  if (book.frontMatter.dedication || book.frontMatter.epigraph) {
    flattenedPages.push({ type: 'dedication', pageNumber: pageCounter++ });
  }
  if (book.frontMatter.tableOfContents) {
    flattenedPages.push({ type: 'toc', pageNumber: pageCounter++ });
  }

  // 3. Chapters
  for (const ch of book.chapters) {
    for (const sc of ch.scenes) {
      for (const pg of sc.pages) {
        flattenedPages.push({
          type: 'page',
          pageNumber: pageCounter++,
          chapterTitle: ch.title,
          chapterNumber: ch.number,
          subtitle: ch.subtitle,
          pageData: pg,
        });
      }
    }
  }

  // 4. End Matter
  if (book.endMatter.aboutAuthor || book.endMatter.acknowledgments) {
    flattenedPages.push({ type: 'end_matter', pageNumber: pageCounter++ });
  }

  const totalFlatPages = flattenedPages.length;
  const maxSpreadIndex = viewMode === 'spread' ? Math.ceil(totalFlatPages / 2) - 1 : totalFlatPages - 1;

  const leftPageIndex = viewMode === 'spread' ? spreadIndex * 2 : spreadIndex;
  const rightPageIndex = viewMode === 'spread' ? spreadIndex * 2 + 1 : -1;

  const leftPage = flattenedPages[leftPageIndex];
  const rightPage = rightPageIndex >= 0 && rightPageIndex < totalFlatPages ? flattenedPages[rightPageIndex] : null;

  // Render a specific flattened page component
  const renderPageSheet = (page: FlatPage | null, isLeft: boolean) => {
    if (!page) {
      return (
        <div className="w-[360px] h-[520px] bg-neutral-900/30 border border-dashed border-neutral-800 rounded-lg flex items-center justify-center text-neutral-600 text-xs font-mono">
          [ End of Volume Spread ]
        </div>
      );
    }

    const hfConfig: ScientificHeaderFooterConfig =
      book.masterStyleProfile?.pageDesign?.headersAndFooters ||
      book.masterStyleProfile?.pageDesign?.headerFooter ||
      DEFAULT_SCIENTIFIC_HEADER_FOOTER;

    const evalContext = {
      bookTitle: book.title || 'Book Title',
      author: book.author || 'Author',
      chapterNumber: page.chapterNumber || 1,
      chapterTitle: page.chapterTitle || 'Chapter',
      pageNumber: page.pageNumber,
      totalPages: totalFlatPages || 100,
      doi: hfConfig.doiString || '10.1016/j.esoterica.2026.04.012',
      issn: hfConfig.issnString || 'ISSN 2831-9042',
      isbn: hfConfig.isbnString || 'ISBN 978-0-12-345678-9',
      journalName: hfConfig.journalName || 'Journal of Scientific Literature',
      volumeIssue: hfConfig.volumeIssue || 'Vol. 1, Issue 1 (2026)',
      copyrightNotice: hfConfig.copyrightNotice || 'Open Access under CC-BY 4.0',
      documentClassification: hfConfig.documentClassification || 'PEER-REVIEWED'
    };

    const isCoverOrTitle = page.type === 'cover' || page.type === 'title';
    const isFrontMatter = page.type === 'title' || page.type === 'copyright' || page.type === 'dedication' || page.type === 'toc';

    const headerLeft = isLeft
      ? evaluateHeaderFooterToken(hfConfig.versoHeaderLeft, evalContext)
      : evaluateHeaderFooterToken(hfConfig.rectoHeaderLeft, evalContext);
    const headerCenter = isLeft
      ? evaluateHeaderFooterToken(hfConfig.versoHeaderCenter, evalContext)
      : evaluateHeaderFooterToken(hfConfig.rectoHeaderCenter, evalContext);
    const headerRight = isLeft
      ? evaluateHeaderFooterToken(hfConfig.versoHeaderRight, evalContext)
      : evaluateHeaderFooterToken(hfConfig.rectoHeaderRight, evalContext);

    const formattedFolio = formatFolioNumber(
      page.pageNumber,
      isFrontMatter ? (hfConfig.frontMatterFolioStyle === 'none' ? 'arabic' : hfConfig.frontMatterFolioStyle || 'roman_lower') : hfConfig.folioStyle,
      totalFlatPages,
      page.chapterNumber || 1,
      isLeft
    );

    const footerLeft = isLeft
      ? evaluateHeaderFooterToken(hfConfig.versoFooterLeft, { ...evalContext, pageNumber: formattedFolio as any })
      : evaluateHeaderFooterToken(hfConfig.rectoFooterLeft, { ...evalContext, pageNumber: formattedFolio as any });
    const footerCenter = isLeft
      ? evaluateHeaderFooterToken(hfConfig.versoFooterCenter, { ...evalContext, pageNumber: formattedFolio as any })
      : evaluateHeaderFooterToken(hfConfig.rectoFooterCenter, { ...evalContext, pageNumber: formattedFolio as any });
    const footerRight = isLeft
      ? evaluateHeaderFooterToken(hfConfig.versoFooterRight, { ...evalContext, pageNumber: formattedFolio as any })
      : evaluateHeaderFooterToken(hfConfig.rectoFooterRight, { ...evalContext, pageNumber: formattedFolio as any });

    return (
      <div
        className="w-[360px] sm:w-[420px] h-[580px] sm:h-[620px] bg-[#fcfbfa] text-neutral-900 rounded-lg shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative border border-neutral-300 font-serif select-none overflow-hidden"
        style={{
          boxShadow: isLeft
            ? '-10px 0 25px rgba(0,0,0,0.35), inset -15px 0 20px rgba(0,0,0,0.03)'
            : '10px 0 25px rgba(0,0,0,0.35), inset 15px 0 20px rgba(0,0,0,0.03)',
        }}
      >
        {/* Running Header */}
        {!isCoverOrTitle && (!isFrontMatter || !hfConfig.suppressHeaderOnFrontMatter) && (
          <div className="pb-1 border-b border-neutral-200">
            <div
              className="text-[9.5px] text-neutral-500 flex justify-between items-center leading-tight tracking-wider"
              style={{
                fontFamily: hfConfig.headerFontFamily || 'Helvetica, sans-serif',
                textTransform: (hfConfig.headerTextTransform as any) || 'uppercase',
                letterSpacing: `${hfConfig.headerLetterSpacing || 0.03}em`,
                color: hfConfig.headerTextColor || '#64748b'
              }}
            >
              <span>{headerLeft}</span>
              <span>{headerCenter}</span>
              <span className="font-semibold">{headerRight}</span>
            </div>
            {hfConfig.headerRuleStyle === 'double_rule' && (
              <div className="w-full mt-1 space-y-[1px]">
                <div className="w-full border-t border-neutral-300" />
                <div className="w-full border-t border-neutral-300" />
              </div>
            )}
          </div>
        )}

        {/* Page Body Content */}
        <div className="flex-1 py-4 overflow-y-auto space-y-3 scrollbar-none text-xs sm:text-sm">
          {/* COVER PAGE */}
          {page.type === 'cover' && (
            <div
              className="w-full h-full rounded-md p-6 flex flex-col justify-between text-center relative overflow-hidden"
              style={{ backgroundColor: book.cover.bgColor || '#0f172a', color: book.cover.textColor || '#f8fafc' }}
            >
              {book.cover.bgImageUrl && (
                <img
                  src={book.cover.bgImageUrl}
                  alt="Cover Background"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}
              <div className="relative z-10 border-2 border-amber-500/80 p-4 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase font-sans tracking-widest text-amber-400 font-bold block mb-2">
                    VOLUME {book.volume || 1} • {book.genre?.toUpperCase()}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight font-serif text-white">
                    {book.title}
                  </h1>
                  {book.subtitle && (
                    <p className="text-xs italic text-neutral-300 mt-2 font-serif">
                      {book.subtitle}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-sans tracking-wider text-neutral-200 uppercase font-medium">
                    {book.author}
                  </p>
                  <p className="text-[8px] text-neutral-400 uppercase mt-1">
                    StoryForge Digital Editions
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TITLE PAGE */}
          {page.type === 'title' && (
            <div className="h-full flex flex-col justify-between text-center py-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-950 font-serif">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-xs italic text-neutral-600 mt-1 font-serif">
                    {book.subtitle}
                  </p>
                )}
                <div className="w-16 h-0.5 bg-neutral-300 mx-auto my-4" />
                <p className="text-sm font-serif text-neutral-800 font-medium">
                  {book.author}
                </p>
              </div>
              <div className="text-[10px] font-sans text-neutral-500 space-y-0.5">
                <p>Volume {book.volume || 1}</p>
                <p>{book.frontMatter.publisherName || 'StoryForge Studio Press'}</p>
              </div>
            </div>
          )}

          {/* COPYRIGHT PAGE */}
          {page.type === 'copyright' && (
            <div className="h-full flex flex-col justify-end text-[9px] font-serif text-neutral-600 space-y-2">
              <p className="font-bold text-neutral-900">{book.title}</p>
              <p>Copyright © {book.frontMatter.copyrightYear || '2026'} by {book.author}</p>
              <p>All rights reserved. No part of this publication may be reproduced or transmitted without written permission.</p>
              <p>Published by {book.frontMatter.publisherName || 'StoryForge Studio Press'}</p>
              <p>ISBN: {book.frontMatter.isbn || 'First Digital Edition'}</p>
            </div>
          )}

          {/* DEDICATION & EPIGRAPH */}
          {page.type === 'dedication' && (
            <div className="h-full flex flex-col justify-center text-center px-4 space-y-8">
              {book.frontMatter.dedication && (
                <div className="italic text-xs text-neutral-800 leading-relaxed font-serif">
                  "{book.frontMatter.dedication}"
                </div>
              )}
              {book.frontMatter.epigraph && (
                <div className="space-y-1">
                  <p className="italic text-xs text-neutral-800 leading-relaxed font-serif">
                    "{book.frontMatter.epigraph}"
                  </p>
                  {book.frontMatter.epigraphAuthor && (
                    <p className="text-[10px] text-neutral-500 font-sans">
                      — {book.frontMatter.epigraphAuthor}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TABLE OF CONTENTS */}
          {page.type === 'toc' && (
            <div className="space-y-4">
              <h2 className="text-center font-bold text-sm uppercase tracking-widest text-neutral-900 font-serif border-b border-neutral-200 pb-2">
                Table of Contents
              </h2>
              <div className="space-y-2 text-xs">
                {book.chapters.map(c => (
                  <div key={c.id} className="flex justify-between items-baseline border-b border-dotted border-neutral-300 pb-1">
                    <span className="font-serif text-neutral-800">Chapter {c.number}: {c.title}</span>
                    <span className="font-sans text-[10px] text-neutral-500">{c.number * 2 + 3}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STANDARD CHAPTER PAGE */}
          {page.type === 'page' && page.pageData && (
            <div className="space-y-3">
              {page.pageData.elements.map((el, elIdx) => {
                const isFirstParagraph = el.type === 'paragraph' && elIdx === 0;
                return (
                  <div key={el.id}>
                    {el.type === 'heading' && (
                      <h3
                        className="font-bold text-sm sm:text-base tracking-tight mt-2 mb-1"
                        style={{
                          fontFamily: book.masterStyleProfile?.typographyHierarchy?.h3?.family || 'Cinzel',
                          color: book.masterStyleProfile?.colorPalette?.primary || '#0f172a'
                        }}
                      >
                        {el.content}
                      </h3>
                    )}
                    {el.type === 'paragraph' && (
                      <p
                        className="leading-relaxed text-justify indent-4"
                        style={{
                          fontFamily: book.masterStyleProfile?.typographyHierarchy?.body?.family || 'Spectral',
                          fontSize: `${(book.masterStyleProfile?.typographyHierarchy?.body?.sizePt || 11) * 1.05}px`,
                          lineHeight: book.masterStyleProfile?.typographyHierarchy?.body?.lineHeight || 1.6,
                          color: book.masterStyleProfile?.colorPalette?.text || '#1e293b'
                        }}
                      >
                        {isFirstParagraph && book.masterStyleProfile?.chapterDesign?.dropCapEnabled && el.content ? (
                          <>
                            <span
                              className="float-left text-3xl font-bold leading-none pr-2 pt-1 uppercase"
                              style={{
                                fontFamily: book.masterStyleProfile?.chapterDesign?.dropCapFont || 'Cinzel',
                                color: book.masterStyleProfile?.colorPalette?.accent1 || '#d97706'
                              }}
                            >
                              {el.content.charAt(0)}
                            </span>
                            {el.content.slice(1)}
                          </>
                        ) : (
                          el.content
                        )}
                      </p>
                    )}
                    {el.type === 'dialogue' && (
                      <p
                        className="leading-relaxed italic indent-4"
                        style={{
                          fontFamily: book.masterStyleProfile?.typographyHierarchy?.dialogue?.family || 'Spectral',
                          color: book.masterStyleProfile?.colorPalette?.text || '#1e293b'
                        }}
                      >
                        {el.speaker && (
                          <strong
                            className="font-sans not-italic text-[10px] uppercase mr-1"
                            style={{ color: book.masterStyleProfile?.colorPalette?.primary || '#0f172a' }}
                          >
                            {el.speaker}:
                          </strong>
                        )}
                        "{el.content}"
                      </p>
                    )}
                    {el.type === 'illustration' && (
                      <div className="my-2 space-y-1">
                        <div
                          className="rounded overflow-hidden border aspect-video flex items-center justify-center"
                          style={{
                            borderColor: book.masterStyleProfile?.colorPalette?.secondary || '#cbd5e1',
                            backgroundColor: '#f1f5f9'
                          }}
                        >
                          {el.imageUrl ? (
                            <img
                              src={el.imageUrl}
                              alt="Page Art"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-neutral-400 font-sans">
                              {(book.masterStyleProfile?.artDirection?.medium || 'ILLUSTRATION').replace(/_/g, ' ').toUpperCase()}
                            </span>
                          )}
                        </div>
                        {el.content && (
                          <p
                            className="text-center italic text-[10px]"
                            style={{
                              fontFamily: book.masterStyleProfile?.typographyHierarchy?.caption?.family || 'Spectral',
                              color: book.masterStyleProfile?.colorPalette?.secondary || '#64748b'
                            }}
                          >
                            {el.content}
                          </p>
                        )}
                      </div>
                    )}
                    {el.type === 'exercise_box' && (
                      <div
                        className="p-3 my-2 text-[11px] rounded-lg border-l-4"
                        style={{
                          backgroundColor: `${book.masterStyleProfile?.colorPalette?.accent2 || '#0284c7'}15`,
                          borderColor: book.masterStyleProfile?.colorPalette?.accent2 || '#0284c7',
                          color: book.masterStyleProfile?.colorPalette?.text || '#1e293b'
                        }}
                      >
                        <span
                          className="font-bold uppercase block text-[9px] mb-1"
                          style={{ color: book.masterStyleProfile?.colorPalette?.accent2 || '#0284c7' }}
                        >
                          {el.calloutType || 'EXERCISE / CRAFT NOTE'}
                        </span>
                        {el.content}
                      </div>
                    )}
                    {el.type === 'scene_break' && (
                      <div
                        className="text-center my-3 tracking-widest text-xs"
                        style={{ color: book.masterStyleProfile?.colorPalette?.accent1 || '#d97706' }}
                      >
                        {book.masterStyleProfile?.chapterDesign?.ornamentStyle === 'fleuron' ? '❦   ❦   ❦' : '— ◇ —'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* END MATTER */}
          {page.type === 'end_matter' && (
            <div className="space-y-6 pt-4">
              {book.endMatter.aboutAuthor && (
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-serif mb-2">
                    About the Author
                  </h3>
                  <p className="text-neutral-800 text-xs leading-relaxed">
                    {book.endMatter.aboutAuthor}
                  </p>
                </div>
              )}
              {book.endMatter.acknowledgments && (
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-serif mb-2">
                    Acknowledgments
                  </h3>
                  <p className="text-neutral-800 text-xs leading-relaxed">
                    {book.endMatter.acknowledgments}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Running Footer: Page Folio & Scientific Citations */}
        {page.type !== 'cover' && (!isFrontMatter || !hfConfig.suppressFooterOnCover) && (
          <div className="pt-1 border-t border-neutral-200">
            {hfConfig.footerRuleStyle === 'double_rule' && (
              <div className="w-full mb-1 space-y-[1px]">
                <div className="w-full border-t border-neutral-300" />
                <div className="w-full border-t border-neutral-300" />
              </div>
            )}
            <div
              className="text-[9px] text-neutral-500 flex justify-between items-center leading-tight tracking-wider"
              style={{
                fontFamily: hfConfig.footerFontFamily || 'Helvetica, sans-serif',
                textTransform: (hfConfig.footerTextTransform as any) || 'none',
                letterSpacing: `${hfConfig.footerLetterSpacing || 0.02}em`,
                color: hfConfig.footerTextColor || '#64748b'
              }}
            >
              <span>{footerLeft}</span>
              <span>{footerCenter}</span>
              <span className="font-mono font-medium">{footerRight}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-85px)] overflow-hidden bg-slate-100 text-slate-800">
      {/* Top Preview Controls Toolbar */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-sm text-slate-800">
            True-to-Print Publishing Preview
          </span>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            ({book.pdfSettings.pageSize} • {book.typography.bodyText.family} • {book.typography.bodyText.sizePt}pt)
          </span>
        </div>

        {/* View Mode & Zoom Controls */}
        <div className="flex items-center gap-2">
          {/* Spread / Single toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => {
                setViewMode('spread');
                setSpreadIndex(0);
              }}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition ${
                viewMode === 'spread' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Two-Page Spread View"
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setViewMode('single');
                setSpreadIndex(0);
              }}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition ${
                viewMode === 'single' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Single Page View"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Export Trigger */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3.5 py-1.5 rounded-lg text-xs tracking-wide shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD PDF</span>
          </button>
        </div>
      </div>

      {/* Main Preview Stage */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-200/90">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-300">
          {renderPageSheet(leftPage, true)}
          {viewMode === 'spread' && renderPageSheet(rightPage, false)}
        </div>
      </div>

      {/* Bottom Spread Navigator */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-center gap-4 shadow-xs">
        <button
          disabled={spreadIndex === 0}
          onClick={() => setSpreadIndex(Math.max(0, spreadIndex - 1))}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 disabled:opacity-30 text-slate-700 text-xs font-semibold transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs font-mono text-slate-600 font-medium">
          {viewMode === 'spread'
            ? `Spread ${spreadIndex + 1} of ${maxSpreadIndex + 1} (Pages ${leftPage?.pageNumber || 0} - ${rightPage?.pageNumber || leftPage?.pageNumber || 0})`
            : `Page ${spreadIndex + 1} of ${totalFlatPages}`}
        </span>

        <button
          disabled={spreadIndex >= maxSpreadIndex}
          onClick={() => setSpreadIndex(Math.min(maxSpreadIndex, spreadIndex + 1))}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 disabled:opacity-30 text-slate-700 text-xs font-semibold transition"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
