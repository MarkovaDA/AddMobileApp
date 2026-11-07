import type { ImageSourcePropType } from 'react-native';

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  place: string;
  date: string;
  image: ImageSourcePropType;
};

export type GalleryProps = {
  items: GalleryItem[];
  columns?: number;
};

export type PosterTileProps = {
  item: GalleryItem;
  index: number;
};
