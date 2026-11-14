import type { GalleryItem } from '@/modules/gallery/types';

export function getGalleryItemKey(item: GalleryItem) {
  return item.id;
}
