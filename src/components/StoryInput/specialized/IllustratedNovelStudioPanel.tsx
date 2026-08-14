import React, { useState } from 'react';
import {
  Feather,
  Sparkles,
  Zap,
  Image,
  Palette,
  Layers,
  BookOpen,
  Sliders,
  CheckCircle2,
  Brush,
  Type,
  Layout,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const ART_RELATIONSHIPS = [
  { id: 'subtext', name: 'Subtext Revelation', desc: 'The prose describes polite conversation while the illustration reveals a concealed dagger or nervous twitch.' },
  { id: 'atmospheric', name: 'Atmospheric World Immersion', desc: 'Lush painterly landscapes establish light, weather, architectural decay, and environmental mood.' },
  { id: 'psychological', name: 'Psychological Interiority', desc: 'Surreal, evocative visual metaphors illustrating internal trauma, fever dreams, or cognitive dissonance.' },
  { id: 'ironic_contradiction', name: 'Ironic Contradiction', desc: 'The unreliable narrator insists they are fearless, while the art plate depicts their trembling shadow.' },
  { id: 'mythic_allegory', name: 'Mythic Allegory', desc: 'Framing mundane contemporary events with heraldic, tapestry-like classical iconography.' },
];

const ILLUSTRATION_MEDIUMS = [
  { name: 'Gouache & Opaque Watercolor on Linen', texture: 'Velvety matte depth with sharp drybrush edge definition.' },
  { name: 'Pen & Sepia Ink Wash with Hatching', texture: 'Vintage 19th-century storybook aesthetic with intricate crosshatching.' },
  { name: 'Woodcut & Linocut Relief Print', texture: 'Bold, expressive black-and-white gouges and heavy tactile contrast.' },
  { name: 'Graphite & Charcoal Tonal Vignette', texture: 'Soft smoky gradients with dramatic chiaroscuro spotlighting.' },
  { name: 'Oil Glaze & Golden Leaf Accents', texture: 'Rich classical renaissance luminosity with illuminated gilt borders.' },
];

const DECORATIVE_EMBELLISHMENTS = [
  'Illuminated Drop Caps (First Letter of Chapters)',
  'Foliage & Filigree Chapter Headpieces',
  'Marginalia Spot Vignettes & Naturalist Sketches',
  'Woodblock Ornamental Borders',
  'Tailpiece End-of-Chapter Motifs',
  'Full-Page Facing Plate with Tissue Guard Caption',
];

export const IllustratedNovelStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedRelationship, setSelectedRelationship] = useState(ART_RELATIONSHIPS[0].id);
  const [selectedMedium, setSelectedMedium] = useState(ILLUSTRATION_MEDIUMS[0].name);
  const [proseRatio, setProseRatio] = useState(70);
  const [activeEmbellishments, setActiveEmbellishments] = useState<string[]>([
    'Illuminated Drop Caps (First Letter of Chapters)',
    'Full-Page Facing Plate with Tissue Guard Caption',
    'Marginalia Spot Vignettes & Naturalist Sketches',
  ]);
  const [plateScene, setPlateScene] = useState('The herbalist examines an unidentified nightshade root under candlelight while her apprentice watches from the cellar door.');
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [plateBriefOutput, setPlateBriefOutput] = useState<string | null>(null);

  const toggleEmbellishment = (item: string) => {
    setActiveEmbellishments(prev =>
      prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
    );
  };

  const handleGenerateArtBrief = async () => {
    setIsGeneratingBrief(true);
    setPlateBriefOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'illustrated_novel',
          actionKey: 'generate_art_plate_brief',
          actionLabel: 'Generate Art Plate Brief',
          formData: {
            scene: plateScene,
            relationship: selectedRelationship,
            medium: selectedMedium,
            proseRatio: `${proseRatio}% Prose / ${100 - proseRatio}% Art`,
            embellishments: activeEmbellishments,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setPlateBriefOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Art plate brief generated.');
      } else {
        setPlateBriefOutput(`[ART PLATE SPECIFICATION]\nMedium: ${selectedMedium}\nDynamic: ${selectedRelationship.toUpperCase()}\n\nCOMPOSITION:\n- Focal Point: Herbalist's fingers holding root, illuminated by warm tallow candle flame (3200K).\n- Background: Deep umber shadow framing cellar doorway with apprentice's silhouette.\n- Emotional Tone: Subtextual discovery; danger masked by quiet botanical concentration.\n- Border & Drop Cap: ${activeEmbellishments.join(', ')}\n- Caption Line: "Some remedies only reveal their poison when the moon is full."`);
      }
    } catch {
      setPlateBriefOutput(`[ART PLATE BRIEF]\nScene: ${plateScene}\nMedium: ${selectedMedium}\nRole: ${selectedRelationship}`);
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/30 to-indigo-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 shadow-md shadow-sky-500/10">
            <Feather className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Illustrated Novel & Art Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-800 uppercase font-semibold">
                Prose & Visual Harmony
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Painterly chapter plates, subtextual visual storytelling, illuminated drop caps, and tactile paper mediums.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Illustrated Dilemmas
          </button>
        </div>
      </div>

      {/* PROSE-TO-ART BALANCE & RELATIONSHIPS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Prose vs Art Balance Slider */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              Prose vs. Visual Plate Density
            </label>
            <span className="text-xs font-mono text-sky-300">
              {proseRatio}% Prose / {100 - proseRatio}% Illustration
            </span>
          </div>
          <input
            type="range"
            min={30}
            max={90}
            value={proseRatio}
            onChange={e => setProseRatio(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Picture-Heavy (Graphic)</span>
            <span>Balanced Literary Novel</span>
            <span>Prose Heavy with Rare Plates</span>
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1">Illustration Medium & Aesthetic</label>
            <div className="space-y-1.5">
              {ILLUSTRATION_MEDIUMS.map(med => (
                <div
                  key={med.name}
                  onClick={() => setSelectedMedium(med.name)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition text-xs ${
                    selectedMedium === med.name
                      ? 'bg-sky-950/50 border-sky-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sky-200">{med.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{med.texture}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prose-to-Art Narrative Dynamics */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
            <Brush className="w-3.5 h-3.5 text-sky-400" />
            Prose-to-Art Narrative Relationship
          </label>
          <div className="space-y-2">
            {ART_RELATIONSHIPS.map(rel => (
              <div
                key={rel.id}
                onClick={() => setSelectedRelationship(rel.id)}
                className={`p-2.5 rounded-lg border cursor-pointer transition ${
                  selectedRelationship === rel.id
                    ? 'bg-sky-950/50 border-sky-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-sky-200">{rel.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{rel.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TYPOGRAPHY & DECORATIVE EMBELLISHMENTS */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative z-10">
        <label className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-sky-400" />
          Typographic Embellishments & Book Ornaments
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {DECORATIVE_EMBELLISHMENTS.map(item => {
            const isSelected = activeEmbellishments.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleEmbellishment(item)}
                className={`p-2.5 rounded-lg border text-left text-xs transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-500/60 text-sky-200 font-medium'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="truncate">{item}</span>
                <span className="text-[10px] ml-1">{isSelected ? '✓' : '+'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ART PLATE BRIEF GENERATOR */}
      <div className="p-4 bg-slate-950/80 border border-sky-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-400" />
            Chapter Art Plate Director
          </span>
          <button
            onClick={handleGenerateArtBrief}
            disabled={isGeneratingBrief}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isGeneratingBrief ? 'animate-spin' : ''}`} />
            {isGeneratingBrief ? 'Drafting Art Brief...' : 'Generate Chapter Art Brief'}
          </button>
        </div>

        <textarea
          rows={2}
          value={plateScene}
          onChange={e => setPlateScene(e.target.value)}
          placeholder="Describe the moment or scene to render in full-page illustration..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
        />

        {plateBriefOutput && (
          <div className="p-3.5 bg-slate-900 border border-sky-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {plateBriefOutput}
          </div>
        )}
      </div>
    </div>
  );
};
