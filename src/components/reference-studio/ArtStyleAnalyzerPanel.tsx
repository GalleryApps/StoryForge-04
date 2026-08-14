import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Lock, 
  Unlock, 
  Palette, 
  Layers, 
  Sliders, 
  Check, 
  Brush, 
  Compass, 
  Sun, 
  Eye,
  FileText,
  RefreshCw,
  Upload,
  Trash2,
  Plus,
  Image as ImageIcon,
  HelpCircle,
  Tag
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { MasterArtBible, VisualReferenceItem, ReferenceRole } from '../../types';

export const ArtStyleAnalyzerPanel: React.FC = () => {
  const { 
    referenceStudio, 
    updateMasterArtBible, 
    analyzeArtStyleGuideAi,
    updateReferenceStudio,
    uploadReferenceImages,
    deleteReferenceItem,
    updateReferenceItem,
    isAiGenerating 
  } = useStory();

  const [previewItem, setPreviewItem] = useState<VisualReferenceItem | null>(null);
  const [activeSlotTarget, setActiveSlotTarget] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bible = referenceStudio?.masterArtBible || {} as MasterArtBible;
  const isLocked = bible.isLocked;

  // Filter references belonging to art_style (cap at 3 style guide references)
  const styleReferences = (referenceStudio?.references || []).filter(r => r.category === 'art_style');

  const handleBibleField = (field: keyof MasterArtBible, val: any) => {
    updateMasterArtBible({ [field]: val });
  };

  const handleColorChange = (index: number, newColor: string) => {
    const updated = [...(referenceStudio?.extractedPalette || ['#1e293b', '#475569', '#d97706', '#0284c7', '#f8fafc'])];
    updated[index] = newColor;
    updateReferenceStudio(prev => ({
      ...prev,
      extractedPalette: updated,
    }));
  };

  const handleAddPaletteColor = () => {
    updateReferenceStudio(prev => ({
      ...prev,
      extractedPalette: [...(prev.extractedPalette || []), '#d97706'],
    }));
  };

  const triggerUploadForSlot = (slotIndex: number) => {
    setActiveSlotTarget(slotIndex);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleSlotFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const filesToProcess = Array.from(fileList).slice(0, 3 - styleReferences.length);
    const filePromises = filesToProcess.map(file => {
      return new Promise<{ name: string; dataUrl: string; type?: string }>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            dataUrl: reader.result as string,
            type: file.type,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then(files => {
      const slotRole: ReferenceRole = 
        activeSlotTarget === 0 ? 'primary_style' :
        activeSlotTarget === 1 ? 'lighting_mood' : 'linework';
      uploadReferenceImages('art_style', files, slotRole, 'primary');
    });
  };

  const slotDefinitions = [
    {
      slotNum: 1,
      title: 'Primary Art Style Anchor',
      subtitle: 'Defines master medium, texture, and rendering finish',
      defaultRole: 'primary_style' as ReferenceRole,
    },
    {
      slotNum: 2,
      title: 'Atmosphere & Lighting Anchor',
      subtitle: 'Defines ambient lighting, mood, and depth treatment',
      defaultRole: 'lighting_mood' as ReferenceRole,
    },
    {
      slotNum: 3,
      title: 'Linework & Palette Anchor',
      subtitle: 'Defines line weight, brush strokes, and color textures',
      defaultRole: 'linework' as ReferenceRole,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleSlotFiles(e.target.files)}
        className="hidden"
      />

      {/* Top Overview & Master Prompt Banner */}
      <div className="p-5 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 rounded-2xl border border-amber-500/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Brush className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-100">Master Art Direction Profile</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  isLocked ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {isLocked ? 'Locked System' : 'Draft / Unlocked'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {styleReferences.length}/3 Style References
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Upload up to 3 style reference anchors below. The AI extracts a 16-point artistic DNA to enforce unified rendering, line weight, and color across all book chapters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateMasterArtBible({ isLocked: !isLocked })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isLocked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-600'
              }`}
            >
              {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              <span>{isLocked ? 'Art Style Locked' : 'Lock Art Style'}</span>
            </button>

            <button
              onClick={() => analyzeArtStyleGuideAi()}
              disabled={isAiGenerating || styleReferences.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs transition-colors shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAiGenerating ? 'Analyzing Style DNA...' : 'Extract 16-Criteria DNA'}</span>
            </button>
          </div>
        </div>

        {/* 3-Slot Art Style Guide Reference Upload Manager */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                Art Style Guide References (3 Anchors Max)
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">
              {styleReferences.length} of 3 uploaded
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {slotDefinitions.map((slot, idx) => {
              const item = styleReferences[idx];

              return (
                <div
                  key={slot.slotNum}
                  className="bg-zinc-950/80 rounded-xl border border-zinc-800/90 p-3 flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-[10px] font-mono font-bold">
                        {slot.slotNum}
                      </span>
                      {slot.title}
                    </span>
                    {item && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 uppercase">
                        Anchored
                      </span>
                    )}
                  </div>

                  {item ? (
                    /* Populated Slot */
                    <div className="space-y-2.5">
                      <div className="relative aspect-video w-full bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => setPreviewItem(item)}
                            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-700"
                            title="Preview Image"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => triggerUploadForSlot(idx)}
                            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-700"
                            title="Replace Reference"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteReferenceItem(item.id)}
                            className="p-1.5 rounded-lg bg-red-900/80 text-red-200 hover:bg-red-900 border border-red-700"
                            title="Delete Reference"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateReferenceItem(item.id, { name: e.target.value })}
                          className="w-full bg-zinc-900 text-xs font-semibold text-zinc-200 rounded px-2 py-1 border border-zinc-800 focus:outline-none focus:border-amber-500"
                          placeholder="Reference Title"
                        />
                        <input
                          type="text"
                          value={item.notes || ''}
                          onChange={(e) => updateReferenceItem(item.id, { notes: e.target.value })}
                          className="w-full bg-zinc-900 text-[11px] text-zinc-400 rounded px-2 py-1 border border-zinc-800 focus:outline-none focus:border-amber-500 placeholder:text-zinc-600"
                          placeholder="Visual notes (e.g. use warm lighting, ignore background)..."
                        />
                      </div>
                    </div>
                  ) : (
                    /* Empty Upload Slot */
                    <div
                      onClick={() => triggerUploadForSlot(idx)}
                      className="border-2 border-dashed border-zinc-800 hover:border-amber-500/60 bg-zinc-900/40 hover:bg-amber-500/5 rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 min-h-[140px]"
                    >
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-zinc-300 block">
                          Upload Reference #{slot.slotNum}
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">
                          {slot.subtitle}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Master Prompt Summary Box */}
        <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Master Prompt Profile (Injected into every generation)
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">Priority 2 Art Direction Anchor</span>
          </div>
          <textarea
            value={bible.summaryPromptProfile}
            onChange={(e) => handleBibleField('summaryPromptProfile', e.target.value)}
            rows={2}
            className="w-full bg-zinc-900 text-xs text-zinc-200 rounded-lg p-2.5 border border-zinc-800 focus:border-amber-500 focus:outline-none resize-none font-serif leading-relaxed"
          />
        </div>
      </div>

      {/* Dual Slider: Realism vs Stylization */}
      <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Realism vs. Stylization Calibration
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-zinc-300">Realism: <strong className="text-amber-400">{bible.realismPercent}%</strong></span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-300">Stylization: <strong className="text-indigo-400">{bible.stylizationPercent}%</strong></span>
          </div>
        </div>

        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={100}
            value={bible.realismPercent}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              updateMasterArtBible({
                realismPercent: val,
                stylizationPercent: 100 - val,
              });
            }}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
            <span>0% (Hyper-Stylized / Graphic Comic)</span>
            <span>50% (Balanced Editorial / Concept Art)</span>
            <span>100% (High-Fidelity Painterly Realism)</span>
          </div>
        </div>
      </div>

      {/* Extracted Color Palette */}
      <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Harmonized Palette (Extracted from Style References)
            </span>
          </div>
          <button
            onClick={handleAddPaletteColor}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-medium"
          >
            + Add Swatch
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {(referenceStudio?.extractedPalette || []).map((color, idx) => (
            <div key={idx} className="flex items-center gap-2 p-1.5 bg-zinc-950 rounded-lg border border-zinc-800">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(idx, e.target.value)}
                className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(idx, e.target.value)}
                className="w-16 bg-transparent text-xs font-mono text-zinc-300 focus:outline-none uppercase"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 16 Art Direction Dimensions Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Core Art Direction Dimensions (16 Attributes)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* 1. Medium */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              1. Artistic Medium
            </label>
            <input
              type="text"
              value={bible.medium}
              onChange={(e) => handleBibleField('medium', e.target.value)}
              placeholder="e.g. Oil on rough linen, watercolor gouache, India ink wash..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 2. Rendering Technique */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              2. Rendering Technique
            </label>
            <input
              type="text"
              value={bible.renderingTechnique}
              onChange={(e) => handleBibleField('renderingTechnique', e.target.value)}
              placeholder="e.g. Painterly realism, flat cell graphic, cross-hatching..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 3. Line Quality */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              3. Line Quality
            </label>
            <input
              type="text"
              value={bible.lineQuality}
              onChange={(e) => handleBibleField('lineQuality', e.target.value)}
              placeholder="e.g. Expressive dip pen, soft lineless edges, uniform vector..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 4. Brush Character */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              4. Brush Character
            </label>
            <input
              type="text"
              value={bible.brushCharacter}
              onChange={(e) => handleBibleField('brushCharacter', e.target.value)}
              placeholder="e.g. Visible bristle marks, buttery impasto, dry scumble..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 5. Texture */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              5. Canvas & Paper Texture
            </label>
            <input
              type="text"
              value={bible.texture}
              onChange={(e) => handleBibleField('texture', e.target.value)}
              placeholder="e.g. Heavy cold-press paper grain, halftone newsprint, linen tooth..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 6. Color Treatment */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              6. Color Treatment
            </label>
            <input
              type="text"
              value={bible.colorTreatment}
              onChange={(e) => handleBibleField('colorTreatment', e.target.value)}
              placeholder="e.g. Warm amber glaze, desaturated noir, luminous pastel..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 7. Contrast & Values */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              7. Value & Contrast
            </label>
            <input
              type="text"
              value={bible.contrast}
              onChange={(e) => handleBibleField('contrast', e.target.value)}
              placeholder="e.g. Deep velvety blacks with stark highlights, high-key bright..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 8. Lighting System */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              8. Lighting & Shadows
            </label>
            <input
              type="text"
              value={bible.lighting}
              onChange={(e) => handleBibleField('lighting', e.target.value)}
              placeholder="e.g. Dramatic single directional key light, soft diffused ambient..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 9. Facial Rendering */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              9. Facial Rendering & Emotion
            </label>
            <input
              type="text"
              value={bible.facialRendering}
              onChange={(e) => handleBibleField('facialRendering', e.target.value)}
              placeholder="e.g. Sculptural bone structure, expressive caricature, cinematic..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 10. Background Treatment */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              10. Background Treatment
            </label>
            <input
              type="text"
              value={bible.backgroundTreatment}
              onChange={(e) => handleBibleField('backgroundTreatment', e.target.value)}
              placeholder="e.g. Soft atmospheric suggestions, detailed architectural grids..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 11. Visual Density */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              11. Visual Density & Negative Space
            </label>
            <input
              type="text"
              value={bible.visualDensity}
              onChange={(e) => handleBibleField('visualDensity', e.target.value)}
              placeholder="e.g. Spacious with generous breathing room, kinetic action packed..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 12. Perspective & Camera */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              12. Perspective & Camera
            </label>
            <input
              type="text"
              value={bible.perspective}
              onChange={(e) => handleBibleField('perspective', e.target.value)}
              placeholder="e.g. Cinematic eye-level 50mm, dramatic low-angle worm's-eye..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 13. Mood */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              13. Mood & Atmosphere
            </label>
            <input
              type="text"
              value={bible.mood}
              onChange={(e) => handleBibleField('mood', e.target.value)}
              placeholder="e.g. Melancholic introspective, electrifying high stakes..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 14. Composition Rules */}
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5 md:col-span-2">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              14. Composition Rules & Framing
            </label>
            <input
              type="text"
              value={bible.compositionRules}
              onChange={(e) => handleBibleField('compositionRules', e.target.value)}
              placeholder="e.g. Golden spiral focal balance, rule-of-thirds, clean silhouettes against lit backdrop..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      {previewItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full overflow-hidden p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-100">{previewItem.name}</h3>
                <p className="text-xs text-zinc-400">Art Style Guide Anchor</p>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs"
              >
                Close
              </button>
            </div>
            
            <div className="max-h-[60vh] flex items-center justify-center bg-zinc-950 rounded-xl overflow-hidden">
              <img
                src={previewItem.imageUrl}
                alt={previewItem.name}
                className="max-h-[55vh] w-auto object-contain"
              />
            </div>

            {previewItem.notes && (
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                <span className="font-semibold text-amber-400">Notes: </span>
                {previewItem.notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
