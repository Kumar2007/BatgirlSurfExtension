import React, { useState, useEffect } from 'react';
import './styles/popup.css';
import CostumeSelector from './components/CostumeSelector';
import SettingsPanel from './components/SettingsPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import { Settings, CostumeVariant } from './types';

const PopupApp: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    enabled: true,
    costumeVariant: CostumeVariant.CLASSIC,
    capeAnimation: true,
    customColors: false,
    primaryColor: '#7b1fa2',
    secondaryColor: '#ffd600',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load settings from storage
    chrome.storage.sync.get('batgirlSettings', (result) => {
      if (result.batgirlSettings) {
        setSettings(result.batgirlSettings);
      }
      setIsLoading(false);
    });
  }, []);

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

  const handleToggleEnabled = () => {
    const newSettings = { ...settings, enabled: !settings.enabled };
    saveSettings(newSettings);
  };

  const handleCostumeChange = (variant: CostumeVariant) => {
    const newSettings = { ...settings, costumeVariant: variant };
    saveSettings(newSettings);
  };

  const handleCapeAnimationToggle = () => {
    const newSettings = { ...settings, capeAnimation: !settings.capeAnimation };
    saveSettings(newSettings);
  };

  const handleCustomColorsToggle = () => {
    const newSettings = { ...settings, customColors: !settings.customColors };
    saveSettings(newSettings);
  };

  const handleColorChange = (colorType: 'primaryColor' | 'secondaryColor', color: string) => {
    const newSettings = { ...settings, [colorType]: color };
    saveSettings(newSettings);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="popup-container">
      <Header enabled={settings.enabled} onToggle={handleToggleEnabled} />
      
      <main className="popup-content">
        <section className="section-costume">
          <h2>Costume Variant</h2>
          <CostumeSelector 
            selected={settings.costumeVariant}
            onChange={handleCostumeChange}
            disabled={!settings.enabled}
          />
        </section>
        
        <section className="section-settings">
          <h2>Settings</h2>
          <SettingsPanel 
            settings={settings}
            onCapeAnimationToggle={handleCapeAnimationToggle}
            onCustomColorsToggle={handleCustomColorsToggle}
            onColorChange={handleColorChange}
            disabled={!settings.enabled}
          />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PopupApp;