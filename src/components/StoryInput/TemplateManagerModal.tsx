import React, { useState } from 'react';
import {
  Bookmark,
  Plus,
  Trash2,
  Check,
  X,
  FileText,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { StoryTemplate, StoryArchetype } from '../../types';

interface TemplateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: StoryTemplate[];
  onSaveCurrentAsTemplate: (name: string, description: string) => void;
  onLoadTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => void;
  currentArchetype: StoryArchetype;
}

export const TemplateManagerModal: React.FC<TemplateManagerModalProps> = ({
  isOpen,
  onClose,
  templates,
  onSaveCurrentAsTemplate,
  onLoadTemplate,
  onDeleteTemplate,
  currentArchetype,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'save'>('browse');
  const [templateName, setTemplateName] = useState('');
  const [templateDesc, setTemplateDesc] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim()) return;
    onSaveCurrentAsTemplate(templateName.trim(), templateDesc.trim());
    setSuccessMsg('Template saved successfully!');
    setTemplateName('');
    setTemplateDesc('');
    setTimeout(() => {
      setSuccessMsg(null);
      setActiveTab('browse');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg">
              <Bookmark className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight text-white">
                Story Input Templates
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Save your story structures or load pre-architected genre foundations.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === 'browse'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Browse Templates ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('save')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1 ${
              activeTab === 'save'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Save Current Form as Template
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'browse' ? (
            <div className="space-y-3">
              {templates.map(tmpl => (
                <div
                  key={tmpl.id}
                  className="p-4 bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 rounded-xl transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-800">{tmpl.name}</h4>
                      {tmpl.isBuiltIn ? (
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                          BUILT-IN
                        </span>
                      ) : (
                        <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-semibold">
                          CUSTOM
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 capitalize">
                        • {(tmpl.archetype || 'novel').replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{tmpl.description}</p>
                    {tmpl.data.coreIdea?.value && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                        &quot;{tmpl.data.coreIdea.value}&quot;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onLoadTemplate(tmpl.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
                    >
                      <span>Load</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {!tmpl.isBuiltIn && (
                      <button
                        type="button"
                        onClick={() => onDeleteTemplate(tmpl.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete custom template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4 max-w-lg mx-auto py-2">
              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  required
                  value={templateName}
                  onChange={e => setTemplateName(e.target.value)}
                  placeholder="e.g. My Gothic Mystery Framework"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={templateDesc}
                  onChange={e => setTemplateDesc(e.target.value)}
                  placeholder="Brief note on what this template focuses on (e.g. Dual timeline, locked-room puzzle structure)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-y"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                <span className="font-bold block mb-1">Template will capture:</span>
                • Current genre: <strong className="capitalize">{(currentArchetype || 'genre').replace(/_/g, ' ')}</strong><br />
                • All established user facts, preferences, and filled fields.
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Save Template</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
