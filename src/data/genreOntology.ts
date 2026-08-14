import { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  GraduationCap,
  FileText,
  Feather,
  Microscope,
  Compass,
  Sparkles,
  Smile,
  Layers,
  HelpCircle,
  Shield,
  Briefcase,
  Zap,
  Flame,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Search,
  BookMarked,
  Eye,
  ShieldAlert,
  Binary,
  Shapes,
  Scroll,
  Activity,
  Lightbulb,
  Table,
  CheckSquare,
  GitBranch,
  Split,
  MessageSquare,
  Wand2,
  Heart,
} from 'lucide-react';
import {
  SATIRE_COMEDY_WORKSPACE,
  ILLUSTRATED_NOVEL_WORKSPACE,
  MYSTERY_DETECTIVE_WORKSPACE,
  COMIC_BOOK_WORKSPACE,
  GRAPHIC_NOVEL_CINEMATIC_WORKSPACE,
  SCIENCE_FICTION_WORKSPACE,
  EPIC_FANTASY_WORKSPACE,
  SUSPENSE_THRILLER_WORKSPACE,
  CRAFT_WRITING_MANUAL_WORKSPACE,
  ROMANCE_DRAMA_WORKSPACE,
  HORROR_SUPERNATURAL_WORKSPACE,
} from './fictionGenreOntology';

export type BroadCategoryKey =
  | 'fiction'
  | 'creative_writing'
  | 'academic_scholarly'
  | 'nonfiction'
  | 'science_pop_science'
  | 'history'
  | 'reference'
  | 'humor_parody'
  | 'illustrated_nonfiction'
  | 'esoteric_philosophical'
  | 'workbook'
  | 'handbook'
  | 'custom';

export type FactualityLevel =
  | 'VERIFIED_FACT'
  | 'DOCUMENTED_CLAIM'
  | 'INTERPRETATION'
  | 'NARRATIVE_RECONSTRUCTION'
  | 'SPECULATION'
  | 'SIMPLIFICATION'
  | 'FICTIONAL_DEVICE'
  | 'UNCERTAIN';

export interface GenreMagicTool {
  id: string;
  name: string;
  description: string;
  iconName: string;
  buttonLabel: string;
  actionType: string;
  promptTemplate: string;
  badge?: string;
  outputFormat: 'json_checklist' | 'markdown' | 'table' | 'interactive_matrix' | 'quiz' | 'flowchart' | 'argument_tree';
}

export interface GenreExerciseDef {
  id: string;
  type: 'warmup' | 'drill' | 'core' | 'advanced' | 'challenge' | 'experiment' | 'revision' | 'diagnostic' | 'critique';
  title: string;
  duration: string;
  description: string;
  mission: string;
  starterPrompt: string;
}

export interface GenreContentModule {
  id: string;
  name: string;
  description: string;
  tag: string;
  isDefaultEnabled: boolean;
}

export interface GenreVisualTreatment {
  recommendedPageSizes: string[];
  defaultArtMedium: string;
  recommendedLayout: string;
  typographyPairing: {
    headingFont: string;
    bodyFont: string;
    description: string;
  };
  recommendedPalette: string[];
  referenceUploadTypes: string[];
  referenceGuideNote: string;
}

export interface GenreWorkspaceProfile {
  id: string;
  broadCategory: BroadCategoryKey;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  accentColor: string;
  tagline: string;

  // Subgenres / Subtypes
  subgenres: { id: string; name: string; description: string }[];

  // Book Purposes
  purposes: { id: string; label: string; description: string }[];

  // Target Audiences
  audiences: { id: string; label: string; description: string }[];

  // Structural Template (Default Chapter Architecture)
  structuralTemplate: {
    name: string;
    description: string;
    defaultChapters: { number: number; title: string; sectionRole: string; description: string }[];
  };

  // Content Modules & Layout Components
  contentModules: GenreContentModule[];

  // Factuality & Verification Guardrail Mode
  factualityGuardrail: {
    enabled: boolean;
    mode: 'academic_citations' | 'skeptical_audit' | 'narrative_truth_ladder' | 'informational_fiction_guard' | 'esoteric_belief_vs_fact' | 'none';
    description: string;
    badges: { key: FactualityLevel; label: string; color: string; tooltip: string }[];
  };

  // Dedicated Magic AI Action Buttons
  magicTools: GenreMagicTool[];

  // Innovative Genre Exercises
  exercises: GenreExerciseDef[];

  // Visual Treatment & Art Reference Guidance
  visualTreatment: GenreVisualTreatment;
}

export interface BroadCategoryDef {
  id: BroadCategoryKey;
  title: string;
  shortDesc: string;
  accentColor: string;
  bgGradient: string;
  iconName: string;
  defaultWorkspaceId: string;
  availableWorkspaces: string[];
}

// Broad Category Definitions for Step 1
export const BROAD_CATEGORIES: BroadCategoryDef[] = [
  {
    id: 'academic_scholarly',
    title: 'ACADEMIC & SCHOLARLY',
    shortDesc: 'Monographs, theoretical syntheses, historiographical studies, and peer-level research.',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-900/20 to-indigo-950/40',
    iconName: 'GraduationCap',
    defaultWorkspaceId: 'monograph',
    availableWorkspaces: ['monograph', 'scholarly_history', 'skeptical_expose'],
  },
  {
    id: 'creative_writing',
    title: 'CREATIVE WRITING',
    shortDesc: 'Craft textbooks, lesson workbooks, novel writing systems, masterclasses, and narrative drills.',
    accentColor: '#8b5cf6',
    bgGradient: 'from-purple-900/20 to-violet-950/40',
    iconName: 'Feather',
    defaultWorkspaceId: 'craft_writing_manual',
    availableWorkspaces: ['craft_writing_manual', 'creative_writing_textbook', 'fiction_workshop'],
  },
  {
    id: 'handbook',
    title: 'HANDBOOK & RUNBOOK',
    shortDesc: 'Standard operational procedures, quick references, checklists, decision trees, and field manuals.',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-900/20 to-teal-950/40',
    iconName: 'Briefcase',
    defaultWorkspaceId: 'handbook',
    availableWorkspaces: ['handbook', 'practical_reference'],
  },
  {
    id: 'nonfiction',
    title: 'NARRATIVE NONFICTION',
    shortDesc: 'True events, biographies, memoirs, investigative journeys, and documentary narratives.',
    accentColor: '#d97706',
    bgGradient: 'from-amber-900/20 to-stone-950/40',
    iconName: 'BookOpen',
    defaultWorkspaceId: 'narrative_nonfiction',
    availableWorkspaces: ['narrative_nonfiction', 'biography_memoir', 'skeptical_expose'],
  },
  {
    id: 'science_pop_science',
    title: 'SCIENCE & POP SCIENCE',
    shortDesc: 'Witty science explanations, curious questions, natural history, and "gross" biology.',
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-900/20 to-slate-950/40',
    iconName: 'Microscope',
    defaultWorkspaceId: 'pop_science_wit',
    availableWorkspaces: ['pop_science_wit', 'gross_science', 'skeptical_expose'],
  },
  {
    id: 'fiction',
    title: 'FICTION & NOVELS',
    shortDesc: 'Satire, mystery, illustrated novels, sci-fi, epic fantasy, suspense thrillers, romance, and horror.',
    accentColor: '#ec4899',
    bgGradient: 'from-pink-900/20 to-rose-950/40',
    iconName: 'Sparkles',
    defaultWorkspaceId: 'mystery_detective',
    availableWorkspaces: [
      'mystery_detective',
      'illustrated_novel',
      'science_fiction',
      'epic_fantasy',
      'suspense_thriller',
      'romance_drama',
      'horror_supernatural',
      'satire_comedy',
      'informational_fiction',
      'literary_novel',
    ],
  },
  {
    id: 'humor_parody',
    title: 'HUMOR & PARODY',
    shortDesc: 'Satire, comedy engines, absurd systems, lab humor, parody, and deadpan social critique.',
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-900/20 to-yellow-950/40',
    iconName: 'Smile',
    defaultWorkspaceId: 'satire_comedy',
    availableWorkspaces: ['satire_comedy', 'science_humor', 'dark_satire'],
  },
  {
    id: 'illustrated_nonfiction',
    title: 'ILLUSTRATED & COMICS',
    shortDesc: 'Dynamic comic books, cinematic graphic novels, sequential art, visual essays, and infographics.',
    accentColor: '#6366f1',
    bgGradient: 'from-indigo-900/20 to-blue-950/40',
    iconName: 'Layers',
    defaultWorkspaceId: 'comic_book',
    availableWorkspaces: ['comic_book', 'graphic_novel_cinematic', 'graphic_nonfiction', 'visual_essay'],
  },
  {
    id: 'reference',
    title: 'REFERENCE & DIRECTORY',
    shortDesc: 'Trivia knowledge books, encyclopedic indices, structured Q&A, and categorized lexicons.',
    accentColor: '#64748b',
    bgGradient: 'from-slate-900/20 to-stone-950/40',
    iconName: 'BookMarked',
    defaultWorkspaceId: 'trivia_fact_book',
    availableWorkspaces: ['trivia_fact_book', 'occult_reference', 'practitioner_handbook'],
  },
  {
    id: 'esoteric_philosophical',
    title: 'ESOTERIC & PHILOSOPHICAL',
    shortDesc: 'Hermetic philosophy, sacred geometry, history of esoteric traditions, alchemy, and inner-world manuals.',
    accentColor: '#eab308',
    bgGradient: 'from-yellow-900/20 to-stone-950/40',
    iconName: 'Shapes',
    defaultWorkspaceId: 'practical_esoteric_textbook',
    availableWorkspaces: [
      'practical_esoteric_textbook',
      'scholarly_history_esoteric',
      'sacred_geometry',
      'hermetic_philosophy',
      'alchemical_treatise',
      'kabbalistic_study',
      'theurgy_ritual',
      'astral_temple',
      'numerology_study',
      'mystical_anthology',
      'occult_reference',
    ],
  },
  {
    id: 'history',
    title: 'HISTORY & MICROHISTORY',
    shortDesc: 'Scholarly histories, archival investigations, comparative historical accounts, and primary source studies.',
    accentColor: '#b45309',
    bgGradient: 'from-amber-950/30 to-stone-950/40',
    iconName: 'Clock',
    defaultWorkspaceId: 'scholarly_history',
    availableWorkspaces: ['scholarly_history', 'narrative_nonfiction', 'skeptical_expose'],
  },
  {
    id: 'workbook',
    title: 'WORKBOOK & EXERCISE LAB',
    shortDesc: 'Hands-on guided practice, timed drills, diagnostic writing exercises, and challenge sheets.',
    accentColor: '#14b8a6',
    bgGradient: 'from-teal-900/20 to-cyan-950/40',
    iconName: 'CheckSquare',
    defaultWorkspaceId: 'creative_writing_textbook',
    availableWorkspaces: ['creative_writing_textbook', 'handbook'],
  },
  {
    id: 'custom',
    title: 'CUSTOM ARCHITECTURE',
    shortDesc: 'Hybrid multi-genre blueprinting with fully unlocked structural modules and bespoke AI tooling.',
    accentColor: '#a855f7',
    bgGradient: 'from-purple-950/20 to-stone-950/40',
    iconName: 'Wand2',
    defaultWorkspaceId: 'custom_hybrid',
    availableWorkspaces: ['custom_hybrid'],
  },
];

// All 22+ Specialized Genre Workspaces Detailed in Prompt
export const GENRE_WORKSPACES: Record<string, GenreWorkspaceProfile> = {
  // ==========================================
  // 1. MONOGRAPH WORKSPACE
  // ==========================================
  monograph: {
    id: 'monograph',
    broadCategory: 'academic_scholarly',
    title: 'Scholarly Monograph',
    subtitle: 'Specialist academic volume providing a rigorous deep-dive into a single subject',
    description: 'Specialist research volume with rigorous thesis defense, literature mapping, theoretical framework, empirical evidence, and counterargument stress-testing.',
    iconName: 'GraduationCap',
    accentColor: '#3b82f6',
    tagline: 'Scholarly Rigor & Thesis Defense',
    subgenres: [
      { id: 'original_research', name: 'Original Research Monograph', description: 'Primary archival or empirical contribution to a specialized field.' },
      { id: 'scholarly_synthesis', name: 'Scholarly Synthesis', description: 'Comprehensive theoretical integration of existing disparate literature.' },
      { id: 'theoretical_argument', name: 'Theoretical Argument', description: 'A bold, revisionist theoretical framework reframing core assumptions.' },
      { id: 'historical_analysis', name: 'Historical Analysis', description: 'Historiographical deconstruction of primary documents and chronology.' },
      { id: 'methodological_study', name: 'Methodological Study', description: 'Development and validation of a new research technique or metric.' },
      { id: 'case_study_analysis', name: 'Case-Study Analysis', description: 'Deep qualitative or quantitative dissection of representative cases.' },
    ],
    purposes: [
      { id: 'advance_field', label: 'Advance Field Knowledge', description: 'Fill an established historiographical or scientific gap.' },
      { id: 'refute_orthodoxy', label: 'Refute Academic Orthodoxy', description: 'Challenge prevailing consensus with new evidence or models.' },
      { id: 'interdisciplinary_bridge', label: 'Bridge Disparate Fields', description: 'Synthesize methodology across separate academic domains.' },
      { id: 'policy_foundation', label: 'Establish Policy Foundations', description: 'Provide rigorous evidentiary basis for institutional reform.' },
    ],
    audiences: [
      { id: 'researchers', label: 'Peer Researchers & Faculty', description: 'Specialists expecting deep familiarity with the literature.' },
      { id: 'grad_students', label: 'Graduate & Doctoral Students', description: 'Advanced scholars learning foundational debates.' },
      { id: 'policy_makers', label: 'Policy Professionals & Think Tanks', description: 'Experts needing empirical certainty for decision making.' },
      { id: 'independent_scholars', label: 'Advanced Independent Scholars', description: 'Serious autodidacts and specialist readers.' },
    ],
    structuralTemplate: {
      name: 'Standard 15-Point Academic Monograph Architecture',
      description: 'The standard university press monograph structure from Abstract to Bibliography.',
      defaultChapters: [
        { number: 1, title: 'Abstract & Historiographical Positioning', sectionRole: 'Front Matter', description: 'Core thesis, central question, and field gap.' },
        { number: 2, title: 'Introduction: The Problem & Research Question', sectionRole: 'Foundation', description: 'Why this investigation is urgently required.' },
        { number: 3, title: 'Literature Review & Competing Paradigms', sectionRole: 'Literature', description: 'Critical assessment of current scholarship.' },
        { number: 4, title: 'Theoretical & Methodological Framework', sectionRole: 'Methodology', description: 'Analytical models, definitions, and investigative protocols.' },
        { number: 5, title: 'Primary Evidence & Empirical Data', sectionRole: 'Core Evidence', description: 'Presentation of archival findings or dataset analysis.' },
        { number: 6, title: 'Case Study I: Foundational Application', sectionRole: 'Application', description: 'Detailed qualitative testing of the primary model.' },
        { number: 7, title: 'Case Study II: Edge Cases & Anomalies', sectionRole: 'Application', description: 'Testing the thesis against challenging scenarios.' },
        { number: 8, title: 'Counterarguments & Stress Testing', sectionRole: 'Defense', description: 'Addressing the strongest possible opposing interpretations.' },
        { number: 9, title: 'Discussion & Broader Implications', sectionRole: 'Synthesis', description: 'How this reshapes adjacent subfields and future research.' },
        { number: 10, title: 'Conclusion & Research Horizons', sectionRole: 'Conclusion', description: 'Final synthesis and unanswered questions.' },
      ],
    },
    contentModules: [
      { id: 'abstract_block', name: 'Scholarly Abstract Box', description: 'Formal 250-word synthesis of problem, method, and findings.', tag: 'Metadata', isDefaultEnabled: true },
      { id: 'literature_map', name: 'Historiographical Debates Map', description: 'Side-by-side comparison of competing scholarly camps.', tag: 'Scholarship', isDefaultEnabled: true },
      { id: 'evidence_ledger', name: 'Primary Evidence Ledger', description: 'Structured citations, archival references, and dataset notes.', tag: 'Evidence', isDefaultEnabled: true },
      { id: 'counterargument_box', name: 'Devil’s Advocate Callout', description: 'Explicitly framed opposing scholarly perspectives.', tag: 'Critical Defense', isDefaultEnabled: true },
      { id: 'footnote_scholarly', name: 'Explanatory Footnotes', description: 'Secondary commentary and bibliographic citations.', tag: 'Apparatus', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'academic_citations',
      description: 'Strict distinction between verified archival facts, peer-reviewed data, interpretations, and hypotheses.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'Primary Evidence', color: 'emerald', tooltip: 'Directly supported by archival citation or empirical data.' },
        { key: 'INTERPRETATION', label: 'Scholarly Interpretation', color: 'blue', tooltip: 'Author’s theoretical analysis of the primary evidence.' },
        { key: 'SPECULATION', label: 'Working Hypothesis', color: 'amber', tooltip: 'Plausible conjecture requiring further experimental verification.' },
      ],
    },
    magicTools: [
      {
        id: 'stress_test_thesis',
        name: 'Argument Stress Test',
        description: 'AI attempts to aggressively dismantle and destroy your central thesis from the viewpoint of a hostile peer-reviewer.',
        iconName: 'AlertTriangle',
        buttonLabel: 'Stress-Test My Thesis',
        actionType: 'stress_test',
        promptTemplate: 'Conduct a brutal peer-review stress test on this academic thesis. Identify logical vulnerabilities, unexamined presuppositions, and counter-examples.',
        badge: 'Peer Reviewer AI',
        outputFormat: 'interactive_matrix',
      },
      {
        id: 'devils_advocate',
        name: 'Devil’s Advocate Position',
        description: 'Generates the strongest possible opposing scholarly school of thought and its best arguments against your claim.',
        iconName: 'ShieldAlert',
        buttonLabel: 'Summon Devil’s Advocate',
        actionType: 'devils_advocate',
        promptTemplate: 'Construct the most formidable scholarly counterargument against the author’s primary claim, citing plausible opposing theoretical paradigms.',
        outputFormat: 'markdown',
      },
      {
        id: 'missing_evidence',
        name: 'Missing Evidence Auditor',
        description: 'Scans your chapter arguments to highlight unproven assertions that require stronger primary evidence or citations.',
        iconName: 'Search',
        buttonLabel: 'Audit Missing Evidence',
        actionType: 'missing_evidence',
        promptTemplate: 'Audit this text for evidentiary gaps. Flag any claim that reads like a generalization or lacks direct evidentiary backing.',
        outputFormat: 'json_checklist',
      },
      {
        id: 'thesis_collision',
        name: 'Thesis Collision Generator',
        description: 'Generates 3 competing, mutually incompatible interpretations of the exact same body of evidence.',
        iconName: 'Split',
        buttonLabel: 'Generate 3 Competing Interpretations',
        actionType: 'thesis_collision',
        promptTemplate: 'Provide 3 radically different, internally coherent theoretical interpretations of the following empirical findings.',
        outputFormat: 'table',
      },
      {
        id: 'map_literature',
        name: 'Literature Map & Gaps',
        description: 'Maps the dominant academic debates, key scholars, and highlights the precise gap your monograph fills.',
        iconName: 'GitBranch',
        buttonLabel: 'Map Scholarly Landscape',
        actionType: 'map_literature',
        promptTemplate: 'Map the main theoretical schools of thought around this topic and pinpoint the exact historiographical gap.',
        outputFormat: 'argument_tree',
      },
    ],
    exercises: [
      {
        id: 'monograph_stress',
        type: 'challenge',
        title: 'The Hostile Reviewer Defense',
        duration: '20 min',
        description: 'Write a 300-word defense against the sharpest possible methodological objection to your thesis.',
        mission: 'Defend your core hypothesis without hand-waving or relying on unverified assumptions.',
        starterPrompt: 'Opposing objection: "Your sample/archive is unrepresentative because..." Your watertight rebuttal:',
      },
      {
        id: 'monograph_collision',
        type: 'experiment',
        title: 'The Inverted Hypothesis Experiment',
        duration: '15 min',
        description: 'Assume the exact opposite of your thesis is true for 10 minutes. What evidence would support it?',
        mission: 'Discover latent counter-evidence that strengthens your primary thesis when properly refuted.',
        starterPrompt: 'If the inverse of my thesis were true, the following anomalies would be explained:',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['6x9', 'A5', '8.5x11'],
      defaultArtMedium: 'academic_engraving',
      recommendedLayout: 'two_column_with_margin_notes',
      typographyPairing: {
        headingFont: 'Cinzel / Garamond',
        bodyFont: 'EB Garamond / Minion Pro',
        description: 'High-legibility scholarly typography with generous margins for running headers and explanatory footnotes.',
      },
      recommendedPalette: ['#1e293b', '#334155', '#475569', '#cbd5e1', '#0284c7'],
      referenceUploadTypes: ['Academic diagrams', 'Archival document scans', 'Historical maps', 'Statistical figures & charts', 'Manuscript fragments'],
      referenceGuideNote: 'Upload clean line diagrams, statistical charts, and primary archival scans. The AI will preserve academic figure formatting.',
    },
  },

  // ==========================================
  // 2. CREATIVE WRITING TEXTBOOK
  // ==========================================
  creative_writing_textbook: {
    id: 'creative_writing_textbook',
    broadCategory: 'creative_writing',
    title: 'Creative Writing Textbook',
    subtitle: 'A structured, workshop-grade teaching book engineered to teach the craft of writing',
    description: 'Comprehensive pedagogical writing masterclass with structured lessons (Concept → Bad Example → Analysis → Exercise → Revision Challenge) and live diagnostic tools.',
    iconName: 'Feather',
    accentColor: '#8b5cf6',
    tagline: 'Pedagogy, Drills & Craft Mastery',
    subgenres: [
      { id: 'fiction_craft', name: 'Fiction Writing Masterclass', description: 'Foundational and advanced novel and short fiction craft.' },
      { id: 'character_dev', name: 'Character Development & Voice', description: 'Internal wounds, paradoxical motivations, and dialogue mastery.' },
      { id: 'plot_structure', name: 'Plot Architecture & Pacing', description: 'Causality chains, dilemma escalation, and structural pacing.' },
      { id: 'dialogue_craft', name: 'Dialogue & Subtext Workshop', description: 'Subtext, rhythm, status battles, and unspoken intention.' },
      { id: 'worldbuilding_craft', name: 'Worldbuilding & Atmosphere', description: 'Speculative geography, social structures, and sensory immersion.' },
      { id: 'screenwriting_craft', name: 'Screenwriting & Visual Pacing', description: 'Scene economy, dramatic reversals, and three-act engines.' },
      { id: 'editing_revision', name: 'Revision & Developmental Editing', description: 'Diagnosing structural flab, line-level tightening, and polish.' },
    ],
    purposes: [
      { id: 'teach_beginners', label: 'Foundational Initiation', description: 'Demystify creative writing for passionate beginners.' },
      { id: 'break_plateau', label: 'Mid-Career Craft Breakthrough', description: 'Help experienced authors break through formulaic habits.' },
      { id: 'university_curriculum', label: 'MFA & Workshop Curriculum', description: 'Structured course companion for classroom instruction.' },
      { id: 'genre_specialization', label: 'Genre Craft Specialization', description: 'Specific mastery in horror, satire, sci-fi, or literary fiction.' },
    ],
    audiences: [
      { id: 'aspiring_novelists', label: 'Aspiring Novelists & Storytellers', description: 'Writers working on their debut manuscripts.' },
      { id: 'mfa_students', label: 'Creative Writing Students & Educators', description: 'Academic workshops requiring structured exercises.' },
      { id: 'pro_authors', label: 'Working Authors & Editors', description: 'Professionals seeking diagnostic tools and fresh drills.' },
    ],
    structuralTemplate: {
      name: 'The 9-Stage Lesson Format',
      description: 'Every chapter contains Concept → Explanation → Master Example → Bad Example → Analysis → Exercise → Challenge → Reflection → Revision.',
      defaultChapters: [
        { number: 1, title: 'Concept: The Engine of Story Desire', sectionRole: 'Core Concept', description: 'Want vs Need and the dramatic lie.' },
        { number: 2, title: 'Bad Example vs Good Example Breakdown', sectionRole: 'Diagnostic', description: 'Line-by-line autopsy of passive vs active scenes.' },
        { number: 3, title: '5-Minute Warm-Up & 15-Minute Drill', sectionRole: 'Interactive Drill', description: 'Immediate low-friction writing sparks.' },
        { number: 4, title: 'The Professional Craft Challenge', sectionRole: 'Mastery', description: 'Complex constraint-based writing trial.' },
        { number: 5, title: 'The Diagnostic Self-Audit Checklist', sectionRole: 'Revision', description: 'Rubric for identifying weak verbs and exposition dumps.' },
      ],
    },
    contentModules: [
      { id: 'concept_box', name: 'Craft Rule & Concept Card', description: 'Clear formulation of the core technique.', tag: 'Pedagogy', isDefaultEnabled: true },
      { id: 'bad_example_autopsy', name: 'Bad Example Autopsy', description: 'Cringe-worthy example paired with rigorous critique.', tag: 'Analysis', isDefaultEnabled: true },
      { id: 'master_excerpt', name: 'Masterclass Literary Excerpt', description: 'Exemplary prose from a classic or modern master.', tag: 'Exemplar', isDefaultEnabled: true },
      { id: 'timed_exercise', name: 'Timed Exercise Box', description: '5m, 15m, or 30m structured prompts with constraints.', tag: 'Exercises', isDefaultEnabled: true },
      { id: 'revision_rubric', name: 'Self-Diagnostic Checklist', description: 'Step-by-step audit for the student’s own writing.', tag: 'Revision', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: false,
      mode: 'none',
      description: 'Creative craft mode: focuses on artistic efficacy and pedagogical rigor rather than factual audit.',
      badges: [],
    },
    magicTools: [
      {
        id: 'generate_exercise',
        name: 'Generate Tiered Exercise',
        description: 'Instantly creates 3 levels of writing exercises (Warm-up, Drill, Professional Challenge) for the active lesson concept.',
        iconName: 'Wand2',
        buttonLabel: 'Generate Tiered Drills',
        actionType: 'tiered_exercise',
        promptTemplate: 'Generate 3 tiered writing exercises for this lesson: 1) 5-Minute Warm-up, 2) 15-Minute Craft Drill, 3) 30-Minute Professional Challenge with constraints.',
        badge: '3-Tier Generator',
        outputFormat: 'markdown',
      },
      {
        id: 'make_exercise_harder',
        name: 'Give Me a Harder Exercise',
        description: 'Adds ruthless stylistic constraints (e.g. no adjectives, no interior monologue, inverted chronology) to test mastery.',
        iconName: 'Flame',
        buttonLabel: 'Make Exercise Harder',
        actionType: 'harder_exercise',
        promptTemplate: 'Take the current writing prompt and add 3 extreme artistic constraints that force total mastery of the technique.',
        outputFormat: 'markdown',
      },
      {
        id: 'diagnose_writing',
        name: 'Diagnose Writing Weakness',
        description: 'Paste any paragraph to receive a line-level diagnostic scan for melodrama, passive voice, exposition dumps, or cliché rhythms.',
        iconName: 'Activity',
        buttonLabel: 'Diagnose My Weakness',
        actionType: 'diagnose_writing',
        promptTemplate: 'Perform a ruthless line-by-line craft diagnostic on the user’s writing sample. Identify exact moments of emotional cheating, passive phrasing, or pacing collapse.',
        outputFormat: 'interactive_matrix',
      },
      {
        id: 'break_the_rule',
        name: 'Break This Rule Artfully',
        description: 'Teaches when and how to deliberately break the traditional craft rule to achieve a brilliant literary effect.',
        iconName: 'Zap',
        buttonLabel: 'Break This Rule',
        actionType: 'break_rule',
        promptTemplate: 'Explain how a master author deliberately violates this craft rule to create a haunting, unforgettable effect, with a demonstration passage.',
        outputFormat: 'markdown',
      },
      {
        id: 'generate_counterexample',
        name: 'Generate Cringe vs Master Example',
        description: 'Creates a side-by-side comparison showing the cliché amateur approach vs the masterclass execution.',
        iconName: 'Split',
        buttonLabel: 'Generate Bad vs Master Example',
        actionType: 'counter_example',
        promptTemplate: 'Write two contrasting versions of the same dramatic beat: Version A (amateur cliché with all common mistakes) and Version B (masterclass with subtext and sensory precision).',
        outputFormat: 'markdown',
      },
    ],
    exercises: [
      {
        id: 'drill_5m',
        type: 'warmup',
        title: '5-Minute Subtext Spark',
        duration: '5 min',
        description: 'Write a 4-line dialogue where two characters discuss something trivial (a burnt piece of toast) while deciding whether to divorce.',
        mission: 'Zero explicit mention of their relationship. 100% subtext.',
        starterPrompt: '"Pass the butter." / "There isn\'t any left." / ...',
      },
      {
        id: 'pro_30m',
        type: 'challenge',
        title: 'The Sensory Deprivation Scene',
        duration: '30 min',
        description: 'Write a high-stakes scene without using any visual verbs or visual descriptions (sight). Rely entirely on sound, touch, proprioception, and temperature.',
        mission: 'Immerse the reader completely without relying on visual crutches.',
        starterPrompt: 'The metal clicked against the frame before the cold draft touched the back of my neck...',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['7x10', '8x10', '8.5x11'],
      defaultArtMedium: 'educational_ink_and_wash',
      recommendedLayout: 'worksheet_and_callout_boxes',
      typographyPairing: {
        headingFont: 'Playfair Display / Fraunces',
        bodyFont: 'Source Serif Pro / Inter',
        description: 'Elegant textbook typography with generous line-height and distinguished highlighted callout boxes for exercises.',
      },
      recommendedPalette: ['#2e1065', '#5b21b6', '#7c3aed', '#f5f3ff', '#d97706'],
      referenceUploadTypes: ['Educational diagrams', 'Plot mountain sketches', 'Character sheet layouts', 'Workbook typography examples', 'Editorial craft illustrations'],
      referenceGuideNote: 'Upload instructional illustrations, character worksheets, and diagram templates for workbook styling.',
    },
  },

  // ==========================================
  // 3. HANDBOOK & RUNBOOK WORKSPACE
  // ==========================================
  handbook: {
    id: 'handbook',
    broadCategory: 'handbook',
    title: 'Professional Handbook & Runbook',
    subtitle: 'A practical, one-volume reference containing factual procedures, tables, decision trees, and checklists',
    description: 'Practical operational volume prioritizing quick lookup, step-by-step Standard Operating Procedures (SOP), decision trees, troubleshooting guides, and comparison tables.',
    iconName: 'Briefcase',
    accentColor: '#10b981',
    tagline: 'Standard Operating Procedures & Rapid Reference',
    subgenres: [
      { id: 'professional_handbook', name: 'Professional Handbook', description: 'Industry standards, code of conduct, and executive best practices.' },
      { id: 'technical_runbook', name: 'Technical & Engineering Runbook', description: 'System architectures, deployment workflows, and incident triage.' },
      { id: 'field_manual', name: 'Field & Operational Manual', description: 'Pocket guide for real-world field conditions and rapid emergency response.' },
      { id: 'practitioner_guide', name: 'Practitioner & Clinician Guide', description: 'Diagnostic protocols, dosages, legal constraints, and client workflows.' },
      { id: 'student_handbook', name: 'Student & Onboarding Guide', description: 'Institutional rules, milestone roadmaps, and campus resource navigation.' },
      { id: 'emergency_handbook', name: 'Emergency & Operational Handbook', description: 'High-stress checklists, crisis communication, and immediate action steps.' },
    ],
    purposes: [
      { id: 'operational_standard', label: 'Standardize Team Operations', description: 'Eliminate human error with repeatable standard procedures.' },
      { id: 'rapid_lookup', label: 'Field Rapid Lookup', description: 'Enable users to resolve complex issues within 60 seconds.' },
      { id: 'incident_response', label: 'Disaster & Incident Triage', description: 'Guide calm, structured resolution during critical emergencies.' },
      { id: 'skills_certification', label: 'Certification & Compliance', description: 'Ensure full alignment with regulatory frameworks.' },
    ],
    audiences: [
      { id: 'field_operators', label: 'Field Operators & Technicians', description: 'Hands-on practitioners working under time pressure.' },
      { id: 'team_leads', label: 'Team Leads & Managers', description: 'Supervisors responsible for compliance and quality control.' },
      { id: 'new_hires', label: 'New Hires & Trainees', description: 'Staff members requiring clear, unambiguous onboarding.' },
    ],
    structuralTemplate: {
      name: 'The SOP & Rapid-Reference Architecture',
      description: 'Quick Reference → Definitions → Procedures → Tables → Checklists → Decision Trees → Troubleshooting → FAQ → Glossary.',
      defaultChapters: [
        { number: 1, title: 'Quick-Reference Summary & Emergency Index', sectionRole: 'Fast Access', description: 'Color-coded index of common scenarios.' },
        { number: 2, title: 'Core Terminology & Operational Definitions', sectionRole: 'Definitions', description: 'Unambiguous definitions of key terms.' },
        { number: 3, title: 'Standard Operating Procedures (SOP)', sectionRole: 'Procedures', description: 'Numbered step-by-step execution protocols.' },
        { number: 4, title: 'Decision Trees & Escalation Matrices', sectionRole: 'Logic', description: 'Branching IF/THEN diagnostic paths.' },
        { number: 5, title: 'Verification Checklists & Sign-Off Tables', sectionRole: 'Quality Control', description: 'Pre-flight and post-execution checklists.' },
        { number: 6, title: 'Troubleshooting Guide: Symptom → Cause → Fix', sectionRole: 'Remediation', description: 'Matrix of known errors and exact resolutions.' },
      ],
    },
    contentModules: [
      { id: 'quick_ref_card', name: 'Quick Reference Matrix', description: 'High-density at-a-glance parameter tables.', tag: 'Lookup', isDefaultEnabled: true },
      { id: 'sop_procedure', name: 'Numbered SOP Runbook Step', description: 'Strict sequential steps with inputs, outputs, and warnings.', tag: 'Procedure', isDefaultEnabled: true },
      { id: 'decision_tree_card', name: 'Branching Decision Tree', description: 'Visual logic node for branching choices.', tag: 'Decision', isDefaultEnabled: true },
      { id: 'troubleshooting_table', name: 'Symptom-Cause-Fix Table', description: 'Structured 3-column table for rapid problem resolution.', tag: 'Remediation', isDefaultEnabled: true },
      { id: 'caution_callout', name: 'Critical Safety / Warning Callout', description: 'High-contrast alert block for hazardous steps.', tag: 'Safety', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'academic_citations',
      description: 'Factual accuracy is paramount. No fictionalized procedures or untested dangerous instructions.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'Verified Standard', color: 'emerald', tooltip: 'Validated industry protocol.' },
        { key: 'DOCUMENTED_CLAIM', label: 'Manufacturer Spec', color: 'blue', tooltip: 'Directly sourced from equipment documentation.' },
      ],
    },
    magicTools: [
      {
        id: 'create_checklist',
        name: 'Create Verification Checklist',
        description: 'Converts any procedure into an airtight, audit-ready verification checklist with checkboxes and sign-offs.',
        iconName: 'CheckSquare',
        buttonLabel: 'Create Checklist',
        actionType: 'make_checklist',
        promptTemplate: 'Convert this operational procedure into an unambiguous, bulletproof pre-execution checklist with clear pass/fail criteria.',
        outputFormat: 'json_checklist',
      },
      {
        id: 'create_decision_tree',
        name: 'Generate Decision Tree (IF/THEN)',
        description: 'Transforms complex troubleshooting instructions into a branching logic tree with clear escalation triggers.',
        iconName: 'GitBranch',
        buttonLabel: 'Create Decision Tree',
        actionType: 'make_decision_tree',
        promptTemplate: 'Construct a branching IF/THEN decision tree for this troubleshooting scenario, including symptom checks and fallback steps.',
        outputFormat: 'flowchart',
      },
      {
        id: 'create_troubleshooting_guide',
        name: 'Create Troubleshooting Matrix',
        description: 'Builds a 3-column Symptom → Probable Root Cause → Exact Action Remediation matrix.',
        iconName: 'AlertTriangle',
        buttonLabel: 'Create Troubleshooting Guide',
        actionType: 'make_troubleshooting',
        promptTemplate: 'Generate a structured Troubleshooting Matrix with columns: 1) Observed Symptom, 2) Root Cause, 3) Step-by-Step Fix, 4) Escalation Trigger.',
        outputFormat: 'table',
      },
      {
        id: 'create_quick_reference',
        name: 'Create 60-Second Quick Ref Sheet',
        description: 'Condenses an entire multi-page chapter into a 1-page high-density reference sheet.',
        iconName: 'Zap',
        buttonLabel: 'Create Quick Reference',
        actionType: 'quick_ref',
        promptTemplate: 'Summarize the essential parameters, formulas, and emergency steps of this chapter into a high-density 1-page quick reference sheet.',
        outputFormat: 'markdown',
      },
      {
        id: 'create_flowchart',
        name: 'Build Operational Flowchart',
        description: 'Generates a textual/diagrammatic flowchart representing the entire process lifecycle.',
        iconName: 'Layers',
        buttonLabel: 'Create Process Flowchart',
        actionType: 'make_flowchart',
        promptTemplate: 'Generate a clean ASCII/Mermaid flowchart showing the complete lifecycle of this process from trigger to completion.',
        outputFormat: 'flowchart',
      },
    ],
    exercises: [
      {
        id: 'drill_triage',
        type: 'drill',
        title: '60-Second Emergency Triage Drill',
        duration: '5 min',
        description: 'Given an unexpected system failure, identify the 3 immediate containment steps using the quick-reference index.',
        mission: 'Demonstrate zero hesitation in executing emergency containment.',
        starterPrompt: 'Scenario: Main power drops, backup generator fails to ignite within 15 seconds. Immediate action steps:',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['5.5x8.5', 'A5', '6x9'],
      defaultArtMedium: 'technical_vector_schematic',
      recommendedLayout: 'two_column_tabular',
      typographyPairing: {
        headingFont: 'IBM Plex Sans / Roboto Mono',
        bodyFont: 'IBM Plex Sans / Inter',
        description: 'Clean, industrial sans-serif with high tabular figures legibility and sharp contrast for quick scanning in field conditions.',
      },
      recommendedPalette: ['#0f172a', '#1e293b', '#059669', '#10b981', '#f8fafc'],
      referenceUploadTypes: ['Technical schematics', 'Table layouts', 'Flowchart diagrams', 'Vector icon sets', 'Safety signage references'],
      referenceGuideNote: 'Upload technical diagrams, table references, and UI flowcharts. The system ensures clean tabular alignment.',
    },
  },

  // ==========================================
  // 4. NARRATIVE NONFICTION WORKSPACE
  // ==========================================
  narrative_nonfiction: {
    id: 'narrative_nonfiction',
    broadCategory: 'nonfiction',
    title: 'Narrative Nonfiction & Memoir',
    subtitle: 'True historical, investigative, or personal events presented with sophisticated storytelling craft',
    description: 'Documentary and biographical storytelling combining literary narrative tension with strict historical and evidentiary boundaries.',
    iconName: 'BookOpen',
    accentColor: '#d97706',
    tagline: 'Literary Pacing & Strict Factuality',
    subgenres: [
      { id: 'biography', name: 'Biographical Narrative', description: 'Deep chronological life story of a historical or contemporary figure.' },
      { id: 'memoir', name: 'Personal Memoir & Essay', description: 'Introspective thematic account of personal lived experiences.' },
      { id: 'investigative', name: 'Investigative Journalism', description: 'Uncovering complex corruption, scandals, or systemic coverups.' },
      { id: 'travel_narrative', name: 'Travel & Cultural Narrative', description: 'Immersive exploration of distant geographies and human communities.' },
      { id: 'true_crime', name: 'Forensic True Crime', description: 'Ethical, meticulous dissection of a real-world case and trial.' },
      { id: 'documentary_history', name: 'Documentary History', description: 'Cinematic reconstruction of a pivotal historical moment.' },
    ],
    purposes: [
      { id: 'illuminate_history', label: 'Humanize Complex History', description: 'Bring historical archives alive through lived human perspective.' },
      { id: 'expose_truth', label: 'Expose Hidden Realities', description: 'Bring investigative facts to public awareness.' },
      { id: 'emotional_catharsis', label: 'Personal & Cultural Reflection', description: 'Explore universal themes of grief, triumph, and identity.' },
    ],
    audiences: [
      { id: 'literary_readers', label: 'Literary Nonfiction Readers', description: 'Readers who love Erik Larson, Joan Didion, and Truman Capote.' },
      { id: 'history_enthusiasts', label: 'History & Biography Enthusiasts', description: 'Discerning readers who demand strict factual fidelity.' },
    ],
    structuralTemplate: {
      name: 'The Narrative Arc of Fact Architecture',
      description: 'Historical Event / Discovery → Scene Reconstruction → Archival Context → Internal Arc → Consequence.',
      defaultChapters: [
        { number: 1, title: 'The Inciting Incident / Morning of the Event', sectionRole: 'Opening Scene', description: 'Cinematic grounding in sensory reality of the specific date.' },
        { number: 2, title: 'Historical Backdrop & Hidden Pressures', sectionRole: 'Context', description: 'The cultural and economic forces leading to the crisis.' },
        { number: 3, title: 'The Investigation / Journey Begins', sectionRole: 'Rising Action', description: 'First encounters with primary sources or witnesses.' },
        { number: 4, title: 'The Point of No Return', sectionRole: 'Climax', description: 'The irrevocable decision that changed historical trajectory.' },
        { number: 5, title: 'The Aftermath & Historiographical Echo', sectionRole: 'Resolution', description: 'Long-term consequences and what remains recorded vs lost.' },
      ],
    },
    contentModules: [
      { id: 'cinematic_scene', name: 'Sensory Scene Reconstruction', description: 'Narrative beat grounded strictly in recorded testimonies.', tag: 'Narrative', isDefaultEnabled: true },
      { id: 'factuality_badge_block', name: 'Evidentiary Status Tag', description: 'Explicit badge labeling Verified Fact vs Reconstruction.', tag: 'Factuality', isDefaultEnabled: true },
      { id: 'archival_quote_box', name: 'Primary Document Callout', description: 'Verbatim transcripts of letters, trial logs, or diaries.', tag: 'Primary Source', isDefaultEnabled: true },
      { id: 'timeline_anchor', name: 'Chronology Time-Stamp', description: 'Exact date, hour, and location marker.', tag: 'Chronology', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'narrative_truth_ladder',
      description: 'Strict 5-tier classification to prevent inventing fictionalized historical events and presenting them as facts.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'Verified Fact', color: 'emerald', tooltip: 'Directly corroborated by independent primary sources.' },
        { key: 'DOCUMENTED_CLAIM', label: 'Documented Claim', color: 'blue', tooltip: 'Recorded in a primary document or witness statement.' },
        { key: 'INTERPRETATION', label: 'Historical Interpretation', color: 'indigo', tooltip: 'Author’s synthesis of ambiguous accounts.' },
        { key: 'NARRATIVE_RECONSTRUCTION', label: 'Narrative Reconstruction', color: 'amber', tooltip: 'Atmospheric scene details extrapolated from weather/period records.' },
        { key: 'SPECULATION', label: 'Speculation', color: 'rose', tooltip: 'Plausible conjecture explicitly identified as unconfirmed.' },
      ],
    },
    magicTools: [
      {
        id: 'separate_fact_reconstruction',
        name: 'Fact vs Reconstruction Auditor',
        description: 'Scans your draft to ensure every scene beat is categorized strictly into Verified Fact vs Narrative Reconstruction, eliminating accidental fabrication.',
        iconName: 'ShieldCheck',
        buttonLabel: 'Separate Fact from Reconstruction',
        actionType: 'fact_audit',
        promptTemplate: 'Audit this narrative nonfiction scene. Categorize each sentence into: 1) Verified Fact, 2) Documented Claim, 3) Narrative Reconstruction, or 4) Unsubstantiated Speculation.',
        badge: 'Factuality Guardrail',
        outputFormat: 'interactive_matrix',
      },
      {
        id: 'find_dramatic_scene',
        name: 'Identify Dramatic Moments',
        description: 'Finds the high-tension cinematic moments hidden within your historical chronology that deserve full-scene treatment.',
        iconName: 'Eye',
        buttonLabel: 'Find Dramatic Scene Beats',
        actionType: 'dramatic_beats',
        promptTemplate: 'Analyze this historical timeline and identify the 3 most potent cinematic scenes with natural dialogue and sensory stakes.',
        outputFormat: 'markdown',
      },
      {
        id: 'check_chronology',
        name: 'Chronology & Anachronism Check',
        description: 'Verifies that historical events, technology, travel times, and vocabulary strictly match the specified date and era.',
        iconName: 'Clock',
        buttonLabel: 'Audit Chronology & Era',
        actionType: 'chronology_check',
        promptTemplate: 'Check this passage for anachronisms, impossible travel timelines, or modern idioms that do not belong in the target era.',
        outputFormat: 'json_checklist',
      },
      {
        id: 'build_narrative_arc',
        name: 'Build Nonfiction Story Arc',
        description: 'Structures true events into a compelling narrative spine without distorting historical veracity.',
        iconName: 'GitBranch',
        buttonLabel: 'Build Narrative Arc',
        actionType: 'narrative_arc',
        promptTemplate: 'Structure these historical facts into a 5-beat narrative arc that maximizes tension while preserving 100% factual integrity.',
        outputFormat: 'argument_tree',
      },
    ],
    exercises: [
      {
        id: 'exercise_reconstruction',
        type: 'core',
        title: 'The Archival Grounding Drill',
        duration: '15 min',
        description: 'Take a dry 2-sentence historical log (e.g. weather report + ship arrival) and write a 200-word sensory scene without inventing any false facts.',
        mission: 'Sensory depth rooted 100% in verifiable environmental records.',
        starterPrompt: 'Archival log: "October 14, 1888: Barometer 29.4 in. Heavy sleet. S.S. Victoria docked at 4:15 PM." Scene:',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['6x9', '5.5x8.5'],
      defaultArtMedium: 'documentary_photography_lithograph',
      recommendedLayout: 'classic_literary_single_column',
      typographyPairing: {
        headingFont: 'Merriweather / Adobe Caslon',
        bodyFont: 'Georgia / Minion Pro',
        description: 'Warm literary serif with high contrast, generous leading, and dignified chapter opening vignettes.',
      },
      recommendedPalette: ['#1c1917', '#44403c', '#78716c', '#d6d3d1', '#b45309'],
      referenceUploadTypes: ['Historical photographs', 'Period maps', 'Portraits of real figures', 'Archival documents', 'Location photography'],
      referenceGuideNote: 'Upload authentic period photographs, archival maps, and portrait references. The AI will adhere to historical accuracy.',
    },
  },

  // ==========================================
  // 5. INFORMATIONAL FICTION WORKSPACE
  // ==========================================
  informational_fiction: {
    id: 'informational_fiction',
    broadCategory: 'fiction',
    title: 'Informational Fiction',
    subtitle: 'Fictional storytelling crafted specifically to communicate complex factual concepts',
    description: 'Engaging narrative devices (talking animal narrator, detective investigating history, sci-fi voyage explaining cellular biology) with strict factuality guardrails.',
    iconName: 'Sparkles',
    accentColor: '#ec4899',
    tagline: 'Narrative Story Engine & Scientific Concepts',
    subgenres: [
      { id: 'science_adventure', name: 'Science Quest Narrative', description: 'Characters solve problems by applying fundamental scientific principles.' },
      { id: 'historical_detective', name: 'Historical Detective Journey', description: 'Investigating real historical eras through fictional mystery.' },
      { id: 'talking_narrator', name: 'Anthropomorphic / Animal Narrator', description: 'Animal or object narrator revealing ecological and biological facts.' },
      { id: 'math_fantasy', name: 'Mathematical / Logical Quest', description: 'Adventures where magic spells require solving real mathematics.' },
      { id: 'tech_allegory', name: 'Technology & AI Allegory', description: 'Fictional characters exploring coding, networks, and silicon mechanics.' },
    ],
    purposes: [
      { id: 'educate_delight', label: 'Educate Through Wonder', description: 'Make intimidating subjects instantly intuitive and unforgettable.' },
      { id: 'stem_immersion', label: 'STEM Concept Demystification', description: 'Teach physics, biology, or economics through story problem-solving.' },
    ],
    audiences: [
      { id: 'young_adult_learners', label: 'YA & Adult Lifelong Learners', description: 'Readers who absorb science better through character drama.' },
      { id: 'educators', label: 'Educators & STEM Enthusiasts', description: 'Classrooms looking for engaging narrative teaching texts.' },
    ],
    structuralTemplate: {
      name: 'The 5-Step Concept Quest Story Engine',
      description: 'Character Encounters Problem → Discovers Factual Concept → Applies Knowledge → Consequence → New Discovery.',
      defaultChapters: [
        { number: 1, title: 'The Impassable Obstacle & The Strange Clue', sectionRole: 'Problem', description: 'A crisis that cannot be solved by brute force.' },
        { number: 2, title: 'Unveiling the Natural Law', sectionRole: 'Factual Discovery', description: 'Discovering the underlying scientific or historical principle.' },
        { number: 3, title: 'The Flawed First Experiment', sectionRole: 'Trial & Error', description: 'Misunderstanding the principle leads to a comedic or tense failure.' },
        { number: 4, title: 'The Eureka Application', sectionRole: 'Climax', description: 'Applying the factual law with precision to overcome the threat.' },
        { number: 5, title: 'The Wider Horizon', sectionRole: 'Resolution', description: 'How this principle connects to the broader universe.' },
      ],
    },
    contentModules: [
      { id: 'story_chapter', name: 'Narrative Story Chapter', description: 'Fictional dialogue and dramatic pacing.', tag: 'Narrative', isDefaultEnabled: true },
      { id: 'science_breakout', name: 'Behind the Story: The Real Science', description: 'Highlighted sidebar explaining the actual real-world physics/biology.', tag: 'Factual Core', isDefaultEnabled: true },
      { id: 'fact_classification_tag', name: 'Fact vs Fictional Device Tag', description: 'Labels what is scientifically real vs artistic simplification.', tag: 'Guardrail', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'informational_fiction_guard',
      description: 'Classifies every core statement into FACT, SIMPLIFICATION, FICTIONAL DEVICE, or UNCERTAIN.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'REAL FACT', color: 'emerald', tooltip: '100% scientifically or historically verified.' },
        { key: 'SIMPLIFICATION', label: 'EDUCATIONAL SIMPLIFICATION', color: 'blue', tooltip: 'Simplified for intuitive understanding while remaining accurate.' },
        { key: 'FICTIONAL_DEVICE', label: 'FICTIONAL DEVICE', color: 'purple', tooltip: 'Plot device or talking character used to carry the story.' },
        { key: 'UNCERTAIN', label: 'SCIENTIFIC HYPOTHESIS', color: 'amber', tooltip: 'Leading scientific theory not yet proven.' },
      ],
    },
    magicTools: [
      {
        id: 'factuality_guardrail_audit',
        name: 'Factuality Guardrail Scanner',
        description: 'Scans the chapter and classifies every factual claim into FACT, SIMPLIFICATION, FICTIONAL DEVICE, or UNCERTAIN.',
        iconName: 'ShieldCheck',
        buttonLabel: 'Run Factuality Guardrail',
        actionType: 'factuality_guardrail',
        promptTemplate: 'Audit this informational fiction chapter. Label every scientific concept as FACT, SIMPLIFICATION, FICTIONAL DEVICE, or UNCERTAIN to ensure no reader is misled.',
        badge: 'Truth Guardrail',
        outputFormat: 'interactive_matrix',
      },
      {
        id: 'translate_concept_story',
        name: 'Turn Concept Into Story Engine',
        description: 'Transforms a dense scientific concept (e.g. quantum tunneling or CRISPR) into a gripping narrative dilemma.',
        iconName: 'Sparkles',
        buttonLabel: 'Turn Concept Into Story Problem',
        actionType: 'concept_to_story',
        promptTemplate: 'Translate this scientific principle into a concrete physical obstacle for fictional characters to solve using their wits.',
        outputFormat: 'markdown',
      },
    ],
    exercises: [
      {
        id: 'exercise_fiction_fact',
        type: 'core',
        title: 'The Educational Dilemma Creator',
        duration: '15 min',
        description: 'Design a story problem where the protagonist can only escape by using Archimedes’ principle or Newton’s 3rd Law.',
        mission: 'The scientific rule must be the exact mechanism of resolution.',
        starterPrompt: 'The water is rising at 2 inches per minute. The only tools available are...',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['6x9', '7x10'],
      defaultArtMedium: 'vibrant_editorial_comic',
      recommendedLayout: 'story_with_science_sidebars',
      typographyPairing: {
        headingFont: 'Outfit / Baloo 2',
        bodyFont: 'Inter / Source Serif Pro',
        description: 'Modern, accessible typography with playful header accents and crystal-clear technical diagrams.',
      },
      recommendedPalette: ['#0f172a', '#3b82f6', '#10b981', '#f59e0b', '#ffffff'],
      referenceUploadTypes: ['Character concept sheets', 'Scientific diagrams', 'Comic storytelling panels', 'Infographics'],
      referenceGuideNote: 'Upload expressive character drawings and clear scientific diagrams.',
    },
  },

  // ==========================================
  // 6. SCIENCE HUMOR & ACADEMIC PARODY WORKSPACE
  // ==========================================
  science_humor: {
    id: 'science_humor',
    broadCategory: 'humor_parody',
    title: 'Science Humor & Academic Satire',
    subtitle: 'Witty, sophisticated parodies of scientific literature, absurd research, and lab culture',
    description: 'Specialized comedic workspace focusing on scientific literalism, academic bureaucracy, failed experiments, hilarious footnotes, and intentionally absurd hypotheses.',
    iconName: 'Smile',
    accentColor: '#f59e0b',
    tagline: 'Scientific Absurdity & Satirical Papers',
    subgenres: [
      { id: 'academic_satire', name: 'Academic & Peer-Review Satire', description: 'Parodying tenure battles, reviewer #2, and conference jargon.' },
      { id: 'lab_humor', name: 'Lab Humor & Failed Experiments', description: 'The chaotic realities of glassware, pipettes, and lab disasters.' },
      { id: 'ridiculous_hypothesis', name: 'Ridiculous Hypothesis Treatise', description: 'Applying ultra-rigorous mathematics to fundamentally absurd premises.' },
      { id: 'terminology_jokes', name: 'Terminology & Jargon Parody', description: 'Hilarious breakdowns of impenetrable academic nomenclature.' },
      { id: 'physics_biology_parody', name: 'Discipline-Specific Comedy', description: 'Evolutionary dead-ends, quantum existentialism, and thermodynamic jokes.' },
    ],
    purposes: [
      { id: 'entertain_scientists', label: 'Entertain STEM Professionals', description: 'Inside jokes and cathartic laughter for researchers and students.' },
      { id: 'satirize_systems', label: 'Satirize Academic Systems', description: 'Highlight real absurdities in funding and publishing through comedy.' },
    ],
    audiences: [
      { id: 'stem_geeks', label: 'Scientists, Engineers & Academics', description: 'Readers who know what p-hacking and western blots are.' },
      { id: 'pop_culture_nerds', label: 'Curious Nerds & XKCD Fans', description: 'Readers who love Randall Munroe and Jorge Cham (PhD Comics).' },
    ],
    structuralTemplate: {
      name: 'The Parody Scientific Paper Architecture',
      description: 'Absurd Abstract → Introduction to a Non-Problem → Flawed Methodology → Incomprehensible Graphs → Wild Conclusions → Snarky Footnotes.',
      defaultChapters: [
        { number: 1, title: 'The Absurd Abstract & Grant Funding Justification', sectionRole: 'Abstract', description: 'Requesting $2.4M to study something completely idiotic.' },
        { number: 2, title: 'Literature Review of Non-Existent Precedents', sectionRole: 'Literature', description: 'Citing fictional 19th-century German researchers.' },
        { number: 3, title: 'Methodology: Improvised Equipment & Duct Tape', sectionRole: 'Methods', description: 'Questionable experimental design explained with deadpan seriousness.' },
        { number: 4, title: 'Results: Statistically Inconvenient Discoveries', sectionRole: 'Results', description: 'Charts that prove nothing while claiming paradigm shifts.' },
        { number: 5, title: 'Discussion: Blaming Reviewer #2 & Future Grants', sectionRole: 'Discussion', description: 'Aggressive excuses and demands for tenured appointments.' },
      ],
    },
    contentModules: [
      { id: 'fake_paper_block', name: 'Peer-Reviewed Journal Layout', description: 'Formal dual-column LaTeX aesthetic with deadpan comedy.', tag: 'Journal Parody', isDefaultEnabled: true },
      { id: 'snarky_footnote', name: 'Snarky Footnote / Side Joke', description: 'Hilarious small-print commentary and passive-aggressive citations.', tag: 'Footnotes', isDefaultEnabled: true },
      { id: 'absurd_equation', name: 'Overcomplicated Fake Equation', description: 'Complex mathematical notation proving something obvious or stupid.', tag: 'Math Joke', isDefaultEnabled: true },
      { id: 'parody_diagram_box', name: 'Ridiculous Flowchart / Diagram', description: 'Visually complex diagram illustrating a chaotic social or lab dilemma.', tag: 'Visual Gag', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'skeptical_audit',
      description: 'Clearly distinguishes real underlying scientific principles from the intentionally absurd parody extrapolations.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'REAL SCIENCE FACT', color: 'emerald', tooltip: 'The true scientific principle being parodied.' },
        { key: 'SIMPLIFICATION', label: 'INTENTIONAL PARODY', color: 'amber', tooltip: 'Deliberately absurd comedic extrapolation.' },
      ],
    },
    magicTools: [
      {
        id: 'make_science_absurd',
        name: 'Make Science Absurd',
        description: 'Takes a real scientific fact and escalates it to the most ridiculous, logically inevitable comedic extreme.',
        iconName: 'Zap',
        buttonLabel: 'Make Science Absurd',
        actionType: 'absurd_escalation',
        promptTemplate: 'Take this authentic scientific concept and extrapolate it using deadpan academic seriousness into a hilarious, absurd catastrophe.',
        outputFormat: 'markdown',
      },
      {
        id: 'fake_academic_paper',
        name: 'Generate Fake Academic Paper',
        description: 'Creates a fully formatted journal paper (Abstract, Methods, Results, Acknowledgements) about a preposterous subject.',
        iconName: 'FileText',
        buttonLabel: 'Generate Fake Paper',
        actionType: 'fake_paper',
        promptTemplate: 'Write a deadpan peer-reviewed paper on this ridiculous topic complete with formal jargon, p-values, and passive-aggressive acknowledgments.',
        outputFormat: 'markdown',
      },
      {
        id: 'footnote_joke',
        name: 'Generate Footnote Joke',
        description: 'Generates 5 dry, biting, footnotes skewering academic egos, funding bodies, and graduate student misery.',
        iconName: 'MessageSquare',
        buttonLabel: 'Generate Snarky Footnotes',
        actionType: 'footnote_joke',
        promptTemplate: 'Generate 5 brilliant, deadpan, small-print footnote jokes to insert into this paragraph.',
        outputFormat: 'markdown',
      },
      {
        id: 'absurd_abstract_exercise',
        name: 'The Absurd Abstract Generator',
        description: 'Generates an intentionally ridiculous research abstract for readers to diagnose why it violates known laws of physics.',
        iconName: 'Lightbulb',
        buttonLabel: 'Create Absurd Abstract',
        actionType: 'absurd_abstract',
        promptTemplate: 'Generate a plausible-sounding research abstract containing exactly 1 hidden, hilarious thermodynamic impossibility.',
        outputFormat: 'markdown',
      },
    ],
    exercises: [
      {
        id: 'exercise_absurd_abstract',
        type: 'challenge',
        title: 'The Absurd Abstract Diagnostic',
        duration: '10 min',
        description: 'Read the AI-generated fake abstract and pinpoint the exact thermodynamic or biological fallacy being obscured by jargon.',
        mission: 'Spot the fake science buried under prestigious vocabulary.',
        starterPrompt: '"We observed a 34% increase in entropy reversal by cooling the coffee cup with sarcasm..." Your critique:',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['6x9', '8.5x11'],
      defaultArtMedium: 'satirical_editorial_cartoon',
      recommendedLayout: 'journal_two_column_with_cartoons',
      typographyPairing: {
        headingFont: 'Latin Modern Roman / Computer Modern',
        bodyFont: 'Times New Roman / Garamond',
        description: 'Deadpan academic journal aesthetic with clean mathematical formulas, dry captions, and unexpected satirical line drawings.',
      },
      recommendedPalette: ['#1e1b4b', '#312e81', '#f59e0b', '#f8fafc', '#dc2626'],
      referenceUploadTypes: ['Academic paper layouts', 'Lab cartoons (XKCD style)', 'Satirical charts and graphs', 'Diagram gags'],
      referenceGuideNote: 'Upload journal layouts, academic graphs, and line cartoons. The AI will output crisp dual-column layouts with formal typography.',
    },
  },

  // ==========================================
  // 7. GRAPHIC NOVEL NONFICTION WORKSPACE
  // ==========================================
  graphic_nonfiction: {
    id: 'graphic_nonfiction',
    broadCategory: 'illustrated_nonfiction',
    title: 'Graphic Novel Nonfiction',
    subtitle: 'Complex scientific, historical, or philosophical knowledge communicated sequentially through visual art',
    description: 'Visual sequential storytelling translating abstract ideas into dynamic panel layouts, visual metaphors, infographics, timelines, and character dialogues.',
    iconName: 'Layers',
    accentColor: '#6366f1',
    tagline: 'Visual Metaphors & Sequential Panels',
    subgenres: [
      { id: 'graphic_science', name: 'Graphic Science & Medicine', description: 'Visualizing atomic reactions, microbiology, cosmology, and immunology.' },
      { id: 'graphic_history', name: 'Graphic History & Biography', description: 'Documenting revolutions, explorers, and inventors through dynamic comics.' },
      { id: 'graphic_philosophy', name: 'Graphic Philosophy & Sociology', description: 'Translating thought experiments (Trolley Problem, Allegory of Cave) into sequential art.' },
      { id: 'visual_economics', name: 'Visual Economics & Systems', description: 'Mapping supply chains, market bubbles, and ecological flows.' },
    ],
    purposes: [
      { id: 'demystify_complexity', label: 'Demystify Impossible Concepts', description: 'Make abstract multidimensional physics or complex history visually intuitive.' },
      { id: 'universal_access', label: 'Maximum Visual Engagement', description: 'Engage visual thinkers who struggle with dense text-only volumes.' },
    ],
    audiences: [
      { id: 'visual_thinkers', label: 'Visual Learners & Graphic Novel Fans', description: 'Readers of Logicomix, Sapiens Graphic Adaptation, and Unflattening.' },
      { id: 'students_educators', label: 'Visual Curriculum Educators', description: 'Institutions seeking high-retention illustrated educational media.' },
    ],
    structuralTemplate: {
      name: 'The Sequential Panel-Page Architecture',
      description: 'Splash Opener → Concept Visual Metaphor → 6-Panel Breakdown → Dialogue Debate → Full-Page Infographic Summary.',
      defaultChapters: [
        { number: 1, title: 'Chapter Opener Splash & The Visual Metaphor', sectionRole: 'Visual Hook', description: 'Full-bleed illustration introducing the central metaphor.' },
        { number: 2, title: 'Panel Sequence: Step-by-Step Mechanism', sectionRole: 'Breakdown', description: '6-9 dynamic panels decomposing the core mechanism.' },
        { number: 3, title: 'Character Dialogue: Competing Perspectives', sectionRole: 'Debate', description: 'Two illustrated guides debating implications.' },
        { number: 4, title: 'Full-Page System Diagram & Timeline', sectionRole: 'Synthesis', description: 'Comprehensive visual infographic page.' },
      ],
    },
    contentModules: [
      { id: 'comic_panel_grid', name: 'Comic Panel Grid (3x3 / Dynamic)', description: 'Structured panel script with camera shots, captions, and speech bubbles.', tag: 'Comics', isDefaultEnabled: true },
      { id: 'visual_metaphor_card', name: 'Visual Metaphor Specifier', description: 'Defines the visual analogy (e.g. Gravity = trampoline rubber sheet).', tag: 'Visual Thinking', isDefaultEnabled: true },
      { id: 'infographic_spread', name: 'Full-Page Infographic Spread', description: 'Integrated text and visual hierarchy for dense systems.', tag: 'Infographics', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'informational_fiction_guard',
      description: 'Ensures visual metaphors do not introduce factual misconceptions about physical processes.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'PHYSICAL REALITY', color: 'emerald', tooltip: 'Directly true to reality.' },
        { key: 'SIMPLIFICATION', label: 'VISUAL ANALOGY', color: 'indigo', tooltip: 'Metaphorical visual device to aid conceptual understanding.' },
      ],
    },
    magicTools: [
      {
        id: 'turn_into_comic',
        name: 'Turn Concept Into Comic Script',
        description: 'Converts any dense factual text into a complete 6-panel comic page script with camera shots, art prompts, and dialogue bubbles.',
        iconName: 'Layers',
        buttonLabel: 'Turn Concept Into Comic',
        actionType: 'concept_to_comic',
        promptTemplate: 'Convert this factual explanation into a professional 6-panel comic page script. For each panel provide: 1) Composition & Camera Shot, 2) Visual Description for Illustrator, 3) Narration Caption, 4) Dialogue / Speech Bubble.',
        badge: 'Comic Script AI',
        outputFormat: 'markdown',
      },
      {
        id: 'create_visual_metaphor',
        name: 'Generate Visual Metaphors',
        description: 'Creates 3 unforgettable visual metaphors to explain difficult abstract concepts without math.',
        iconName: 'Shapes',
        buttonLabel: 'Create Visual Metaphors',
        actionType: 'visual_metaphor',
        promptTemplate: 'Generate 3 striking, optically clear visual metaphors to illustrate this complex invisible process.',
        outputFormat: 'markdown',
      },
      {
        id: 'create_timeline',
        name: 'Generate Illustrated Timeline',
        description: 'Builds a sequential panel timeline showing key milestones and dramatic historical beats.',
        iconName: 'Clock',
        buttonLabel: 'Build Illustrated Timeline',
        actionType: 'build_timeline',
        promptTemplate: 'Construct an illustrated sequential timeline with visual vignette prompts and key milestone captions.',
        outputFormat: 'flowchart',
      },
    ],
    exercises: [
      {
        id: 'exercise_panel_script',
        type: 'core',
        title: 'The 3-Panel Visual Economy Challenge',
        duration: '15 min',
        description: 'Explain the concept of natural selection using exactly 3 visual panels and less than 15 total words of text.',
        mission: 'Tell the entire story through sequential visual change.',
        starterPrompt: 'Panel 1 (Setting): ... / Panel 2 (Event): ... / Panel 3 (Outcome): ...',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['Comic', '8x10', 'A4'],
      defaultArtMedium: 'graphic_novel_ink_color',
      recommendedLayout: 'comic_panel_grid',
      typographyPairing: {
        headingFont: 'Bangers / Komika Axis',
        bodyFont: 'Comic Neue / Anime Ace',
        description: 'Professional comic lettering with distinct speech bubble typographies, narration boxes, and sound effect accents.',
      },
      recommendedPalette: ['#0f172a', '#4338ca', '#06b6d4', '#f59e0b', '#ef4444'],
      referenceUploadTypes: ['Character turnarounds', 'Panel layout sketches', 'Visual metaphor concepts', 'Color palette swatches', 'Lettering references'],
      referenceGuideNote: 'Upload character model sheets, expression matrices, and comic panel reference layouts.',
    },
  },

  // ==========================================
  // 8. TRIVIA & FACT BOOK WORKSPACE
  // ==========================================
  trivia_fact_book: {
    id: 'trivia_fact_book',
    broadCategory: 'reference',
    title: 'Trivia, Quiz & Fact Knowledge Book',
    subtitle: 'High-engagement fact collections, structured quizzes, and mind-bending trivia compendiums',
    description: 'Structured encyclopedic and entertainment format with multiple question types (Q&A, True/False, Multiple Choice, "Did You Know?"), difficulty tiers, and fact checks.',
    iconName: 'BookMarked',
    accentColor: '#64748b',
    tagline: 'Fact Verification & Competitive Quizzes',
    subgenres: [
      { id: 'competitive_quiz', name: 'Competitive Pub Quiz & League Book', description: 'Structured 10-round tournaments with scoring rubrics and tie-breakers.' },
      { id: 'did_you_know', name: 'Curious "Did You Know?" Fact Compendium', description: 'Short, shocking, verified factual vignettes with explanations.' },
      { id: 'mystery_facts', name: 'Mystery Fact Detective Book', description: 'Clue-based fact guessing where difficulty escalates each hint.' },
      { id: 'subject_trivia', name: 'Specialist Domain Trivia', description: 'Deep trivia in cinema, history, astronomy, linguistics, or geography.' },
    ],
    purposes: [
      { id: 'entertainment_learning', label: 'Addictive Social Entertainment', description: 'Engage families, trivia nights, and curious readers.' },
      { id: 'knowledge_testing', label: 'Self-Assessment & Mastery', description: 'Challenge readers to test their knowledge against expert tiers.' },
    ],
    audiences: [
      { id: 'trivia_buffs', label: 'Trivia Enthusiasts & Quizmasters', description: 'People looking for verifiable, non-trivial questions.' },
      { id: 'curious_browsers', label: 'Casual Bathroom & Coffee Table Readers', description: 'Browsers who love high-density, easily digestible facts.' },
    ],
    structuralTemplate: {
      name: 'The 10-Round Tournament & Fact Card Architecture',
      description: 'Warm-Up Easy Round → Themed Rounds → Visual & Clue Round → Expert Lightning Round → Detailed Explanations & Sources.',
      defaultChapters: [
        { number: 1, title: 'Round 1: The Warm-Up (Easy / General Knowledge)', sectionRole: 'Warm-up', description: 'Accessible questions to build momentum.' },
        { number: 2, title: 'Round 2: History’s Weirdest Secrets (Medium)', sectionRole: 'Thematic', description: 'Intriguing historical anomalies.' },
        { number: 3, title: 'Round 3: Science & Natural Oddities (Hard)', sectionRole: 'Science', description: 'Counter-intuitive biology and physics facts.' },
        { number: 4, title: 'Round 4: The Expert Gauntlet (Expert)', sectionRole: 'Challenge', description: 'Questions designed to challenge even quiz veterans.' },
        { number: 5, title: 'Answer Keys & The Deep-Dive Explanations', sectionRole: 'Answers', description: 'Paragraph explaining WHY the answer is true with citations.' },
      ],
    },
    contentModules: [
      { id: 'question_card', name: 'Quiz Question Block (MC / TF / Open)', description: 'Formatted question with difficulty indicator (1-5 stars).', tag: 'Questions', isDefaultEnabled: true },
      { id: 'did_you_know_box', name: '"Did You Know?" Callout Box', description: 'Bite-sized shocking fact vignette.', tag: 'Factoids', isDefaultEnabled: true },
      { id: 'answer_explanation', name: 'In-Depth Answer Explanation', description: 'Contextual paragraph revealing the fascinating backstory.', tag: 'Answers', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'academic_citations',
      description: 'Zero tolerance for urban legends or debunked trivia myths. Every fact is verified against primary references.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'VERIFIED FACT', color: 'emerald', tooltip: 'Cross-verified with primary authoritative records.' },
      ],
    },
    magicTools: [
      {
        id: 'generate_trivia_quiz',
        name: 'Generate Trivia Quiz Round',
        description: 'Creates a 10-question themed trivia round with 4 options per question, plausible distractors, and full answer explanations.',
        iconName: 'HelpCircle',
        buttonLabel: 'Generate Trivia Round',
        actionType: 'make_quiz',
        promptTemplate: 'Generate a 10-question trivia round on this topic with 4 multiple-choice options per question, 3 clever distractors, difficulty ratings, and explanations.',
        badge: 'Quiz Engine',
        outputFormat: 'quiz',
      },
      {
        id: 'two_truths_and_a_lie',
        name: 'Two Truths and a Lie Generator',
        description: 'Generates 3 scientifically or historically plausible statements where exactly 1 is a subtle, clever lie for readers to solve.',
        iconName: 'Zap',
        buttonLabel: 'Generate Two Truths & A Lie',
        actionType: 'two_truths_lie',
        promptTemplate: 'Create a "Two Truths and a Lie" puzzle for this chapter: 2 shocking real facts and 1 plausible fake fact. Include the reveal and explanation.',
        outputFormat: 'markdown',
      },
      {
        id: 'trivia_fact_check',
        name: 'Myth & Urban Legend Fact-Checker',
        description: 'Scans your trivia questions to ensure no debunked myths (e.g. "humans use only 10% of brain") slipped into your book.',
        iconName: 'ShieldAlert',
        buttonLabel: 'Fact-Check Trivia Questions',
        actionType: 'fact_check_trivia',
        promptTemplate: 'Audit these trivia items against modern scientific and historical consensus. Flag any debunked urban legends or misattributed quotes.',
        outputFormat: 'json_checklist',
      },
    ],
    exercises: [
      {
        id: 'exercise_distractor',
        type: 'core',
        title: 'The Plausible Distractor Drill',
        duration: '10 min',
        description: 'Given a verified obscure historical fact, write 3 plausible fake answers that test deep knowledge rather than obvious guessing.',
        mission: 'Master the art of high-quality distractor design.',
        starterPrompt: 'Question: "What unusual item was used as currency in 17th-century Virginia?" Real Answer: Tobacco. 3 Distractors:',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['5.5x8.5', '6x9', 'Square'],
      defaultArtMedium: 'clean_vector_iconography',
      recommendedLayout: 'grid_fact_cards',
      typographyPairing: {
        headingFont: 'Montserrat / Oswald',
        bodyFont: 'Inter / Roboto',
        description: 'Bold, punchy sans-serif typography with distinct question numbers, star ratings, and shaded answer boxes.',
      },
      recommendedPalette: ['#0f172a', '#2563eb', '#10b981', '#f59e0b', '#ffffff'],
      referenceUploadTypes: ['Fact card layout designs', 'Quiz book layouts', 'Icon badges', 'Infographic vignettes'],
      referenceGuideNote: 'Upload clean card layouts and icon references for modern quiz books.',
    },
  },

  // ==========================================
  // 9. "GROSS" SCIENCE WORKSPACE
  // ==========================================
  gross_science: {
    id: 'gross_science',
    broadCategory: 'science_pop_science',
    title: '"Gross" Science & Biological Oddities',
    subtitle: 'Hilarious, surprising, and educational science of bodily functions, microbiology, parasites, and decay',
    description: 'Specialized workspace tailored for playful, gross-but-informative science exploring digestion, decomposition, parasites, bodily fluids, and weird animal biology.',
    iconName: 'Microscope',
    accentColor: '#10b981',
    tagline: 'Disgustingly Accurate Educational Biology',
    subgenres: [
      { id: 'human_body_gross', name: 'Human Body & Bodily Functions', description: 'The astonishing science of mucus, stomach acid, sweat, and earwax.' },
      { id: 'parasites_bugs', name: 'Parasites & Microscopic Monsters', description: 'Creatures that live on and inside organisms and their weird survival tricks.' },
      { id: 'decay_decomposition', name: 'Decomposition & Nature’s Recyclers', description: 'Forensic entomology, fungal networks, and what happens after death.' },
      { id: 'animal_weirdness', name: 'Gross Animal Adaptations', description: 'Animals that vomit defense mechanisms, breathe through skin, or eat feces.' },
    ],
    purposes: [
      { id: 'hook_disengaged_learners', label: 'Hook Reluctant Readers', description: 'Use humor and shock value to teach serious cellular and evolutionary biology.' },
      { id: 'demystify_taboos', label: 'Demystify Human Biology', description: 'Remove shame and explain how bodily defense mechanisms actually keep us alive.' },
    ],
    audiences: [
      { id: 'curious_kids_teens', label: 'Curious Kids, Teens & YA Readers', description: 'Readers who love Horrible Science and Mary Roach.' },
      { id: 'adult_trivia_lovers', label: 'Adults Who Love Weird Science', description: 'Readers fascinated by medical oddities and forensic science.' },
    ],
    structuralTemplate: {
      name: 'The 6-Part Grossness Breakdown Architecture',
      description: 'Why This Happens → The Real Science → The Gross Fact → Myth vs Reality → What If...? → Grossness Meter.',
      defaultChapters: [
        { number: 1, title: 'The Snot & Mucus Shield: Your Lungs’ Sticky Trap', sectionRole: 'Immune System', description: 'Why your body produces a liter of mucus daily.' },
        { number: 2, title: 'Stomach Acid: The Caustic Acid Pool in Your Belly', sectionRole: 'Digestion', description: 'Why your stomach doesn’t digest itself.' },
        { number: 3, title: 'The Parasites Living on Your Eyelashes Right Now', sectionRole: 'Microbiology', description: 'Meet Demodex mites and why they are harmless friends.' },
        { number: 4, title: 'What Would Happen If You Never Bathed for a Year?', sectionRole: 'Microbiome', description: 'The bacterial ecosystem balance on human skin.' },
      ],
    },
    contentModules: [
      { id: 'why_it_happens', name: 'Why This Happens Block', description: 'Clear physiological explanation of the mechanism.', tag: 'Biology', isDefaultEnabled: true },
      { id: 'gross_fact_callout', name: 'The Disgusting-But-True Fact', description: 'High-impact shocking statistic or biological detail.', tag: 'Shock Value', isDefaultEnabled: true },
      { id: 'grossness_meter', name: 'Grossness Scale Indicator (1-5 Skulls)', description: 'Playful visual meter rating the ick factor.', tag: 'Rating', isDefaultEnabled: true },
      { id: 'what_if_scenario', name: '"What Would Happen If...?" Scenario', description: 'Extreme hypothetical exploring biological failure.', tag: 'Hypothetical', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'academic_citations',
      description: 'Ensures that despite the humorous gross tone, all physiological and microbiological facts are 100% medically accurate.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'MEDICALLY ACCURATE', color: 'emerald', tooltip: 'Peer-reviewed human physiology or biology.' },
      ],
    },
    magicTools: [
      {
        id: 'guess_gross_fact',
        name: 'Guess the Gross Fact',
        description: 'Creates an interactive guessing game where the reader predicts the gross biological function before the science is revealed.',
        iconName: 'HelpCircle',
        buttonLabel: 'Generate Guess The Gross Fact',
        actionType: 'guess_gross',
        promptTemplate: 'Generate a "Guess the Gross Fact" riddle about this biological phenomenon, with 3 plausible gross guesses and the real scientific explanation.',
        outputFormat: 'quiz',
      },
      {
        id: 'explain_why_gross',
        name: 'Transform Gross Into Evolutionary Genius',
        description: 'Explains why a disgusting biological feature is actually a brilliant evolutionary masterpiece of survival.',
        iconName: 'Zap',
        buttonLabel: 'Explain Evolutionary Genius',
        actionType: 'evolutionary_genius',
        promptTemplate: 'Explain how this seemingly disgusting bodily function is actually a brilliant evolutionary innovation that saved human lives.',
        outputFormat: 'markdown',
      },
    ],
    exercises: [
      {
        id: 'exercise_gross_audit',
        type: 'core',
        title: 'The Microbiome Map Challenge',
        duration: '10 min',
        description: 'Map the 4 beneficial bacterial species that live on human skin and what catastrophe occurs if they are eliminated.',
        mission: 'Understand symbiotic microbial balance.',
        starterPrompt: 'Staphylococcus epidermidis produces antimicrobial peptides that prevent...',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['7x10', '6x9'],
      defaultArtMedium: 'playful_gross_cartoon_illustration',
      recommendedLayout: 'comic_vignettes_with_fact_boxes',
      typographyPairing: {
        headingFont: 'Creepster / Chewy',
        bodyFont: 'Nunito / Quicksand',
        description: 'Playful, slightly irreverent display typography paired with clean, rounded sans-serif body text.',
      },
      recommendedPalette: ['#064e3b', '#047857', '#84cc16', '#bef264', '#1f2937'],
      referenceUploadTypes: ['Microscopic organism drawings', 'Cartoon bodily organs', 'Disgust meter graphics', 'Playful educational art'],
      referenceGuideNote: 'Upload colorful cartoon microbiology sketches and expressive character organs.',
    },
  },

  // ==========================================
  // 10. POP-SCIENCE WITH WIT WORKSPACE
  // ==========================================
  pop_science_wit: {
    id: 'pop_science_wit',
    broadCategory: 'science_pop_science',
    title: 'Witty Pop-Science Writer',
    subtitle: 'Conversational, curious, and wonder-driven explanations of profound natural phenomena',
    description: 'Dedicated workspace for conversational, curious, deadpan, and wonder-driven science writing (in the tradition of Bill Bryson, Randall Munroe, and Mary Roach).',
    iconName: 'Zap',
    accentColor: '#06b6d4',
    tagline: 'Wonder, Analogies & Jargon-Free Wit',
    subgenres: [
      { id: 'curious_questions', name: 'Curious Everyday Mysteries', description: 'Why is the sky blue, why do we dream, and what happens at absolute zero?' },
      { id: 'cosmic_physics', name: 'Cosmic & Quantum Wonders', description: 'Black holes, time dilation, and entropy explained through brilliant analogies.' },
      { id: 'evolutionary_oddities', name: 'Evolutionary Oddities & Ecology', description: 'The accidental genius of evolutionary adaptations and ecological webs.' },
      { id: 'neuroscience_mind', name: 'Neuroscience & Human Quirks', description: 'Cognitive biases, memory distortions, and consciousness.' },
    ],
    purposes: [
      { id: 'inspire_wonder', label: 'Inspire Existential Wonder', description: 'Help readers see the everyday universe with fresh, astonished eyes.' },
      { id: 'destroy_jargon', label: 'Eliminate Inpenetrable Jargon', description: 'Explain complex theoretical physics using household metaphors.' },
    ],
    audiences: [
      { id: 'curious_adults', label: 'Curious General Readers', description: 'Fans of A Short History of Nearly Everything and What If?.' },
      { id: 'lifelong_learners', label: 'Lifelong Self-Educators', description: 'Inquisitive readers looking for intellectual delight without textbooks.' },
    ],
    structuralTemplate: {
      name: 'The 7-Step Witty Science Arc',
      description: 'Curious Question → Strange Observation → Scientific Explanation → Unexpected Implication → Human Connection → Comic Observation → What This Actually Means.',
      defaultChapters: [
        { number: 1, title: 'The Absurd Question Nobody Asks', sectionRole: 'Hook', description: 'Opening with an deceptively simple observation about reality.' },
        { number: 2, title: 'The Bizarre Physical Reality Beneath the Surface', sectionRole: 'The Science', description: 'Unpacking the atomic or cosmological mechanisms.' },
        { number: 3, title: 'The Metaphor That Actually Makes Sense', sectionRole: 'Analogy', description: 'Replacing differential equations with a bowling ball on a waterbed.' },
        { number: 4, title: 'The Existential & Comic Implication', sectionRole: 'Synthesis', description: 'What this means for the fleeting human experience on Earth.' },
      ],
    },
    contentModules: [
      { id: 'weird_question_block', name: 'The Deceptively Simple Question', description: 'Framing the scientific inquiry with child-like curiosity.', tag: 'Hook', isDefaultEnabled: true },
      { id: 'brilliant_analogy_box', name: 'Household Analogy Box', description: 'Vivid physical metaphor that replaces complex mathematics.', tag: 'Analogy', isDefaultEnabled: true },
      { id: 'human_connection_vignette', name: 'The Human Connection', description: 'Poetic, funny reflection on how this affects daily human life.', tag: 'Humanity', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'academic_citations',
      description: 'All simplified analogies are mathematically and physically verified not to produce common misconceptions.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'PHYSICALLY ACCURATE', color: 'emerald', tooltip: 'True to modern empirical physics/chemistry.' },
        { key: 'SIMPLIFICATION', label: 'WORKING ANALOGY', color: 'cyan', tooltip: 'Intuitive metaphor preserving core mathematical relationships.' },
      ],
    },
    magicTools: [
      {
        id: 'find_weird_question',
        name: 'Find the Weird Question',
        description: 'Discovers the strangest, most captivating angle to introduce any scientific topic.',
        iconName: 'HelpCircle',
        buttonLabel: 'Find The Weird Question',
        actionType: 'weird_question',
        promptTemplate: 'Find the most counter-intuitive, strange, and delightful question that introduces this scientific concept to an ordinary curious person.',
        outputFormat: 'markdown',
      },
      {
        id: 'create_analogy',
        name: 'Create Crystal-Clear Analogy',
        description: 'Generates 3 physical, everyday analogies that make complex math or quantum mechanics instantly graspable.',
        iconName: 'Shapes',
        buttonLabel: 'Create Analogy',
        actionType: 'make_analogy',
        promptTemplate: 'Invent 3 distinct, brilliant analogies using everyday objects (e.g. toast, trains, revolving doors) to explain this principle without equations.',
        outputFormat: 'markdown',
      },
      {
        id: 'make_it_witty',
        name: 'Inject Bill Bryson-Style Wit',
        description: 'Refines the prose to add deadpan humor, self-deprecating observations, and luminous wonder.',
        iconName: 'Smile',
        buttonLabel: 'Add Wit & Wonder',
        actionType: 'add_wit',
        promptTemplate: 'Polish this scientific explanation in the voice of Bill Bryson or Mary Roach: conversational, slightly amazed by our cosmic incompetence, and delightfully witty.',
        outputFormat: 'markdown',
      },
      {
        id: 'science_reality_check',
        name: 'Science Reality Check',
        description: 'Checks if your simplified metaphor accidentally violates thermodynamic or quantum laws.',
        iconName: 'ShieldAlert',
        buttonLabel: 'Run Science Reality Check',
        actionType: 'science_reality_check',
        promptTemplate: 'Examine this simplified science explanation. Ensure that while it is simple and witty, it does NOT teach a known physical falsehood.',
        outputFormat: 'json_checklist',
      },
    ],
    exercises: [
      {
        id: 'exercise_analogy',
        type: 'core',
        title: 'The Jargon-Buster Challenge',
        duration: '10 min',
        description: 'Explain General Relativity or Photosynthesis to a 10-year-old using only words from the 1,000 most common English words.',
        mission: 'Zero technical jargon. Pure physical intuition.',
        starterPrompt: 'Space is like a giant soft bed where heavy things make deep dents...',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['6x9', '5.5x8.5'],
      defaultArtMedium: 'clean_editorial_illustration',
      recommendedLayout: 'spacious_single_column',
      typographyPairing: {
        headingFont: 'Cabinet Grotesk / Outfit',
        bodyFont: 'Newsreader / Freight Text',
        description: 'Modern, high-energy sans-serif titles paired with an ultra-readable literary body serif with generous negative space.',
      },
      recommendedPalette: ['#042f2e', '#0f766e', '#14b8a6', '#f0fdfa', '#f59e0b'],
      referenceUploadTypes: ['Editorial science illustrations', 'Vivid diagram concepts', 'Astronomical artistic plates', 'Minimalist graphic art'],
      referenceGuideNote: 'Upload clean editorial illustrations and conceptual diagrams.',
    },
  },

  // ==========================================
  // 11. SKEPTICAL EXPOSÉ WORKSPACE
  // ==========================================
  skeptical_expose: {
    id: 'skeptical_expose',
    broadCategory: 'nonfiction',
    title: 'Skeptical Exposé & Myth Investigation',
    subtitle: 'Rigorous investigative deconstruction of pseudoscience, conspiracies, medical myths, and misinformation',
    description: 'Investigative forensic workspace analyzing extraordinary claims, identifying logical fallacies, building evidence matrices, and separating genuine uncertainty from fraud.',
    iconName: 'ShieldAlert',
    accentColor: '#dc2626',
    tagline: 'Evidence Matrices & Fallacy Deconstruction',
    subgenres: [
      { id: 'medical_myths', name: 'Medical Pseudoscience & Quackery', description: 'Investigating dangerous wellness trends, fake cures, and anti-vaccine claims.' },
      { id: 'conspiracy_theories', name: 'Conspiracy Theories & Misinformation', description: 'Deconstructing psychological roots and financial motives behind mass delusions.' },
      { id: 'paranormal_claims', name: 'Paranormal & Cryptid Claims', description: 'Forensic historical investigation of UFOs, ghosts, and cryptid legends.' },
      { id: 'scientific_myths', name: 'Historical Science Myths & Urban Legends', description: 'Correcting widely held historical falsehoods and misconceptions.' },
    ],
    purposes: [
      { id: 'promote_critical_thinking', label: 'Promote Critical Thinking', description: 'Equip readers with scientific skepticism tools to evaluate dubious claims.' },
      { id: 'protect_public_health', label: 'Protect Public Health & Truth', description: 'Debunk harmful misinformation with verifiable empirical data.' },
    ],
    audiences: [
      { id: 'skeptics_educators', label: 'Skeptics, Scientists & Educators', description: 'Readers of Carl Sagan, Michael Shermer, and James Randi.' },
      { id: 'general_public', label: 'General Public Seeking Clarity', description: 'Individuals trying to separate medical fact from internet marketing scams.' },
    ],
    structuralTemplate: {
      name: 'The 6-Step Skeptical Investigation Architecture',
      description: 'The Claim → Why People Believe It → The Evidence Offered → The Counterevidence & Controlled Trials → What We Actually Know → What Remains Uncertain.',
      defaultChapters: [
        { number: 1, title: 'The Claim & Its Origin Story', sectionRole: 'The Claim', description: 'Who invented it and how it gained viral momentum.' },
        { number: 2, title: 'The Psychological Appeal & Why Sincere People Believe It', sectionRole: 'Psychology', description: 'Cognitive biases (confirmation bias, patternicity) at work.' },
        { number: 3, title: 'The Evidentiary Audit: Controlled Double-Blind Trials', sectionRole: 'Evidence', description: 'What happens when tested under rigorous lab conditions.' },
        { number: 4, title: 'The Anatomy of the Fallacy / The Financial Motive', sectionRole: 'Mechanism', description: 'Follow the money, grift, or post-hoc reasoning.' },
        { number: 5, title: 'The True Scientific Consensus & Honest Uncertainty', sectionRole: 'Consensus', description: 'What empirical science actually proves vs what is unknown.' },
      ],
    },
    contentModules: [
      { id: 'claim_box', name: 'The Claim Statement Box', description: 'Unbiased, clear summary of the extraordinary claim.', tag: 'Claim', isDefaultEnabled: true },
      { id: 'fallacy_detector_card', name: 'Logical Fallacy Badge', description: 'Identifies Ad Hominem, Post Hoc, Straw Man, Appeal to Nature, etc.', tag: 'Logic', isDefaultEnabled: true },
      { id: 'evidence_matrix_table', name: 'Evidence vs Counterevidence Matrix', description: 'Side-by-side comparison of empirical studies vs anecdotes.', tag: 'Evidence Matrix', isDefaultEnabled: true },
      { id: 'confidence_rating', name: 'Scientific Confidence Assessment', description: 'Rubric rating: Established Fact / Plausible / Unproven / Refuted / Outright Fraud.', tag: 'Confidence', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'skeptical_audit',
      description: 'Crucial: Clearly distinguishes genuine scientific uncertainty from completely unsupported or fraudulent claims.',
      badges: [
        { key: 'VERIFIED_FACT', label: 'EMPIRICAL CONSENSUS', color: 'emerald', tooltip: 'Supported by randomized controlled trials and peer consensus.' },
        { key: 'UNCERTAIN', label: 'GENUINE UNCERTAINTY', color: 'blue', tooltip: 'Areas where current science lacks definitive data.' },
        { key: 'SPECULATION', label: 'UNPROVEN SPECULATION', color: 'amber', tooltip: 'Anecdotal claim lacking methodological evidence.' },
      ],
    },
    magicTools: [
      {
        id: 'claim_audit',
        name: 'Claim & Evidence Audit',
        description: 'Performs a comprehensive evidentiary audit of a specific claim, identifying the burden of proof and missing controls.',
        iconName: 'ShieldAlert',
        buttonLabel: 'Audit Claim & Evidence',
        actionType: 'claim_audit',
        promptTemplate: 'Perform a forensic skeptical audit of this claim. Break it down into: 1) Core Hypothesis, 2) Evidence Offered, 3) Methodological Flaws in Evidence, 4) Controlled Counter-Evidence, 5) Scientific Confidence Verdict.',
        badge: 'Forensic Audit',
        outputFormat: 'interactive_matrix',
      },
      {
        id: 'detect_fallacy',
        name: 'Logical Fallacy Detector',
        description: 'Scans text to detect logical fallacies (Appeal to Antiquity, Naturalistic Fallacy, Cherry-Picking, False Dilemma).',
        iconName: 'AlertTriangle',
        buttonLabel: 'Detect Logical Fallacies',
        actionType: 'fallacy_detect',
        promptTemplate: 'Scan this argument for logical fallacies, cognitive biases, and deceptive rhetorical tactics. Highlight each with an explanation.',
        outputFormat: 'json_checklist',
      },
      {
        id: 'evidence_matrix_gen',
        name: 'Build Evidence Matrix',
        description: 'Builds a structured 4-column matrix: Claim / Proponent Evidence / Controlled Scientific Evidence / Scientific Verdict.',
        iconName: 'Table',
        buttonLabel: 'Build Evidence Matrix',
        actionType: 'make_matrix',
        promptTemplate: 'Generate an Evidence Matrix table comparing the anecdotal claims with peer-reviewed empirical findings.',
        outputFormat: 'table',
      },
    ],
    exercises: [
      {
        id: 'exercise_fallacy_hunt',
        type: 'core',
        title: 'The Baloney Detection Kit Exercise',
        duration: '15 min',
        description: 'Take a famous pseudoscience sales pitch and apply Carl Sagan’s 9 Baloney Detection rules to dismantle it.',
        mission: 'Systematic methodological skepticism without cynicism.',
        starterPrompt: 'Claim: "Ancient healers knew this one herb detoxifies all heavy metals because..." Flaws identified:',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['6x9', '7x10'],
      defaultArtMedium: 'forensic_investigative_grid',
      recommendedLayout: 'two_column_with_evidence_boxes',
      typographyPairing: {
        headingFont: 'Space Grotesk / Archivo',
        bodyFont: 'Source Serif Pro / Inter',
        description: 'Sharp, objective, high-contrast typography with forensic callout badges and clear comparative tables.',
      },
      recommendedPalette: ['#18181b', '#27272a', '#dc2626', '#e4e4e7', '#0284c7'],
      referenceUploadTypes: ['Evidence comparison charts', 'Forensic document templates', 'Data verification tables', 'Newspaper clipping layouts'],
      referenceGuideNote: 'Upload investigative layouts, evidence charts, and clean tabular data references.',
    },
  },

  // ==========================================
  // 12. PRACTICAL ESOTERIC & PHILOSOPHICAL WORKSPACE
  // ==========================================
  practical_esoteric_textbook: {
    id: 'practical_esoteric_textbook',
    broadCategory: 'esoteric_philosophical',
    title: 'Practical Esoteric & Symbolic Textbook',
    subtitle: 'Historical, philosophical, cultural, and spiritual study of esoteric traditions and symbolism',
    description: 'Specialized study volume exploring esoteric traditions (Hermeticism, Alchemy, Kabbalah, Sacred Geometry) while strictly distinguishing historical belief from empirical fact.',
    iconName: 'Shapes',
    accentColor: '#eab308',
    tagline: 'Historical Tradition, Symbolism & Comparative Study',
    subgenres: [
      { id: 'hermetic_study', name: 'Hermetic Philosophy & Texts', description: 'Cosmology, correspondence principles, and Renaissance reception.' },
      { id: 'sacred_geometry', name: 'Sacred Geometry & Proportion', description: 'Mathematical properties vs historical and symbolic interpretations.' },
      { id: 'alchemical_history', name: 'Alchemical History & Symbolism', description: 'Proto-chemistry, spiritual metallurgy, and manuscript allegories.' },
      { id: 'kabbalistic_traditions', name: 'Kabbalistic & Mystical Traditions', description: 'The Sefirot, linguistic cosmology, and comparative mysticism.' },
      { id: 'ritual_theurgy', name: 'Theurgy, Ritual & Western Ceremonial', description: 'Historical liturgical structures, symbolic actions, and cultural anthropology.' },
      { id: 'occult_reference_work', name: 'Occult & Symbolic Reference Lexicon', description: 'Categorized directories of herbs, symbols, planets, and numbers.' },
      { id: 'astral_temple_manual', name: 'Inner-World & Visualization Manual', description: 'Guided imaginative practices, reflective journaling, and active imagination.' },
    ],
    purposes: [
      { id: 'scholarly_preservation', label: 'Scholarly Historical Preservation', description: 'Preserve and contextualize primary historical esoteric texts and symbols.' },
      { id: 'symbolic_understanding', label: 'Symbolic & Archetypal Understanding', description: 'Explore psychological and philosophical archetypes (Jungian active imagination).' },
    ],
    audiences: [
      { id: 'scholars_tradition', label: 'Scholars of Western Esotericism', description: 'Academic researchers in history of religion and philosophy.' },
      { id: 'symbolic_practitioners', label: 'Symbolic & Philosophical Practitioners', description: 'Serious students of historical ritual, meditation, and sacred geometry.' },
    ],
    structuralTemplate: {
      name: 'The 9-Part Esoteric Study Architecture',
      description: 'Historical Background → Terminology → Primary Sources → Interpretations → Symbolism → Comparative Analysis → Exercises → Reflection → Glossary.',
      defaultChapters: [
        { number: 1, title: 'Historical Origins & Primary Manuscripts', sectionRole: 'History', description: 'Historical provenance and cultural context of the tradition.' },
        { number: 2, title: 'Core Terminology & Symbolic Lexicon', sectionRole: 'Lexicon', description: 'Definitions of Greek, Latin, or Hebrew philosophical terms.' },
        { number: 3, title: 'Primary Source Excerpt & Translation', sectionRole: 'Primary Text', description: 'Verbatim historical text with line-by-line commentary.' },
        { number: 4, title: 'The Symbolic & Cosmological Architecture', sectionRole: 'Symbolism', description: 'Correspondence tables, geometric diagrams, and planetary models.' },
        { number: 5, title: 'Comparative Analysis Across Traditions', sectionRole: 'Comparative', description: 'Comparing Hermetic, Neoplatonic, and Vedic parallels.' },
        { number: 6, title: 'Guided Reflection & Contemplative Exercise', sectionRole: 'Exercise', description: 'Structured visualization and reflective journaling practice.' },
      ],
    },
    contentModules: [
      { id: 'historical_manuscript_box', name: 'Primary Source Manuscript Box', description: 'Authentic historical citation with Latin/Greek terms.', tag: 'Primary Text', isDefaultEnabled: true },
      { id: 'correspondence_table', name: 'Correspondence & Symbolism Table', description: 'Multi-column matrix connecting Planet, Element, Color, Metal, Herb.', tag: 'Correspondences', isDefaultEnabled: true },
      { id: 'belief_vs_fact_tag', name: 'Tradition vs Empirical Fact Tag', description: 'Crucial label distinguishing historical belief from empirical physics.', tag: 'Guardrail', isDefaultEnabled: true },
      { id: 'guided_visualization_card', name: 'Guided Visualization & Contemplation', description: 'Numbered inner-world practice with reflection prompts.', tag: 'Contemplation', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: true,
      mode: 'esoteric_belief_vs_fact',
      description: 'CRITICAL MANDATE: Clearly labels historical, spiritual, and symbolic traditions as cultural beliefs rather than empirically established physical facts.',
      badges: [
        { key: 'DOCUMENTED_CLAIM', label: 'HISTORICAL TRADITION / BELIEF', color: 'amber', tooltip: 'Documented belief or symbolic system from historical tradition.' },
        { key: 'VERIFIED_FACT', label: 'ESTABLISHED EMPIRICAL FACT', color: 'emerald', tooltip: 'Empirically verified modern physics, chemistry, or medicine.' },
        { key: 'INTERPRETATION', label: 'SYMBOLIC / PSYCHOLOGICAL ALLEGORY', color: 'purple', tooltip: 'Archetypal or metaphorical interpretation of an inner state.' },
      ],
    },
    magicTools: [
      {
        id: 'symbol_relationship_map',
        name: 'Symbol Relationship & Correspondence Map',
        description: 'Maps the traditional correspondences between elements, planets, geometry, colors, and philosophical concepts.',
        iconName: 'Shapes',
        buttonLabel: 'Generate Correspondence Map',
        actionType: 'correspondence_map',
        promptTemplate: 'Generate a detailed traditional correspondence table for this symbol/tradition across: Planet, Metal, Color, Geometry, Virtue, and Archetype.',
        outputFormat: 'table',
      },
      {
        id: 'tradition_comparison',
        name: 'Comparative Tradition Analysis',
        description: 'Compares how Hermeticism, Gnosticism, Neoplatonism, and Kabbalah interpret the same metaphysical question.',
        iconName: 'Split',
        buttonLabel: 'Compare Across 4 Traditions',
        actionType: 'compare_traditions',
        promptTemplate: 'Compare how Hermeticism, Kabbalah, Neoplatonism, and Alchemy interpret this core concept, noting historical mutual influences.',
        outputFormat: 'interactive_matrix',
      },
      {
        id: 'belief_vs_evidence_audit',
        name: 'Belief vs Science Separator',
        description: 'Audits the draft to ensure supernatural claims are clearly presented as historical spiritual traditions rather than modern scientific facts.',
        iconName: 'ShieldCheck',
        buttonLabel: 'Audit Belief vs Empirical Fact',
        actionType: 'belief_vs_fact',
        promptTemplate: 'Review this text to ensure all metaphysical and ritual assertions are properly attributed to historical tradition rather than stated as empirical facts.',
        badge: 'Epistemic Guardrail',
        outputFormat: 'json_checklist',
      },
      {
        id: 'guided_visualization_gen',
        name: 'Create Guided Contemplation Exercise',
        description: 'Generates a step-by-step active imagination / inner contemplation exercise grounded in traditional symbolism.',
        iconName: 'Eye',
        buttonLabel: 'Create Contemplative Exercise',
        actionType: 'guided_visualization',
        promptTemplate: 'Create a structured, safe guided contemplation and journaling exercise based on this symbolic concept (e.g. geometric symmetry).',
        outputFormat: 'markdown',
      },
    ],
    exercises: [
      {
        id: 'exercise_symbol_math',
        type: 'core',
        title: 'Symbol vs Mathematics Separation Drill',
        duration: '15 min',
        description: 'Analyze the Golden Ratio (phi) or Vesica Piscis: separate its true mathematical properties from later Renaissance symbolic interpretations.',
        mission: 'Demonstrate rigorous distinction between geometry and symbolic attribution.',
        starterPrompt: 'Mathematical properties: Irrational number 1.618... / Later symbolic attributions in Renaissance hermeticism:',
      },
    ],
    visualTreatment: {
      recommendedPageSizes: ['7x10', '8x10', 'Square'],
      defaultArtMedium: 'renaissance_woodcut_alchemical_diagram',
      recommendedLayout: 'manuscript_with_symbolic_plates',
      typographyPairing: {
        headingFont: 'Cinzel Decorative / Cormorant Garamond',
        bodyFont: 'Cormorant / Adobe Jenson',
        description: 'Sumptuous, mystical Renaissance typography with illuminated chapter openers, woodcut engravings, and geometric diagrams.',
      },
      recommendedPalette: ['#1c1917', '#78350f', '#d97706', '#fef3c7', '#312e81'],
      referenceUploadTypes: ['Historical manuscript scans', 'Alchemical woodcuts', 'Geometric construction plates', 'Correspondence charts', 'Astrological charts'],
      referenceGuideNote: 'Upload manuscript woodcuts, sacred geometry diagrams, and historical engravings. The AI will output authentic archival aesthetics.',
    },
  },

  // ==========================================
  // 13. CUSTOM HYBRID & BESPOKE ARCHITECTURE
  // ==========================================
  custom_hybrid: {
    id: 'custom_hybrid',
    broadCategory: 'custom',
    title: 'Custom Hybrid Publishing Studio',
    subtitle: 'Bespoke multi-genre blending with unlocked structural modules and customizable AI tools',
    description: 'Open architecture workspace allowing full composition of any subgenre, custom structural chapters, flexible factuality tiers, and arbitrary AI tooling.',
    iconName: 'Wand2',
    accentColor: '#a855f7',
    tagline: 'Fully Unlocked Architecture & Hybrid Blends',
    subgenres: [
      { id: 'hybrid_blend', name: 'Multi-Genre Hybrid', description: 'Blend elements from scholarly monograph, graphic novel, and creative writing.' },
      { id: 'open_canvas', name: 'Open Canvas Architecture', description: 'Completely freeform layout and chapter sequencing.' },
    ],
    purposes: [
      { id: 'unique_vision', label: 'Execute Bespoke Vision', description: 'Create an unprecedented book format combining multiple disciplines.' },
    ],
    audiences: [
      { id: 'custom_audience', label: 'Target Audience', description: 'Defined by the author.' },
    ],
    structuralTemplate: {
      name: 'Custom Unlocked Architecture',
      description: 'Fully flexible user-defined structure.',
      defaultChapters: [
        { number: 1, title: 'Chapter 1: Opening Thesis / Incident', sectionRole: 'Intro', description: 'Introduction to the core thesis or story world.' },
        { number: 2, title: 'Chapter 2: Development & Exploration', sectionRole: 'Core', description: 'Deep exploration of primary themes and evidence.' },
        { number: 3, title: 'Chapter 3: Synthesis & Culmination', sectionRole: 'Conclusion', description: 'Resolution, implications, and future horizons.' },
      ],
    },
    contentModules: [
      { id: 'custom_block', name: 'Custom Section Module', description: 'Flexible content block.', tag: 'Custom', isDefaultEnabled: true },
    ],
    factualityGuardrail: {
      enabled: false,
      mode: 'none',
      description: 'Customizable factuality parameters.',
      badges: [],
    },
    magicTools: [
      {
        id: 'custom_ai_brainstorm',
        name: 'Bespoke AI Orchestrator',
        description: 'Direct AI instructions with custom parameters for your hybrid volume.',
        iconName: 'Wand2',
        buttonLabel: 'Run Custom AI Prompt',
        actionType: 'custom_prompt',
        promptTemplate: 'Analyze and elevate this custom book draft according to the author’s hybrid parameters.',
        outputFormat: 'markdown',
      },
    ],
    exercises: [],
    visualTreatment: {
      recommendedPageSizes: ['6x9', '8.5x11', 'A5', 'Square'],
      defaultArtMedium: 'editorial_illustration',
      recommendedLayout: 'classic_literary_single_column',
      typographyPairing: {
        headingFont: 'Playfair Display',
        bodyFont: 'Inter',
        description: 'Modern, balanced hybrid typography.',
      },
      recommendedPalette: ['#1e293b', '#64748b', '#a855f7', '#f8fafc', '#d97706'],
      referenceUploadTypes: ['Custom artwork', 'Photographs', 'Diagrams', 'Character sheets'],
      referenceGuideNote: 'Upload any visual reference appropriate to your hybrid volume.',
    },
  },

  // 11 Core Fiction, Comic, Craft, Drama, Horror & Satire Studios
  satire_comedy: SATIRE_COMEDY_WORKSPACE,
  illustrated_novel: ILLUSTRATED_NOVEL_WORKSPACE,
  mystery_detective: MYSTERY_DETECTIVE_WORKSPACE,
  comic_book: COMIC_BOOK_WORKSPACE,
  graphic_novel_cinematic: GRAPHIC_NOVEL_CINEMATIC_WORKSPACE,
  science_fiction: SCIENCE_FICTION_WORKSPACE,
  epic_fantasy: EPIC_FANTASY_WORKSPACE,
  suspense_thriller: SUSPENSE_THRILLER_WORKSPACE,
  craft_writing_manual: CRAFT_WRITING_MANUAL_WORKSPACE,
  romance_drama: ROMANCE_DRAMA_WORKSPACE,
  horror_supernatural: HORROR_SUPERNATURAL_WORKSPACE,
};

// Helper to look up a workspace by ID or fallback to broad category default
export function getWorkspaceForArchetype(
  archetype: string,
  broadCategory?: BroadCategoryKey
): GenreWorkspaceProfile {
  // Direct match
  if (GENRE_WORKSPACES[archetype]) {
    return GENRE_WORKSPACES[archetype];
  }

  // Broad category default
  if (broadCategory) {
    const cat = BROAD_CATEGORIES.find(c => c.id === broadCategory);
    if (cat && GENRE_WORKSPACES[cat.defaultWorkspaceId]) {
      return GENRE_WORKSPACES[cat.defaultWorkspaceId];
    }
  }

  // Fallbacks based on common keys
  const lower = archetype.toLowerCase();
  if (lower.includes('satire') || lower.includes('comedy') || lower.includes('absurd')) return GENRE_WORKSPACES.satire_comedy;
  if (lower.includes('detective') || lower.includes('mystery') || lower.includes('whodunit') || lower.includes('clue') || lower.includes('alibi')) return GENRE_WORKSPACES.mystery_detective;
  if (lower.includes('comic') || lower.includes('strip') || lower.includes('manga')) return GENRE_WORKSPACES.comic_book;
  if (lower.includes('graphic_novel') || lower.includes('cinematic') || lower.includes('sequential')) return GENRE_WORKSPACES.graphic_novel_cinematic;
  if (lower.includes('sci_fi') || lower.includes('scifi') || lower.includes('science_fiction') || lower.includes('cyberpunk') || lower.includes('space')) return GENRE_WORKSPACES.science_fiction;
  if (lower.includes('fantasy') || lower.includes('magic') || lower.includes('dragon') || lower.includes('quest') || lower.includes('kingdom')) return GENRE_WORKSPACES.epic_fantasy;
  if (lower.includes('thriller') || lower.includes('suspense') || lower.includes('ticking') || lower.includes('manhunt')) return GENRE_WORKSPACES.suspense_thriller;
  if (lower.includes('craft') || lower.includes('writing_manual') || lower.includes('masterclass') || lower.includes('workshop')) return GENRE_WORKSPACES.craft_writing_manual;
  if (lower.includes('romance') || lower.includes('drama') || lower.includes('love') || lower.includes('relationship')) return GENRE_WORKSPACES.romance_drama;
  if (lower.includes('horror') || lower.includes('supernatural') || lower.includes('dread') || lower.includes('haunt') || lower.includes('gothic') || lower.includes('ghost')) return GENRE_WORKSPACES.horror_supernatural;
  if (lower.includes('illustrated_novel') || (lower.includes('illustrated') && lower.includes('novel'))) return GENRE_WORKSPACES.illustrated_novel;
  if (lower.includes('monograph') || lower.includes('academic') || lower.includes('scholarly')) return GENRE_WORKSPACES.monograph;
  if (lower.includes('writing') || lower.includes('manual') || lower.includes('textbook')) return GENRE_WORKSPACES.craft_writing_manual;
  if (lower.includes('handbook') || lower.includes('runbook') || lower.includes('sop')) return GENRE_WORKSPACES.handbook;
  if (lower.includes('narrative') || lower.includes('biography') || lower.includes('memoir')) return GENRE_WORKSPACES.narrative_nonfiction;
  if (lower.includes('comic') || lower.includes('graphic')) return GENRE_WORKSPACES.comic_book;
  if (lower.includes('humor') || lower.includes('parody')) return GENRE_WORKSPACES.satire_comedy;
  if (lower.includes('trivia') || lower.includes('quiz') || lower.includes('fact')) return GENRE_WORKSPACES.trivia_fact_book;
  if (lower.includes('gross')) return GENRE_WORKSPACES.gross_science;
  if (lower.includes('pop_science') || lower.includes('witty')) return GENRE_WORKSPACES.pop_science_wit;
  if (lower.includes('skeptical') || lower.includes('expose') || lower.includes('myth')) return GENRE_WORKSPACES.skeptical_expose;
  if (lower.includes('esoteric') || lower.includes('hermetic') || lower.includes('geometry') || lower.includes('alchem') || lower.includes('kabbalah') || lower.includes('theurgy') || lower.includes('astral') || lower.includes('numerology')) return GENRE_WORKSPACES.practical_esoteric_textbook;

  // Default to mystery or craft manual
  return GENRE_WORKSPACES.mystery_detective;
}
