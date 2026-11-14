import type { ImageSourcePropType } from 'react-native';

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  place: string;
  date: string;
  /** ISO datetime used for calendar export */
  startAt: string;
  image: ImageSourcePropType;
  description: string;
};

export type GalleryProps = {
  items: GalleryItem[];
  columns?: number;
  onItemPress?: (item: GalleryItem) => void;
};

export type PosterTileProps = {
  item: GalleryItem;
  index: number;
  onPress?: (item: GalleryItem) => void;
};

export type GalleryListItemProps = {
  item: GalleryItem;
  onBack?: () => void;
};
