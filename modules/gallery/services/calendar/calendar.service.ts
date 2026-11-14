import { Alert, Linking, Platform } from 'react-native';

import type { GalleryItem } from '@/modules/gallery/types';
import { buildGoogleCalendarUrl, getEventWindow } from '@/modules/gallery/utils';

const TIME_ZONE = 'Europe/Moscow';

async function openGoogleCalendar(item: GalleryItem) {
  const url = buildGoogleCalendarUrl(item);
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Unable to open calendar link');
  }

  await Linking.openURL(url);
}

async function addWithDeviceCalendar(item: GalleryItem) {
  const Calendar = await import('expo-calendar/legacy');
  const { startDate, endDate } = getEventWindow(item);
  const permission = await Calendar.requestCalendarPermissionsAsync();

  if (permission.status !== 'granted') {
    throw new Error('Calendar permission was not granted');
  }

  await Calendar.createEventInCalendarAsync({
    title: item.title,
    location: item.place,
    notes: item.description,
    startDate,
    endDate,
    timeZone: TIME_ZONE,
  });
}

export const AddToCalendarService = {
  async addEvent(item: GalleryItem) {
    try {
      if (Platform.OS === 'web') {
        await openGoogleCalendar(item);
        return;
      }

      try {
        await addWithDeviceCalendar(item);
      } catch {
        await openGoogleCalendar(item);
      }
    } catch {
      Alert.alert(
        'Calendar',
        'Could not open the calendar. Please try again later.',
      );
    }
  },
};
