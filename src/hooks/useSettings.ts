import { useState, useEffect } from 'react';
import { Settings, CostumeVariant } from '../types';

// Default settings
const defaultSettings: Settings = {
  enabled: true,
  costumeVariant: CostumeVariant.CLASSIC,
  capeAnimation: true,
  customColors: false,
  primaryColor: '#7b1fa2',
  secondaryColor: '#ffd600',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on component mount
  useEffect(() => {
    chrome.storage.sync.get('batgirlSettings', (result) => {
      if (result.batgirlSettings) {
        setSettings(result.batgirlSettings);
      }
      setIsLoading(false);
    });
  }, []);

  // Save settings to chrome.storage
  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    chrome.storage.sync.set({ batgirlSettings: newSettings });
    
    // Send message to content script to update in real-time
    chrome.tabs.query({ url: 'edge://surf/*' }, (tabs) => {
      tabs.forEach(tab => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { 
            action: 'updateSettings', 
            settings: newSettings 
          });
        }
      });
    });
  };

  // Update a single setting
  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  return {
    settings,
    isLoading,
    saveSettings,
    updateSetting,
  };
}