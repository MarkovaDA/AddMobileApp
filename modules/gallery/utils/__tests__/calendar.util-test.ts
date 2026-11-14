import {
  buildGoogleCalendarUrl,
  getEventWindow,
  toCalendarStamp,
} from '@/modules/gallery/utils';
import { mockGalleryItem } from '@/modules/gallery/__fixtures__/gallery-item.fixture';

describe('calendar utils', () => {
  test('toCalendarStamp formats ISO datetime for Google Calendar', () => {
    const stamp = toCalendarStamp(new Date('2026-11-12T18:00:00.000Z'));
    expect(stamp).toBe('20261112T180000Z');
  });

  test('getEventWindow returns start and end two hours later', () => {
    const { startDate, endDate } = getEventWindow(mockGalleryItem);

    expect(startDate.toISOString()).toBe(
      new Date(mockGalleryItem.startAt).toISOString(),
    );
    expect(endDate.getTime() - startDate.getTime()).toBe(2 * 60 * 60 * 1000);
  });

  test('buildGoogleCalendarUrl includes event fields', () => {
    const url = new URL(buildGoogleCalendarUrl(mockGalleryItem));

    expect(url.origin + url.pathname).toBe(
      'https://calendar.google.com/calendar/render',
    );
    expect(url.searchParams.get('action')).toBe('TEMPLATE');
    expect(url.searchParams.get('text')).toBe(mockGalleryItem.title);
    expect(url.searchParams.get('location')).toBe(mockGalleryItem.place);
    expect(url.searchParams.get('details')).toBe(mockGalleryItem.description);
    expect(url.searchParams.get('dates')).toContain('/');
  });
});
