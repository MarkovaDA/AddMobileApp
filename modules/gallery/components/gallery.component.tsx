import { DEFAULT_GALLERY_COLUMNS } from '@/constants';
import type { GalleryProps } from '../types';
import { EventListComponent } from './event-list.component';

export function GalleryComponent({
  items,
  columns = DEFAULT_GALLERY_COLUMNS,
  onItemPress,
}: GalleryProps) {
  return (
    <EventListComponent
      items={items}
      columns={columns}
      onItemPress={onItemPress}
    />
  );
}
