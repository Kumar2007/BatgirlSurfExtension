import React from 'react';
import { CostumeVariant } from '../types';
import '../styles/costume-selector.css';

interface CostumeSelectorProps {
  selected: CostumeVariant;
  onChange: (variant: CostumeVariant) => void;
  disabled: boolean;
}

const CostumeSelector: React.FC<CostumeSelectorProps> = ({ selected, onChange, disabled }) => {
  const costumes = [
    { 
      id: CostumeVariant.CLASSIC, 
      name: 'Classic', 
      description: 'The iconic purple and yellow costume from the Silver Age' 
    },
    { 
      id: CostumeVariant.MODERN, 
      name: 'Modern', 
      description: 'The updated black and yellow design from recent comics' 
    },
    { 
      id: CostumeVariant.BURNSIDE, 
      name: 'Burnside', 
      description: 'The hipster-inspired purple costume with yellow accents' 
    },
    { 
      id: CostumeVariant.ARKHAM, 
      name: 'Arkham Knight', 
      description: 'Sleek, armored design from the Arkham Knight game' 
    }
  ];

  return (
    <div className="costume-selector">
      <div className="costume-grid">
        {costumes.map((costume) => (
          <div 
            key={costume.id}
            className={`costume-card ${selected === costume.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && onChange(costume.id)}
          >
            <div className="costume-image">
              <div className={`costume-preview ${costume.id}`}></div>
            </div>
            <div className="costume-info">
              <h3>{costume.name}</h3>
              <p>{costume.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostumeSelector;