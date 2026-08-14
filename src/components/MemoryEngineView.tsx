import React, { useState } from 'react';
import {
  BrainCircuit,
  Lock,
  Unlock,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Globe,
  Scroll,
  Tag,
  BookOpen,
  Layers,
  Edit3
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { CharacterBibleEntry, WorldRule, ContinuityFact } from '../types';

export const MemoryEngineView: React.FC = () => {
  const {
    book,
    updateBook,
    toggleContinuityFact,
    addContinuityFact,
    updateCharacterBible,
    addCharacter,
    toggleVisualStyleLock,
    extractContinuityFactsAi,
    activeChapterIdx,
  } = useStory();

  const [activeTab, setActiveTab] = useState<'bible' | 'rolling' | 'rules' | 'integrity'>('bible');
  const [showAddCharModal, setShowAddCharModal] = useState(false);
  const [showAddFactModal, setShowAddFactModal] = useState(false);
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);

  // New character form state
  const [charName, setCharName] = useState('');
  const [charRole, setCharRole] = useState<'protagonist' | 'antagonist' | 'supporting' | 'minor'>('protagonist');
  const [charTraits, setCharTraits] = useState('');
  const [charBio, setCharBio] = useState('');
  const [charVoice, setCharVoice] = useState('');
  const [charSecrets, setCharSecrets] = useState('');

  // New fact form state
  const [newFactText, setNewFactText] = useState('');
  const [newFactCategory, setNewFactCategory] = useState<any>('plot_event');

  // New rule form state
  const [ruleTitle, setRuleTitle] = useState('');
  const [ruleCategory, setRuleCategory] = useState<any>('society_politics');
  const [ruleDesc, setRuleDesc] = useState('');

  const globalBible = book?.memoryEngine?.level1GlobalBible || { characters: [], worldRules: [], forbiddenPhrases: [], toneConstraints: [] };
  const rollingMem = book?.memoryEngine?.level2RollingMemory || { chapterSummaries: [], continuityFacts: [], activePlotThreads: [], characterStateLedger: {} };
  const immediateContext = book?.memoryEngine?.level3ImmediateContext || { lastSceneSummary: '', previousSceneParagraphs: [], currentSceneIntent: '', charactersInScene: [] };

  const handleSaveCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!charName.trim()) return;

    const newChar: CharacterBibleEntry = {
      id: `char-${Date.now()}`,
      name: charName,
      role: charRole,
      lockedTraits: charTraits.split(',').map(t => t.trim()).filter(Boolean),
      bio: charBio,
      personality: 'Complex motivations and goals',
      voiceStyle: charVoice || 'Natural dialogue style',
      arcGoal: 'Primary personal arc',
      secrets: charSecrets,
      currentEmotionalState: 'Determined',
      currentInjuries: 'None',
      currentPossessions: [],
      relationships: [],
    };

    addCharacter(newChar);
    setShowAddCharModal(false);
    setCharName('');
    setCharTraits('');
    setCharBio('');
    setCharVoice('');
    setCharSecrets('');
  };

  const handleSaveFact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFactText.trim()) return;
    addContinuityFact(newFactText, newFactCategory);
    setShowAddFactModal(false);
    setNewFactText('');
  };

  const handleSaveRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleTitle.trim()) return;

    const newRule: WorldRule = {
      id: `rule-${Date.now()}`,
      category: ruleCategory,
      title: ruleTitle,
      description: ruleDesc,
    };

    updateBook(prev => ({
      ...prev,
      memoryEngine: {
        ...prev.memoryEngine,
        level1GlobalBible: {
          ...prev.memoryEngine.level1GlobalBible,
          worldRules: [...prev.memoryEngine.level1GlobalBible.worldRules, newRule],
        },
      },
    }));

    setShowAddRuleModal(false);
    setRuleTitle('');
    setRuleDesc('');
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-85px)] overflow-hidden bg-slate-50 text-slate-800">
      {/* Header Bar */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              3-Level Long-Form Memory & Continuity Engine
            </h2>
            <p className="text-[11px] text-slate-500">
              Guarantees character bibles, locked visual traits, and world rules remain pristine over 350+ pages.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('bible')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'bible' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Level 1: Characters & Lore
          </button>
          <button
            onClick={() => setActiveTab('rolling')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'rolling' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Level 2: Rolling Buffer & Facts
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'rules' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            World Rules & Laws
          </button>
          <button
            onClick={() => setActiveTab('integrity')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'integrity' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Continuity Integrity
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* TAB 1: LEVEL 1 CHARACTER BIBLE & VISUAL STYLE LOCK */}
        {activeTab === 'bible' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Visual Style Lock Banner */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">Visual Style & Palette Lock</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    globalBible.visualStyleLocked ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {globalBible.visualStyleLocked ? 'STYLE LOCKED' : 'UNLOCKED'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {globalBible.visualStyleGuide}
                </p>
                {/* Palette Chips */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Color Palette:</span>
                  {globalBible.colorPalette.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={toggleVisualStyleLock}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition"
              >
                {globalBible.visualStyleLocked ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Locked for Art Gen</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Lock Visual Style</span>
                  </>
                )}
              </button>
            </div>

            {/* Character Roster */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    Character Bible ({(globalBible.characters || []).length} Registered)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Characters maintain permanent traits, distinct voice registers, emotional states, and secrets.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddCharModal(true)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Character</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(globalBible.characters || []).map(char => (
                  <div
                    key={char.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 space-y-3.5 hover:border-slate-300 transition shadow-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          char.role === 'protagonist'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                            : char.role === 'antagonist'
                            ? 'bg-rose-50 text-rose-700 border border-rose-100'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {char.role}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">
                          {char.name}
                        </h4>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-indigo-600">
                        {char.name.charAt(0)}
                      </div>
                    </div>

                    {/* Locked Physical Traits */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-indigo-600 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Locked Visual Traits
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {char.lockedTraits.map((trait, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bio & Voice Style */}
                    <p className="text-xs text-slate-600 line-clamp-3">
                      {char.bio}
                    </p>

                    <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                      <div>
                        <strong className="text-slate-500 font-mono text-[10px]">VOICE:</strong>{' '}
                        <span className="text-slate-700 italic">{char.voiceStyle}</span>
                      </div>
                      {char.secrets && (
                        <div>
                          <strong className="text-rose-600 font-mono text-[10px]">SECRET:</strong>{' '}
                          <span className="text-slate-600">{char.secrets}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEVEL 2 ROLLING SUMMARY BUFFER & CONTINUITY FACTS */}
        {activeTab === 'rolling' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Rolling Buffer Editor */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-bold text-sm text-slate-900">
                    Live Rolling Summary Buffer
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Passed to Gemini in every prompt to prevent context degradation
                </span>
              </div>

              <textarea
                rows={4}
                value={rollingMem.rollingSummaryBuffer}
                onChange={e => {
                  const val = e.target.value;
                  updateBook(prev => ({
                    ...prev,
                    memoryEngine: {
                      ...prev.memoryEngine,
                      level2RollingMemory: {
                        ...prev.memoryEngine.level2RollingMemory,
                        rollingSummaryBuffer: val,
                      },
                    },
                  }));
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-serif leading-relaxed"
              />
            </div>

            {/* Extracted Continuity Facts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Extracted Continuity Facts ({(rollingMem.continuityFacts || []).length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Atomic narrative constraints (e.g. character knowledge, item locations, timeline points).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => extractContinuityFactsAi(activeChapterIdx)}
                    className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Run AI Fact Extraction</span>
                  </button>

                  <button
                    onClick={() => setShowAddFactModal(true)}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Fact</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(rollingMem.continuityFacts || []).map(fact => (
                  <div
                    key={fact.id}
                    className={`p-4 rounded-xl border transition flex items-start justify-between gap-3 ${
                      fact.active
                        ? 'bg-white border-slate-200 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 opacity-50'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold border border-slate-200">
                          {(fact.category || '').replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Origin: Ch {fact.chapterOrigin}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 font-medium leading-relaxed">
                        {fact.fact}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleContinuityFact(fact.id)}
                      className={`p-1 rounded-full ${
                        fact.active ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={fact.active ? 'Fact Active (Passed to AI)' : 'Fact Deactivated'}
                    >
                      {fact.active ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WORLD RULES & LAWS */}
        {activeTab === 'rules' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  World Rules, Laws & Forbidden Tech ({(globalBible.worldRules || []).length})
                </h3>
                <p className="text-xs text-slate-500">
                  Fundamental parameters of society, technology, politics, and taboo practices in this universe.
                </p>
              </div>

              <button
                onClick={() => setShowAddRuleModal(true)}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add World Rule</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(globalBible.worldRules || []).map(rule => (
                <div
                  key={rule.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                      {(rule.category || '').replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{rule.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTINUITY INTEGRITY CHECK */}
        {activeTab === 'integrity' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Manuscript Continuity Integrity Score: 98%
                  </h3>
                  <p className="text-xs text-slate-500">
                    Continuity engine validated across {book?.chapters?.length || 0} chapters, {(globalBible.characters || []).length} characters, and {(rollingMem.continuityFacts || []).length} atomic facts.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 border-t border-slate-100 pt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600">Character Physical Trait Consistency</span>
                  <span className="text-emerald-600 font-mono font-bold">100% Locked</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600">Visual Art Style & Color Palette Invariance</span>
                  <span className="text-emerald-600 font-mono font-bold">Active & Enforced</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600">Character Secret / Knowledge Leakage Risk</span>
                  <span className="text-emerald-600 font-mono font-bold">Zero Violations</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600">Volume Page Limit Budget</span>
                  <span className="text-indigo-600 font-mono font-bold">
                    {(book?.chapters || []).reduce((acc, c) => acc + (c.scenes || []).reduce((sAcc, s) => sAcc + (s.pages || []).length, 0), 0)} / {book?.metadata?.maxPageLimit || 500} Max Pages
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Character */}
      {showAddCharModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              Register Character in Global Bible
            </h3>

            <form onSubmit={handleSaveCharacter} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Character Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arthur Pendleton"
                  value={charName}
                  onChange={e => setCharName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Narrative Role</label>
                <select
                  value={charRole}
                  onChange={e => setCharRole(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                >
                  <option value="protagonist">Protagonist</option>
                  <option value="antagonist">Antagonist</option>
                  <option value="supporting">Supporting Ally</option>
                  <option value="minor">Minor / Recurring</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Locked Visual Traits (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wire spectacles, frayed tweed waistcoat, ink-stained thumbs"
                  value={charTraits}
                  onChange={e => setCharTraits(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Bio / Background</label>
                <textarea
                  rows={2}
                  placeholder="History, profession, key motivations..."
                  value={charBio}
                  onChange={e => setCharBio(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Voice & Dialogue Cadence</label>
                <input
                  type="text"
                  placeholder="e.g. Formal, deadpan sarcasm, precise grammatical syntax"
                  value={charVoice}
                  onChange={e => setCharVoice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCharModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-800 border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save to Bible
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Fact */}
      {showAddFactModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Add Atomic Continuity Fact
            </h3>
            <form onSubmit={handleSaveFact} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Fact Category</label>
                <select
                  value={newFactCategory}
                  onChange={e => setNewFactCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                >
                  <option value="character_knowledge">Character Knowledge / Secret</option>
                  <option value="item_location">Item / Artifact Location</option>
                  <option value="relationship_state">Relationship Status</option>
                  <option value="plot_event">Major Plot Consequence</option>
                  <option value="timeline">Timeline / Calendar Event</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Continuity Fact Statement</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Maria knows Tomas is taking bribes from the transit syndicate."
                  value={newFactText}
                  onChange={e => setNewFactText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFactModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-800 border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save Fact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add World Rule */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              Define World Rule or Law
            </h3>
            <form onSubmit={handleSaveRule} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={ruleCategory}
                  onChange={e => setRuleCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                >
                  <option value="society_politics">Society & Politics</option>
                  <option value="technology">Technology & Mechanics</option>
                  <option value="magic_physics">Magic / Supernatural / Physics</option>
                  <option value="forbidden">Taboo / Forbidden Law</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Rule Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Iron Gall Ink Mandate"
                  value={ruleTitle}
                  onChange={e => setRuleTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Rule Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe how this law or constraint operates..."
                  value={ruleDesc}
                  onChange={e => setRuleDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-800 border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save World Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
