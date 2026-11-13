import type { ComponentType } from 'react';
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

export type EventListProps = GalleryProps;

export type PosterTileProps = {
  item: GalleryItem;
  index: number;
  onPress?: (item: GalleryItem) => void;
};

export type GalleryListItemProps = {
  item: GalleryItem;
  onBack?: () => void;
};

export type GalleryModuleType = {
  declarations: {
    GalleryComponent: ComponentType<GalleryProps>;
    EventListComponent: ComponentType<EventListProps>;
    GalleryListItemComponent: ComponentType<GalleryListItemProps>;
  };
  exports: {
    GalleryComponent: ComponentType<GalleryProps>;
    GalleryListItemComponent: ComponentType<GalleryListItemProps>;
  };
  bootstrap: ComponentType<GalleryProps>;
};
