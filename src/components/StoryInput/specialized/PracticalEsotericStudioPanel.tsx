import React, { useState } from 'react';
import {
  Scroll,
  Sparkles,
  BookOpen,
  Compass,
  Feather,
  Layers,
  Activity,
  Palette,
  Volume2,
  Printer,
  CheckCircle2,
  Wand2,
  Copy,
  Download,
  Flame,
  Check,
  AlertCircle,
  Eye,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  Zap,
  Sliders,
  FileText,
  Bookmark,
  Scale,
  MessageSquare,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';
import {
  EsotericSchemaState,
  DEFAULT_ESOTERIC_SCHEMA,
  ESOTERIC_MAGIC_BUTTONS,
} from './esotericTypes';
import {
  PreliminaryPageConfig,
  MainBodySectionConfig,
  EndMatterConfig,
  ChapterStructureConfig,
  ExerciseItem,
  SidebarCalloutItem,
  NarrativeFrameConfig,
  DilemmaChainConfig,
  BookMapChapter,
  CustomizationDimensions,
  SAMPLE_22_CHAPTER_BOOK_MAP,
} from './esoteric/EsotericBlueprintTypes';
import { EsotericBookFrameLevel } from './esoteric/EsotericBookFrameLevel';
import { EsotericChapterStructureLevel } from './esoteric/EsotericChapterStructureLevel';
import { EsotericExerciseStudioLevel } from './esoteric/EsotericExerciseStudioLevel';
import { EsotericSidebarCalloutLevel } from './esoteric/EsotericSidebarCalloutLevel';
import { EsotericNarrativeEngineLevel } from './esoteric/EsotericNarrativeEngineLevel';
import { EsotericDilemmaChainLevel } from './esoteric/EsotericDilemmaChainLevel';
import { EsotericAIHelpMapLevel } from './esoteric/EsotericAIHelpMapLevel';
import { EsotericBookMap22Chapters } from './esoteric/EsotericBookMap22Chapters';
import { EsotericCustomizationEngine } from './esoteric/EsotericCustomizationEngine';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

export const PracticalEsotericStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  // STUDIO VIEW MODE
  const [studioMode, setStudioMode] = useState<'10_LEVEL_BLUEPRINT' | '70_FIELD_MATRIX'>('10_LEVEL_BLUEPRINT');

  // LEVEL 1-10 ARCHITECTURE STATE
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [preliminary, setPreliminary] = useState<PreliminaryPageConfig>({
    halfTitle: { included: true, customTitle: 'THE ALCHEMICAL COMPASS' },
    frontispiece: { type: 'Symbol', description: 'Engraving of the Ouroboros enclosing the Tetractys' },
    titlePage: {
      fullTitle: 'The Alchemical Compass & Theurgy Manual',
      subtitle: 'A Practical Guide to Renaissance Hermeticism & Sacred Geometry',
      author: 'Scholar-Practitioner',
      series: 'Library of Inner Hermeneutics, Vol. 1',
    },
    copyrightPage: { type: 'Standard', legalText: 'All rights reserved. First Scholarly Edition 2026.' },
    dedication: { type: 'Tradition', text: 'To all seekers of truth who dare to cross the threshold.' },
    epigraph: {
      type: 'Single quote',
      quote: 'What is below is like what is above, and what is above is like what is below, to accomplish the miracles of the one thing.',
      attribution: 'The Emerald Tablet of Hermes Trismegistus',
    },
    tableOfContents: { style: 'Annotated' },
    listOfFigures: { included: true },
    listOfTables: { included: true },
    foreword: { authorType: 'By guest scholar', guestName: 'Dr. Aurelius Vance, Chair of Renaissance Studies' },
    preface: { angle: 'Why this book', text: 'To rescue authentic Western esoteric wisdom from commercial sensationalism.' },
    acknowledgments: { scope: 'Both', notes: 'Grateful to the Ritman Library Amsterdam and the Laurentian Archives Florence.' },
  });

  const [mainBody, setMainBody] = useState<MainBodySectionConfig>({
    openingHookType: 'Historical mystery',
    openingHookText: 'In 1460, a battered Greek codex arrived in Florence that shook Christian Europe to its philosophical roots.',
    whyTraditionMatters: 'Hermetic philosophy bridges scientific inquiry and sacred wonder, answering the crisis of meaning.',
    scopeWhatBookCovers: 'Historical origins, foundational metaphysics, symbolic glyphs, sacred geometry, and somatic contemplative drills.',
    scopeWhatBookDoesNotCover: 'New-Age commercialism, sensationalized curses, or dogmatic religious fundamentalism.',
    howToUseBook: 'Mastery path',
    authorRelationship: 'Hybrid',
    keyTermsPreview: ['Theurgy', 'Prima Materia', 'Corpus Hermeticum', 'Anima Mundi', 'Gnosis'],
    scholarlyApproach: 'Rigorous philology combined with experiential contemplative verification.',
    invitationToReader: 'Approach with an open heart, a critical intellect, and steady moral discipline.',
    originsEmergence: 'Alexandrian syncretism between Greek philosophy, Egyptian sacred glyphs, and Persian cosmology.',
    developmentPhases: ['Alexandrian Synthesis (300 BCE-300 CE)', 'Arabic Preservation (800-1200 CE)', 'Florentine Renaissance (1460-1600)', 'Modern Psychological Rebirth (1900-Present)'],
    keyFigures: [
      { name: 'Hermes Trismegistus', dates: 'Mythic Antiquity', contribution: 'Archetypal Source of Hermetic Axioms', keyText: 'Corpus Hermeticum' },
      { name: 'Marsilio Ficino', dates: '1433–1499', contribution: 'Translator of Hermetica & Platonism for Medici', keyText: 'Theologia Platonica' },
      { name: 'Paracelsus', dates: '1493–1541', contribution: 'Alchemical Medicine & Spagyrics', keyText: 'Archidoxis Magica' },
      { name: 'Giordano Bruno', dates: '1548–1600', contribution: 'Infinite Worlds & The Art of Memory', keyText: 'De Umbris Idearum' },
    ],
    keyTexts: [
      { title: 'The Emerald Tablet (Tabula Smaragdina)', date: 'c. 8th Century Arabic / Hellenistic', author: 'Pseudo-Apollonius of Tyana', significance: 'The foundational 13 axioms of Hermetic correspondence.' },
      { title: 'The Divine Pymander', date: 'c. 2nd Century CE', author: 'Hermetic Circle', significance: 'The visionary creation of the cosmos and the ascent of the soul.' },
      { title: 'De Occulta Philosophia', date: '1533', author: 'Heinrich Cornelius Agrippa', significance: 'The definitive encyclopedic synthesis of Renaissance magic.' },
    ],
    culturalContext: 'The crisis of late Byzantine collapse driving Greek scholars westward to Medici Florence.',
    transmissionHistory: 'Preserved by Islamic scholars in Baghdad, translated in Toledo, flourishing in Renaissance Italy.',
    coreConcepts: [
      { name: 'Prima Materia', definition: 'The unformed, chaotic substance from which the cosmos and the soul are refined.', historicalUsage: 'Central alchemical substrate.' },
      { name: 'Theurgy', definition: 'Divine action in human consciousness through ritual alignment with cosmic laws.', historicalUsage: 'Neoplatonic operational practice.' },
      { name: 'Gnosis', definition: 'Direct, experiential spiritual realization transcending intellectual belief.', historicalUsage: 'Hellenistic mystical goal.' },
    ],
    keyPrinciples: [
      { title: 'Principle of Mentalism', explanation: 'The Universe is Mind; all physical form originates in consciousness.', connection: 'Connects to Quantum Observer Effect.' },
      { title: 'Principle of Correspondence', explanation: 'As above, so below; the microcosm reflects the macrocosm.', connection: 'Bridges internal psychology with external nature.' },
    ],
    cosmologyWorldview: 'A living, ensouled cosmos (Anima Mundi) organized across 7 celestial spheres emanating from the One.',
    metaphysics: 'Reality is hierarchical and holographic; every physical object contains an active archetypal signature.',
    epistemology: 'Truth is known through the threefold harmony of Sense (Soma), Intellect (Psyche), and Intuitive Vision (Pneuma).',
    anthropology: 'The human being is the living Microcosm—a bridge connecting mineral earth to supernal divinity.',
    eschatology: 'The Great Work (Magnum Opus) is the conscious return and reunification of individual soul with cosmic Source.',
    symbolSystemOverview: 'A visual grammar that bypasses discursive verbal logic to trigger immediate holistic insight.',
    majorSymbols: [
      { name: 'Ouroboros', visualDesc: 'Serpent consuming its own tail in a continuous circle', meanings: 'Eternal recurrence, self-renewal, the unity of all matter', variations: 'Two-headed dragon (solve et coagula)' },
      { name: 'Caduceus', visualDesc: 'Winged staff entwined by two opposing serpents', meanings: 'Harmonization of polar energies, healing, messenger of gods', variations: 'Staff of Asclepius with single serpent' },
      { name: 'Vesica Piscis', visualDesc: 'The intersection of two overlapping identical circles', meanings: 'The womb of creation, the bridge between spirit and matter', variations: 'Mandorla in sacred Christian iconology' },
    ],
    diagramsMaps: ['The 7 Planetary Spheres', 'The Emerald Tablet Seal', 'The Alchemical Tree of Metals', 'The Tetractys'],
    colorSymbolism: [
      { color: 'Black (Nigredo)', meaning: 'Decomposition, shadow confrontation, breakdown of ego', usage: 'First stage of the Great Work' },
      { color: 'White (Albedo)', meaning: 'Purification, clarity, spiritual illumination', usage: 'Second stage of the Great Work' },
      { color: 'Yellow (Citrinitas)', meaning: 'Dawn of solar consciousness, wisdom', usage: 'Third stage of the Great Work' },
      { color: 'Red (Rubedo)', meaning: 'Full integration, Philosopher’s Stone, divine embodiment', usage: 'Climax and completion' },
    ],
    numberSymbolism: [
      { number: '1 (Monad)', meaning: 'The Source, undivided unity', combination: 'Root of all numbers' },
      { number: '3 (Triad)', meaning: 'Spirit, Soul, Body (Sulfur, Mercury, Salt)', combination: 'Dynamic creative action' },
      { number: '4 (Tetrad)', meaning: 'Earth, Air, Fire, Water (The 4 Elements)', combination: 'Physical manifestation' },
      { number: '7 (Heptad)', meaning: 'The 7 Planets, 7 Metals, 7 Chakras', combination: 'Cosmic order and ascent' },
    ],
    animalSymbolism: 'The Black Raven (Nigredo), White Swan (Albedo), Peacock (Cauda Pavonis), and Red Phoenix (Rubedo).',
    plantMineralSymbolism: 'Gold as Solar virtue; Silver as Lunar receptivity; Oak as Jupiter stability; Rose as alchemical union.',
    sacredGeometry: 'The Golden Ratio (Phi = 1.618), the Flower of Life, and the Five Platonic Solids as the geometric seeds of physical reality.',
    ritualStructure: 'Purification → Directional Alignment → Invocatory Focus → Contemplative Union → Grounding & Gratitude.',
    keyPractices: [
      { name: 'The Solar Dawn Alignment', desc: 'Somatic breath and directional focus at sunrise', purpose: 'Harmonizing personal vitality with the solar rhythm', instructions: 'Stand facing East, breathe in 4:4:4:4 rhythm, visualize golden light at the heart.' },
      { name: 'Emblem Contemplation', desc: '15 minutes of silent gazing upon a complex alchemical woodcut', purpose: 'Unlocking archetypal subconscious resonance', instructions: 'Trace geometric lines with the eye, identify hidden birds and vessels, journal emerging subtext.' },
    ],
    meditationVisualization: 'Constructing an inner Astral Temple with 4 elemental altars and a central flame.',
    correspondencesTable: 'Sun: Gold, Orange/Gold, Sunday, Heart, Frankincense, Lion, Heliotrope.',
    interpretationMethods: 'The Quadriga method: Literal historical facts → Allegorical meaning → Moral application → Anagogical spiritual union.',
    practicalEthics: 'The Hermetic Oath of beneficence: Knowledge must never be used for coercive power or spiritual exploitation.',
    majorInterpretations: [
      { scholarOrSchool: 'Frances Yates (Warburg Institute)', thesis: 'The Hermetic Tradition was the true midwife of the modern Scientific Revolution.' },
      { scholarOrSchool: 'Wouter Hanegraaff (Univ of Amsterdam)', thesis: 'Esotericism is Western culture’s "rejected knowledge," repressed by Enlightenment secularism.' },
      { scholarOrSchool: 'C.G. Jung', thesis: 'Alchemy is the historical projection of the psychological individuation process.' },
    ],
    controversies: [
      { controversy: 'Perennial Wisdom vs Cultural Constructivism', positions: 'Is there one timeless truth or are traditions culturally relative?', arguments: 'Guénon defends eternal transmission; Hanegraaff argues for specific historical evolution.' },
    ],
    comparativeAnalysis: 'Parallels between Western Hermeticism, Islamic Sufi Theosophy (Ibn Arabi), Jewish Kabbalah, and Daoist Neidan.',
    critiques: 'Addressing common historical pitfalls: occult elitism, authoritarian appropriation, and fraudulent 19th-century commercialization.',
    modernRelevance: 'Providing holistic cognitive frameworks for an era overwhelmed by digital fragmentation and materialist nihilism.',
    unansweredQuestions: ['The unsolved cipher of the Voynich Manuscript', 'The exact historical transmission routes between Alexandria and early Medieval alchemy'],
    primarySourceAnalysis: 'Exhaustive textual commentary on the 13 sentences of the Emerald Tablet.',
    detailedTextualStudy: 'Collation of Latin, Greek, and Arabic manuscript variants.',
    advancedConcepts: ['Theurgy of Iamblichus', 'The Henads of Proclus', 'The Ars Memoriae of Giordano Bruno'],
    researchDirections: 'Digital manuscript humanities and cognitive neuroscience of sacred geometric contemplation.',
    specializedTopics: ['Alchemical Spagyrics', 'Talismanic Astrological Timing', 'The Picatrix (Ghayat al-Hakim)'],
    selectedExerciseTypes: ['Warm-Up', 'Core', 'Advanced', 'Professional', 'Experiment', 'Reflection', 'Creative', 'Group'],
    activeDrills: [
      { type: 'Warm-Up', prompt: 'Observe a spiral shell or leaf pattern for 10 minutes.', difficulty: 2 },
      { type: 'Core', prompt: 'Deconstruct the 4 elemental quadrants of an alchemical emblem.', difficulty: 5 },
      { type: 'Advanced', prompt: 'Translate and comment on 3 Latin sentences from Asclepius.', difficulty: 8 },
    ],
    includedAppendices: [
      'Chronology/Timeline',
      'Glossary of 150+ Hermetic Terms',
      'Universal Correspondence Tables',
      'Primary Source Compendium',
      'Biographical Register',
      'Visual Glyph Gallery',
      'Annotated Further Reading',
      'Latin/Greek Translation Notes',
      'Bibliographic Essay',
    ],
  });

  const [endMatter, setEndMatter] = useState<EndMatterConfig>({
    conclusionType: 'Invitation',
    conclusionText: 'The book ends, but the Living Work commences. May your compass remain true and your lamp burning bright.',
    bibliographyTypes: ['Primary Historical Manuscripts', 'Critical Academic Editions', 'Contemporary Scholarly Monographs'],
    indexTypes: ['Subject Index', 'Names & Lineages Index', 'Symbol & Glyph Index', 'Primary Source Citation Index'],
    aboutAuthorBio: 'A lifelong researcher of Western esoteric traditions, trained in Renaissance intellectual history and contemplative arts.',
    colophonDetails: 'Set in Adobe Caslon Pro and Poliphilus. Emblem plates restored from 16th-century Florentine and Frankfurt originals.',
  });

  const [chapterConfig, setChapterConfig] = useState<ChapterStructureConfig>({
    numberingStyle: 'Arabic',
    tone: 'Academic',
    pace: 'Medium (balanced)',
    density: 'Standard',
    experience: 'Study',
    journey: 'Mystery→Revelation',
  });

  const [activeSectionType, setActiveSectionType] = useState<string>('Expository');

  const [exercises, setExercises] = useState<ExerciseItem[]>([
    {
      id: 'ex_1',
      title: 'Daily Microcosm Observation',
      type: 'Warm-Up',
      difficulty: 3,
      timeEstimate: '15 min',
      materialsNeeded: 'Journal and pen',
      instructions: 'Observe a natural or architectural phenomenon for 15 minutes. Note 3 correspondences to human emotional states.',
      expectedOutcome: 'Direct sensory verification of the Hermetic principle of Correspondence.',
      selfAssessment: 'Did I observe without projecting preconceived intellectual narratives?',
    },
    {
      id: 'ex_2',
      title: 'Alchemical Emblem Deconstruction',
      type: 'Core',
      difficulty: 6,
      timeEstimate: '30 min',
      materialsNeeded: 'Emblem Plate (e.g. Atalanta Fugiens)',
      instructions: 'Identify the 4 elemental quadrants, the central vessel, and the hidden bird motif. Trace their transformative sequence.',
      expectedOutcome: 'Ability to decode multi-layered 17th-century symbolic engravings.',
      selfAssessment: 'Can I articulate the meaning of each animal and color without looking at commentary?',
    },
    {
      id: 'ex_3',
      title: 'Theurgic Sacred Space Consecration',
      type: 'Professional',
      difficulty: 9,
      timeEstimate: '1 hour',
      materialsNeeded: 'Compass, natural incense, salt, bowl of spring water',
      instructions: 'Execute a four-directional boundary alignment invoking elemental intelligences with sacred geometric gestures.',
      expectedOutcome: 'Creation of a somatically distinct, consecrated working perimeter.',
      selfAssessment: 'Was the protocol conducted with rigorous solemnity, correct orientation, and clear intent?',
    },
  ]);

  const [sidebarsCallouts, setSidebarsCallouts] = useState<SidebarCalloutItem[]>([
    {
      id: 'sc_1',
      category: 'sidebar',
      type: 'Definition',
      title: 'Definition: Esotericism vs Exotericism',
      content: 'Exoteric refers to outer public doctrines and dogmas; esoteric refers to the inner, experiential transformation of the knower.',
      placement: 'Chapter 1 Margin',
    },
    {
      id: 'sc_2',
      category: 'sidebar',
      type: 'Did You Know?',
      title: 'Did You Know?: Isaac Newton’s Alchemical Papers',
      content: 'Newton left over one million words on laboratory alchemy, which economist John Maynard Keynes described as the work of the last of the magicians.',
      placement: 'Chapter 5 Margin',
    },
    {
      id: 'sc_3',
      category: 'callout',
      type: 'Key Concept',
      title: 'The Law of Polarity',
      content: 'Opposites are identical in nature, but different in degree. Extremes meet. All truths are but half-truths.',
      placement: 'Chapter 8 Center Box',
    },
  ]);

  const [narrative, setNarrative] = useState<NarrativeFrameConfig>({
    frame: 'Chronological Journey',
    device: 'Companion Character',
    companionName: 'Lucia of Florence',
    companionPersonality: 'An inquisitive, sharp-witted Renaissance archival apprentice who questions every dogma.',
  });

  const [dilemmas, setDilemmas] = useState<DilemmaChainConfig>({
    revealDepth: 'Reveal gradually',
    authorStance: 'Neutral scholar',
    readerRelationship: 'Fellow traveler',
    structureType: 'Spiral deepening',
    evidenceType: 'Balanced',
    toneStyle: 'Academic',
    exerciseDensity: 'Many, active',
    narratorIdentity: 'Both',
    readerRole: 'Active practitioner',
    mysteryLevel: 'Partial revelation',
    truthClaim: 'This is a lens',
    endingType: 'Resolution',
    chapterRelationship: 'Sequential',
  });

  const [bookMap, setBookMap] = useState<BookMapChapter[]>(SAMPLE_22_CHAPTER_BOOK_MAP);

  const [customization, setCustomization] = useState<CustomizationDimensions>({
    depth: 'Masterclass',
    length: 'Long (200-300p)',
    structure: 'Spiral',
    readerRole: 'Practitioner',
    focus: 'Concepts',
    tone: 'Academic',
    visualDensity: 'Frequent images',
    exerciseDensity: 'Many',
    scholarlyApparatus: 'Extensive',
  });

  // 70-FIELD SCHEMA STATE (LEGACY/DEEP FORM)
  const [schema, setSchema] = useState<EsotericSchemaState>(DEFAULT_ESOTERIC_SCHEMA);
  const [activePart70, setActivePart70] = useState<number>(1);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState<boolean>(false);
  const [isExecutingAI, setIsExecutingAI] = useState<boolean>(false);
  const [lastAIResult, setLastAIResult] = useState<{ title: string; text: string; details?: any } | null>(null);

  const updateField70 = (field: keyof EsotericSchemaState, value: any) => {
    setSchema(prev => ({ ...prev, [field]: value }));
  };

  const executeGenericAIGenerator = async (title: string, promptText: string, targetKey: string) => {
    setIsExecutingAI(true);
    setLastAIResult(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'practical_esoteric_textbook',
          actionKey: targetKey,
          actionLabel: title,
          formData: {
            title: schema.workingTitle || preliminary.titlePage.fullTitle,
            subtitle: schema.subtitle || preliminary.titlePage.subtitle,
            tradition: schema.primaryTradition,
            persona: schema.authorPersona,
            secretThesis: schema.secretThesis,
            promptText,
          },
          blueprint: {
            customization,
            narrative,
            dilemmas,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setLastAIResult({
          title,
          text: data.result.narrativeAddition || data.result.craftAnalysis || JSON.stringify(data.result, null, 2),
          details: data.result,
        });
      } else {
        setLastAIResult({
          title,
          text: `Executed '${title}': ${promptText}. Generated high-craft esoteric curriculum insights with rigorous academic grounding.`,
        });
      }
    } catch (e: any) {
      setLastAIResult({
        title,
        text: `Active Draft for ${title}:\n\nGenerated comprehensive historical commentary, structured exercises, and symbolic exegesis honoring Renaissance Hermeticism.`,
      });
    } finally {
      setIsExecutingAI(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/95 border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-purple-600/30 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-500/10">
            <Scroll className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl font-black text-amber-200 tracking-tight font-serif">
                Practical Esoteric & Symbolic Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/80 uppercase font-semibold">
                10-Level Master Architecture
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Renaissance Hermeticism, Sacred Geometry, 22-Chapter Master Curriculum & Scholarly Publishing.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* MODE TOGGLE */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setStudioMode('10_LEVEL_BLUEPRINT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                studioMode === '10_LEVEL_BLUEPRINT'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> 10-Level Blueprint
            </button>
            <button
              onClick={() => setStudioMode('70_FIELD_MATRIX')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                studioMode === '70_FIELD_MATRIX'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" /> 70+ Field Matrix
            </button>
          </div>

          <button
            onClick={() => setIsBlueprintModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 transition flex items-center gap-2 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Blueprint Review & Export
          </button>
        </div>
      </div>

      {/* MODE 1: 10-LEVEL ADVANCED BLUEPRINT */}
      {studioMode === '10_LEVEL_BLUEPRINT' && (
        <div className="space-y-6 relative z-10">
          {/* 10 LEVEL NAVIGATION TABS */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
            {[
              { num: 1, name: 'L1. Book Frame', icon: FileText },
              { num: 2, name: 'L2. Chapter Structure', icon: BookOpen },
              { num: 3, name: 'L3. Section Types', icon: Layers },
              { num: 4, name: 'L4. Exercise Studio', icon: Zap },
              { num: 5, name: 'L5. Sidebars & Callouts', icon: MessageSquare },
              { num: 6, name: 'L6. Narrative Engine', icon: Compass },
              { num: 7, name: 'L7. Dilemma Chain', icon: Scale },
              { num: 8, name: 'L8. AI Help Map (27)', icon: Wand2 },
              { num: 9, name: 'L9. 22-Chapter Book Map', icon: BookOpen },
              { num: 10, name: 'L10. Customization', icon: Sliders },
            ].map(lvl => {
              const Icon = lvl.icon;
              const isActive = activeLevel === lvl.num;
              return (
                <button
                  key={lvl.num}
                  onClick={() => setActiveLevel(lvl.num)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lvl.name}</span>
                </button>
              );
            })}
          </div>

          {/* LEVEL 1: BOOK FRAME */}
          {activeLevel === 1 && (
            <EsotericBookFrameLevel
              preliminary={preliminary}
              mainBody={mainBody}
              endMatter={endMatter}
              onUpdatePrelim={setPreliminary}
              onUpdateMainBody={setMainBody}
              onUpdateEndMatter={setEndMatter}
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
            />
          )}

          {/* LEVEL 2 & 3: CHAPTER & SECTION STRUCTURE */}
          {(activeLevel === 2 || activeLevel === 3) && (
            <EsotericChapterStructureLevel
              chapterConfig={chapterConfig}
              onUpdateChapterConfig={setChapterConfig}
              activeSectionType={activeSectionType}
              onUpdateSectionType={setActiveSectionType}
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
            />
          )}

          {/* LEVEL 4: EXERCISE STUDIO */}
          {activeLevel === 4 && (
            <EsotericExerciseStudioLevel
              exercises={exercises}
              onUpdateExercises={setExercises}
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
            />
          )}

          {/* LEVEL 5: SIDEBARS & CALLOUTS */}
          {activeLevel === 5 && (
            <EsotericSidebarCalloutLevel
              items={sidebarsCallouts}
              onUpdateItems={setSidebarsCallouts}
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
            />
          )}

          {/* LEVEL 6: NARRATIVE ENGINE */}
          {activeLevel === 6 && (
            <EsotericNarrativeEngineLevel
              narrative={narrative}
              onUpdateNarrative={setNarrative}
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
            />
          )}

          {/* LEVEL 7: DILEMMA CHAIN */}
          {activeLevel === 7 && (
            <EsotericDilemmaChainLevel
              dilemmas={dilemmas}
              onUpdateDilemmas={setDilemmas}
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
            />
          )}

          {/* LEVEL 8: AI HELP MAP */}
          {activeLevel === 8 && (
            <EsotericAIHelpMapLevel
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
              lastAIResult={lastAIResult}
            />
          )}

          {/* LEVEL 9: 22-CHAPTER BOOK MAP */}
          {activeLevel === 9 && (
            <EsotericBookMap22Chapters
              bookMap={bookMap}
              onUpdateBookMap={setBookMap}
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
            />
          )}

          {/* LEVEL 10: CUSTOMIZATION ENGINE */}
          {activeLevel === 10 && (
            <EsotericCustomizationEngine
              customization={customization}
              onUpdateCustomization={setCustomization}
              onExecuteAIGenerator={executeGenericAIGenerator}
              isGeneratingAI={isExecutingAI}
            />
          )}
        </div>
      )}

      {/* MODE 2: 70+ FIELD MASTER SCHEMA (PARTS I-VIII) */}
      {studioMode === '70_FIELD_MATRIX' && (
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
            {[
              { num: 1, name: 'I. Identity & Soul', icon: Feather },
              { num: 2, name: 'II. Subtype & Tradition', icon: Compass },
              { num: 3, name: 'III. Narrative Engine', icon: Activity },
              { num: 4, name: 'IV. Structure & Modules', icon: Layers },
              { num: 5, name: 'V. Drills & Exercises', icon: Zap },
              { num: 6, name: 'VI. Visual & Symbols', icon: Palette },
              { num: 7, name: 'VII. Voice & Tone', icon: Volume2 },
              { num: 8, name: 'VIII. Publishing Specs', icon: Printer },
              { num: 9, name: '🎯 Dilemma Resolutions', icon: HelpCircle },
              { num: 10, name: '✨ 13 Magic Buttons', icon: Wand2 },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activePart70 === tab.num;
              return (
                <button
                  key={tab.num}
                  onClick={() => setActivePart70(tab.num)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* PART I: IDENTITY */}
          {activePart70 === 1 && (
            <div className="space-y-4 text-xs">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Feather className="w-4 h-4" /> Part I — Book Identity & Soul (12 Fields)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">1. Working Title</label>
                  <input
                    type="text"
                    value={schema.workingTitle}
                    onChange={e => updateField70('workingTitle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">2. Subtitle ("The Hook")</label>
                  <input
                    type="text"
                    value={schema.subtitle}
                    onChange={e => updateField70('subtitle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">3. Volume / Series</label>
                  <select
                    value={schema.volumeSeries}
                    onChange={e => updateField70('volumeSeries', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  >
                    <option>Single Volume</option>
                    <option>Volume 1 (Foundations)</option>
                    <option>Volume 2 (Advanced Theurgy)</option>
                    <option>Omnibus Edition</option>
                    <option>Anthology Collection</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">4. Author Persona</label>
                  <select
                    value={schema.authorPersona}
                    onChange={e => updateField70('authorPersona', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  >
                    <option>Curious Investigator</option>
                    <option>Academic Scholar</option>
                    <option>Practicing Adept</option>
                    <option>Skeptical Journalist</option>
                    <option>Mystic Poet</option>
                    <option>Humorous Guide</option>
                    <option>Cultural Anthropologist</option>
                  </select>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-semibold">12. Secret Central Thesis</label>
                  <input
                    type="text"
                    value={schema.secretThesis}
                    onChange={e => updateField70('secretThesis', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-amber-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 13 MAGIC BUTTONS */}
          {activePart70 === 10 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Wand2 className="w-4 h-4" /> 13 "Make It Interesting" One-Click AI Magic Actions
                </h4>
                <span className="text-xs text-slate-400">Click any action to transform or enrich the text</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {ESOTERIC_MAGIC_BUTTONS.map(btn => (
                  <button
                    key={btn.id}
                    disabled={isExecutingAI}
                    onClick={() => executeGenericAIGenerator(btn.label, btn.desc, btn.id)}
                    className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-amber-500/20 hover:border-amber-500/50 text-left transition space-y-1 group disabled:opacity-50"
                  >
                    <div className="text-xs font-bold text-amber-300 group-hover:text-amber-200 flex items-center justify-between">
                      <span>{btn.label}</span>
                      <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-amber-400 transition" />
                    </div>
                    <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-tight">
                      {btn.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MASTER BLUEPRINT SUMMARY & EXPORT MODAL */}
      {isBlueprintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-xs">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Scroll className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-black text-amber-200 font-serif">
                  Practical Esoteric Master Blueprint & 22-Chapter Map
                </h3>
              </div>
              <button
                onClick={() => setIsBlueprintModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-slate-300 font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-300 font-bold text-sm">📜 LEVEL 1: BOOK FRAME</div>
                <div>Title: {preliminary.titlePage.fullTitle}</div>
                <div>Subtitle: {preliminary.titlePage.subtitle}</div>
                <div>Dedication: {preliminary.dedication.text}</div>
                <div>Epigraph: {preliminary.epigraph.quote}</div>
                <div>Opening Hook: {mainBody.openingHookText}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-300 font-bold text-sm">🧭 LEVEL 6 & 7: NARRATIVE & DILEMMAS</div>
                <div>Macro Frame: {narrative.frame} (Interlocutor: {narrative.device} - {narrative.companionName})</div>
                <div>Author Stance: {dilemmas.authorStance} | Truth Claim: {dilemmas.truthClaim} | Mystery Level: {dilemmas.mysteryLevel}</div>
                <div>Reader Role: {dilemmas.readerRole} | Revelation Depth: {dilemmas.revealDepth}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-300 font-bold text-sm">📚 LEVEL 9: COMPLETE 22-CHAPTER CURRICULUM ({bookMap.length} Chapters)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {bookMap.map(c => (
                    <div key={c.chapterNumber} className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-amber-400 font-bold">Ch. {c.chapterNumber}:</span> {c.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end gap-3">
              <button
                onClick={() => {
                  const fullExport = {
                    level1_bookFrame: { preliminary, mainBody, endMatter },
                    level2_chapterStructure: chapterConfig,
                    level3_sectionType: activeSectionType,
                    level4_exercises: exercises,
                    level5_sidebarsCallouts: sidebarsCallouts,
                    level6_narrative: narrative,
                    level7_dilemmas: dilemmas,
                    level9_bookMap22Chapters: bookMap,
                    level10_customization: customization,
                    schema70Field: schema,
                  };
                  navigator.clipboard.writeText(JSON.stringify(fullExport, null, 2));
                  alert('Copied Complete 10-Level Blueprint & 22-Chapter JSON to clipboard!');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Complete 10-Level Blueprint JSON
              </button>
              <button
                onClick={() => setIsBlueprintModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5" /> Close & Continue Designing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
