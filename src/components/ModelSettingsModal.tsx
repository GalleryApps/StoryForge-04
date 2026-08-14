import React from 'react';
import {
  Sliders,
  Sparkles,
  Check,
  X,
  Cpu,
  Image as ImageIcon,
  Zap,
  Brain,
  ShieldAlert
} from 'lucide-react';
import { useStory } from '../context/StoryContext';

interface ModelSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelSettingsModal: React.FC<ModelSettingsModalProps> = ({ isOpen, onClose }) => {
  const { aiConfig, setAiConfig } = useStory();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                AI Model Routing & Studio Orchestration
              </h3>
              <p className="text-[11px] text-slate-500">
                Configure Gemini models per functional role across the publishing suite.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Model Role Selectors */}
        <div className="space-y-4 text-xs">
          {/* Text Generation Role */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                Primary Prose & Chapter Model
              </label>
              <span className="text-[10px] font-mono text-slate-400">Long-form narrative</span>
            </div>
            <select
              value={aiConfig.textModel}
              onChange={e => setAiConfig(prev => ({ ...prev, textModel: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-md p-2 text-slate-900 focus:outline-none focus:border-indigo-500"
            >
              <option value="gemini-3.7-flash">gemini-3.7-flash (Recommended Default & Fast Prose)</option>
              <option value="gemini-2.5-pro">gemini-2.5-pro (High Complexity & Literary Density)</option>
              <option value="gemini-2.5-flash">gemini-2.5-flash (Standard High Speed)</option>
            </select>
          </div>

          {/* Image Generation Role */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                Illustration & Cover Art Model
              </label>
              <span className="text-[10px] font-mono text-slate-400">Visual style locked</span>
            </div>
            <select
              value={aiConfig.imageModel}
              onChange={e => setAiConfig(prev => ({ ...prev, imageModel: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-md p-2 text-slate-900 focus:outline-none focus:border-indigo-500"
            >
              <option value="gemini-3.1-flash-image">gemini-3.1-flash-image (High Quality Illustration)</option>
              <option value="imagen-3.0-generate-002">imagen-3.0-generate-002 (Photorealistic & Painterly)</option>
            </select>
          </div>

          {/* Fast Fact Extraction Role */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                Continuity & Fact Extraction Model
              </label>
              <span className="text-[10px] font-mono text-slate-400">Background sync</span>
            </div>
            <select
              value={aiConfig.fastModel}
              onChange={e => setAiConfig(prev => ({ ...prev, fastModel: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-md p-2 text-slate-900 focus:outline-none focus:border-indigo-500"
            >
              <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra-low latency extraction)</option>
              <option value="gemini-3.7-flash">gemini-3.7-flash (Balanced extraction)</option>
            </select>
          </div>

          {/* Craft Reasoning Role */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-indigo-600" />
                Craft Lab & Dilemma Reasoning Model
              </label>
              <span className="text-[10px] font-mono text-slate-400">Deep analysis</span>
            </div>
            <select
              value={aiConfig.reasoningModel}
              onChange={e => setAiConfig(prev => ({ ...prev, reasoningModel: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-md p-2 text-slate-900 focus:outline-none focus:border-indigo-500"
            >
              <option value="gemini-3.7-flash">gemini-3.7-flash (Thinking & Deep Subtext Analysis)</option>
              <option value="gemini-2.5-pro">gemini-2.5-pro (Extended Context & Complex Themes)</option>
            </select>
          </div>

          {/* Temperature Slider */}
          <div className="pt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Creativity / Temperature: {aiConfig.temperature}</span>
              <span className="text-slate-400 font-mono">0.0 (Strict) - 1.0 (Expressive)</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={1.0}
              step={0.05}
              value={aiConfig.temperature}
              onChange={e => setAiConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition active:scale-95"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
