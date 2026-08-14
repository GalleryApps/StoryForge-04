export interface PreliminaryPageConfig {
  halfTitle: { included: boolean; customTitle?: string };
  frontispiece: { type: 'None' | 'Symbol' | 'Illustration' | 'Historical image'; description?: string };
  titlePage: { fullTitle: string; subtitle: string; author: string; series: string };
  copyrightPage: { type: 'Standard' | 'Creative Commons' | 'Custom'; legalText?: string };
  dedication: { type: 'Person' | 'Abstract concept' | 'Tradition' | 'None'; text: string };
  epigraph: { type: 'Single quote' | 'Multiple quotes' | 'Symbol' | 'None'; quote: string; attribution: string };
  tableOfContents: { style: 'Simple' | 'Detailed' | 'Illustrated' | 'Annotated' };
  listOfFigures: { included: boolean };
  listOfTables: { included: boolean };
  foreword: { authorType: 'By author' | 'By guest scholar' | 'Skip'; guestName?: string; summary?: string };
  preface: { angle: 'Why this book' | 'How to use this book' | "Author's journey" | 'Skip'; text?: string };
  acknowledgments: { scope: 'Personal' | 'Academic' | 'Both' | 'Skip'; notes?: string };
}

export interface MainBodySectionConfig {
  // Section A: Introduction
  openingHookType: 'Dramatic scene' | 'Mysterious question' | 'Personal confession' | 'Historical mystery' | 'Weird fact' | 'Unexpected quote';
  openingHookText: string;
  whyTraditionMatters: string;
  scopeWhatBookCovers: string;
  scopeWhatBookDoesNotCover: string;
  howToUseBook: 'Reading path options' | 'Exercise approach' | 'Reference use' | 'Mastery path';
  authorRelationship: 'Insider' | 'Outsider' | 'Hybrid' | 'Skeptic' | 'Practitioner';
  keyTermsPreview: string[];
  scholarlyApproach: string;
  invitationToReader: string;

  // Section B: Historical & Contextual Foundation
  originsEmergence: string;
  developmentPhases: string[];
  keyFigures: Array<{ name: string; dates: string; contribution: string; keyText: string }>;
  keyTexts: Array<{ title: string; date: string; author: string; significance: string }>;
  culturalContext: string;
  transmissionHistory: string;

  // Section C: Conceptual & Philosophical Core
  coreConcepts: Array<{ name: string; definition: string; historicalUsage: string }>;
  keyPrinciples: Array<{ title: string; explanation: string; connection: string }>;
  cosmologyWorldview: string;
  metaphysics: string;
  epistemology: string;
  anthropology: string;
  eschatology: string;

  // Section D: Symbolic & Visual Language
  symbolSystemOverview: string;
  majorSymbols: Array<{ name: string; visualDesc: string; meanings: string; variations: string }>;
  diagramsMaps: string[];
  colorSymbolism: Array<{ color: string; meaning: string; usage: string }>;
  numberSymbolism: Array<{ number: string; meaning: string; combination: string }>;
  animalSymbolism: string;
  plantMineralSymbolism: string;
  sacredGeometry: string;

  // Section E: Practice & Application
  ritualStructure: string;
  keyPractices: Array<{ name: string; desc: string; purpose: string; instructions: string }>;
  meditationVisualization: string;
  correspondencesTable: string;
  interpretationMethods: string;
  practicalEthics: string;

  // Section F: Interpretations & Debates
  majorInterpretations: Array<{ scholarOrSchool: string; thesis: string }>;
  controversies: Array<{ controversy: string; positions: string; arguments: string }>;
  comparativeAnalysis: string;
  critiques: string;
  modernRelevance: string;
  unansweredQuestions: string[];

  // Section G: Advanced Study
  primarySourceAnalysis: string;
  detailedTextualStudy: string;
  advancedConcepts: string[];
  researchDirections: string;
  specializedTopics: string[];

  // Section H: Exercises & Engagement
  selectedExerciseTypes: string[];
  activeDrills: Array<{ type: string; prompt: string; difficulty: number }>;

  // Section I: Appendices
  includedAppendices: string[];
}

export interface EndMatterConfig {
  conclusionType: 'Summary' | 'Final thoughts' | 'Invitation' | 'Open questions';
  conclusionText: string;
  bibliographyTypes: string[];
  indexTypes: string[];
  aboutAuthorBio: string;
  colophonDetails: string;
}

export interface ChapterStructureConfig {
  numberingStyle: 'Roman' | 'Arabic' | 'Words' | 'Symbol';
  tone: 'Academic' | 'Mystical' | 'Humorous' | 'Dramatic' | 'Conversational' | 'Philosophical';
  pace: 'Slow (deep dive)' | 'Medium (balanced)' | 'Fast (overview)' | 'Variable';
  density: 'Light' | 'Standard' | 'Dense' | 'Expert';
  experience: 'Read' | 'Study' | 'Practice' | 'Reflect' | 'Create';
  journey: 'Beginning→Knowledge' | 'Question→Answer' | 'Mystery→Revelation' | 'Problem→Solution';
}

export interface ExerciseItem {
  id: string;
  title: string;
  type: 'Warm-Up' | 'Core' | 'Advanced' | 'Professional' | 'Experiment' | 'Reflection' | 'Creative' | 'Group';
  difficulty: number; // 1-10
  timeEstimate: '5 min' | '15 min' | '30 min' | '1 hour' | 'Multi-session';
  materialsNeeded: string;
  instructions: string;
  example?: string;
  expectedOutcome: string;
  selfAssessment: string;
}

export interface SidebarCalloutItem {
  id: string;
  category: 'sidebar' | 'callout';
  type: string;
  title: string;
  content: string;
  placement: string;
}

export interface NarrativeFrameConfig {
  frame: 'Chronological Journey' | 'Thematic Exploration' | 'Detective Investigation' | "Apprentice's Quest" | 'Dialogue/Debate' | 'Anthology of Voices' | 'Discover-as-You-Go' | 'Spiral Learning';
  device: 'Companion Character' | 'Historical Ghost' | 'Skeptical Interlocutor' | 'Mysterious Mentor' | 'Letters/Correspondence' | 'Journey Metaphor' | 'Unreliable Narrator' | 'Multiple Perspectives';
  companionName?: string;
  companionPersonality?: string;
}

export interface DilemmaChainConfig {
  // 7.1 Core Narrative Dilemmas
  revealDepth: 'Reveal all secrets' | 'Keep mysteries' | 'Reveal gradually';
  authorStance: 'Neutral scholar' | 'Passionate advocate' | 'Skeptical investigator';
  readerRelationship: 'Teacher-student' | 'Fellow traveler' | 'Provocateur';
  structureType: 'Linear learning' | 'Spiral deepening' | 'Thematic exploration';
  evidenceType: 'Pure primary' | 'Heavy scholarship' | 'Balanced';
  toneStyle: 'Academic' | 'Mystical' | 'Conversational';
  exerciseDensity: 'Many, active' | 'Few, reflective' | 'None, pure reading';

  // 7.2 Advanced Narrative Dilemmas
  narratorIdentity: 'Scholar' | 'Practitioner' | 'Both' | 'Collective voice';
  readerRole: 'Passive learner' | 'Active practitioner' | 'Critical analyst' | 'Co-explorer';
  mysteryLevel: 'Full revelation' | 'Partial revelation' | 'Evocative suggestion' | 'Initiation model';
  truthClaim: 'This is true' | 'This is one view' | 'This is a lens' | 'This is a mystery';
  endingType: 'Resolution' | 'Open question' | 'Call to action' | 'Return to beginning';
  chapterRelationship: 'Sequential' | 'Thematic clusters' | 'Interconnected web' | 'Independent units';
}

export interface BookMapChapter {
  chapterNumber: number;
  part: string;
  title: string;
  subtitle: string;
  epigraph: string;
  openingHook: string;
  subsections: string[];
  sidebars: string[];
  exercises: string[];
  conclusionNote: string;
}

export interface CustomizationDimensions {
  depth: 'Overview' | 'Standard' | 'Deep' | 'Masterclass';
  length: 'Short (50-100p)' | 'Medium (100-200p)' | 'Long (200-300p)' | 'Epic (300-500p)';
  structure: 'Linear' | 'Thematic' | 'Spiral' | 'Modular';
  readerRole: 'Passive' | 'Active' | 'Practitioner' | 'Co-creator';
  focus: 'History' | 'Concepts' | 'Symbols' | 'Practice' | 'Comparative';
  tone: 'Academic' | 'Mystical' | 'Humorous' | 'Dramatic' | 'Conversational';
  visualDensity: 'Text-only' | 'Occasional images' | 'Frequent images' | 'Visual-driven';
  exerciseDensity: 'None' | 'Few' | 'Moderate' | 'Many';
  scholarlyApparatus: 'Minimal' | 'Standard' | 'Extensive' | 'Critical edition';
}

export interface CompleteEsotericBlueprint {
  level1BookFrame: {
    preliminary: PreliminaryPageConfig;
    mainBody: MainBodySectionConfig;
    endMatter: EndMatterConfig;
  };
  level2ChapterStructure: ChapterStructureConfig;
  level3SectionStructure: {
    activeSectionType: 'Expository' | 'Analytical' | 'Interpretive' | 'Narrative' | 'Comparative' | 'Practical' | 'Reflective';
  };
  level4ExerciseArchitecture: {
    exercises: ExerciseItem[];
  };
  level5SidebarCallout: {
    items: SidebarCalloutItem[];
  };
  level6NarrativeEngine: NarrativeFrameConfig;
  level7DilemmaChain: DilemmaChainConfig;
  level9BookMap: BookMapChapter[];
  level10Customization: CustomizationDimensions;
}

export const SAMPLE_22_CHAPTER_BOOK_MAP: BookMapChapter[] = [
  // PART I: INTRODUCTION
  {
    chapterNumber: 1,
    part: 'PART I: INTRODUCTION',
    title: 'The Invitation to the Threshold',
    subtitle: 'Awakening the Esoteric Gaze in the Modern Era',
    epigraph: '"As above, so below, as within, so without, as the universe, so the soul." — The Emerald Tablet',
    openingHook: 'A mysterious leather-bound folio discovered in an unindexed archive in Florence questions our entire understanding of Renaissance consciousness.',
    subsections: ['What is the Hidden Tradition?', 'Why This Ancient Philosophy Matters Today', 'How to Navigate This Book', "The Author's Path from Skepticism to Awe"],
    sidebars: ['Definition: Esotericism vs Exotericism', 'Did You Know?: Isaac Newton wrote more on alchemy than physics'],
    exercises: ['Warm-Up: Daily Observation of Microcosmic Patterns', 'Reflection: Identifying Your Inherited Worldview'],
    conclusionNote: 'Crossing the threshold requires leaving dogmatic materialism at the door while maintaining rigorous critical discernment.',
  },
  {
    chapterNumber: 2,
    part: 'PART I: INTRODUCTION',
    title: 'First Encounters & The Epistemic Grammar',
    subtitle: 'The Vocabulary of Initiatic Transformation',
    epigraph: '"The lips of wisdom are closed, except to the ears of Understanding." — The Kybalion',
    openingHook: 'Why do all ancient mystical languages insist that literal definition destroys spiritual meaning?',
    subsections: ['Key Terms Preview & Etymology', 'The Big Picture: Microcosm and Macrocosm', 'What to Expect on the Journey Ahead', 'The Rules of Intellectual Safety'],
    sidebars: ['Myths vs Facts: The False Equation of Esotericism with Superstition', 'Scholarly Debate: Yates Thesis on Renaissance Magic'],
    exercises: ['Core Exercise: Translating Modern Jargon into Symbolic Metaphor', 'Self-Assessment: Cognitive Biases Diagnostic'],
    conclusionNote: 'Once the grammar of symbols is learned, the entire natural world begins to read like an open manuscript.',
  },

  // PART II: HISTORICAL FOUNDATIONS
  {
    chapterNumber: 3,
    part: 'PART II: HISTORICAL FOUNDATIONS',
    title: 'Origins in the Crucible of Antiquity',
    subtitle: 'Alexandria, Hermeticism, and the Synthesis of East and West',
    epigraph: '"I, Poimandres, Mind of the Sovereign Authority, know what you desire and I am with you everywhere."',
    openingHook: 'In 300 CE, the port city of Alexandria was the melting pot where Greek logic, Egyptian hieroglyphs, and Persian dualism fused into Hermetic gold.',
    subsections: ['Geographical and Cultural Fertile Crescent', 'The Myth of Hermes Trismegistus', 'Key Early Figures: Zosimos of Panopolis & Hypatia', 'The Corpus Hermeticum and Early Papyrus Treatises'],
    sidebars: ['Historical Note: The Burning of the Serapeum', 'Definition: Syncretism in Alexandrian Philosophy'],
    exercises: ['Research Drill: Archival Text Fragment Comparison', 'Analysis: Tracing Egyptian Motifs in Greek Dialogues'],
    conclusionNote: 'The Alexandrian synthesis proved that philosophy without mystery is dry, and mystery without philosophy is chaos.',
  },
  {
    chapterNumber: 4,
    part: 'PART II: HISTORICAL FOUNDATIONS',
    title: 'Development, Transmission, and Florentine Rebirth',
    subtitle: 'From Byzantine Scriptoriums to the Medici Court',
    epigraph: '"Man is a great miracle, a living being worthy of reverence and honor." — Marsilio Ficino (translating Asclepius)',
    openingHook: 'In 1460, a monk named Leonardo of Pistoia rode into Florence carrying a battered Greek manuscript that Cosimo de\' Medici ordered translated before Plato himself.',
    subsections: ['The Arabic Translation Regimes in Baghdad and Toledo', 'Ficino, Pico della Mirandola, and the Prisca Theologia', 'Giordano Bruno and the Infinite Universe', 'Turning Points: The Scientific Revolution Cleavage'],
    sidebars: ['Anecdote: Cosimo de\' Medici\'s Deathbed Reading Request', 'Debate: Was the Renaissance Sparked by Esoteric Treatises?'],
    exercises: ['Timeline Exercise: Mapping the 1,500-Year Route of Hermetic Texts', 'Comparative: Ficino vs Bacon on the Purpose of Knowledge'],
    conclusionNote: 'The Renaissance was not merely a rebirth of classical humanism; it was an explosion of hermetic cosmology.',
  },
  {
    chapterNumber: 5,
    part: 'PART II: HISTORICAL FOUNDATIONS',
    title: 'The Underground Stream and Modern Revival',
    subtitle: 'Rosicrucian Manifestos, Freemasonry, and the 20th-Century Psychological Turn',
    epigraph: '"The stone that the builders rejected has become the cornerstone."',
    openingHook: 'Anonymous posters appeared on the streets of Paris and Kassel in 1614 announcing a secret brotherhood dedicated to the universal reformation of mankind.',
    subsections: ['The Rosicrucian Furor of the 17th Century', 'C.G. Jung and the Psychological Redemption of Alchemy', 'Secret Societies vs Public Academies', 'The 21st-Century Digital Occult Awakening'],
    sidebars: ['Warning: Distinguishing Authentic Lineages from 19th-Century Commercial Forgeries', 'Did You Know?: Jung had his Red Book kept in a Swiss bank vault for decades'],
    exercises: ['Investigation: Tracing Rosicrucian Themes in Early Royal Society Papers', 'Reflection: Is Modern Psychology Modernized Esotericism?'],
    conclusionNote: 'The stream never ran dry; it simply went subterranean when the Enlightenment made mystery disreputable.',
  },

  // PART III: CONCEPTUAL CORE
  {
    chapterNumber: 6,
    part: 'PART III: CONCEPTUAL CORE',
    title: 'The Architecture of Reality: Cosmology & Metaphysics',
    subtitle: 'The Chain of Being, Causality, and Universal Correspondence',
    epigraph: '"Nature rejoices in nature; nature conquers nature; nature masters nature."',
    openingHook: 'If the physical universe is an echo rather than the source, where is the voice originating?',
    subsections: ['The Seven Cosmic Spheres and Planetary Intellects', 'The Principle of Universal Correspondence', 'Epistemology: Noesis vs Doxa (Intellection vs Opinion)', 'Anthropology: The Threefold Human (Soma, Psyche, Pneuma)'],
    sidebars: ['Key Concept: The Anima Mundi (World Soul)', 'What If?: Modern Quantum Entanglement as Physicalized Correspondence'],
    exercises: ['Diagram: Drawing Your Own Structural Model of Reality', 'Analysis: Deconstructing Cartesian Mind-Body Split through Tripartite Anthropology'],
    conclusionNote: 'To understand reality esoterically is to see that nothing exists in isolation; every blade of grass answers to a star.',
  },
  {
    chapterNumber: 7,
    part: 'PART III: CONCEPTUAL CORE',
    title: 'The Great Concepts: Prima Materia, Theurgy, and Gnosis',
    subtitle: 'Unpacking the Core Structural Pillars',
    epigraph: '"Know thyself, and thou shalt know the universe and the gods."',
    openingHook: 'Why did the alchemists describe the most precious substance on earth as "found in the dung-heap and despised by all"?',
    subsections: ['The Prima Materia (First Matter) & The Void', 'Theurgy: Divine Action and Human Co-Creation', 'Gnosis: Experiential Transformative Knowledge', 'The Coincidentia Oppositorum (Union of Opposites)'],
    sidebars: ['Definition: Theurgy vs Goetia', 'Scholarly Debate: Hans Jonas on Gnostic Epistemology'],
    exercises: ['Application: Identifying Prima Materia in Personal Crisis', 'Creative: Writing a Gnostic Myth of Descent and Return'],
    conclusionNote: 'Concepts in esoteric philosophy are not intellectual trophies to collect; they are keys designed to turn specific locks in consciousness.',
  },
  {
    chapterNumber: 8,
    part: 'PART III: CONCEPTUAL CORE',
    title: 'The Inviolable Laws: Mentalism, Polarity, and Rhythm',
    subtitle: 'Operating Principles of the Living Cosmos',
    epigraph: '"Everything is dual; everything has poles; everything has its pair of opposites." — The Kybalion',
    openingHook: 'Why do empires collapse along the exact same harmonic wave patterns that govern ocean tides and cardiac rhythms?',
    subsections: ['The Law of Mentalism: All is Mind', 'The Law of Vibration and Resonance', 'The Law of Polarity and Transmutation', 'The Law of Rhythm and The Art of Neutralization', 'The Law of Cause and Effect'],
    sidebars: ['Practice Note: The Kybalion\'s Method of Polarization', 'Warning: The Trap of Toxic Positivity vs True Alchemical Polarity'],
    exercises: ['Integration: Applying the Law of Rhythm to Emotional Swings', 'Debate: Free Will vs Cosmic Determinism under the Law of Cause'],
    conclusionNote: 'Mastery is not breaking cosmic laws, but learning to ride higher laws to neutralize lower constraints.',
  },

  // PART IV: SYMBOLIC LANGUAGE
  {
    chapterNumber: 9,
    part: 'PART IV: SYMBOLIC LANGUAGE',
    title: 'Reading the Glyphs: The Grammar of Archetypal Symbols',
    subtitle: 'How Visual Metaphors Bypass the Discursive Intellect',
    epigraph: '"A symbol always conceals more than it reveals." — C.G. Jung',
    openingHook: 'A triangle with a circle inside and a square beneath has conveyed more structural truth across five millennia than a thousand-page treatise.',
    subsections: ['The Mechanism of Symbolic Perception', 'The Ouroboros: Infinite Renewal and Self-Consuming Time', 'The Caduceus & The Staff of Asclepius: Serpent Energetics', 'The Seal of Solomon / Hexagram: As Above, So Below'],
    sidebars: ['Definition: Sign vs Symbol vs Allegory', 'Did You Know?: The caduceus on commercial medical ambulances is a historical mix-up'],
    exercises: ['Observation: 15-Minute Silent Contemplation of the Ouroboros', 'Interpretation: Deconstructing a Complex Renaissance Emblem Plate'],
    conclusionNote: 'Symbols are not static codes to decode; they are living energy circuits that activate upon sustained contemplation.',
  },
  {
    chapterNumber: 10,
    part: 'PART IV: SYMBOLIC LANGUAGE',
    title: 'Sacred Geometry: The Math of Divine Proportion',
    subtitle: 'The Golden Ratio, Vesica Piscis, and Architectural Harmonics',
    epigraph: '"God is an intelligible sphere, whose center is everywhere and whose circumference is nowhere."',
    openingHook: 'Why do gothic cathedrals, nautilus shells, and spiral galaxies all share the exact proportion 1:1.618?',
    subsections: ['The Monad, Dyad, Triad, and Tetractys', 'The Vesica Piscis: The Gateway of Form', 'The Golden Ratio (Phi) and the Fibonacci Spiral', 'The Platonic Solids: Elemental Geometric Geometry'],
    sidebars: ['Historical Note: The Secret Geometric Guilds of Medieval Master Masons', 'Practice Note: Using Compass and Straightedge as a Meditative Practice'],
    exercises: ['Drawing Exercise: Constructing the Flower of Life with Compass', 'Analysis: Measuring Proportions in Ancient Temple Floorplans'],
    conclusionNote: 'Geometry is the bridge between unmanifest number and visible universe—the mind of creation frozen in stone and space.',
  },
  {
    chapterNumber: 11,
    part: 'PART IV: SYMBOLIC LANGUAGE',
    title: 'The Spectrum of Meaning: Colors, Numbers, and Minerals',
    subtitle: 'The Alchemical Stages and Their Corresponding Elements',
    epigraph: '"Nigredo, Albedo, Citrinitas, Rubedo: The four stations of the soul\'s dawn."',
    openingHook: 'Why did medieval alchemists spend twenty years in black soot waiting for the flash of a peacock’s tail in the glass flask?',
    subsections: ['The Four Alchemical Color Stages: Black, White, Yellow, Red', 'Planetary Metal Correspondences: Gold, Silver, Mercury, Copper, Iron, Tin, Lead', 'Number Archetypes: From 1 (Source) to 10 (Sephirotic Tree)', 'Mineral and Plant Energetics'],
    sidebars: ['Key Concept: The Cauda Pavonis (Peacock\'s Tail)', 'Myths vs Facts: Physical Lead-into-Gold vs Psychological Transmutation'],
    exercises: ['Correspondence Table Builder: Mapping Planets to Metals, Colors, and Virtues', 'Creation: Designing a Personal Symbolic Coat of Arms'],
    conclusionNote: 'When color and metal are understood as states of consciousness, every daily object reveals its spiritual vibration.',
  },

  // PART V: PRACTICE & APPLICATION
  {
    chapterNumber: 12,
    part: 'PART V: PRACTICE & APPLICATION',
    title: 'The Laboratory and the Oratory: Frameworks of Practice',
    subtitle: 'Daily Discipline, Sacred Space, and Ethical Grounding',
    epigraph: '"Ora et labora: Pray and work."',
    openingHook: 'Without daily somatic and cognitive discipline, esoteric study is merely an elaborate intellectual fantasy.',
    subsections: ['The Architecture of the Inner and Outer Laboratory', 'Purification and Consecration Protocols', 'The Role of Breath, Posture, and Somatic Stillness', 'Practical Ethics: The Hermetic Oath and Moral Guardrails'],
    sidebars: ['Warning: Inflation, Grandiosity, and Spiritual Bypassing', 'Practice Note: Creating a Dedicated Workspace Free of Digital Noise'],
    exercises: ['Core Practice: The 10-Minute Morning Alignment & Sphere of Protection', 'Reflection: Auditing Unconscious Motives for Seeking Hidden Knowledge'],
    conclusionNote: 'True theurgy begins not with dramatic invocations, but with the quiet purification of personal ego and intention.',
  },
  {
    chapterNumber: 13,
    part: 'PART V: PRACTICE & APPLICATION',
    title: 'The Art of Memory and Active Visualization',
    subtitle: 'Giordano Bruno\'s Memory Palaces and Astral Choreography',
    epigraph: '"To think is to speculate with images." — Aristotle',
    openingHook: 'Giordano Bruno could memorize thousand-page encyclopedias by arranging esoteric wheel-diagrams inside imagined celestial architecture.',
    subsections: ['The Classical Art of Memory (Ars Memoriae)', 'Constructing an Alchemical Memory Wheel', 'Active Imagination and Dialoguing with Archetypes', 'The Astral Temple: Building Inner Sacred Sanctuary'],
    sidebars: ['Historical Note: Giulio Camillo\'s Wooden Memory Theatre', 'Definition: Active Imagination vs Passive Daydreaming'],
    exercises: ['Visualization Drill: Constructing a 4-Room Inner Memory Temple', 'Experiment: Memorizing a 7-Principle Matrix Using Spatial Images'],
    conclusionNote: 'The imagination is not a factory for delusions; it is the organ of the soul through which higher forms take shape.',
  },
  {
    chapterNumber: 14,
    part: 'PART V: PRACTICE & APPLICATION',
    title: 'Hermeneutics: How to Decode Initiatic Texts',
    subtitle: 'The Four Levels of Reading: Literal, Allegorical, Moral, and Anagogical',
    epigraph: '"The letter killeth, but the spirit giveth life."',
    openingHook: 'Why did ancient masters deliberately write contradictory statements in consecutive paragraphs of their treatises?',
    subsections: ['The Fourfold Exegesis (PaRDeS / Quadriga)', 'Decknamen: The Deliberate Blinds and Cover Names of Alchemists', 'Reading with the Heart: The Doctrine of Intellectual Humility', 'Practical Textual Decoding Case Study: The Emerald Tablet'],
    sidebars: ['Key Concept: The Blind (Deliberate Obfuscation to Deter the Unworthy)', 'Scholarly Debate: Straussian Esoteric Writing vs Hermetic Veiling'],
    exercises: ['Analysis Drill: Deconstructing a 100-Word Paracelsus Fragment Across 4 Levels', 'Creative: Writing a Personal Wisdom Parable with Embedded Blinds'],
    conclusionNote: 'The text does not reveal its secret to the reader; the reader becomes the text upon which the transformation is written.',
  },

  // PART VI: DEBATES & DIALOGUES
  {
    chapterNumber: 15,
    part: 'PART VI: DEBATES & DIALOGUES',
    title: 'Competing Interpretations: Esoteric Schools in Conflict',
    subtitle: 'Traditionalism, Perennialism, Historicism, and Modern Occulture',
    epigraph: '"Truth is one, but the wise speak of it in many voices."',
    openingHook: 'Is there a single primordial wisdom tradition, or is that belief merely a romantic myth created by Renaissance scholars?',
    subsections: ['The Perennialist Philosophy: Guénon, Schuon, and Evola', 'The Academic Revisionism: Wouter Hanegraaff and Antoine Faivre', 'The Psychological School: Jung, Hillman, and Archetypalism', 'The Postmodern Chaos Magic Critique'],
    sidebars: ['Debate: Universal Perennial Wisdom vs Discontinuous Historical Formations', 'Historical Note: The Split Between Spiritual Alchemy and Physical Chemistry'],
    exercises: ['Debate Exercise: Staging a Trial Between Guénon (Tradition) and Hanegraaff (Historicism)', 'Comparative: Mapping Islamic Sufi Notions of Oneness Against Hermetic Monism'],
    conclusionNote: 'Engaging with differing interpretations prevents the seeker from falling into the fundamentalist trap of dogmatic certainty.',
  },
  {
    chapterNumber: 16,
    part: 'PART VI: DEBATES & DIALOGUES',
    title: 'Controversies, Heresies, and Dark Counterparts',
    subtitle: 'From Inquisition Stakes to Cold War Esoteric Politics',
    epigraph: '"The corruptio optimi pessima: The corruption of the best is the worst."',
    openingHook: 'Why did the exact same esoteric symbols that inspired the Italian Renaissance also get appropriated by 20th-century authoritarian regimes?',
    subsections: ['The Trial of Giordano Bruno and the Inquisitorial Crackdown', 'The Dark Side of Esotericism: Ariosophy and Far-Right Mysticism', 'The Fraudsters, Charlatans, and Commercial Mystics of the 19th Century', 'Guardrails Against Spiritual Abuse and Cult Dynamics'],
    sidebars: ['Warning: The Red Flags of Manipulative Esoteric Groups', 'Historical Note: The True Record of the Knights Templar Trial'],
    exercises: ['Critical Thinking Drill: Identifying Fascist Co-optation of Pagan and Hermetic Symbols', 'Reflection: Examining One\'s Own Shadow Motives for Secret Power'],
    conclusionNote: 'True esoteric study must have the moral courage to look into its own shadow and account for its historical corruptions.',
  },
  {
    chapterNumber: 17,
    part: 'PART VI: DEBATES & DIALOGUES',
    title: 'Comparative Traditions: The Global Tapestry of Wonder',
    subtitle: 'Kabbalah, Daoist Internal Alchemy, Tantra, and Sufism',
    epigraph: '"Rivers flow into the same ocean though their paths wind through different mountains."',
    openingHook: 'Why does a 12th-century Chinese Daoist manual describe the circulation of the golden light using the exact same three energy cauldrons as a 14th-century European alchemist?',
    subsections: ['Western Hermeticism & The Jewish Kabbalah: The Tree of Life', 'Neidan: Daoist Internal Alchemy and the Golden Elixir', 'Sufi Theosophy: Ibn Arabi and the Creative Imagination', 'Indian Kundalini Tantra and the Subtle Body Channels'],
    sidebars: ['Did You Know?: Isaac the Blind and the Provence Emergence of Kabbalah', 'Comparative Table: The 7 Chakras vs 7 Planetary Spheres vs 7 Sephirot'],
    exercises: ['Comparative Synthesis: Writing a 3-Way Dialogue Between Hermes, Laozi, and Ibn Arabi', 'Analysis: Tracing Shared Metaphors of the "Spiritual Sun" Across 4 Continents'],
    conclusionNote: 'The global tapestry proves that human consciousness under deep contemplation invariably discovers the same universal geometry.',
  },

  // PART VII: ADVANCED STUDY
  {
    chapterNumber: 18,
    part: 'PART VII: ADVANCED STUDY',
    title: 'Primary Source Masterclass: The Emerald Tablet & Asclepius',
    subtitle: 'Close Reading, Latin Commentary, and Translation Discrepancies',
    epigraph: '"What is below is like what is above, and what is above is like what is below, to accomplish the miracles of the one thing."',
    openingHook: 'Translating a single Latin preposition in line four of the Tabula Smaragdina completely changes whether alchemy is pantheistic or theistic.',
    subsections: ['The Arabic Roots: Kitāb Sirr al-Khalīqa (The Book of the Secret of Creation)', 'The Latin Medieval Translations (Hortulanus & John of Dee)', 'Line-by-Line Exegesis of the 13 Hermetic Axioms', 'The Asclepius Dialogue and the Lament for Egypt'],
    sidebars: ['Scholarly Debate: Dating the Pseudo-Apollonius Manuscripts', 'Definition: The Father is the Sun, the Mother the Moon, the Wind carried it in its belly'],
    exercises: ['Close Reading: Comparing 3 English Translations of the Emerald Tablet', 'Advanced Translation Drill: Rendering 5 Hermetic Latin Sentences into Modern Idiom'],
    conclusionNote: 'Direct contact with primary sources strips away five centuries of secondary romantic embellishments.',
  },
  {
    chapterNumber: 19,
    part: 'PART VII: ADVANCED STUDY',
    title: 'Advanced Theurgy and Cosmological Integration',
    subtitle: 'Iamblichus, Proclus, and the Telestic Consecration of Statues',
    epigraph: '"It is not human contemplation that unites us with the gods, but the ineffable acts performed divinely." — Iamblichus',
    openingHook: 'Why did Late Antique Neoplatonists abandon pure intellectual philosophy to perform elaborate nocturnal rituals involving herbs, stones, and solar hymns?',
    subsections: ['Iamblichus\' De Mysteriis and the Critique of Porphyry', 'The Synthemata: Divine Tokens Hidden in Material Objects', 'The Telestic Art: Consecrating Sacred Statues as Energetic Nodes', 'The Higher Ascents: Reaching the Henadic Void Beyond Being'],
    sidebars: ['Key Concept: The Henads (The Super-Essential Divine Unities)', 'Scholarly Debate: Gregory Shaw on Theurgy as Embodied Liberation'],
    exercises: ['Advanced Research: Mapping Proclus\' Triadic Dialectic (Remaining, Proceeding, Returning)', 'Synthesis: Formulating a Modern Telestic Philosophy for Environmental Stewardship'],
    conclusionNote: 'Theurgy is the realization that the material world is not a trap to escape, but a sacred altar waiting for divine reactivation.',
  },
  {
    chapterNumber: 20,
    part: 'PART VII: ADVANCED STUDY',
    title: 'The Unfinished Symphony: Current Research & Open Questions',
    subtitle: 'Cognitive Science, Digital Archives, and the Future of Esoteric Studies',
    epigraph: '"The most beautiful thing we can experience is the mysterious. It is the source of all true art and science." — Albert Einstein',
    openingHook: 'Artificial neural networks are now scanning hundreds of thousands of unread medieval manuscripts in the Vatican library, finding forgotten alchemical diagrams daily.',
    subsections: ['Computational Humanities and Manuscript Digitization', 'Esoteric Cognition: How Metaphor Re-wires the Human Brain', 'The Decolonization of Esoteric Studies: Restoring African and Indigenous Lineages', 'Open Mysteries: The Voynich Manuscript and Unsolved Cipher Enigmas'],
    sidebars: ['Did You Know?: The Ritman Library in Amsterdam digitized 25,000 rare hermetic books', 'What If?: AI models trained on symbolic logic generating novel archetypal emblems'],
    exercises: ['Research Proposal: Drafting a Scholarly Syllabus on 21st-Century Digital Esotericism', 'Experiment: Designing an Empirical Cognitive Study on the Effects of Sacred Geometry on Heart Rate Variability'],
    conclusionNote: 'The history of esotericism is not a closed chapter; it is an evolving conversation that expands with every new tool of human inquiry.',
  },

  // PART VIII: CONCLUSION
  {
    chapterNumber: 21,
    part: 'PART VIII: CONCLUSION',
    title: 'The Great Synthesis: Gathering the Scattered Sparks',
    subtitle: 'Integrating Intellect, Heart, and Somatic Experience',
    epigraph: '"Having traveled through the seven spheres, the soul returns naked to the source."',
    openingHook: 'At the summit of the mountain, the seeker discovers that the mountain was never external; it was the spine of their own being.',
    subsections: ['Recapitulation of the Initiatic Journey', 'What Has Been Proven vs What Remains Holy Mystery', 'The Hermetic Renaissance for an Ecological and Digital Century', 'The Final Integration: Living as a Conscious Microcosm'],
    sidebars: ['Practice Note: The Daily Rite of Gratitude to the Ancestors of Wisdom', 'Key Concept: The Magnum Opus as Living Daily Life with Radiance'],
    exercises: ['Integration Exercise: Writing Your Personal Book of Principles and Commitments', 'Reflection: The 24-Hour Silent Hermetic Fast'],
    conclusionNote: 'The true Philosopher\'s Stone is not an object you hold in your hand; it is the transformed eye through which you view creation.',
  },
  {
    chapterNumber: 22,
    part: 'PART VIII: CONCLUSION',
    title: 'The Threshold Continues: An Open Letter to the Seeker',
    subtitle: 'Next Steps, Lifelong Curriculum, and The Great Work Ahead',
    epigraph: '"Close the book; open the eyes; commence the Work."',
    openingHook: 'You have reached the end of the text, which means the real book begins right now in your room.',
    subsections: ['How to Build Your Lifelong Reading Curriculum', 'Finding True Mentors and Avoiding Gurus', 'The Responsibility of the Illuminated Mind in Society', 'Final Benediction: Go Forth in Peace and Radiance'],
    sidebars: ['Did You Know?: Traditional alchemical treatises ended with the words: "Deo Gratias" (Thanks be to God)', 'Advice: Share Wisdom Only Where There Is a Thirsty Cup'],
    exercises: ['Visioning Exercise: Drafting Your 5-Year Great Work Life Roadmap', 'Commitment: The Vow of Daily Living in Truth, Beauty, and Proportion'],
    conclusionNote: 'The sanctuary doors are open. The lamp is trimmed. The Great Work is yours to complete.',
  },
];
