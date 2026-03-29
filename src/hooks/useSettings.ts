'use client';
import { useState, useEffect } from 'react';

interface AppSettings {
  preferredModel: string;
  theme: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  preferredModel: 'gemini-2.5-flash',
  theme: 'system',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('interviewforge-settings');
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const updateSettings = (updates: Partial<AppSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem('interviewforge-settings', JSON.stringify(newSettings));
  };

  return { settings, updateSettings };
}
