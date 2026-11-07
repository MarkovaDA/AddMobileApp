export const DEFAULT_GALLERY_COLUMNS = 2;

export const GALLERY_GAP = 14;

export const GALLERY_SECTION_LABEL = 'Moscow spots';

export const TILE_ASPECT_RATIO = 1 / 1.2;

export const TILE_GRADIENT_COLORS = [
  'rgba(10,11,15,0.15)',
  'rgba(10,11,15,0.35)',
  'rgba(10,11,15,0.92)',
] as const;

export const TILE_GRADIENT_LOCATIONS = [0, 0.45, 1] as const;

export const TILE_ANIMATION = {
  duration: 420,
  delayStep: 70,
  initialTranslateY: 18,
} as const;
