import type { PressableStateCallbackType } from 'react-native';

import { galleryListItemStyles } from '@/modules/gallery/components/gallery-list-item/gallery-list-item.style';
import { posterTileStyles } from '@/modules/gallery/components/poster-tile/poster-tile.style';

export function getTileWrapStyle({ pressed }: PressableStateCallbackType) {
  return [posterTileStyles.tileWrap, pressed && posterTileStyles.tilePressed];
}

export function getBackButtonStyle({ pressed }: PressableStateCallbackType) {
  return [
    galleryListItemStyles.backButton,
    pressed && galleryListItemStyles.backButtonPressed,
  ];
}

export function getCalendarButtonStyle(isAddingToCalendar: boolean) {
  return ({ pressed }: PressableStateCallbackType) => [
    galleryListItemStyles.calendarButton,
    pressed && galleryListItemStyles.calendarButtonPressed,
    isAddingToCalendar && galleryListItemStyles.calendarButtonDisabled,
  ];
}
