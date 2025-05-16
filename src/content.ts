// Content script for the Batgirl Edge Surf extension
import { Settings, CostumeVariant, GameOverrides } from './types';
import { getSpriteMap } from './utils/spriteMapper';

let settings: Settings;
let gameCanvas: HTMLCanvasElement | null = null;
let isInjected = false;

// Load settings from storage
function loadSettings() {
  return new Promise<Settings>((resolve) => {
    chrome.storage.sync.get('batgirlSettings', (result) => {
      settings = result.batgirlSettings || {
        enabled: true,
        costumeVariant: CostumeVariant.CLASSIC,
        capeAnimation: true,
        customColors: false,
        primaryColor: '#7b1fa2',
        secondaryColor: '#ffd600',
      };
      resolve(settings);
    });
  });
}

// Find the game canvas element
function findGameCanvas() {
  gameCanvas = document.querySelector('canvas');
  return !!gameCanvas;
}

// Override the game's character sprites
function overrideCharacterSprites() {
  if (!settings.enabled || isInjected) return;

  // Get sprite map for the selected costume variant
  const spriteMap = getSpriteMap(settings.costumeVariant);
  
  // Apply overrides
  const gameOverrides: GameOverrides = {
    spriteSheets: {
      'player_idle.png': spriteMap.idle,
      'player_surf.png': spriteMap.surf,
      'player_jump.png': spriteMap.jump,
      'player_crash.png': spriteMap.crash,
    }
  };

  // Get original fetch
  const originalFetch = window.fetch;

  // Override fetch to intercept sprite requests
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
    const url = input.toString();
    
    // Check if this is a request for a sprite we want to override
    for (const [originalSprite, replacementSprite] of Object.entries(gameOverrides.spriteSheets)) {
      if (url.includes(originalSprite)) {
        console.log(`Intercepted request for ${originalSprite}, replacing with Batgirl sprite`);
        return originalFetch(chrome.runtime.getURL(`assets/sprites/${settings.costumeVariant}/${replacementSprite}`));
      }
    }
    
    // Pass through all other requests
    return originalFetch(input, init);
  };

  // Apply cape animation if enabled
  if (settings.capeAnimation && gameCanvas) {
    applyCapeAnimation(gameCanvas);
  }

  isInjected = true;
  console.log('Batgirl character successfully injected!');
}

// Apply cape animation
function applyCapeAnimation(canvas: HTMLCanvasElement) {
  // This would implement the cape animation using the canvas API
  // This is a placeholder for the actual implementation
  console.log('Cape animation applied');
}

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateSettings') {
    settings = message.settings;
    // Re-apply sprite overrides with new settings
    if (findGameCanvas()) {
      overrideCharacterSprites();
    }
    sendResponse({ success: true });
  }
});

// Initialize when the content script loads
async function init() {
  try {
    await loadSettings();
    
    // Wait for the game to fully load
    const checkGameLoaded = setInterval(() => {
      if (findGameCanvas()) {
        clearInterval(checkGameLoaded);
        overrideCharacterSprites();
      }
    }, 500);
  } catch (error) {
    console.error('Error initializing Batgirl extension:', error);
  }
}

// Start initialization
init();