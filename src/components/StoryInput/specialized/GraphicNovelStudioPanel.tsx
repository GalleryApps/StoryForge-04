import React, { useState } from 'react';
import {
  Video,
  Sparkles,
  Zap,
  Sliders,
  Layers,
  Split,
  Maximize2,
  Film,
  Camera,
  Palette,
  Eye,
  ArrowRight,
  Tv,
} from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const CINEMATIC_RATIOS = [
  { id: '2.39', name: '2.39:1 Anamorphic Scope', desc: 'Prestige cinematic widescreen; perfect for expansive horizon & panoramic tension.' },
  { id: '1.85', name: '1.85:1 Flat Widescreen', desc: 'Standard theatrical ratio; balanced character-to-environment headroom.' },
  { id: '16:9', name: '16:9 High-Def Modern', desc: 'Dynamic streaming graphic aesthetic with clean vertical stacked gutters.' },
  { id: '4:3', name: '4:3 Academy Classic', desc: 'Claustrophobic, intimate, vintage psychological framing.' },
];

const MCCLOUD_TRANSITIONS = [
  { id: 'moment_to_moment', name: 'Moment-to-Moment', desc: 'Requires very little closure (e.g. eye blinking, drop falling, cigarette smoke drifting).' },
  { id: 'action_to_action', name: 'Action-to-Action', desc: 'Shows a single subject in distinct physical progressions.' },
  { id: 'subject_to_subject', name: 'Subject-to-Subject', desc: 'Stays within scene/idea, moves between characters, reacting faces, or loaded props.' },
  { id: 'scene_to_scene', name: 'Scene-to-Scene', desc: 'Deductive leaps across significant distances of time or geographic space.' },
  { id: 'aspect_to_aspect', name: 'Aspect-to-Aspect', desc: 'Bypasses time entirely to set a wandering eye on places, ambient moods, or architectural subtext.' },
  { id: 'non_sequitur', name: 'Non-Sequitur', desc: 'Offers no explicit logical relationship; forces symbolic subconscious synthesis.' },
];

const CAMERA_STAGING = [
  { shot: 'Extreme Wide / Establishing', lens: '18mm Ultra-Wide', desc: 'Submerges character in crushing environmental architecture.' },
  { shot: 'Low Angle Dutch Tilt', lens: '24mm Canted', desc: 'Destabilizes reality; signals impending violence or moral rot.' },
  { shot: 'Over-the-Shoulder Subjective', lens: '50mm Prime', desc: 'Places reader inside conversational crossfire.' },
  { shot: 'Macro Close-Up / Chiaroscuro', lens: '85mm Macro', desc: 'Micro-expressions, dilated pupils, trembling fingers on trigger.' },
  { shot: 'Silhouette Negative Space', lens: 'Graphic Flat', desc: 'High-contrast stark ink geometry with zero midtones.' },
];

const COLOR_SCRIPTS = [
  { name: 'Noir Monochromatic', palette: ['#09090b', '#27272a', '#71717a', '#f4f4f5'], mood: 'Cold cynicism, corrupt alleys, moral ambiguity' },
  { name: 'Neon Cyberpunk', palette: ['#0f172a', '#06b6d4', '#ec4899', '#facc15'], mood: 'Synthetic rain, glowing holographic alienation' },
  { name: 'Terracotta Chiaroscuro', palette: ['#451a03', '#9a3412', '#ea580c', '#ffedd5'], mood: 'Dusty desert western, scorched earth vengeance' },
  { name: 'Muted Melancholy', palette: ['#1e293b', '#475569', '#64748b', '#cbd5e1'], mood: 'Subdued grief, winter stillness, understated literary drama' },
];

export const GraphicNovelStudioPanel: React.FC<Props> = ({ onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedRatio, setSelectedRatio] = useState('2.39');
  const [selectedTransition, setSelectedTransition] = useState('aspect_to_aspect');
  const [selectedStaging, setSelectedStaging] = useState(CAMERA_STAGING[1].shot);
  const [selectedColorScript, setSelectedColorScript] = useState(COLOR_SCRIPTS[0].name);
  const [splashPageSpread, setSplashPageSpread] = useState('Climatic Chapter Finale (Double-Page Bleed)');
  const [sceneScript, setSceneScript] = useState('A lone inspector walks under the rain-slick highway overpass. A sodium lamp flickers overhead, reflecting in a broken puddle.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyboardOutput, setStoryboardOutput] = useState<string | null>(null);

  const handleGenerateStoryboard = async () => {
    setIsGenerating(true);
    setStoryboardOutput(null);
    try {
      const res = await fetch('/api/gemini/story-input/genre-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: 'graphic_novel_cinematic',
          actionKey: 'generate_storyboard_script',
          actionLabel: 'Generate Graphic Novel Storyboard',
          formData: {
            scene: sceneScript,
            aspectRatio: selectedRatio,
            transition: selectedTransition,
            cameraShot: selectedStaging,
            colorScript: selectedColorScript,
            splashSpread: splashPageSpread,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setStoryboardOutput(data.result.narrativeAddition || data.result.craftAnalysis || 'Storyboard layout generated.');
      } else {
        setStoryboardOutput(`PAGE SPREAD - CINEMATIC TREATMENT\nAspect Ratio: ${selectedRatio} | Palette: ${selectedColorScript}\n\n[PANEL 1 - ${selectedStaging}] Widescreen banner across top tier. ${sceneScript}\n[TRANSITION: ${selectedTransition.toUpperCase()}]\n[PANEL 2 - REACTION INSET] Tight macro on eyes adjusting to sodium flare.\n[PANEL 3 - SILENT WIDE] Full gutter silence. Raindrops hitting asphalt.\n[DOUBLE-SPREAD SPLASH]: ${splashPageSpread}`);
      }
    } catch {
      setStoryboardOutput(`[PANEL 1 - WIDESCREEN ${selectedRatio}] ${sceneScript}\n[CAMERA: ${selectedStaging}]\n[TRANSITION: ${selectedTransition}]\n[COLOR MOOD: ${selectedColorScript}]`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-violet-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 shadow-md shadow-violet-500/10">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Cinematic Graphic Novel Studio
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-800 uppercase font-semibold">
                Anamorphic Staging & McCloud Transitions
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Widescreen lens composition, aspect-to-aspect mood pacing, and emotional color scripts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDilemmaModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-violet-600/30 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/40 transition flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            10-Level Cinematic Dilemmas
          </button>
        </div>
      </div>

      {/* ASPECT RATIO & MCCLOUD TRANSITION ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Widescreen Aspect Ratios */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-violet-400" />
            Widescreen Letterbox Format
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CINEMATIC_RATIOS.map(ratio => (
              <button
                key={ratio.id}
                type="button"
                onClick={() => setSelectedRatio(ratio.id)}
                className={`p-3 rounded-lg border text-left transition ${
                  selectedRatio === ratio.id
                    ? 'bg-violet-500/20 border-violet-500 text-white shadow-xs'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-violet-200">{ratio.name}</div>
                <div className="text-[10px] text-slate-400 mt-1 leading-snug">{ratio.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* McCloud Transition Taxonomy */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
            <Split className="w-3.5 h-3.5 text-violet-400" />
            McCloud Closure Transition
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MCCLOUD_TRANSITIONS.map(trans => (
              <button
                key={trans.id}
                type="button"
                onClick={() => setSelectedTransition(trans.id)}
                className={`p-2.5 rounded-lg border text-left transition ${
                  selectedTransition === trans.id
                    ? 'bg-violet-500/20 border-violet-500 text-white font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs text-violet-200">{trans.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{trans.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CAMERA STAGING & COLOR SCRIPT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        {/* Camera Lens & Staging */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-violet-400" />
            Camera Lens Staging & Angles
          </label>
          <div className="space-y-2">
            {CAMERA_STAGING.map(cam => (
              <div
                key={cam.shot}
                onClick={() => setSelectedStaging(cam.shot)}
                className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  selectedStaging === cam.shot
                    ? 'bg-violet-950/50 border-violet-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-violet-200">{cam.shot}</div>
                  <div className="text-[10px] text-slate-400">{cam.desc}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-violet-300">
                  {cam.lens}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Scripts & Emotional Lighting */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-violet-400" />
            Emotional Color Scripting
          </label>
          <div className="space-y-2">
            {COLOR_SCRIPTS.map(script => (
              <div
                key={script.name}
                onClick={() => setSelectedColorScript(script.name)}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  selectedColorScript === script.name
                    ? 'bg-violet-950/50 border-violet-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-violet-200">{script.name}</div>
                  <div className="text-[10px] text-slate-400">{script.mood}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  {script.palette.map((color, cIdx) => (
                    <div
                      key={cIdx}
                      className="w-4 h-4 rounded-full border border-slate-700 shadow-xs"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1">Double-Spread / Splash Placement</label>
            <select
              value={splashPageSpread}
              onChange={e => setSplashPageSpread(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option>Climatic Chapter Finale (Double-Page Bleed)</option>
              <option>Act I Opening Monumental Reveal</option>
              <option>Midpoint Betrayal Shockwave</option>
              <option>Quiet Wordless Atmospheric Spread</option>
            </select>
          </div>
        </div>
      </div>

      {/* STORYBOARD SCRIPT GENERATOR */}
      <div className="p-4 bg-slate-950/80 border border-violet-500/20 rounded-xl space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Cinematic Storyboard Scripting Engine
            </span>
          </div>
          <button
            onClick={handleGenerateStoryboard}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20 transition flex items-center gap-1.5"
          >
            <Zap className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Drafting Storyboard...' : 'Generate Cinematic Script'}
          </button>
        </div>

        <textarea
          rows={2}
          value={sceneScript}
          onChange={e => setSceneScript(e.target.value)}
          placeholder="Enter the scene you want staged cinematically..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-violet-500"
        />

        {storyboardOutput && (
          <div className="p-3.5 bg-slate-900 border border-violet-500/40 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {storyboardOutput}
          </div>
        )}
      </div>
    </div>
  );
};
