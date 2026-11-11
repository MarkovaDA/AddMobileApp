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
  duration: 520,
  delayStep: 80,
  initialTranslateY: 28,
  initialScale: 0.94,
  tension: 70,
  friction: 10,
} as const;

export const DETAIL_ANIMATION = {
  duration: 360,
  dismissDuration: 280,
  swipeThreshold: 90,
  swipeVelocity: 0.45,
} as const;
