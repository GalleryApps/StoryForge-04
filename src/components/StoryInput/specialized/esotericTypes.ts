export interface EsotericSchemaState {
  // Part I — Book Identity & Soul (12 Fields)
  workingTitle: string;
  subtitle: string;
  volumeSeries: string;
  authorPersona: string;
  invocationQuote: string;
  dedication: string;
  targetPageCount: string;
  targetReaderAge: string;
  readerPriorKnowledge: string;
  readerStance: string;
  whyThisBookNow: string;
  secretThesis: string;

  // Part II — Subtype & Core Approach (10 Fields)
  primaryTradition: string;
  secondaryTradition: string;
  tertiaryTradition: string;
  primaryApproach: string;
  secondaryApproach: string;
  scholarlyStance: string;
  controversyLevel: string;
  uncertaintyApproach: string;
  temporalFocus: string;
  geographicFocus: string;
  languageFocus: string;
  mysteryLevel: string;

  // Part III — Narrative & Experiential Engine (12 Fields)
  narrativeFrame: string;
  narrativeVoice: string;
  companionCharacter: string;
  openingHook: string;
  chapterOpeningStyle: string;
  chapterClosingStyle: string;
  evidencePresentation: string;
  personalReflectionFrequency: string;
  readerParticipation: string[];
  humorLevity: string;
  momentsOfWonder: string;
  endingStyle: string;

  // Part IV — Structure & Content Modules (12 Fields)
  coreModules: string[];
  moduleOrdering: string;
  depthPerModule: string;
  visualModuleMix: string;
  caseStudies: string;
  sidebarsCallouts: string[];
  appendicesContent: string[];
  footnotesStyle: string;
  indexTypes: string[];
  crossReferenceStyle: string;
  chapterLength: string;
  chapterCount: string;

  // Part V — Exercises & Interactive Drills (8 Fields)
  exerciseTypes: string[];
  exerciseDifficultyCurve: string;
  answerKeyGuidance: string;
  creativeExercises: string[];
  criticalThinkingDrills: string[];
  personalReflectionTypes: string[];
  groupExercises: string[];
  activeExercisePrompt: string;

  // Part VI — Visual Style & Symbolic Language (8 Fields)
  primaryVisualStyle: string;
  secondaryVisualStyle: string;
  colorPalette: string;
  symbolRenderingStyle: string;
  illustrationSources: string[];
  decorativeElements: string[];
  typographyMood: string;
  imageDensity: string;

  // Part VII — Voice, Tone & Atmosphere (8 Fields)
  primaryTone: string;
  secondaryTone: string;
  jargonLevel: string;
  metaphorStyle: string;
  sentenceRhythm: string;
  intimacyLevel: string;
  suspenseMysteryLevel: string;
  spiritualSecularBalance: string;

  // Part VIII — Publishing & Output (10 Fields)
  primaryOutput: string;
  secondaryOutputs: string[];
  pageSize: string;
  orientation: string;
  marginsBleed: string;
  typographyPreset: string;
  specialistFonts: string[];
  coverType: string;
  tableOfContents: string;
  endMatter: string[];

  // 15 Dilemma Chain Resolutions
  dilemmaResolutions: Record<string, string>;
}

export const DEFAULT_ESOTERIC_SCHEMA: EsotericSchemaState = {
  workingTitle: 'The Architecture of the Hidden Light',
  subtitle: 'A Practical Guide to Renaissance Hermeticism & Sacred Geometry',
  volumeSeries: 'Single Volume',
  authorPersona: 'Curious Investigator',
  invocationQuote: 'As above, so below; as within, so without.',
  dedication: 'To the seekers of geometric harmony and historic truth.',
  targetPageCount: '200-300 (Comprehensive)',
  targetReaderAge: '25-40',
  readerPriorKnowledge: 'Some (Dabbler)',
  readerStance: 'Curious Outsider',
  whyThisBookNow: 'Bridging ancient symbolic intuition with modern cognitive clarity.',
  secretThesis: 'Geometry and symbol are cognitive mirrors, not supernatural physics.',

  primaryTradition: 'Hermetic Philosophy',
  secondaryTradition: 'Sacred Geometry',
  tertiaryTradition: 'Alchemy',
  primaryApproach: 'Symbolic',
  secondaryApproach: 'Historical',
  scholarlyStance: 'Hybrid (Both perspectives)',
  controversyLevel: 'Moderately Controversial',
  uncertaintyApproach: 'Present Competing Views',
  temporalFocus: 'Renaissance',
  geographicFocus: 'Italy',
  languageFocus: 'Greek & Latin Translations',
  mysteryLevel: 'Balanced',

  narrativeFrame: 'Apprentice’s Quest',
  narrativeVoice: 'First Person (Author’s Journey)',
  companionCharacter: 'Skeptical Friend',
  openingHook: 'Historical Mystery',
  chapterOpeningStyle: 'Epigraph',
  chapterClosingStyle: 'Reflective Question',
  evidencePresentation: 'Side-by-Source & Commentary',
  personalReflectionFrequency: 'End of Each Chapter',
  readerParticipation: ['Margin Questions', 'Symbol-Drawing Exercises', 'Journal Prompts'],
  humorLevity: 'Witty (Frequent)',
  momentsOfWonder: 'Frequent',
  endingStyle: 'Open Question',

  coreModules: [
    'Introduction',
    'Historical Background',
    'Terminology & Glossary',
    'Primary Sources',
    'Interpretations',
    'Symbolism',
    'Comparative Analysis',
    'Exercises & Reflection',
    'Correspondence Tables',
    'Timeline',
    'Visual Gallery',
    'Bibliography',
  ],
  moduleOrdering: 'Difficulty (Simple→Complex)',
  depthPerModule: 'Standard (10-20 pp)',
  visualModuleMix: 'Text with Diagrams',
  caseStudies: '1 Per Chapter',
  sidebarsCallouts: ['Glossaries', 'Anecdotes', 'Did You Know?', 'Myths vs Facts'],
  appendicesContent: ['Timeline', 'Glossary', 'Bibliography', 'Correspondence Tables', 'Symbol Dictionary'],
  footnotesStyle: 'Bottom of Page',
  indexTypes: ['Topic', 'Name', 'Symbol'],
  crossReferenceStyle: 'Standard',
  chapterLength: 'Medium (10-20 pp)',
  chapterCount: '10',

  exerciseTypes: ['Warm-Up', 'Core Exercise', 'Experiment', 'Reflection', 'Creative Project'],
  exerciseDifficultyCurve: 'Gentle (Slow ramp)',
  answerKeyGuidance: 'Annotated Explanations',
  creativeExercises: ['Symbol Drawing', 'Invent a Correspondence'],
  criticalThinkingDrills: ['Identify Assumptions', 'Evaluate Sources', 'Detect Fallacy'],
  personalReflectionTypes: ['Journal Prompts', 'Personal Mapping'],
  groupExercises: ['Discussion Questions', 'Collaborative Interpretation'],
  activeExercisePrompt: '',

  primaryVisualStyle: 'Renaissance Illustration',
  secondaryVisualStyle: 'Modern Geometric',
  colorPalette: 'Parchment & Ink (Sepia/Black)',
  symbolRenderingStyle: 'Geometric Precision',
  illustrationSources: ['Historical Public Domain', 'AI-Generated'],
  decorativeElements: ['Drop Caps', 'Page Borders', 'Chapter Headers', 'Marginalia'],
  typographyMood: 'Ancient & Sacred',
  imageDensity: '3-5 Per Chapter',

  primaryTone: 'Philosophical & Reflective',
  secondaryTone: 'Humorous & Witty',
  jargonLevel: 'Standard Academic',
  metaphorStyle: 'Architectural',
  sentenceRhythm: 'Varied',
  intimacyLevel: 'Warm & Personal',
  suspenseMysteryLevel: 'Suggestive (Hint at Mystery)',
  spiritualSecularBalance: 'Spiritually Sympathetic',

  primaryOutput: 'Both (PDF & EPUB)',
  secondaryOutputs: ['Markdown', 'HTML'],
  pageSize: '7×10" (Academic / Illustrated)',
  orientation: 'Portrait',
  marginsBleed: 'Normal (Bleed: 3mm)',
  typographyPreset: 'Literary Renaissance',
  specialistFonts: ['Greek', 'Latin', 'Hebrew'],
  coverType: 'AI-Designed Archival',
  tableOfContents: 'Detailed with Icons',
  endMatter: ['Bibliography', 'Symbol Index', 'Colophon', 'About Author'],

  dilemmaResolutions: {
    'Belief vs. Analysis': 'Balanced',
    'Esoteric vs. Exoteric': 'Reveal some',
    'Historical vs. Practical': 'Both',
    'Unity vs. Diversity': 'Comparative',
    'Progress vs. Decline': 'Cycle',
    'Academic vs. Accessible': 'Both',
    'Serious vs. Humorous': 'Witty',
    'Abstract vs. Concrete': 'Both',
    'Mystery vs. Clarity': 'Balance',
    'Personal vs. Objective': 'Author’s journey',
    'Linear vs. Spiral': 'Thematic',
    'Short vs. Long': 'Comprehensive',
    'Text vs. Image': 'Balanced',
    'Passive vs. Interactive': 'Experiential',
    'Closed vs. Open': 'Both',
  },
};

export const ESOTERIC_MAGIC_BUTTONS = [
  { id: 'find_weird', label: '🔮 Find the Weird', desc: 'Identify the most unusual, counterintuitive, or surprising aspect' },
  { id: 'add_character', label: '🎭 Add a Character', desc: 'Generate a fictional student, skeptic, or mentor dialogue partner' },
  { id: 'tell_story', label: '📖 Tell the Story', desc: 'Convert dry symbolic facts into a dramatic narrative scene' },
  { id: 'challenge_this', label: '⚡ Challenge This', desc: 'AI argues against your thesis to sharpen critical rigour' },
  { id: 'find_paradox', label: '🌀 Find the Paradox', desc: 'Identify contradictions, antinomies, or mysteries in the material' },
  { id: 'make_visual', label: '🎨 Make It Visual', desc: 'Generate a visual plate prompt and diagrammatic structure' },
  { id: 'what_if', label: '💭 What If?', desc: 'Generate 3 speculative alternatives to the established interpretation' },
  { id: 'connect_modern', label: '🔗 Connect to Modern', desc: 'Find a contemporary cognitive or scientific parallel' },
  { id: 'add_humor', label: '😄 Add Humor', desc: 'Insert a clever Renaissance observation or witty analogy' },
  { id: 'ask_reader', label: '❓ Ask the Reader', desc: 'Generate an intriguing direct challenge question for the margins' },
  { id: 'personal_exp', label: '🌊 Personal Experience', desc: 'Generate a relatable personal anecdote or field discovery' },
  { id: 'add_mystery', label: '🕯️ Add Mystery', desc: 'Reframe the section to leave provocative open questions' },
  { id: 'balance_this', label: '⚖️ Balance This', desc: 'Add historical counter-perspectives to create epistemic tension' },
];
