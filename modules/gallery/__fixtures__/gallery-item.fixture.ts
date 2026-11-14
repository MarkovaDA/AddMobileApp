import type { GalleryItem } from '@/modules/gallery/types';

export const mockGalleryItem: GalleryItem = {
  id: '1',
  title: 'Kremlin Lights',
  category: 'Tour',
  place: 'Moscow Kremlin',
  date: 'Nov 12',
  startAt: '2026-11-12T18:00:00+03:00',
  image: 1,
  description: 'An evening walk along the Kremlin walls.',
};

export const mockGalleryItems: GalleryItem[] = [
  mockGalleryItem,
  {
    ...mockGalleryItem,
    id: '2',
    title: 'Red Square Walk',
    category: 'City',
    place: 'Red Square',
  },
];
