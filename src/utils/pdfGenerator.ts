import { jsPDF } from 'jspdf';
import { BookDocument, PdfExportSettings, ScientificHeaderFooterConfig } from '../types';
import {
  DEFAULT_SCIENTIFIC_HEADER_FOOTER,
  evaluateHeaderFooterToken,
  formatFolioNumber
} from '../data/scientificHeaderPresets';

export interface ExportProgress {
  stage: string;
  percent: number;
}

export const PAGE_SIZE_DIMENSIONS: Record<string, [number, number]> = {
  'A4': [210, 297],
  'A5': [148, 210],
  'Letter': [215.9, 279.4],
  'US_Legal': [215.9, 355.6],
  '6x9': [152.4, 228.6],
  '5.5x8.5': [139.7, 215.9],
  '8x10': [203.2, 254.0],
  '8.5x11': [215.9, 279.4],
  'Square': [203.2, 203.2],
  'Comic': [170, 260],
  'Custom': [152.4, 228.6],
};

/**
 * Sanitize filename to avoid invalid OS characters
 */
export function sanitizeFilename(raw: string): string {
  return raw
    .replace(/[<>:"/\\|?*]+/g, '_')
    .replace(/\s+/g, '_')
    .replace(/^_+|_+$/g, '') || 'StoryForge_Book';
}

/**
 * Convert number to Roman numerals for front matter
 */
export function toRomanNumeral(num: number): string {
  if (num <= 0) return '';
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ['m', 'cm', 'd', 'cd', 'c', 'xc', 'l', 'xl', 'x', 'ix', 'v', 'iv', 'i'];
  let roman = '';
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      roman += syms[i];
      num -= val[i];
    }
  }
  return roman;
}

/**
 * Helper to safely load image dimensions and data URL for jsPDF
 */
async function getLoadedImageData(url: string, grayscale = false): Promise<{ dataUrl: string; width: number; height: number; format: string } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);

        if (grayscale) {
          ctx.filter = 'grayscale(100%)';
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve({ dataUrl, width: canvas.width, height: canvas.height, format: 'JPEG' });
      } catch (e) {
        console.warn('Canvas export failed for image:', e);
        resolve(null);
      }
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Draw professional crop marks and bleed guides
 */
function drawPrinterMarks(doc: jsPDF, width: number, height: number, bleedMm: number) {
  const markLen = 6;
  const offset = 2;
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.15);

  // Top Left
  doc.line(bleedMm - offset - markLen, bleedMm, bleedMm - offset, bleedMm);
  doc.line(bleedMm, bleedMm - offset - markLen, bleedMm, bleedMm - offset);

  // Top Right
  doc.line(width - bleedMm + offset, bleedMm, width - bleedMm + offset + markLen, bleedMm);
  doc.line(width - bleedMm, bleedMm - offset - markLen, width - bleedMm, bleedMm - offset);

  // Bottom Left
  doc.line(bleedMm - offset - markLen, height - bleedMm, bleedMm - offset, height - bleedMm);
  doc.line(bleedMm, height - bleedMm + offset, bleedMm, height - bleedMm + offset + markLen);

  // Bottom Right
  doc.line(width - bleedMm + offset, height - bleedMm, width - bleedMm + offset + markLen, height - bleedMm);
  doc.line(width - bleedMm, height - bleedMm + offset, width - bleedMm, height - bleedMm + offset + markLen);
}

/**
 * Generate a complete, professionally published PDF Book from structured BookDocument
 */
export async function generateBookPdf(
  book: BookDocument,
  settings: PdfExportSettings,
  onProgress?: (progress: ExportProgress) => void
): Promise<{ blob: Blob; url: string; filename: string }> {
  const updateProgress = (stage: string, percent: number) => {
    if (onProgress) onProgress({ stage, percent });
  };

  updateProgress('Initializing 500-page publishing engine...', 4);

  const [defaultWidth, defaultHeight] = PAGE_SIZE_DIMENSIONS[settings.pageSize] || PAGE_SIZE_DIMENSIONS['6x9'];
  const baseWidthMm = settings.pageSize === 'Custom' && settings.customWidthMm ? settings.customWidthMm : defaultWidth;
  const baseHeightMm = settings.pageSize === 'Custom' && settings.customHeightMm ? settings.customHeightMm : defaultHeight;
  
  const orientation = settings.orientation === 'landscape' ? 'l' : 'p';
  const rawWidth = orientation === 'l' ? Math.max(baseWidthMm, baseHeightMm) : Math.min(baseWidthMm, baseHeightMm);
  const rawHeight = orientation === 'l' ? Math.min(baseWidthMm, baseHeightMm) : Math.max(baseWidthMm, baseHeightMm);

  const bleedMm = settings.bleed === 'none' ? 0 : (settings.bleedMm || (settings.bleed === '3mm' ? 3 : settings.bleed === '5mm' ? 5 : 3.175));
  const finalWidth = rawWidth + (settings.cropMarks ? bleedMm * 2 : 0);
  const finalHeight = rawHeight + (settings.cropMarks ? bleedMm * 2 : 0);

  const isGrayscale = settings.colorMode === 'grayscale' || settings.colorMode === 'black_white';

  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format: [finalWidth, finalHeight],
    compress: settings.compressionLevel ? settings.compressionLevel !== 'small' : true,
  });

  const margins = {
    top: (settings.marginTopMm || 18) + (settings.cropMarks ? bleedMm : 0),
    bottom: (settings.marginBottomMm || 18) + (settings.cropMarks ? bleedMm : 0),
    left: (settings.marginLeftMm || 20) + (settings.cropMarks ? bleedMm : 0),
    right: (settings.marginRightMm || 18) + (settings.cropMarks ? bleedMm : 0),
  };

  const printableWidth = finalWidth - margins.left - margins.right;
  const printableHeight = finalHeight - margins.top - margins.bottom;

  let frontMatterPages = 0;
  let bodyPageNumber = 0;
  let totalRenderedPages = 0;
  const tocEntries: { title: string; subtitle?: string; page: number; chapterNum?: number }[] = [];
  const illustrationEntries: { title: string; page: number }[] = [];

  // Helper to parse hex colors
  const hexToRgb = (hex?: string): [number, number, number] => {
    if (!hex || !hex.startsWith('#') || hex.length < 7) return [100, 116, 139];
    const r = parseInt(hex.slice(1, 3), 16) || 100;
    const g = parseInt(hex.slice(3, 5), 16) || 116;
    const b = parseInt(hex.slice(5, 7), 16) || 139;
    return [r, g, b];
  };

  const getPdfFont = (fontFamily?: string): string => {
    if (!fontFamily) return 'times';
    const f = fontFamily.toLowerCase();
    if (f.includes('courier') || f.includes('mono')) return 'courier';
    if (f.includes('helvetica') || f.includes('arial') || f.includes('inter') || f.includes('sans')) return 'helvetica';
    return 'times';
  };

  // Helper to add headers and footers
  const addPageHeaderFooter = (
    isFrontMatter: boolean,
    num: number,
    chapterTitle?: string,
    isChapterFirstPage?: boolean,
    chapterNum?: number
  ) => {
    if (settings.cropMarks && bleedMm > 0) {
      drawPrinterMarks(doc, finalWidth, finalHeight, bleedMm);
    }

    const hfConfig: ScientificHeaderFooterConfig =
      book.masterStyleProfile?.pageDesign?.headersAndFooters ||
      book.masterStyleProfile?.pageDesign?.headerFooter ||
      (book as any).masterStyle?.pageDesign?.headersAndFooters ||
      DEFAULT_SCIENTIFIC_HEADER_FOOTER;

    if (hfConfig.enabled === false && !settings.headersAndFooters?.showOnChapterOpener) {
      return;
    }

    const evalContext = {
      bookTitle: book.title || 'Book Title',
      author: book.author || 'Author',
      chapterNumber: chapterNum || 1,
      chapterTitle: chapterTitle || 'Chapter',
      pageNumber: num,
      totalPages: Math.max(10, totalRenderedPages + 10),
      doi: hfConfig.doiString || '10.1016/j.esoterica.2026.04.012',
      issn: hfConfig.issnString || 'ISSN 2831-9042',
      isbn: hfConfig.isbnString || 'ISBN 978-0-12-345678-9',
      journalName: hfConfig.journalName || 'Journal of Scientific Literature',
      volumeIssue: hfConfig.volumeIssue || 'Vol. 1, Issue 1 (2026)',
      copyrightNotice: hfConfig.copyrightNotice || 'Open Access under CC-BY 4.0',
      documentClassification: hfConfig.documentClassification || 'PEER-REVIEWED MONOGRAPH'
    };

    const isEven = num % 2 === 0;

    // FRONT MATTER HANDLING
    if (isFrontMatter) {
      if (hfConfig.suppressHeaderOnFrontMatter && num <= 2) return;
      if (hfConfig.frontMatterFolioStyle === 'roman_lower' || settings.frontMatterNumbering === 'roman') {
        const roman = toRomanNumeral(num).toLowerCase();
        doc.setFont(getPdfFont(hfConfig.footerFontFamily), 'normal');
        doc.setFontSize(hfConfig.footerFontSizePt || 8.5);
        const [r, g, b] = hexToRgb(hfConfig.footerTextColor);
        doc.setTextColor(r, g, b);
        doc.text(roman, finalWidth / 2, finalHeight - margins.bottom + (hfConfig.footerOffsetMm || 8), { align: 'center' });
      }
      return;
    }

    // RUNNING TOP HEADER
    const shouldSuppressHeader = isChapterFirstPage && (hfConfig.suppressHeaderOnChapterOpener || !settings.headersAndFooters?.showOnChapterOpener);

    if (!shouldSuppressHeader && num > 1) {
      const headerFont = getPdfFont(hfConfig.headerFontFamily);
      const headerStyle = (hfConfig.headerFontStyle === 'italic' ? 'italic' : hfConfig.headerFontWeight === 'bold' ? 'bold' : 'normal');
      doc.setFont(headerFont, headerStyle);
      doc.setFontSize(hfConfig.headerFontSizePt || 8.5);
      const [hr, hg, hb] = hexToRgb(hfConfig.headerTextColor);
      doc.setTextColor(hr, hg, hb);

      const headerLeftTemplate = isEven ? hfConfig.versoHeaderLeft : hfConfig.rectoHeaderLeft;
      const headerCenterTemplate = isEven ? hfConfig.versoHeaderCenter : hfConfig.rectoHeaderCenter;
      const headerRightTemplate = isEven ? hfConfig.versoHeaderRight : hfConfig.rectoHeaderRight;

      let leftText = evaluateHeaderFooterToken(headerLeftTemplate, evalContext);
      let centerText = evaluateHeaderFooterToken(headerCenterTemplate, evalContext);
      let rightText = evaluateHeaderFooterToken(headerRightTemplate, evalContext);

      if (hfConfig.headerTextTransform === 'uppercase') {
        leftText = leftText.toUpperCase();
        centerText = centerText.toUpperCase();
        rightText = rightText.toUpperCase();
      }

      const headerY = margins.top - (hfConfig.headerOffsetMm || 5);

      if (leftText) {
        doc.text(leftText, margins.left, headerY, { align: 'left' });
      }
      if (centerText) {
        doc.text(centerText, finalWidth / 2, headerY, { align: 'center' });
      }
      if (rightText) {
        doc.text(rightText, finalWidth - margins.right, headerY, { align: 'right' });
      }

      // Draw Separator Rule
      if (hfConfig.headerRuleStyle && hfConfig.headerRuleStyle !== 'none') {
        const [rr, rg, rb] = hexToRgb(hfConfig.headerRuleColor);
        doc.setDrawColor(rr, rg, rb);
        const lineWidth = Math.max(0.1, (hfConfig.headerRuleWidthPt || 0.5) * 0.35);
        doc.setLineWidth(lineWidth);

        const ruleY = margins.top - 2.5;
        if (hfConfig.headerRuleStyle === 'double_rule') {
          doc.line(margins.left, ruleY - 0.7, finalWidth - margins.right, ruleY - 0.7);
          doc.line(margins.left, ruleY, finalWidth - margins.right, ruleY);
        } else {
          doc.line(margins.left, ruleY, finalWidth - margins.right, ruleY);
        }
      }
    }

    // RUNNING BOTTOM FOOTER & FOLIO NUMBER
    const footerFont = getPdfFont(hfConfig.footerFontFamily);
    const footerStyle = (hfConfig.footerFontStyle === 'italic' ? 'italic' : hfConfig.footerFontWeight === 'bold' ? 'bold' : 'normal');
    doc.setFont(footerFont, footerStyle);
    doc.setFontSize(hfConfig.footerFontSizePt || 8);
    const [fr, fg, fb] = hexToRgb(hfConfig.footerTextColor);
    doc.setTextColor(fr, fg, fb);

    const formattedFolio = formatFolioNumber(
      num,
      hfConfig.folioStyle,
      evalContext.totalPages,
      evalContext.chapterNumber,
      isEven
    );

    const footerLeftTemplate = isEven ? hfConfig.versoFooterLeft : hfConfig.rectoFooterLeft;
    const footerCenterTemplate = isEven ? hfConfig.versoFooterCenter : hfConfig.rectoFooterCenter;
    const footerRightTemplate = isEven ? hfConfig.versoFooterRight : hfConfig.rectoFooterRight;

    let fLeft = evaluateHeaderFooterToken(footerLeftTemplate, { ...evalContext, pageNumber: formattedFolio as any });
    let fCenter = evaluateHeaderFooterToken(footerCenterTemplate, { ...evalContext, pageNumber: formattedFolio as any });
    let fRight = evaluateHeaderFooterToken(footerRightTemplate, { ...evalContext, pageNumber: formattedFolio as any });

    if (hfConfig.footerTextTransform === 'uppercase') {
      fLeft = fLeft.toUpperCase();
      fCenter = fCenter.toUpperCase();
      fRight = fRight.toUpperCase();
    }

    const footerY = finalHeight - margins.bottom + (hfConfig.footerOffsetMm || 7);

    // Fallback if footer templates are empty
    if (!fLeft && !fCenter && !fRight) {
      if (settings.pageNumbering === 'bottom_outside') {
        const posX = isEven ? margins.left : finalWidth - margins.right;
        doc.text(formattedFolio, posX, footerY, { align: isEven ? 'left' : 'right' });
      } else {
        doc.text(formattedFolio, finalWidth / 2, footerY, { align: 'center' });
      }
    } else {
      if (fLeft) doc.text(fLeft, margins.left, footerY, { align: 'left' });
      if (fCenter) doc.text(fCenter, finalWidth / 2, footerY, { align: 'center' });
      if (fRight) doc.text(fRight, finalWidth - margins.right, footerY, { align: 'right' });
    }

    // Footer Rule
    if (hfConfig.footerRuleStyle && hfConfig.footerRuleStyle !== 'none') {
      const [frr, frg, frb] = hexToRgb(hfConfig.footerRuleColor);
      doc.setDrawColor(frr, frg, frb);
      const fLineWidth = Math.max(0.1, (hfConfig.footerRuleWidthPt || 0.5) * 0.35);
      doc.setLineWidth(fLineWidth);
      const fRuleY = finalHeight - margins.bottom + 2.5;
      doc.line(margins.left, fRuleY, finalWidth - margins.right, fRuleY);
    }
  };

  // -------------------------------------------------------------
  // 1. FRONT COVER
  // -------------------------------------------------------------
  if (settings.includeCover && book.cover) {
    updateProgress('Rendering Front Cover & Typography...', 10);
    totalRenderedPages++;

    // Background color based on cover theme
    const theme = book.cover.theme || 'editorial';
    if (theme === 'dark_fantasy' || theme === 'cinematic') {
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, finalWidth, finalHeight, 'F');
      doc.setTextColor(255, 255, 255);
    } else if (theme === 'vintage') {
      doc.setFillColor(253, 248, 237); // parchment
      doc.rect(0, 0, finalWidth, finalHeight, 'F');
      doc.setTextColor(55, 40, 20);
    } else if (theme === 'comic') {
      doc.setFillColor(254, 240, 138); // yellow-200
      doc.rect(0, 0, finalWidth, finalHeight, 'F');
      doc.setTextColor(15, 23, 42);
    } else {
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, finalWidth, finalHeight, 'F');
      doc.setTextColor(17, 24, 39);
    }

    // Cover Image if provided
    if (book.cover.coverImageUrl) {
      const coverImg = await getLoadedImageData(book.cover.coverImageUrl, isGrayscale);
      if (coverImg) {
        const coverImgH = finalHeight * 0.48;
        const coverImgW = finalWidth - margins.left * 1.5;
        const coverImgX = (finalWidth - coverImgW) / 2;
        const coverImgY = margins.top + 28;
        try {
          doc.addImage(coverImg.dataUrl, 'JPEG', coverImgX, coverImgY, coverImgW, coverImgH, undefined, 'FAST');
        } catch (e) {
          console.warn('Cover image render error:', e);
        }
      }
    }

    // Series / Volume Banner
    if (book.cover.seriesTitle || book.volume) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      const seriesText = (book.cover.seriesTitle ? `${book.cover.seriesTitle.toUpperCase()} • ` : '') + `VOLUME ${book.volume || 1}`;
      doc.text(seriesText, finalWidth / 2, margins.top + 12, { align: 'center' });
    }

    // Main Cover Title
    doc.setFont('times', 'bold');
    doc.setFontSize(26);
    const titleLines = doc.splitTextToSize((book.cover.title || book.title).toUpperCase(), printableWidth);
    doc.text(titleLines, finalWidth / 2, margins.top + 22, { align: 'center' });

    // Subtitle
    if (book.cover.subtitle || book.subtitle) {
      doc.setFont('times', 'italic');
      doc.setFontSize(13);
      const subLines = doc.splitTextToSize(book.cover.subtitle || book.subtitle || '', printableWidth);
      doc.text(subLines, finalWidth / 2, margins.top + 24 + titleLines.length * 9, { align: 'center' });
    }

    // Author & Illustrator at Bottom
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text(`BY ${book.cover.author || book.author || 'AUTHOR'}`, finalWidth / 2, finalHeight - margins.bottom - 12, { align: 'center' });

    if (book.cover.illustrator) {
      doc.setFontSize(9);
      doc.text(`ILLUSTRATED BY ${book.cover.illustrator}`, finalWidth / 2, finalHeight - margins.bottom - 6, { align: 'center' });
    }
  }

  // -------------------------------------------------------------
  // 2. FRONT MATTER
  // -------------------------------------------------------------
  updateProgress('Assembling Front Matter & Table of Contents...', 20);

  // 2A. Half Title Page
  if (book.frontMatter?.halfTitle) {
    doc.addPage([finalWidth, finalHeight], orientation);
    frontMatterPages++;
    totalRenderedPages++;
    addPageHeaderFooter(true, frontMatterPages);

    doc.setFont('times', 'normal');
    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59);
    doc.text(book.title.toUpperCase(), finalWidth / 2, finalHeight * 0.38, { align: 'center' });
  }

  // 2B. Full Title Page
  if (book.frontMatter?.titlePage !== false) {
    doc.addPage([finalWidth, finalHeight], orientation);
    frontMatterPages++;
    totalRenderedPages++;
    addPageHeaderFooter(true, frontMatterPages);

    let titleCursor = finalHeight * 0.28;
    doc.setFont('times', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(17, 24, 39);
    const mainTitle = doc.splitTextToSize(book.title.toUpperCase(), printableWidth);
    doc.text(mainTitle, finalWidth / 2, titleCursor, { align: 'center' });
    titleCursor += mainTitle.length * 9 + 4;

    if (book.subtitle) {
      doc.setFont('times', 'italic');
      doc.setFontSize(13);
      doc.setTextColor(75, 85, 99);
      const subLines = doc.splitTextToSize(book.subtitle, printableWidth);
      doc.text(subLines, finalWidth / 2, titleCursor, { align: 'center' });
      titleCursor += subLines.length * 6 + 10;
    }

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(finalWidth * 0.4, titleCursor, finalWidth * 0.6, titleCursor);
    titleCursor += 16;

    doc.setFont('times', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(30, 41, 59);
    doc.text(book.author || 'Author', finalWidth / 2, titleCursor, { align: 'center' });

    // Publisher at Bottom
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    const pubName = book.frontMatter?.publisherName || 'StoryForge Studio Press';
    doc.text(pubName.toUpperCase(), finalWidth / 2, finalHeight - margins.bottom - 10, { align: 'center' });
    doc.text(`VOLUME ${book.volume || 1} • FIRST EDITION`, finalWidth / 2, finalHeight - margins.bottom - 5, { align: 'center' });
  }

  // 2C. Copyright Page
  if (book.frontMatter?.copyrightPage) {
    doc.addPage([finalWidth, finalHeight], orientation);
    frontMatterPages++;
    totalRenderedPages++;
    addPageHeaderFooter(true, frontMatterPages);

    let copyCursor = finalHeight * 0.45;
    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);

    const year = book.frontMatter?.copyrightYear || `${new Date().getFullYear()}`;
    const publisher = book.frontMatter?.publisherName || 'StoryForge Studio Press';
    const copyLines = [
      `${book.title} (Volume ${book.volume || 1})`,
      `Copyright © ${year} by ${book.author}. All rights reserved.`,
      '',
      `Published by ${publisher}`,
      'No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews.',
      '',
      book.frontMatter?.isbn ? `ISBN: ${book.frontMatter.isbn}` : 'ISBN-13: 978-1-954820-00-1 (Hardcover / Print)',
      book.frontMatter?.digitalIsbn ? `Digital ISBN: ${book.frontMatter.digitalIsbn}` : 'ISBN-13: 978-1-954820-01-8 (Digital Edition)',
      '',
      book.frontMatter?.aiDisclosure ? `AI Assistance Disclosure: ${book.frontMatter.aiDisclosure}` : 'Engineered with StoryForge Visual Reference & Continuous Memory Architecture.',
      '',
      'Typeset in 11pt Editorial Pro. Printed on archival acid-free paper.',
      'First Printing Edition, 2026',
    ];

    for (const line of copyLines) {
      if (line === '') {
        copyCursor += 3;
      } else {
        const split = doc.splitTextToSize(line, printableWidth * 0.9);
        doc.text(split, margins.left, copyCursor);
        copyCursor += split.length * 4;
      }
    }
  }

  // 2D. Dedication & Epigraph
  if (book.frontMatter?.dedication || book.frontMatter?.epigraph) {
    doc.addPage([finalWidth, finalHeight], orientation);
    frontMatterPages++;
    totalRenderedPages++;
    addPageHeaderFooter(true, frontMatterPages);

    if (book.frontMatter?.dedication) {
      doc.setFont('times', 'italic');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      const dedLines = doc.splitTextToSize(book.frontMatter.dedication, printableWidth * 0.8);
      doc.text(dedLines, finalWidth / 2, finalHeight * 0.35, { align: 'center' });
    }

    if (book.frontMatter?.epigraph) {
      const epY = book.frontMatter?.dedication ? finalHeight * 0.6 : finalHeight * 0.4;
      doc.setFont('times', 'italic');
      doc.setFontSize(10.5);
      doc.setTextColor(55, 65, 81);
      const epiLines = doc.splitTextToSize(`"${book.frontMatter.epigraph}"`, printableWidth * 0.75);
      doc.text(epiLines, finalWidth / 2, epY, { align: 'center' });
    }
  }

  // -------------------------------------------------------------
  // 3. MAIN BODY & CHAPTERS
  // -------------------------------------------------------------
  updateProgress('Rendering manuscript chapters, illustrations & layouts...', 45);

  const filteredChapters = settings.scope === 'current_chapter' && settings.selectedChapterId
    ? book.chapters.filter(ch => ch.id === settings.selectedChapterId)
    : book.chapters;

  for (let chIdx = 0; chIdx < filteredChapters.length; chIdx++) {
    const chapter = filteredChapters[chIdx];
    const chProgress = 45 + Math.round((chIdx / filteredChapters.length) * 40);
    updateProgress(`Composing Chapter ${chapter.number}: ${chapter.title}...`, chProgress);

    // Each Chapter starts on a fresh page
    doc.addPage([finalWidth, finalHeight], orientation);
    bodyPageNumber++;
    totalRenderedPages++;

    // Record for Table of Contents
    tocEntries.push({
      title: `Chapter ${chapter.number}: ${chapter.title}`,
      subtitle: chapter.subtitle,
      page: bodyPageNumber,
      chapterNum: chapter.number,
    });

    let cursorY = margins.top + 10;

    // Chapter Number
    if (settings.chapterNumbering !== false) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(180, 83, 9); // amber tone
      doc.text(`CHAPTER ${chapter.number}`, finalWidth / 2, cursorY, { align: 'center' });
      cursorY += 7;
    }

    // Chapter Title
    doc.setFont('times', 'bold');
    doc.setFontSize(19);
    doc.setTextColor(17, 24, 39);
    const chTitleLines = doc.splitTextToSize(chapter.title.toUpperCase(), printableWidth);
    doc.text(chTitleLines, finalWidth / 2, cursorY, { align: 'center' });
    cursorY += chTitleLines.length * 8 + 4;

    // Decorative rule
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(finalWidth * 0.4, cursorY, finalWidth * 0.6, cursorY);
    cursorY += 10;

    addPageHeaderFooter(false, bodyPageNumber, `Chapter ${chapter.number}: ${chapter.title}`, true);

    // Render scenes & elements inside the chapter
    for (const scene of chapter.scenes) {
      for (const page of scene.pages) {
        for (const element of page.elements) {
          // Check page break needed
          if (cursorY > finalHeight - margins.bottom - 15) {
            doc.addPage([finalWidth, finalHeight], orientation);
            bodyPageNumber++;
            totalRenderedPages++;
            cursorY = margins.top;
            addPageHeaderFooter(false, bodyPageNumber, `Chapter ${chapter.number}: ${chapter.title}`);
          }

          // 1. Heading Element
          if (element.type === 'heading') {
            doc.setFont('times', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(17, 24, 39);
            cursorY += 4;
            const hLines = doc.splitTextToSize(element.content, printableWidth);
            doc.text(hLines, margins.left, cursorY);
            cursorY += hLines.length * 6 + 3;
          }

          // 2. Paragraph Element
          else if (element.type === 'paragraph') {
            doc.setFont('times', 'normal');
            doc.setFontSize(book.typography?.bodyText?.sizePt || 11);
            doc.setTextColor(31, 41, 55);

            const pLines = doc.splitTextToSize(element.content, printableWidth);
            for (let li = 0; li < pLines.length; li++) {
              if (cursorY > finalHeight - margins.bottom - 8) {
                doc.addPage([finalWidth, finalHeight], orientation);
                bodyPageNumber++;
                totalRenderedPages++;
                cursorY = margins.top;
                addPageHeaderFooter(false, bodyPageNumber, `Chapter ${chapter.number}: ${chapter.title}`);
                doc.setFont('times', 'normal');
                doc.setFontSize(book.typography?.bodyText?.sizePt || 11);
                doc.setTextColor(31, 41, 55);
              }
              const indent = li === 0 ? (book.typography?.paragraphIndent || 4) : 0;
              doc.text(pLines[li], margins.left + indent, cursorY);
              cursorY += 5.2;
            }
            cursorY += (book.typography?.paragraphSpacing || 3);
          }

          // 3. Dialogue Element
          else if (element.type === 'dialogue') {
            doc.setFont('times', 'normal');
            doc.setFontSize(book.typography?.dialogue?.sizePt || 11);
            doc.setTextColor(17, 24, 39);

            const speakerPrefix = element.speaker ? `${element.speaker.toUpperCase()}: ` : '';
            const dialogueText = `${speakerPrefix}"${element.content}"`;
            const dLines = doc.splitTextToSize(dialogueText, printableWidth - 4);

            for (const line of dLines) {
              if (cursorY > finalHeight - margins.bottom - 8) {
                doc.addPage([finalWidth, finalHeight], orientation);
                bodyPageNumber++;
                totalRenderedPages++;
                cursorY = margins.top;
                addPageHeaderFooter(false, bodyPageNumber, `Chapter ${chapter.number}: ${chapter.title}`);
                doc.setFont('times', 'normal');
                doc.setFontSize(book.typography?.dialogue?.sizePt || 11);
                doc.setTextColor(17, 24, 39);
              }
              doc.text(line, margins.left + 4, cursorY);
              cursorY += 5.2;
            }
            cursorY += 2;
          }

          // 4. Illustration Element
          else if (element.type === 'illustration' && element.imageUrl) {
            const imgData = await getLoadedImageData(element.imageUrl, isGrayscale);
            if (imgData) {
              const maxImgWidth = printableWidth;
              const maxImgHeight = printableHeight * 0.45;
              const aspect = imgData.width / imgData.height;
              let targetW = maxImgWidth;
              let targetH = targetW / aspect;

              if (targetH > maxImgHeight) {
                targetH = maxImgHeight;
                targetW = targetH * aspect;
              }

              if (cursorY + targetH > finalHeight - margins.bottom - 10) {
                doc.addPage([finalWidth, finalHeight], orientation);
                bodyPageNumber++;
                totalRenderedPages++;
                cursorY = margins.top;
                addPageHeaderFooter(false, bodyPageNumber, `Chapter ${chapter.number}: ${chapter.title}`);
              }

              const imgX = margins.left + (printableWidth - targetW) / 2;
              try {
                doc.addImage(imgData.dataUrl, 'JPEG', imgX, cursorY, targetW, targetH, undefined, 'FAST');
                doc.setDrawColor(210, 210, 210);
                doc.setLineWidth(0.2);
                doc.rect(imgX, cursorY, targetW, targetH);
                cursorY += targetH + 3;

                // Track illustration for List of Illustrations
                illustrationEntries.push({
                  title: element.content || `Figure in Chapter ${chapter.number}`,
                  page: bodyPageNumber,
                });

                // Caption if exists
                if (element.content) {
                  doc.setFont('times', 'italic');
                  doc.setFontSize(8.5);
                  doc.setTextColor(100, 100, 100);
                  const capLines = doc.splitTextToSize(element.content, targetW);
                  doc.text(capLines, finalWidth / 2, cursorY, { align: 'center' });
                  cursorY += capLines.length * 4 + 4;
                }
              } catch (e) {
                console.warn('Illustration rendering error in PDF:', e);
              }
            }
          }

          // 5. Exercise / Callout Box Element
          else if (element.type === 'exercise_box' || element.calloutType) {
            cursorY += 3;
            const boxPadding = 4;
            const contentWidth = printableWidth - boxPadding * 2;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9.5);
            const boxLines = doc.splitTextToSize(element.content, contentWidth);
            const boxHeight = boxLines.length * 4.8 + boxPadding * 2 + 6;

            if (cursorY + boxHeight > finalHeight - margins.bottom) {
              doc.addPage([finalWidth, finalHeight], orientation);
              bodyPageNumber++;
              totalRenderedPages++;
              cursorY = margins.top;
              addPageHeaderFooter(false, bodyPageNumber, `Chapter ${chapter.number}: ${chapter.title}`);
            }

            // Shaded Callout Box
            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(203, 213, 225);
            doc.setLineWidth(0.4);
            doc.roundedRect(margins.left, cursorY, printableWidth, boxHeight, 2, 2, 'FD');

            // Badge Header
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5);
            doc.setTextColor(2, 132, 199);
            const label = element.calloutType ? element.calloutType.toUpperCase() : 'EXERCISE / CRAFT NOTE';
            doc.text(label, margins.left + boxPadding, cursorY + boxPadding + 3);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(51, 65, 85);
            doc.text(boxLines, margins.left + boxPadding, cursorY + boxPadding + 8);

            cursorY += boxHeight + 4;
          }

          // 6. Scene Break Divider
          else if (element.type === 'scene_break') {
            cursorY += 4;
            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            doc.setTextColor(150, 150, 150);
            doc.text('*   *   *', finalWidth / 2, cursorY, { align: 'center' });
            cursorY += 8;
          }
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 4. END MATTER
  // -------------------------------------------------------------
  updateProgress('Rendering End Matter, Index & Author Bio...', 90);

  if (book.endMatter?.aboutAuthor || book.endMatter?.acknowledgments || (book.endMatter?.index && book.endMatter.index.length > 0)) {
    doc.addPage([finalWidth, finalHeight], orientation);
    bodyPageNumber++;
    totalRenderedPages++;
    addPageHeaderFooter(false, bodyPageNumber, 'END MATTER');
    let endCursorY = margins.top + 10;

    // Index
    if (book.endMatter?.index && book.endMatter.index.length > 0) {
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(17, 24, 39);
      doc.text('INDEX', margins.left, endCursorY);
      endCursorY += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(55, 65, 81);

      const colWidth = printableWidth / 2 - 4;
      book.endMatter.index.forEach((item, idx) => {
        const col = idx % 2;
        const xPos = margins.left + col * (colWidth + 8);
        const yPos = endCursorY + Math.floor(idx / 2) * 5;
        if (yPos < finalHeight - margins.bottom - 10) {
          doc.text(`${item.term} .... ${item.pages.join(', ')}`, xPos, yPos);
        }
      });
      endCursorY += Math.ceil(book.endMatter.index.length / 2) * 5 + 10;
    }

    // About Author
    if (book.endMatter?.aboutAuthor) {
      if (endCursorY > finalHeight - margins.bottom - 40) {
        doc.addPage([finalWidth, finalHeight], orientation);
        bodyPageNumber++;
        totalRenderedPages++;
        endCursorY = margins.top + 10;
      }
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(17, 24, 39);
      doc.text('ABOUT THE AUTHOR', margins.left, endCursorY);
      endCursorY += 7;

      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);
      const bioLines = doc.splitTextToSize(book.endMatter.aboutAuthor, printableWidth);
      doc.text(bioLines, margins.left, endCursorY);
      endCursorY += bioLines.length * 5 + 10;
    }

    // Acknowledgments
    if (book.endMatter?.acknowledgments) {
      if (endCursorY > finalHeight - margins.bottom - 30) {
        doc.addPage([finalWidth, finalHeight], orientation);
        bodyPageNumber++;
        totalRenderedPages++;
        endCursorY = margins.top + 10;
      }
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(17, 24, 39);
      doc.text('ACKNOWLEDGMENTS', margins.left, endCursorY);
      endCursorY += 7;

      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);
      const ackLines = doc.splitTextToSize(book.endMatter.acknowledgments, printableWidth);
      doc.text(ackLines, margins.left, endCursorY);
    }
  }

  // -------------------------------------------------------------
  // 5. BACK COVER
  // -------------------------------------------------------------
  if (settings.includeCover && book.cover?.backCover) {
    updateProgress('Rendering Back Cover...', 95);
    doc.addPage([finalWidth, finalHeight], orientation);
    totalRenderedPages++;

    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, finalWidth, finalHeight, 'F');

    let backCursor = margins.top + 15;

    // Headline / Synopsis
    if (book.cover.backCover.synopsis) {
      doc.setFont('times', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      const synLines = doc.splitTextToSize(book.cover.backCover.synopsis, printableWidth * 0.9);
      doc.text(synLines, finalWidth / 2, backCursor, { align: 'center' });
      backCursor += synLines.length * 6 + 12;
    }

    // Author Bio on back
    if (book.cover.backCover.authorBio) {
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      const backBio = doc.splitTextToSize(book.cover.backCover.authorBio, printableWidth * 0.85);
      doc.text(backBio, finalWidth / 2, backCursor, { align: 'center' });
      backCursor += backBio.length * 5 + 15;
    }

    // Barcode / ISBN placeholder box
    const barcodeW = 45;
    const barcodeH = 22;
    const barcodeX = (finalWidth - barcodeW) / 2;
    const barcodeY = finalHeight - margins.bottom - barcodeH - 5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(200, 200, 200);
    doc.rect(barcodeX, barcodeY, barcodeW, barcodeH, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text('ISBN 978-1-95482-000-1', barcodeX + 4, barcodeY + 5);
    doc.text('||| | |||| ||| ||||| || ||||', barcodeX + 6, barcodeY + 12);
    doc.text('StoryForge Publishing', barcodeX + 6, barcodeY + 18);
  }

  updateProgress('Creating final PDF package...', 98);
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);

  const rawFilename = settings.filename || `${book.author}_${book.title}_Volume${book.volume || 1}`;
  const safeFilename = `${sanitizeFilename(rawFilename)}.pdf`;

  updateProgress('PDF READY', 100);

  return {
    blob: pdfBlob,
    url: blobUrl,
    filename: safeFilename,
  };
}
