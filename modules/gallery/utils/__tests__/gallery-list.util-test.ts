import { getGalleryItemKey } from '@/modules/gallery/utils';
import { mockGalleryItem } from '@/modules/gallery/__fixtures__/gallery-item.fixture';

describe('getGalleryItemKey', () => {
  test('returns item id', () => {
    expect(getGalleryItemKey(mockGalleryItem)).toBe('1');
  });
});
