export type BookType = 
  | 'illustrated_novel'
  | 'comic_graphic_novel'
  | 'literary_novel'
  | 'writing_manual'
  | 'non_fiction_satire';

export type PageSize = 
  | 'A4' 
  | 'A5' 
  | 'Letter' 
  | 'US_Legal'
  | '6x9' 
  | '5.5x8.5' 
  | '8x10' 
  | '8.5x11' 
  | 'Square' 
  | 'Comic' 
  | 'comic' 
  | 'manga' 
  | 'Custom';

export type PageSizePreset = PageSize;
export type PageOrientation = 'portrait' | 'landscape' | 'square' | 'mixed';
export type MarginPreset = 'normal' | 'narrow' | 'wide' | 'custom' | 'mirror';
export type PageNumberPosition = 'none' | 'bottom_center' | 'bottom_outside' | 'top_outside' | 'top_center' | 'bottom_right' | 'top_right';
export type BleedSetting = 'none' | '3mm' | '5mm' | 'custom';
export type PdfQualityPreset = 'draft' | 'standard' | 'high_quality' | 'print' | 'maximum' | 'archival';
export type ImageDpiOption = 72 | 150 | 200 | 300 | 600 | 'auto';
export type PdfCompressionLevel = 'small' | 'balanced' | 'high' | 'lossless';
export type ColorModeOption = 'rgb' | 'grayscale' | 'black_white' | 'cmyk';

export type PageMasterType = 
  | 'text'
  | 'text_image'
  | 'full_page_image'
  | 'full_bleed'
  | 'two_column'
  | 'three_column'
  | 'comic'
  | 'worksheet'
  | 'exercise'
  | 'quote'
  | 'table'
  | 'diagram'
  | 'chapter_opener'
  | 'section_opener';

export type MasterStylePreset = 
  | 'literary_classic'
  | 'modern_editorial'
  | 'luxury_coffee_table'
  | 'vintage_pulp'
  | 'contemporary_comic'
  | 'graphic_novel'
  | 'satirical_magazine'
  | 'childrens_book_adult'
  | 'painterly_illustration'
  | 'watercolor'
  | 'ink_and_wash'
  | 'editorial_cartoon'
  | 'retro_comic'
  | 'noir'
  | 'minimalist'
  | 'art_deco'
  | 'art_nouveau'
  | 'japanese_inspired'
  | 'european_album_comic'
  | 'photorealistic_editorial'
  | 'surrealist'
  | 'pop_art'
  | 'dark_gothic'
  | 'academic'
  | 'creative_writing_manual'
  | 'professional_workshop'
  | 'custom';

export type StyleApplicationScope = 
  | 'entire_book'
  | 'chapter'
  | 'scene'
  | 'section'
  | 'page'
  | 'selected_element'
  | 'entire_series';

export interface TextHierarchyStyleItem extends FontConfig {
  marginBeforePt?: number;
  marginAfterPt?: number;
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  isItalic?: boolean;
  isBold?: boolean;
  isSmallCaps?: boolean;
  isUnderline?: boolean;
}

export interface TextHierarchyStyles {
  h1: TextHierarchyStyleItem;
  h2: TextHierarchyStyleItem;
  h3: TextHierarchyStyleItem;
  h4: TextHierarchyStyleItem;
  body: TextHierarchyStyleItem;
  leadParagraph: TextHierarchyStyleItem;
  quote: TextHierarchyStyleItem;
  caption: TextHierarchyStyleItem;
  dialogue: TextHierarchyStyleItem;
  footnote: TextHierarchyStyleItem;
  exercise: TextHierarchyStyleItem;
  example: TextHierarchyStyleItem;
  warning: TextHierarchyStyleItem;
  tip: TextHierarchyStyleItem;
  callout: TextHierarchyStyleItem;
  pullQuote: TextHierarchyStyleItem;
  comicSpeechBubble: TextHierarchyStyleItem;
}

export type PaletteVariationType = 'exact' | 'soft' | 'expanded' | 'monochrome' | 'seasonal' | 'harmonious' | 'tinted' | 'dramatic';

export interface ColorPaletteConfig {
  primary: string;
  secondary: string;
  accent1: string;
  accent2: string;
  background: string;
  text: string;
  muted: string;
  border: string;
  highlight: string;
  illustrationPalette: string[];
  illustrationColors?: string[];
  lockedPalette: boolean;
  locked?: boolean;
  paletteVariation: PaletteVariationType;
  variation?: PaletteVariationType;
}

export type ColorPaletteSettings = ColorPaletteConfig;

export type ChapterOpenerStyle = 
  | 'full_illustration'
  | 'large_number'
  | 'large_title'
  | 'minimal_title'
  | 'decorative_title'
  | 'drop_cap'
  | 'drop_cap_focus'
  | 'minimalist'
  | 'quote'
  | 'epigraph'
  | 'character_illustration'
  | 'scene_illustration'
  | 'full_bleed'
  | 'split_text_image'
  | 'comic_opening';

export type ChapterTemplateType = 
  | 'classic_novel'
  | 'illustrated_novel'
  | 'comic'
  | 'writing_manual'
  | 'magazine'
  | 'custom';

export interface ChapterDesignConfig {
  chapterOpener: ChapterOpenerStyle;
  openerStyle?: ChapterOpenerStyle;
  chapterTemplate: ChapterTemplateType;
  numberFormat: 'CHAPTER 01' | 'Chapter One' | '01' | 'I' | 'none' | string;
  numberingFormat?: 'CHAPTER 01' | 'Chapter One' | '01' | 'I' | 'none' | string;
  showSubtitle: boolean;
  openingQuotation: boolean;
  openingIllustration: boolean;
  dropCap: boolean;
  dropCapEnabled?: boolean;
  dropCapLines: number;
  dropCapFont?: string;
  decorativeElement: 'none' | 'filigree' | 'geometric_line' | 'fleuron' | 'double_rule' | 'stars' | 'minimal_dot' | string;
  ornamentStyle?: string;
  chapterColors: { [chapterNumber: number]: string };
  autoHarmonizeColors: boolean;
}

export type ChapterDesignSettings = ChapterDesignConfig;

export type ScientificHeaderFooterPreset = 
  | 'nature_ieee_journal'
  | 'university_press_monograph'
  | 'scientific_manual_runbook'
  | 'hermetic_scholarly_treatise'
  | 'medical_clinical_reference'
  | 'conference_proceedings'
  | 'classic_literary'
  | 'custom';

export type FolioNumberingStyle = 
  | 'arabic'
  | 'roman_lower'
  | 'roman_upper'
  | 'section_page'
  | 'academic_fraction'
  | 'bracketed'
  | 'em_dash'
  | 'manuscript_codex';

export type HeaderRuleStyle = 
  | 'none' 
  | 'hairline' 
  | 'solid_thin' 
  | 'solid_medium' 
  | 'double_rule' 
  | 'dashed' 
  | 'dotted' 
  | 'academic_ornament';

export interface ScientificHeaderFooterConfig {
  preset: ScientificHeaderFooterPreset;
  enabled: boolean;
  
  // Running Header (Verso / Even Page - Left Page)
  versoHeaderLeft: string;
  versoHeaderCenter: string;
  versoHeaderRight: string;
  
  // Running Header (Recto / Odd Page - Right Page)
  rectoHeaderLeft: string;
  rectoHeaderCenter: string;
  rectoHeaderRight: string;
  
  // Running Footer (Verso / Even Page)
  versoFooterLeft: string;
  versoFooterCenter: string;
  versoFooterRight: string;
  
  // Running Footer (Recto / Odd Page)
  rectoFooterLeft: string;
  rectoFooterCenter: string;
  rectoFooterRight: string;
  
  // Header Typography & Rules
  headerFontFamily: string;
  headerFontSizePt: number;
  headerFontWeight: 'normal' | 'bold' | 'semibold';
  headerFontStyle: 'normal' | 'italic';
  headerTextTransform: 'none' | 'uppercase' | 'small-caps' | 'capitalize';
  headerLetterSpacing: number;
  headerTextColor: string;
  headerRuleStyle: HeaderRuleStyle;
  headerRuleWidthPt: number;
  headerRuleColor: string;
  headerOffsetMm: number;
  
  // Footer Typography & Rules
  footerFontFamily: string;
  footerFontSizePt: number;
  footerFontWeight: 'normal' | 'bold' | 'semibold';
  footerFontStyle: 'normal' | 'italic';
  footerTextTransform: 'none' | 'uppercase' | 'small-caps' | 'capitalize';
  footerLetterSpacing: number;
  footerTextColor: string;
  footerRuleStyle: HeaderRuleStyle;
  footerRuleWidthPt: number;
  footerRuleColor: string;
  footerOffsetMm: number;
  
  // Folio / Page Numbering Settings
  folioStyle: FolioNumberingStyle;
  folioPrefix: string;
  folioSuffix: string;
  frontMatterFolioStyle: 'roman_lower' | 'arabic' | 'none';
  
  // Scientific Metadata Fields
  doiString?: string;
  issnString?: string;
  isbnString?: string;
  journalName?: string;
  volumeIssue?: string;
  copyrightNotice?: string;
  documentClassification?: string;
  
  // Academic Suppression Rules
  suppressHeaderOnChapterOpener: boolean;
  suppressHeaderOnFrontMatter: boolean;
  suppressHeaderOnBlankPages: boolean;
  suppressFooterOnCover: boolean;
  suppressFooterOnFullBleedImages: boolean;
}

export interface PageDesignSystemConfig {
  pageSize: PageSize;
  orientation: PageOrientation;
  margins: {
    topMm: number;
    bottomMm: number;
    leftMm: number;
    rightMm: number;
  };
  marginsMm?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    inside?: number;
    outside?: number;
  };
  columns: 1 | 2 | 3;
  guttersMm: number;
  grid: 'single_column' | 'two_column' | 'golden_ratio' | 'modular_grid';
  headerText: string;
  headerPosition: 'top_outside' | 'top_center' | 'top_both' | 'none';
  footerText: string;
  pageNumberPosition: PageNumberPosition;
  headersAndFooters?: ScientificHeaderFooterConfig;
  headerFooter?: ScientificHeaderFooterConfig;
  imagePlacement: 'top' | 'bottom' | 'float' | 'full_bleed' | 'inline' | 'custom';
  textImageBalance: number; // 0 (Mostly text) -> 50 (Balanced) -> 100 (Full visual storytelling)
  imageToTextRatio?: number;
}

export type PageDesignSettings = PageDesignSystemConfig;

export type ArtMediumType = 
  | 'oil_painting'
  | 'watercolor'
  | 'gouache'
  | 'acrylic'
  | 'colored_pencil'
  | 'ink'
  | 'ink_wash'
  | 'charcoal'
  | 'pastel'
  | 'digital_painting'
  | 'vector_illustration'
  | 'vector_art'
  | 'editorial_illustration'
  | 'comic_art'
  | 'comic_book'
  | 'graphic_novel'
  | 'graphic_novel_noir'
  | 'collage'
  | 'mixed_media';

export type LineQualityType = 
  | 'clean'
  | 'clean_precise'
  | 'rough'
  | 'loose_expressive'
  | 'sketchy'
  | 'sketchy_pencil'
  | 'painterly'
  | 'heavy'
  | 'heavy_ink'
  | 'fine'
  | 'woodcut_crosshatch'
  | 'linocut'
  | 'none'
  | 'no_visible_line';

export type TextureType = 
  | 'smooth'
  | 'smooth_vellum'
  | 'paper_texture'
  | 'handmade_paper'
  | 'canvas'
  | 'rough_canvas'
  | 'rough_brush'
  | 'grain'
  | 'heavy_grain'
  | 'ink_texture'
  | 'print_texture'
  | 'halftone'
  | 'halftone_dot'
  | 'distressed_vintage'
  | 'clean_digital';

export type RenderingStyleType = 
  | 'flat'
  | 'flat_graphic'
  | 'semi_flat'
  | 'painterly'
  | 'painterly_realism'
  | 'highly_rendered'
  | 'hyper_detailed'
  | 'realistic'
  | 'stylized'
  | 'stylized_semi_real'
  | 'atmospheric_sfumato'
  | 'minimal'
  | 'minimal_line'
  | 'caricature'
  | 'exaggerated';

export type AdultAestheticType = 
  | 'sophisticated_editorial'
  | 'literary_illustration'
  | 'dark_satire'
  | 'sophisticated_caricature'
  | 'graphic_novel_realism'
  | 'noir'
  | 'noir_cynicism'
  | 'surrealism'
  | 'psychological_surrealism'
  | 'satirical_caricature'
  | 'european_bd'
  | 'gritty_realism'
  | 'gothic_romanticism'
  | 'minimalist_avant_garde'
  | 'dystopian_cyberpunk'
  | 'historical_lithograph'
  | 'political_satire'
  | 'sophisticated_comedy';

export interface ArtDirectionConfig {
  medium: ArtMediumType;
  mediumIntensity?: number;
  lineQuality: LineQualityType;
  detailLevel?: number;
  texture: TextureType;
  textureStrength?: number;
  rendering: RenderingStyleType;
  renderingStyle?: RenderingStyleType;
  lightingDrama?: number;
  intensitySliders: {
    realismVsStylization: number; // 0 (Realism) <-> 100 (Stylization)
    minimalVsDetailed: number;    // 0 (Minimal) <-> 100 (Detailed)
    cleanVsRough: number;         // 0 (Clean) <-> 100 (Rough)
    subtleVsExaggerated: number;  // 0 (Subtle) <-> 100 (Exaggerated)
  };
  adultStoryMode: boolean;
  adultAesthetic: AdultAestheticType;
}

export type ArtDirectionSettings = ArtDirectionConfig;

export interface CharacterVisualProfile {
  id?: string;
  characterId?: string;
  name: string;
  face?: string;
  facialStructure?: string;
  hair?: string;
  hairStyleAndColor?: string;
  ageAppearance?: string;
  ageAndSilhouette?: string;
  bodyProportions?: string;
  clothing?: string;
  standardAttire?: string;
  colorPalette?: string[];
  accessories?: string;
  signatureAccessories?: string;
  lockedTraits?: string[];
  expressions?: string[];
  typicalPoses?: string[];
  artisticRendering?: string;
  lighting?: string;
  referenceImages?: string[];
  lockedProperties?: {
    hair: boolean;
    clothing: boolean;
    colorPalette: boolean;
    face: boolean;
    bodyProportions: boolean;
  };
}

export interface EnvironmentVisualProfile {
  id?: string;
  environmentId?: string;
  name: string;
  architecture?: string;
  architecturalStyle?: string;
  landscape?: string;
  lighting?: string;
  lightingConditions?: string;
  weather?: string;
  weatherOrSeason?: string;
  timePeriod?: string;
  materials?: string;
  primaryMaterials?: string[];
  color?: string;
  colorTemperature?: string;
  texture?: string;
  atmosphere?: string;
  spatialAtmosphere?: string;
  perspective?: string;
  cameraPerspective?: string;
  visualReferences?: string[];
}

export type EnvironmentProfile = EnvironmentVisualProfile;

export type LightingStyleType = 
  | 'golden_hour'
  | 'morning'
  | 'midday'
  | 'afternoon'
  | 'sunset'
  | 'night'
  | 'moonlight'
  | 'candlelight'
  | 'neon'
  | 'overcast'
  | 'studio'
  | 'dramatic'
  | 'soft'
  | 'high_contrast'
  | 'low_contrast';

export type CompositionShotType = 
  | 'close_up'
  | 'medium_shot'
  | 'wide_shot'
  | 'extreme_wide'
  | 'over_the_shoulder'
  | 'low_angle'
  | 'high_angle'
  | 'birds_eye'
  | 'symmetrical'
  | 'asymmetrical'
  | 'centered'
  | 'dynamic_diagonal'
  | 'cinematic'
  | 'portrait'
  | 'establishing_shot';

export type SpeechBubbleStyleType = 
  | 'classic'
  | 'classic_rounded'
  | 'rounded'
  | 'organic'
  | 'sharp'
  | 'sharp_shout'
  | 'whisper'
  | 'whisper_dashed'
  | 'shout'
  | 'thought'
  | 'thought_cloud'
  | 'narration'
  | 'narrator_box'
  | 'electronic'
  | 'electronic_radio'
  | 'mechanical';

export type SpeechBubbleStyle = SpeechBubbleStyleType;

export interface ComicVisualLanguageConfig {
  panelBorders: boolean;
  panelThicknessPt: number;
  panelBorderThicknessPt?: number;
  panelCornerRadius?: number;
  panelShape: 'sharp' | 'rounded' | 'organic' | 'borderless';
  speechBubbleDefault: SpeechBubbleStyleType;
  defaultSpeechBubbleStyle?: SpeechBubbleStyleType;
  captionBoxStyle: 'box_top' | 'floating_tag' | 'transparent_ribbon' | 'classic_yellow';
  soundEffectsStyle: 'bold_comic' | 'subtle_serif' | 'hand_drawn' | 'japanese_katakana';
  letteringStyle: 'comic_sans_pro' | 'bangers' | 'architect_hand' | 'clean_grotesk';
  sfxLetteringFont?: string;
  actionLines: boolean;
  actionLinesEnabled?: boolean;
  motionBlur: boolean;
  backgroundDetail: 'minimal' | 'selective' | 'intricate';
  halftone: boolean;
  screentoneStyle?: string;
  panelDensity: 'relaxed' | 'dense' | 'dynamic';
  gutterSizeMm: number;
  gutterSpacingMm?: number;
  readingDirection: 'left_to_right' | 'right_to_left';
  splashPagesAllowed: boolean;
  doublePageSpreads: boolean;
  insetPanels: boolean;
  characterBubbleStyles: { [characterNameOrId: string]: SpeechBubbleStyleType };
}

export type ComicVisualLanguageSettings = ComicVisualLanguageConfig;

export interface BackCoverConfig {
  synopsis: string;
  authorBio: string;
  tagline: string;
  quote: string;
  seriesInfo: string;
  isbn: string;
  publisherInfo: string;
  barcodeVisible: boolean;
}

export type CoverLayoutStyle = 'centered' | 'split' | 'poster' | 'modern' | 'cinematic' | 'editorial_minimal' | 'full_illustration' | 'architectural_frame' | 'typographic_dominance' | 'split_duotone';

export interface CoverDesignConfig {
  theme: 'classic' | 'minimal' | 'bold' | 'comic' | 'editorial' | 'luxury' | 'pulp' | 'noir';
  layoutStyle: CoverLayoutStyle;
  titleFont: FontConfig;
  subtitleFont: FontConfig;
  authorFont: FontConfig;
  genre: string;
  mainIllustrationPrompt: string;
  frontCoverIllustrationPrompt?: string;
  bgImageUrl?: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  decorativeFrame: 'none' | 'gold_border' | 'minimal_rule' | 'ornate_vintage' | 'comic_box';
  spineWidthMm: number;
  backCover: BackCoverConfig;
  backCoverPraiseQuote?: string;
  backCoverSynopsis?: string;
  publisherImprint?: string;
  isbn?: string;
}

export type CoverDesignSettings = CoverDesignConfig;

export interface PdfPublishingConfig {
  bleedMm: number;
  cropMarks: boolean;
  colorProfile: 'sRGB' | 'CMYK_Print';
  highResImages: boolean;
  headerFormat: string;
  pageNumberFormat: 'arabic' | 'roman' | 'minimal' | 'bracketed';
  tableOfContentsStyle: 'minimal' | 'dotted' | 'magazine' | 'illustrated';
  twoSidedPrinting?: boolean;
  rasterQuality?: string;
}

export type PdfPublishingSettings = PdfPublishingConfig;

export interface StyleLocksConfig {
  typography: boolean;
  palette: boolean;
  characterAppearance: boolean;
  environment: boolean;
  illustrationMedium: boolean;
  lighting: boolean;
  composition: boolean;
  chapterDesign: boolean;
  coverDesign: boolean;
}

export interface StyleVersionEntry {
  id: string;
  name: string;
  timestamp: string;
  note?: string;
  profileSnapshot: MasterStyleProfile;
}

export interface StyleAuditIssue {
  id: string;
  severity: 'ERROR' | 'WARNING' | 'SUGGESTION';
  category: 'typography' | 'color' | 'character' | 'illustration' | 'chapter_layout' | 'environment';
  title: string;
  description: string;
  affectedTarget: string; // e.g. "Chapter 2 - Page 4", "Arthur Pendleton", "Dialogue font"
  suggestedFix: string;
  autoFixAction?: string;
}

export interface MasterStyleProfile {
  id: string;
  name: string;
  preset: MasterStylePreset;
  description: string;
  typographyHierarchy: TextHierarchyStyles;
  colorPalette: ColorPaletteConfig;
  pageDesign: PageDesignSystemConfig;
  artDirection: ArtDirectionConfig;
  chapterDesign: ChapterDesignConfig;
  charactersVisualProfiles: CharacterVisualProfile[];
  characterProfiles?: CharacterVisualProfile[];
  environmentVisualProfiles: EnvironmentVisualProfile[];
  environmentProfiles?: EnvironmentVisualProfile[];
  lightingSystem: {
    globalLighting: LightingStyleType;
    sceneLightingOverrides: { [sceneId: string]: LightingStyleType };
  };
  compositionSystem: {
    defaultShot: CompositionShotType;
  };
  comicVisualLanguage: ComicVisualLanguageConfig;
  coverDesign: CoverDesignConfig;
  pdfPublishing: PdfPublishingConfig;
  styleLocks: StyleLocksConfig;
  versions: StyleVersionEntry[];
}

export interface StyleOverrideScopeData {
  scope?: StyleApplicationScope;
  typography?: Partial<TextHierarchyStyles>;
  colorPalette?: Partial<ColorPaletteConfig>;
  artDirection?: Partial<ArtDirectionConfig>;
  chapterDesign?: Partial<ChapterDesignConfig>;
  pageDesign?: Partial<PageDesignSystemConfig>;
  lighting?: LightingStyleType;
}

export interface ElementStyleOverride {
  fontFamily?: string;
  fontSizePt?: number;
  fontWeight?: string | number;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  bubbleStyle?: SpeechBubbleStyleType;
  imageAspect?: '1:1' | '16:9' | '4:3' | '3:4' | '9:16';
}

export interface FontConfig {
  family: string;
  fallback: string;
  generic: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'display';
  weight: number | string;
  sizePt: number;
  lineHeight: number;
  letterSpacing: number; // in em
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  color?: string;
}

export type TypographyPreset = 'literary' | 'modern' | 'editorial' | 'bold' | 'classic' | 'writing_manual' | 'satirical' | 'comic' | 'magazine' | 'academic' | 'custom';

export interface TypographySettings {
  preset: TypographyPreset;
  bookTitle: FontConfig;
  subtitle: FontConfig;
  chapterHeadings: FontConfig;
  sectionHeadings: FontConfig;
  bodyText: FontConfig;
  dialogue: FontConfig;
  captions: FontConfig;
  footnotes: FontConfig;
  pageNumbers: FontConfig;
  exercises: FontConfig;
  callouts: FontConfig;
  comicSpeechBubbles: FontConfig;
  paragraphIndent: number; // in mm
  paragraphSpacing: number; // in pt
  dropCaps: boolean;
}

export interface HeaderFooterConfig {
  headerLeft: string;
  headerCenter: string;
  headerRight: string;
  footerLeft: string;
  footerCenter: string;
  footerRight: string;
  showOnFrontMatter: boolean;
  showOnChapterOpener: boolean;
  differentFirstPage: boolean;
  differentOddEven: boolean;
  decorativeRule: boolean;
}

export interface PdfExportSettings {
  pageSize: PageSize;
  customWidthMm?: number;
  customHeightMm?: number;
  orientation: PageOrientation;
  margins: MarginPreset;
  marginTopMm: number;
  marginBottomMm: number;
  marginLeftMm: number;
  marginRightMm: number;
  gutterMm?: number;
  mirrorMargins?: boolean;
  bleed: BleedSetting;
  bleedMm: number;
  printerMarks?: boolean;
  cropMarks?: boolean;
  safeAreaGuides?: boolean;
  presetQuality?: PdfQualityPreset;
  imageDpi?: ImageDpiOption;
  compressionLevel?: PdfCompressionLevel;
  colorMode?: ColorModeOption;
  pageNumbering: PageNumberPosition;
  chapterNumbering: boolean;
  startMainContentAtOne?: boolean;
  frontMatterNumbering?: 'roman' | 'arabic' | 'none';
  mainContentNumbering?: 'arabic' | 'bracketed' | 'none';
  appendixNumbering?: 'alpha_numeric' | 'arabic' | 'none';
  tableOfContents: 'auto' | 'on' | 'off';
  clickableToc?: boolean;
  pdfBookmarks?: boolean;
  includeCover: boolean;
  coverType: 'generated' | 'uploaded' | 'designer';
  filename: string;
  highResImages: boolean;
  headerText: string;
  headersAndFooters?: HeaderFooterConfig;
  exportScope?: 'full_book' | 'current_chapter' | 'selected_pages';
  scope?: 'full_book' | 'current_chapter' | 'selected_pages';
  selectedChapterId?: string;
  selectedPagesList?: number[];
}

export interface PreflightIssue {
  id: string;
  severity: 'ERROR' | 'WARNING' | 'OK';
  category: 'images' | 'fonts' | 'text' | 'toc' | 'pagination' | 'blank_pages' | 'headers' | 'color_bleed' | 'front_back_matter' | 'links';
  title: string;
  description: string;
  affectedPage?: number;
  autoFixable?: boolean;
  autoFixAction?: string;
}

export interface PreflightReport {
  timestamp: string;
  status: 'ERROR' | 'WARNING' | 'OK';
  score: number; // 0-100
  issues: PreflightIssue[];
  summary: {
    errors: number;
    warnings: number;
    passed: number;
  };
}

export interface CharacterBibleEntry {
  id: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'mentor' | 'foil';
  lockedTraits: string[]; // e.g. ["Short dark hair", "Round glasses", "Green jacket", "Distinctive mole", "Petite build"]
  bio: string;
  personality: string;
  voiceStyle: string;
  arcGoal: string;
  secrets: string;
  currentEmotionalState: string;
  currentInjuries: string;
  currentPossessions: string[];
  relationships: { targetName: string; relation: string }[];
  avatarUrl?: string;
}

export interface WorldRule {
  id: string;
  category: 'magic_physics' | 'society_politics' | 'technology' | 'geography' | 'forbidden';
  title: string;
  description: string;
}

export interface LocationEntry {
  id: string;
  name: string;
  atmosphere: string;
  description: string;
  visualKey: string;
}

export interface TimelineEvent {
  id: string;
  chronology: string; // e.g. "Day 1, 09:00 AM", "Thursday Morning"
  event: string;
  charactersInvolved: string[];
}

export interface ContinuityFact {
  id: string;
  fact: string;
  category: 'character_knowledge' | 'item_location' | 'world_state' | 'plot_event' | 'timeline';
  chapterOrigin: number;
  active: boolean;
  timestamp: string;
}

export interface ChapterSummaryEntry {
  chapterId: string;
  chapterNumber: number;
  title: string;
  summary: string;
  keyConsequences: string[];
  dateAdded: string;
}

export interface MemoryEngineState {
  // Level 1: Long-term Permanent Project Facts
  level1GlobalBible: {
    premise: string;
    writingStyleGuide: string;
    visualStyleGuide: string;
    visualStyleLocked: boolean;
    colorPalette: string[];
    worldRules: WorldRule[];
    characters: CharacterBibleEntry[];
    locations: LocationEntry[];
    timeline: TimelineEvent[];
    majorThemes: string[];
  };
  // Level 2: Rolling Story Memory Buffer
  level2RollingMemory: {
    chapterSummaries: ChapterSummaryEntry[];
    rollingSummaryBuffer: string;
    continuityFacts: ContinuityFact[];
  };
  // Level 3: Immediate Context & Integrity
  level3ImmediateContext: {
    currentSceneFocus: string;
    activeUnresolvedThreads: string[];
    immediatePrecedingSummary: string;
  };
  // Multi-Volume Linking
  volumeId: number;
  parentVolumeTitle?: string;
  parentVolumeSummary?: string;
}

export type PageLayoutType = 
  | 'prose'
  | 'illustrated_full'
  | 'illustrated_half_top'
  | 'illustrated_half_bottom'
  | 'illustrated_floating_left'
  | 'illustrated_floating_right'
  | 'comic_2panel'
  | 'comic_4panel'
  | 'comic_6panel'
  | 'comic_action'
  | 'manual_lesson'
  | 'manual_exercise';

export type ElementType = 
  | 'heading'
  | 'subheading'
  | 'paragraph'
  | 'dialogue'
  | 'illustration'
  | 'caption'
  | 'speech_bubble'
  | 'exercise_box'
  | 'quote'
  | 'scene_break';

export interface PageElement {
  id: string;
  type: ElementType;
  content: string;
  speaker?: string;
  bubbleStyle?: 'speech' | 'whisper' | 'shout' | 'thought' | SpeechBubbleStyleType;
  panelIndex?: number; // For comic layouts (panel 0, 1, 2, 3...)
  imageUrl?: string;
  imagePrompt?: string;
  imageAlt?: string;
  imageAspect?: '1:1' | '16:9' | '4:3' | '3:4' | '9:16';
  imagePosition?: 'full' | 'half_top' | 'half_bottom' | 'float_left' | 'float_right' | 'centered';
  calloutType?: 'note' | 'exercise' | 'autopsy' | 'warning' | 'solution';
  exerciseDifficulty?: 'beginner' | 'intermediate' | 'advanced' | 'mastery';
  keepWithNext?: boolean;
  styleOverride?: ElementStyleOverride;
}

export interface BookPage {
  id: string;
  pageNumber: number;
  layout: PageLayoutType;
  headerOverride?: string;
  elements: PageElement[];
  pageStyleOverride?: StyleOverrideScopeData;
}

export interface Scene {
  id: string;
  title: string;
  location: string;
  charactersPresent: string[];
  timeOfDay: string;
  purpose: string;
  pages: BookPage[];
  sceneStyleOverride?: StyleOverrideScopeData;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  summary: string;
  unresolvedThreads: string[];
  scenes: Scene[];
  chapterStyleOverride?: StyleOverrideScopeData;
}

export interface BookCover {
  title: string;
  subtitle: string;
  author: string;
  illustrator?: string;
  series?: string;
  seriesTitle?: string;
  volumeNumber?: number;
  tagline?: string;
  editionText?: string;
  bgImageUrl?: string;
  coverImageUrl?: string;
  bgColor: string;
  textColor: string;
  accentColor?: string;
  decorativeElements?: string;
  theme: 'classic' | 'minimal' | 'bold' | 'comic' | 'editorial' | 'luxury' | 'pulp' | 'noir' | 'dark_fantasy' | 'cinematic' | 'vintage' | string;
  layoutStyle: 'centered' | 'split' | 'poster' | 'modern';
  customCoverDataUrl?: string;
  backCover?: {
    synopsis: string;
    authorBio: string;
    praiseQuote?: string;
    website?: string;
    qrCodeUrl?: string;
    publisher?: string;
    isbnPlaceholder?: string;
    barcodePlaceholder?: string;
  };
  spine?: {
    title?: string;
    author?: string;
    volume?: string;
    spineWidthMm?: number;
  };
}

export interface FrontMatter {
  halfTitle?: boolean;
  halfTitleText?: string;
  titlePage: boolean;
  copyrightPage: boolean;
  copyrightYear: string;
  author?: string;
  illustrator?: string;
  publisherName: string;
  edition?: string;
  publicationDate?: string;
  isbn?: string;
  digitalIsbn?: string;
  website?: string;
  credits?: string;
  imageCredits?: string;
  aiDisclosure?: string;
  disclaimer?: string;
  countryOfPublication?: string;
  dedication?: string;
  epigraph?: string;
  epigraphAuthor?: string;
  foreword?: string;
  forewordAuthor?: string;
  preface?: string;
  introduction?: string;
  authorsNote?: string;
  tableOfContents: boolean;
  tocMode?: 'automatic' | 'manual' | 'hybrid';
  listOfIllustrations?: boolean;
  illustrationsListMode?: 'automatic' | 'manual' | 'disabled';
  characterList?: boolean;
  howToUseThisBook?: boolean;
  acknowledgments?: string;
}

export interface EndMatter {
  epilogue?: string;
  afterword?: string;
  appendix?: string;
  glossary?: Array<{ term: string; definition: string }>;
  index?: Array<{ term: string; pages: number[] }>;
  bibliography?: string[];
  furtherReading?: string[];
  exerciseAnswers?: string[];
  authorsNote?: string;
  acknowledgments: string;
  aboutAuthor: string;
  volume2Preview?: string;
}

export interface ExerciseHistoryEntry {
  id: string;
  title: string;
  toolType: string;
  prompt: string;
  userSubmission: string;
  aiAnalysis: string;
  completedAt: string;
  difficulty: string;
}

export interface ManualInnovationState {
  courseObjective: string;
  skillProgression: string[];
  conceptsTaught: string[];
  exercisesHistory: ExerciseHistoryEntry[];
  activeTool: 
    | 'story_autopsy'
    | 'dilemma_machine'
    | 'scene_surgery'
    | 'cliche_detector'
    | 'trope_inversion'
    | 'consequence_machine'
    | 'voice_lab'
    | 'pressure_cooker'
    | 'ending_lab';
}

export interface BookDocument {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  volume: number;
  genre: string;
  bookType: BookType;
  metadata: {
    createdAt: string;
    lastModified: string;
    targetPages: number;
    maxPageLimit: number; // 500 pages limit
    synopsis: string;
  };
  cover: BookCover;
  frontMatter: FrontMatter;
  chapters: Chapter[];
  endMatter: EndMatter;
  typography: TypographySettings;
  pdfSettings: PdfExportSettings;
  memoryEngine: MemoryEngineState;
  manualState?: ManualInnovationState;
  masterStyleProfile?: MasterStyleProfile;
  referenceStudio?: ReferenceStudioState;
}

export type VisualReferenceCategory = 
  | 'character'
  | 'art_style'
  | 'palette'
  | 'environment'
  | 'layout';

export type ReferenceImportance = 
  | 'PRIMARY' 
  | 'SECONDARY' 
  | 'OPTIONAL' 
  | 'strict_match' 
  | 'primary' 
  | 'secondary' 
  | 'inspiration_only';

export type ReferenceRole = 
  | 'primary_style'
  | 'secondary_style'
  | 'linework'
  | 'color_palette'
  | 'color'
  | 'lighting_mood'
  | 'lighting'
  | 'character_design'
  | 'character_rendering'
  | 'environment_world'
  | 'background'
  | 'layout_grid'
  | 'composition'
  | 'texture'
  | 'clothing'
  | 'facial_expression'
  | 'general';

export interface VisualReferenceItem {
  id: string;
  name: string;
  category: VisualReferenceCategory;
  role: ReferenceRole;
  importance: ReferenceImportance;
  imageUrl: string;
  fileType?: string;
  notes?: string;
  characterId?: string;
  environmentId?: string;
  tags?: string[];
  extractedAttributes?: {
    medium?: string;
    rendering?: string;
    lineQuality?: string;
    palette?: string[];
    lighting?: string;
    mood?: string;
    realismPercent?: number;
    stylizationPercent?: number;
    texture?: string;
    brushCharacter?: string;
    contrast?: string;
    facialRendering?: string;
    backgroundTreatment?: string;
    visualDensity?: string;
  };
  createdAt: string;
}

export interface CharacterReferenceCard {
  id: string;
  name: string;
  role: string;
  visualIdentifier: string;
  approximateAge: string;
  faceCharacteristics: string;
  hair: string;
  bodyProportions: string;
  clothing: string;
  accessories: string;
  colorAssociations: string[];
  typicalExpressions: string[];
  typicalPoses: string[];
  distinguishingFeatures: string;
  referenceImages?: string[];
  assignedReferenceIds?: string[];
  locks: {
    face: boolean;
    hair: boolean;
    bodyProportions: boolean;
    costume: boolean;
    colorPalette: boolean;
    accessories: boolean;
    overallIdentity: boolean;
  };
  genrePriorityFocus?: string;
}

export interface MasterArtBible {
  medium: string;
  renderingTechnique: string;
  lineQuality: string;
  brushCharacter: string;
  texture: string;
  colorTreatment: string;
  contrast: string;
  lighting: string;
  compositionRules: string;
  realismPercent: number;
  stylizationPercent: number;
  facialRendering: string;
  backgroundTreatment: string;
  visualDensity: string;
  perspective: string;
  mood: string;
  summaryPromptProfile: string;
  isLocked: boolean;
}

export type ConsistencyStatus = 'CONSISTENT' | 'MINOR_DRIFT' | 'SIGNIFICANT_DRIFT' | 'MAJOR_ERROR';

export type ConsistencyDriftCategory = 
  | 'character_face' 
  | 'hair' 
  | 'clothing' 
  | 'body_proportions' 
  | 'color_palette' 
  | 'art_medium' 
  | 'line_quality' 
  | 'lighting' 
  | 'environment' 
  | 'visual_density' 
  | 'chapter_style';

export type SuggestedAuditAction = 'REGENERATE' | 'CORRECT_CHARACTER' | 'CORRECT_STYLE' | 'CORRECT_COLOR';

export interface ConsistencyAuditItem {
  id: string;
  targetTitle: string;
  chapterNumber?: number;
  pageNumber?: number;
  status: ConsistencyStatus;
  driftCategory: ConsistencyDriftCategory;
  issueDescription: string;
  suggestedAction: SuggestedAuditAction;
  imageUrl?: string;
}

export interface VisualConsistencyAuditReport {
  timestamp: string;
  overallStatus: ConsistencyStatus;
  score: number; // 0-100
  evaluatedCount: number;
  items: ConsistencyAuditItem[];
}

export interface ChapterStyleVariation {
  overrideMode: 'master' | 'variation';
  variationType: 'noir' | 'dream_sequence' | 'flashback' | 'warm_memory' | 'high_action' | 'surreal' | 'custom';
  customPrompt: string;
  paletteOverride?: string[];
  lightingOverride?: string;
}

export interface SceneReferenceOverride {
  sceneId: string;
  referenceImageUrl?: string;
  influenceTarget: 'architecture' | 'clothing' | 'lighting' | 'mood' | 'props' | 'custom';
  instructions: string;
}

export interface StyleMixerAssignments {
  lineworkRefId?: string;
  colorRefId?: string;
  characterRefId?: string;
  backgroundRefId?: string;
  lightingRefId?: string;
  textureRefId?: string;
  paletteRefId?: string;
  compositionRefId?: string;
  lineworkReferenceId?: string;
  colorPaletteReferenceId?: string;
  characterRenderingReferenceId?: string;
  backgroundEnvironmentReferenceId?: string;
  backgroundReferenceId?: string;
  lightingMoodReferenceId?: string;
  lightingReferenceId?: string;
  textureSurfaceReferenceId?: string;
  textureReferenceId?: string;
}

export interface ReferenceStudioState {
  references: VisualReferenceItem[];
  characters: CharacterReferenceCard[];
  masterArtBible: MasterArtBible;
  matchMyReferences: boolean;
  activeGenre?: string;
  referenceInfluence: 'low' | 'moderate' | 'strong';
  characterReferenceInfluence: 'low' | 'moderate' | 'strong';
  colorReferenceInfluence: 'low' | 'moderate' | 'strong';
  referenceInfluencePercent: number;
  characterInfluencePercent: number;
  colorInfluencePercent: number;
  chapterStyleOverrides: Record<string, ChapterStyleVariation>;
  sceneOverrides: Record<string, SceneReferenceOverride>;
  styleMixer: StyleMixerAssignments;
  mixerAssignments?: StyleMixerAssignments;
  lastConsistencyAudit?: VisualConsistencyAuditReport;
  latestAuditReport?: VisualConsistencyAuditReport;
  extractedPalette?: string[];
}

export interface AiModelConfig {
  textModel: string;
  imageModel: string;
  fastModel: string;
  reasoningModel: string;
  temperature: number;
  topP: number;
}

// ==========================================
// STRUCTURED STORY INPUT SYSTEM DATA TYPES
// ==========================================

export type FactTier = 'USER_FACT' | 'USER_PREFERENCE' | 'AI_SUGGESTION' | 'AI_INFERRED';

export interface FieldItem<T = string> {
  value: T;
  tier: FactTier;
  originalSuggestion?: T;
  options?: T[];
  isSkipped?: boolean;
}

export type StoryArchetype = 
  | 'universal'
  | 'illustrated_novel'
  | 'comic'
  | 'graphic_novel'
  | 'satire'
  | 'dark_comedy'
  | 'mystery'
  | 'thriller'
  | 'romance'
  | 'fantasy'
  | 'sci_fi'
  | 'historical_fiction'
  | 'adventure'
  | 'horror'
  | 'absurdist'
  | 'literary_fiction'
  | 'illustrated_essay'
  | 'writing_manual'
  | 'monograph'
  | 'handbook'
  | 'textbook'
  | 'trivia'
  | 'pop_science'
  | 'narrative_nonfiction'
  | 'biography'
  | 'character_workshop'
  | 'plot_workshop'
  | 'dilemma_workshop';

export interface RunningGagItem {
  id: string;
  title: string;
  firstAppearance: FieldItem;
  escalation: FieldItem;
  variation: FieldItem;
  payoff: FieldItem;
}

export interface ComicPanelInput {
  id: string;
  sceneTitle: string;
  location: FieldItem;
  characters: FieldItem;
  whatHappens: FieldItem;
  importantDialogue: FieldItem;
  visualJoke: FieldItem;
  emotionalBeat: FieldItem;
  finalPanel: FieldItem;
  pageTurnSurprise: FieldItem;
}

export interface SuspectItem {
  id: string;
  name: string;
  motive: FieldItem;
  means: FieldItem;
  opportunity: FieldItem;
  secret: FieldItem;
  alibi: FieldItem;
  relationshipToVictim: FieldItem;
  whatTheyAreHiding: FieldItem;
  isLying: FieldItem<boolean>;
}

export interface ClueItem {
  id: string;
  clueName: string;
  whatItReveals: FieldItem;
  whoDiscoversIt: FieldItem;
  whenDiscovered: FieldItem;
  appearsToMean: FieldItem;
  actuallyMeans: FieldItem;
  isRedHerring: FieldItem<boolean>;
}

export interface SubplotItem {
  id: string;
  title: string;
  charactersInvolved: FieldItem;
  purpose: FieldItem;
  conflict: FieldItem;
  connectionToMainPlot: FieldItem;
  resolution: FieldItem;
}

export interface DilemmaChainItem {
  id: string;
  step: number;
  dilemma: string;
  decision: string;
  consequence: string;
}

export interface InterlockingDilemma10 {
  dilemma1: { title: string; prompt: string; choiceA: string; choiceB: string }; // 1. Immediate practical problem
  dilemma2: { title: string; prompt: string; choiceA: string; choiceB: string }; // 2. Personal consequence
  dilemma3: { title: string; prompt: string; choiceA: string; choiceB: string }; // 3. Relationship complication
  dilemma4: { title: string; prompt: string; choiceA: string; choiceB: string }; // 4. Moral conflict
  dilemma5: { title: string; prompt: string; choiceA: string; choiceB: string }; // 5. Unexpected consequence
  dilemma6: { title: string; prompt: string; choiceA: string; choiceB: string }; // 6. False solution
  dilemma7: { title: string; prompt: string; choiceA: string; choiceB: string }; // 7. Reversal
  dilemma8: { title: string; prompt: string; choiceA: string; choiceB: string }; // 8. Irreversible choice
  dilemma9: { title: string; prompt: string; choiceA: string; choiceB: string }; // 9. New problem caused by the choice
  dilemma10: { title: string; prompt: string; choiceA: string; choiceB: string }; // 10. Long-term consequence
}

export interface ClueBoardEntry {
  id: string;
  clue: string;
  character: string;
  location: string;
  timeline: string;
  interpretation: string;
  actualMeaning: string;
  isRedHerring: boolean;
}

export interface GenreExerciseResult {
  id: string;
  genre: StoryArchetype;
  exerciseTitle: string;
  tagline: string;
  instructions: string;
  constraints: string[];
  starterPrompt: string;
  aiFeedbackCriteria: string[];
}

export interface StoryInputFormData {
  // Universal Story Input
  coreIdea: FieldItem;
  oneSentencePremise: FieldItem;
  centralCharacter: FieldItem;
  characterWant: FieldItem; // External Goal
  characterNeed: FieldItem; // Internal Need
  obstacle: FieldItem;      // Primary Obstacle
  stakes: FieldItem;        // What happens if failed
  uniqueHook: FieldItem;     // What makes this different
  tone: FieldItem;          // Tone choice
  customTone?: FieldItem;
  endingPreference: FieldItem;

  // Illustrated Novel
  theme?: FieldItem;
  setting?: FieldItem;
  timePeriod?: FieldItem;
  narrativePerspective?: FieldItem;
  narrativeVoice?: FieldItem;
  desiredLength?: FieldItem;
  targetChaptersCount?: FieldItem<number>;
  illustrationFrequency?: FieldItem;
  
  protagonistName?: FieldItem;
  protagonistAge?: FieldItem;
  protagonistOccupation?: FieldItem;
  protagonistPersonality?: FieldItem;
  protagonistDesire?: FieldItem;
  protagonistFear?: FieldItem;
  protagonistSecret?: FieldItem;
  protagonistFlaw?: FieldItem;
  protagonistStrength?: FieldItem;
  protagonistFalseBelief?: FieldItem;
  protagonistMoralBoundary?: FieldItem;
  protagonistChangeTrigger?: FieldItem;

  antagonisticForceType?: FieldItem; // Person, Institution, Society, Nature, Internal, Circumstance, Combination
  antagonisticDescription?: FieldItem;

  characterArcBeginning?: FieldItem;
  characterArcPressure?: FieldItem;
  characterArcChoices?: FieldItem;
  characterArcFailures?: FieldItem;
  characterArcRealization?: FieldItem;
  characterArcPointOfNoReturn?: FieldItem;
  characterArcFinalTransformation?: FieldItem;

  selectedDilemmas?: string[];
  customDilemmas?: string[];
  subplots?: SubplotItem[];

  // Comic
  comicGenre?: FieldItem;
  comicTargetAudience?: FieldItem;
  comicHumorStyle?: FieldItem;
  comicVisualStyle?: FieldItem;
  comicPagesCount?: FieldItem<number>;
  comicPanelsPerPage?: FieldItem<number>;
  comicVisuallyFunnyTrait?: FieldItem;
  comicRecurringBehavior?: FieldItem;
  comicGreatestWeakness?: FieldItem;
  comicVisualGag?: FieldItem;
  comicComedicEngine?: string[];
  comicRunningGags?: RunningGagItem[];
  comicPanelScenes?: ComicPanelInput[];

  // Graphic Novel
  cinematicPremise?: FieldItem;
  visualHook?: FieldItem;
  gnProtagonistContradiction?: FieldItem;
  gnAntagonistPhilosophy?: FieldItem;
  gnAntagonistRelationship?: FieldItem;
  gnAntagonistRightReason?: FieldItem;
  act1IncitingIncident?: FieldItem;
  act1FirstReversal?: FieldItem;
  act2Escalation?: FieldItem;
  act2MidpointRevelation?: FieldItem;
  act2MajorDefeat?: FieldItem;
  act3FinalConfrontation?: FieldItem;
  act3ClimaxChoice?: FieldItem;
  act3Aftermath?: FieldItem;
  shownInsteadOfExplained?: FieldItem;
  recurringVisualSymbol?: FieldItem;
  memorableImage?: FieldItem;

  // Satire
  satireTarget?: FieldItem;
  satireAbsurdRule?: FieldItem;
  satireMechanism?: FieldItem;
  satiricalPosition?: FieldItem;
  degreeOfSatire?: FieldItem;
  centralIrony?: FieldItem;
  protagonistBeliefVsReality?: FieldItem;
  satireEscalationStage1?: FieldItem;
  satireEscalationStage2?: FieldItem;
  satireEscalationStage3?: FieldItem;
  satireEscalationStage4?: FieldItem;
  satireEscalationStage5?: FieldItem;

  // Illustrated Novel
  visualProseRelationship?: FieldItem;
  artStyleDescriptor?: FieldItem;

  // Dark Comedy
  uncomfortableSubject?: FieldItem;
  moralContradiction?: FieldItem;
  comicPerspective?: FieldItem;
  emotionalBoundarySerious?: FieldItem;
  emotionalBoundaryFunny?: FieldItem;
  emotionalBoundaryNeverCheap?: FieldItem;
  darkComedyTerribleChoice?: FieldItem;
  darkComedyWorstProblem?: FieldItem;

  // Mystery / Detective
  mysteryWhatHappened?: FieldItem;
  mysteryCrimeType?: FieldItem;
  mysteryVictim?: FieldItem;
  mysteryMethod?: FieldItem;
  mysterySolution?: FieldItem;
  mysteryAppearsResponsible?: FieldItem;
  mysteryActuallyResponsible?: FieldItem;
  mysteryConcealedTruth?: FieldItem;
  detectiveName?: FieldItem;
  detectiveMotivation?: FieldItem;
  detectiveExpertise?: FieldItem;
  detectiveFlaw?: FieldItem;
  detectivePersonalStake?: FieldItem;
  detectiveSecret?: FieldItem;
  suspectMatrix?: SuspectItem[];
  clueSystem?: ClueItem[];
  revelationStructure?: {
    earlyClue: FieldItem;
    misleadingInterpretation: FieldItem;
    secondClue: FieldItem;
    contradiction: FieldItem;
    majorRevelation: FieldItem;
    finalClue: FieldItem;
    truth: FieldItem;
  };

  // Thriller
  thrillerThreat?: FieldItem;
  thrillerClock?: FieldItem;
  thrillerEscapeCost?: FieldItem;
  thrillerParanoiaFactor?: FieldItem;
  thrillerVictim?: FieldItem;
  thrillerAntagonist?: FieldItem;
  thrillerDeadline?: FieldItem;
  thrillerProtagonistUnknown?: FieldItem;
  thrillerAntagonistKnows?: FieldItem;
  thrillerResourceLacking?: FieldItem;
  thrillerEscalationStages?: string[];

  // Romance
  romanceCharacterA?: {
    name: FieldItem;
    want: FieldItem;
    need: FieldItem;
    fear: FieldItem;
    wound: FieldItem;
    expectation: FieldItem;
  };
  romanceCharacterB?: {
    name: FieldItem;
    want: FieldItem;
    need: FieldItem;
    fear: FieldItem;
    wound: FieldItem;
    expectation: FieldItem;
  };
  romanceBarrier?: FieldItem;
  romanceExternalConflict?: FieldItem;
  romanceIntimacyMoment?: FieldItem;
  romanceAttractionReason?: FieldItem;
  romanceWhyShouldNotBeTogether?: FieldItem;
  romanceObstacleExternal?: FieldItem;
  romanceObstacleInternal?: FieldItem;
  romanceObstacleSocial?: FieldItem;
  romanceObstacleEmotional?: FieldItem;
  romanceArcStages?: string[];

  // Fantasy
  fantasyGeography?: FieldItem;
  fantasyKingdoms?: FieldItem;
  fantasyCultures?: FieldItem;
  fantasyReligion?: FieldItem;
  fantasyPolitics?: FieldItem;
  fantasyEconomy?: FieldItem;
  fantasyMagicSystem?: FieldItem;
  fantasyMagicCost?: FieldItem;
  fantasyAncientSecret?: FieldItem;
  magicCapabilities?: FieldItem;
  magicLimits?: FieldItem;
  magicCost?: FieldItem;
  magicControllers?: FieldItem;
  magicAbuseConsequences?: FieldItem;
  fantasyProtagonistOrdinary?: FieldItem;
  fantasyProtagonistHiddenAbility?: FieldItem;
  fantasyQuestObjective?: FieldItem;
  fantasyQuestStakes?: FieldItem;
  fantasyDilemmasSelected?: string[];

  // Sci-Fi
  speculativePremise?: FieldItem;
  sciFiNovum?: FieldItem;
  sciFiSocialConsequence?: FieldItem;
  sciFiPowerStructure?: FieldItem;
  scifiWhatBecomesPossible?: FieldItem;
  scifiWhatBecomesImpossible?: FieldItem;
  scifiWhoBenefits?: FieldItem;
  scifiWhoLoses?: FieldItem;
  scifiUnintendedConsequence?: FieldItem;
  scifiTechCapabilities?: FieldItem;
  scifiTechLimitations?: FieldItem;
  scifiTechCost?: FieldItem;
  scifiTechSideEffects?: FieldItem;
  scifiEthicalDilemmas?: string[];
  scientificConsistency?: FieldItem; // 'Hard science' | 'Moderate science' | 'Soft science' | 'Science-inspired fantasy'

  // Historical Fiction
  historicalPeriod?: FieldItem;
  historicalLocation?: FieldItem;
  historicalMajorEvents?: FieldItem;
  historicalSocialClass?: FieldItem;
  historicalOccupation?: FieldItem;
  historicalFamilyStructure?: FieldItem;
  historicalTechTransport?: FieldItem;
  historicalCharacterExperience?: FieldItem;
  historicalThreatToGoal?: FieldItem;
  historicalCharacterMisunderstanding?: FieldItem;
  historicalPressuresSelected?: string[];

  // Adventure
  adventureDestination?: FieldItem;
  adventureObjective?: FieldItem;
  adventureTreasureOrObject?: FieldItem;
  adventureWhyItMatters?: FieldItem;
  adventureCompanions?: FieldItem;
  adventureRivals?: FieldItem;
  adventureDanger?: FieldItem;
  adventureUnknownTerritory?: FieldItem;
  adventureDeadline?: FieldItem;
  adventureObstacleLadder?: {
    physical: FieldItem;
    environmental: FieldItem;
    social: FieldItem;
    strategic: FieldItem;
    personal: FieldItem;
    moral: FieldItem;
    finalObstacle: FieldItem;
  };

  // Horror
  horrorSourceOfFear?: FieldItem;
  horrorFirstAnomaly?: FieldItem;
  horrorEntityRule?: FieldItem;
  horrorRationalCoverup?: FieldItem;
  horrorKnownThreat?: FieldItem;
  horrorUnknownThreat?: FieldItem;
  horrorSetting?: FieldItem;
  horrorIsolationFactor?: FieldItem;
  horrorForbiddenKnowledge?: FieldItem;
  horrorCharacterVulnerability?: FieldItem;
  horrorFearEscalation?: string[];
  horrorSacrificeDilemma?: FieldItem;

  // Absurdist
  absurdistNormalReality?: FieldItem;
  absurdistImpossibleRule?: FieldItem;
  absurdistRemainsOrdinary?: FieldItem;
  absurdistBecomesStrange?: FieldItem;
  absurdistAcceptedWithoutQuestion?: FieldItem;
  absurdistProtagonistRefusesToAccept?: FieldItem;
  absurdistEscalationStages?: string[];

  // Literary Fiction
  literaryCentralQuestion?: FieldItem;
  literaryEmotionalWound?: FieldItem;
  literaryUnspokenDesire?: FieldItem;
  literaryRelationship?: FieldItem;
  literaryMemory?: FieldItem;
  literaryMoralConflict?: FieldItem;
  literarySymbol?: FieldItem;
  literaryRecurringImage?: FieldItem;
  literaryTheme?: FieldItem;
  literarySaysWantVsAction?: FieldItem;
  literaryUnwillingToAdmit?: FieldItem;
  literaryTruthForceChange?: FieldItem;

  // Illustrated Essay
  essayCentralArgument?: FieldItem;
  essayQuestion?: FieldItem;
  essayThesis?: FieldItem;
  essayAudience?: FieldItem;
  essayEvidence?: FieldItem;
  essayCounterargument?: FieldItem;
  essayPersonalExperience?: FieldItem;
  essayVisualMetaphors?: FieldItem;
  essayConclusion?: FieldItem;

  // Creative-Writing Manual
  manualLearningObjective?: FieldItem;
  manualAudience?: FieldItem; // Beginner, Intermediate, Advanced, Professional
  manualSubject?: FieldItem;  // Character, Plot, Dialogue, Worldbuilding, Humor, etc.
  manualTeachingStyle?: FieldItem; // Academic, Workshop, Conversational, Witty, Sarcastic, etc.
  manualPracticalOutput?: FieldItem;
  manualExerciseTiers?: {
    easy: FieldItem;
    standard: FieldItem;
    difficult: FieldItem;
    professional: FieldItem;
    absurd: FieldItem;
    realWorld: FieldItem;
  };

  // Adaptive Genre System & Hybrid Layer Engine
  secondaryArchetype?: StoryArchetype | null;
  enabledLayers?: string[];

  // Monograph & Academic Nonfiction
  researchSubject?: FieldItem;
  centralThesis?: FieldItem;
  researchQuestion?: FieldItem;
  researchScope?: FieldItem;
  methodology?: FieldItem;
  methodologyType?: string;
  scholarlyTone?: string;
  evidenceTypes?: FieldItem;
  counterarguments?: FieldItem;

  // Practical Handbook & Standard Guide
  handbookPurpose?: FieldItem;
  handbookAudience?: FieldItem;
  handbookContentType?: string;
  handbookOrganization?: string;
  handbookKeyProcedures?: FieldItem;
  handbookChecklists?: FieldItem;

  // Trivia & Fact Knowledge Book
  triviaCategory?: FieldItem;
  questionFormat?: string;
  difficultyDistribution?: string;
  triviaFactsSample?: FieldItem;

  // Pop-Science & Inquiry
  popScienceCentralQuestion?: FieldItem;
  popScienceDomain?: FieldItem;
  explanationStyle?: string;
  audienceScienceLevel?: string;

  // Specialized Engine Enums
  satireEngine?: string;
  satirePov?: string;
  dreadSource?: string;
  dreadPacing?: string;
  graphicNovelPacing?: string;
  artisticMediumStyle?: string;

  // Dedicated Workshops
  characterWorkshopQuestions?: { [key: string]: FieldItem };
  plotWorkshopMovements?: { [key: string]: FieldItem };
  dilemmaDrivenChain?: DilemmaChainItem[];
}

// Master 11-point Story Blueprint
export interface StoryBlueprint {
  id: string;
  archetype: StoryArchetype;
  title: string;
  subtitle: string;
  author: string;
  createdAt: string;
  status: 'draft' | 'approved';

  // 1. Premise
  premise: string;
  // 2. Story promise
  storyPromise: string;
  // 3. Main characters (with locked traits, goals, wounds, secrets)
  mainCharacters: Array<{
    name: string;
    role: 'protagonist' | 'antagonist' | 'supporting' | 'mentor' | 'foil';
    lockedTraits: string[];
    bio: string;
    externalGoal: string;
    internalNeed: string;
    flaw: string;
    secret: string;
    voiceStyle: string;
  }>;
  // 4. Character arcs
  characterArcs: Array<{
    characterName: string;
    startingState: string;
    catalystPressure: string;
    midpointShift: string;
    pointOfNoReturn: string;
    finalTransformation: string;
  }>;
  // 5. Central conflict
  centralConflict: {
    coreOpposingForces: string;
    philosophicalStakes: string;
    consequencesOfFailure: string;
  };
  // 6. Major dilemmas
  majorDilemmas: Array<{
    title: string;
    choiceA: string;
    costA: string;
    choiceB: string;
    costB: string;
    thematicWeight: string;
  }>;
  // 7. Escalation structure
  escalationStructure: Array<{
    stage: number;
    title: string;
    description: string;
    causalTrigger: string;
  }>;
  // 8. Subplots
  subplots: Array<{
    name: string;
    characters: string[];
    coreTension: string;
    connectionToMainPlot: string;
    resolutionBeat: string;
  }>;
  // 9. Chapter architecture
  chapterArchitecture: Array<{
    chapterNumber: number;
    title: string;
    summary: string;
    coreSceneBeats: string[];
    visualPromptOrIllustrationNote?: string;
    continuityFactsEstablished: string[];
  }>;
  // 10. Visual direction
  visualDirection: {
    visualTone: string;
    colorPalette: string[];
    recurringSymbols: string[];
    pageLayoutStyle: string;
    artNotes: string;
  };
  // 11. Ending strategy
  endingStrategy: {
    thematicResolution: string;
    characterPayoff: string;
    finalImage: string;
    lingeringResonance: string;
  };

  // Mystery Ledger if applicable
  mysteryLedger?: {
    culprit: string;
    motive: string;
    keyEvidenceSequence: string[];
    redHerrings: string[];
  };

  // Manual exercises if applicable
  writingManualCurriculum?: Array<{
    lessonTitle: string;
    concept: string;
    easyExercise: string;
    standardExercise: string;
    difficultExercise: string;
    professionalChallenge: string;
    absurdChallenge: string;
    realWorldApplication: string;
  }>;
}

// User-saved Form Templates
export interface StoryTemplate {
  id: string;
  name: string;
  archetype: StoryArchetype;
  description: string;
  createdAt: string;
  isBuiltIn?: boolean;
  data: StoryInputFormData;
}

// Power Tool Data Types
export interface MakeRicherResult {
  whyThisHelps: string;
  suggestedSubplots: Array<{ title: string; characters: string; conflict: string; payoff: string }>;
  characterTensions: Array<{ characters: string; tension: string; subtext: string }>;
  hiddenSecrets: Array<{ bearer: string; secret: string; discoveryTrigger: string }>;
  reversalsAndTwists: Array<{ timing: string; reversal: string; whyItWorks: string }>;
  moralDilemmas: Array<{ choice: string; stakes: string }>;
  recurringMotifs: Array<{ symbol: string; meaning: string; appearanceLocations: string }>;
  foreshadowingBeats: string[];
}

export interface MakeHarderResult {
  weakAreasIdentified: string[];
  obstacles: Array<{
    id: string;
    category: 'Physical' | 'Emotional' | 'Social' | 'Financial' | 'Moral' | 'Intellectual' | 'Relational' | 'Time-based' | 'Existential';
    challenge: string;
    howItComplicatesGoal: string;
    status: 'pending' | 'accepted' | 'replaced' | 'combined' | 'rejected';
  }>;
}

export interface WhatCouldGoWrongResult {
  plausibleConsequences: string[];
  severeConsequences: string[];
  unexpectedConsequences: string[];
  weaknessAttackingConsequence: string;
  futurePlotOpportunityConsequence: string;
}

export interface NovelistsRoomResult {
  whatIsWorking: string[];
  whereIsTooEasy: string[];
  whereIsProtagonistPassive: string[];
  whereStakesAreUnclear: string[];
  subplotsNeedingExpansion: string[];
  relationshipsNeedingPressure: string[];
  reversalOpportunities: string[];
  predictableMoments: string[];
  unresolvedThreadsToReturn: string[];
  deepeningDilemmaProposal: string;
  unnecessaryElementsToRemove: string[];
  actionableAlternatives: Array<{
    title: string;
    action: string;
    impact: string;
  }>;
}

export interface ArtDirectorCritiqueResult {
  aestheticCritique: string;
  typographyCritique: string;
  colorHarmonyCritique: string;
  artMediumCohesionCritique: string;
  specificActionableImprovements: string[];
  recommendedProfilePatch?: Partial<MasterStyleProfile>;
}


