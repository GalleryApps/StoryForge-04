import {
  MasterStyleProfile,
  PageElement,
  BookPage,
  Scene,
  Chapter,
  TextHierarchyStyleItem,
  ColorPaletteConfig,
  ArtDirectionConfig,
  ChapterDesignConfig,
  PageDesignSystemConfig,
  CharacterVisualProfile,
  EnvironmentVisualProfile,
  MasterStylePreset,
  StyleApplicationScope
} from '../types';
import { getDefaultMasterStyleProfile, MASTER_STYLE_PRESETS } from '../data/stylePresets';

export interface ResolvedElementStyle {
  fontFamily: string;
  fontSizePt: number;
  fontWeight: string | number;
  lineHeight: number;
  letterSpacing: number;
  textColor: string;
  backgroundColor?: string;
  borderColor?: string;
  isItalic?: boolean;
  isBold?: boolean;
  isSmallCaps?: boolean;
  isUnderline?: boolean;
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  bubbleStyle?: string;
  imageAspect?: string;
  dropCap?: boolean;
}

export const resolveElementStyle = (
  element: PageElement,
  page?: BookPage,
  scene?: Scene,
  chapter?: Chapter,
  masterStyle?: MasterStyleProfile
): ResolvedElementStyle => {
  const profile = masterStyle || getDefaultMasterStyleProfile();
  const typoHierarchy = profile.typographyHierarchy;
  const palette = profile.colorPalette;

  // 1. Determine base style from element type
  let baseItem: TextHierarchyStyleItem = typoHierarchy.body;
  let defaultTextColor = palette.text;
  let defaultBgColor: string | undefined = undefined;
  let defaultBorderColor: string | undefined = undefined;
  let isItalic = false;
  let isBold = false;
  let dropCap = false;

  switch (element.type) {
    case 'heading':
      baseItem = typoHierarchy.h2;
      defaultTextColor = palette.primary;
      break;
    case 'subheading':
      baseItem = typoHierarchy.h3;
      defaultTextColor = palette.accent1;
      break;
    case 'quote':
      baseItem = typoHierarchy.quote;
      defaultTextColor = palette.muted;
      isItalic = true;
      break;
    case 'caption':
      baseItem = typoHierarchy.caption;
      defaultTextColor = palette.muted;
      break;
    case 'dialogue':
      baseItem = typoHierarchy.dialogue;
      defaultTextColor = palette.text;
      break;
    case 'speech_bubble':
      baseItem = typoHierarchy.comicSpeechBubble;
      defaultTextColor = '#000000';
      defaultBgColor = '#ffffff';
      defaultBorderColor = '#000000';
      break;
    case 'exercise_box':
      baseItem = typoHierarchy.exercise;
      defaultTextColor = palette.text;
      defaultBgColor = palette.highlight;
      defaultBorderColor = palette.border;
      break;
    default:
      baseItem = typoHierarchy.body;
      defaultTextColor = palette.text;
      // If first paragraph on chapter page and dropCap is enabled
      if (chapter && profile.chapterDesign.dropCap && page?.elements[0]?.id === element.id) {
        dropCap = true;
      }
      break;
  }

  // 2. Cascade Chapter Overrides
  if (chapter?.chapterStyleOverride?.typography) {
    const chTypo = chapter.chapterStyleOverride.typography as any;
    if (chTypo[element.type] || (element.type === 'paragraph' && chTypo.body)) {
      const match = chTypo[element.type] || chTypo.body;
      baseItem = { ...baseItem, ...match };
    }
  }

  // 3. Cascade Scene Overrides
  if (scene?.sceneStyleOverride?.typography) {
    const scTypo = scene.sceneStyleOverride.typography as any;
    if (scTypo[element.type] || (element.type === 'paragraph' && scTypo.body)) {
      const match = scTypo[element.type] || scTypo.body;
      baseItem = { ...baseItem, ...match };
    }
  }

  // 4. Cascade Page Overrides
  if (page?.pageStyleOverride?.typography) {
    const pgTypo = page.pageStyleOverride.typography as any;
    if (pgTypo[element.type] || (element.type === 'paragraph' && pgTypo.body)) {
      const match = pgTypo[element.type] || pgTypo.body;
      baseItem = { ...baseItem, ...match };
    }
  }

  // 5. Element Level Direct Override (Absolute Priority)
  const elOverride = element.styleOverride;

  return {
    fontFamily: elOverride?.fontFamily || baseItem.family,
    fontSizePt: elOverride?.fontSizePt || baseItem.sizePt,
    fontWeight: elOverride?.fontWeight || baseItem.weight,
    lineHeight: baseItem.lineHeight,
    letterSpacing: baseItem.letterSpacing,
    textColor: elOverride?.textColor || baseItem.color || defaultTextColor,
    backgroundColor: elOverride?.backgroundColor || defaultBgColor,
    borderColor: elOverride?.borderColor || defaultBorderColor,
    isItalic: elOverride ? undefined : (baseItem.isItalic || isItalic),
    isBold: elOverride ? undefined : (baseItem.isBold || isBold),
    isSmallCaps: baseItem.isSmallCaps,
    isUnderline: baseItem.isUnderline,
    textTransform: baseItem.textTransform,
    bubbleStyle: elOverride?.bubbleStyle || element.bubbleStyle || profile.comicVisualLanguage.speechBubbleDefault,
    imageAspect: elOverride?.imageAspect || element.imageAspect || '1:1',
    dropCap
  };
};

export interface MasterArtPromptContext {
  sceneTitle?: string;
  location?: string;
  charactersPresent?: string[];
  emotion?: string;
  action?: string;
  customPrompt?: string;
  compositionShot?: string;
  lightingOverride?: string;
}

export const buildMasterArtDirectionPrompt = (
  masterStyle: MasterStyleProfile,
  context: MasterArtPromptContext
): string => {
  const art = masterStyle.artDirection;
  const palette = masterStyle.colorPalette;
  const lighting = context.lightingOverride || masterStyle.lightingSystem.globalLighting;
  const composition = context.compositionShot || masterStyle.compositionSystem.defaultShot;

  // Medium and rendering descriptions
  const mediumMap: Record<string, string> = {
    oil_painting: 'masterful oil painting with rich layered brushwork and impasto textures',
    watercolor: 'luminous transparent watercolor on heavy deckled watercolor paper with natural pigment blooms',
    gouache: 'opaque matte gouache painting with velvety graphic finishes',
    acrylic: 'vibrant textured acrylic on canvas',
    colored_pencil: 'fine crosshatched colored pencil on warm vellum',
    ink: 'fine precision ink drawing with expressive black wash',
    charcoal: 'smoky charcoal and conté crayon drawing with deep velvety shadows',
    pastel: 'soft textured chalk pastel with rich color blending',
    digital_painting: 'high-end digital concept painting with cinematic lighting',
    vector_illustration: 'sharp clean vector illustration with precise geometric elegance',
    editorial_illustration: 'sophisticated high-concept editorial illustration with metaphorical depth',
    comic_art: 'dynamic comic book illustration with bold black ink contours and expressive screentones',
    graphic_novel: 'mature graphic novel artwork with heavy ink chiaroscuro and atmospheric depth',
    collage: 'mixed-media artisanal collage with torn paper textures and vintage print overlays',
    mixed_media: 'layered mixed media combining traditional ink, paint, and textured grain'
  };

  const lineMap: Record<string, string> = {
    clean: 'crisp, razor-sharp clean contours',
    rough: 'raw, expressive rough line work',
    sketchy: 'dynamic loose sketchy draftsmanship',
    painterly: 'painterly edges with no hard outlines',
    heavy: 'heavy bold black ink lines with weighted brush variation',
    fine: 'ultra-fine delicate linework',
    no_visible_line: 'pure tonal painting without visible contour lines'
  };

  const textureMap: Record<string, string> = {
    smooth: 'smooth silk paper finish',
    paper_texture: 'visible heavy cold-press watercolor paper grain',
    canvas: 'woven linen canvas texture',
    rough_brush: 'visible bristle brushmarks and dry-brush dragging',
    grain: 'fine film grain and subtle tactile noise',
    ink_texture: 'tactile printer\'s ink wash and organic stippling',
    print_texture: 'vintage letterpress relief texture with slight ink bleed',
    halftone: 'distinctive vintage comic halftone dot pattern'
  };

  const lightingMap: Record<string, string> = {
    golden_hour: 'warm low golden hour sunlight with long dramatic amber shadows',
    morning: 'crisp pale morning daylight with cool subtle shadows',
    midday: 'high overhead midday light with sharp defined contrasts',
    afternoon: 'rich warm afternoon illumination',
    sunset: 'fiery crimson and violet sunset horizon lighting',
    night: 'deep nocturnal shadows with localized warm lamplight',
    moonlight: 'pale silvery moonlight cutting through deep darkness',
    candlelight: 'flickering warm intimate candlelight with deep dancing shadows',
    neon: 'vibrant electric neon glows reflecting on dark damp surfaces',
    overcast: 'diffused soft overcast ambient daylight with subtle gradients',
    studio: 'controlled three-point studio key lighting with soft fill',
    dramatic: 'intense theatrical chiaroscuro with high emotional tension',
    soft: 'gentle wrap-around diffused atmospheric lighting',
    high_contrast: 'stark pitch-black shadows against brilliant piercing highlights',
    low_contrast: 'moody atmospheric fog with soft compressed tonal range'
  };

  const compositionMap: Record<string, string> = {
    close_up: 'dramatic close-up shot focusing on raw facial micro-expressions',
    medium_shot: 'balanced medium shot framing character from waist up in their immediate environment',
    wide_shot: 'expansive wide shot establishing spatial scale and emotional distance',
    extreme_wide: 'epic extreme wide shot where figures are dwarfed by monumental architecture',
    over_the_shoulder: 'intimate over-the-shoulder perspective conveying tension between speakers',
    low_angle: 'commanding low-angle perspective looking upward for dramatic stature',
    high_angle: 'bird\'s-eye downward perspective conveying vulnerability or systemic oversight',
    birds_eye: 'overhead top-down compositional map view',
    symmetrical: 'formal, mathematically balanced symmetrical composition',
    asymmetrical: 'dynamic off-center asymmetrical balance utilizing generous negative space',
    centered: 'pure iconic centered focal composition',
    dynamic_diagonal: 'kinetic diagonal vector composition driving eye movement across the page',
    cinematic: 'widescreen cinematic anamorphic frame with cinematic depth of field',
    portrait: 'stately formal narrative portrait',
    establishing_shot: 'richly detailed environmental establishing scene'
  };

  // Compile Characters Present in scene with locked traits
  const characterDescriptions: string[] = [];
  if (context.charactersPresent && context.charactersPresent.length > 0) {
    for (const charName of context.charactersPresent) {
      const charProfile = masterStyle.charactersVisualProfiles.find(
        c => c.name.toLowerCase() === charName.toLowerCase() || charName.toLowerCase().includes(c.name.toLowerCase())
      );
      if (charProfile) {
        const lockedParts: string[] = [];
        if (charProfile.lockedProperties.face && charProfile.face) lockedParts.push(`Face: ${charProfile.face}`);
        if (charProfile.lockedProperties.hair && charProfile.hair) lockedParts.push(`Hair: ${charProfile.hair}`);
        if (charProfile.lockedProperties.bodyProportions && charProfile.bodyProportions) lockedParts.push(`Build: ${charProfile.bodyProportions}`);
        if (charProfile.lockedProperties.clothing && charProfile.clothing) lockedParts.push(`Attire: ${charProfile.clothing}`);
        if (charProfile.accessories) lockedParts.push(`Key Objects: ${charProfile.accessories}`);
        characterDescriptions.push(`CHARACTER [${charProfile.name}]: ${lockedParts.join(', ')}`);
      }
    }
  }

  // Compile Location details
  let envDescription = '';
  if (context.location) {
    const envProfile = masterStyle.environmentVisualProfiles.find(
      e => e.name.toLowerCase() === context.location?.toLowerCase() || context.location?.toLowerCase().includes(e.name.toLowerCase())
    );
    if (envProfile) {
      envDescription = `ENVIRONMENT [${envProfile.name}]: Architecture: ${envProfile.architecture}. Atmosphere: ${envProfile.atmosphere}. Materials: ${envProfile.materials}. Perspective: ${envProfile.perspective}.`;
    }
  }

  // Palette Lock Instruction
  let paletteInstruction = '';
  if (palette.lockedPalette) {
    paletteInstruction = `STRICT COLOR PALETTE LOCK: Use exclusively or harmonize around [Primary: ${palette.primary}, Secondary: ${palette.secondary}, Accent 1: ${palette.accent1}, Accent 2: ${palette.accent2}, Background: ${palette.background}]. Palette Variation Mode: ${palette.paletteVariation}.`;
  }

  // Sliders translation
  const sliders = art.intensitySliders;
  const stylizationDescriptor = sliders.realismVsStylization > 60 
    ? 'stylized graphic aesthetic' 
    : sliders.realismVsStylization < 30 ? 'high realism and anatomical precision' : 'balanced stylistic semi-realism';
  const detailDescriptor = sliders.minimalVsDetailed > 60 
    ? 'intricately detailed environmental and textural nuance' 
    : 'clean minimalist focus on essential shapes';

  // Adult Aesthetic descriptor
  const adultAestheticMap: Record<string, string> = {
    sophisticated_editorial: 'mature editorial visual wit and refined intellectual elegance',
    literary_illustration: 'dignified classic literary illustration with emotional gravity',
    dark_satire: 'cutting dark satire with biting visual irony and grotesque bureaucratic absurdism',
    sophisticated_caricature: 'sharply observed character caricature highlighting psychological truths',
    graphic_novel_realism: 'gritty graphic novel realism with palpable physical tension',
    noir: 'shadowy hard-boiled noir atmosphere with moral ambiguity',
    surrealism: 'unsettling poetic surrealism with uncanny symbolic juxtaposition',
    political_satire: 'scathing political caricature and systemic allegorical depth',
    sophisticated_comedy: 'dry intelligent comedy with delightful visual details'
  };

  const finalPrompt = [
    context.customPrompt || `Scene: ${context.sceneTitle || 'Narrative scene'}. Action: ${context.action || 'Characters engaged in dialogue'}. Emotion: ${context.emotion || 'Intense focus'}.`,
    `ARTISTIC MEDIUM & TECHNIQUE: ${mediumMap[art.medium] || art.medium}, featuring ${lineMap[art.lineQuality] || art.lineQuality} on ${textureMap[art.texture] || art.texture}.`,
    `STYLE PARAMETERS: ${stylizationDescriptor}, ${detailDescriptor}, ${adultAestheticMap[art.adultAesthetic] || 'mature storytelling craft'}.`,
    `LIGHTING & COMPOSITION: ${lightingMap[lighting] || lighting}. Shot framing: ${compositionMap[composition] || composition}.`,
    characterDescriptions.length > 0 ? characterDescriptions.join('\n') : '',
    envDescription ? envDescription : (context.location ? `Setting: ${context.location}` : ''),
    paletteInstruction,
    `MASTER QUALITY MANDATE: Single unified designed object consistency. No generic cartoon clichés, no modern anime tropes unless requested, no artifacting. Evocative, professional publishing grade.`
  ].filter(Boolean).join('\n\n');

  return finalPrompt;
};

// Auto harmonize chapter colors across a 360-degree color wheel
export const autoHarmonizeChapterColors = (baseColor: string = '#d97706', count: number = 6): Record<number, string> => {
  const { h, s, l } = hexToHsl(baseColor);
  const step = 360 / Math.max(count, 1);
  const result: Record<number, string> = {};

  for (let i = 0; i < count; i++) {
    const chapterNum = i + 1;
    const currentHue = (h + i * step) % 360;
    result[chapterNum] = hslToHex(currentHue, Math.min(s, 75), Math.max(l, 40));
  }

  return result;
};

// Color Utility Converters
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
};

export const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
