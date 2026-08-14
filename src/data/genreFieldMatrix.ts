import { StoryArchetype } from '../types';
import {
  Smile,
  BookOpen,
  Search,
  Zap,
  Layers,
  Cpu,
  Compass,
  Flame,
  Feather,
  Heart,
  Ghost,
  GraduationCap,
  FileText,
  HelpCircle,
  Sparkles,
  BookMarked,
  Microscope,
  Award,
  Shield,
  Clock,
  Briefcase,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export type GenreCategory = 
  | 'fiction'
  | 'visual_sequential'
  | 'scholarly_nonfiction'
  | 'practical_reference';

export type GenreStructureType = 
  | 'narrative'
  | 'argument'
  | 'instructional'
  | 'reference'
  | 'question_answer'
  | 'case'
  | 'conceptual'
  | 'sequential_visual';

export type CharacterRelevanceType = 
  | 'character_driven'
  | 'character_assisted'
  | 'character_irrelevant';

export type FieldVisibilityStatus = 
  | 'essential'
  | 'recommended'
  | 'optional'
  | 'genre_specific'
  | 'hidden'
  | 'not_applicable'
  | 'auto_generated';

export type AdaptiveStoryLayerId = 
  | 'narrative_layer'
  | 'character_layer'
  | 'clues_layer'
  | 'visual_comic_layer'
  | 'worldbuilding_layer'
  | 'exercises_layer'
  | 'checklist_layer';

export interface AdaptiveStoryLayer {
  id: AdaptiveStoryLayerId;
  name: string;
  description: string;
  iconName: string;
  fieldsExposed: string[];
}

export interface AdaptiveGenreConfig {
  id: StoryArchetype;
  name: string;
  category: GenreCategory;
  structureType: GenreStructureType;
  characterRelevance: CharacterRelevanceType;
  description: string;
  tag: string;
  icon: any;
  accent: string;

  // Adaptive Core Idea Terminology
  coreIdea: {
    label: string;
    placeholder: string;
    subtitle: string;
    sparkPrompts: string[];
  };

  // Adaptive Subject / Character Terminology
  characterSection: {
    visible: boolean;
    label: string;
    sublabel: string;
    nameLabel: string;
    namePlaceholder: string;
    goalLabel: string;
    goalPlaceholder: string;
    internalNeedLabel: string;
    internalNeedPlaceholder: string;
  };

  // Adaptive Problem & Stakes Terminology
  problemSection: {
    visible: boolean;
    title: string;
    subtitle: string;
    obstacleLabel: string;
    obstaclePlaceholder: string;
    stakesLabel: string;
    stakesPlaceholder: string;
    presetStakesOptions?: string[];
  };

  // Adaptive Outcome & Ending Terminology
  outcomeSection: {
    title: string;
    subtitle: string;
    resolutionOptions: Array<{ label: string; desc: string }>;
  };

  // Specialized Genre Hook
  specializedSection: {
    title: string;
    subtitle: string;
    fieldKey: string;
    label: string;
    placeholder: string;
    options?: string[];
    multiOptions?: {
      key: string;
      label: string;
      choices: string[];
    }[];
  };

  // Field Status Matrix
  fieldMatrix: {
    protagonist: FieldVisibilityStatus;
    antagonist: FieldVisibilityStatus;
    character_arc: FieldVisibilityStatus;
    conflict: FieldVisibilityStatus;
    stakes: FieldVisibilityStatus;
    worldbuilding: FieldVisibilityStatus;
    magic_tech: FieldVisibilityStatus;
    clues_investigation: FieldVisibilityStatus;
    research_thesis: FieldVisibilityStatus;
    methodology: FieldVisibilityStatus;
    procedures_checklists: FieldVisibilityStatus;
    learning_exercises: FieldVisibilityStatus;
    qa_formats: FieldVisibilityStatus;
    visual_panels: FieldVisibilityStatus;
    humor_engine: FieldVisibilityStatus;
  };
}

export const ALL_ADAPTIVE_GENRES: Record<StoryArchetype, AdaptiveGenreConfig> = {
  // 1. SATIRE
  satire: {
    id: 'satire',
    name: 'Satire & Social Comedy',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_assisted',
    description: 'Absurd systems, bureaucratic mutiny, and razor-sharp social wit.',
    tag: 'Irony & Absurdity',
    icon: Smile,
    accent: 'amber',
    coreIdea: {
      label: 'Satirical Premise & Absurd System',
      placeholder: 'e.g. An actuary discovers Mondays are an administrative fraud created in 1842 and starts an underground revolt...',
      subtitle: 'What societal absurdity, corporate hypocrisy, or systemic foolishness is being held up to ridicule?',
      sparkPrompts: [
        'An actuary discovers Mondays are an administrative fraud and starts an underground chronological revolt.',
        'An AI customer support bot achieves sentience and files a formal HR grievance against humanity.',
        'A junior diplomat at an intergalactic summit accidentally declares war while trying to order artisanal coffee.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'Comedic Subject / Satirical Observer',
      sublabel: 'Define the person caught inside the absurdity.',
      nameLabel: 'Central Figure & Function',
      namePlaceholder: 'e.g. Arthur Vance, Senior Actuary of Redundant Verification',
      goalLabel: 'What they are trying to achieve',
      goalPlaceholder: 'e.g. Prove the math is flawed without getting fired',
      internalNeedLabel: 'Their Blindspot / Delusion',
      internalNeedPlaceholder: 'e.g. Believes spreadsheets can cure human irrationality',
    },
    problemSection: {
      visible: true,
      title: 'Absurd System & Escalating Stakes',
      subtitle: 'The institutional machine opposing rational thought.',
      obstacleLabel: 'The Absurd System / Antagonistic Bureaucracy',
      obstaclePlaceholder: 'e.g. The Central Oversight Commission and their mandatory wellness audits',
      stakesLabel: 'The Absurd Penalty / Cost',
      stakesPlaceholder: 'e.g. Sentenced to perpetual weekend overtime in the sub-basement archive',
      presetStakesOptions: [
        'Demoted to reviewing shredded inter-office memos',
        'Mandatory attendance at eternal team-building retreats',
        'Promotion to executive committee where no work is ever done',
        'Complete loss of personal lunch-hour autonomy',
      ],
    },
    outcomeSection: {
      title: 'Comedic Resolution',
      subtitle: 'How should the satirical loop conclude?',
      resolutionOptions: [
        { label: 'Ironic Comedic Twist', desc: 'The solution creates a brand-new, even more ridiculous dilemma.' },
        { label: 'Bureaucratic Absolution', desc: 'The system absorbs the rebellion and rebrands it as an official initiative.' },
        { label: 'Sanity Preserved', desc: 'The protagonist escapes the machine while the rest carry on oblivious.' },
      ],
    },
    specializedSection: {
      title: 'Satire & Comedic Engine',
      subtitle: 'Sharpen the mechanism of ridicule and comedic point of view.',
      fieldKey: 'satireTarget',
      label: 'What institution, behavior, belief, or system are you satirizing?',
      placeholder: 'e.g. Corporate tech jargon, algorithmic optimization of human relationships, performative productivity...',
      multiOptions: [
        {
          key: 'satireEngine',
          label: 'Comedic Engine',
          choices: ['Irony & Subversion', 'Escalating Absurdity', 'Deadpan Bureaucracy', 'Parody & Pastiche', 'Farce & Chaos'],
        },
        {
          key: 'satirePov',
          label: 'Comedic Point of View',
          choices: ['Deadpan Observer', 'Naïve True Believer', 'Cynical Insider', 'Bewildered Outsider', 'Institutional Zealot'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'recommended',
      antagonist: 'recommended',
      character_arc: 'optional',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'recommended',
      magic_tech: 'hidden',
      clues_investigation: 'optional',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'essential',
    },
  },

  // 2. MONOGRAPH
  monograph: {
    id: 'monograph',
    name: 'Scholarly Monograph',
    category: 'scholarly_nonfiction',
    structureType: 'argument',
    characterRelevance: 'character_irrelevant',
    description: 'Academic thesis, rigorous critical methodology, primary evidence, and scholarly debate.',
    tag: 'Research & Thesis',
    icon: GraduationCap,
    accent: 'slate',
    coreIdea: {
      label: 'Central Thesis & Research Question',
      placeholder: 'e.g. How the transition to maritime chronometry in 18th-century cartography restructured imperial power dynamics...',
      subtitle: 'What foundational academic argument, theoretical claim, or historical investigation is this monograph advancing?',
      sparkPrompts: [
        'The Epistemic Shift: How early telegraph networks altered diplomatic autonomy and military command structures (1850–1900).',
        'Contested Commons: A comparative analysis of municipal water rights in post-industrial river basins.',
        'The Architecture of Scarcity: Theoretical frameworks of artificial resource rationing in digital media economics.',
      ],
    },
    characterSection: {
      visible: false,
      label: 'Research Focus & Key Thinkers',
      sublabel: 'Protagonist concepts are hidden for scholarly monographs.',
      nameLabel: 'Principal Thinkers / Primary Subjects Examined',
      namePlaceholder: 'e.g. Henri Lefebvre, David Harvey, and the archival planners of the Seine basin',
      goalLabel: 'Scholarly Objective',
      goalPlaceholder: 'e.g. Reconcile contradictory archival trade manifests with state census returns',
      internalNeedLabel: 'Theoretical Framework',
      internalNeedPlaceholder: 'e.g. Critical geography and quantitative historical materialism',
    },
    problemSection: {
      visible: true,
      title: 'Research Problem & Historiographical Gap',
      subtitle: 'What scholarly consensus or gap in knowledge does this work challenge?',
      obstacleLabel: 'Research Problem / Historiographical Tension',
      obstaclePlaceholder: 'e.g. Existing literature overlooks unrecorded informal trade routes in the eastern provinces...',
      stakesLabel: 'Scholarly & Theoretical Significance',
      stakesPlaceholder: 'e.g. Reevaluates the standard timeline of industrialization and labor displacement...',
      presetStakesOptions: [
        'Overturns 50-year orthodox historiography',
        'Provides empirical foundation for future cross-disciplinary studies',
        'Resolves persistent contradictions in primary archival records',
        'Introduces a new predictive taxonomy for sociological analysis',
      ],
    },
    outcomeSection: {
      title: 'Scholarly Conclusion & Scope',
      subtitle: 'How does the argument resolve and what fields does it impact?',
      resolutionOptions: [
        { label: 'Definitive Paradigm Revision', desc: 'Provides comprehensive evidence establishing a new theoretical model.' },
        { label: 'Nuanced Synthesis', desc: 'Reconciles opposing scholarly camps by identifying common structural factors.' },
        { label: 'Critical Epistemic Interrogation', desc: 'Exposes methodological flaws in prevailing literature and charts new inquiries.' },
      ],
    },
    specializedSection: {
      title: 'Methodology & Evidence Matrix',
      subtitle: 'Define the empirical, archival, or theoretical toolkit.',
      fieldKey: 'methodology',
      label: 'Methodological Framework & Primary Evidence',
      placeholder: 'e.g. Archival analysis of 1,200 shipping ledgers, spatial GIS mapping, and contemporaneous legal transcripts...',
      multiOptions: [
        {
          key: 'methodologyType',
          label: 'Primary Methodology',
          choices: ['Archival / Historical', 'Comparative Analysis', 'Qualitative Empirical', 'Quantitative / Statistical', 'Theoretical / Hermeneutic', 'Case Study Synthesis'],
        },
        {
          key: 'scholarlyTone',
          label: 'Academic Tone',
          choices: ['Rigorous Scholarly', 'Critical / Analytical', 'Interdisciplinary Academic', 'Philosophical Discourse'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'hidden',
      antagonist: 'hidden',
      character_arc: 'hidden',
      conflict: 'hidden',
      stakes: 'essential',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'essential',
      methodology: 'essential',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  // 3. HANDBOOK
  handbook: {
    id: 'handbook',
    name: 'Practical Handbook & Guide',
    category: 'practical_reference',
    structureType: 'reference',
    characterRelevance: 'character_irrelevant',
    description: 'Procedures, standard operating checklists, reference tables, troubleshooting, and field workflows.',
    tag: 'Procedures & Reference',
    icon: BookMarked,
    accent: 'emerald',
    coreIdea: {
      label: 'Practical Purpose & Problem Solved',
      placeholder: 'e.g. A field-ready diagnostic handbook for high-reliability electrical troubleshooting in mission-critical environments...',
      subtitle: 'What practical outcome, workplace skill, or procedural task will this handbook help the reader master?',
      sparkPrompts: [
        'The Emergency Response Field Guide: Standardized protocols for rural disaster triage.',
        'The Engineering Lead’s Operating System: Checklists, 1-on-1 cadences, and post-mortem templates.',
        'Studio Ceramic Glazes: A quick-reference formulation table, defect diagnostic chart, and firing curves.',
      ],
    },
    characterSection: {
      visible: false,
      label: 'Target Practitioner & Audience',
      sublabel: 'Protagonist fields are hidden for technical and reference handbooks.',
      nameLabel: 'Primary User Profile',
      namePlaceholder: 'e.g. Field Engineers, On-call Operators, or Apprentices',
      goalLabel: 'Core Operational Goal',
      goalPlaceholder: 'e.g. Rapidly diagnose and remediate telemetry faults in under 15 minutes',
      internalNeedLabel: 'Prerequisite Skill Level',
      internalNeedPlaceholder: 'e.g. Basic familiarity with circuit diagrams and standard multimeter tools',
    },
    problemSection: {
      visible: true,
      title: 'Practical Problem & Operational Risks',
      subtitle: 'What real-world errors or downtime does this handbook prevent?',
      obstacleLabel: 'Core Operational Hazard / Failure Mode',
      obstaclePlaceholder: 'e.g. Cascading thermal runaway caused by uncalibrated sensor drift...',
      stakesLabel: 'Cost of Operational Failure',
      stakesPlaceholder: 'e.g. Equipment burnout, safety compliance violations, and unplanned downtime...',
      presetStakesOptions: [
        'Costly equipment downtime or physical damage',
        'Regulatory non-compliance and audit penalties',
        'Suboptimal yield and redundant rework',
        'Safety hazards and preventable team accidents',
      ],
    },
    outcomeSection: {
      title: 'Handbook Utility & Delivery',
      subtitle: 'How is information structured for quick retrieval?',
      resolutionOptions: [
        { label: 'Field Ready Quick-Reference', desc: 'Denser tables, decision trees, and bulleted action steps for on-the-job execution.' },
        { label: 'Comprehensive Standard Guide', desc: 'Full procedural explanations backed by diagnostic diagrams and failure casebooks.' },
        { label: 'Step-by-Step Playbook', desc: 'Chronological milestone checklists from preparation to verification.' },
      ],
    },
    specializedSection: {
      title: 'Content Organization & Reference Modules',
      subtitle: 'Select how the reference material is organized.',
      fieldKey: 'handbookOrganization',
      label: 'Primary Reference Content & Structure',
      placeholder: 'e.g. Step-by-step diagnostic workflows, symptom-cause-remedy tables, and visual decision trees...',
      multiOptions: [
        {
          key: 'handbookContentType',
          label: 'Core Content Format',
          choices: ['Diagnostic Decision Trees', 'Step-by-Step Procedures', 'Reference Tables & Specs', 'Checklists & Audit Runbooks', 'Troubleshooting Matrices', 'Best Practice Playbooks'],
        },
        {
          key: 'organizationModel',
          label: 'Information Hierarchy',
          choices: ['Problem / Solution (Symptom-first)', 'Procedural Workflow (Linear)', 'Topic-Based Modules', 'Alphabetical Reference Index', 'Severity / Priority Level'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'hidden',
      antagonist: 'hidden',
      character_arc: 'hidden',
      conflict: 'hidden',
      stakes: 'recommended',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'essential',
      learning_exercises: 'optional',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  // 4. CREATIVE WRITING TEXTBOOK / MANUAL
  writing_manual: {
    id: 'writing_manual',
    name: 'Craft Writing Manual & Textbook',
    category: 'practical_reference',
    structureType: 'instructional',
    characterRelevance: 'character_irrelevant',
    description: 'Pedagogical craft breakdowns, structured author labs, exercise tiers, and autopsy case studies.',
    tag: 'Masterclass Guide',
    icon: Feather,
    accent: 'teal',
    coreIdea: {
      label: 'Craft Problem & Learning Objectives',
      placeholder: 'e.g. A masterclass textbook on building relentless narrative momentum through micro-tension, subtext, and scene anatomy...',
      subtitle: 'What writing discipline, storytelling technique, or craft hurdle will the learner conquer?',
      sparkPrompts: [
        'The Architecture of Narrative Tension: Mastering ticking clocks, subtext, and moral friction.',
        'Dialogue as Warfare: Crafting multi-layered speech, subtextual pauses, and weaponized wit in sequential art.',
        'The Clue Matrix: The mathematics of detective plotting, information rationing, and fair-play misdirection.',
      ],
    },
    characterSection: {
      visible: false,
      label: 'The Learner & Skill Target',
      sublabel: 'Protagonist fields are replaced by learner progression.',
      nameLabel: 'Target Learner Profile',
      namePlaceholder: 'e.g. Intermediate novelists looking to elevate flat scenes into dynamic conflicts',
      goalLabel: 'Target Mastery Outcome',
      goalPlaceholder: 'e.g. Confidently construct tight, high-stakes 3-act scene sequences without sag',
      internalNeedLabel: 'Common Student Mistake',
      internalNeedPlaceholder: 'e.g. Tendency to write exposition as dialogue rather than dramatizing action',
    },
    problemSection: {
      visible: true,
      title: 'Craft Problem & Common Story Malfunctions',
      subtitle: 'What storytelling defect does this curriculum cure?',
      obstacleLabel: 'The Story Malfunction / Craft Pitfall',
      obstaclePlaceholder: 'e.g. The dreaded saggy middle where characters talk in circles without escalating stakes...',
      stakesLabel: 'Reader Impact of Craft Failure',
      stakesPlaceholder: 'e.g. Disengaged readers, abandoned manuscripts, and emotionally flat character arcs...',
      presetStakesOptions: [
        'Loss of reader immersion and dropped books',
        'Predictable, formulaic beats that lack originality',
        'Stilted dialogue that feels like thinly veiled exposition',
        'Lack of emotional resonance at the story climax',
      ],
    },
    outcomeSection: {
      title: 'Curriculum & Exercise Framework',
      subtitle: 'How are lessons structured for maximum retention?',
      resolutionOptions: [
        { label: 'Theory + Autopsy + Workshop Exercise', desc: 'Each chapter diagnoses a real writing example, explains the principle, and gives 3 tiered prompts.' },
        { label: '10-Day Intensive Sprint', desc: 'Bite-sized daily craft challenges with concrete word-count and structural constraints.' },
        { label: 'Master Tool Reference & Prompts', desc: 'Deep analytical essays on craft elements paired with extensive prompt toolkits.' },
      ],
    },
    specializedSection: {
      title: 'Pedagogical Lab Structure',
      subtitle: 'Define the balance between craft theory and author exercises.',
      fieldKey: 'pedagogicalFocus',
      label: 'Core Craft Discipline & Lesson Formats',
      placeholder: 'e.g. Scene surgery drills, dialogue subtext autopsies, dilemma ladder construction...',
      multiOptions: [
        {
          key: 'curriculumLevel',
          label: 'Target Learner Level',
          choices: ['Beginner (Fundamentals)', 'Intermediate (Scene Craft)', 'Advanced (Voice & Subtext)', 'Professional / Masterclass'],
        },
        {
          key: 'exerciseFormat',
          label: 'Primary Exercise Format',
          choices: ['Tiered Drills (Easy / Hard / Pro)', 'Story Autopsy & Fixes', 'Constraint-Based Prompts', 'Rewrite Laboratories', 'Peer Critique Checklists'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'hidden',
      antagonist: 'hidden',
      character_arc: 'hidden',
      conflict: 'hidden',
      stakes: 'recommended',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'recommended',
      learning_exercises: 'essential',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  // 5. TRIVIA & FACT BOOK
  trivia: {
    id: 'trivia',
    name: 'Trivia & Fact Knowledge Book',
    category: 'practical_reference',
    structureType: 'question_answer',
    characterRelevance: 'character_irrelevant',
    description: 'Engaging Q&A rounds, mind-bending fact breakdowns, explanations, and challenge levels.',
    tag: 'Q&A & Fact Book',
    icon: HelpCircle,
    accent: 'indigo',
    coreIdea: {
      label: 'Knowledge Theme & Topic Scope',
      placeholder: 'e.g. Mind-Bending Quirks of Physics and Astronomy: 500 questions exploring black holes, time dilation, and orbital mechanics...',
      subtitle: 'What subject domain, trivia theme, or curious phenomena does this book explore?',
      sparkPrompts: [
        'Historical Blunders & Unbelievable Coincidences: 300 trivia challenges from ancient Rome to the Space Race.',
        'Nature’s Bizarre Chemistry: Surprising facts about venom, glowing fungi, and extreme survivalists.',
        'The Ultimate Cinema Subtext Quiz: Uncredited cameos, deleted scenes, and cinematic easter eggs.',
      ],
    },
    characterSection: {
      visible: false,
      label: 'The Reader / Quiz Participant',
      sublabel: 'Protagonist fields are completely hidden for trivia books.',
      nameLabel: 'Participant Level',
      namePlaceholder: 'e.g. Trivia enthusiasts, pub quiz hosts, or curious weekend readers',
      goalLabel: 'Entertainment / Learning Goal',
      goalPlaceholder: 'e.g. Discover surprising, counterintuitive facts that challenge common assumptions',
      internalNeedLabel: 'Target Engagement',
      internalNeedPlaceholder: 'e.g. High entertainment value with bite-sized historical context',
    },
    problemSection: {
      visible: false,
      title: 'Difficulty & Engagement Dynamics',
      subtitle: 'Conflict & stakes are hidden for trivia books.',
      obstacleLabel: 'Quiz Difficulty Curve',
      obstaclePlaceholder: 'e.g. Starts with warm-up common knowledge, escalates to obscure expert trivia',
      stakesLabel: 'Engagement Factor',
      stakesPlaceholder: 'e.g. Fun party gameplay, solo curiosity scratchpad, or classroom icebreakers',
    },
    outcomeSection: {
      title: 'Question Delivery & Book Format',
      subtitle: 'How are questions and explanations arranged?',
      resolutionOptions: [
        { label: 'Question Front / Answer Back with Deep-Dive', desc: 'Each question is answered with an engaging 2-paragraph historical or scientific explanation.' },
        { label: 'Pub Quiz Round System', desc: 'Organized into 10-question thematic rounds with scoring sheets and tiebreakers.' },
        { label: 'Two Truths and a Lie + Fact Exploder', desc: 'Interactive format challenging readers to identify the false claim before the breakdown.' },
      ],
    },
    specializedSection: {
      title: 'Trivia Engine & Question Mechanics',
      subtitle: 'Configure question formats and difficulty calibration.',
      fieldKey: 'triviaCategory',
      label: 'Trivia Subject Categories',
      placeholder: 'e.g. Science, World History, Geography, Pop Culture, Inventions, Oddities...',
      multiOptions: [
        {
          key: 'questionFormat',
          label: 'Primary Question Format',
          choices: ['Multiple Choice', 'True / False with Deep Explanation', 'Open Answer & Guess Before Reveal', 'Two Truths and a Lie', 'Picture / Visual Clue Rounds'],
        },
        {
          key: 'difficultyDistribution',
          label: 'Difficulty Balance',
          choices: ['All Levels / Casual Friendly', 'Escalating (Novice to Master)', 'Hardcore / Trivia Buff Championship', 'Curious & Mind-Blowing Facts'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'hidden',
      antagonist: 'hidden',
      character_arc: 'hidden',
      conflict: 'hidden',
      stakes: 'hidden',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'essential',
      visual_panels: 'hidden',
      humor_engine: 'optional',
    },
  },

  // 6. POP-SCIENCE
  pop_science: {
    id: 'pop_science',
    name: 'Pop-Science & Investigative Inquiry',
    category: 'scholarly_nonfiction',
    structureType: 'conceptual',
    characterRelevance: 'character_assisted',
    description: 'Fascinating scientific enigmas, thought experiments, historical anecdotes, and accessible analogies.',
    tag: 'Science & Inquiry',
    icon: Microscope,
    accent: 'cyan',
    coreIdea: {
      label: 'Central Investigatory Question',
      placeholder: 'e.g. Why does time only flow forward? Investigating entropy, quantum coherence, and the illusion of human perception...',
      subtitle: 'What fascinating paradox, scientific breakthrough, or natural mystery does this book investigate?',
      sparkPrompts: [
        'The Secret Language of Mycelium: How underground fungal networks trade resources and regulate forest biomes.',
        'Why We Sleep: The neurobiology of memory consolidation, cellular repair, and evolutionary trade-offs.',
        'Quantum Paradoxes in Plain English: What entanglement really means for the fabric of space-time.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'Pioneering Scientists & Central Observers',
      sublabel: 'Introduce real researchers or the curious narrator persona.',
      nameLabel: 'Key Researchers / Narrator Voice',
      namePlaceholder: 'e.g. Ludwig Boltzmann, Arthur Eddington, and contemporary quantum cosmologists',
      goalLabel: 'The Scientific Puzzle',
      goalPlaceholder: 'e.g. Unlock why the early universe had such low entropy',
      internalNeedLabel: 'Reader Revelation / Intuition Shift',
      internalNeedPlaceholder: 'e.g. Move past Newtonian clockwork assumptions into probabilistic thermodynamics',
    },
    problemSection: {
      visible: true,
      title: 'Scientific Paradox & Counter-Intuitive Truths',
      subtitle: 'The conceptual wall that baffled thinkers for generations.',
      obstacleLabel: 'The Scientific Enigma / Paradox',
      obstaclePlaceholder: 'e.g. The microscopic laws of physics are time-reversible, yet the macroscopic world is strictly irreversible...',
      stakesLabel: 'Implications for Understanding the Universe',
      stakesPlaceholder: 'e.g. Reconciling general relativity with quantum mechanics and understanding the fate of the cosmos...',
      presetStakesOptions: [
        'Fundamental shift in how readers perceive daily reality',
        'Revolutionizes energy storage and thermodynamic efficiency',
        'Resolves longstanding quantum measurement paradoxes',
        'Illuminates the evolutionary origins of consciousness',
      ],
    },
    outcomeSection: {
      title: 'Conceptual Synthesis',
      subtitle: 'How does the scientific journey resolve for the reader?',
      resolutionOptions: [
        { label: 'Unified Conceptual Synthesis', desc: 'Draws all threads into a lucid, empowering perspective on the natural world.' },
        { label: 'Frontier of the Unknown', desc: 'Clarifies what we know and frames the urgent next-generation questions.' },
        { label: 'Practical Human Implication', desc: 'Translates cosmic or cellular insights into daily human meaning and stewardship.' },
      ],
    },
    specializedSection: {
      title: 'Explanation Architecture & Tone',
      subtitle: 'Calibrate the balance of analogies, experiments, and narrative storytelling.',
      fieldKey: 'popScienceDomain',
      label: 'Primary Scientific Domain & Tone',
      placeholder: 'e.g. Astrophysics, Molecular Biology, Cognitive Neuroscience, Behavioral Economics...',
      multiOptions: [
        {
          key: 'explanationStyle',
          label: 'Primary Explanation Tool',
          choices: ['Visual Thought Experiments', 'Historical Human Anecdotes', 'Everyday Relatable Analogies', 'Step-by-Step Lab Case Studies', 'Mathematical Intuition Without Jargon'],
        },
        {
          key: 'audienceScienceLevel',
          label: 'Reader Technical Baseline',
          choices: ['Curious General Reader (No math required)', 'Educated Layperson (Appreciates precision)', 'Science Enthusiast / Student', 'Deep-Dive Technical Explorer'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'optional',
      antagonist: 'hidden',
      character_arc: 'hidden',
      conflict: 'optional',
      stakes: 'essential',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'optional',
      research_thesis: 'essential',
      methodology: 'recommended',
      procedures_checklists: 'hidden',
      learning_exercises: 'optional',
      qa_formats: 'optional',
      visual_panels: 'hidden',
      humor_engine: 'optional',
    },
  },

  // 7. MYSTERY & DETECTIVE
  mystery: {
    id: 'mystery',
    name: 'Mystery & Detective',
    category: 'fiction',
    structureType: 'case',
    characterRelevance: 'character_driven',
    description: 'Enigmas, suspects, red herrings, clue matrices, and fair-play deductions under pressure.',
    tag: 'Clues & Whodunit',
    icon: Search,
    accent: 'emerald',
    coreIdea: {
      label: 'Central Mystery & Incident',
      placeholder: 'e.g. A locked-room theft occurs on a luxury sleeper train traveling through an isolated Alpine blizzard...',
      subtitle: 'What crime, disappearance, or impossible puzzle initiates the investigation?',
      sparkPrompts: [
        'A locked-room theft occurs on a luxury sleeper train traveling through an isolated blizzard.',
        'A retired puzzle-maker receives a series of antique clocks that count down to unsolved cold cases.',
        'An art conservator uncovers a coded message hidden under the varnish of a priceless Renaissance portrait.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Detective / Investigator',
      sublabel: 'Who leads the inquiry and what is their personal stake?',
      nameLabel: 'Detective Name & Methodology',
      namePlaceholder: 'e.g. Inspector Gabriel Crane, Forensic Cartographer',
      goalLabel: 'What they must prove',
      goalPlaceholder: 'e.g. Identify how the poison was administered before the train reaches the border',
      internalNeedLabel: 'Personal Vulnerability / Secret',
      internalNeedPlaceholder: 'e.g. He is recovering from a previous wrongful arrest that ruined his partner',
    },
    problemSection: {
      visible: true,
      title: 'The Central Crime & Threat of Injustice',
      subtitle: 'The opposing criminal mind and ticking clock.',
      obstacleLabel: 'The Culprit’s Cover-Up / Red Herring System',
      obstaclePlaceholder: 'e.g. Every passenger possesses a mutually corroborating alibi orchestrated by the victim...',
      stakesLabel: 'Consequences of Failure / The Threat',
      stakesPlaceholder: 'e.g. An innocent porter will be hanged and the real killer inherits the fortune...',
      presetStakesOptions: [
        'An innocent suspect will face execution or ruin',
        'The killer strikes again before dawn',
        'Irreversible destruction of crucial evidence',
        'The detective’s career and credibility permanently destroyed',
      ],
    },
    outcomeSection: {
      title: 'The Reveal & Justice',
      subtitle: 'How does the truth come to light?',
      resolutionOptions: [
        { label: 'Classic Fair-Play Parlor Reveal', desc: 'The detective gathers all suspects and demonstrates how every clue fits together.' },
        { label: 'Tense Climax Confrontation', desc: 'A dangerous battle of wits where the detective traps the culprit into self-incrimination.' },
        { label: 'Moral Ambiguity / Pyrrhic Truth', desc: 'The culprit is exposed, but their motive reveals an even darker institutional corruption.' },
      ],
    },
    specializedSection: {
      title: 'Investigation Matrix & Clue Ledger',
      subtitle: 'Architect the web of deception, suspects, and fair-play clues.',
      fieldKey: 'centralPuzzle',
      label: 'The Key Clue & Crucial Red Herring',
      placeholder: 'e.g. The broken pocket watch was deliberately set 40 minutes ahead; the real clue is the damp train ticket...',
      multiOptions: [
        {
          key: 'mysterySubgenre',
          label: 'Mystery Subgenre',
          choices: ['Locked Room / Impossible Crime', 'Cozy Village Whodunit', 'Gritty Hardboiled Procedural', 'Historical Detective', 'Psychological Cat-and-Mouse'],
        },
        {
          key: 'fairPlayStrictness',
          label: 'Fair-Play Adherence',
          choices: ['Strict Golden Age (All clues visible to reader)', 'Psychological Clues (Body language & subtext)', 'Scientific / Forensic Evidence', 'Twist-Heavy / Unreliable Timeline'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'recommended',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'optional',
      magic_tech: 'hidden',
      clues_investigation: 'essential',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'optional',
    },
  },

  // 8. SCIENCE FICTION
  sci_fi: {
    id: 'sci_fi',
    name: 'Science Fiction & Speculative',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Futuristic speculation, novum technology, artificial intelligence, cosmic wonder, and ethical stakes.',
    tag: 'Worldbuilding & Novum',
    icon: Cpu,
    accent: 'cyan',
    coreIdea: {
      label: 'Speculative Novum & Core Premise',
      placeholder: 'e.g. In a city where human sleep has been privatized, a freelance dream-courier accepts an illegal memory contraband...',
      subtitle: 'What technological, scientific, or sociological innovation changes everything?',
      sparkPrompts: [
        'A deep-space salvage crew boards an ancient derelict vessel that appears larger on the inside than the outside.',
        'A planetary weather engineer discovers that the atmosphere is responding to human collective subconscious.',
        'In a city where sleep is privatized, a freelance dream-courier accepts a forbidden memory contraband.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Protagonist & System Position',
      sublabel: 'Who experiences the impact of the novum?',
      nameLabel: 'Protagonist Name & Role in Society',
      namePlaceholder: 'e.g. Kaelen Voss, Orbital Atmospheric Diver',
      goalLabel: 'What they are striving for',
      goalPlaceholder: 'e.g. Secure passage to the unmonitored outer colonies before their neural link expires',
      internalNeedLabel: 'Internal Flaw / Ethical Conflict',
      internalNeedPlaceholder: 'e.g. Struggles to value genuine human intimacy in a world of synthetic companionship',
    },
    problemSection: {
      visible: true,
      title: 'Speculative Problem & Existential Stakes',
      subtitle: 'The technological runaway, systemic oppression, or cosmic dilemma.',
      obstacleLabel: 'The Central Speculative Crisis / Opposing Faction',
      obstaclePlaceholder: 'e.g. The planetary terraforming grid has developed a rogue optimization subroutine that views humans as waste heat...',
      stakesLabel: 'Scope of the Stakes',
      stakesPlaceholder: 'e.g. Collapse of the habitat biosphere and irreversible loss of planetary colonization...',
      presetStakesOptions: [
        'Planetary or ecosystem-wide extinction',
        'Total loss of human cognitive autonomy to algorithmic control',
        'Permanent quarantine and loss of contact with Earth',
        'Destruction of the one colony ship carrying the remaining archives',
      ],
    },
    outcomeSection: {
      title: 'Speculative Resolution',
      subtitle: 'How does humanity or the protagonist adapt to the new reality?',
      resolutionOptions: [
        { label: 'Evolutionary Transcendence', desc: 'Humanity integrates with the new paradigm, forever changed.' },
        { label: 'Hard-Won Survival & Reconnection', desc: 'The immediate crisis is averted, but the ethical dilemmas remain.' },
        { label: 'Cautionary Reckoning', desc: 'The hubris of unchecked technological overreach demands a heavy sacrifice.' },
      ],
    },
    specializedSection: {
      title: 'Speculative World & Technology Rules',
      subtitle: 'Define the novum, scientific consistency, and societal scale.',
      fieldKey: 'speculativePremise',
      label: 'The Core Technology / Novum & Its Unintended Consequence',
      placeholder: 'e.g. Direct neural data streaming allows instant skill mastery, but erodes organic long-term memories...',
      multiOptions: [
        {
          key: 'sciFiScale',
          label: 'Scope of Conflict',
          choices: ['Personal / Cyberpunk Street', 'City / Corporate Dystopia', 'Planetary Biosphere', 'Interplanetary / Solar System', 'Deep Space / Galactic Horizon'],
        },
        {
          key: 'scientificRigor',
          label: 'Scientific Consistency',
          choices: ['Hard Science (Physics-strict)', 'Grounded Speculative Fiction', 'Cyberpunk / Tech-Noir', 'Space Opera / Mythic Sci-Fi'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'essential',
      magic_tech: 'essential',
      clues_investigation: 'optional',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'hidden',
    },
  },

  // 9. EPIC FANTASY
  fantasy: {
    id: 'fantasy',
    name: 'Epic Fantasy & Mythic Lore',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Mythic lore, intricate magic systems with costs, ancient destinies, factions, and grand quests.',
    tag: 'Magic & Lore',
    icon: Compass,
    accent: 'violet',
    coreIdea: {
      label: 'Mythic Quest & Lore Premise',
      placeholder: 'e.g. When the ancient ward-stones protecting the sunken valley begin to weep salt, an apprentice archivist must find the last Ember Smith...',
      subtitle: 'What ancient prophecy, magical upheaval, or perilous journey sets the world into motion?',
      sparkPrompts: [
        'An apprentice cartographer inherits a living atlas that redraws borders as political assassinations occur.',
        'The magic that once healed the realm now extracts a terrifying tax on the caster’s fondest memories.',
        'Two rival orders of knights must escort the shattered crown of a fallen deity to the summit of the World Spine.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Hero / Central Ensemble',
      sublabel: 'Who answers the call and bears the cost of the magic?',
      nameLabel: 'Hero Name & Origin / Order',
      namePlaceholder: 'e.g. Sorsha of the Silver Tide, Novice of the Sunken Spire',
      goalLabel: 'The Sacred Quest / Goal',
      goalPlaceholder: 'e.g. Rekindle the primordial forge before the eclipse turns the tides to glass',
      internalNeedLabel: 'Internal Burden / Forbidden Flaw',
      internalNeedPlaceholder: 'e.g. Bound by an oath to protect the very lineage that destroyed her homeland',
    },
    problemSection: {
      visible: true,
      title: 'Ancient Threat & Magic Constraints',
      subtitle: 'The rising shadow and the steep price of supernatural power.',
      obstacleLabel: 'The Ancient Shadow / Opposing Faction',
      obstaclePlaceholder: 'e.g. The Cinder Lords awakening from beneath the glacial shelf with forgotten sorcery...',
      stakesLabel: 'The Realm-Wide Stakes',
      stakesPlaceholder: 'e.g. Eternal winter across the Seven Valleys and the extinction of the elder races...',
      presetStakesOptions: [
        'Total collapse of the realm’s protective magical barrier',
        'Subjugation of all free kingdoms beneath a tyrannical immortal dynasty',
        'Corruption of the sacred leylines that nourish agriculture and water',
        'The permanent loss of all recorded history and ancestral memory',
      ],
    },
    outcomeSection: {
      title: 'Mythic Climax & Resolution',
      subtitle: 'How does the legendary quest transform the world?',
      resolutionOptions: [
        { label: 'Triumphant Restoration with High Sacrifice', desc: 'The realm is saved, but the age of magic wanes forever.' },
        { label: 'A New World Order Established', desc: 'Old thrones crumble and a fresh, more equitable era begins.' },
        { label: 'Bittersweet Reversal of Destiny', desc: 'The prophecy is fulfilled in a profoundly unexpected, humbling manner.' },
      ],
    },
    specializedSection: {
      title: 'Magic System & World Lore',
      subtitle: 'Define the rules, costs, and limits of magical power.',
      fieldKey: 'fantasyMagicSystem',
      label: 'Magic System Rules, Costs & Sacred Limits',
      placeholder: 'e.g. Magic requires trading physical vitality; shaping flame causes rapid hypothermia in the caster...',
      multiOptions: [
        {
          key: 'magicSystemType',
          label: 'Magic System Style',
          choices: ['Hard Magic (Strict rules & measurable costs)', 'Soft / Mythic (Wonder, awe & mystery)', 'Ritual / Artifact-Based', 'Bloodline & Elemental Sorcery'],
        },
        {
          key: 'fantasyScope',
          label: 'Story Scale',
          choices: ['Epic High Fantasy (Multi-kingdom war)', 'Sword & Sorcery (Intimate, dangerous)', 'Mythic Folk Tale (Fairy-tale logic)', 'Dark Grimdark Fantasy (Moral decay)'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'essential',
      magic_tech: 'essential',
      clues_investigation: 'optional',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'hidden',
    },
  },

  // 10. SUSPENSE & THRILLER
  thriller: {
    id: 'thriller',
    name: 'Suspense & Thriller',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'A ticking clock, psychological tension, relentless escalation, and high personal peril.',
    tag: 'Ticking Clock & Peril',
    icon: Flame,
    accent: 'orange',
    coreIdea: {
      label: 'The Ticking Clock & Core Threat',
      placeholder: 'e.g. An air traffic controller has 45 minutes to locate an untracked jet before military jets are ordered to intercept...',
      subtitle: 'What immediate crisis, deadline, or lethal trap forces rapid, high-stakes decisions?',
      sparkPrompts: [
        'A cyber-security architect discovers that the ransomware holding the hospital network hostage was deployed from her own home IP.',
        'An investigative journalist receives an encrypted USB that starts a 24-hour self-destruct broadcast to hitmen.',
        'A deep-sea saturation diver is trapped in a decompression habitat when the surface ship cuts the umbilical cable.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Target / Desperate Protagonist',
      sublabel: 'Who is trapped in the pressure cooker?',
      nameLabel: 'Protagonist Name & Vulnerability',
      namePlaceholder: 'e.g. Maya Lin, Senior Flight Controller',
      goalLabel: 'Immediate Survival Objective',
      goalPlaceholder: 'e.g. Get the hijacked aircraft safely onto the tarmac without triggering the onboard altitude sensor',
      internalNeedLabel: 'Paranoia / Fatal Mistake',
      internalNeedPlaceholder: 'e.g. Does not know which of her closest colleagues is feeding telemetry to the saboteur',
    },
    problemSection: {
      visible: true,
      title: 'The Relentless Threat & Cost of Escape',
      subtitle: 'The inescapable adversary and shrinking window of opportunity.',
      obstacleLabel: 'The Antagonistic Force / Deadly Deadline',
      obstaclePlaceholder: 'e.g. The ruthless syndicate leader who is always three steps ahead with live camera feeds...',
      stakesLabel: 'Catastrophic Stakes',
      stakesPlaceholder: 'e.g. Hundreds of civilian lives lost and the protagonist framed as the mastermind...',
      presetStakesOptions: [
        'Mass casualty catastrophe if the deadline passes',
        'Immediate execution of captured loved ones',
        'Global economic collapse triggered by stolen financial keys',
        'Irreversible loss of personal identity and lifelong imprisonment',
      ],
    },
    outcomeSection: {
      title: 'Climactic Breakthrough',
      subtitle: 'How does the protagonist outmaneuver the closing trap?',
      resolutionOptions: [
        { label: 'Last-Second Daring Inversion', desc: 'The protagonist exploits the antagonist’s hubris at the final second to flip the trap.' },
        { label: 'Exposing the Higher Conspiracy', desc: 'The immediate threat is neutralized while broadcasting the true culprits to the world.' },
        { label: 'Pyhrric Survival', desc: 'Survival is won, but with permanent psychological scars and a changed worldview.' },
      ],
    },
    specializedSection: {
      title: 'Tension Mechanics & Deadlines',
      subtitle: 'Set the ticking clock and paranoia escalation.',
      fieldKey: 'thrillerClock',
      label: 'The Ticking Clock Deadline & Escalation Stages',
      placeholder: 'e.g. 18 hours until the offshore account unlocks; every 3 hours a security layer collapses...',
      multiOptions: [
        {
          key: 'thrillerType',
          label: 'Thriller Subgenre',
          choices: ['Psychological Domestic Thriller', 'Techno-Thriller / Cyber Warfare', 'Political / Espionage Thriller', 'Legal / Courtroom Suspense', 'Survival / Isolated Peril'],
        },
        {
          key: 'paceSpeed',
          label: 'Pacing Style',
          choices: ['Non-Stop Breakneck Velocity', 'Slow-Burn Creeping Paranoia', 'Real-Time Ticking Clock (Hour by Hour)'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'recommended',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'optional',
      magic_tech: 'hidden',
      clues_investigation: 'recommended',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'hidden',
    },
  },

  // 11. ROMANCE & DRAMA
  romance: {
    id: 'romance',
    name: 'Romance & Emotional Bonds',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Emotional vulnerability, deep relationship arcs, yearning, heartfelt conflict, and tender stakes.',
    tag: 'Emotion & Chemistry',
    icon: Heart,
    accent: 'rose',
    coreIdea: {
      label: 'Central Relationship & Dynamic',
      placeholder: 'e.g. Two rival landscape architects with diametrically opposed styles are forced to co-design the botanical garden for the city centennial...',
      subtitle: 'Who are the two souls whose orbits collide, and what makes their connection irresistible?',
      sparkPrompts: [
        'Two rival landscape architects with opposing styles are forced to co-design the city centennial gardens.',
        'A fiercely independent antique restorer discovers that her anonymous benefactor is the preservationist who outbid her.',
        'Two estranged childhood sweethearts reunite to save their hometown independent cinema from demolition.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Two Leads',
      sublabel: 'Define both characters and their mutual emotional friction.',
      nameLabel: 'Lead A & Lead B Names',
      namePlaceholder: 'e.g. Clara Diaz (Architect) & Julian Ross (Botanist)',
      goalLabel: 'What each wants externally',
      goalPlaceholder: 'e.g. Clara wants international prestige; Julian wants ecological conservation',
      internalNeedLabel: 'Emotional Wounds / What holds them back',
      internalNeedPlaceholder: 'e.g. Clara fears emotional vulnerability; Julian struggles with letting go of past grief',
    },
    problemSection: {
      visible: true,
      title: 'Relationship Conflict & Emotional Obstacle',
      subtitle: 'What stands between them and true intimacy?',
      obstacleLabel: 'The Central Barrier / Emotional Wedge',
      obstaclePlaceholder: 'e.g. Julian’s firm is secretly being acquired by the conglomerate Clara is fighting to defeat...',
      stakesLabel: 'Emotional Stakes (What is lost if they fail)',
      stakesPlaceholder: 'e.g. A lifetime of guarded isolation and walking away from the only person who truly sees them...',
      presetStakesOptions: [
        'A lifetime of emotional isolation and guarded regret',
        'Sacrificing their lifelong creative dream for hollow career optics',
        'Losing mutual trust in a cloud of avoidable misunderstandings',
        'Parting ways forever when the project completes at summer’s end',
      ],
    },
    outcomeSection: {
      title: 'Emotional Resolution',
      subtitle: 'How do their hearts find alignment?',
      resolutionOptions: [
        { label: 'Happily Ever After (HEA)', desc: 'Mutual declarations, emotional vulnerability rewarded, and a joyful shared future.' },
        { label: 'Happy For Now (HFN)', desc: 'Realistic, grounded commitment to growing together through future challenges.' },
        { label: 'Bittersweet Growth & Poignant Farewell', desc: 'Their love profoundly transforms them, though life takes them on separate noble paths.' },
      ],
    },
    specializedSection: {
      title: 'Romantic Dynamic & Tropes',
      subtitle: 'Calibrate the heat, relationship archetype, and intimate pacing.',
      fieldKey: 'romanceDynamic',
      label: 'Primary Romantic Trope & Dynamic',
      placeholder: 'e.g. Enemies to lovers, forced proximity, slow burn yearning, workplace opposites...',
      multiOptions: [
        {
          key: 'romanceTrope',
          label: 'Core Dynamic',
          choices: ['Enemies to Lovers / Professional Rivals', 'Forced Proximity / Shared Journey', 'Second Chance at Love', 'Forbidden / Social Barrier', 'Friends to Lovers', 'Fake Dating / Convenience to Real Emotion'],
        },
        {
          key: 'intimacyPacing',
          label: 'Emotional & Romantic Burn',
          choices: ['Slow Burn (Intense subtext & lingering looks)', 'High Chemistry & Fast Spark', 'Tender & Sweet / Wholesome', 'Dramatic & Angsty Yearning'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'optional',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'optional',
    },
  },

  // 12. HORROR & SUPERNATURAL
  horror: {
    id: 'horror',
    name: 'Horror & Supernatural',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Creeping psychological dread, uncanny anomalies, bizarre entity rules, and claustrophobic isolation.',
    tag: 'Dread & Mystery',
    icon: Ghost,
    accent: 'stone',
    coreIdea: {
      label: 'The Uncanny Anomaly & Source of Dread',
      placeholder: 'e.g. A sound technician recording nocturnal wildlife in an ancient pine forest captures the sound of his own breathing from 50 feet away...',
      subtitle: 'What bizarre disturbance in reality, haunted location, or entity fractures ordinary sanity?',
      sparkPrompts: [
        'A sound technician recording nocturnal wildlife captures the audio of his own breathing from fifty feet away in the darkness.',
        'A restorer cleaning an inherited mirror notices that the reflection in the background is three minutes ahead of reality.',
        'The residents of an isolated coastal town realize that all clocks have stopped, but the ocean tide has not returned.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Protagonist / Survivor',
      sublabel: 'Who confronts the unexplainable?',
      nameLabel: 'Protagonist Name & Occupation',
      namePlaceholder: 'e.g. Thomas Bell, Field Audio Engineer',
      goalLabel: 'What they want initially',
      goalPlaceholder: 'e.g. Rationalize the anomaly with scientific acoustics and pack up before sundown',
      internalNeedLabel: 'Psychological Vulnerability / Guilt',
      internalNeedPlaceholder: 'e.g. Haunted by an unresolved past failure that the entity mimics',
    },
    problemSection: {
      visible: true,
      title: 'The Inexorable Dread & Strange Rules',
      subtitle: 'The uncanny force closing in and the rules governing its malice.',
      obstacleLabel: 'The Source of Dread / Entity Rule',
      obstaclePlaceholder: 'e.g. The entity only moves when you acknowledge having heard it call your name...',
      stakesLabel: 'The Horrific Price / Fate Worse Than Death',
      stakesPlaceholder: 'e.g. Complete assimilation into the mimic chorus and loss of all bodily autonomy...',
      presetStakesOptions: [
        'Total loss of sanity and bodily control to the supernatural entity',
        'Being trapped in an inescapable temporal or spatial loop',
        'Unleashing an ancient, dormant malevolence onto the wider world',
        'Consuming the memories and identities of everyone the protagonist loves',
      ],
    },
    outcomeSection: {
      title: 'The Horrific Climax',
      subtitle: 'How does the confrontation end?',
      resolutionOptions: [
        { label: 'Chilling Ambiguity & Open End', desc: 'The immediate survivor escapes, but the anomaly has taken root in their mind.' },
        { label: 'Costly Banishing', desc: 'The entity is bound, but at the permanent loss of sanity or human companionship.' },
        { label: 'Uncanny Reversal', desc: 'The protagonist discovers that they were part of the entity’s architecture all along.' },
      ],
    },
    specializedSection: {
      title: 'Source of Dread & Horror Rules',
      subtitle: 'Calibrate the nature of the horror and its bizarre governing law.',
      fieldKey: 'horrorSourceOfFear',
      label: 'Nature of Dread & Strange Supernatural Law',
      placeholder: 'e.g. Cosmic dread, uncanny psychological double, forbidden folklore entity...',
      multiOptions: [
        {
          key: 'dreadSource',
          label: 'Primary Horror Source',
          choices: ['Psychological & Unreliable Mind', 'Cosmic Horror (Indifferent Unknown)', 'Uncanny Supernatural Entity', 'Body Horror & Biological Corruption', 'Gothic Folk Lore & Isolation', 'Technological / Analog Glitch Horror'],
        },
        {
          key: 'dreadPacing',
          label: 'Atmosphere Style',
          choices: ['Creeping Atmospheric Slow-Burn', 'Claustrophobic Chamber Dread', 'Surreal Nightmarish Logic', 'Relentless Kinetic Pursuit'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'recommended',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'recommended',
      magic_tech: 'hidden',
      clues_investigation: 'recommended',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'hidden',
    },
  },

  // 13. COMIC BOOK
  comic: {
    id: 'comic',
    name: 'Comic Book / Gag Strips',
    category: 'visual_sequential',
    structureType: 'sequential_visual',
    characterRelevance: 'character_driven',
    description: 'Dynamic 4-to-6 panel action layouts, punchy speech, kinetic sound effects, and visual humor.',
    tag: 'Panels & Action',
    icon: Zap,
    accent: 'rose',
    coreIdea: {
      label: 'Comic Premise & Visual Gag Engine',
      placeholder: 'e.g. A superhero whose only power is inconvenient probability manipulation tries to stop a mundane bank robbery...',
      subtitle: 'What kinetic situation, visual contrast, or funny dynamic powers the comic strip?',
      sparkPrompts: [
        'A superhero whose only power is inconvenient probability manipulation tries to stop a mundane bank robbery.',
        'An over-enthusiastic wizard apprentice tries to automate everyday household chores with chaotic spells.',
        'Two rival street-food vendors engage in escalating gadget warfare during the evening rush.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'Comic Leads & Visual Quirks',
      sublabel: 'Design characters optimized for visual readability and expression.',
      nameLabel: 'Lead Character & Visually Funny Trait',
      namePlaceholder: 'e.g. Captain Calamity (Giant glowing cape that constantly gets stuck in doors)',
      goalLabel: 'What they want in the scene',
      goalPlaceholder: 'e.g. Look heroic on camera while diffusing the safe',
      internalNeedLabel: 'Greatest Comic Weakness / Habit',
      internalNeedPlaceholder: 'e.g. Panics whenever pigeons make direct eye contact',
    },
    problemSection: {
      visible: true,
      title: 'Visual Chaos & The Punchline Dilemma',
      subtitle: 'The escalating mayhem across the page.',
      obstacleLabel: 'The Antagonist / Visual Escalation',
      obstaclePlaceholder: 'e.g. The Bank Manager who insists on inspecting everyone’s deposit slips mid-robbery...',
      stakesLabel: 'Comic Stakes',
      stakesPlaceholder: 'e.g. Complete public embarrassment, destroyed pizza dinner, or blown secret identity...',
      presetStakesOptions: [
        'Total public humiliation on live broadcast',
        'Ruining the annual neighborhood street festival',
        'Accidentally launching the mayor’s limousine into orbit',
        'Being permanently grounded by the Superhero League Board',
      ],
    },
    outcomeSection: {
      title: 'Final Panel Punchline',
      subtitle: 'How does the final panel resolve or surprise the reader?',
      resolutionOptions: [
        { label: 'Visual Punchline / Page-Turn Slapstick', desc: 'The final panel lands a visual gag that flips the premise on its head.' },
        { label: 'Heroic Action Climax', desc: 'An oversized splash panel showing a triumphant, kinetic comic victory.' },
        { label: 'The Infinite Comedic Loop', desc: 'The solution lands the characters right back where they started.' },
      ],
    },
    specializedSection: {
      title: 'Comic Visual Language & Panel Cadence',
      subtitle: 'Configure speech bubbles, panel densities, and lettering style.',
      fieldKey: 'comicVisualStyle',
      label: 'Visual Style & Running Gag Motif',
      placeholder: 'e.g. Expressive Franco-Belgian Ligne Claire with dynamic speed lines and deadpan fourth-wall glances...',
      multiOptions: [
        {
          key: 'panelLayoutCadence',
          label: 'Default Panel Format',
          choices: ['4-Panel Classic Grid (Gag strip)', 'Dynamic 6-Panel Action Layout', 'Full Splash Openers with Inset Panels', 'Manga Pacing (Right-to-Left Action)'],
        },
        {
          key: 'soundEffectStyle',
          label: 'SFX Lettering Vibe',
          choices: ['Retro Vintage Comic (BAM! POW!)', 'Understated Hand-Drawn Indie', 'Hyper-Kinetic Manga Sound Words', 'Minimalist Clean Graphics'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'optional',
      conflict: 'essential',
      stakes: 'recommended',
      worldbuilding: 'recommended',
      magic_tech: 'optional',
      clues_investigation: 'optional',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'essential',
      humor_engine: 'essential',
    },
  },

  // 14. GRAPHIC NOVEL
  graphic_novel: {
    id: 'graphic_novel',
    name: 'Graphic Novel & Cinematic Sequential',
    category: 'visual_sequential',
    structureType: 'sequential_visual',
    characterRelevance: 'character_driven',
    description: 'Cinematic sequential pacing, deep subtext, memorable visual symbols, and graphic storytelling.',
    tag: 'Sequential Art',
    icon: Layers,
    accent: 'purple',
    coreIdea: {
      label: 'Cinematic Premise & Visual Metaphor',
      placeholder: 'e.g. A neon-drenched cyberpunk courier transporting a biological consciousness discovers the memories belong to his lost sister...',
      subtitle: 'What profound human journey is told through the interplay of image and text?',
      sparkPrompts: [
        'A neon-drenched cyberpunk courier must protect a biological AI through the subterranean rain-soaked city.',
        'An aging cellist returns to her hometown to uncover the mystery behind an abandoned lighthouse that still emits music.',
        'Two astronauts stranded on a crystalline moon must communicate using colored laser prisms.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'Graphic Novel Protagonist',
      sublabel: 'Define the character’s internal contradiction and visual signature.',
      nameLabel: 'Protagonist Name & Visual Silhouette',
      namePlaceholder: 'e.g. Ren Kurosawa (Worn leather trench coat, cybernetic ocular graft)',
      goalLabel: 'External Driving Goal',
      goalPlaceholder: 'e.g. Deliver the bio-core to the safe haven in District 9 before midnight',
      internalNeedLabel: 'Internal Contradiction / Subtext',
      internalNeedPlaceholder: 'e.g. Claims he feels no empathy, but risks everything to protect children in the slums',
    },
    problemSection: {
      visible: true,
      title: 'The Antagonistic Philosophy & Dramatic Tension',
      subtitle: 'The conflicting worldview that drives the cinematic conflict.',
      obstacleLabel: 'The Antagonist’s Justified Stance',
      obstaclePlaceholder: 'e.g. The Director believes erasing individual memories is the only cure for generational trauma...',
      stakesLabel: 'The Stakes (Personal & Societal)',
      stakesPlaceholder: 'e.g. The total erasure of human historical record and the loss of individual autonomy...',
      presetStakesOptions: [
        'The permanent loss of individual human consciousness',
        'Condemning the city to perpetual surveillance and synthetic amnesia',
        'Sacrificing personal freedom for safe corporate sedation',
        'Irreversible betrayal of the only family member left alive',
      ],
    },
    outcomeSection: {
      title: 'Cinematic Climax & Visual Resonance',
      subtitle: 'How does the sequential journey resolve its central symbol?',
      resolutionOptions: [
        { label: 'Wordless Double-Page Spread Climax', desc: 'The ultimate realization is delivered purely through visual emotion and lighting.' },
        { label: 'Bittersweet Poetic Metamorphosis', desc: 'A profound thematic transition illustrated with recurring visual motifs.' },
        { label: 'Triumphant Reclamation of Identity', desc: 'The protagonist reclaims their true self and transforms the city horizon.' },
      ],
    },
    specializedSection: {
      title: 'Visual Motifs & Pacing Engine',
      subtitle: 'Establish recurring graphic symbols and what is shown instead of explained.',
      fieldKey: 'recurringVisualSymbol',
      label: 'Recurring Visual Symbol & What is Shown Without Words',
      placeholder: 'e.g. A dying paper crane in puddles; clock faces missing hands; shifting color palettes from cyan to gold...',
      multiOptions: [
        {
          key: 'graphicNovelPacing',
          label: 'Sequential Pacing Model',
          choices: ['Cinematic Widescreen (Decompressed, atmospheric)', 'Dense Multi-Tier Graphic Storytelling', 'Expressive Manga Pacing', 'Poetic & Metaphoric Vignettes'],
        },
        {
          key: 'artisticMediumStyle',
          label: 'Graphic Medium Feel',
          choices: ['Ink & Dramatic Charcoal Shadows', 'Lush Painterly Digital Plates', 'Minimalist Two-Tone Graphic Noir', 'Vibrant Retro Pulp Colors'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'essential',
      magic_tech: 'optional',
      clues_investigation: 'optional',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'essential',
      humor_engine: 'hidden',
    },
  },

  // 15. ILLUSTRATED NOVEL
  illustrated_novel: {
    id: 'illustrated_novel',
    name: 'Illustrated Literary Novel',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Lush literary prose paired with atmospheric, painterly full-page plates and rich interiority.',
    tag: 'Prose & Visual Plates',
    icon: BookOpen,
    accent: 'indigo',
    coreIdea: {
      label: 'Literary Premise & Theme',
      placeholder: 'e.g. A botanist in 19th-century Cornwall discovers a subterranean orchid that preserves the voices of the deceased...',
      subtitle: 'What evocative premise, human longing, and moral dilemma drive the narrative prose?',
      sparkPrompts: [
        'A botanist in 19th-century Cornwall discovers a subterranean orchid that preserves the voices of the deceased.',
        'An archivist assigned to catalog the estate of an eccentric astronomer uncovers letters addressed to people who do not exist.',
        'A clockmaker’s daughter constructs a mechanical songbird that predicts unforeseen changes in weather and political fortunes.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Protagonist',
      sublabel: 'Who journeys through the story and changes along the way?',
      nameLabel: 'Protagonist Name & Social Position',
      namePlaceholder: 'e.g. Eleanor Vance, Botanical Illustrator & Herbarium Keeper',
      goalLabel: 'What they yearn for (External Goal)',
      goalPlaceholder: 'e.g. Complete her late father’s definitive taxonomy before the manor is sold',
      internalNeedLabel: 'Internal Need / Core Vulnerability',
      internalNeedPlaceholder: 'e.g. Must learn that memory cannot substitute for living in the present',
    },
    problemSection: {
      visible: true,
      title: 'Dramatic Tension & Stakes',
      subtitle: 'What stands in their way, and what happens if they fail?',
      obstacleLabel: 'The Opposition / Pressure',
      obstaclePlaceholder: 'e.g. The estate trustees demanding the immediate liquidation of the conservatory...',
      stakesLabel: 'The Stakes (Cost of Failure)',
      stakesPlaceholder: 'e.g. Irreversible destruction of the rare specimen and eviction into poverty...',
      presetStakesOptions: [
        'Irreversible loss of personal freedom and artistic vocation',
        'Total estrangement from family and ancestral roots',
        'Destruction of unique historical archives',
        'Living a life dictated entirely by societal expectations',
      ],
    },
    outcomeSection: {
      title: 'Literary Resolution',
      subtitle: 'What emotional note should linger with the reader?',
      resolutionOptions: [
        { label: 'Bittersweet Transformation', desc: 'A heavy price is paid, but essential internal maturity is won.' },
        { label: 'Triumphant Self-Determination', desc: 'The protagonist overcomes the institutional pressure on their own terms.' },
        { label: 'Poignant Epiphany & Open Horizon', desc: 'The truth is revealed, opening a new chapter of quiet hope.' },
      ],
    },
    specializedSection: {
      title: 'Visual Plates & Literary Tone',
      subtitle: 'Configure the relationship between the prose and full-page illustrations.',
      fieldKey: 'artStyleDescriptor',
      label: 'Atmospheric Visual Plate Style & Frequency',
      placeholder: 'e.g. Painterly oil on canvas with warm amber lighting and deep chiaroscuro contrasts...',
      multiOptions: [
        {
          key: 'illustrationCadence',
          label: 'Illustration Frequency',
          choices: ['Full-Page Chapter Opener Plates', 'Key Dramatic Scene Plates (1 every 3-4 pages)', 'Spot Botanical / Architectural Vignettes', 'Double-Page Panoramic Spreads'],
        },
        {
          key: 'narrativeVoiceStyle',
          label: 'Prose Voice',
          choices: ['Lyrical & Atmospheric (Cormorant / Lora)', 'Wry & Observant (Cinzel / Newsreader)', 'Intimate First-Person Interiority', 'Epic Omniscient Storyteller'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'recommended',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'recommended',
      magic_tech: 'hidden',
      clues_investigation: 'optional',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'hidden',
    },
  },

  // 16. NARRATIVE NONFICTION & BIOGRAPHY
  narrative_nonfiction: {
    id: 'narrative_nonfiction',
    name: 'Narrative Nonfiction & History',
    category: 'scholarly_nonfiction',
    structureType: 'narrative',
    characterRelevance: 'character_assisted',
    description: 'Real historical events, primary subjects, archival evidence, dramatic tension, and factual narrative arc.',
    tag: 'Fact & Narrative',
    icon: FileText,
    accent: 'amber',
    coreIdea: {
      label: 'Historical Subject & Core Narrative',
      placeholder: 'e.g. The untold story of the codebreaker team in Bletchley Park’s Hut 8 who decrypted the naval Enigma traffic...',
      subtitle: 'What real historical event, expedition, or human drama are you bringing to life?',
      sparkPrompts: [
        'The race to map the Amazon River basin: The 1914 Roosevelt-Rondon scientific expedition.',
        'The Forgotten Eclipse: How Arthur Eddington proved Einstein’s theory of general relativity on Principe Island in 1919.',
        'The Radium Girls: How factory workers fought corporate secrecy and transformed workplace safety law.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'Primary Historical Subjects',
      sublabel: 'The real figures at the center of the historical record.',
      nameLabel: 'Central Historical Figure & Role',
      namePlaceholder: 'e.g. Alan Turing & Joan Clarke, Hut 8 Mathematicians',
      goalLabel: 'Historical Objective / Mission',
      goalPlaceholder: 'e.g. Break the German naval M4 four-rotor cipher before the convoy arrives',
      internalNeedLabel: 'Personal Obstacle / Historical Pressure',
      internalNeedPlaceholder: 'e.g. Extreme institutional secrecy, bureaucratic skepticism, and exhaustion',
    },
    problemSection: {
      visible: true,
      title: 'Historical Conflict & Real Stakes',
      subtitle: 'The real-world forces opposing the historical actors.',
      obstacleLabel: 'The Historical Crisis / Obstacle',
      obstaclePlaceholder: 'e.g. Daily blackout periods where the enemy changed the reflector wheel settings...',
      stakesLabel: 'Historical Stakes & Human Impact',
      stakesPlaceholder: 'e.g. Hundreds of merchant vessels carrying food supplies torpedoed in the North Atlantic...',
      presetStakesOptions: [
        'Outcome of major wartime operations and thousands of lives',
        'Transformation of national civil rights and legal protections',
        'Scientific breakthrough that redefined modern medicine',
        'Survival of an isolated expedition in uncharted wilderness',
      ],
    },
    outcomeSection: {
      title: 'Historical Legacy & Epilogue',
      subtitle: 'How did history record their triumph or sacrifice?',
      resolutionOptions: [
        { label: 'Triumphant Historical Breakthrough', desc: 'The objective was achieved, reshaping the modern world.' },
        { label: 'Tragic & Poignant Sacrifice', desc: 'The historical actors paid a heavy personal price while their legacy was recognized years later.' },
        { label: 'Complex Lasting Legacy', desc: 'Examines both the triumphs and the unforeseen complications of their achievement.' },
      ],
    },
    specializedSection: {
      title: 'Archival Evidence & Historical Grounding',
      subtitle: 'Specify primary documentation sources, letters, and factuality standards.',
      fieldKey: 'historicalPeriod',
      label: 'Time Period, Geographic Setting & Primary Sources',
      placeholder: 'e.g. 1941–1943, Bletchley Park, UK; based on declassified War Office memos, personal diaries, and logbooks...',
      multiOptions: [
        {
          key: 'nonfictionStyle',
          label: 'Narrative Approach',
          choices: ['Dramatic Narrative Journalism (Scene-by-scene)', 'Scholarly Historical Investigation', 'Memoir / Oral History Synthesis', 'Expedition / Travelogue Style'],
        },
        {
          key: 'factualityRigour',
          label: 'Dialogue & Factuality Standard',
          choices: ['Strict Documented Quotes Only', 'Dramatized Based on Recorded Letters & Context', 'Narrator Commentary & Archival Interludes'],
        },
      ],
    },
    fieldMatrix: {
      protagonist: 'recommended',
      antagonist: 'optional',
      character_arc: 'recommended',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'recommended',
      magic_tech: 'hidden',
      clues_investigation: 'recommended',
      research_thesis: 'recommended',
      methodology: 'recommended',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'hidden',
    },
  },

  // Fallback defaults for remaining archetypes (mapped safely)
  literary_fiction: {
    id: 'literary_fiction',
    name: 'Literary & Character Fiction',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Deep psychological nuance, layered subtext, character wounds, and moral complexity.',
    tag: 'Interiority & Subtext',
    icon: BookOpen,
    accent: 'slate',
    coreIdea: {
      label: 'Literary Premise & Moral Conflict',
      placeholder: 'e.g. An estranged son returns to manage his father’s bankrupt antique bookstore...',
      subtitle: 'What unspoken desire, moral conflict, and human truth define this story?',
      sparkPrompts: [
        'An estranged son returns to manage his father’s bankrupt antique bookstore in a decaying seaside town.',
        'A classical pianist experiencing hearing loss begins teaching an uncommunicative prodigy.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Protagonist',
      sublabel: 'Who is at the emotional core?',
      nameLabel: 'Protagonist Name & Occupation',
      namePlaceholder: 'e.g. Nicholas Ward, Piano Restorer',
      goalLabel: 'What they profess to want',
      goalPlaceholder: 'e.g. Settle the debt and leave town forever',
      internalNeedLabel: 'What they truly need / Deepest Wound',
      internalNeedPlaceholder: 'e.g. Forgive himself for abandoning his musical passion',
    },
    problemSection: {
      visible: true,
      title: 'Moral Friction & Emotional Stakes',
      subtitle: 'What internal and external friction complicates their choices?',
      obstacleLabel: 'The Emotional Obstacle / Complication',
      obstaclePlaceholder: 'e.g. Uncovering letters that reveal his father sacrificed his own career for Nicholas...',
      stakesLabel: 'The Stakes of Living a Compromised Life',
      stakesPlaceholder: 'e.g. Remaining trapped in emotional isolation and cynical regret...',
    },
    outcomeSection: {
      title: 'Literary Epiphany',
      subtitle: 'How does the emotional journey resolve?',
      resolutionOptions: [
        { label: 'Quiet Catharsis', desc: 'A deeply earned internal transformation and acceptance.' },
        { label: 'Bittersweet Realism', desc: 'Not all wounds heal, but clarity and peace are attained.' },
      ],
    },
    specializedSection: {
      title: 'Literary Symbols & Subtext',
      subtitle: 'Define the motifs that anchor the emotional atmosphere.',
      fieldKey: 'literarySymbol',
      label: 'Key Recurring Symbol & Motif',
      placeholder: 'e.g. A cracked metronome; the smell of rain on old cedar wood; faded sheet music...',
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'optional',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'optional',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  // Map remaining archetypes cleanly
  adventure: {
    id: 'adventure',
    name: 'Action & Adventure Quest',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'High-octane exploration, exotic destinations, deadly traps, rivals, and thrilling milestones.',
    tag: 'Expedition & Peril',
    icon: Compass,
    accent: 'amber',
    coreIdea: {
      label: 'Adventure Destination & Quest Object',
      placeholder: 'e.g. An expedition deep into the uncharted Andean cloud forests to locate a lost Incan observatory...',
      subtitle: 'What legendary relic, uncharted territory, or daring objective drives the expedition?',
      sparkPrompts: [
        'An expedition into the Andean cloud forests to locate a lost Incan astronomical vault.',
        'A deep-sea salvage team racing against a rogue privateer syndicate to recover a sunken galleon.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Explorer / Protagonist',
      sublabel: 'Who leads the perilous quest?',
      nameLabel: 'Explorer Name & Unique Skill',
      namePlaceholder: 'e.g. Dominic Cross, Speleologist and Field Navigator',
      goalLabel: 'The Ultimate Objective',
      goalPlaceholder: 'e.g. Reach the central chamber before the seasonal monsoon floods the canyon',
      internalNeedLabel: 'Personal Vulnerability',
      internalNeedPlaceholder: 'e.g. Recks himself on dangerous risks to overcome the shadow of a fallen mentor',
    },
    problemSection: {
      visible: true,
      title: 'Rivals & Environmental Hazards',
      subtitle: 'What deadly obstacles line the path?',
      obstacleLabel: 'Rival Expedition / Natural Peril',
      obstaclePlaceholder: 'e.g. A heavily financed mercenary salvage crew and crumbling subterranean bridges...',
      stakesLabel: 'Stakes of Failure',
      stakesPlaceholder: 'e.g. The relic falls into the hands of black-market warmongers...',
    },
    outcomeSection: {
      title: 'Triumphant Return',
      subtitle: 'How does the daring expedition conclude?',
      resolutionOptions: [
        { label: 'Daring Escape & Preservation', desc: 'The relic is secured and donated to public historical preservation.' },
        { label: 'Noble Sacrifice of the Treasure', desc: 'The treasure is left to safeguard the indigenous site and preserve lives.' },
      ],
    },
    specializedSection: {
      title: 'Obstacle Ladder & Terrain',
      subtitle: 'Design the physical and strategic hurdles.',
      fieldKey: 'adventureDestination',
      label: 'Expedition Geography & Signature Danger',
      placeholder: 'e.g. Subterranean volcanic lava tubes, unstable rope bridges, poisoned dart mechanisms...',
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'recommended',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'essential',
      magic_tech: 'optional',
      clues_investigation: 'recommended',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'hidden',
    },
  },

  historical_fiction: {
    id: 'historical_fiction',
    name: 'Historical Fiction',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Immersive period authenticity, social barriers, historical events, and timeless human emotions.',
    tag: 'Period Drama',
    icon: Clock,
    accent: 'amber',
    coreIdea: {
      label: 'Historical Setting & Story Premise',
      placeholder: 'e.g. In 17th-century Amsterdam during the Tulip Mania, an apprentice botanist uncovers a forgery syndicate...',
      subtitle: 'What historical period and cultural tension frames the drama?',
      sparkPrompts: [
        'In 1637 Amsterdam, an apprentice painter’s daughter creates a secret pigment that sparks a guild war.',
        'During the building of the Brooklyn Bridge, a female engineer secretly directs the caisson workers.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'Historical Protagonist',
      sublabel: 'Define the character’s social standing and ambitions.',
      nameLabel: 'Protagonist Name & Social Standing',
      namePlaceholder: 'e.g. Margriet van Rijn, Guild Apprentice',
      goalLabel: 'Personal Ambition',
      goalPlaceholder: 'e.g. Gain admittance to the Master Artists Guild under her own name',
      internalNeedLabel: 'Internal Constraint / Societal Pressure',
      internalNeedPlaceholder: 'e.g. Must defy her family’s arranged marriage contract to claim her craft',
    },
    problemSection: {
      visible: true,
      title: 'Historical Pressures & Stakes',
      subtitle: 'The societal rules and period conflicts standing in their way.',
      obstacleLabel: 'The Historical Opposition / Guild Authority',
      obstaclePlaceholder: 'e.g. The conservative Guild of St. Luke enforcing strict male-only mastership...',
      stakesLabel: 'What is at stake',
      stakesPlaceholder: 'e.g. Banishment from the city and confiscation of all her family’s workshops...',
    },
    outcomeSection: {
      title: 'Historical Resolution',
      subtitle: 'How does their struggle leave an imprint on time?',
      resolutionOptions: [
        { label: 'Historic Triumph', desc: 'Achieves a landmark breakthrough that challenges societal norms.' },
        { label: 'Bittersweet Secret Mastery', desc: 'Her masterpiece endures through history, even if her true name remained a guild secret.' },
      ],
    },
    specializedSection: {
      title: 'Period Accuracy & Cultural Texture',
      subtitle: 'Anchor the daily sensory details and vocabulary.',
      fieldKey: 'historicalPeriod',
      label: 'Era, Social Class & Material Culture',
      placeholder: 'e.g. 17th-century Dutch Golden Age; linen workshops, canal transports, guild legal codes...',
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'recommended',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'essential',
      magic_tech: 'hidden',
      clues_investigation: 'optional',
      research_thesis: 'optional',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'hidden',
    },
  },

  dark_comedy: {
    id: 'dark_comedy',
    name: 'Dark Comedy & Moral Satire',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Uncomfortable situations, terrible choices, escalating absurdities, and biting cynicism.',
    tag: 'Biting Irony',
    icon: Flame,
    accent: 'stone',
    coreIdea: {
      label: 'The Terrible Dilemma & Dark Comedic Spark',
      placeholder: 'e.g. Two rival funeral directors accidentally swap the caskets of two notoriously feuding mob bosses...',
      subtitle: 'What uncomfortable premise forces flawed characters into hilariously catastrophic choices?',
      sparkPrompts: [
        'Two rival funeral directors accidentally swap caskets of notoriously feuding underworld figures.',
        'A life insurance fraud investigator falls in love with the woman who faked her husband’s demise.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Flawed Protagonist',
      sublabel: 'Who makes the questionable choices?',
      nameLabel: 'Protagonist Name & Profession',
      namePlaceholder: 'e.g. Barnaby Finch, Stressed Mortician',
      goalLabel: 'What they are trying to cover up',
      goalPlaceholder: 'e.g. Swap the caskets back before the memorial service without getting discovered',
      internalNeedLabel: 'Moral Flaw / Comedic Blindspot',
      internalNeedPlaceholder: 'e.g. Constantly overcomplicates simple problems with convoluted deceptions',
    },
    problemSection: {
      visible: true,
      title: 'The Escalating Catastrophe',
      subtitle: 'How every attempted fix makes the problem 10 times worse.',
      obstacleLabel: 'The Unforeseen Complication',
      obstaclePlaceholder: 'e.g. The grieving family brings in a forensic priest to bless the casket in public...',
      stakesLabel: 'The Disastrous Consequences',
      stakesPlaceholder: 'e.g. Prison time, total ruin of the funeral parlor, and mafia retaliation...',
    },
    outcomeSection: {
      title: 'Dark Comedic Payoff',
      subtitle: 'How does the chaotic spiral end?',
      resolutionOptions: [
        { label: 'Hilarious Pyrrhic Survival', desc: 'They survive by the skin of their teeth, but the cover-up causes a bizarre town legend.' },
        { label: 'Poetic Justice & Absurd Twist', desc: 'The real culprit is caught in their own trap in the most ridiculous manner.' },
      ],
    },
    specializedSection: {
      title: 'Dark Comedy Boundaries & Escalation',
      subtitle: 'Ensure jokes remain sharp without punching down.',
      fieldKey: 'uncomfortableSubject',
      label: 'The Uncomfortable Subject & Escalation Mechanism',
      placeholder: 'e.g. Bureaucratic cover-up of minor mistakes turning into municipal emergencies...',
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'recommended',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'optional',
      magic_tech: 'hidden',
      clues_investigation: 'optional',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'essential',
    },
  },

  absurdist: {
    id: 'absurdist',
    name: 'Absurdist & Surreal Fiction',
    category: 'fiction',
    structureType: 'conceptual',
    characterRelevance: 'character_assisted',
    description: 'Kafkaesque logic, impossible rules accepted casually, and philosophical existential satire.',
    tag: 'Surreal Logic',
    icon: Sparkles,
    accent: 'purple',
    coreIdea: {
      label: 'The Impossible Rule & Surreal Premise',
      placeholder: 'e.g. One morning, a postal clerk wakes up to discover all words containing the letter E have been confiscated by the Department of Vowels...',
      subtitle: 'What surreal anomaly turns ordinary logic upside down?',
      sparkPrompts: [
        'A postal clerk wakes up to discover all words containing the letter E have been confiscated by the government.',
        'A man receives jury duty summons for a trial where he is simultaneously the judge, defendant, and court reporter.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Bewildered Citizen',
      sublabel: 'Who navigates the bizarre reality?',
      nameLabel: 'Protagonist Name & Role',
      namePlaceholder: 'e.g. K. Valmont, Senior Sorter of Missing Consonants',
      goalLabel: 'Ordinary Objective in an Impossible World',
      goalPlaceholder: 'e.g. File an official complaint without using the forbidden vowel',
      internalNeedLabel: 'Philosophical Struggle',
      internalNeedPlaceholder: 'e.g. Trying to find logical meaning in a world built on pure arbitrary nonsense',
    },
    problemSection: {
      visible: true,
      title: 'The Kafkaesque Machine',
      subtitle: 'The cheerful indifference of the absurd system.',
      obstacleLabel: 'The Absurd Bureaucracy / Impossible Rule',
      obstaclePlaceholder: 'e.g. The clerk at the complaints desk demands a receipt that can only be issued after the complaint is approved...',
      stakesLabel: 'The Absurdist Stakes',
      stakesPlaceholder: 'e.g. Complete absorption into the nonsensical machinery of state paperwork...',
    },
    outcomeSection: {
      title: 'Existential Conclusion',
      subtitle: 'How does the surreal loop conclude?',
      resolutionOptions: [
        { label: 'Joyful Acceptance of the Absurd', desc: 'The protagonist learns to dance within the nonsense and finds peace.' },
        { label: 'The Endless Hallway', desc: 'The loop deepens, creating a timeless philosophical parable.' },
      ],
    },
    specializedSection: {
      title: 'Impossible Rules & Normalization',
      subtitle: 'What impossible law is accepted without question by everyone else?',
      fieldKey: 'absurdistImpossibleRule',
      label: 'The Absurd Reality Rule',
      placeholder: 'e.g. Gravity operates horizontally on Thursdays; everyone wears magnetic boots as if it is normal...',
    },
    fieldMatrix: {
      protagonist: 'recommended',
      antagonist: 'optional',
      character_arc: 'optional',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'essential',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'optional',
      humor_engine: 'essential',
    },
  },

  // Fallbacks for workshop types or essays
  universal: {
    id: 'universal',
    name: 'Universal Custom Book',
    category: 'fiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'Custom blend of narrative, thematic, and visual publishing controls.',
    tag: 'Flexible Canvas',
    icon: Sparkles,
    accent: 'indigo',
    coreIdea: {
      label: 'Core Book Concept & Vision',
      placeholder: 'e.g. Describe your vision, theme, or book concept...',
      subtitle: 'What is the core premise and purpose of this book?',
      sparkPrompts: [
        'A comprehensive hybrid project combining rich story chapters with practical exercises and illustrations.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'Central Character / Subject',
      sublabel: 'Define the lead subject or protagonist.',
      nameLabel: 'Subject / Protagonist Name',
      namePlaceholder: 'e.g. The Central Lead',
      goalLabel: 'Primary Goal',
      goalPlaceholder: 'e.g. What they seek to accomplish',
      internalNeedLabel: 'Core Vulnerability / Theme',
      internalNeedPlaceholder: 'e.g. What changes internally',
    },
    problemSection: {
      visible: true,
      title: 'Core Tension & Stakes',
      subtitle: 'What challenges define the journey?',
      obstacleLabel: 'Primary Obstacle',
      obstaclePlaceholder: 'e.g. The central opposition or difficulty',
      stakesLabel: 'The Stakes',
      stakesPlaceholder: 'e.g. What happens if unsuccessful',
    },
    outcomeSection: {
      title: 'Resolution & Outcome',
      subtitle: 'How does the book conclude?',
      resolutionOptions: [
        { label: 'Triumphant Completion', desc: 'Clear achievement and resolution.' },
        { label: 'Thoughtful Transformation', desc: 'Deep internal realization and lingering resonance.' },
      ],
    },
    specializedSection: {
      title: 'Specialized Features',
      subtitle: 'Custom hook or unique differentiator.',
      fieldKey: 'uniqueHook',
      label: 'Unique Hook',
      placeholder: 'e.g. What makes this book singular...',
    },
    fieldMatrix: {
      protagonist: 'recommended',
      antagonist: 'optional',
      character_arc: 'optional',
      conflict: 'recommended',
      stakes: 'recommended',
      worldbuilding: 'optional',
      magic_tech: 'optional',
      clues_investigation: 'optional',
      research_thesis: 'optional',
      methodology: 'optional',
      procedures_checklists: 'optional',
      learning_exercises: 'optional',
      qa_formats: 'optional',
      visual_panels: 'optional',
      humor_engine: 'optional',
    },
  },
  
  illustrated_essay: {
    id: 'illustrated_essay',
    name: 'Illustrated Essay & Critical Study',
    category: 'scholarly_nonfiction',
    structureType: 'argument',
    characterRelevance: 'character_irrelevant',
    description: 'Philosophical discourse, critical cultural studies, and visual metaphors.',
    tag: 'Essay & Discourse',
    icon: FileText,
    accent: 'slate',
    coreIdea: {
      label: 'Central Thesis & Cultural Subject',
      placeholder: 'e.g. An inquiry into the architecture of silence in modern metropolis living...',
      subtitle: 'What cultural, artistic, or philosophical question does this essay explore?',
      sparkPrompts: [
        'The Architecture of Solitude: How spatial design influences modern loneliness.',
      ],
    },
    characterSection: {
      visible: false,
      label: 'Narrative Voice / Subject',
      sublabel: 'Protagonists are hidden for critical essays.',
      nameLabel: 'Author Voice / Key Figures Examined',
      namePlaceholder: 'e.g. Critical observer persona',
      goalLabel: 'Thematic Exploration',
      goalPlaceholder: 'e.g. Uncover how urban noise pollution mirrors digital anxiety',
      internalNeedLabel: 'Philosophical Lens',
      internalNeedPlaceholder: 'e.g. Phenomenology and spatial theory',
    },
    problemSection: {
      visible: true,
      title: 'Critical Tension & Cultural Stakes',
      subtitle: 'What cultural myth or accepted practice is examined?',
      obstacleLabel: 'The Cultural Contradiction / Thesis Problem',
      obstaclePlaceholder: 'e.g. We design hyper-connected buildings that prevent human encounter...',
      stakesLabel: 'Cultural & Human Significance',
      stakesPlaceholder: 'e.g. The degradation of spontaneous community connection...',
    },
    outcomeSection: {
      title: 'Essay Conclusion',
      subtitle: 'What insight should the reader take away?',
      resolutionOptions: [
        { label: 'Transformative Synthesis', desc: 'Re-envisions our relationship with everyday spaces.' },
        { label: 'Open Critical Invitation', desc: 'Leaves the reader looking at their surroundings with fresh eyes.' },
      ],
    },
    specializedSection: {
      title: 'Visual Metaphors & Discourse Style',
      subtitle: 'Define the visual imagery accompanying the critical text.',
      fieldKey: 'essayThesis',
      label: 'Visual Metaphors & Core Thesis',
      placeholder: 'e.g. Architectural floorplans, high-contrast monochrome street photography...',
    },
    fieldMatrix: {
      protagonist: 'hidden',
      antagonist: 'hidden',
      character_arc: 'hidden',
      conflict: 'hidden',
      stakes: 'essential',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'essential',
      methodology: 'recommended',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  character_workshop: {
    id: 'character_workshop',
    name: 'Character Craft Workshop',
    category: 'practical_reference',
    structureType: 'instructional',
    characterRelevance: 'character_driven',
    description: 'Deep psychological character interrogation, flaw matrices, and voice drills.',
    tag: 'Character Architecture',
    icon: Feather,
    accent: 'teal',
    coreIdea: {
      label: 'Character Focus & Psychological Dilemma',
      placeholder: 'e.g. Developing an anti-hero whose moral compromise drives the entire plot...',
      subtitle: 'What type of character architecture are you designing in this workshop?',
      sparkPrompts: [
        'The Flawed Mentor: Crafting guides who pass on their own unresolved wounds.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'Character Under Construction',
      sublabel: 'Interrogate the character’s internal engine.',
      nameLabel: 'Character Name & Core Archetype',
      namePlaceholder: 'e.g. Dr. Arthur Vance, The Cynical Healer',
      goalLabel: 'The External Lie / False Goal',
      goalPlaceholder: 'e.g. Wants to be left alone in his research laboratory',
      internalNeedLabel: 'The Unbearable Truth / Internal Need',
      internalNeedPlaceholder: 'e.g. Needs to accept responsibility for the patients he could not save',
    },
    problemSection: {
      visible: true,
      title: 'Pressure Point & Breaking Test',
      subtitle: 'What situation forces them to choose between their lie and their growth?',
      obstacleLabel: 'The Pressure Crucible',
      obstaclePlaceholder: 'e.g. An epidemic strikes the village where his estranged daughter teaches...',
      stakesLabel: 'Moral Stakes of Failing the Test',
      stakesPlaceholder: 'e.g. Becoming the very monster he swore to eradicate...',
    },
    outcomeSection: {
      title: 'Character Arc Outcome',
      subtitle: 'How does the character transform?',
      resolutionOptions: [
        { label: 'Positive Transformative Arc', desc: 'Overcomes the false belief and embraces the painful truth.' },
        { label: 'Tragic / Flat Moral Fall', desc: 'Doubles down on the lie, sealing their tragic fate.' },
      ],
    },
    specializedSection: {
      title: 'Character Voice & Flaw Exercises',
      subtitle: 'Structured drills for distinct cadence and habits.',
      fieldKey: 'characterWant',
      label: 'Voice Style & Contradictions',
      placeholder: 'e.g. Speaks in clipped medical terms; habitually avoids physical contact...',
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'recommended',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'optional',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'essential',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  plot_workshop: {
    id: 'plot_workshop',
    name: 'Plot & Pacing Workshop',
    category: 'practical_reference',
    structureType: 'instructional',
    characterRelevance: 'character_driven',
    description: 'Ticking clocks, midpoints, reversals, dilemma chains, and structural scene escalations.',
    tag: 'Plot Mechanics',
    icon: Feather,
    accent: 'teal',
    coreIdea: {
      label: 'Plot Movement & Dramatic Engine',
      placeholder: 'e.g. Architecting an inexorable 3-act escalation with a catastrophic midpoint reversal...',
      subtitle: 'What structural plotting challenge are you engineering?',
      sparkPrompts: [
        'The Reversal Engine: How to build a midpoint turn that inverts all previous assumptions.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Catalyst Character',
      sublabel: 'Who drives the causal dominoes?',
      nameLabel: 'Protagonist Role in the Plot Machinery',
      namePlaceholder: 'e.g. The Instigator of the Initial Decision',
      goalLabel: 'The Direct Catalyst Action',
      goalPlaceholder: 'e.g. Steals the encrypted ledger to pay for medical treatment',
      internalNeedLabel: 'The Unforeseen Consequence',
      internalNeedPlaceholder: 'e.g. Unwittingly reveals the location of the underground resistance',
    },
    problemSection: {
      visible: true,
      title: 'The Ticking Clock & Reversal Chain',
      subtitle: 'The causal causality chaining scenes together.',
      obstacleLabel: 'The Reversal / Complication Beat',
      obstaclePlaceholder: 'e.g. The buyer for the ledger turns out to be the head of the security police...',
      stakesLabel: 'Structural Stakes',
      stakesPlaceholder: 'e.g. Complete collapse of all narrative escape routes by Act 3...',
    },
    outcomeSection: {
      title: 'Climactic Payoff',
      subtitle: 'How does the plot resolve its causality?',
      resolutionOptions: [
        { label: 'Inevitable & Surprising Climax', desc: 'Every setup pays off in a tightly wound, satisfying conclusion.' },
        { label: 'Open-Ended Reversal', desc: 'A final twist reshapes the context of the entire preceding plot.' },
      ],
    },
    specializedSection: {
      title: 'Causal Chain & Escalation Beats',
      subtitle: 'Link cause and effect across key milestone moments.',
      fieldKey: 'oneSentencePremise',
      label: 'The Plot Movement Matrix',
      placeholder: 'e.g. Inciting Incident -> Midpoint False Victory -> Dark Night Crisis -> Irreversible Climax...',
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'essential',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'optional',
      magic_tech: 'hidden',
      clues_investigation: 'optional',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'essential',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  dilemma_workshop: {
    id: 'dilemma_workshop',
    name: 'Dilemma Engine Workshop',
    category: 'practical_reference',
    structureType: 'instructional',
    characterRelevance: 'character_driven',
    description: 'Irreversible moral choices, trade-offs, and escalating consequences where both choices carry cost.',
    tag: 'Moral Agony',
    icon: Feather,
    accent: 'teal',
    coreIdea: {
      label: 'The Irreconcilable Dilemma',
      placeholder: 'e.g. Save the innocent hostage vs secure the evidence that will prevent a catastrophic bombing tomorrow...',
      subtitle: 'What dramatic dilemma forces a choice between two vital values with irreversible costs?',
      sparkPrompts: [
        'Loyalty to Family vs Obligation to the Truth: What if exposing the fraud saves hundreds but ruins your sibling?',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Decision Maker',
      sublabel: 'Who stands at the crossroads of choice?',
      nameLabel: 'Protagonist Name & Moral Anchor',
      namePlaceholder: 'e.g. Maya Chen, Ethics Officer',
      goalLabel: 'The Value They Prioritize Initially',
      goalPlaceholder: 'e.g. Absolute institutional loyalty and order',
      internalNeedLabel: 'The Moral Price',
      internalNeedPlaceholder: 'e.g. Must choose between being an obedient soldier or a just human being',
    },
    problemSection: {
      visible: true,
      title: 'Choice A vs Choice B Costs',
      subtitle: 'Where neither path allows painless escape.',
      obstacleLabel: 'The Two Irreconcilable Choices',
      obstaclePlaceholder: 'e.g. Choice A: Testify against the firm (Career suicide); Choice B: Stay silent (Moral corruption)...',
      stakesLabel: 'Irreversible Cost',
      stakesPlaceholder: 'e.g. Living with the knowledge of complicity in an avoidable disaster...',
    },
    outcomeSection: {
      title: 'Consequence & Payoff',
      subtitle: 'What is the long-term price of the decision?',
      resolutionOptions: [
        { label: 'Costly Moral Integrity', desc: 'The character sacrifices their status to protect their human integrity.' },
        { label: 'Tragic Compromise', desc: 'Takes the lesser evil, haunted forever by the path not chosen.' },
      ],
    },
    specializedSection: {
      title: 'Dilemma Escalation Ladder',
      subtitle: 'Structure the domino effect of consequences.',
      fieldKey: 'obstacle',
      label: 'The 5-Stage Consequence Domino',
      placeholder: 'e.g. Immediate Cost -> Relational Complication -> Unintended Reversal -> Public Exposure -> Climax...',
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'recommended',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'hidden',
      methodology: 'hidden',
      procedures_checklists: 'hidden',
      learning_exercises: 'essential',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  textbook: {
    id: 'textbook',
    name: 'Academic Textbook & Curriculum',
    category: 'scholarly_nonfiction',
    structureType: 'instructional',
    characterRelevance: 'character_irrelevant',
    description: 'Comprehensive pedagogical course material with chapter objectives, structured modules, exercises, and case studies.',
    tag: 'Curriculum & Study',
    icon: GraduationCap,
    accent: 'blue',
    coreIdea: {
      label: 'Curriculum Scope & Central Discipline',
      placeholder: 'e.g. A comprehensive undergraduate introduction to cognitive neuroscience and neural network models...',
      subtitle: 'What discipline, course curriculum, or field of study is being systematically taught?',
      sparkPrompts: [
        'An introductory textbook on modern algorithmic economics and decentralized market mechanisms.',
        'A clinical curriculum on emergency wilderness medicine and trauma triage protocols.',
      ],
    },
    characterSection: {
      visible: false,
      label: 'Lead Instructor / Persona',
      sublabel: 'Optional pedagogical voice.',
      nameLabel: 'Lead Author / Persona',
      namePlaceholder: 'e.g. Course Director / Academic Panel',
      goalLabel: 'Learning Mastery Benchmark',
      goalPlaceholder: 'e.g. Ensure students master foundational concepts and pass board certifications',
      internalNeedLabel: 'Pedagogical Rigor',
      internalNeedPlaceholder: 'e.g. Balancing foundational theory with practical laboratory applications',
    },
    problemSection: {
      visible: true,
      title: 'Pedagogical Challenge & Knowledge Gap',
      subtitle: 'What barrier to comprehension does this text resolve?',
      obstacleLabel: 'Cognitive Hurdle / Misconceptions',
      obstaclePlaceholder: 'e.g. Common student confusion between algorithmic complexity and practical runtime bottlenecks...',
      stakesLabel: 'Educational Stakes',
      stakesPlaceholder: 'e.g. Students fail to apply theoretical constructs in live laboratory settings...',
      presetStakesOptions: [
        'Failure to grasp core foundational principles',
        'Inability to pass standardized certification exams',
        'Misapplication of protocols in real-world professional practice',
      ],
    },
    outcomeSection: {
      title: 'Curricular Mastery & Evaluation',
      subtitle: 'How is student understanding validated?',
      resolutionOptions: [
        { label: 'Cumulative Capstone Project', desc: 'Students synthesize all modules into a comprehensive final application.' },
        { label: 'Diagnostic Mastery Exam', desc: 'Rigorous assessment testing analytical comprehension and problem solving.' },
      ],
    },
    specializedSection: {
      title: 'Chapter Pedagogy & Problem Sets',
      subtitle: 'Configure module delivery and assessment tools.',
      fieldKey: 'methodology',
      label: 'Learning Objectives & Problem Set Structure',
      placeholder: 'e.g. 1. Bloom Taxonomy Objectives, 2. Worked Examples, 3. Progressive Problem Sets (Tier 1-4)...',
    },
    fieldMatrix: {
      protagonist: 'hidden',
      antagonist: 'hidden',
      character_arc: 'hidden',
      conflict: 'optional',
      stakes: 'essential',
      worldbuilding: 'hidden',
      magic_tech: 'hidden',
      clues_investigation: 'hidden',
      research_thesis: 'essential',
      methodology: 'essential',
      procedures_checklists: 'recommended',
      learning_exercises: 'essential',
      qa_formats: 'recommended',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },

  biography: {
    id: 'biography',
    name: 'Biography & Historical Life',
    category: 'scholarly_nonfiction',
    structureType: 'narrative',
    characterRelevance: 'character_driven',
    description: 'An authoritative, rigorously sourced narrative recounting the life, trials, breakthroughs, and legacy of a historical figure.',
    tag: 'Life & Legacy',
    icon: FileText,
    accent: 'amber',
    coreIdea: {
      label: 'Biographical Subject & Historical Arc',
      placeholder: 'e.g. The definitive life of Ada Lovelace: calculating the mechanical imagination amidst Victorian scientific upheaval...',
      subtitle: 'Who is the historical figure, and what is the central paradox or arc of their life?',
      sparkPrompts: [
        'The untold life of a codebreaker whose mathematics shaped post-war cryptography while living in total secrecy.',
        'A portrait of an eccentric Renaissance architect who reinvented urban geometry against ecclesiastical condemnation.',
      ],
    },
    characterSection: {
      visible: true,
      label: 'The Biographical Subject',
      sublabel: 'The historical person at the center of the narrative.',
      nameLabel: 'Subject Name & Historical Role',
      namePlaceholder: 'e.g. Ada Lovelace, Countess of Lovelace & Mathematician',
      goalLabel: 'Their Defining Ambition / Quest',
      goalPlaceholder: 'e.g. Create a universal language for the Analytical Engine to weave algebraic patterns',
      internalNeedLabel: 'Personal Struggle / Paradox',
      internalNeedPlaceholder: 'e.g. Reconciling her poetic imagination with her father’s notorious legacy and physical frailty',
    },
    problemSection: {
      visible: true,
      title: 'Historical Opposition & Era Constraints',
      subtitle: 'The societal, political, or scientific resistance they confronted.',
      obstacleLabel: 'Primary Historical Obstacle / Opposition',
      obstaclePlaceholder: 'e.g. Institutional sexism in the Royal Society and the limits of 19th-century mechanical metallurgy...',
      stakesLabel: 'Historical & Personal Stakes',
      stakesPlaceholder: 'e.g. Loss of intellectual recognition, obscurity, and the erasure of foundational computer science...',
      presetStakesOptions: [
        'Erasure from the historical record',
        'Bankruptcy and the collapse of a revolutionary invention',
        'Personal tragedy and political imprisonment',
      ],
    },
    outcomeSection: {
      title: 'Legacy & Historiographical Resolution',
      subtitle: 'How is their contribution evaluated across history?',
      resolutionOptions: [
        { label: 'Posthumous Vindication', desc: 'Their groundbreaking vision is recognized decades or centuries later.' },
        { label: 'Bittersweet Triumph', desc: 'Achieved epochal greatness while bearing immense personal sacrifice.' },
      ],
    },
    specializedSection: {
      title: 'Archival Sources & Historical Evidence',
      subtitle: 'Primary documents, correspondence, and diaries grounding the biography.',
      fieldKey: 'methodology',
      label: 'Primary Sources & Archival Basis',
      placeholder: 'e.g. 500 family letters, unpublished laboratory notebooks from the Bodleian Library, and contemporary diary entries...',
    },
    fieldMatrix: {
      protagonist: 'essential',
      antagonist: 'recommended',
      character_arc: 'essential',
      conflict: 'essential',
      stakes: 'essential',
      worldbuilding: 'recommended',
      magic_tech: 'hidden',
      clues_investigation: 'recommended',
      research_thesis: 'essential',
      methodology: 'essential',
      procedures_checklists: 'hidden',
      learning_exercises: 'hidden',
      qa_formats: 'hidden',
      visual_panels: 'hidden',
      humor_engine: 'hidden',
    },
  },
};

// Available "Advanced Story Layers" Safety Valves that can be enabled on any genre
export const AVAILABLE_ADAPTIVE_LAYERS: AdaptiveStoryLayer[] = [
  {
    id: 'narrative_layer',
    name: 'Narrative & Character Layer',
    description: 'Add central characters, personal emotional arcs, scene tension, and dramatic stakes to non-fiction or reference works.',
    iconName: 'UserCheck',
    fieldsExposed: ['protagonistName', 'protagonistWant', 'protagonistNeed', 'antagonist', 'characterArcBeginning'],
  },
  {
    id: 'clues_layer',
    name: 'Investigation & Clue Matrix',
    description: 'Add clues, suspect alibis, red herrings, and fair-play revelation beats.',
    iconName: 'Search',
    fieldsExposed: ['mysteryWhatHappened', 'mysteryAppearsResponsible', 'suspectMatrix', 'clueSystem'],
  },
  {
    id: 'visual_comic_layer',
    name: 'Sequential Panels & Visual Storytelling',
    description: 'Enable panel grids, visual gags, recurring symbols, and comic layout timing.',
    iconName: 'Layers',
    fieldsExposed: ['comicVisualStyle', 'comicPanelsPerPage', 'comicPanelScenes', 'recurringVisualSymbol'],
  },
  {
    id: 'worldbuilding_layer',
    name: 'Worldbuilding & Lore Engine',
    description: 'Define factions, geography, technology constraints, or magic systems and their costs.',
    iconName: 'Compass',
    fieldsExposed: ['setting', 'speculativePremise', 'fantasyMagicSystem', 'fantasyMagicCost', 'worldRules'],
  },
  {
    id: 'exercises_layer',
    name: 'Instructional Exercises & Labs',
    description: 'Embed learning objectives, tiered exercises, challenges, and mastery drills.',
    iconName: 'Feather',
    fieldsExposed: ['manualLearningObjective', 'manualExerciseTiers', 'lessonFormat'],
  },
  {
    id: 'checklist_layer',
    name: 'Procedures & Quick Reference Runbooks',
    description: 'Add standard operating procedures, decision trees, and checklists.',
    iconName: 'CheckCircle2',
    fieldsExposed: ['handbookContentType', 'handbookOrganization', 'handbookKeyProcedures'],
  },
];

// Helper: Resolve effective configuration combining Primary Genre + Secondary Genre + Enabled Layers
export function resolveEffectiveGenreConfig(
  primaryGenreId: StoryArchetype,
  secondaryGenreId?: StoryArchetype | null,
  activeLayerIds: AdaptiveStoryLayerId[] = []
): {
  primary: AdaptiveGenreConfig;
  secondary?: AdaptiveGenreConfig;
  combinedName: string;
  combinedDescription: string;
  characterRelevance: CharacterRelevanceType;
  structureType: GenreStructureType;
  showCharacterSection: boolean;
  showProblemSection: boolean;
  showSpecializedSection: boolean;
  activeLayers: AdaptiveStoryLayer[];
  fieldMatrix: Record<string, FieldVisibilityStatus>;
} {
  const primary = ALL_ADAPTIVE_GENRES[primaryGenreId] || ALL_ADAPTIVE_GENRES.illustrated_novel;
  const secondary = secondaryGenreId ? ALL_ADAPTIVE_GENRES[secondaryGenreId] : undefined;

  // Compute character relevance
  let charRelevance = primary.characterRelevance;
  if (activeLayerIds.includes('narrative_layer') || activeLayerIds.includes('character_layer')) {
    charRelevance = 'character_driven';
  } else if (secondary && secondary.characterRelevance === 'character_driven') {
    charRelevance = 'character_assisted';
  }

  // Combined title
  const combinedName = secondary
    ? `${primary.name} + ${secondary.name}`
    : primary.name;

  const combinedDescription = secondary
    ? `${primary.description} Seamlessly integrated with ${secondary.name.toLowerCase()} elements.`
    : primary.description;

  // Active layers objects
  const activeLayers = AVAILABLE_ADAPTIVE_LAYERS.filter(l => activeLayerIds.includes(l.id));

  // Merge field matrices
  const fieldMatrix: Record<string, FieldVisibilityStatus> = { ...primary.fieldMatrix };

  if (secondary) {
    Object.entries(secondary.fieldMatrix).forEach(([fieldKey, secStatus]) => {
      const current = fieldMatrix[fieldKey];
      if (!current || current === 'hidden' || current === 'not_applicable') {
        if (secStatus === 'essential' || secStatus === 'recommended') {
          fieldMatrix[fieldKey] = 'genre_specific';
        }
      }
    });
  }

  // Handle active layers overrides
  if (activeLayerIds.includes('narrative_layer') || activeLayerIds.includes('character_layer')) {
    fieldMatrix.protagonist = 'essential';
    fieldMatrix.character_arc = 'recommended';
  }
  if (activeLayerIds.includes('clues_layer')) {
    fieldMatrix.clues_investigation = 'essential';
  }
  if (activeLayerIds.includes('visual_comic_layer')) {
    fieldMatrix.visual_panels = 'essential';
  }
  if (activeLayerIds.includes('worldbuilding_layer')) {
    fieldMatrix.worldbuilding = 'essential';
    fieldMatrix.magic_tech = 'recommended';
  }
  if (activeLayerIds.includes('exercises_layer')) {
    fieldMatrix.learning_exercises = 'essential';
  }
  if (activeLayerIds.includes('checklist_layer')) {
    fieldMatrix.procedures_checklists = 'essential';
  }

  const showCharacterSection = charRelevance !== 'character_irrelevant' || activeLayerIds.includes('narrative_layer');
  const showProblemSection = primary.problemSection.visible || (secondary?.problemSection.visible ?? false) || activeLayerIds.length > 0;
  const showSpecializedSection = true;

  return {
    primary,
    secondary,
    combinedName,
    combinedDescription,
    characterRelevance: charRelevance,
    structureType: primary.structureType,
    showCharacterSection,
    showProblemSection,
    showSpecializedSection,
    activeLayers,
    fieldMatrix,
  };
}
