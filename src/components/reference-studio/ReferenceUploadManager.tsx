import React, { useState } from 'react';
import { 
  Upload, 
  Trash2, 
  Tag, 
  Sparkles, 
  Eye, 
  Check, 
  Layers, 
  Palette, 
  User, 
  Image as ImageIcon, 
  Trees, 
  LayoutGrid,
  Filter,
  Plus
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { 
  VisualReferenceCategory, 
  VisualReferenceItem, 
  ReferenceRole, 
  ReferenceImportance 
} from '../../types';

interface Props {
  activeCategory: VisualReferenceCategory | 'all';
  onCategoryChange: (cat: VisualReferenceCategory | 'all') => void;
}

const CATEGORY_TABS: { id: VisualReferenceCategory | 'all'; label: string; icon: any; countKey?: VisualReferenceCategory }[] = [
  { id: 'all', label: 'All References', icon: Layers },
  { id: 'character', label: 'Characters', icon: User, countKey: 'character' },
  { id: 'art_style', label: 'Art Style Guide', icon: ImageIcon, countKey: 'art_style' },
  { id: 'palette', label: 'Color & Palette', icon: Palette, countKey: 'palette' },
  { id: 'environment', label: 'Environment & World', icon: Trees, countKey: 'environment' },
  { id: 'layout', label: 'Layout & Composition', icon: LayoutGrid, countKey: 'layout' },
];

const ROLES: { id: ReferenceRole; label: string }[] = [
  { id: 'primary_style', label: 'Primary Style' },
  { id: 'secondary_style', label: 'Secondary Style' },
  { id: 'linework', label: 'Linework' },
  { id: 'color_palette', label: 'Color Palette' },
  { id: 'lighting_mood', label: 'Lighting & Mood' },
  { id: 'character_design', label: 'Character Design' },
  { id: 'environment_world', label: 'Environment / World' },
  { id: 'layout_grid', label: 'Layout Grid' },
];

const IMPORTANCE_LEVELS: { id: ReferenceImportance; label: string; badgeColor: string }[] = [
  { id: 'strict_match', label: 'Strict Match', badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40' },
  { id: 'primary', label: 'Primary', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: 'secondary', label: 'Secondary', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { id: 'inspiration_only', label: 'Inspiration Only', badgeColor: 'bg-zinc-700/50 text-zinc-300 border-zinc-600' },
];

export const ReferenceUploadManager: React.FC<Props> = ({ activeCategory, onCategoryChange }) => {
  const { 
    referenceStudio, 
    uploadReferenceImages, 
    deleteReferenceItem, 
    updateReferenceItem,
    analyzeArtStyleGuideAi,
    createCharacterSetFromAi,
    isAiGenerating 
  } = useStory();

  const [dragOver, setDragOver] = useState(false);
  const [selectedItemForPreview, setSelectedItemForPreview] = useState<VisualReferenceItem | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [limitNotice, setLimitNotice] = useState<string | null>(null);

  const styleRefsCount = (referenceStudio?.references || []).filter(r => r.category === 'art_style').length;

  const filteredReferences = (referenceStudio?.references || []).filter(ref => {
    if (activeCategory === 'all') return true;
    return ref.category === activeCategory;
  });

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const targetCat: VisualReferenceCategory = activeCategory === 'all' ? 'art_style' : activeCategory;

    // Enforce 3 references limit for Art Style Guide
    if (targetCat === 'art_style') {
      const currentCount = (referenceStudio?.references || []).filter(r => r.category === 'art_style').length;
      if (currentCount >= 3) {
        setLimitNotice('Art Style Guide already has 3 references loaded. The Art Style Guide is limited to 3 style anchors. Please delete or replace an existing anchor.');
        setTimeout(() => setLimitNotice(null), 6000);
        return;
      }

      const availableSlots = 3 - currentCount;
      const filesArray = Array.from(fileList).slice(0, availableSlots);
      if (fileList.length > availableSlots) {
        setLimitNotice(`Capped upload to ${availableSlots} file(s) to adhere to the 3-reference Art Style Guide limit.`);
        setTimeout(() => setLimitNotice(null), 5000);
      }

      const filePromises = filesArray.map(file => {
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
        uploadReferenceImages(targetCat, files);
      });
      return;
    }

    const filePromises = Array.from(fileList).map(file => {
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
      uploadReferenceImages(targetCat, files);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      {/* Category Selection Tabs & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800">
          {CATEGORY_TABS.map(tab => {
            const Icon = tab.icon;
            const refs = referenceStudio?.references || [];
            const count = tab.id === 'all' 
              ? refs.length 
              : refs.filter(r => r.category === tab.id).length;
            const isActive = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onCategoryChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-amber-500 text-zinc-950 font-semibold shadow-md shadow-amber-500/10' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-zinc-950/20 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {activeCategory === 'character' && (
            <button
              onClick={() => createCharacterSetFromAi()}
              disabled={isAiGenerating || (referenceStudio?.references || []).filter(r => r.category === 'character').length === 0}
              className="flex items-center gap-2 px-3 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Auto-Extract Character Cards</span>
            </button>
          )}

          {(activeCategory === 'art_style' || activeCategory === 'all') && (
            <button
              onClick={() => analyzeArtStyleGuideAi()}
              disabled={isAiGenerating || (referenceStudio?.references || []).length === 0}
              className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Deep Style Analysis (16 Criteria)</span>
            </button>
          )}
        </div>
      </div>

      {/* Limit Notice Alert */}
      {limitNotice && (
        <div className="p-3.5 bg-amber-500/15 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{limitNotice}</span>
          </div>
          <button 
            onClick={() => setLimitNotice(null)}
            className="text-amber-400 hover:text-amber-300 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Drag and Drop Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          dragOver 
            ? 'border-amber-500 bg-amber-500/5 scale-[1.005]' 
            : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60'
        }`}
      >
        <input
          type="file"
          id="reference-file-input"
          multiple
          accept="image/*,.pdf"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
            <Upload className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-200">
              Upload {activeCategory === 'all' ? 'Visual References' : `${(activeCategory || '').replace(/_/g, ' ')} References`}
            </h3>
            {activeCategory === 'art_style' && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {styleRefsCount}/3 Slots
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed">
            {activeCategory === 'art_style' 
              ? 'Upload up to 3 style guide reference anchors (Primary Medium, Lighting/Atmosphere, Linework).'
              : 'Drag and drop reference images, turnaround sheets, moodboards, color palettes, or layout guides here.'}
          </p>

          <label
            htmlFor="reference-file-input"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 shadow-sm transition-all hover:border-zinc-600"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Browse Image Files</span>
          </label>
        </div>
      </div>


      {/* Reference Item Cards Grid */}
      {filteredReferences.length === 0 ? (
        <div className="py-12 text-center bg-zinc-900/20 rounded-2xl border border-zinc-800/60">
          <Layers className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-zinc-400">No {activeCategory === 'all' ? '' : activeCategory} references uploaded yet</p>
          <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
            Upload character sheets, art style inspiration, color palettes, or environment mockups to anchor your book's visual identity.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredReferences.map((item) => {
            const importanceInfo = IMPORTANCE_LEVELS.find(i => i.id === item.importance) || IMPORTANCE_LEVELS[1];

            return (
              <div
                key={item.id}
                className="group relative bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col shadow-sm"
              >
                {/* Image Preview Container */}
                <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden border-b border-zinc-800/80">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category & Importance Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-md text-[10px] font-semibold text-zinc-300 border border-zinc-700/60 uppercase tracking-wider">
                      {(item.category || '').replace(/_/g, ' ')}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md border text-[10px] font-medium backdrop-blur-md ${importanceInfo.badgeColor}`}>
                      {importanceInfo.label}
                    </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => setSelectedItemForPreview(item)}
                      className="p-1.5 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 border border-zinc-700/80 shadow-md transition-colors"
                      title="View Full Reference"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteReferenceItem(item.id)}
                      className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/60 shadow-md transition-colors"
                      title="Remove Reference"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details & Controls */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateReferenceItem(item.id, { name: e.target.value })}
                      className="w-full bg-transparent text-xs font-semibold text-zinc-200 focus:outline-none focus:border-b focus:border-amber-500 pb-0.5 truncate"
                    />

                    {/* Role Selector */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-zinc-500" />
                      <select
                        value={item.role}
                        onChange={(e) => updateReferenceItem(item.id, { role: e.target.value as ReferenceRole })}
                        className="w-full bg-zinc-950 text-[11px] text-zinc-300 rounded border border-zinc-800 py-1 px-1.5 focus:outline-none focus:border-amber-500"
                      >
                        {ROLES.map(r => (
                          <option key={r.id} value={r.id}>{r.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Importance Selector */}
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <Filter className="w-3 h-3 text-zinc-500" />
                      <select
                        value={item.importance}
                        onChange={(e) => updateReferenceItem(item.id, { importance: e.target.value as ReferenceImportance })}
                        className="w-full bg-zinc-950 text-[11px] text-zinc-300 rounded border border-zinc-800 py-1 px-1.5 focus:outline-none focus:border-amber-500"
                      >
                        {IMPORTANCE_LEVELS.map(imp => (
                          <option key={imp.id} value={imp.id}>{imp.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes / Guidance */}
                  <div className="pt-2 border-t border-zinc-800/80">
                    {editingNotesId === item.id ? (
                      <div className="space-y-1.5">
                        <textarea
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Add visual notes (e.g. use this hair texture, ignore background)..."
                          className="w-full h-16 bg-zinc-950 text-[11px] text-zinc-200 rounded p-1.5 border border-zinc-700 focus:outline-none focus:border-amber-500 resize-none"
                        />
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-2 py-0.5 rounded text-[10px] text-zinc-400 hover:text-zinc-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              updateReferenceItem(item.id, { notes: tempNotes });
                              setEditingNotesId(null);
                            }}
                            className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-semibold text-[10px]"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setEditingNotesId(item.id);
                          setTempNotes(item.notes || '');
                        }}
                        className="cursor-pointer text-[11px] text-zinc-400 hover:text-zinc-200 line-clamp-2 italic"
                      >
                        {item.notes || '+ Click to add visual direction notes'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {selectedItemForPreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedItemForPreview(null)}
        >
          <div 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full overflow-hidden p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-100">{selectedItemForPreview.name}</h3>
                <p className="text-xs text-zinc-400">Category: {selectedItemForPreview.category} | Role: {selectedItemForPreview.role}</p>
              </div>
              <button
                onClick={() => setSelectedItemForPreview(null)}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs"
              >
                Close
              </button>
            </div>
            
            <div className="max-h-[60vh] flex items-center justify-center bg-zinc-950 rounded-xl overflow-hidden">
              <img
                src={selectedItemForPreview.imageUrl}
                alt={selectedItemForPreview.name}
                className="max-h-[58vh] w-auto object-contain"
              />
            </div>

            {selectedItemForPreview.notes && (
              <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                <span className="font-semibold text-amber-400">Visual Notes: </span>
                {selectedItemForPreview.notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
