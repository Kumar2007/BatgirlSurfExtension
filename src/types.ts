export enum CostumeVariant {
  CLASSIC = 'classic',
  MODERN = 'modern',
  BURNSIDE = 'burnside',
  ARKHAM = 'arkham'
}

export interface Settings {
  enabled: boolean;
  costumeVariant: CostumeVariant;
  capeAnimation: boolean;
  customColors: boolean;
  primaryColor: string;
  secondaryColor: string;
}

export interface SpriteMap {
  idle: string;
  surf: string;
  jump: string;
  crash: string;
}

export interface GameOverrides {
  spriteSheets: Record<string, string>;
  soundEffects?: Record<string, string>;
  gameColors?: Record<string, string>;
}

export type MessageAction = 
  | { action: 'updateSettings'; settings: Settings }
  | { action: 'getSettings' }
  | { action: 'injectSprites' };