import { TypographyPreset, TypographySettings, FontConfig } from "../types";

export interface FontOption {
  name: string;
  category: 'serif' | 'sans-serif' | 'display' | 'monospace' | 'handwriting';
  source: 'google' | 'system' | 'custom';
  weights: number[];
}

export const POPULAR_FONTS: FontOption[] = [
  // Serif
  { name: 'Cinzel', category: 'display', source: 'google', weights: [400, 600, 700, 900] },
  { name: 'Playfair Display', category: 'serif', source: 'google', weights: [400, 600, 700, 900] },
  { name: 'Cormorant Garamond', category: 'serif', source: 'google', weights: [400, 600, 700] },
  { name: 'EB Garamond', category: 'serif', source: 'google', weights: [400, 600, 700] },
  { name: 'Merriweather', category: 'serif', source: 'google', weights: [300, 400, 700] },
  { name: 'Lora', category: 'serif', source: 'google', weights: [400, 600, 700] },
  { name: 'Crimson Pro', category: 'serif', source: 'google', weights: [400, 600, 700] },
  { name: 'Newsreader', category: 'serif', source: 'google', weights: [400, 600, 700] },
  
  // Sans-Serif
  { name: 'Plus Jakarta Sans', category: 'sans-serif', source: 'google', weights: [400, 500, 600, 700] },
  { name: 'Space Grotesk', category: 'sans-serif', source: 'google', weights: [400, 500, 600, 700] },
  { name: 'Oswald', category: 'display', source: 'google', weights: [400, 600, 700] },
  { name: 'Bangers', category: 'display', source: 'google', weights: [400] },
  { name: 'Roboto Mono', category: 'monospace', source: 'google', weights: [400, 500, 700] },

  // System standard fonts
  { name: 'Georgia', category: 'serif', source: 'system', weights: [400, 700] },
  { name: 'Garamond', category: 'serif', source: 'system', weights: [400, 700] },
  { name: 'Baskerville', category: 'serif', source: 'system', weights: [400, 700] },
  { name: 'Palatino', category: 'serif', source: 'system', weights: [400, 700] },
  { name: 'Times New Roman', category: 'serif', source: 'system', weights: [400, 700] },
  { name: 'Arial', category: 'sans-serif', source: 'system', weights: [400, 700] },
  { name: 'Verdana', category: 'sans-serif', source: 'system', weights: [400, 700] },
  { name: 'Trebuchet MS', category: 'sans-serif', source: 'system', weights: [400, 700] },
  { name: 'Courier New', category: 'monospace', source: 'system', weights: [400, 700] },
  { name: 'Impact', category: 'display', source: 'system', weights: [400] },
];

/**
 * Detect available system fonts in browser
 */
export async function detectSystemFonts(): Promise<string[]> {
  const detected: string[] = [];

  // Check Local Font Access API if supported
  if ('queryLocalFonts' in window && typeof (window as any).queryLocalFonts === 'function') {
    try {
      const fonts = await (window as any).queryLocalFonts();
      const uniqueNames = Array.from(new Set(fonts.map((f: any) => f.family))) as string[];
      return uniqueNames;
    } catch (e) {
      console.log('User denied or browser restricted queryLocalFonts access:', e);
    }
  }

  // Fallback: Canvas metric comparison against known native fonts
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testString = 'mmmmmmmmmmlli12345';
  const testSize = '72px';

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return detected;

  const baseWidths: Record<string, number> = {};
  for (const base of baseFonts) {
    context.font = `${testSize} ${base}`;
    baseWidths[base] = context.measureText(testString).width;
  }

  const testList = [
    'Georgia', 'Garamond', 'Baskerville', 'Palatino', 'Palatino Linotype',
    'Book Antiqua', 'Times New Roman', 'Arial', 'Verdana', 'Trebuchet MS',
    'Lucida Sans', 'Courier New', 'Impact', 'Comic Sans MS', 'Futura',
    'Optima', 'Didot', 'American Typewriter', 'Gill Sans', 'Calibri', 'Cambria'
  ];

  for (const font of testList) {
    let matched = false;
    for (const base of baseFonts) {
      context.font = `${testSize} "${font}", ${base}`;
      const width = context.measureText(testString).width;
      if (width !== baseWidths[base]) {
        matched = true;
        break;
      }
    }
    if (matched) {
      detected.push(font);
    }
  }

  return detected;
}

export const TYPOGRAPHY_PRESETS: Record<TypographyPreset, TypographySettings> = {
  literary: {
    preset: 'literary',
    bookTitle: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 700, sizePt: 32, lineHeight: 1.2, letterSpacing: 0.05, textTransform: 'uppercase', color: '#111827' },
    subtitle: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 16, lineHeight: 1.3, letterSpacing: 0.02, textTransform: 'none', color: '#4b5563' },
    chapterHeadings: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 600, sizePt: 22, lineHeight: 1.3, letterSpacing: 0.04, textTransform: 'uppercase', color: '#111827' },
    sectionHeadings: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 600, sizePt: 16, lineHeight: 1.4, letterSpacing: 0.02, textTransform: 'none', color: '#1f2937' },
    bodyText: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11.5, lineHeight: 1.65, letterSpacing: 0.01, textTransform: 'none', color: '#1f2937' },
    dialogue: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11.5, lineHeight: 1.65, letterSpacing: 0.01, textTransform: 'none', color: '#111827' },
    captions: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 9.5, lineHeight: 1.4, letterSpacing: 0.02, textTransform: 'none', color: '#6b7280' },
    footnotes: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 8.5, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#6b7280' },
    pageNumbers: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 9, lineHeight: 1.0, letterSpacing: 0.05, textTransform: 'none', color: '#9ca3af' },
    exercises: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 10.5, lineHeight: 1.5, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    callouts: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 10, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    comicSpeechBubbles: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    paragraphIndent: 5.0,
    paragraphSpacing: 4.0,
    dropCaps: true,
  },
  modern: {
    preset: 'modern',
    bookTitle: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 30, lineHeight: 1.15, letterSpacing: -0.02, textTransform: 'none', color: '#09090b' },
    subtitle: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 15, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#52525b' },
    chapterHeadings: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 20, lineHeight: 1.25, letterSpacing: -0.01, textTransform: 'none', color: '#09090b' },
    sectionHeadings: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 15, lineHeight: 1.35, letterSpacing: 0, textTransform: 'none', color: '#18181b' },
    bodyText: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 10.5, lineHeight: 1.6, letterSpacing: 0, textTransform: 'none', color: '#27272a' },
    dialogue: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 10.5, lineHeight: 1.6, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    captions: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 9, lineHeight: 1.35, letterSpacing: 0.01, textTransform: 'none', color: '#71717a' },
    footnotes: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 8, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#71717a' },
    pageNumbers: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 9, lineHeight: 1.0, letterSpacing: 0.02, textTransform: 'none', color: '#a1a1aa' },
    exercises: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 10, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#18181b' },
    callouts: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 9.5, lineHeight: 1.4, letterSpacing: 0, textTransform: 'none', color: '#18181b' },
    comicSpeechBubbles: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 9.5, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    paragraphIndent: 0,
    paragraphSpacing: 6.0,
    dropCaps: false,
  },
  magazine: {
    preset: 'magazine',
    bookTitle: { family: 'Oswald', fallback: 'Impact', generic: 'display', weight: 700, sizePt: 36, lineHeight: 1.1, letterSpacing: 0.02, textTransform: 'uppercase', color: '#0f172a' },
    subtitle: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 15, lineHeight: 1.3, letterSpacing: 0.01, textTransform: 'none', color: '#475569' },
    chapterHeadings: { family: 'Oswald', fallback: 'Impact', generic: 'display', weight: 600, sizePt: 24, lineHeight: 1.2, letterSpacing: 0.02, textTransform: 'uppercase', color: '#0f172a' },
    sectionHeadings: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 14, lineHeight: 1.3, letterSpacing: 0.02, textTransform: 'uppercase', color: '#0f172a' },
    bodyText: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11, lineHeight: 1.6, letterSpacing: 0, textTransform: 'none', color: '#334155' },
    dialogue: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11, lineHeight: 1.6, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    captions: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 9, lineHeight: 1.3, letterSpacing: 0.02, textTransform: 'none', color: '#64748b' },
    footnotes: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 8.5, lineHeight: 1.25, letterSpacing: 0, textTransform: 'none', color: '#64748b' },
    pageNumbers: { family: 'Oswald', fallback: 'Impact', generic: 'display', weight: 400, sizePt: 10, lineHeight: 1.0, letterSpacing: 0.04, textTransform: 'none', color: '#94a3b8' },
    exercises: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10.5, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    callouts: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 9.5, lineHeight: 1.4, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    comicSpeechBubbles: { family: 'Oswald', fallback: 'Arial', generic: 'display', weight: 600, sizePt: 10, lineHeight: 1.2, letterSpacing: 0.02, textTransform: 'uppercase', color: '#09090b' },
    paragraphIndent: 4.0,
    paragraphSpacing: 4.5,
    dropCaps: true,
  },
  comic: {
    preset: 'comic',
    bookTitle: { family: 'Bangers', fallback: 'Impact', generic: 'display', weight: 400, sizePt: 38, lineHeight: 1.05, letterSpacing: 0.05, textTransform: 'uppercase', color: '#dc2626' },
    subtitle: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 16, lineHeight: 1.2, letterSpacing: 0.03, textTransform: 'uppercase', color: '#1e293b' },
    chapterHeadings: { family: 'Bangers', fallback: 'Impact', generic: 'display', weight: 400, sizePt: 28, lineHeight: 1.1, letterSpacing: 0.04, textTransform: 'uppercase', color: '#0f172a' },
    sectionHeadings: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 16, lineHeight: 1.2, letterSpacing: 0.02, textTransform: 'uppercase', color: '#0f172a' },
    bodyText: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 10.5, lineHeight: 1.5, letterSpacing: 0, textTransform: 'none', color: '#18181b' },
    dialogue: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 11, lineHeight: 1.35, letterSpacing: 0.01, textTransform: 'none', color: '#09090b' },
    captions: { family: 'Bangers', fallback: 'Impact', generic: 'display', weight: 400, sizePt: 12, lineHeight: 1.2, letterSpacing: 0.03, textTransform: 'uppercase', color: '#d97706' },
    footnotes: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 8, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#71717a' },
    pageNumbers: { family: 'Bangers', fallback: 'Impact', generic: 'display', weight: 400, sizePt: 12, lineHeight: 1.0, letterSpacing: 0.05, textTransform: 'none', color: '#64748b' },
    exercises: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10, lineHeight: 1.4, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    callouts: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10, lineHeight: 1.35, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    comicSpeechBubbles: { family: 'Bangers', fallback: 'Impact', generic: 'display', weight: 400, sizePt: 13, lineHeight: 1.15, letterSpacing: 0.03, textTransform: 'uppercase', color: '#09090b' },
    paragraphIndent: 0,
    paragraphSpacing: 5.0,
    dropCaps: false,
  },
  academic: {
    preset: 'academic',
    bookTitle: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 700, sizePt: 28, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#111827' },
    subtitle: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 400, sizePt: 14, lineHeight: 1.35, letterSpacing: 0, textTransform: 'none', color: '#4b5563' },
    chapterHeadings: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 700, sizePt: 18, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#111827' },
    sectionHeadings: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 600, sizePt: 14, lineHeight: 1.35, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    bodyText: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 400, sizePt: 11, lineHeight: 1.7, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    dialogue: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 400, sizePt: 11, lineHeight: 1.7, letterSpacing: 0, textTransform: 'none', color: '#111827' },
    captions: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 400, sizePt: 9, lineHeight: 1.35, letterSpacing: 0, textTransform: 'none', color: '#6b7280' },
    footnotes: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 400, sizePt: 8.5, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#4b5563' },
    pageNumbers: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 400, sizePt: 9, lineHeight: 1.0, letterSpacing: 0, textTransform: 'none', color: '#9ca3af' },
    exercises: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 600, sizePt: 10.5, lineHeight: 1.5, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    callouts: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 400, sizePt: 9.5, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    comicSpeechBubbles: { family: 'Newsreader', fallback: 'Times New Roman', generic: 'serif', weight: 600, sizePt: 9.5, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#111827' },
    paragraphIndent: 6.0,
    paragraphSpacing: 2.0,
    dropCaps: false,
  },
  writing_manual: {
    preset: 'writing_manual',
    bookTitle: { family: 'Playfair Display', fallback: 'Georgia', generic: 'serif', weight: 700, sizePt: 32, lineHeight: 1.2, letterSpacing: -0.01, textTransform: 'none', color: '#09090b' },
    subtitle: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 15, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#4b5563' },
    chapterHeadings: { family: 'Playfair Display', fallback: 'Georgia', generic: 'serif', weight: 700, sizePt: 22, lineHeight: 1.25, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    sectionHeadings: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 15, lineHeight: 1.3, letterSpacing: 0.02, textTransform: 'uppercase', color: '#0284c7' },
    bodyText: { family: 'Merriweather', fallback: 'Georgia', generic: 'serif', weight: 300, sizePt: 10.5, lineHeight: 1.7, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    dialogue: { family: 'Merriweather', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 10.5, lineHeight: 1.7, letterSpacing: 0, textTransform: 'none', color: '#111827' },
    captions: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 9, lineHeight: 1.35, letterSpacing: 0, textTransform: 'none', color: '#6b7280' },
    footnotes: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 8, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#6b7280' },
    pageNumbers: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 9, lineHeight: 1.0, letterSpacing: 0.05, textTransform: 'none', color: '#9ca3af' },
    exercises: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 11, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    callouts: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 9.5, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    comicSpeechBubbles: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    paragraphIndent: 0,
    paragraphSpacing: 5.5,
    dropCaps: true,
  },
  satirical: {
    preset: 'satirical',
    bookTitle: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 900, sizePt: 34, lineHeight: 1.15, letterSpacing: 0.06, textTransform: 'uppercase', color: '#1e1b4b' },
    subtitle: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 15, lineHeight: 1.3, letterSpacing: 0.02, textTransform: 'none', color: '#4338ca' },
    chapterHeadings: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 700, sizePt: 22, lineHeight: 1.25, letterSpacing: 0.04, textTransform: 'uppercase', color: '#1e1b4b' },
    sectionHeadings: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 15, lineHeight: 1.3, letterSpacing: 0.01, textTransform: 'none', color: '#312e81' },
    bodyText: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11, lineHeight: 1.65, letterSpacing: 0, textTransform: 'none', color: '#1e293b' },
    dialogue: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11, lineHeight: 1.65, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    captions: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 9, lineHeight: 1.35, letterSpacing: 0.01, textTransform: 'none', color: '#64748b' },
    footnotes: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 8.5, lineHeight: 1.25, letterSpacing: 0, textTransform: 'none', color: '#64748b' },
    pageNumbers: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 600, sizePt: 9, lineHeight: 1.0, letterSpacing: 0.05, textTransform: 'none', color: '#818cf8' },
    exercises: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10.5, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#1e1b4b' },
    callouts: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 9.5, lineHeight: 1.4, letterSpacing: 0, textTransform: 'none', color: '#1e1b4b' },
    comicSpeechBubbles: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 10, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    paragraphIndent: 4.5,
    paragraphSpacing: 4.5,
    dropCaps: true,
  },
  classic: {
    preset: 'classic',
    bookTitle: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 700, sizePt: 32, lineHeight: 1.2, letterSpacing: 0.05, textTransform: 'uppercase', color: '#111827' },
    subtitle: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 16, lineHeight: 1.3, letterSpacing: 0.02, textTransform: 'none', color: '#4b5563' },
    chapterHeadings: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 600, sizePt: 22, lineHeight: 1.3, letterSpacing: 0.04, textTransform: 'uppercase', color: '#111827' },
    sectionHeadings: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 600, sizePt: 16, lineHeight: 1.4, letterSpacing: 0.02, textTransform: 'none', color: '#1f2937' },
    bodyText: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11.5, lineHeight: 1.65, letterSpacing: 0.01, textTransform: 'none', color: '#1f2937' },
    dialogue: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11.5, lineHeight: 1.65, letterSpacing: 0.01, textTransform: 'none', color: '#111827' },
    captions: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 9.5, lineHeight: 1.4, letterSpacing: 0.02, textTransform: 'none', color: '#6b7280' },
    footnotes: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 8.5, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#6b7280' },
    pageNumbers: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 9, lineHeight: 1.0, letterSpacing: 0.05, textTransform: 'none', color: '#9ca3af' },
    exercises: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 10.5, lineHeight: 1.5, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    callouts: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 10, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    comicSpeechBubbles: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    paragraphIndent: 5.0,
    paragraphSpacing: 4.0,
    dropCaps: true,
  },
  bold: {
    preset: 'bold',
    bookTitle: { family: 'Oswald', fallback: 'Impact', generic: 'display', weight: 700, sizePt: 36, lineHeight: 1.1, letterSpacing: 0.02, textTransform: 'uppercase', color: '#0f172a' },
    subtitle: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 16, lineHeight: 1.3, letterSpacing: 0.01, textTransform: 'none', color: '#334155' },
    chapterHeadings: { family: 'Oswald', fallback: 'Impact', generic: 'display', weight: 600, sizePt: 24, lineHeight: 1.2, letterSpacing: 0.02, textTransform: 'uppercase', color: '#0f172a' },
    sectionHeadings: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 15, lineHeight: 1.3, letterSpacing: 0.01, textTransform: 'none', color: '#0f172a' },
    bodyText: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 11, lineHeight: 1.6, letterSpacing: 0, textTransform: 'none', color: '#1e293b' },
    dialogue: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 11, lineHeight: 1.6, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    captions: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 9.5, lineHeight: 1.35, letterSpacing: 0.01, textTransform: 'none', color: '#64748b' },
    footnotes: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 400, sizePt: 8.5, lineHeight: 1.25, letterSpacing: 0, textTransform: 'none', color: '#64748b' },
    pageNumbers: { family: 'Oswald', fallback: 'Impact', generic: 'display', weight: 600, sizePt: 10, lineHeight: 1.0, letterSpacing: 0.04, textTransform: 'none', color: '#64748b' },
    exercises: { family: 'Space Grotesk', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 11, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    callouts: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10, lineHeight: 1.4, letterSpacing: 0, textTransform: 'none', color: '#0f172a' },
    comicSpeechBubbles: { family: 'Oswald', fallback: 'Arial', generic: 'display', weight: 700, sizePt: 11, lineHeight: 1.2, letterSpacing: 0.02, textTransform: 'uppercase', color: '#09090b' },
    paragraphIndent: 0,
    paragraphSpacing: 6.0,
    dropCaps: false,
  },
  editorial: {
    preset: 'editorial',
    bookTitle: { family: 'Playfair Display', fallback: 'Georgia', generic: 'serif', weight: 800, sizePt: 34, lineHeight: 1.15, letterSpacing: -0.02, textTransform: 'none', color: '#09090b' },
    subtitle: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 15, lineHeight: 1.35, letterSpacing: 0.01, textTransform: 'none', color: '#52525b' },
    chapterHeadings: { family: 'Playfair Display', fallback: 'Georgia', generic: 'serif', weight: 700, sizePt: 22, lineHeight: 1.25, letterSpacing: -0.01, textTransform: 'none', color: '#09090b' },
    sectionHeadings: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 700, sizePt: 14, lineHeight: 1.35, letterSpacing: 0.02, textTransform: 'uppercase', color: '#18181b' },
    bodyText: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11, lineHeight: 1.65, letterSpacing: 0, textTransform: 'none', color: '#27272a' },
    dialogue: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11, lineHeight: 1.65, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    captions: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 9, lineHeight: 1.4, letterSpacing: 0.02, textTransform: 'none', color: '#71717a' },
    footnotes: { family: 'Lora', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 8.5, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#71717a' },
    pageNumbers: { family: 'Playfair Display', fallback: 'Georgia', generic: 'serif', weight: 600, sizePt: 9.5, lineHeight: 1.0, letterSpacing: 0.02, textTransform: 'none', color: '#a1a1aa' },
    exercises: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10.5, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#18181b' },
    callouts: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 9.5, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#18181b' },
    comicSpeechBubbles: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    paragraphIndent: 4.5,
    paragraphSpacing: 4.5,
    dropCaps: true,
  },
  custom: {
    preset: 'custom',
    bookTitle: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 700, sizePt: 32, lineHeight: 1.2, letterSpacing: 0.05, textTransform: 'uppercase', color: '#111827' },
    subtitle: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 16, lineHeight: 1.3, letterSpacing: 0.02, textTransform: 'none', color: '#4b5563' },
    chapterHeadings: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 600, sizePt: 22, lineHeight: 1.3, letterSpacing: 0.04, textTransform: 'uppercase', color: '#111827' },
    sectionHeadings: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 600, sizePt: 16, lineHeight: 1.4, letterSpacing: 0.02, textTransform: 'none', color: '#1f2937' },
    bodyText: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11.5, lineHeight: 1.65, letterSpacing: 0.01, textTransform: 'none', color: '#1f2937' },
    dialogue: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 11.5, lineHeight: 1.65, letterSpacing: 0.01, textTransform: 'none', color: '#111827' },
    captions: { family: 'Cormorant Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 9.5, lineHeight: 1.4, letterSpacing: 0.02, textTransform: 'none', color: '#6b7280' },
    footnotes: { family: 'EB Garamond', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 8.5, lineHeight: 1.3, letterSpacing: 0, textTransform: 'none', color: '#6b7280' },
    pageNumbers: { family: 'Cinzel', fallback: 'Georgia', generic: 'serif', weight: 400, sizePt: 9, lineHeight: 1.0, letterSpacing: 0.05, textTransform: 'none', color: '#9ca3af' },
    exercises: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 10.5, lineHeight: 1.5, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    callouts: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 500, sizePt: 10, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none', color: '#1f2937' },
    comicSpeechBubbles: { family: 'Plus Jakarta Sans', fallback: 'Arial', generic: 'sans-serif', weight: 600, sizePt: 10, lineHeight: 1.2, letterSpacing: 0, textTransform: 'none', color: '#09090b' },
    paragraphIndent: 5.0,
    paragraphSpacing: 4.0,
    dropCaps: true,
  },
};
