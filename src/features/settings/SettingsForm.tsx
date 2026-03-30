'use client';
import { useSettings } from '@/hooks/useSettings';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

const AI_MODELS = [
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Recommended)' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
];

export function SettingsForm() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="preferred-model">Default AI Model</Label>
        <Select
          id="preferred-model"
          value={settings.preferredModel}
          onChange={e => updateSettings({ preferredModel: e.target.value })}
          className="w-full md:w-80"
        >
          {AI_MODELS.map(model => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </Select>
        <p className="text-xs text-muted-foreground">
          This model will be used for generating interview questions and feedback.
        </p>
      </div>
    </div>
  );
}
