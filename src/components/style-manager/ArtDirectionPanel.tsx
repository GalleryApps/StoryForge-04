import React from 'react';
import { Brush, Check, Sliders, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import {
  AdultAestheticType,
  ArtDirectionSettings,
  ArtMediumType,
  LineQualityType,
  RenderingStyleType,
  StyleApplicationScope,
  TextureType
} from '../../types';

interface ArtDirectionPanelProps {
  selectedScope: StyleApplicationScope;
}

export const ArtDirectionPanel: React.FC<ArtDirectionPanelProps> = ({ selectedScope }) => {
  const { masterStyle, updateMasterStyle } = useStory();
  const art = masterStyle?.artDirection || {
    medium: 'oil_painting',
    lineQuality: 'painterly',
    texture: 'canvas',
    rendering: 'painterly',
    renderingStyle: 'painterly_realism',
    intensitySliders: { realismVsStylization: 30, minimalVsDetailed: 75, cleanVsRough: 35, subtleVsExaggerated: 25 },
    adultStoryMode: true,
    adultAesthetic: 'literary_illustration',
    mediumIntensity: 80,
    detailLevel: 75,
    textureStrength: 50,
    lightingDrama: 65
  };

  const updateArt = (patch: Partial<ArtDirectionSettings>) => {
    updateMasterStyle(prev => {
      const prevArt = prev.artDirection || art;
      return {
        ...prev,
        artDirection: {
          ...prevArt,
          ...patch
        }
      };
    });
  };

  const mediums: { id: ArtMediumType; label: string }[] = [
    { id: 'oil_painting', label: 'Oil Painting' },
    { id: 'watercolor', label: 'Watercolor Wash' },
    { id: 'gouache', label: 'Matte Gouache' },
    { id: 'acrylic', label: 'Vibrant Acrylic' },
    { id: 'colored_pencil', label: 'Colored Pencil' },
    { id: 'ink_wash', label: 'Ink & Wash' },
    { id: 'charcoal', label: 'Smoky Charcoal' },
    { id: 'pastel', label: 'Soft Chalk Pastel' },
    { id: 'digital_painting', label: 'Digital Concept Painting' },
    { id: 'vector_art', label: 'Crisp Vector Art' },
    { id: 'editorial_illustration', label: 'Editorial Spot Illustration' },
    { id: 'comic_book', label: 'Classic Comic Book Inking' },
    { id: 'graphic_novel_noir', label: 'Graphic Novel Noir' },
    { id: 'collage', label: 'Collage & Ephemera' },
    { id: 'mixed_media', label: 'Mixed Media Textures' },
  ];

  const lineQualities: { id: LineQualityType; label: string }[] = [
    { id: 'clean_precise', label: 'Clean & Precise Line' },
    { id: 'loose_expressive', label: 'Loose & Expressive Gesture' },
    { id: 'heavy_ink', label: 'Heavy Dynamic Brush Ink' },
    { id: 'sketchy_pencil', label: 'Textured Pencil Sketch' },
    { id: 'woodcut_crosshatch', label: 'Woodcut & Engraving Crosshatch' },
    { id: 'linocut', label: 'Bold Linocut Relief' },
    { id: 'none', label: 'No Outlines (Painterly Edges)' },
  ];

  const textures: { id: TextureType; label: string }[] = [
    { id: 'rough_canvas', label: 'Heavy Linen Canvas' },
    { id: 'smooth_vellum', label: 'Smooth Wove Vellum' },
    { id: 'handmade_paper', label: 'Handmade Deckle Paper' },
    { id: 'heavy_grain', label: 'Film & Grain Texture' },
    { id: 'halftone_dot', label: 'Vintage Halftone Screentone' },
    { id: 'distressed_vintage', label: 'Distressed Vintage Patina' },
    { id: 'clean_digital', label: 'Clean Digital Flat' },
  ];

  const renderings: { id: RenderingStyleType; label: string }[] = [
    { id: 'flat_graphic', label: 'Flat Graphic Silhouette' },
    { id: 'painterly_realism', label: 'Painterly Realism' },
    { id: 'hyper_detailed', label: 'Intricate Hyper-Detail' },
    { id: 'stylized_semi_real', label: 'Stylized Semi-Realism' },
    { id: 'atmospheric_sfumato', label: 'Atmospheric Sfumato Haze' },
    { id: 'minimal_line', label: 'Minimalist Contour Line' },
  ];

  const matureAesthetics: { id: AdultAestheticType; label: string; desc: string }[] = [
    { id: 'noir_cynicism', label: 'Noir Cynicism', desc: 'Stark shadows, rain-slicked pavement, hard-boiled realism' },
    { id: 'satirical_caricature', label: 'Satirical Wit', desc: 'Sharp observational exaggeration, witty caricature' },
    { id: 'european_bd', label: 'European BD / Ligne Claire', desc: 'Elegant Belgian/French album lines with architectural precision' },
    { id: 'psychological_surrealism', label: 'Psychological Surrealism', desc: 'Symbolic dreamscapes, disorienting perspectives, subtext' },
    { id: 'gritty_realism', label: 'Gritty Documentary Realism', desc: 'Tactile weathered textures, unvarnished human truth' },
    { id: 'gothic_romanticism', label: 'Gothic Romanticism', desc: 'Sublime decay, mist-shrouded ruins, romantic grandeur' },
    { id: 'minimalist_avant_garde', label: 'Minimalist Avant-Garde', desc: 'Bold negative space, conceptual restraint' },
    { id: 'dystopian_cyberpunk', label: 'Dystopian Speculative', desc: 'Neon reflections, rusted infrastructure, urban density' },
    { id: 'historical_lithograph', label: '19th-Century Lithograph', desc: 'Vintage botanical engraving, archival print tone' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Brush className="w-4 h-4 text-indigo-600" />
            Illustration Medium, Texture & Art Direction
          </h2>
          <p className="text-xs text-slate-500">
            Enforce a singular artistic medium, line weight, paper texture, and mature narrative tone across all generated illustrations.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 text-emerald-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>No Children Book Fallbacks</span>
        </div>
      </div>

      {/* Adult Story Mode & Mature Aesthetic */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Adult Story Mode & Sophisticated Aesthetics
            </h3>
            <p className="text-[11px] text-slate-500">
              Guarantees mature, nuanced, non-juvenile visual treatments tailored for adult readers.
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
            <input
              type="checkbox"
              checked={art.adultStoryMode}
              onChange={e => updateArt({ adultStoryMode: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs font-bold text-indigo-700">Adult Story Mode</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {matureAesthetics.map(a => {
            const isSelected = art.adultAesthetic === a.id;
            return (
              <button
                key={a.id}
                onClick={() => updateArt({ adultAesthetic: a.id })}
                className={`text-left p-3 rounded-lg border transition ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{a.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{a.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Medium & Line Quality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medium Selection */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Artistic Medium
          </h3>
          <select
            value={art.medium}
            onChange={e => updateArt({ medium: e.target.value as ArtMediumType })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {mediums.map(m => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>

          <div className="pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Medium Intensity: {art.mediumIntensity ?? 80}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={art.mediumIntensity ?? 80}
              onChange={e => updateArt({ mediumIntensity: parseInt(e.target.value) || 80 })}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Line Quality */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Line Quality & Stroke
          </h3>
          <select
            value={art.lineQuality || 'clean_precise'}
            onChange={e => updateArt({ lineQuality: e.target.value as LineQualityType })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {lineQualities.map(l => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>

          <div className="pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Detail Density: {art.detailLevel ?? 75}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={art.detailLevel ?? 75}
              onChange={e => updateArt({ detailLevel: parseInt(e.target.value) || 75 })}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Textures & Rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Texture */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Paper & Canvas Surface Texture
          </h3>
          <select
            value={art.texture || 'smooth_vellum'}
            onChange={e => updateArt({ texture: e.target.value as TextureType })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {textures.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          <div className="pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Texture Roughness: {art.textureStrength ?? 50}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={art.textureStrength ?? 50}
              onChange={e => updateArt({ textureStrength: parseInt(e.target.value) || 0 })}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Rendering Style */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Rendering Technique
          </h3>
          <select
            value={art.renderingStyle || 'painterly_realism'}
            onChange={e => updateArt({ renderingStyle: e.target.value as RenderingStyleType })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {renderings.map(r => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>

          <div className="pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Lighting Drama: {art.lightingDrama ?? 65}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={art.lightingDrama ?? 65}
              onChange={e => updateArt({ lightingDrama: parseInt(e.target.value) || 0 })}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
