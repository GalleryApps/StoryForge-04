import React, { useState } from 'react';
import { Layers, Video, Sparkles, Zap, Image, Maximize2, Split, Eye, Sliders } from 'lucide-react';
import { GenreMagicTool } from '../../../data/genreOntology';

interface Props {
  mode: 'comic_book' | 'graphic_novel_cinematic' | 'illustrated_novel';
  onExecuteTool: (tool: GenreMagicTool) => void;
  onOpenDilemmaModal: () => void;
}

const PANEL_LAYOUTS = [
  { id: '3_grid', name: '3-Tier Classic (6 Panels)', desc: 'Standard golden-age rhythm' },
  { id: '4_panel', name: '4-Panel Yonkoma / Strip', desc: 'Setup, Development, Turn, Climax' },
  { id: 'splash_full', name: 'Full-Page Splash', desc: 'Massive emotional revelation or battle' },
  { id: 'widescreen_cinematic', name: 'Cinematic Widescreen (3 Horizontal Bars)', desc: 'Graphic novel wide atmosphere' },
  { id: 'dynamic_slanted', name: 'Action Slanted Gutters (5 Panels)', desc: 'High kinetic motion & breaks' },
  { id: 'insets_macro', name: 'Heroic Spread with 2 Macro Insets', desc: 'Epic foreground with detail callouts' },
];

const MCCLOUD_TRANSITIONS = [
  { id: 'moment_to_moment', name: 'Moment-to-Moment', desc: 'Requires very little closure (e.g. eye blinking, drop falling).' },
  { id: 'action_to_action', name: 'Action-to-Action', desc: 'Shows a single subject in distinct progressions.' },
  { id: 'subject_to_subject', name: 'Subject-to-Subject', desc: 'Stays within scene/idea, moves between characters/objects.' },
  { id: 'scene_to_scene', name: 'Scene-to-Scene', desc: 'Deductive leaps across significant distances of time/space.' },
  { id: 'aspect_to_aspect', name: 'Aspect-to-Aspect', desc: 'Bypasses time, sets a wandering eye on places/moods/ideas.' },
  { id: 'non_sequitur', name: 'Non-Sequitur', desc: 'Offers no logical relationship between panels.' },
];

const CAMERA_SHOTS = [
  'Extreme Wide Shot (Establish World)',
  'Wide / Full Body (Staging)',
  'Medium Two-Shot (Dialogue)',
  'Close-Up (Emotional Climax)',
  'Extreme Close-Up / Macro (Eye, Finger, Trigger)',
  'Low Angle Hero Shot (Power)',
  'High Angle Bird’s Eye (Vulnerability)',
  'Dutch Tilt / Canted Angle (Psychological Dread)',
  'Over-the-Shoulder (Immersion)',
  'Silhouette / Negative Space (Symbolic)',
];

export const ComicSequentialPanel: React.FC<Props> = ({ mode, onExecuteTool, onOpenDilemmaModal }) => {
  const [selectedLayout, setSelectedLayout] = useState<string>(PANEL_LAYOUTS[0].id);
  const [selectedTransition, setSelectedTransition] = useState<string>(MCCLOUD_TRANSITIONS[1].id);
  const [activeShot, setActiveShot] = useState<string>(CAMERA_SHOTS[3]);

  return (
    <div className="space-y-6 bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            {mode === 'comic_book' ? <Layers className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {mode === 'comic_book'
                  ? 'Sequential Art & Comic Page Studio'
                  : 'Cinematic Graphic Novel Director Panel'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
                Panel Layouts & Gutters
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Control camera angles, McCloud panel transitions, dialogue balloons, and page rhythm.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDilemmaModal}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white border border-indigo-500/40 transition flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Sequential Dilemmas
        </button>
      </div>

      {/* Panel Layout Presets */}
      <div className="space-y-2 relative z-10">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Select Page Grid & Panel Architecture:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PANEL_LAYOUTS.map(layout => {
            const isSelected = selectedLayout === layout.id;
            return (
              <button
                key={layout.id}
                onClick={() => setSelectedLayout(layout.id)}
                className={`text-left p-3 rounded-xl border transition ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-white">{layout.name}</div>
                <div className="text-[11px] text-slate-400 mt-1">{layout.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* McCloud Transitions & Camera Angles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 pt-2 border-t border-slate-800">
        {/* McCloud 6 Panel Transitions */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            McCloud Panel Gutter Transition
          </label>
          <div className="space-y-1.5">
            {MCCLOUD_TRANSITIONS.map(trans => (
              <button
                key={trans.id}
                onClick={() => setSelectedTransition(trans.id)}
                className={`w-full text-left p-2 rounded-lg border text-xs transition flex items-center justify-between ${
                  selectedTransition === trans.id
                    ? 'bg-indigo-950/40 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <span className="font-bold text-white">{trans.name}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{trans.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Shot Angles */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Cinematic Camera Staging
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {CAMERA_SHOTS.slice(0, 6).map(shot => (
              <button
                key={shot}
                onClick={() => setActiveShot(shot)}
                className={`text-left p-2 rounded-lg border text-xs transition ${
                  activeShot === shot
                    ? 'bg-indigo-950/50 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {shot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
