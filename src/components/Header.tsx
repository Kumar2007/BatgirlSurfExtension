import React from 'react';
import { Bat } from 'lucide-react';
import '../styles/header.css';

interface HeaderProps {
  enabled: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ enabled, onToggle }) => {
  return (
    <header className="header">
      <div className="logo">
        <Bat size={28} className="bat-icon" />
        <h1>Batgirl for Edge Surf</h1>
      </div>
      <div className="main-toggle">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={enabled}
            onChange={onToggle}
          />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">{enabled ? 'Enabled' : 'Disabled'}</span>
      </div>
    </header>
  );
};

export default Header;