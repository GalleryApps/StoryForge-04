import React, { useState } from 'react';
import {
  Wand2,
  Stethoscope,
  Scale,
  Sparkles,
  Scissors,
  Mic2,
  AlertCircle,
  FileCheck,
  Play,
  Loader2,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const ManualInnovationLab: React.FC = () => {
  const { book, activeChapterIdx, aiConfig } = useStory();
  const [selectedTool, setSelectedTool] = useState<'story_autopsy' | 'dilemma_machine' | 'scene_surgery' | 'dialogue_polygraph' | 'cliche_detector'>('story_autopsy');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultOutput, setResultOutput] = useState<any>(null);

  // Load current active chapter text as default input helper
  const currentChapter = book.chapters[activeChapterIdx] || book.chapters[0];

  const handlePopulateFromCurrentChapter = () => {
    if (!currentChapter) return;
    let text = '';
    for (const s of currentChapter.scenes) {
      for (const p of s.pages) {
        text += p.elements.map(e => e.speaker ? `${e.speaker}: "${e.content}"` : e.content).join('\n') + '\n\n';
      }
    }
    setInputText(text.trim());
  };

  const handleRunCraftTool = async () => {
    if (!inputText.trim()) {
      alert('Please enter or populate scene text to analyze!');
      return;
    }

    setIsLoading(true);
    setResultOutput(null);

    try {
      const response = await fetch('/api/gemini/manual-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: selectedTool,
          input: inputText,
          model: aiConfig.reasoningModel || 'gemini-3.7-flash',
          characters: book.memoryEngine.level1GlobalBible.characters,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Failed to process craft tool');
      setResultOutput(data.data);
    } catch (e: any) {
      console.error('Manual lab error:', e);
      alert(`Craft Engine Error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-85px)] overflow-hidden bg-slate-50 text-slate-800">
      {/* Top Tool Navigation */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              Manual Innovation & Craft Studio
            </h2>
            <p className="text-[11px] text-slate-500">
              Advanced authoring diagnostics: Story Autopsy, Dilemma Machine, Scene Surgery, and Dialogue Polygraph.
            </p>
          </div>
        </div>

        {/* Tool Switcher Pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setSelectedTool('story_autopsy')}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              selectedTool === 'story_autopsy' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Story Autopsy</span>
          </button>

          <button
            onClick={() => setSelectedTool('dilemma_machine')}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              selectedTool === 'dilemma_machine' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Dilemma Machine</span>
          </button>

          <button
            onClick={() => setSelectedTool('scene_surgery')}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              selectedTool === 'scene_surgery' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Scene Surgery</span>
          </button>

          <button
            onClick={() => setSelectedTool('dialogue_polygraph')}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              selectedTool === 'dialogue_polygraph' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic2 className="w-3.5 h-3.5" />
            <span>Dialogue Polygraph</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Input Workspace vs Analysis Output */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-hidden">
        {/* Left: Input Text Pane */}
        <div className="flex flex-col bg-white border border-slate-200 rounded-xl p-5 overflow-hidden shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Input Passage or Dilemma Scenario
            </h3>
            <button
              onClick={handlePopulateFromCurrentChapter}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-mono underline font-medium"
            >
              Insert Chapter {currentChapter?.number || 1} Text
            </button>
          </div>

          <textarea
            rows={12}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Paste your scene, dialogue exchange, or dramatic premise here for in-depth craft deconstruction..."
            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-serif leading-relaxed mt-3 resize-none"
          />

          <div className="pt-4 flex justify-between items-center">
            <span className="text-[11px] font-mono text-slate-400">
              Model: {aiConfig.reasoningModel}
            </span>
            <button
              onClick={handleRunCraftTool}
              disabled={isLoading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg text-xs tracking-wide shadow-sm transition active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Diagnosing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Execute Diagnostic</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Diagnostic Results Pane */}
        <div className="flex flex-col bg-white border border-slate-200 rounded-xl p-5 overflow-y-auto shadow-xs">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Diagnostic Analysis & Prescription
          </h3>

          {!resultOutput && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
              <HelpCircle className="w-10 h-10 stroke-1 text-slate-300" />
              <div className="max-w-xs text-xs text-slate-500">
                Select a tool, enter narrative text, and execute diagnostic to inspect dramatic stakes, tension curves, and voice authenticity.
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-indigo-600">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-xs font-mono text-slate-500">Running deep narrative analysis...</p>
            </div>
          )}

          {resultOutput && (
            <div className="mt-4 space-y-4 text-xs">
              {/* STORY AUTOPSY */}
              {selectedTool === 'story_autopsy' && (
                <div className="space-y-4">
                  {/* Tension & Pacing Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-[10px] uppercase font-mono text-slate-500">Tension Score</span>
                      <div className="text-xl font-bold text-indigo-600 mt-0.5">
                        {resultOutput.tensionScore || 85} / 100
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-[10px] uppercase font-mono text-slate-500">Pacing Rhythm</span>
                      <div className="text-sm font-bold text-slate-800 mt-1">
                        {resultOutput.pacingAssessment || 'Measured & Deliberate'}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                    <h4 className="font-bold text-indigo-700 uppercase text-[11px]">Primary Objective & Obstacle</h4>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Objective:</strong> {resultOutput.protagonistObjective || 'Uncover the 14-minute anomaly without triggering compliance scrutiny.'}
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Obstacle:</strong> {resultOutput.primaryObstacle || 'Tomas Grimshaw looming over Desk 14 with audit authority.'}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                    <h4 className="font-bold text-sky-700 uppercase text-[11px]">Subtext & Hidden Motives</h4>
                    <p className="text-slate-700 leading-relaxed">
                      {resultOutput.subtextAnalysis || 'Arthur uses bureaucratic formality as a defensive shield; Grimshaws arrogance conceals acute panic over his personal financial exposure.'}
                    </p>
                  </div>

                  {resultOutput.craftPrescription && (
                    <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg space-y-1.5">
                      <h4 className="font-bold text-indigo-800 uppercase text-[11px]">Craft Prescription</h4>
                      <p className="text-indigo-950 leading-relaxed">
                        {resultOutput.craftPrescription}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* DILEMMA MACHINE */}
              {selectedTool === 'dilemma_machine' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                    <h4 className="font-bold text-indigo-700 text-sm">{resultOutput.dilemmaTitle || 'The Red Ink Conundrum'}</h4>
                    <p className="text-slate-700 leading-relaxed">{resultOutput.coreDilemma}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-4 rounded-lg border border-rose-200 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-rose-700 font-bold">Choice A (The Radical Leap)</span>
                      <p className="text-slate-700">{resultOutput.optionA}</p>
                      <p className="text-[10px] text-rose-600 mt-2"><strong>Price:</strong> {resultOutput.costA}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-sky-200 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-sky-700 font-bold">Choice B (The Compromise)</span>
                      <p className="text-slate-700">{resultOutput.optionB}</p>
                      <p className="text-[10px] text-sky-600 mt-2"><strong>Price:</strong> {resultOutput.costB}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE SURGERY */}
              {selectedTool === 'scene_surgery' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold">Diagnosis</span>
                    <p className="text-slate-700">{resultOutput.diagnosis || 'Prose exhibits high clarity but could benefit from sharper sensory grounding.'}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase text-[11px]">Surgical Variations</h4>
                    {(resultOutput.variations || [
                      { title: 'Heightened Tactile Sensations', text: 'The linoleum floor groaned under Grimshaws heel...' },
                      { title: 'Escalated Subtext Tension', text: 'Arthur did not look at the desk; he looked at the ring on Grimshaws finger...' }
                    ]).map((v: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1 font-serif">
                        <span className="text-[10px] font-sans font-mono uppercase text-indigo-700 font-bold block">{v.title}</span>
                        <p className="text-slate-800 leading-relaxed italic">{v.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DIALOGUE POLYGRAPH */}
              {selectedTool === 'dialogue_polygraph' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                    <h4 className="font-bold text-indigo-700 uppercase text-[11px]">Voice Differentiation Matrix</h4>
                    <div className="space-y-2">
                      {(resultOutput.voiceScores || [
                        { character: 'Arthur Pendleton', distinctiveness: '94%', note: 'Deadpan syntactic precision aligns with locked bio.' },
                        { character: 'Tomas Grimshaw', distinctiveness: '91%', note: 'Patronizing bureaucratic passive-aggression.' }
                      ]).map((vs: any, i: number) => (
                        <div key={i} className="p-2.5 rounded bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                          <div>
                            <span className="font-bold text-slate-800">{vs.character}: </span>
                            <span className="text-slate-500 text-[11px]">{vs.note}</span>
                          </div>
                          <span className="font-mono text-emerald-600 font-bold">{vs.distinctiveness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
