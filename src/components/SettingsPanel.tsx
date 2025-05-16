import React from 'react';
import { Settings } from '../types';
import '../styles/settings-panel.css';

interface SettingsPanelProps {
  settings: Settings;
  onCapeAnimationToggle: () => void;
  onCustomColorsToggle: () => void;
  onColorChange: (colorType: 'primaryColor' | 'secondaryColor', color: string) => void;
  disabled: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onCapeAnimationToggle,
  onCustomColorsToggle,
  onColorChange,
  disabled
}) => {
  return (
    <div className={`settings-panel ${disabled ? 'disabled' : ''}`}>
      <div className="setting-item">
        <div className="setting-label">
          <label>Cape Animation</label>
          <p className="setting-description">Enable flowing cape animation during gameplay</p>
        </div>
        <div className="setting-control">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={settings.capeAnimation}
              onChange={onCapeAnimationToggle}
              disabled={disabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <label>Custom Colors</label>
          <p className="setting-description">Enable custom color selection for the costume</p>
        </div>
        <div className="setting-control">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={settings.customColors}
              onChange={onCustomColorsToggle}
              disabled={disabled}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {settings.customColors && (
        <div className="color-settings">
          <div className="color-picker-group">
            <label>Primary Color</label>
            <input 
              type="color" 
              value={settings.primaryColor}
              onChange={(e) => onColorChange('primaryColor', e.target.value)}
              disabled={disabled}
            />
          </div>
          <div className="color-picker-group">
            <label>Secondary Color</label>
            <input 
              type="color" 
              value={settings.secondaryColor}
              onChange={(e) => onColorChange('secondaryColor', e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;