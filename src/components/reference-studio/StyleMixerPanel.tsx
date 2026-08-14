import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Palette, 
  Brush, 
  Sun, 
  Trees, 
  FileText, 
  Check, 
  Shuffle, 
  User 
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { StyleMixerAssignments } from '../../types';

export const StyleMixerPanel: React.FC = () => {
  const { 
    referenceStudio, 
    updateReferenceStudio, 
    combineReferencesStyleMixerAi, 
    isAiGenerating 
  } = useStory();

  const assignments = referenceStudio?.mixerAssignments || {};
  const references = referenceStudio?.references || [];

  const handleAssignment = (field: keyof StyleMixerAssignments, id: string) => {
    updateReferenceStudio(prev => ({
      ...prev,
      mixerAssignments: {
        ...(prev.mixerAssignments || {}),
        [field]: id,
      }
    }));
  };

  const getRef = (id?: string) => references.find(r => r.id === id);

  const MIXER_CHANNELS: { 
    id: keyof StyleMixerAssignments; 
    label: string; 
    description: string; 
    icon: any; 
    filterCat?: string 
  }[] = [
    { 
      id: 'lineworkReferenceId', 
      label: 'Linework & Contours', 
      description: 'Controls ink density, edge sharpness, and pen weight', 
      icon: Brush 
    },
    { 
      id: 'colorPaletteReferenceId', 
      label: 'Color Palette & Tones', 
      description: 'Controls chromatic harmony, tinting, and palette range', 
      icon: Palette 
    },
    { 
      id: 'characterRenderingReferenceId', 
      label: 'Character Rendering', 
      description: 'Controls facial fidelity, skin shading, and anatomical style', 
      icon: User 
    },
    { 
      id: 'backgroundReferenceId', 
      label: 'Background & World Treatment', 
      description: 'Controls environmental detail, depth of field, and scenery', 
      icon: Trees 
    },
    { 
      id: 'lightingReferenceId', 
      label: 'Lighting & Atmosphere', 
      description: 'Controls key light direction, contrast, and atmospheric mood', 
      icon: Sun 
    },
    { 
      id: 'textureReferenceId', 
      label: 'Surface & Canvas Texture', 
      description: 'Controls grain, paper tooth, brush strokes, and film halftones', 
      icon: Layers 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 bg-gradient-to-r from-indigo-500/10 via-zinc-900 to-zinc-900 rounded-2xl border border-indigo-500/30 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Shuffle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">Multi-Reference Style Mixer</h3>
              <p className="text-xs text-zinc-400">
                Blend different reference uploads (e.g. Linework from Ref A + Colors from Ref B + Lighting from Ref C) into a unified, non-contradictory Master Art Profile.
              </p>
            </div>
          </div>

          <button
            onClick={() => combineReferencesStyleMixerAi()}
            disabled={isAiGenerating || references.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-indigo-600/20 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAiGenerating ? 'Harmonizing Elements...' : 'Synthesize Master Profile'}</span>
          </button>
        </div>
      </div>

      {/* Mixer Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MIXER_CHANNELS.map(channel => {
          const Icon = channel.icon;
          const assignedId = assignments[channel.id];
          const assignedRef = getRef(assignedId);

          return (
            <div
              key={channel.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                assignedRef 
                  ? 'bg-zinc-900/90 border-indigo-500/40 ring-1 ring-indigo-500/10' 
                  : 'bg-zinc-900/40 border-zinc-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200">{channel.label}</h4>
                    <p className="text-[10px] text-zinc-400">{channel.description}</p>
                  </div>
                </div>

                {/* Assigned Reference Thumbnail & Info */}
                {assignedRef ? (
                  <div className="mt-3 flex items-center gap-3 p-2 bg-zinc-950 rounded-lg border border-zinc-800">
                    <img
                      src={assignedRef.imageUrl}
                      alt={assignedRef.name}
                      className="w-10 h-10 rounded-md object-cover border border-zinc-700"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-zinc-200 block truncate">
                        {assignedRef.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 block truncate">
                        {assignedRef.category} • {assignedRef.role}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 py-3 text-center bg-zinc-950/40 rounded-lg border border-dashed border-zinc-800 text-[11px] text-zinc-500">
                    Using global genre default
                  </div>
                )}
              </div>

              {/* Selector */}
              <div className="pt-2 border-t border-zinc-800/80">
                <select
                  value={assignedId || ''}
                  onChange={(e) => handleAssignment(channel.id, e.target.value)}
                  className="w-full bg-zinc-950 text-xs text-zinc-300 rounded-lg border border-zinc-800 py-1.5 px-2 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">-- Select Reference for {channel.label} --</option>
                  {references.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resulting Summary Card */}
      <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-2">
        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>Synthesized Art Direction Prompt</span>
        </h4>
        <p className="text-xs text-zinc-300 font-serif leading-relaxed italic bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
          "{referenceStudio.masterArtBible.summaryPromptProfile}"
        </p>
      </div>
    </div>
  );
};
