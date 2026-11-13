import { lazy, Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { appStyles as styles } from '@/styles';
import { colors } from '@/theme';
import type { GalleryModuleType, GalleryProps } from './types';
import {
  EventListComponent,
  GalleryComponent,
  GalleryListItemComponent,
} from './components';

/**
 * Angular-style feature module for Gallery.
 * Lazy-load via: import('./gallery.module').then((m) => m.GalleryModule)
 */
export const GalleryModule: GalleryModuleType = {
  declarations: {
    GalleryComponent,
    EventListComponent,
    GalleryListItemComponent,
  },
  exports: {
    GalleryComponent,
    GalleryListItemComponent,
  },
  /** Entry component used by loadChildren / React.lazy */
  bootstrap: GalleryComponent,
};

/**
 * Angular-like loadChildren entry for the Gallery module.
 */
const loadGalleryModule = () =>
  import('./components/gallery.component').then((m) => ({
    default: m.GalleryComponent,
  }));

const LazyGalleryComponent = lazy(loadGalleryModule);

function GalleryModuleFallback() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator color={colors.accent} size="large" />
    </View>
  );
}

const galleryModuleFallback = <GalleryModuleFallback />;

export function LoadGalleryModule(props: GalleryProps) {
  return (
    <Suspense fallback={galleryModuleFallback}>
      <LazyGalleryComponent {...props} />
    </Suspense>
  );
}

export {
  EventListComponent,
  GalleryComponent,
  GalleryListItemComponent,
};

export default GalleryModule;
