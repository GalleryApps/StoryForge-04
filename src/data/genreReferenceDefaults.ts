import { 
  CharacterReferenceCard, 
  MasterArtBible, 
  ReferenceStudioState, 
  VisualReferenceCategory, 
  VisualReferenceItem 
} from '../types';

export interface GenreReferenceGuidance {
  genreKey: string;
  genreTitle: string;
  characterPriorities: string[];
  assistantTip: string;
  artStylePresets: {
    id: string;
    label: string;
    description: string;
    medium: string;
    lineQuality: string;
    texture: string;
    realism: number;
    stylization: number;
    lighting: string;
    brushCharacter: string;
    paletteSuggestions: string[];
    samplePrompt: string;
  }[];
  sampleCharacters: Partial<CharacterReferenceCard>[];
  sampleArtBible: MasterArtBible;
}

export const GENRE_REFERENCE_GUIDES: Record<string, GenreReferenceGuidance> = {
  illustrated_novel: {
    genreKey: 'illustrated_novel',
    genreTitle: 'Illustrated Novel',
    characterPriorities: [
      'Naturalistic character proportions & posture',
      'Emotional expressions & micro-reactions',
      'Clothing continuity across chapters',
      'Subtle age progression & weathering',
      'Relationship-based visual intimacy & spacing',
    ],
    assistantTip: 'For Illustrated Novels, upload high-detail character portraits with varying emotional states, costume turnarounds, and 3–5 painterly or editorial mood board references.',
    artStylePresets: [
      {
        id: 'literary_illustration',
        label: 'Literary Illustration',
        description: 'Atmospheric painterly brushwork with luminous glaze, warm undertones, and evocative mood.',
        medium: 'Oil and Gouache on Textured Paper',
        lineQuality: 'Suppressed painterly edges with soft contour lines',
        texture: 'Fine grain paper with dry brush drag',
        realism: 70,
        stylization: 30,
        lighting: 'Warm chiaroscuro with directional soft window light',
        brushCharacter: 'Visible painterly impasto accents and soft blended midtones',
        paletteSuggestions: ['#2c241d', '#8b5a2b', '#d4af37', '#e8dfd8', '#4a5568'],
        samplePrompt: 'Literary book illustration, rich gouache and oil wash, tactile paper grain, expressive emotional nuance.'
      },
      {
        id: 'editorial_painting',
        label: 'Editorial Painting',
        description: 'Sophisticated contemporary editorial illustration with refined shapes and elegant color layering.',
        medium: 'Acrylic and Digital Mixed Media',
        lineQuality: 'Clean descriptive lines with varied stroke weights',
        texture: 'Subtle linen grain and matte finish',
        realism: 65,
        stylization: 35,
        lighting: 'High dynamic range with cinematic rim lights',
        brushCharacter: 'Crisp shape boundaries with textured interior fills',
        paletteSuggestions: ['#1e293b', '#0ea5e9', '#f59e0b', '#f8fafc', '#64748b'],
        samplePrompt: 'Editorial magazine illustration, refined compositional geometry, elegant lighting and expressive silhouette.'
      },
      {
        id: 'watercolor_wash',
        label: 'Watercolor & Ink Wash',
        description: 'Fluid watercolor bleeding with delicate sepia ink linework and nostalgic translucency.',
        medium: 'Transparent Watercolor & Carbon Ink',
        lineQuality: 'Delicate fountain pen hatching and fluid ink contours',
        texture: 'Heavy cold-pressed watercolor paper with granulating pigments',
        realism: 60,
        stylization: 40,
        lighting: 'Luminous ambient daylight with soft diffused shadows',
        brushCharacter: 'Wet-on-wet watercolor washes with blooming edges',
        paletteSuggestions: ['#1e3a8a', '#93c5fd', '#fef3c7', '#d97706', '#f1f5f9'],
        samplePrompt: 'Atmospheric watercolor and sepia ink illustration, fluid translucent pigments on textured cold-press paper.'
      },
      {
        id: 'gouache_matte',
        label: 'Gouache Opaque Matte',
        description: 'Rich opaque velvety gouache with flat shapes, striking contrast, and mid-century editorial charm.',
        medium: 'Designer Gouache on Heavy Board',
        lineQuality: 'Bold clean silhouette edges with minimal interior linework',
        texture: 'Smooth matte finish with chalky pigment depth',
        realism: 55,
        stylization: 45,
        lighting: 'Graphic flat lighting with directional cast shadow blocks',
        brushCharacter: 'Flat opaque color planes with sharp geometric cuts',
        paletteSuggestions: ['#0f172a', '#e11d48', '#fbbf24', '#059669', '#fffbeb'],
        samplePrompt: 'Vintage literary gouache artwork, bold opaque color blocking, velvety matte surface.'
      },
      {
        id: 'painterly_realism',
        label: 'Painterly Realism',
        description: 'Anatomically grounded figures with expressive brush calligraphy and cinematic depth of field.',
        medium: 'Oil on Stretched Linen',
        lineQuality: 'Lost-and-found edges blending into background depth',
        texture: 'Rich canvas weave and layered oil varnishes',
        realism: 80,
        stylization: 20,
        lighting: 'Dramatic Dutch golden-hour lighting with rich shadow detail',
        brushCharacter: 'Confident bristle brush strokes and impasto highlights',
        paletteSuggestions: ['#18181b', '#78350f', '#fbbf24', '#fef08a', '#27272a'],
        samplePrompt: 'Classical painterly realism, master oil portrait technique, naturalistic anatomy and rich atmospheric depth.'
      },
      {
        id: 'graphic_illustration',
        label: 'Graphic Illustration',
        description: 'High-contrast stylized figures with bold vector-like linework and curated screen-print palettes.',
        medium: 'Digital Graphic Print',
        lineQuality: 'Razor-sharp continuous ink vectors',
        texture: 'Silkscreen halftone dot patterns and risograph grain',
        realism: 50,
        stylization: 50,
        lighting: 'Two-tone graphic lighting with graphic cell shadows',
        brushCharacter: 'Crisp vector curves with uniform density',
        paletteSuggestions: ['#020617', '#dc2626', '#3b82f6', '#f8fafc', '#94a3b8'],
        samplePrompt: 'Contemporary graphic novel cover art, clean high-contrast linework, curated risograph color layers.'
      },
      {
        id: 'mixed_media',
        label: 'Mixed Media Collage',
        description: 'Layered collage of paper textures, ink scratches, charcoal smudges, and gouache highlights.',
        medium: 'Collage & Mixed Media',
        lineQuality: 'Raw expressive charcoal and graphite scratches',
        texture: 'Torn antique paper, newsprint overlay, and rough gesso',
        realism: 60,
        stylization: 40,
        lighting: 'Fragmented experimental lighting with tactile shadows',
        brushCharacter: 'Spontaneous palette knife scrapings and ink splatters',
        paletteSuggestions: ['#3f3f46', '#a1a1aa', '#ca8a04', '#fafaf9', '#713f12'],
        samplePrompt: 'Expressive mixed media book art, charcoal drawings layered over vintage bookplate textures.'
      }
    ],
    sampleCharacters: [
      {
        name: 'Arthur Vance',
        role: 'Protagonist / Scholar',
        visualIdentifier: 'Round silver spectacles & tweed waistcoat with ink stains on cuffs',
        approximateAge: 'Late 40s',
        faceCharacteristics: 'Narrow aristocratic jaw, thoughtful brow lines, keen gray eyes',
        hair: 'Wavy dark chestnut hair greying at the temples',
        bodyProportions: 'Tall, lean, slightly stooped scholarly posture',
        clothing: 'Three-piece tweed suit, wool necktie, pocket watch chain',
        accessories: 'Silver wire-rimmed spectacles, leather notebook, brass fountain pen',
        colorAssociations: ['#1e293b', '#78350f', '#f59e0b'],
        typicalExpressions: ['Intense concentration', 'Wry skepticism', 'Melancholy remembrance'],
        typicalPoses: ['Leaning over open manuscripts', 'Adjusting spectacles thoughtfully', 'Walking with hands in coat pockets'],
        distinguishingFeatures: 'Faint ink smudge on right index finger, small scar along left cheekbone',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Oil and Gouache on Heavy Linen Paper',
      renderingTechnique: 'Painterly realism with lost-and-found edges',
      lineQuality: 'Suppressed painterly edges with delicate sepia contours',
      brushCharacter: 'Visible bristle strokes with buttery impasto highlights',
      texture: 'Subtle cold-press paper grain with dry-brush drag',
      colorTreatment: 'Warm tonal harmonies with luminous amber highlights',
      contrast: 'Medium-high chiaroscuro',
      lighting: 'Directional warm window illumination with deep ambient bounce',
      compositionRules: 'Golden ratio rule of thirds, deep focal depth, atmospheric perspective',
      realismPercent: 72,
      stylizationPercent: 28,
      facialRendering: 'Expressive anatomical nuance with sculptural bone structure',
      backgroundTreatment: 'Soft painterly suggestion with selective architectural focus',
      visualDensity: 'Balanced breathing room with focused narrative focal points',
      perspective: 'Eye-level naturalistic camera framing',
      mood: 'Introspective, literary, evocative, and dignified',
      summaryPromptProfile: 'Literary oil and gouache illustration with warm amber glazes, expressive anatomical nuance, tactile paper grain, and atmospheric depth.',
      isLocked: true
    }
  },

  comic_graphic_novel: {
    genreKey: 'comic_graphic_novel',
    genreTitle: 'Comic & Graphic Novel',
    characterPriorities: [
      'Iconic character silhouette & recognizable shapes',
      'Exaggerated facial expressions & dynamic eyelines',
      'Action pose library & weight distribution',
      'Sequential panel-to-panel costume continuity',
      'Recurring visual motifs & expressive body language',
    ],
    assistantTip: 'For Comics & Graphic Novels, upload full character turnarounds (front, 3/4, profile), emotional expression sheets, action poses, and 3–6 inked/colored sequential panel examples.',
    artStylePresets: [
      {
        id: 'modern_digital_comic',
        label: 'Modern Digital Comic',
        description: 'Crisp dynamic ink lines with vibrant digital cell shading, atmospheric gradients, and cinematic glow.',
        medium: 'Digital Inking & Screen Shading',
        lineQuality: 'Variable weight vector brush strokes with sharp taper points',
        texture: 'Smooth digital canvas with subtle screentone halftones',
        realism: 45,
        stylization: 55,
        lighting: 'High-contrast rim lighting, neon highlights, and deep inky shadows',
        brushCharacter: 'Razor-sharp black inking with gradient airbrush glows',
        paletteSuggestions: ['#09090b', '#2563eb', '#f43f5e', '#e0e7ff', '#fbbf24'],
        samplePrompt: 'Modern high-energy graphic novel illustration, crisp black inking, vibrant cell shading, dynamic lighting.'
      },
      {
        id: 'european_comic_bd',
        label: 'European Comic (Ligne Claire)',
        description: 'Clean uniform line weight (Hergé / Moebius lineage) with flat atmospheric watercolor palettes.',
        medium: 'Clear Line (Ligne Claire) Ink & Flat Watercolor',
        lineQuality: 'Strictly uniform line width with zero hatching or shading',
        texture: 'Smooth matte comic print stock with unbleached paper warmth',
        realism: 50,
        stylization: 50,
        lighting: 'Clear daylight with flat tonal shadows and precise architectural lines',
        brushCharacter: 'Meticulous fountain pen contours with flat color fillings',
        paletteSuggestions: ['#1e293b', '#38bdf8', '#fb7185', '#fef08a', '#f8fafc'],
        samplePrompt: 'Franco-Belgian ligne claire comic style, pristine uniform black ink line, flat pastel color washes, architectural precision.'
      },
      {
        id: 'retro_comic_pulp',
        label: 'Retro Vintage Pulp Comic',
        description: '1970s bronze-age comic aesthetic with Ben-Day dots, off-register color plates, and aged newsprint.',
        medium: 'Vintage Newsprint Four-Color Process',
        lineQuality: 'Brushy feathering and heavy black shadow spot blocks',
        texture: 'Visible CMYK Ben-Day dots on aged yellowed pulp paper',
        realism: 40,
        stylization: 60,
        lighting: 'Dramatic harsh spotlights and deep graphic black voids',
        brushCharacter: 'Flexible sable brush ink strokes with dry-brush hatching',
        paletteSuggestions: ['#1c1917', '#e11d48', '#2563eb', '#facc15', '#fef3c7'],
        samplePrompt: 'Vintage 1970s pulp comic art, authentic Ben-Day halftone dots, bold brush inking on aged newsprint.'
      },
      {
        id: 'editorial_cartoon',
        label: 'Editorial Cartoon & Satire',
        description: 'Expressive caricatured anatomies, witty physical exaggeration, and snappy ink cross-hatching.',
        medium: 'Dip Pen, India Ink & Watercolor Tint',
        lineQuality: 'Energetic scratching dip pen lines with thick expressive contours',
        texture: 'Bristol board surface with light watercolor cockling',
        realism: 30,
        stylization: 70,
        lighting: 'Graphic ambient wash with sharp theatrical spotlighting',
        brushCharacter: 'Fast spontaneous pen strokes with intentional energetic wobble',
        paletteSuggestions: ['#0f172a', '#b91c1c', '#0284c7', '#ca8a04', '#f1f5f9'],
        samplePrompt: 'Editorial satirical cartoon art, expressive caricature, lively India ink hatching with subtle watercolor wash.'
      },
      {
        id: 'noir_graphic_novel',
        label: 'Noir & Shadow Graphic Novel',
        description: 'Stark black-and-white ink work with high-contrast chiaroscuro, rain streaks, and Venetian blind shadows.',
        medium: 'Pure India Ink and Heavy Black Brush Blocks',
        lineQuality: 'Brutal, razor-sharp black silhouette cuts with minimal midtones',
        texture: 'Matte black ink depth on pure white paper',
        realism: 55,
        stylization: 45,
        lighting: 'Extreme high-contrast noir lighting with blinding streetlights and absolute black shadows',
        brushCharacter: 'Heavy black brush blocks and bold white gouache scratch-outs',
        paletteSuggestions: ['#000000', '#27272a', '#71717a', '#dc2626', '#ffffff'],
        samplePrompt: 'Stark noir graphic novel illustration, pure black and white inking, heavy chiaroscuro shadow masses, rain-slicked city.'
      },
      {
        id: 'painterly_comic',
        label: 'Painterly Graphic Novel',
        description: 'Fully painted cinematic comic pages with lush digital oils, dramatic color scripts, and epic scope.',
        medium: 'Digital Oil Painting & Inked Accents',
        lineQuality: 'Soft blended contours with structural ink accents',
        texture: 'Fine canvas grain and cinematic atmospheric dust',
        realism: 68,
        stylization: 32,
        lighting: 'Volumetric cinematic lighting with smoke and lens flare accents',
        brushCharacter: 'Rich layered paint glazes with textured bristle strokes',
        paletteSuggestions: ['#0f172a', '#6366f1', '#ec4899', '#f59e0b', '#f8fafc'],
        samplePrompt: 'Cinematic painted graphic novel frame, rich volumetric lighting, master oil textures, dynamic narrative depth.'
      }
    ],
    sampleCharacters: [
      {
        name: 'Zephyr "Zap" Riley',
        role: 'Protagonist / Courier',
        visualIdentifier: 'Glow-yellow goggles on forehead & patched leather flight jacket',
        approximateAge: 'Mid 20s',
        faceCharacteristics: 'Sharp triangular chin, cocky grin, electric blue eyes, bandages across nose',
        hair: 'Messy spiky windblown raven-black hair with a single neon-yellow streak',
        bodyProportions: 'Athletic, agile, exaggerated kinetic runner stance',
        clothing: 'High-collar aviator jacket over hooded runner shirt, fingerless gloves, combat boots',
        accessories: 'Custom brass goggles, holographic wrist gauntlet, messenger satchel',
        colorAssociations: ['#0f172a', '#eab308', '#0284c7'],
        typicalExpressions: ['Smirking defiance', 'Shocked panic with wide pupils', 'Fierce combat concentration'],
        typicalPoses: ['Mid-air parkour vault', 'Crouching sprint ready', 'Skidding stop on rooftops'],
        distinguishingFeatures: 'Cross-shaped scar over left ear, glowing neon streak in hair',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Digital Brush Inking & Vibrant Cell Shading',
      renderingTechnique: 'High-energy sequential comic art with dynamic focal weighting',
      lineQuality: 'Crisp tapered vector contours with variable weight inking',
      brushCharacter: 'Punchy black shadows with crisp cel-cut highlights',
      texture: 'Fine digital screentone and subtle paper tooth',
      colorTreatment: 'Vibrant punchy primaries with dramatic complementary rims',
      contrast: 'High graphic contrast with deep pure black inks',
      lighting: 'Cinematic rim highlights, neon rim accents, and hard drop shadows',
      compositionRules: 'Dynamic diagonal action lines, forced perspective, speed lines',
      realismPercent: 42,
      stylizationPercent: 58,
      facialRendering: 'Expressive comic exaggeration with iconic silhouettes',
      backgroundTreatment: 'Speed-line motion blur and detailed urban perspective grids',
      visualDensity: 'Kinetic and densely packed with visual storytelling cues',
      perspective: 'Dynamic wide-angle fish-eye and low-angle hero shots',
      mood: 'Electrifying, kinetic, punchy, and rebellious',
      summaryPromptProfile: 'Dynamic modern comic graphic novel art with razor-sharp black inking, vibrant cell-shaded lighting, kinetic speed lines, and expressive silhouettes.',
      isLocked: true
    }
  },

  mystery: {
    genreKey: 'mystery',
    genreTitle: 'Mystery & Detective Thriller',
    characterPriorities: [
      'Instant suspect identification & visual quirks',
      'Scene-specific visual clues & hidden object placement',
      'Guilty vs innocent facial micro-expressions',
      'Clothing continuity (disheveled ties, wet raincoats)',
      'Shadow-veiled eye contact & tension-laden proximity',
    ],
    assistantTip: 'For Mystery projects, upload detective character references, crime scene atmosphere mood boards, suspect lineups, and vintage noir lighting studies.',
    artStylePresets: [
      {
        id: 'classic_noir_ink',
        label: 'Classic Noir Ink',
        description: 'Deep black brushwork, smoky rooms, venetian blind cast shadows, and muted trenchcoat tones.',
        medium: 'India Ink & Sepia Wash on Heavy Board',
        lineQuality: 'Angular gritty brush strokes with heavy dry-brush scratches',
        texture: 'Aged newsprint tooth with subtle dust grain',
        realism: 65,
        stylization: 35,
        lighting: 'Harsh single-source incandescent light with long angular cast shadows',
        brushCharacter: 'Aggressive ink washes with raw bristle textures',
        paletteSuggestions: ['#0a0a0a', '#451a03', '#78350f', '#fef3c7', '#991b1b'],
        samplePrompt: 'Moody detective noir illustration, smoky office with venetian blind shadow slats, stark sepia ink lighting.'
      },
      {
        id: 'dark_editorial',
        label: 'Dark Editorial Thriller',
        description: 'Contemporary psychological thriller aesthetic with chilly color grading and forensic clarity.',
        medium: 'Digital Gouache & Charcoal',
        lineQuality: 'Precise architectural contour lines with smeared charcoal shadows',
        texture: 'Cool matte textured paper with grainy noise overlay',
        realism: 75,
        stylization: 25,
        lighting: 'Cold fluorescent and moonlight tones with razor-sharp edge definition',
        brushCharacter: 'Fine sable precision with soft graphite gradients',
        paletteSuggestions: ['#030712', '#1e293b', '#0d9488', '#f8fafc', '#dc2626'],
        samplePrompt: 'Modern psychological thriller editorial art, eerie cold blue palette, forensic clarity, high psychological tension.'
      }
    ],
    sampleCharacters: [
      {
        name: 'Detective Clara Thorne',
        role: 'Protagonist / Lead Investigator',
        visualIdentifier: 'Oversized charcoal wool trenchcoat & heavy silver pocket recorder',
        approximateAge: 'Early 30s',
        faceCharacteristics: 'Tired piercing amber eyes with dark under-eye circles, sharp cheekbones',
        hair: 'Dark auburn hair pulled back into a messy utilitarian bun',
        bodyProportions: 'Medium height, deliberate cautious movements',
        clothing: 'Charcoal trenchcoat, tailored dark vest, unbuttoned oxford shirt, sturdy brogues',
        accessories: 'Analog mini-cassette recorder, brass magnifying loupe, weathered leather casebook',
        colorAssociations: ['#18181b', '#7f1d1d', '#d97706'],
        typicalExpressions: ['Calculating suspicion', 'Sleep-deprived focus', 'Sudden deductive insight'],
        typicalPoses: ['Examining small objects under direct light', 'Smoking in rainy doorway', 'Flipping through taped case files'],
        distinguishingFeatures: 'Small scar across the bridge of her nose, faint tobacco aroma',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Sepia Ink Wash & Charcoal on Rag Board',
      renderingTechnique: 'Atmospheric noir realism with heavy shadow masses',
      lineQuality: 'Angular expressive brush strokes with crisp silhouette boundaries',
      brushCharacter: 'Dry-brush charcoal smudges and wet ink pools',
      texture: 'Textured watercolor paper with aged photographic grain',
      colorTreatment: 'Desaturated cool neutrals with solitary crimson accents',
      contrast: 'Extreme dramatic chiaroscuro',
      lighting: 'Harsh single-source desk lamps, streetlights through rain, venetian blinds',
      compositionRules: 'Oblique angles, claustrophobic framing, prominent foreground clue elements',
      realismPercent: 74,
      stylizationPercent: 26,
      facialRendering: 'Subtle psychological tension and veiled gaze',
      backgroundTreatment: 'Shadow-drenched environments with precise focal objects',
      visualDensity: 'Intense atmospheric density with tactical negative space',
      perspective: 'Low Dutch angles and voyeuristic over-the-shoulder perspectives',
      mood: 'Suspenseful, brooding, cerebral, and tense',
      summaryPromptProfile: 'Dark detective mystery art, heavy sepia and black ink washes, dramatic venetian blind shadows, forensic focus on clues, and high psychological tension.',
      isLocked: true
    }
  },

  romance: {
    genreKey: 'romance',
    genreTitle: 'Romance & Literary Drama',
    characterPriorities: [
      'Facial expressions & tender micro-emotions',
      'Body language & proximity / chemistry cues',
      'Flowing hair, fashion details, and fabric textures',
      'Flushed skin undertones & romantic eye contact',
      'Warm environmental lighting (golden hour, candlelight)',
    ],
    assistantTip: 'For Romance, upload expressive headshots with smiling/longing expressions, couple posing mood boards, lush color palettes, and soft fashion illustration references.',
    artStylePresets: [
      {
        id: 'soft_painterly_romance',
        label: 'Soft Painterly Romance',
        description: 'Luminous pastel warmth, soft focus edges, delicate skin rendering, and blooming highlights.',
        medium: 'Soft Pastel & Luminous Oil Glaze',
        lineQuality: 'Soft blended contour edges with glowing rim lights',
        texture: 'Fine silk canvas and velvety pastel tooth',
        realism: 68,
        stylization: 32,
        lighting: 'Warm golden hour sunset with gentle lens flare and soft fill',
        brushCharacter: 'Feathered blending with buttery light accents',
        paletteSuggestions: ['#fff1f2', '#f43f5e', '#be185d', '#d97706', '#312e81'],
        samplePrompt: 'Luminous romantic book illustration, soft golden hour lighting, gentle emotional chemistry, delicate pastel tones.'
      }
    ],
    sampleCharacters: [
      {
        name: 'Elena Rossi',
        role: 'Protagonist / Conservator',
        visualIdentifier: 'Gold locket on silk cord & emerald green silk scarf',
        approximateAge: 'Late 20s',
        faceCharacteristics: 'Warm olive complexion, expressive hazel eyes with long lashes, soft smile',
        hair: 'Long cascading dark brown curls pinned with a mother-of-pearl comb',
        bodyProportions: 'Graceful, expressive hand gestures',
        clothing: 'Tailored linen dress with embroidered cuffs, leather studio apron',
        accessories: 'Antique gold filigree locket, sketchpad with gold-leaf gilding tools',
        colorAssociations: ['#881337', '#047857', '#fbbf24'],
        typicalExpressions: ['Gentle amusement', 'Yearning vulnerability', 'Quiet resolve'],
        typicalPoses: ['Looking up from a gilded manuscript', 'Touching the locket pensively', 'Sheltering under an umbrella with someone'],
        distinguishingFeatures: 'Dimple on left cheek, faint freckles across nose',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Luminous Oil Glaze on Textured Velvet Paper',
      renderingTechnique: 'Soft-focus painterly beauty with glowing rim lights',
      lineQuality: 'Suppressed soft contours with delicate edge definition',
      brushCharacter: 'Silky smooth color transitions with radiant highlights',
      texture: 'Velvety paper grain with warm undertone luminescence',
      colorTreatment: 'Lush rose, warm amber, and deep twilight emeralds',
      contrast: 'Soft to medium romantic contrast',
      lighting: 'Candlelight glow, golden hour backlight, and soft diffused window glow',
      compositionRules: 'Intimate close-ups, romantic medium shots with shallow depth of field',
      realismPercent: 65,
      stylizationPercent: 35,
      facialRendering: 'High emotional nuance, luminous eye catchlights, tender expressions',
      backgroundTreatment: 'Dreamy bokeh and soft painterly environmental suggestion',
      visualDensity: 'Spacious, elegant, emotionally focused',
      perspective: 'Eye-level intimate camera framing',
      mood: 'Passionate, lyrical, warm, and emotionally captivating',
      summaryPromptProfile: 'Romantic painterly book illustration, glowing golden hour backlight, tender emotional connection, soft luminous colors, and lyrical beauty.',
      isLocked: true
    }
  },

  fantasy: {
    genreKey: 'fantasy',
    genreTitle: 'Fantasy & Mythic Epic',
    characterPriorities: [
      'Distinctive costumes, magical regalia, and armor',
      'Species / race characteristics (ears, horns, eyes, runes)',
      'Iconic weapons, relics, and enchanted props',
      'Magical aura colors & luminescence effects',
      'World-specific cultural visual identity',
    ],
    assistantTip: 'For Fantasy, upload character turnarounds with weaponry/costumes, magical creature concept art, mythical landscapes, and rich worldbuilding mood boards.',
    artStylePresets: [
      {
        id: 'epic_painterly_fantasy',
        label: 'Epic Painterly Fantasy',
        description: 'Grand master fantasy painting with sweeping vistas, magical glows, intricate armor, and mythic scale.',
        medium: 'Digital Oil & Gouache Glaze',
        lineQuality: 'Suppressed painterly edges with razor-sharp metal specular highlights',
        texture: 'Rich canvas texture with subtle metallic sheen',
        realism: 72,
        stylization: 28,
        lighting: 'Dual lighting: warm torchlight contrasted with ethereal cold magical luminescence',
        brushCharacter: 'Layered impasto strokes and sweeping atmospheric haze',
        paletteSuggestions: ['#0f172a', '#6d28d9', '#d97706', '#10b981', '#f8fafc'],
        samplePrompt: 'Epic master fantasy book illustration, ethereal magical lighting, intricate armor engravings, mythic scale and grandeur.'
      }
    ],
    sampleCharacters: [
      {
        name: 'Sylas Runebound',
        role: 'Protagonist / Spellblade',
        visualIdentifier: 'Glowing azure runes engraved along right forearm & silver-trimmed cloak',
        approximateAge: 'Early 30s',
        faceCharacteristics: 'Fierce storm-gray eyes that flare with light when channeling magic, angular jaw',
        hair: 'Silver-white hair cut short on the sides with a braided top-knot',
        bodyProportions: 'Athletic, broad-shouldered, battle-hardened stance',
        clothing: 'Mithril-reinforced leather cuirass, midnight-blue hooded cloak with runic embroidery',
        accessories: 'Engraved spellblade sword, glowing runic bracers, crystalline focus ring',
        colorAssociations: ['#0369a1', '#581c87', '#f59e0b'],
        typicalExpressions: ['Steely resolve', 'Arcane concentration', 'Grim battle fury'],
        typicalPoses: ['Channeling magic through blade', 'Surveying ruined temple from cliff', 'Standing guard in storm'],
        distinguishingFeatures: 'Intricate cyan magical runes etched permanently into skin',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Digital Oil & Mythic Gouache',
      renderingTechnique: 'High-epic painterly realism with dramatic particle lighting',
      lineQuality: 'Suppressed painterly contours with crisp metallic highlights',
      brushCharacter: 'Textured bristle strokes and luminous particle glazes',
      texture: 'Rough parchment grain with glowing magical dust accents',
      colorTreatment: 'Deep jewel tones with vibrant complementary magical highlights',
      contrast: 'High epic contrast with volumetric magical glows',
      lighting: 'Ethereal bioluminescence, torchlight, moonlight, and arcane lightning',
      compositionRules: 'Epic scale ratios, dynamic low-angle hero shots, sweeping backgrounds',
      realismPercent: 70,
      stylizationPercent: 30,
      facialRendering: 'Heroic proportions with intense expressive gaze',
      backgroundTreatment: 'Intricate fantasy architecture, floating monolithic ruins, mythic skies',
      visualDensity: 'Richly detailed with magical lore artifacts and atmospheric depth',
      perspective: 'Cinematic wide and low-angle epic framing',
      mood: 'Mythic, awe-inspiring, perilous, and wonderous',
      summaryPromptProfile: 'Epic fantasy master painting, luminous arcane glow, intricate mithril armor, towering mystical environments, and cinematic majesty.',
      isLocked: true
    }
  },

  sci_fi: {
    genreKey: 'sci_fi',
    genreTitle: 'Science Fiction & Speculative Tech',
    characterPriorities: [
      'Cybernetic augmentations, implants, and HUD visors',
      'Advanced environmental suits & techwear textiles',
      'Holographic interfaces & energy weapon design',
      'Synthetic vs biological visual contrast',
      'Futuristic habitat & starship architecture continuity',
    ],
    assistantTip: 'For Sci-Fi, upload futuristic costume sheets, cybernetic hardware references, vehicle & starship blueprints, and neon lighting palettes.',
    artStylePresets: [
      {
        id: 'cinematic_scifi',
        label: 'Cinematic Sci-Fi Realism',
        description: 'Hard-surface industrial realism, anamorphic lens flares, atmospheric smoke, and glowing holographic UI.',
        medium: 'Digital Hard-Surface Concept Art',
        lineQuality: 'Precision industrial vector edges with glowing energy trails',
        texture: 'Matte composite armor, brushed titanium, and carbon fiber weave',
        realism: 78,
        stylization: 22,
        lighting: 'Neon holographic displays, engine glow, and harsh vacuum sunlight',
        brushCharacter: 'Crisp precision geometry with ambient atmospheric haze',
        paletteSuggestions: ['#020617', '#06b6d4', '#f43f5e', '#64748b', '#ffffff'],
        samplePrompt: 'Cinematic sci-fi concept art, high-tech industrial realism, neon holographic interfaces, anamorphic lighting.'
      }
    ],
    sampleCharacters: [
      {
        name: 'Commander Kaelen Vance',
        role: 'Protagonist / Deep Space Pilot',
        visualIdentifier: 'Cybernetic amber ocular implant & pressurized pilot flight suit with telemetry badges',
        approximateAge: 'Late 30s',
        faceCharacteristics: 'Weathered handsome features, glowing amber synthetic left eye, square jaw',
        hair: 'Close-cropped military buzzcut dark hair',
        bodyProportions: 'Athletic, disciplined zero-g posture',
        clothing: 'Form-fitting pressurized flight suit with reinforced carbon fiber plates and magnetic boots',
        accessories: 'Holographic wrist interface, pilot comms headset, sidearm blaster holster',
        colorAssociations: ['#0f172a', '#0284c7', '#f59e0b'],
        typicalExpressions: ['Crisis calibration', 'Calm tactical assessment', 'Deep space fatigue'],
        typicalPoses: ['Navigating glowing holographic flight controls', 'Strapped in cockpit under g-forces', 'Inspecting damaged airlock'],
        distinguishingFeatures: 'Synthetic optical lens with illuminated digital reticle',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Digital Hard-Surface & Cinematic Matte Painting',
      renderingTechnique: 'High-precision industrial realism with volumetric atmospheric depth',
      lineQuality: 'Sharp mechanical precision edges with glowing light bleeding',
      brushCharacter: 'Clean geometric masking with realistic material shader textures',
      texture: 'Brushed metal, carbon fiber weave, and reflective glass',
      colorTreatment: 'Deep space blacks with electric cyan, amber warning, and sterile white',
      contrast: 'High technical dynamic contrast',
      lighting: 'Glowing neon holograms, cockpit HUDs, engine exhaust plumes, star flare',
      compositionRules: 'Leading perspective grid lines, cinematic 2.39:1 aspect framing',
      realismPercent: 78,
      stylizationPercent: 22,
      facialRendering: 'Grounded human anatomy with integrated cybernetic hardware',
      backgroundTreatment: 'Gigantic space megastructures, planetary rings, modular ship interiors',
      visualDensity: 'Intricate mechanical greebles and authentic telemetry overlays',
      perspective: 'Wide-angle cinematic lenses with subtle anamorphic distortion',
      mood: 'Futuristic, technological, vast, and visionary',
      summaryPromptProfile: 'Cinematic sci-fi master art, brushed titanium armor, glowing cyan holographic interfaces, vast deep space backdrop, and hard-surface precision.',
      isLocked: true
    }
  },

  historical_fiction: {
    genreKey: 'historical_fiction',
    genreTitle: 'Historical Fiction',
    characterPriorities: [
      'Accurate period tailoring, collars, buttons, and textiles',
      'Authentic historical hairstyles and grooming',
      'Period-accurate props, weapons, and tools',
      'Architecture & material authenticity (stone, wood, brass)',
      'Social class visual stratification & etiquette poses',
    ],
    assistantTip: 'For Historical Fiction, upload period costume museum plates, vintage engravings, historical architecture photographs, and authentic classical painting references.',
    artStylePresets: [
      {
        id: 'classical_oil_historical',
        label: 'Classical Master Painting',
        description: 'Museum-quality Dutch master oil style with rich craquelure, authentic period lighting, and rich velvets.',
        medium: 'Classical Oil on Linen with Amber Varnish',
        lineQuality: 'Masterful lost-and-found edges and sculptural chiaroscuro modeling',
        texture: 'Aged museum varnish with fine craquelure network',
        realism: 85,
        stylization: 15,
        lighting: 'Candlelight, open fireplace, and authentic single-window daylight',
        brushCharacter: 'Layered master glazes, scumbles, and fine detail brushes',
        paletteSuggestions: ['#1c1917', '#78350f', '#b45309', '#fef3c7', '#365314'],
        samplePrompt: 'Master classical oil painting, Rembrandt chiaroscuro lighting, authentic historical costume, museum archive quality.'
      }
    ],
    sampleCharacters: [
      {
        name: 'Lord Henry Sterling',
        role: 'Protagonist / Diplomat',
        visualIdentifier: 'High silk cravat & gold-headed walking cane with family crest',
        approximateAge: 'Early 40s',
        faceCharacteristics: 'Aristocratic profile, observant hazel eyes, neatly trimmed sideburns',
        hair: 'Dark brown hair styled in Regency waves',
        bodyProportions: 'Erect military bearing, measured formal gestures',
        clothing: 'Tailored navy wool tailcoat with brass buttons, buff breeches, polished Hessian boots',
        accessories: 'Gold-headed cane, tortoiseshell spectacles, leather-bound diplomatic pouch',
        colorAssociations: ['#172554', '#78350f', '#fef08a'],
        typicalExpressions: ['Diplomatic composure', 'Discreet calculation', 'Guarded concern'],
        typicalPoses: ['Standing beside mahogany desk', 'Reading sealed missive by candlelight', 'Walking on cobbled London street'],
        distinguishingFeatures: 'Family signet ring on right pinky finger',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Classical Oil on Prepared Linen',
      renderingTechnique: 'Master oil technique with authentic historical chiaroscuro',
      lineQuality: 'Subtle sculptural edges blended into warm underpainting',
      brushCharacter: 'Refined glazes with luminous linen and velvet textile rendering',
      texture: 'Fine canvas tooth with subtle craquelure varnish depth',
      colorTreatment: 'Rich earth pigments, vermilion accents, and warm umbers',
      contrast: 'Rich classical chiaroscuro',
      lighting: 'Candlelight glow, hearth fire, and directional single-window illumination',
      compositionRules: 'Golden ratio classical portraits and pyramidal narrative groupings',
      realismPercent: 82,
      stylizationPercent: 18,
      facialRendering: 'Anatomically exacting portraiture with dignified character depth',
      backgroundTreatment: 'Authentic period wood paneling, tapestries, stone hearths, and historical libraries',
      visualDensity: 'Meticulously researched historical artifacts and period decor',
      perspective: 'Classic eye-level painterly perspective',
      mood: 'Dignified, archival, atmospheric, and historically authentic',
      summaryPromptProfile: 'Classical historical master oil painting, authentic period attire, candlelight glow, rich museum canvas texture, and dignified storytelling.',
      isLocked: true
    }
  },

  horror: {
    genreKey: 'horror',
    genreTitle: 'Horror & Gothic Suspense',
    characterPriorities: [
      'Extreme visceral facial expressions (terror, dread, madness)',
      'Dramatic oppressive lighting & deep engulfing shadows',
      'Subtle physical transformations & uncanny distortions',
      'Atmospheric environmental decay, mist, and cobwebs',
      'Psychological visual cues & claustrophobic framing',
    ],
    assistantTip: 'For Horror & Gothic stories, upload psychological dread mood boards, shadow studies, gothic architecture sketches, and expression studies of shock/fear.',
    artStylePresets: [
      {
        id: 'gothic_dark_painterly',
        label: 'Gothic Dark Painterly',
        description: 'Eerie muted palette, unsettling textures, heavy charcoal smudges, and oppressive psychological depth.',
        medium: 'Charcoal, Ash & Dark Oil Glazes',
        lineQuality: 'Scratched, frayed, and trembling expressive line work',
        texture: 'Distressed decaying paper, water stains, and rough charcoal grit',
        realism: 65,
        stylization: 35,
        lighting: 'Dying flashlight beams, eerie moonlight, and oppressive absolute darkness',
        brushCharacter: 'Raw palette knife scraping, dripped ink, and dry smudge washes',
        paletteSuggestions: ['#000000', '#1c1917', '#450a0a', '#71717a', '#f5f5f4'],
        samplePrompt: 'Dark gothic horror illustration, unsettling psychological atmosphere, heavy charcoal grit, eerie moonlight shadows.'
      }
    ],
    sampleCharacters: [
      {
        name: 'Father Thomas Blackwood',
        role: 'Protagonist / Cleric',
        visualIdentifier: 'Tarnished iron crucifix & silver pocket lantern casting jittery shadows',
        approximateAge: 'Late 50s',
        faceCharacteristics: 'Sunken cheeks, wide haunted dark eyes, deeply creased forehead of sleeplessness',
        hair: 'Thinning silver hair disheveled by wind and rain',
        bodyProportions: 'Gaunt, tense posture with shoulders hunched against the dark',
        clothing: 'Threadbare black wool cassock soaked at the hem, heavy wool traveling coat',
        accessories: 'Heavy iron crucifix on leather strap, flickering kerosene lantern, leather scripture book',
        colorAssociations: ['#09090b', '#450a0a', '#ca8a04'],
        typicalExpressions: ['Paralyzing dread', 'Desperate prayer', 'Horrified realization'],
        typicalPoses: ['Holding lantern high into the dark', 'Back pressed against stone wall', 'Gripping iron crucifix with white knuckles'],
        distinguishingFeatures: 'Hands tremble constantly when not holding the lantern',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Charcoal, Ash, and Muted Dark Oil Wash',
      renderingTechnique: 'Gothic psychological realism with unsettling shadow voids',
      lineQuality: 'Trembling scratchy contours with dissolving edges',
      brushCharacter: 'Aggressive palette knife scrapes, ash smudges, and dripping ink',
      texture: 'Distressed moldy parchment with heavy charcoal tooth',
      colorTreatment: 'Nearly monochrome black and charcoal with sickening crimson undertones',
      contrast: 'Extreme stark contrast between piercing light and suffocating darkness',
      lighting: 'Flickering kerosene lantern, eerie moonlight through mist, pitch-black voids',
      compositionRules: 'Claustrophobic compositions, distorted low Dutch angles, encroaching shadow shapes',
      realismPercent: 66,
      stylizationPercent: 34,
      facialRendering: 'Visceral depiction of fear, madness, and psychological strain',
      backgroundTreatment: 'Decaying Victorian hallways, twisted barren trees, fog-shrouded cemeteries',
      visualDensity: 'Dense oppressive textures with sudden terrifying focal voids',
      perspective: 'Unsettling tilted camera angles and suffocating close framing',
      mood: 'Terrifying, psychological, dread-filled, and haunting',
      summaryPromptProfile: 'Haunting gothic horror illustration, flickering lantern in suffocating darkness, distressed charcoal and oil textures, psychological terror.',
      isLocked: true
    }
  },

  creative_writing_manual: {
    genreKey: 'creative_writing_manual',
    genreTitle: 'Creative-Writing Manual & Lab',
    characterPriorities: [
      'Demonstration characters representing craft archetypes',
      'Before / after visual transformation examples',
      'Diagrammatic visual teaching characters & instructors',
      'Recurring instructional mascots & author figures',
      'Clear expressive posture for body language lessons',
    ],
    assistantTip: 'For Writing Manuals, upload clear educational diagrams, instructional character sketches, clean typography mood boards, and witty editorial cartoons.',
    artStylePresets: [
      {
        id: 'modern_educational_diagram',
        label: 'Modern Educational & Diagrammatic',
        description: 'Clean graphic editorial style, crisp teaching diagrams, elegant typography callouts, and witty visual metaphors.',
        medium: 'Vector & Clean Digital Ink',
        lineQuality: 'Crisp uniform weighted lines with elegant curves',
        texture: 'Clean crisp bright book paper with subtle pastel tints',
        realism: 45,
        stylization: 55,
        lighting: 'High-clarity ambient educational lighting with flat graphic callouts',
        brushCharacter: 'Clean smooth vector curves with color-coded diagrammatic zones',
        paletteSuggestions: ['#0f172a', '#4f46e5', '#06b6d4', '#10b981', '#f8fafc'],
        samplePrompt: 'Modern educational publishing illustration, clean editorial style, clear visual metaphor for story architecture, crisp typography.'
      }
    ],
    sampleCharacters: [
      {
        name: 'The Novice Writer',
        role: 'Demonstration Archetype / Student',
        visualIdentifier: 'Messy stack of manuscript pages & yellow pencil behind ear',
        approximateAge: 'Late 20s',
        faceCharacteristics: 'Wide expressive eyes, relatable animated expressions, glasses',
        hair: 'Tousled curly brown hair',
        bodyProportions: 'Relatable, expressive comedic and thoughtful postures',
        clothing: 'Casual sweater, denim, comfortable sneakers, notebook under arm',
        accessories: 'Typewriter, pencil, stack of colored index cards for plotting',
        colorAssociations: ['#4f46e5', '#0284c7', '#f59e0b'],
        typicalExpressions: ['Stuck staring at blank page', 'Eureka breakthrough', 'Panicking at plot hole'],
        typicalPoses: ['Wrestling with giant red editing pencil', 'Connecting red yarn on plot board', 'Celebrating completed chapter'],
        distinguishingFeatures: 'Pencil tucked behind ear in all variations',
        referenceImages: [],
        locks: {
          face: true,
          hair: true,
          bodyProportions: true,
          costume: true,
          colorPalette: true,
          accessories: true,
          overallIdentity: true
        }
      }
    ],
    sampleArtBible: {
      medium: 'Vector & Digital Editorial Wash',
      renderingTechnique: 'Clean instructive editorial art with clear pedagogical metaphors',
      lineQuality: 'Crisp uniform vector contours with clear hierarchy',
      brushCharacter: 'Smooth graphic fills with clean diagrammatic callouts',
      texture: 'Bright pristine white paper with subtle tint blocks',
      colorTreatment: 'Sophisticated modern palette with functional color coding',
      contrast: 'High clarity and high legibility contrast',
      lighting: 'Bright ambient studio lighting without obscuring shadows',
      compositionRules: 'Spacious margin callouts, clean two-column grid layouts, diagrammatic flow',
      realismPercent: 45,
      stylizationPercent: 55,
      facialRendering: 'Expressive relatable emotional cartooning with clear clarity',
      backgroundTreatment: 'Minimal conceptual backdrops with storytelling chart overlays',
      visualDensity: 'Clean, airy, accessible, and structured',
      perspective: 'Isometric and direct front-facing educational angles',
      mood: 'Inspiring, witty, pedagogical, lucid, and encouraging',
      summaryPromptProfile: 'Clean editorial writing manual illustration, clever visual storytelling metaphor, crisp vectors, educational clarity, and modern charm.',
      isLocked: true
    }
  }
};

export const DEFAULT_GENRE_GUIDE = GENRE_REFERENCE_GUIDES['illustrated_novel'];

export function getGenreReferenceGuide(bookTypeOrGenre?: string): GenreReferenceGuidance {
  if (!bookTypeOrGenre) return DEFAULT_GENRE_GUIDE;
  const key = (bookTypeOrGenre || '').toLowerCase().replace(/[^a-z0-9_]/g, '_');
  
  if (key.includes('comic') || key.includes('graphic_novel')) {
    return GENRE_REFERENCE_GUIDES['comic_graphic_novel'];
  }
  if (key.includes('mystery') || key.includes('detective') || key.includes('thriller')) {
    return GENRE_REFERENCE_GUIDES['mystery'];
  }
  if (key.includes('romance') || key.includes('drama')) {
    return GENRE_REFERENCE_GUIDES['romance'];
  }
  if (key.includes('fantasy') || key.includes('myth')) {
    return GENRE_REFERENCE_GUIDES['fantasy'];
  }
  if (key.includes('sci') || key.includes('space') || key.includes('cyber')) {
    return GENRE_REFERENCE_GUIDES['sci_fi'];
  }
  if (key.includes('histor') || key.includes('period')) {
    return GENRE_REFERENCE_GUIDES['historical_fiction'];
  }
  if (key.includes('horror') || key.includes('gothic') || key.includes('creepy')) {
    return GENRE_REFERENCE_GUIDES['horror'];
  }
  if (key.includes('manual') || key.includes('work') || key.includes('lab') || key.includes('lesson')) {
    return GENRE_REFERENCE_GUIDES['creative_writing_manual'];
  }

  return GENRE_REFERENCE_GUIDES['illustrated_novel'] || DEFAULT_GENRE_GUIDE;
}

export function buildDefaultReferenceStudioState(bookType: string): ReferenceStudioState {
  const guide = getGenreReferenceGuide(bookType);
  const sampleChars: CharacterReferenceCard[] = guide.sampleCharacters.map((sc, idx) => ({
    id: `char-ref-${Date.now()}-${idx}`,
    name: sc.name || 'Protagonist',
    role: sc.role || 'Main Character',
    visualIdentifier: sc.visualIdentifier || 'Distinctive costume and expression',
    approximateAge: sc.approximateAge || '30s',
    faceCharacteristics: sc.faceCharacteristics || 'Defined facial structure',
    hair: sc.hair || 'Medium length styled hair',
    bodyProportions: sc.bodyProportions || 'Naturalistic posture',
    clothing: sc.clothing || 'Standard signature attire',
    accessories: sc.accessories || 'Signature accessories',
    colorAssociations: sc.colorAssociations || ['#1e293b', '#d97706', '#f8fafc'],
    typicalExpressions: sc.typicalExpressions || ['Thoughtful', 'Focused', 'Determined'],
    typicalPoses: sc.typicalPoses || ['Standing naturalistically', 'Engaged in story action'],
    distinguishingFeatures: sc.distinguishingFeatures || 'Unique facial or clothing detail',
    referenceImages: sc.referenceImages || [],
    locks: sc.locks || {
      face: true,
      hair: true,
      bodyProportions: true,
      costume: true,
      colorPalette: true,
      accessories: true,
      overallIdentity: true
    },
    genrePriorityFocus: guide.characterPriorities[0]
  }));

  return {
    activeGenre: guide.genreKey || 'illustrated_novel',
    references: [],
    characters: sampleChars,
    masterArtBible: guide.sampleArtBible,
    matchMyReferences: true,
    referenceInfluence: 'strong',
    characterReferenceInfluence: 'strong',
    colorReferenceInfluence: 'strong',
    referenceInfluencePercent: 85,
    characterInfluencePercent: 90,
    colorInfluencePercent: 85,
    chapterStyleOverrides: {},
    sceneOverrides: {},
    styleMixer: {
      lineworkRefId: undefined,
      colorRefId: undefined,
      characterRefId: undefined,
      backgroundRefId: undefined,
      lightingRefId: undefined,
      textureRefId: undefined,
    }
  };
}

/**
 * Strict Visual Priority Compiler
 * 1. USER-LOCKED CHARACTER REFERENCE
 * 2. USER-LOCKED ART STYLE
 * 3. GENRE ART DIRECTION
 * 4. BOOK PALETTE
 * 5. CHAPTER STYLE (Master vs Chapter Variation)
 * 6. SCENE DESCRIPTION & OVERRIDES
 * 7. AI CREATIVE INTERPRETATION
 */
export function compileVisualReferencePrompt(params: {
  scenePrompt: string;
  bookGenre?: string;
  chapterNumber?: number;
  sceneId?: string;
  charactersInScene?: string[];
  charactersPresent?: string[];
  refStudio?: ReferenceStudioState;
  referenceStudio?: ReferenceStudioState;
  bookPalette?: string[];
  masterStyle?: any;
}): string {
  const {
    scenePrompt,
    bookGenre = 'illustrated_novel',
    chapterNumber,
    sceneId,
    charactersInScene = params.charactersPresent || [],
    refStudio = params.referenceStudio,
    bookPalette = ['#1e293b', '#d97706', '#f8fafc']
  } = params;

  if (!refStudio || !refStudio.matchMyReferences) {
    return scenePrompt;
  }

  const chunks: string[] = [];

  // 1. User-Locked Character References
  if (refStudio.characters?.length && charactersInScene?.length) {
    const presentChars = refStudio.characters.filter(c => 
      charactersInScene.some(name => (c.name || '').toLowerCase().includes((name || '').toLowerCase()) || (name || '').toLowerCase().includes((c.name || '').toLowerCase()))
    );

    if (presentChars.length) {
      const charConstraints = presentChars.map(c => {
        const lockedList: string[] = [];
        if (c.locks?.overallIdentity) lockedList.push(`Identity: ${c.visualIdentifier || ''}`);
        if (c.locks?.face && c.faceCharacteristics) lockedList.push(`Face: ${c.faceCharacteristics}`);
        if (c.locks?.hair && c.hair) lockedList.push(`Hair: ${c.hair}`);
        if (c.locks?.costume && c.clothing) lockedList.push(`Attire: ${c.clothing}`);
        if (c.locks?.accessories && c.accessories) lockedList.push(`Props: ${c.accessories}`);
        if (c.locks?.bodyProportions && c.bodyProportions) lockedList.push(`Body: ${c.bodyProportions}`);
        if (c.locks?.colorPalette && c.colorAssociations?.length) lockedList.push(`Colors: ${c.colorAssociations.join(', ')}`);
        
        return `[LOCKED CHARACTER ${(c.name || '').toUpperCase()} (${c.role || 'lead'}): ${lockedList.join(' | ')}]`;
      }).join('; ');

      chunks.push(`CHARACTER CONSISTENCY MANDATE: ${charConstraints}`);
    }
  }

  // 2. User-Locked Art Style Guide
  const artBible = refStudio.masterArtBible;
  if (artBible) {
    chunks.push(`MASTER ART BIBLE: Medium=${artBible.medium}; Technique=${artBible.renderingTechnique}; Line Quality=${artBible.lineQuality}; Brushwork=${artBible.brushCharacter}; Texture=${artBible.texture}; Lighting=${artBible.lighting}; Realism=${artBible.realismPercent}% vs Stylization=${artBible.stylizationPercent}%; Mood=${artBible.mood}. [Art Profile Summary: "${artBible.summaryPromptProfile}"]`);
  }

  // 3. Genre Art Direction
  chunks.push(`GENRE ART SYSTEM (${bookGenre.toUpperCase()}): Follow genre visual hierarchy, spatial depth, and high publication craft.`);

  // 4. Book Palette
  const paletteToUse = refStudio.masterArtBible?.colorTreatment 
    ? `${bookPalette.join(', ')} with ${refStudio.masterArtBible.colorTreatment}`
    : bookPalette.join(', ');
  chunks.push(`COLOR PALETTE BINDING: ${paletteToUse}`);

  // 5. Chapter-Specific Art Direction Variation
  if (chapterNumber && refStudio.chapterStyleOverrides?.[`ch-${chapterNumber}`]) {
    const chOverride = refStudio.chapterStyleOverrides[`ch-${chapterNumber}`];
    if (chOverride.overrideMode === 'variation') {
      chunks.push(`CHAPTER ${chapterNumber} VARIATION (${chOverride.variationType.toUpperCase()}): ${chOverride.customPrompt}. Keep consistent character DNA while adapting tonal atmosphere.`);
    }
  }

  // 6. Scene-Specific Reference Override
  if (sceneId && refStudio.sceneOverrides?.[sceneId]) {
    const scOverride = refStudio.sceneOverrides[sceneId];
    chunks.push(`SCENE REFERENCE OVERRIDE: Target=${scOverride.influenceTarget.toUpperCase()}; Instructions="${scOverride.instructions}". Preserve global Master Art Style while integrating this specific cue.`);
  }

  // 7. Base Scene Description & Influence Strength
  chunks.push(`SCENE ACTION: ${scenePrompt}`);
  chunks.push(`REFERENCE INFLUENCE WEIGHT: Reference=${refStudio.referenceInfluencePercent}%, Character=${refStudio.characterInfluencePercent}%, Palette=${refStudio.colorInfluencePercent}%.`);

  return chunks.join('\n');
}
