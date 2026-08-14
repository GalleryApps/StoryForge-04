import React, { useState } from 'react';
import { 
  Upload, 
  User, 
  Brush, 
  Shuffle, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Lock, 
  Unlock, 
  Eye, 
  Palette,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { ReferenceUploadManager } from './ReferenceUploadManager';
import { CharacterSetManager } from './CharacterSetManager';
import { ArtStyleAnalyzerPanel } from './ArtStyleAnalyzerPanel';
import { StyleMixerPanel } from './StyleMixerPanel';
import { ConsistencyAuditPanel } from './ConsistencyAuditPanel';
import { GenrePresetsPanel } from './GenrePresetsPanel';
import { ChapterSceneOverridesPanel } from './ChapterSceneOverridesPanel';
import { VisualReferenceCategory } from '../../types';

type StudioSubTab = 'uploads' | 'characters' | 'art_bible' | 'mixer' | 'audit' | 'genres' | 'overrides';

export const ReferenceStudioView: React.FC = () => {
  const { 
    referenceStudio, 
    updateReferenceStudio, 
    buildVisualBibleOneClickAi,
    runVisualConsistencyAuditAi,
    isAiGenerating,
    aiStatusMessage 
  } = useStory();

  const [activeTab, setActiveTab] = useState<StudioSubTab>('uploads');
  const [activeUploadCategory, setActiveUploadCategory] = useState<VisualReferenceCategory | 'all'>('all');

  const matchReferences = referenceStudio?.matchMyReferences ?? true;
  const isArtLocked = referenceStudio?.masterArtBible?.isLocked ?? false;
  const characterCount = referenceStudio?.characters?.length || 0;
  const referenceCount = referenceStudio?.references?.length || 0;

  const SUB_TABS: { id: StudioSubTab; label: string; icon: any; badge?: string | number }[] = [
    { id: 'uploads', label: 'Reference Uploads', icon: Upload, badge: referenceCount },
    { id: 'characters', label: 'Character Cards & Locks', icon: User, badge: characterCount },
    { id: 'art_bible', label: 'Master Art Bible (16 Criteria)', icon: Brush, badge: isArtLocked ? 'LOCKED' : undefined },
    { id: 'mixer', label: 'Style Mixer', icon: Shuffle },
    { id: 'audit', label: 'Consistency Audit', icon: ShieldCheck, badge: referenceStudio.latestAuditReport?.score ? `${referenceStudio.latestAuditReport.score}%` : undefined },
    { id: 'genres', label: 'Genre Art Guides', icon: BookOpen },
    { id: 'overrides', label: 'Overrides & Priorities', icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Studio Header & Global Action Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Visual Identity Engine
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
                Reference Studio
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 text-xs font-mono">
                Genre: {(referenceStudio?.activeGenre || 'illustrated_novel').replace(/_/g, ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Upload character concept art, style guides, and palette references. The author provides the visual DNA; AI illustrations strictly conform to your visual system across all chapters.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Match My References Master Lock Switch */}
            <button
              onClick={() => updateReferenceStudio(prev => ({ ...prev, matchMyReferences: !prev.matchMyReferences }))}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                matchReferences
                  ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/20'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
              }`}
            >
              {matchReferences ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{matchReferences ? 'MATCH REFERENCES: ON' : 'MATCH REFERENCES: OFF'}</span>
            </button>

            {/* 1-Click Build Complete Visual Bible */}
            <button
              onClick={() => buildVisualBibleOneClickAi()}
              disabled={isAiGenerating}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>1-Click Build Visual Bible</span>
            </button>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-zinc-800/80 pt-4 scrollbar-none">
          {SUB_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-amber-400 border border-amber-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-amber-500/20 text-amber-300 font-bold' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Status Banner when generating */}
      {isAiGenerating && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-3 animate-pulse">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
          <div>
            <span className="text-xs font-bold text-amber-300">Reference Studio AI Engine Active: </span>
            <span className="text-xs text-zinc-300">{aiStatusMessage || 'Processing visual references...'}</span>
          </div>
        </div>
      )}

      {/* Tab Panels */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 shadow-sm">
        {activeTab === 'uploads' && (
          <ReferenceUploadManager
            activeCategory={activeUploadCategory}
            onCategoryChange={setActiveUploadCategory}
          />
        )}

        {activeTab === 'characters' && (
          <CharacterSetManager />
        )}

        {activeTab === 'art_bible' && (
          <ArtStyleAnalyzerPanel />
        )}

        {activeTab === 'mixer' && (
          <StyleMixerPanel />
        )}

        {activeTab === 'audit' && (
          <ConsistencyAuditPanel />
        )}

        {activeTab === 'genres' && (
          <GenrePresetsPanel />
        )}

        {activeTab === 'overrides' && (
          <ChapterSceneOverridesPanel />
        )}
      </div>
    </div>
  );
};
