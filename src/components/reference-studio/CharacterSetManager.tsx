import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  ShieldAlert, 
  Tag, 
  Palette, 
  Scissors, 
  Shirt, 
  Eye,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { CharacterReferenceCard } from '../../types';

export const CharacterSetManager: React.FC = () => {
  const { 
    referenceStudio, 
    addCharacterCard, 
    updateCharacterCard, 
    deleteCharacterCard, 
    toggleCharacterLockAll,
    createCharacterSetFromAi,
    isAiGenerating 
  } = useStory();

  const [expandedCardId, setExpandedCardId] = useState<string | null>(
    referenceStudio.characters[0]?.id || null
  );

  const characterReferences = referenceStudio.references.filter(r => r.category === 'character');

  const handleAddNewCharacter = () => {
    const newId = `char-card-${Date.now()}`;
    addCharacterCard({
      id: newId,
      name: 'New Character',
      role: 'Protagonist',
      visualIdentifier: 'Distinctive visual cue',
      approximateAge: '28-35',
      faceCharacteristics: 'Strong jawline, sharp focused eyes',
      hair: 'Dark textured hair, slightly swept back',
      bodyProportions: 'Athletic, 5ft 10in, upright posture',
      clothing: 'Tailored dark trench coat over collared shirt',
      accessories: 'Vintage silver wristwatch',
      colorAssociations: ['#1e3a8a', '#d97706'],
      typicalExpressions: ['Determined', 'Pensive', 'Guarded'],
      typicalPoses: ['Observing from shadow', 'Hands in pockets'],
      distinguishingFeatures: 'Faint scar across left collarbone',
      locks: {
        face: true,
        hair: true,
        bodyProportions: true,
        costume: true,
        colorPalette: true,
        accessories: true,
        overallIdentity: true,
      },
      assignedReferenceIds: characterReferences.slice(0, 1).map(r => r.id),
    });
    setExpandedCardId(newId);
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-zinc-900/60 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-200">Character Set & Continuity Cards</h3>
            <p className="text-xs text-zinc-400">
              Establish precise visual DNA and continuity locks for recurring characters across all chapter illustrations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => createCharacterSetFromAi()}
            disabled={isAiGenerating}
            className="flex items-center gap-2 px-3 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Scan Uploads & Build Cards</span>
          </button>
          
          <button
            onClick={handleAddNewCharacter}
            className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-lg text-xs transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Character Card</span>
          </button>
        </div>
      </div>

      {/* Characters List / Grid */}
      {(referenceStudio?.characters || []).length === 0 ? (
        <div className="py-16 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800/80">
          <User className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-zinc-300">No Character Reference Cards established</p>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 mb-4">
            Upload character concept art or turnaround sheets, or create a character card to lock visual traits (face, hair, costume, proportions).
          </p>
          <button
            onClick={handleAddNewCharacter}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-colors"
          >
            + Create First Character Card
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {(referenceStudio?.characters || []).map((char, index) => {
            const isExpanded = expandedCardId === char.id;
            const assignedRef = (referenceStudio?.references || []).find(r => char.assignedReferenceIds?.includes(r.id));
            const allLocked = Object.values(char.locks || {}).every(Boolean);

            return (
              <div
                key={char.id}
                className={`bg-zinc-900/90 border rounded-2xl transition-all overflow-hidden ${
                  isExpanded ? 'border-amber-500/60 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Collapsed / Header Summary Row */}
                <div
                  onClick={() => setExpandedCardId(isExpanded ? null : char.id)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {assignedRef?.imageUrl ? (
                        <img src={assignedRef.imageUrl} alt={char.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-zinc-600" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-zinc-100 truncate">{char.name}</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                          {char.role}
                        </span>
                        {allLocked && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                            <Lock className="w-2.5 h-2.5" /> All Traits Locked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-amber-400/90 mt-0.5 truncate font-mono">
                        Key Identifier: {char.visualIdentifier || 'None specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quick Color Swatches */}
                    <div className="hidden sm:flex items-center gap-1">
                      {char.colorAssociations?.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          className="w-4 h-4 rounded-full border border-zinc-700 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>

                    {/* Master Lock Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCharacterLockAll(char.id, !allLocked);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        allLocked
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200'
                      }`}
                      title={allLocked ? 'Unlock all traits' : 'Lock all traits strictly'}
                    >
                      {allLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                      <span>{allLocked ? 'Locked' : 'Unlocked'}</span>
                    </button>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Detailed Editor */}
                {isExpanded && (
                  <div className="p-5 border-t border-zinc-800/80 bg-zinc-950/40 space-y-6">
                    {/* Primary Details Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                          Character Name
                        </label>
                        <input
                          type="text"
                          value={char.name}
                          onChange={(e) => updateCharacterCard(char.id, { name: e.target.value })}
                          className="w-full bg-zinc-900 text-xs text-zinc-200 rounded-lg px-3 py-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                          Story Role / Archetype
                        </label>
                        <input
                          type="text"
                          value={char.role}
                          onChange={(e) => updateCharacterCard(char.id, { role: e.target.value })}
                          className="w-full bg-zinc-900 text-xs text-zinc-200 rounded-lg px-3 py-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                          Approximate Age / Demographic
                        </label>
                        <input
                          type="text"
                          value={char.approximateAge}
                          onChange={(e) => updateCharacterCard(char.id, { approximateAge: e.target.value })}
                          className="w-full bg-zinc-900 text-xs text-zinc-200 rounded-lg px-3 py-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Instant Visual Identifier */}
                    <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-amber-400" />
                        <label className="text-xs font-bold text-amber-300">
                          Instant Visual Identifier (High-Priority AI Visual Anchor)
                        </label>
                      </div>
                      <input
                        type="text"
                        value={char.visualIdentifier}
                        onChange={(e) => updateCharacterCard(char.id, { visualIdentifier: e.target.value })}
                        placeholder="e.g. Asymmetrical copper hair, brass monocular, long scarred cheek, bright crimson coat..."
                        className="w-full bg-zinc-950 text-xs text-zinc-100 rounded-lg px-3 py-2 border border-amber-500/40 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* 7-Point Trait Locks & Breakdown */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Individual Trait Locks & Visual Continuity Rules</span>
                        </h4>
                        <span className="text-[11px] text-zinc-500">
                          Active locks will be enforced in every illustration prompt
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* 1. Face Characteristics */}
                        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-300">Face & Features</span>
                            <button
                              onClick={() => updateCharacterCard(char.id, {
                                locks: { ...char.locks, face: !char.locks?.face }
                              })}
                              className={`p-1 rounded text-xs font-mono flex items-center gap-1 ${
                                char.locks?.face ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {char.locks?.face ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{char.locks?.face ? 'Locked' : 'Unlocked'}</span>
                            </button>
                          </div>
                          <textarea
                            value={char.faceCharacteristics}
                            onChange={(e) => updateCharacterCard(char.id, { faceCharacteristics: e.target.value })}
                            placeholder="Bone structure, eye color/shape, nose, skin tone, facial hair..."
                            className="w-full h-16 bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 resize-none focus:outline-none"
                          />
                        </div>

                        {/* 2. Hair */}
                        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-300">Hair Style & Color</span>
                            <button
                              onClick={() => updateCharacterCard(char.id, {
                                locks: { ...char.locks, hair: !char.locks?.hair }
                              })}
                              className={`p-1 rounded text-xs font-mono flex items-center gap-1 ${
                                char.locks?.hair ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {char.locks?.hair ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{char.locks?.hair ? 'Locked' : 'Unlocked'}</span>
                            </button>
                          </div>
                          <textarea
                            value={char.hair}
                            onChange={(e) => updateCharacterCard(char.id, { hair: e.target.value })}
                            placeholder="Hair texture, cut, color, parting, volume..."
                            className="w-full h-16 bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 resize-none focus:outline-none"
                          />
                        </div>

                        {/* 3. Body Proportions */}
                        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-300">Body Proportions & Silhouette</span>
                            <button
                              onClick={() => updateCharacterCard(char.id, {
                                locks: { ...char.locks, bodyProportions: !char.locks?.bodyProportions }
                              })}
                              className={`p-1 rounded text-xs font-mono flex items-center gap-1 ${
                                char.locks?.bodyProportions ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {char.locks?.bodyProportions ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{char.locks?.bodyProportions ? 'Locked' : 'Unlocked'}</span>
                            </button>
                          </div>
                          <textarea
                            value={char.bodyProportions}
                            onChange={(e) => updateCharacterCard(char.id, { bodyProportions: e.target.value })}
                            placeholder="Height, build, shoulder width, posture..."
                            className="w-full h-16 bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 resize-none focus:outline-none"
                          />
                        </div>

                        {/* 4. Signature Clothing & Costume */}
                        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-300">Signature Costume & Clothing</span>
                            <button
                              onClick={() => updateCharacterCard(char.id, {
                                locks: { ...char.locks, costume: !char.locks?.costume }
                              })}
                              className={`p-1 rounded text-xs font-mono flex items-center gap-1 ${
                                char.locks?.costume ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {char.locks?.costume ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{char.locks?.costume ? 'Locked' : 'Unlocked'}</span>
                            </button>
                          </div>
                          <textarea
                            value={char.clothing}
                            onChange={(e) => updateCharacterCard(char.id, { clothing: e.target.value })}
                            placeholder="Specific garments, fabrics, collar styles, layers, boots..."
                            className="w-full h-16 bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 resize-none focus:outline-none"
                          />
                        </div>

                        {/* 5. Accessories & Props */}
                        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-300">Accessories & Signature Props</span>
                            <button
                              onClick={() => updateCharacterCard(char.id, {
                                locks: { ...char.locks, accessories: !char.locks?.accessories }
                              })}
                              className={`p-1 rounded text-xs font-mono flex items-center gap-1 ${
                                char.locks?.accessories ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {char.locks?.accessories ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{char.locks?.accessories ? 'Locked' : 'Unlocked'}</span>
                            </button>
                          </div>
                          <input
                            type="text"
                            value={char.accessories}
                            onChange={(e) => updateCharacterCard(char.id, { accessories: e.target.value })}
                            placeholder="Glasses, amulets, signature weapon, jewelry, satchel..."
                            className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        {/* 6. Distinguishing Features */}
                        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-300">Distinguishing Features</span>
                            <span className="text-[10px] text-zinc-500">Always enforced</span>
                          </div>
                          <input
                            type="text"
                            value={char.distinguishingFeatures}
                            onChange={(e) => updateCharacterCard(char.id, { distinguishingFeatures: e.target.value })}
                            placeholder="Tattoos, scars, cybernetics, birthmarks, eyepatch..."
                            className="w-full bg-zinc-950 text-xs text-zinc-200 rounded p-2 border border-zinc-800 focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Associated Reference Upload Attachment */}
                    <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-semibold text-zinc-200">
                          Linked Visual Reference Image:
                        </span>
                        <select
                          value={char.assignedReferenceIds?.[0] || ''}
                          onChange={(e) => updateCharacterCard(char.id, {
                            assignedReferenceIds: e.target.value ? [e.target.value] : []
                          })}
                          className="bg-zinc-950 text-xs text-zinc-300 rounded border border-zinc-800 px-3 py-1.5 focus:border-amber-500 focus:outline-none"
                        >
                          <option value="">-- No reference image linked --</option>
                          {characterReferences.map(ref => (
                            <option key={ref.id} value={ref.id}>{ref.name} ({ref.role})</option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={() => deleteCharacterCard(char.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-300 border border-red-800/60 text-xs font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Character Card</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
