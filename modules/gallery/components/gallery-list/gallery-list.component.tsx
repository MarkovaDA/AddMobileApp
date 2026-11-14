import { useCallback } from 'react';
import { FlatList, type ListRenderItemInfo, Text } from 'react-native';

import { PosterTile } from '@/modules/gallery/components/poster-tile';
import { DEFAULT_GALLERY_COLUMNS, GALLERY_SECTION_LABEL } from '@/modules/gallery/constants';
import type { GalleryItem, GalleryProps } from '@/modules/gallery/types';
import { getGalleryItemKey } from '@/modules/gallery/utils';

import { galleryListStyles as styles } from './gallery-list.style';

const ListHeader = (
  <Text style={styles.sectionLabel}>{GALLERY_SECTION_LABEL}</Text>
);

export function GalleryListComponent({
  items,
  columns = DEFAULT_GALLERY_COLUMNS,
  onItemPress,
}: GalleryProps) {
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<GalleryItem>) => (
      <PosterTile item={item} index={index} onPress={onItemPress} />
    ),
    [onItemPress],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={getGalleryItemKey}
      numColumns={columns}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeader}
      renderItem={renderItem}
    />
  );
}
