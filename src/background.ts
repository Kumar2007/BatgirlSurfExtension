// Background script for the Batgirl Edge Surf extension
import { Settings, MessageAction } from './types';

// Default settings
const defaultSettings: Settings = {
  enabled: true,
  costumeVariant: 'classic',
  capeAnimation: true,
  customColors: false,
  primaryColor: '#7b1fa2',
  secondaryColor: '#ffd600',
};

// Initialize settings on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('batgirlSettings', (result) => {
    if (!result.batgirlSettings) {
      chrome.storage.sync.set({ batgirlSettings: defaultSettings });
      console.log('Initialized default settings');
    }
  });
});

// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener((message: MessageAction, sender, sendResponse) => {
  console.log('Background received message:', message);

  if (message.action === 'getSettings') {
    chrome.storage.sync.get('batgirlSettings', (result) => {
      sendResponse(result.batgirlSettings || defaultSettings);
    });
    return true; // Keep the messaging channel open for async response
  }
});

// Listen for when the Edge Surf game is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('edge://surf')) {
    console.log('Edge Surf game detected');
    
    // Inject the content script if it hasn't been already
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js']
    }).catch(err => console.error('Failed to inject content script:', err));
  }
});