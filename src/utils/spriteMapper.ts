import { CostumeVariant, SpriteMap } from '../types';

// Maps each costume variant to its sprite files
export function getSpriteMap(variant: CostumeVariant): SpriteMap {
  const spriteMaps: Record<CostumeVariant, SpriteMap> = {
    classic: {
      idle: 'batgirl_classic_idle.png',
      surf: 'batgirl_classic_surf.png',
      jump: 'batgirl_classic_jump.png',
      crash: 'batgirl_classic_crash.png'
    },
    modern: {
      idle: 'batgirl_modern_idle.png',
      surf: 'batgirl_modern_surf.png',
      jump: 'batgirl_modern_jump.png',
      crash: 'batgirl_modern_crash.png'
    },
    burnside: {
      idle: 'batgirl_burnside_idle.png',
      surf: 'batgirl_burnside_surf.png',
      jump: 'batgirl_burnside_jump.png',
      crash: 'batgirl_burnside_crash.png'
    },
    arkham: {
      idle: 'batgirl_arkham_idle.png',
      surf: 'batgirl_arkham_surf.png',
      jump: 'batgirl_arkham_jump.png',
      crash: 'batgirl_arkham_crash.png'
    }
  };
  
  return spriteMaps[variant];
}

// Apply color customizations to sprites
export function applyCustomColors(spriteImage: HTMLImageElement, primaryColor: string, secondaryColor: string): HTMLCanvasElement {
  // Create a canvas to manipulate the sprite
  const canvas = document.createElement('canvas');
  canvas.width = spriteImage.width;
  canvas.height = spriteImage.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  
  // Draw the original sprite
  ctx.drawImage(spriteImage, 0, 0);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // The actual color replacement would be more complex
  // This is a simplified example
  for (let i = 0; i < data.length; i += 4) {
    // If purple (check for approximate purple color)
    if (data[i] > 100 && data[i+2] > 100 && data[i+1] < 100) {
      // Extract new color components
      const primaryRGB = hexToRgb(primaryColor);
      data[i] = primaryRGB.r;
      data[i+1] = primaryRGB.g;
      data[i+2] = primaryRGB.b;
    }
    
    // If yellow (check for approximate yellow color)
    if (data[i] > 200 && data[i+1] > 200 && data[i+2] < 100) {
      const secondaryRGB = hexToRgb(secondaryColor);
      data[i] = secondaryRGB.r;
      data[i+1] = secondaryRGB.g;
      data[i+2] = secondaryRGB.b;
    }
  }
  
  // Put the modified data back
  ctx.putImageData(imageData, 0, 0);
  
  return canvas;
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): { r: number, g: number, b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return { r, g, b };
}