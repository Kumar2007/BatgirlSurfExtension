import React from 'react';
import { Github, Settings, HelpCircle } from 'lucide-react';
import '../styles/footer.css';

const Footer: React.FC = () => {
  // Open extension options page
  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };

  // Open GitHub repository
  const openGitHub = () => {
    window.open('https://github.com/yourusername/batgirl-edge-surf');
  };

  // Open help page
  const openHelp = () => {
    window.open(chrome.runtime.getURL('help.html'));
  };

  return (
    <footer className="footer">
      <div className="footer-buttons">
        <button onClick={openGitHub} title="View source code on GitHub">
          <Github size={18} />
        </button>
        <button onClick={openSettings} title="Open advanced settings">
          <Settings size={18} />
        </button>
        <button onClick={openHelp} title="View help documentation">
          <HelpCircle size={18} />
        </button>
      </div>
      <div className="footer-text">
        <p>©2025 Batgirl Edge Surf | v1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;