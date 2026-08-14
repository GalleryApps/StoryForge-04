import { StoryInputFormData, StoryTemplate, StoryArchetype, StoryBlueprint, FieldItem } from '../types';

export const createField = <T = string>(value: T, tier: 'USER_FACT' | 'USER_PREFERENCE' | 'AI_SUGGESTION' | 'AI_INFERRED' = 'USER_FACT'): FieldItem<T> => ({
  value,
  tier,
  isSkipped: false,
});

export const getInitialFormData = (archetype: StoryArchetype = 'illustrated_novel'): StoryInputFormData => ({
  // Universal Story Input
  coreIdea: createField(''),
  oneSentencePremise: createField(''),
  centralCharacter: createField(''),
  characterWant: createField(''),
  characterNeed: createField(''),
  obstacle: createField(''),
  stakes: createField(''),
  uniqueHook: createField(''),
  tone: createField('Satirical', 'USER_PREFERENCE'),
  endingPreference: createField('Bittersweet', 'USER_PREFERENCE'),

  // Illustrated Novel
  theme: createField(''),
  setting: createField(''),
  timePeriod: createField('Contemporary'),
  narrativePerspective: createField('Third-Person Limited', 'USER_PREFERENCE'),
  narrativeVoice: createField('Wry, observant, and incisive', 'USER_PREFERENCE'),
  desiredLength: createField('Medium (4-6 Chapters)', 'USER_PREFERENCE'),
  targetChaptersCount: createField(4, 'USER_PREFERENCE'),
  illustrationFrequency: createField('1 illustration per chapter', 'USER_PREFERENCE'),

  protagonistName: createField(''),
  protagonistAge: createField(''),
  protagonistOccupation: createField(''),
  protagonistPersonality: createField(''),
  protagonistDesire: createField(''),
  protagonistFear: createField(''),
  protagonistSecret: createField(''),
  protagonistFlaw: createField(''),
  protagonistStrength: createField(''),
  protagonistFalseBelief: createField(''),
  protagonistMoralBoundary: createField(''),
  protagonistChangeTrigger: createField(''),

  antagonisticForceType: createField('Institution', 'USER_PREFERENCE'),
  antagonisticDescription: createField(''),

  characterArcBeginning: createField(''),
  characterArcPressure: createField(''),
  characterArcChoices: createField(''),
  characterArcFailures: createField(''),
  characterArcRealization: createField(''),
  characterArcPointOfNoReturn: createField(''),
  characterArcFinalTransformation: createField(''),

  selectedDilemmas: ['Loyalty vs truth', 'Reputation vs integrity'],
  customDilemmas: [],
  subplots: [],

  // Comic
  comicGenre: createField('Workplace Satire / Gag Comic'),
  comicTargetAudience: createField('General Adult / Satire Enthusiasts'),
  comicHumorStyle: createField('Deadpan & Situational Irony'),
  comicVisualStyle: createField('Clean European Ligne Claire with expressive dynamic inks'),
  comicPagesCount: createField(4),
  comicPanelsPerPage: createField(4),
  comicVisuallyFunnyTrait: createField(''),
  comicRecurringBehavior: createField(''),
  comicGreatestWeakness: createField(''),
  comicVisualGag: createField(''),
  comicComedicEngine: ['misunderstanding', 'escalation', 'deadpan_narration'],
  comicRunningGags: [],
  comicPanelScenes: [],

  // Graphic Novel
  cinematicPremise: createField(''),
  visualHook: createField(''),
  gnProtagonistContradiction: createField(''),
  gnAntagonistPhilosophy: createField(''),
  gnAntagonistRelationship: createField(''),
  gnAntagonistRightReason: createField(''),
  act1IncitingIncident: createField(''),
  act1FirstReversal: createField(''),
  act2Escalation: createField(''),
  act2MidpointRevelation: createField(''),
  act2MajorDefeat: createField(''),
  act3FinalConfrontation: createField(''),
  act3ClimaxChoice: createField(''),
  act3Aftermath: createField(''),
  shownInsteadOfExplained: createField(''),
  recurringVisualSymbol: createField(''),
  memorableImage: createField(''),

  // Satire
  satireTarget: createField('Corporate hype cycles and algorithmic surveillance'),
  satiricalPosition: createField('Bureaucracy commodifies human vulnerability for quarterly optics'),
  degreeOfSatire: createField('Sharp & Deadpan', 'USER_PREFERENCE'),
  centralIrony: createField('The system created to eliminate human error guarantees institutional madness'),
  protagonistBeliefVsReality: createField('Believes metrics reflect objective value, while reality proves they mask panic'),
  satireEscalationStage1: createField('A harmless minor policy optimization creates redundant paperwork'),
  satireEscalationStage2: createField('Department hires external consultants who reward the error as innovation'),
  satireEscalationStage3: createField('The mistake becomes a mandatory company-wide strategic KPI'),
  satireEscalationStage4: createField('Competitors adopt the absurd practice to avoid falling behind in rankings'),
  satireEscalationStage5: createField('The original creator is promoted for solving a crisis that never existed'),

  // Dark Comedy
  uncomfortableSubject: createField(''),
  moralContradiction: createField(''),
  comicPerspective: createField(''),
  emotionalBoundarySerious: createField(''),
  emotionalBoundaryFunny: createField(''),
  emotionalBoundaryNeverCheap: createField(''),
  darkComedyTerribleChoice: createField(''),
  darkComedyWorstProblem: createField(''),

  // Mystery
  mysteryWhatHappened: createField(''),
  mysteryAppearsResponsible: createField(''),
  mysteryActuallyResponsible: createField(''),
  mysteryConcealedTruth: createField(''),
  detectiveName: createField(''),
  detectiveMotivation: createField(''),
  detectiveExpertise: createField(''),
  detectiveFlaw: createField(''),
  detectivePersonalStake: createField(''),
  detectiveSecret: createField(''),
  suspectMatrix: [],
  clueSystem: [],

  // Thriller
  thrillerThreat: createField(''),
  thrillerVictim: createField(''),
  thrillerAntagonist: createField(''),
  thrillerDeadline: createField(''),
  thrillerProtagonistUnknown: createField(''),
  thrillerAntagonistKnows: createField(''),
  thrillerResourceLacking: createField(''),
  thrillerEscalationStages: [],

  // Romance
  romanceCharacterA: {
    name: createField(''),
    want: createField(''),
    need: createField(''),
    fear: createField(''),
    wound: createField(''),
    expectation: createField(''),
  },
  romanceCharacterB: {
    name: createField(''),
    want: createField(''),
    need: createField(''),
    fear: createField(''),
    wound: createField(''),
    expectation: createField(''),
  },
  romanceAttractionReason: createField(''),
  romanceWhyShouldNotBeTogether: createField(''),

  // Fantasy
  fantasyGeography: createField(''),
  fantasyKingdoms: createField(''),
  fantasyCultures: createField(''),
  magicCapabilities: createField(''),
  magicLimits: createField(''),
  magicCost: createField(''),
  magicControllers: createField(''),
  fantasyProtagonistOrdinary: createField(''),
  fantasyQuestObjective: createField(''),
  fantasyQuestStakes: createField(''),

  // Sci-Fi
  speculativePremise: createField(''),
  scifiWhatBecomesPossible: createField(''),
  scifiWhatBecomesImpossible: createField(''),
  scifiWhoBenefits: createField(''),
  scifiWhoLoses: createField(''),
  scifiUnintendedConsequence: createField(''),
  scifiTechCapabilities: createField(''),
  scifiTechLimitations: createField(''),
  scifiTechCost: createField(''),
  scientificConsistency: createField('Moderate science', 'USER_PREFERENCE'),

  // Historical
  historicalPeriod: createField(''),
  historicalLocation: createField(''),
  historicalMajorEvents: createField(''),
  historicalSocialClass: createField(''),
  historicalOccupation: createField(''),
  historicalCharacterExperience: createField(''),
  historicalThreatToGoal: createField(''),

  // Adventure
  adventureDestination: createField(''),
  adventureObjective: createField(''),
  adventureTreasureOrObject: createField(''),
  adventureWhyItMatters: createField(''),
  adventureDanger: createField(''),
  adventureDeadline: createField(''),

  // Horror
  horrorSourceOfFear: createField(''),
  horrorKnownThreat: createField(''),
  horrorUnknownThreat: createField(''),
  horrorSetting: createField(''),
  horrorIsolationFactor: createField(''),
  horrorSacrificeDilemma: createField(''),

  // Absurdist
  absurdistNormalReality: createField(''),
  absurdistImpossibleRule: createField(''),
  absurdistRemainsOrdinary: createField(''),
  absurdistBecomesStrange: createField(''),
  absurdistAcceptedWithoutQuestion: createField(''),
  absurdistProtagonistRefusesToAccept: createField(''),

  // Literary
  literaryCentralQuestion: createField(''),
  literaryEmotionalWound: createField(''),
  literaryUnspokenDesire: createField(''),
  literaryRelationship: createField(''),
  literaryMoralConflict: createField(''),
  literarySymbol: createField(''),
  literaryTheme: createField(''),

  // Illustrated Essay
  essayCentralArgument: createField(''),
  essayQuestion: createField(''),
  essayThesis: createField(''),
  essayAudience: createField(''),
  essayEvidence: createField(''),
  essayCounterargument: createField(''),
  essayVisualMetaphors: createField(''),
  essayConclusion: createField(''),

  // Creative-Writing Manual
  manualLearningObjective: createField('Mastering Dramatic Subtext & The Unspoken Conflict'),
  manualAudience: createField('Intermediate to Advanced Authors', 'USER_PREFERENCE'),
  manualSubject: createField('Dialogue & Dramatic Tension', 'USER_PREFERENCE'),
  manualTeachingStyle: createField('Witty, analytical, workshop-driven', 'USER_PREFERENCE'),
  manualPracticalOutput: createField('A tension-calibrated scene rewriting handbook with 7 difficulty exercise labs'),

  // Monograph & Scholarly Nonfiction
  researchSubject: createField(''),
  centralThesis: createField(''),
  researchQuestion: createField(''),
  researchScope: createField(''),
  methodology: createField(''),
  methodologyType: 'Archival / Historical',
  scholarlyTone: 'Rigorous Scholarly',
  evidenceTypes: createField(''),
  counterarguments: createField(''),

  // Practical Handbook
  handbookPurpose: createField(''),
  handbookAudience: createField(''),
  handbookContentType: 'Diagnostic Decision Trees',
  handbookOrganization: 'Problem / Solution (Symptom-first)',
  handbookKeyProcedures: createField(''),
  handbookChecklists: createField(''),

  // Trivia & Fact Book
  triviaCategory: createField('Science, History & Oddities'),
  questionFormat: 'Multiple Choice',
  difficultyDistribution: 'Escalating (Novice to Master)',
  triviaFactsSample: createField(''),

  // Pop-Science
  popScienceCentralQuestion: createField(''),
  popScienceDomain: createField('Astrophysics & Thermodynamics'),
  explanationStyle: 'Visual Thought Experiments',
  audienceScienceLevel: 'Curious General Reader (No math required)',

  // Specialized Satire
  satireEngine: 'Irony & Subversion',
  satirePov: 'Deadpan Observer',

  // Specialized Horror
  dreadSource: 'Psychological & Unreliable Mind',
  dreadPacing: 'Creeping Atmospheric Slow-Burn',

  // Specialized Visual / Sequential Art
  graphicNovelPacing: 'Cinematic Widescreen (Decompressed, atmospheric)',
  artisticMediumStyle: 'Ink & Dramatic Charcoal Shadows',

  // Hybrid & Dynamic Layers
  secondaryArchetype: null,
  enabledLayers: [],
});

export const BUILT_IN_TEMPLATES: StoryTemplate[] = [
  {
    id: 'tmpl-monograph',
    name: 'Academic Monograph & Historiographical Inquiry',
    archetype: 'monograph',
    description: 'A rigorous academic research monograph exploring primary archival evidence, quantitative trade flows, and critical historical analysis.',
    createdAt: '2026-03-01',
    isBuiltIn: true,
    data: {
      ...getInitialFormData('monograph'),
      coreIdea: createField('How the transition to maritime chronometry in 18th-century cartography restructured transatlantic imperial power dynamics and trade monopolies.'),
      oneSentencePremise: createField('By analyzing 1,200 unpublished Admiralty port logs, this monograph demonstrates that navigation precision functioned as an economic weapon rather than pure scientific progress.'),
      centralThesis: createField('Chronometer precision was actively restricted by colonial admiralty boards to maintain asymmetric naval dominance across equatorial trade lanes.'),
      researchQuestion: createField('To what extent did chronological patents accelerate territorial annexation in the Indian Ocean basin between 1765 and 1815?'),
      methodology: createField('Comparative archival analysis of British, Dutch, and French maritime manifests cross-referenced with spatial GIS charting.'),
      methodologyType: 'Archival / Historical',
      scholarlyTone: 'Rigorous Scholarly',
      stakes: createField('Overturns standard linear historiography of enlightenment science and exposes the economic militarization of timekeeping.'),
      tone: createField('Rigorous & Analytical', 'USER_PREFERENCE'),
      endingPreference: createField('Scholarly Synthesis', 'USER_PREFERENCE'),
    }
  },
  {
    id: 'tmpl-handbook',
    name: 'High-Reliability Operations Handbook & Field Guide',
    archetype: 'handbook',
    description: 'A procedural standard operating guide featuring diagnostic decision trees, runbook checklists, and rapid fault remediation protocols.',
    createdAt: '2026-03-01',
    isBuiltIn: true,
    data: {
      ...getInitialFormData('handbook'),
      coreIdea: createField('A standardized operational runbook for diagnosing and mitigating power grid telemetry anomalies under high-load weather events.'),
      oneSentencePremise: createField('Step-by-step diagnostic workflows, severity-1 escalation decision trees, and fail-safe recovery checklists for substation operators.'),
      handbookPurpose: createField('Enable field technicians to isolate grid frequency imbalances in under 12 minutes without service interruption.'),
      handbookAudience: createField('Field Electrical Engineers, Substation Operators, and Emergency Response Teams'),
      handbookContentType: 'Diagnostic Decision Trees',
      handbookOrganization: 'Problem / Solution (Symptom-first)',
      handbookKeyProcedures: createField('1. Initial Frequency Delta Check\n2. Thermal Busbar Inspection\n3. Redundant Relay Trip Isolation\n4. Synchronous Condenser Ramp-up'),
      stakes: createField('Prevents multi-state cascading blackouts and irreversible transformer burnout.'),
      tone: createField('Precise & Direct', 'USER_PREFERENCE'),
      endingPreference: createField('Actionable Checklist Summary', 'USER_PREFERENCE'),
    }
  },
  {
    id: 'tmpl-trivia',
    name: 'Mind-Bending Curiosities & Science Trivia Book',
    archetype: 'trivia',
    description: 'An entertaining compendium of surprising scientific phenomena, counterintuitive historical facts, and structured Q&A quiz rounds.',
    createdAt: '2026-03-01',
    isBuiltIn: true,
    data: {
      ...getInitialFormData('trivia'),
      coreIdea: createField('500 mind-bending trivia questions exploring strange physics anomalies, cosmic coincidences, and forgotten historical blunders.'),
      oneSentencePremise: createField('An engaging, illustrated trivia journey designed for curious minds, pub quiz hosts, and weekend science buffs with rich explanatory breakdowns.'),
      triviaCategory: createField('Astrophysics, Bizarre Biology, Historical Blunders, and Inventions'),
      questionFormat: 'Multiple Choice',
      difficultyDistribution: 'Escalating (Novice to Master)',
      triviaFactsSample: createField('Did you know that a day on Venus is longer than its year, and it rains liquid lead on its highest mountain peaks?'),
      tone: createField('Witty & Playful', 'USER_PREFERENCE'),
      endingPreference: createField('Pub Quiz Championship Round', 'USER_PREFERENCE'),
    }
  },
  {
    id: 'tmpl-pop-science',
    name: 'Pop-Science Inquiry: The Arrow of Time & Entropy',
    archetype: 'pop_science',
    description: 'An accessible, thought-provoking deep dive into thermodynamics, quantum coherence, and human perception of memory.',
    createdAt: '2026-03-01',
    isBuiltIn: true,
    data: {
      ...getInitialFormData('pop_science'),
      coreIdea: createField('Why does time only move in one direction? Exploring entropy, cosmic inflation, and the molecular thermodynamics of human memory.'),
      oneSentencePremise: createField('From broken coffee cups to black hole horizons, this book takes readers on a visual thought experiment through the universe’s irreversible clock.'),
      popScienceCentralQuestion: createField('If the fundamental laws of quantum physics work equally well in reverse, why can we remember the past but never the future?'),
      popScienceDomain: createField('Theoretical Physics, Cosmology & Cognitive Neuroscience'),
      explanationStyle: 'Visual Thought Experiments',
      audienceScienceLevel: 'Curious General Reader (No math required)',
      stakes: createField('Unlocks a profound, empowering perspective on the fragility of life and the majesty of cosmic order.'),
      tone: createField('Luminous & Curious', 'USER_PREFERENCE'),
      endingPreference: createField('Cosmic Human Synthesis', 'USER_PREFERENCE'),
    }
  },
  {
    id: 'tmpl-tech-satire',
    name: 'Algorithmic Satire & Corporate Parody',
    archetype: 'satire',
    description: 'A sharp, dark, deadpan workplace satire dissecting institutional absurdity, predictive analytics, and executive panic.',
    createdAt: '2026-03-01',
    isBuiltIn: true,
    data: {
      ...getInitialFormData('satire'),
      coreIdea: createField('A compliance auditor at a mega-logistics firm discovers an AI system is optimizing employee efficiency by retroactively redefining what work means.'),
      oneSentencePremise: createField('When Arthur Crane uncovers an algorithm that deletes real shipments to maintain a 100% on-time metric, he must decide whether to expose the fraud or accept a promotion for inventing it.'),
      centralCharacter: createField('Arthur Crane, Senior Logistics Verification Officer'),
      characterWant: createField('To keep his quiet corner desk and retire with full pension without making waves.'),
      characterNeed: createField('To admit that his silent compliance makes him the primary architect of the disaster.'),
      obstacle: createField('Vice President Vance who weaponizes wellness slogans and real-time dashboard rankings to silence dissent.'),
      stakes: createField('Arthur will be scapegoated for multi-million dollar supply chain collapses while his pension is erased.'),
      uniqueHook: createField('Every corporate email and memo in the book is generated with increasing semantic drift into surreal management jargon.'),
      tone: createField('Sharp & Deadpan', 'USER_PREFERENCE'),
      endingPreference: createField('Bittersweet Irony', 'USER_PREFERENCE'),
    }
  },
  {
    id: 'tmpl-noir-mystery',
    name: 'Fogbound Harbor Detective & Suspect Matrix',
    archetype: 'mystery',
    description: 'A classic atmospheric mystery featuring a locked-harbor murder, an unreliable witness ledger, and a rigorous clue system.',
    createdAt: '2026-03-01',
    isBuiltIn: true,
    data: {
      ...getInitialFormData('mystery'),
      coreIdea: createField('The chief shipping registrar is found poisoned inside a locked lighthouse control room on the night a ghost freighter slips past customs.'),
      oneSentencePremise: createField('Disgraced maritime investigator Silas Vance must decode a ledger of coded manifestos before the incoming tide washes away the only true evidence.'),
      centralCharacter: createField('Silas Vance, Discredited Marine Insurance Investigator'),
      characterWant: createField('To find the missing manifest and secure his license reinstatement.'),
      characterNeed: createField('To confront his own complicity in the cover-up that ruined his predecessor five years ago.'),
      obstacle: createField('The Harbor Master syndicate and a corrupt port authority chief who control the telegraph wires.'),
      stakes: createField('An innocent stoker will hang for treason while the syndicate flees with sovereign debt bonds.'),
      uniqueHook: createField('The clue ledger contains contradictory meteorological logs that only make sense when cross-referenced against the ship clock.'),
      tone: createField('Atmospheric Noir', 'USER_PREFERENCE'),
      endingPreference: createField('Tragic Revelation', 'USER_PREFERENCE'),
    }
  },
  {
    id: 'tmpl-graphic-novel',
    name: 'Cinematic Graphic Novel 3-Act Arc',
    archetype: 'graphic_novel',
    description: 'High-contrast graphic storytelling framework with dynamic panel pacing, recurring visual motifs, and minimal exposition.',
    createdAt: '2026-03-01',
    isBuiltIn: true,
    data: {
      ...getInitialFormData('graphic_novel'),
      coreIdea: createField('A mute clocktower restoration engineer uncovers a hidden network of pneumatic tubes beneath the city that secretly reroutes power to an unauthorized skyward tower.'),
      oneSentencePremise: createField('In a smog-choked metropolis, a silent artisan must choose between destroying the city grid or letting a billionaire ignite the atmosphere.'),
      centralCharacter: createField('Kaelen, High-Altitude Clockwork Specialist'),
      characterWant: createField('To restore the Great Zenith Bell and honor his deceased mother’s blueprint.'),
      characterNeed: createField('To stop hiding behind silence and trigger the alarm that will shatter the regime.'),
      obstacle: createField('Director Mallory’s private automaton guard and the city’s magnetic grid curfew.'),
      stakes: createField('The lower districts will be completely deprived of oxygen when the sky-furnace ignites.'),
      uniqueHook: createField('Story is told through cinematic wide-panel spreads with color shifts signaling changes in atmospheric pressure.'),
      tone: createField('Dystopian Cinematic', 'USER_PREFERENCE'),
      endingPreference: createField('Triumphant Sacrifice', 'USER_PREFERENCE'),
    }
  },
  {
    id: 'tmpl-creative-manual',
    name: 'Creative Writing Masterclass & Exercise Lab',
    archetype: 'writing_manual',
    description: 'Pedagogical curriculum for authors with 7-tier difficulty exercises, story surgery labs, and diagnostic checklists.',
    createdAt: '2026-03-01',
    isBuiltIn: true,
    data: {
      ...getInitialFormData('writing_manual'),
      coreIdea: createField('A comprehensive craft manual on diagnosing scene stagnation, escalating character dilemmas, and eliminating predictable storytelling clichés.'),
      oneSentencePremise: createField('A hands-on, no-nonsense laboratory guide teaching writers how to engineer agonizing dramatic choices and unforgettable scenes across 7 mastery tiers.'),
      manualLearningObjective: createField('Mastering Scene Escalation, Causal Reversals, and Subtextual Dialogue'),
      manualAudience: createField('Intermediate to Advanced Authors', 'USER_PREFERENCE'),
      manualSubject: createField('Plot Architecture & Dialogue Craft', 'USER_PREFERENCE'),
      manualTeachingStyle: createField('Surgical, witty, workshop-driven', 'USER_PREFERENCE'),
      manualPracticalOutput: createField('A rigorous 6-chapter masterclass manual with progressive interactive exercises and real-world rewrite templates.'),
      tone: createField('Authoritative & Witty', 'USER_PREFERENCE'),
    }
  }
];
