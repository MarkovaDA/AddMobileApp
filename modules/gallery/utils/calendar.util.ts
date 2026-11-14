import type { GalleryItem } from '@/modules/gallery/types';

const EVENT_DURATION_MS = 2 * 60 * 60 * 1000;

export function toCalendarStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function getEventWindow(item: GalleryItem) {
  const startDate = new Date(item.startAt);
  const endDate = new Date(startDate.getTime() + EVENT_DURATION_MS);
  return { startDate, endDate };
}

export function buildGoogleCalendarUrl(item: GalleryItem) {
  const { startDate, endDate } = getEventWindow(item);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: item.title,
    dates: `${toCalendarStamp(startDate)}/${toCalendarStamp(endDate)}`,
    details: item.description,
    location: item.place,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
