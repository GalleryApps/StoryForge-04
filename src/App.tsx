import React, { useState } from 'react';
import { StoryProvider, useStory } from './context/StoryContext';
import { NavigationHeader } from './components/NavigationHeader';
import { BookEditor } from './components/BookEditor';
import { BookPreview } from './components/BookPreview';
import { MemoryEngineView } from './components/MemoryEngineView';
import { ManualInnovationLab } from './components/ManualInnovationLab';
import { StoryArchitectView } from './components/StoryInput/StoryArchitectView';
import { StyleManagerView } from './components/style-manager/StyleManagerView';
import { ReferenceStudioView } from './components/reference-studio/ReferenceStudioView';
import { ModelSettingsModal } from './components/ModelSettingsModal';
import { ExportModal } from './components/ExportModal';

const MainLayout: React.FC = () => {
  const { activeView, totalPageCount, book } = useStory();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showModelSettings, setShowModelSettings] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Studio Navigation */}
      <NavigationHeader
        onOpenExportModal={() => setShowExportModal(true)}
        onOpenModelSettings={() => setShowModelSettings(true)}
      />

      {/* Main Active Studio View */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {activeView === 'story_architect' && <StoryArchitectView />}
        {activeView === 'reference_studio' && <ReferenceStudioView />}
        {activeView === 'style_manager' && <StyleManagerView />}
        {activeView === 'editor' && <BookEditor />}
        {activeView === 'preview' && (
          <BookPreview onOpenExportModal={() => setShowExportModal(true)} />
        )}
        {activeView === 'memory_engine' && <MemoryEngineView />}
        {activeView === 'manual_lab' && <ManualInnovationLab />}
      </div>

      {/* Footer Status Bar */}
      <footer className="h-8 bg-white border-t border-slate-200 px-4 flex items-center justify-between text-[11px] text-slate-500 shrink-0 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            Sync Status: <span className="text-emerald-600 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> CLOUD PERSISTENT</span>
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-slate-500">Volume {book.volume || 1} • {totalPageCount} / {book.metadata.maxPageLimit || 500} Pages</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-slate-400">System Fonts Enabled • Creative Writing Engine</span>
          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono font-medium text-[10px]">
            StoryForge v2.4.0
          </span>
        </div>
      </footer>

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
      <ModelSettingsModal
        isOpen={showModelSettings}
        onClose={() => setShowModelSettings(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoryProvider>
      <MainLayout />
    </StoryProvider>
  );
}

