import { BookDocument } from '../types';
import { TYPOGRAPHY_PRESETS } from '../utils/fontDetector';

export const DEFAULT_SATIRE_BOOK: BookDocument = {
  id: 'book-accountant-war-on-mondays',
  title: 'The Accountant Who Declared War on Mondays',
  subtitle: 'A Satirical Chronicle of Bureaucratic Mutiny and Underground Ledgers',
  author: 'Arthur Vance',
  volume: 1,
  genre: 'Satirical Fiction',
  bookType: 'illustrated_novel',
  metadata: {
    createdAt: '2026-08-10',
    lastModified: '2026-08-13',
    targetPages: 173,
    maxPageLimit: 500,
    synopsis: 'When senior actuary Arthur Pendleton discovers that Mondays are a statistical conspiracy designed by the Municipal Ledger Guild, he launches a covert campaign of chronological insubordination.',
  },
  cover: {
    title: 'The Accountant Who Declared War on Mondays',
    subtitle: 'A Satirical Chronicle of Bureaucratic Mutiny',
    author: 'Arthur Vance',
    editionText: 'First Illustrated Edition',
    bgColor: '#0f172a',
    textColor: '#f8fafc',
    theme: 'editorial',
    layoutStyle: 'poster',
  },
  frontMatter: {
    titlePage: true,
    copyrightPage: true,
    copyrightYear: '2026',
    publisherName: 'StoryForge Studio Press',
    isbn: '978-1-95482-019-4',
    dedication: 'For anyone who has stared at an empty coffee mug at 8:03 AM and felt the cosmos laughing.',
    epigraph: 'To balance an unjust world, one must first forge the red ink.',
    epigraphAuthor: 'The Anonymous Actuary, 1924',
    tableOfContents: true,
  },
  typography: TYPOGRAPHY_PRESETS.satirical,
  pdfSettings: {
    pageSize: '6x9',
    orientation: 'portrait',
    margins: 'normal',
    marginTopMm: 18,
    marginBottomMm: 18,
    marginLeftMm: 18,
    marginRightMm: 18,
    bleed: 'none',
    bleedMm: 0,
    pageNumbering: 'bottom_outside',
    chapterNumbering: true,
    tableOfContents: 'auto',
    includeCover: true,
    coverType: 'generated',
    filename: 'ArthurVance_The_Accountant_Who_Declared_War_on_Mondays_Volume1',
    highResImages: true,
    headerText: 'The Accountant Who Declared War on Mondays',
  },
  memoryEngine: {
    volumeId: 1,
    level1GlobalBible: {
      premise: 'Arthur Pendleton discovers Mondays are statistically rigged by the Municipal Ledger Guild, sparking an underground war of red tape and chronological sabotage.',
      writingStyleGuide: 'Deadpan satirical wit, dry British-bureaucratic irony paired with vivid cinematic flourishes. Sharp dialogue, tactile sensory weight.',
      visualStyleGuide: 'Expressive graphic novel ink with rich amber and navy duotones, moody bureaucratic lighting, and architectural precision.',
      visualStyleLocked: true,
      colorPalette: ['#0f172a', '#d97706', '#f8fafc', '#4338ca', '#94a3b8'],
      majorThemes: ['The absurdity of administrative routine', 'Quiet rebellion', 'Human connection amidst automated tedium'],
      worldRules: [
        {
          id: 'rule-1',
          category: 'society_politics',
          title: 'The Municipal Ledger Supremacy',
          description: 'Every municipal transaction must be countersigned in triplicate using iron gall ink.'
        },
        {
          id: 'rule-2',
          category: 'technology',
          title: 'The Great Chronometer',
          description: 'The city clocktower is synchronized not to astronomical solar time, but to the Guilds output quota.'
        },
        {
          id: 'rule-3',
          category: 'forbidden',
          title: 'Red Ink Prohibition',
          description: 'Carrying unauthorized red ledger ink outside the Central Treasury carries an immediate 6-month filing audit.'
        }
      ],
      characters: [
        {
          id: 'char-1',
          name: 'Arthur Pendleton',
          role: 'protagonist',
          lockedTraits: ['Wire-rimmed round spectacles', 'Frayed tweed waistcoat', 'Fingertips permanently stained with indelible black ledger ink', 'Slight nervous slouch', 'Vintage brass mechanical pencil'],
          bio: 'Senior actuary of Department 4-B. Thirty-one years of pristine attendance until discovering the missing 14 minutes in every Monday morning report.',
          personality: 'Obsessively meticulous, dryly sarcastic, unexpectedly ruthless when balance sheets are compromised.',
          voiceStyle: 'Formal, syntactically complex, deadpan understatements.',
          arcGoal: 'Erase the bureaucratic mandate of Mondays from the Central Chronometer.',
          secrets: 'He has hidden the Guilds master ledger beneath the loose parquet flooring in Office 412.',
          currentEmotionalState: 'Cautiously electrified by rebellion',
          currentInjuries: 'Minor paper cut on left thumb',
          currentPossessions: ['Forbidden red fountain pen', 'Brass key to archives', 'Pocket watch running 14 minutes fast'],
          relationships: [
            { targetName: 'Maria Vance', relation: 'Reluctant accomplice and chief archivist' },
            { targetName: 'Tomas Grimshaw', relation: 'Suspicious department overseer' }
          ]
        },
        {
          id: 'char-2',
          name: 'Maria Vance',
          role: 'supporting',
          lockedTraits: ['Short cropped dark hair', 'Thick olive utility coat with oversized pockets', 'Distinctive silver mole above right cheekbone', 'Steel-toed courier boots', 'Rolled parchment blueprints'],
          bio: 'Underground courier and chief archivist who knows every forgotten ventilation shaft in the Ministry of Records.',
          personality: 'Pragmatic, razor-sharp, fiercely protective of historical truth.',
          voiceStyle: 'Crisp, staccato, no-nonsense street vernacular.',
          arcGoal: 'Expose the Guilds fraudulent budget deficits.',
          secrets: 'Knows Tomas is secretly taking bribes from the Transit Syndicate.',
          currentEmotionalState: 'Vigilant and impatient',
          currentInjuries: 'None',
          currentPossessions: ['Master ring of brass skeleton keys', 'Leather-bound archive index'],
          relationships: [
            { targetName: 'Arthur Pendleton', relation: 'Trusted co-conspirator' }
          ]
        },
        {
          id: 'char-3',
          name: 'Tomas Grimshaw',
          role: 'antagonist',
          lockedTraits: ['Gold-toothed smirk', 'Pinstriped wool three-piece suit', 'Heavy silver signet ring with Guild seal', 'Smells faintly of expensive Turkish tobacco'],
          bio: 'Deputy Director of Compliance. Believes humanity exists solely to justify filing cabinets.',
          personality: 'Pompous, calculating, easily provoked by numerical discrepancies.',
          voiceStyle: 'Patronizing, administrative jargon, thinly veiled threats.',
          arcGoal: 'Uncover the source of the audit leaks and secure promotion to High Commissioner.',
          secrets: 'Owes the Mayor ten thousand silver credits in gambling arrears.',
          currentEmotionalState: 'Paranoid and aggressive',
          currentInjuries: 'None',
          currentPossessions: ['Confidential audit dossier', 'Gold pocket watch'],
          relationships: [
            { targetName: 'Arthur Pendleton', relation: 'Primary suspect' }
          ]
        }
      ],
      locations: [
        {
          id: 'loc-1',
          name: 'Department 4-B (Ministry of Records)',
          atmosphere: 'Endless rows of steel desks under buzzing green shaded lamps, smelling of damp paper and stale chicory coffee.',
          description: 'The basement sorting hub where municipal grievances are filed and quietly buried.',
          visualKey: 'Green desk lamps, floor-to-ceiling wooden filing drawers, dusty sunbeams.'
        },
        {
          id: 'loc-2',
          name: 'The Vault of Sub-Floor 7',
          atmosphere: 'Cavernous stone arches, dripping pipes, hundreds of thousands of chained black ledgers.',
          description: 'The classified repository where the true municipal timeline is held.',
          visualKey: 'Gothic stone vault, cast iron cage elevators, candlelight.'
        }
      ],
      timeline: [
        { id: 'time-1', chronology: 'Monday, 07:46 AM', event: 'Arthur notices the 14-minute anomaly in the Master Ledger.', charactersInvolved: ['Arthur Pendleton'] },
        { id: 'time-2', chronology: 'Monday, 11:15 AM', event: 'Maria delivers the forbidden red ink vial to Office 412.', charactersInvolved: ['Arthur Pendleton', 'Maria Vance'] },
        { id: 'time-3', chronology: 'Tuesday, 04:00 PM', event: 'Tomas initiates a surprise compliance audit on Desk 14.', charactersInvolved: ['Tomas Grimshaw', 'Arthur Pendleton'] }
      ]
    },
    level2RollingMemory: {
      chapterSummaries: [
        {
          chapterId: 'ch-1',
          chapterNumber: 1,
          title: 'The Discrepancy of 8:03 AM',
          summary: 'Arthur Pendleton identifies that every Monday morning is artificially elongated by 14 minutes in the Ministry records. He meets Maria Vance in the archival annex and secures the forbidden red ink.',
          keyConsequences: ['Arthur is now committed to the audit rebellion', 'Tomas begins monitoring Desk 14'],
          dateAdded: '2026-08-10'
        },
        {
          chapterId: 'ch-2',
          chapterNumber: 2,
          title: 'The Chemistry of Insubordination',
          summary: 'Arthur alters the municipal budget for Monday coffee supplies, triggering an unprecedented panic in the Executive Dining Room. Maria intercepts Tomas secret correspondence with the Mayor.',
          keyConsequences: ['Tomas debt is discovered', 'The Ministry security protocols are doubled'],
          dateAdded: '2026-08-11'
        }
      ],
      rollingSummaryBuffer: 'Arthur Pendleton has discovered the Municipal Ledger Guilds 14-minute Monday anomaly. Partnered with archivist Maria Vance, he has begun weaponizing red ledger ink to systematically unravel bureaucratic compliance. Tomas Grimshaw is closing in on the conspiracy while desperately hiding his own debts to the Mayor.',
      continuityFacts: [
        { id: 'fact-1', fact: 'Maria now knows that Tomas is secretly taking bribes from the Transit Syndicate.', category: 'character_knowledge', chapterOrigin: 1, active: true, timestamp: '2026-08-10' },
        { id: 'fact-2', fact: 'The master red ledger is currently hidden beneath the loose parquet flooring in Office 412.', category: 'item_location', chapterOrigin: 1, active: true, timestamp: '2026-08-10' },
        { id: 'fact-3', fact: 'Tomas Grimshaw owes the mayor ten thousand credits in gambling debt.', category: 'character_knowledge', chapterOrigin: 2, active: true, timestamp: '2026-08-11' },
        { id: 'fact-4', fact: 'The current story timeline is Thursday morning before the 10:00 AM audit committee.', category: 'timeline', chapterOrigin: 2, active: true, timestamp: '2026-08-12' }
      ]
    },
    level3ImmediateContext: {
      currentSceneFocus: 'Arthur and Maria preparing the counterfeit audit report inside the ventilation shaft above Sub-Floor 7.',
      activeUnresolvedThreads: ['Will Tomas search Office 412 before the 10:00 AM bell?', 'Can Maria duplicate the Guild Master Key before noon?'],
      immediatePrecedingSummary: 'Arthur slipped past the third-floor guard post with the red ledger concealed in his leather portfolio.'
    }
  },
  chapters: [
    {
      id: 'ch-1',
      number: 1,
      title: 'The Discrepancy of 8:03 AM',
      subtitle: 'Wherein numbers refuse to lie, but clerks continue trying.',
      summary: 'Arthur discovers the missing 14 minutes and makes contact with Maria Vance in the archival vaults.',
      unresolvedThreads: ['Who authorized the 14-minute clock skew?'],
      scenes: [
        {
          id: 'sc-1-1',
          title: 'The Actuarial Discovery',
          location: 'Department 4-B, Desk 14',
          charactersPresent: ['Arthur Pendleton'],
          timeOfDay: 'Monday, 08:03 AM',
          purpose: 'Establish the routine and the shocking mathematical anomaly.',
          pages: [
            {
              id: 'pg-1',
              pageNumber: 1,
              layout: 'illustrated_half_top',
              elements: [
                {
                  id: 'el-1-1',
                  type: 'illustration',
                  content: 'Arthur Pendleton examining the glowing discrepancy in the Master Municipal Ledger under a green desk lamp.',
                  imagePrompt: 'A meticulous actuary with round spectacles and tweed waistcoat staring intently at an open leather ledger under a glowing green banker lamp, dark moody office background, ink lines, warm amber glow, cinematic graphic novel style.',
                  imagePosition: 'half_top'
                },
                {
                  id: 'el-1-2',
                  type: 'paragraph',
                  content: 'It is a universally acknowledged truth that Monday mornings are intolerable, but until the eighth of October, no one had suspected they were also mathematically fraudulent.'
                },
                {
                  id: 'el-1-3',
                  type: 'paragraph',
                  content: 'Arthur Pendleton dipped his nib into the inkwell with the mechanical grace of a man who had executed forty thousand identical motions since the spring of ninety-four. The ledger before him was standard Municipal Grade IV: cold-pressed linen parchment, double-ruled in faint Prussian blue, smelling faintly of cellar damp and bureaucratic despair.'
                },
                {
                  id: 'el-1-4',
                  type: 'dialogue',
                  speaker: 'Arthur',
                  content: 'Fourteen minutes. It isn’t an error in the sum; it’s an error in the universe.'
                }
              ]
            },
            {
              id: 'pg-2',
              pageNumber: 2,
              layout: 'prose',
              elements: [
                {
                  id: 'el-2-1',
                  type: 'paragraph',
                  content: 'According to the official Ministry Chronometer mounted above the double doors of Department 4-B, the time was precisely eight-oh-three. Yet according to Arthur’s Swiss pocket regulator—an heirloom that had never surrendered a single second to municipal whim—the time was eight-seventeen.'
                },
                {
                  id: 'el-2-2',
                  type: 'paragraph',
                  content: 'He recalculated the column. He cross-referenced the steam-gauge logs from the municipal boiler room. He checked the intake logs for the streetcars on Route Seven. In every single dataset, fourteen minutes had vanished into the ether between the third stroke of seven and the first stroke of eight.'
                },
                {
                  id: 'el-2-3',
                  type: 'quote',
                  content: 'A missing penny is an oversight. A missing quarter of an hour across eight hundred thousand citizens is an empire.'
                },
                {
                  id: 'el-2-4',
                  type: 'paragraph',
                  content: 'A soft tap sounded against the frosted glass of his cubicle divider. It was not the crisp, aggressive knuckle-rap of Tomas Grimshaw, but the two-and-one cadence of the courier circuit.'
                }
              ]
            }
          ]
        },
        {
          id: 'sc-1-2',
          title: 'The Courier in the Vaults',
          location: 'Archival Annex Sub-Floor 2',
          charactersPresent: ['Arthur Pendleton', 'Maria Vance'],
          timeOfDay: 'Monday, 11:30 AM',
          purpose: 'Form the alliance and introduce the forbidden red ink.',
          pages: [
            {
              id: 'pg-3',
              pageNumber: 3,
              layout: 'illustrated_half_bottom',
              elements: [
                {
                  id: 'el-3-1',
                  type: 'paragraph',
                  content: 'Maria Vance did not look like an archivist; she looked like someone who had survived several collapsed coal mines and retained a grievance against gravity. Her olive coat was heavy with unseen tools, and her steel-toed boots clicked with alarming authority against the marble flags.'
                },
                {
                  id: 'el-3-2',
                  type: 'dialogue',
                  speaker: 'Maria',
                  content: 'You’re thirty minutes late with the Sub-Floor requisition, Pendleton. Grimshaw is already pacing the third floor like a hungry ferret.'
                },
                {
                  id: 'el-3-3',
                  type: 'dialogue',
                  speaker: 'Arthur',
                  content: 'I’m not late, Miss Vance. The clock is lying to you.'
                },
                {
                  id: 'el-3-4',
                  type: 'illustration',
                  content: 'Maria Vance leaning over the counter of the dim archive vault, sliding a heavy brass key toward Arthur.',
                  imagePrompt: 'Short-haired woman in olive utility jacket and boots leaning over a wooden counter in a cavernous stone archive vault, sliding a brass key, cinematic lighting, ink hatching, amber and navy palette.',
                  imagePosition: 'half_bottom'
                }
              ]
            },
            {
              id: 'pg-4',
              pageNumber: 4,
              layout: 'prose',
              elements: [
                {
                  id: 'el-4-1',
                  type: 'paragraph',
                  content: 'Maria stopped. The silver mole above her cheekbone caught the dim halogen light. She pulled a small, heavy velvet pouch from her oversized coat pocket and laid it silently upon the blotting paper between them.'
                },
                {
                  id: 'el-4-2',
                  type: 'paragraph',
                  content: 'Inside was a glass flacon filled with scarlet liquid so vivid it seemed to hum against the desk.'
                },
                {
                  id: 'el-4-3',
                  type: 'dialogue',
                  speaker: 'Maria',
                  content: 'You finally saw it, didn’t you? The fourteen minutes.'
                },
                {
                  id: 'el-4-4',
                  type: 'paragraph',
                  content: 'Arthur looked from the forbidden ink to the archivist’s unflinching gaze. For the first time in thirty-one years of municipal employment, he did not reach for his eraser.'
                },
                {
                  id: 'el-4-5',
                  type: 'scene_break',
                  content: '* * *'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ch-2',
      number: 2,
      title: 'The Chemistry of Insubordination',
      subtitle: 'In which red ink proves more explosive than black powder.',
      summary: 'Arthur alters the municipal budget for coffee supplies and discovers Tomas debts.',
      unresolvedThreads: ['Tomas discovery of the ledger disparity'],
      scenes: [
        {
          id: 'sc-2-1',
          title: 'The Audit of Desk 14',
          location: 'Office 412',
          charactersPresent: ['Arthur Pendleton', 'Tomas Grimshaw'],
          timeOfDay: 'Tuesday, 04:15 PM',
          purpose: 'Tension between Arthur and Tomas; the hidden ledger is almost found.',
          pages: [
            {
              id: 'pg-5',
              pageNumber: 5,
              layout: 'illustrated_floating_left',
              elements: [
                {
                  id: 'el-5-1',
                  type: 'illustration',
                  content: 'Tomas Grimshaw in a pinstriped suit standing over Arthur Pendleton at Desk 14 with a sinister smile.',
                  imagePrompt: 'Pompous deputy director in pinstripe three-piece suit and gold signet ring leaning menacingly over a nervous actuary at a wooden desk in a bureaucratic office, smoky atmosphere, graphic novel illustration.',
                  imagePosition: 'float_left'
                },
                {
                  id: 'el-5-2',
                  type: 'paragraph',
                  content: 'Tomas Grimshaw walked with the heavy, deliberate cadence of a man whose boots were paid for by an expense account. He stood over Arthur’s desk, the gold signet ring on his pinky catching the pale afternoon sun.'
                },
                {
                  id: 'el-5-3',
                  type: 'dialogue',
                  speaker: 'Tomas',
                  content: 'A remarkable balance sheet this quarter, Arthur. Almost too symmetrical. One might think you were composing poetry rather than tabulating municipal cesspool maintenance.'
                },
                {
                  id: 'el-5-4',
                  type: 'dialogue',
                  speaker: 'Arthur',
                  content: 'Cesspools are inherently symmetrical, Deputy Director. Input inevitably matches output, barring structural catastrophe.'
                }
              ]
            },
            {
              id: 'pg-6',
              pageNumber: 6,
              layout: 'prose',
              elements: [
                {
                  id: 'el-6-1',
                  type: 'paragraph',
                  content: 'Grimshaw’s smile did not reach his eyes. His gaze drifted downward toward the floorboards beneath Arthur’s left heel—the exact spot where four hundred pages of contraband ledger lay wrapped in oilcloth.'
                },
                {
                  id: 'el-6-2',
                  type: 'paragraph',
                  content: 'For four excruciating seconds, neither man breathed. The distant clatter of typewriters in Department 4-A filled the vacuum like hail on tin.'
                },
                {
                  id: 'el-6-3',
                  type: 'dialogue',
                  speaker: 'Tomas',
                  content: 'The Mayor is taking a personal interest in tomorrow’s ten o’clock audit. Ensure everything is in its proper drawer, Pendleton. We would hate for an actuary of your seniority to misplace his pension.'
                },
                {
                  id: 'el-6-4',
                  type: 'paragraph',
                  content: 'When Grimshaw turned and walked away, the scent of Turkish tobacco lingered like a verdict. Arthur reached into his coat and felt the cold glass of the red ink bottle.'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  endMatter: {
    aboutAuthor: 'Arthur Vance is a former financial compliance officer and satirical novelist based in Edinburgh. When not unravelling municipal ledgers, he repairs vintage Swiss chronometers and argues with automated telephone menus.',
    acknowledgments: 'The author wishes to thank the Society of Dissident Bookkeepers, the anonymous archivists of the Scottish Record Office, and caffeine in all its divine permutations.',
    afterword: 'Volume II of the Pendleton Chronicles, "The Actuary Who Liquidated Tuesday", is forthcoming from StoryForge Publishing.',
    volume2Preview: 'From Chapter 1 of Volume II: "Tuesdays had always claimed to be blameless, but Arthur knew that innocence was merely an unexamined balance sheet."'
  }
};
