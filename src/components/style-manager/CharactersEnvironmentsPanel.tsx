import React, { useState } from 'react';
import { Users, MapPin, Plus, Trash2, Lock, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { CharacterVisualProfile, EnvironmentProfile } from '../../types';

export const CharactersEnvironmentsPanel: React.FC = () => {
  const { masterStyle, updateMasterStyle } = useStory();
  const [activeSubTab, setActiveSubTab] = useState<'characters' | 'environments'>('characters');

  const [newCharName, setNewCharName] = useState('');
  const [newEnvName, setNewEnvName] = useState('');

  const characterProfiles = masterStyle.characterProfiles || [];
  const environmentProfiles = masterStyle.environmentProfiles || [];

  const handleAddCharacter = () => {
    if (!newCharName.trim()) return;
    const newChar: CharacterVisualProfile = {
      characterId: `char-${Date.now()}`,
      name: newCharName.trim(),
      facialStructure: 'Angular, defined jawline with subtle crow’s feet',
      hairStyleAndColor: 'Dark salt-and-pepper hair parted slightly to the left',
      standardAttire: 'Pressed charcoal wool suit with slightly loosened dark tie',
      colorPalette: ['#1e293b', '#475569', '#cbd5e1'],
      ageAndSilhouette: 'Mid-40s, lean posture with slight forward tilt of concentration',
      signatureAccessories: 'Worn brass mechanical pencil in breast pocket',
      lockedTraits: ['Dark hair with grey temples', 'Brass pencil', 'Charcoal suit']
    };

    updateMasterStyle(prev => ({
      ...prev,
      characterProfiles: [...(prev.characterProfiles || []), newChar]
    }));
    setNewCharName('');
  };

  const handleAddEnvironment = () => {
    if (!newEnvName.trim()) return;
    const newEnv: EnvironmentProfile = {
      environmentId: `env-${Date.now()}`,
      name: newEnvName.trim(),
      architecturalStyle: '1930s Bureaucratic Brutalism, high vaulted concrete ceilings',
      lightingConditions: 'Cold fluorescent strips casting geometric green-gray pools on linoleum',
      weatherOrSeason: 'Perpetual November drizzle outside clouded frosted transoms',
      primaryMaterials: ['Poured concrete', 'Polished linoleum', 'Worn oak filing drawers'],
      colorTemperature: 'Cool Slate (#334155) with warm incandescent accent (#f59e0b)',
      spatialAtmosphere: 'Echoing, cavernous silence broken only by typewriter carriage returns',
      cameraPerspective: 'Low-angle architectural one-point perspective framing endless desks'
    };

    updateMasterStyle(prev => ({
      ...prev,
      environmentProfiles: [...(prev.environmentProfiles || []), newEnv]
    }));
    setNewEnvName('');
  };

  const handleDeleteCharacter = (id: string) => {
    updateMasterStyle(prev => ({
      ...prev,
      characterProfiles: (prev.characterProfiles || []).filter(c => c.characterId !== id)
    }));
  };

  const handleDeleteEnvironment = (id: string) => {
    updateMasterStyle(prev => ({
      ...prev,
      environmentProfiles: (prev.environmentProfiles || []).filter(e => e.environmentId !== id)
    }));
  };

  const updateCharacter = (id: string, patch: Partial<CharacterVisualProfile>) => {
    updateMasterStyle(prev => ({
      ...prev,
      characterProfiles: (prev.characterProfiles || []).map(c =>
        c.characterId === id ? { ...c, ...patch } : c
      )
    }));
  };

  const updateEnvironment = (id: string, patch: Partial<EnvironmentProfile>) => {
    updateMasterStyle(prev => ({
      ...prev,
      environmentProfiles: (prev.environmentProfiles || []).map(e =>
        e.environmentId === id ? { ...e, ...patch } : e
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            Cast & Environment Continuity Profiles
          </h2>
          <p className="text-xs text-slate-500">
            Define persistent visual traits for characters and recurring settings to enforce 100% prompt consistency across 350 pages.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setActiveSubTab('characters')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSubTab === 'characters'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Characters ({characterProfiles.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('environments')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSubTab === 'environments'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Environments ({environmentProfiles.length})</span>
          </button>
        </div>
      </div>

      {/* Characters View */}
      {activeSubTab === 'characters' && (
        <div className="space-y-4">
          {/* Quick Add Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3">
            <input
              type="text"
              value={newCharName}
              onChange={e => setNewCharName(e.target.value)}
              placeholder="Enter new character name (e.g. Arthur Vance, Detective Clara Reed)..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              disabled={!newCharName.trim()}
              onClick={handleAddCharacter}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition disabled:opacity-50 flex items-center gap-1.5 shrink-0 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Character Profile</span>
            </button>
          </div>

          {/* Characters List */}
          <div className="grid grid-cols-1 gap-4">
            {characterProfiles.map(char => (
              <div key={char.characterId} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      {char.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{char.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">ID: {char.characterId}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <Lock className="w-3 h-3" /> Locked Visual Bible
                    </span>
                    <button
                      onClick={() => handleDeleteCharacter(char.characterId)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Delete profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Face & Facial Features</label>
                    <input
                      type="text"
                      value={char.facialStructure}
                      onChange={e => updateCharacter(char.characterId, { facialStructure: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Hair Style & Color</label>
                    <input
                      type="text"
                      value={char.hairStyleAndColor}
                      onChange={e => updateCharacter(char.characterId, { hairStyleAndColor: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Standard Attire / Outfit</label>
                    <input
                      type="text"
                      value={char.standardAttire}
                      onChange={e => updateCharacter(char.characterId, { standardAttire: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Age & Physical Silhouette</label>
                    <input
                      type="text"
                      value={char.ageAndSilhouette}
                      onChange={e => updateCharacter(char.characterId, { ageAndSilhouette: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Signature Props / Accessories</label>
                    <input
                      type="text"
                      value={char.signatureAccessories}
                      onChange={e => updateCharacter(char.characterId, { signatureAccessories: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Locked Keywords (Comma Separated)</label>
                    <input
                      type="text"
                      value={char.lockedTraits?.join(', ') || ''}
                      onChange={e => updateCharacter(char.characterId, {
                        lockedTraits: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Environments View */}
      {activeSubTab === 'environments' && (
        <div className="space-y-4">
          {/* Quick Add Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3">
            <input
              type="text"
              value={newEnvName}
              onChange={e => setNewEnvName(e.target.value)}
              placeholder="Enter recurring location (e.g. Municipal Archive Room, The Red Velvet Club)..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              disabled={!newEnvName.trim()}
              onClick={handleAddEnvironment}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition disabled:opacity-50 flex items-center gap-1.5 shrink-0 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Environment Profile</span>
            </button>
          </div>

          {/* Environments List */}
          <div className="grid grid-cols-1 gap-4">
            {environmentProfiles.map(env => (
              <div key={env.environmentId} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{env.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">ID: {env.environmentId}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteEnvironment(env.environmentId)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="Delete profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Architectural Style</label>
                    <input
                      type="text"
                      value={env.architecturalStyle}
                      onChange={e => updateEnvironment(env.environmentId, { architecturalStyle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Lighting Conditions</label>
                    <input
                      type="text"
                      value={env.lightingConditions}
                      onChange={e => updateEnvironment(env.environmentId, { lightingConditions: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Weather / Season</label>
                    <input
                      type="text"
                      value={env.weatherOrSeason}
                      onChange={e => updateEnvironment(env.environmentId, { weatherOrSeason: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Color Temperature</label>
                    <input
                      type="text"
                      value={env.colorTemperature}
                      onChange={e => updateEnvironment(env.environmentId, { colorTemperature: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Spatial Atmosphere</label>
                    <input
                      type="text"
                      value={env.spatialAtmosphere}
                      onChange={e => updateEnvironment(env.environmentId, { spatialAtmosphere: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Camera Perspective</label>
                    <input
                      type="text"
                      value={env.cameraPerspective}
                      onChange={e => updateEnvironment(env.environmentId, { cameraPerspective: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
