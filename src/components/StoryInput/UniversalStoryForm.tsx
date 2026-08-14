import React from 'react';
import { FieldInputWrapper } from './FieldInputWrapper';
import { StoryInputFormData, FieldItem, StoryArchetype } from '../../types';
import { Sparkles, HelpCircle, Compass, Target, Shield, Flame, BookOpen } from 'lucide-react';

interface UniversalStoryFormProps {
  formData: StoryInputFormData;
  onChange: (updated: StoryInputFormData) => void;
  archetype: StoryArchetype;
  onSuggestField: (fieldName: string, label: string) => Promise<void>;
}

export const UniversalStoryForm: React.FC<UniversalStoryFormProps> = ({
  formData,
  onChange,
  archetype,
  onSuggestField,
}) => {
  const updateField = (key: keyof StoryInputFormData, fieldItem: FieldItem<any>) => {
    onChange({
      ...formData,
      [key]: fieldItem,
    });
  };

  const tones = [
    'Witty & Playful',
    'Satirical & Deadpan',
    'Dark & Unsettling',
    'Warm & Heartfelt',
    'Absurd & Surreal',
    'Literary & Reflective',
    'Atmospheric Noir',
    'Romantic & Yearning',
    'Suspenseful & Tense',
    'Epic & Mythic',
    'Philosophical & Thought-Provoking',
    'Fast-Paced Action & Kinetic',
  ];

  const endings = [
    'Happy & Uplifting',
    'Bittersweet & Poignant',
    'Tragic Revelation',
    'Hopeful but Incomplete',
    'Ambiguous & Open-Ended',
    'Shocking Twist',
    'Comic Irony',
    'Full-Circle / Thematic Symmetry',
    'Let AI Determine Organically',
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-4 rounded-2xl shadow-sm border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-sm tracking-tight text-white">
              Universal Story Foundation
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            The core narrative architecture. Leave fields blank to let AI assist, or write established facts to anchor your vision.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[11px] font-mono text-indigo-300 bg-indigo-900/60 px-2 py-1 rounded border border-indigo-700/50">
            Phase 1 • Core Engine
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Idea */}
        <div className="md:col-span-2">
          <FieldInputWrapper
            label="Core Idea / What is this book about?"
            description="Large free-text field describing the essence, premise, or concept of your project."
            placeholder="e.g. A corporate auditor discovers an AI system deleting real shipments to manufacture perfect efficiency scores, forcing him to choose between exposing the fraud or taking the credit..."
            field={formData.coreIdea}
            onChange={f => updateField('coreIdea', f)}
            onSuggestAi={() => onSuggestField('coreIdea', 'Core Story Idea')}
            multiline
            rows={3}
          />
        </div>

        {/* One-Sentence Premise */}
        <div className="md:col-span-2">
          <FieldInputWrapper
            label="One-Sentence Premise"
            description="The story reduced to its sharpest dramatic tension: Protagonist + Inciting Incident + Choice/Stakes."
            placeholder="e.g. When a disgraced inspector discovers the lighthouse keeper was murdered from the inside, he must decode a falsified shipping manifest before the tide washes away the evidence."
            field={formData.oneSentencePremise}
            onChange={f => updateField('oneSentencePremise', f)}
            onSuggestAi={() => onSuggestField('oneSentencePremise', 'One-Sentence Premise')}
          />
        </div>

        {/* Central Character */}
        <div>
          <FieldInputWrapper
            label="Central Character"
            description="Who is this story primarily about? (Name, role, primary identity)"
            placeholder="e.g. Silas Vance, Discredited Marine Insurance Investigator"
            field={formData.centralCharacter}
            onChange={f => updateField('centralCharacter', f)}
            onSuggestAi={() => onSuggestField('centralCharacter', 'Central Character')}
          />
        </div>

        {/* Unique Hook */}
        <div>
          <FieldInputWrapper
            label="Unique Hook / What makes this different?"
            description="The distinct angle, format invention, or thematic twist that sets this apart."
            placeholder="e.g. The story is told through official maritime inquiry logs that contradict each other as the pressure rises."
            field={formData.uniqueHook}
            onChange={f => updateField('uniqueHook', f)}
            onSuggestAi={() => onSuggestField('uniqueHook', 'Unique Hook')}
          />
        </div>

        {/* External Goal (Want) */}
        <div>
          <FieldInputWrapper
            label="External Goal (What does the character want?)"
            description="The tangible, external, measurable objective driving scene actions."
            placeholder="e.g. To recover the lost vessel logbook and win back his license."
            field={formData.characterWant}
            onChange={f => updateField('characterWant', f)}
            onSuggestAi={() => onSuggestField('characterWant', 'External Goal (Want)')}
          />
        </div>

        {/* Internal Need (Need) */}
        <div>
          <FieldInputWrapper
            label="Internal Need (What does the character really need?)"
            description="The emotional or moral realization required for genuine transformation."
            placeholder="e.g. To admit that his own silence five years ago allowed this corruption to take root."
            field={formData.characterNeed}
            onChange={f => updateField('characterNeed', f)}
            onSuggestAi={() => onSuggestField('characterNeed', 'Internal Need')}
          />
        </div>

        {/* Primary Obstacle */}
        <div>
          <FieldInputWrapper
            label="Primary Obstacle"
            description="What force, antagonist, institution, or environmental clock stands in the way?"
            placeholder="e.g. The harbor master syndicate who controls all outgoing telegraphs and harbor access."
            field={formData.obstacle}
            onChange={f => updateField('obstacle', f)}
            onSuggestAi={() => onSuggestField('obstacle', 'Primary Obstacle')}
          />
        </div>

        {/* Stakes */}
        <div>
          <FieldInputWrapper
            label="Stakes / Cost of Failure"
            description="What terrible, irreversible consequence occurs if the protagonist fails?"
            placeholder="e.g. An innocent boy is executed at dawn and the cartel takes permanent monopoly of the port."
            field={formData.stakes}
            onChange={f => updateField('stakes', f)}
            onSuggestAi={() => onSuggestField('stakes', 'Stakes & Cost of Failure')}
          />
        </div>

        {/* Tone Selection */}
        <div>
          <FieldInputWrapper
            label="Tone & Atmosphere"
            description="The primary tonal frequency of the narrative voice."
            field={formData.tone}
            onChange={f => updateField('tone', f)}
            options={tones}
            isSelect
          />
        </div>

        {/* Ending Preference */}
        <div>
          <FieldInputWrapper
            label="Ending Preference"
            description="How should the central conflict resolve in the final pages?"
            field={formData.endingPreference}
            onChange={f => updateField('endingPreference', f)}
            options={endings}
            isSelect
          />
        </div>
      </div>
    </div>
  );
};
