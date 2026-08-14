import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  History,
  ShieldAlert,
  Flame,
  Layers,
  Wand2,
  Plus,
  Trash2,
} from 'lucide-react';
import { SidebarCalloutItem } from './EsotericBlueprintTypes';

interface Props {
  items: SidebarCalloutItem[];
  onUpdateItems: (updater: (prev: SidebarCalloutItem[]) => SidebarCalloutItem[]) => void;
  onExecuteAIGenerator: (title: string, prompt: string, targetKey: string) => void;
  isGeneratingAI: boolean;
}

const SIDEBAR_TYPES = [
  { type: 'Definition', desc: 'Etymology, historical nuances, and cross-tradition meanings', icon: '📖' },
  { type: 'Anecdote', desc: 'Vivid historical episode illustrating a principle in action', icon: '📜' },
  { type: 'Debate', desc: 'Core philosophical dispute between two opposing schools', icon: '⚖️' },
  { type: 'Did You Know?', desc: 'Surprising historical fact that challenges mainstream assumptions', icon: '💡' },
  { type: 'What If?', desc: 'Counterfactual thought experiment testing cosmological rules', icon: '🌀' },
  { type: 'Myths vs Facts', desc: 'Dismantling popular misconceptions and romantic falsehoods', icon: '🔍' },
  { type: 'Historical Note', desc: 'Specific dates, manuscripts, and archive locations', icon: '🏛️' },
  { type: 'Scholarly Debate', desc: 'Contemporary academic controversy (e.g. Hanegraaff vs Yates)', icon: '🎓' },
  { type: 'Practice Note', desc: 'Somatic tip, timing alignment, and common beginner pitfalls', icon: '⚡' },
  { type: 'Warning', desc: 'Psychological guardrails, inflation traps, and ethical safeguards', icon: '⚠️' },
];

const CALLOUT_TYPES = [
  { type: 'Key Concept', color: 'border-amber-500 bg-amber-950/30 text-amber-200' },
  { type: 'Important', color: 'border-indigo-500 bg-indigo-950/30 text-indigo-200' },
  { type: 'Question', color: 'border-cyan-500 bg-cyan-950/30 text-cyan-200' },
  { type: 'Example', color: 'border-emerald-500 bg-emerald-950/30 text-emerald-200' },
  { type: 'Warning', color: 'border-rose-500 bg-rose-950/30 text-rose-200' },
  { type: 'Summary', color: 'border-purple-500 bg-purple-950/30 text-purple-200' },
  { type: 'Challenge', color: 'border-orange-500 bg-orange-950/30 text-orange-200' },
];

export const EsotericSidebarCalloutLevel: React.FC<Props> = ({
  items,
  onUpdateItems,
  onExecuteAIGenerator,
  isGeneratingAI,
}) => {
  const [activeTab, setActiveTab] = useState<'sidebars' | 'callouts'>('sidebars');

  const addItem = (category: 'sidebar' | 'callout', type: string) => {
    const newItem: SidebarCalloutItem = {
      id: `sc_${Date.now()}`,
      category,
      type,
      title: `${type}: Core Principle`,
      content:
        category === 'sidebar'
          ? 'Enter historical commentary, debate positions, or warning notes...'
          : 'Crucial distillation of the surrounding textual thesis...',
      placement: 'Margin Left / Page Bottom',
    };
    onUpdateItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, field: keyof SidebarCalloutItem, val: any) => {
    onUpdateItems(prev => prev.map(item => (item.id === id ? { ...item, [field]: val } : item)));
  };

  const removeItem = (id: string) => {
    onUpdateItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(i => i.category === (activeTab === 'sidebars' ? 'sidebar' : 'callout'));

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Level 5: Sidebar (10 Types) & Callout (7 Types) Architecture
            </h4>
            <p className="text-xs text-slate-400">
              Transform dense expository prose into a dynamic, highly engaging multi-channel reading experience.
            </p>
          </div>
          <button
            disabled={isGeneratingAI}
            onClick={() =>
              onExecuteAIGenerator(
                'Sidebar & Callout Suite',
                'Generate 5 high-craft marginal sidebars (Debate, Myths vs Facts, Warning, Did You Know, Historical Note) for the alchemical chapters.',
                'sidebarSuite'
              )
            }
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Wand2 className="w-3.5 h-3.5" /> AI Generate Marginalia
          </button>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('sidebars')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
              activeTab === 'sidebars'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            5.1 The 10 Sidebar Types ({items.filter(i => i.category === 'sidebar').length})
          </button>
          <button
            onClick={() => setActiveTab('callouts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
              activeTab === 'callouts'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            5.2 The 7 Callout Types ({items.filter(i => i.category === 'callout').length})
          </button>
        </div>

        {/* QUICK ADD BUTTONS */}
        {activeTab === 'sidebars' ? (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400">Quick-Add Sidebar Type:</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {SIDEBAR_TYPES.map(st => (
                <button
                  key={st.type}
                  onClick={() => addItem('sidebar', st.type)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-left transition flex items-center justify-between group"
                >
                  <span className="font-bold text-amber-300 text-[11px] flex items-center gap-1.5">
                    <span>{st.icon}</span> {st.type}
                  </span>
                  <Plus className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400">Quick-Add In-Text Callout Box:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
              {CALLOUT_TYPES.map(ct => (
                <button
                  key={ct.type}
                  onClick={() => addItem('callout', ct.type)}
                  className={`p-2 rounded-lg border text-center font-bold text-[11px] transition hover:scale-[1.02] ${ct.color}`}
                >
                  + {ct.type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LIST OF CREATED SIDEBARS / CALLOUTS */}
        <div className="space-y-3 pt-2">
          {filteredItems.length === 0 ? (
            <div className="p-6 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-center text-xs text-slate-500">
              No {activeTab} added yet. Click any button above or use "AI Generate Marginalia".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="font-bold text-amber-300 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px]">
                      {item.type}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Placement (e.g. Chapter 4 Margin)"
                        value={item.placement}
                        onChange={e => updateItem(item.id, 'placement', e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-[10px] text-slate-400"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={item.title}
                    onChange={e => updateItem(item.id, 'title', e.target.value)}
                    placeholder="Sidebar / Callout Title"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-bold text-xs"
                  />

                  <textarea
                    rows={3}
                    value={item.content}
                    onChange={e => updateItem(item.id, 'content', e.target.value)}
                    placeholder="Sidebar body content..."
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
