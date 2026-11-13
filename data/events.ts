import type { GalleryItem } from '@/types';

export const MOSCOW_EVENTS: GalleryItem[] = [
  {
    id: '1',
    title: 'Kremlin Lights',
    category: 'Tour',
    place: 'Moscow Kremlin',
    date: 'Nov 12',
    startAt: '2026-11-12T18:00:00+03:00',
    image: require('@/assets/moscow/kremlin.jpg'),
    description:
      'An evening walk along the Kremlin walls: glowing towers, views of the Moskva River, and a short story of the fortress.',
  },
  {
    id: '2',
    title: 'Red Square Walk',
    category: 'City',
    place: 'Red Square',
    date: 'Nov 13',
    startAt: '2026-11-13T17:00:00+03:00',
    image: require('@/assets/moscow/red-square.jpg'),
    description:
      'A route across Red Square covering GUM, Lobnoye Mesto, and the best sunset photo spots.',
  },
  {
    id: '3',
    title: 'St. Basil Evening',
    category: 'Culture',
    place: 'St. Basil’s Cathedral',
    date: 'Nov 14',
    startAt: '2026-11-14T19:00:00+03:00',
    image: require('@/assets/moscow/st-basil.jpg'),
    description:
      'A cultural evening by St. Basil’s Cathedral with stories about its architecture and the meaning of the domes.',
  },
  {
    id: '4',
    title: 'Skyline Night',
    category: 'Views',
    place: 'Moscow City',
    date: 'Nov 16',
    startAt: '2026-11-16T20:00:00+03:00',
    image: require('@/assets/moscow/night.jpg'),
    description:
      'Night views of Moscow City: observation decks, skyscrapers, and a panorama of the business district.',
  },
  {
    id: '5',
    title: 'River Cruise',
    category: 'Leisure',
    place: 'Moskva River',
    date: 'Nov 18',
    startAt: '2026-11-18T16:00:00+03:00',
    image: require('@/assets/moscow/river.jpg'),
    description:
      'A calm cruise along the Moskva River with stops by the embankments and city landmarks.',
  },
  {
    id: '6',
    title: 'Capital Day',
    category: 'City',
    place: 'Central Moscow',
    date: 'Nov 20',
    startAt: '2026-11-20T11:00:00+03:00',
    image: require('@/assets/moscow/city.jpg'),
    description:
      'A day in the heart of the capital: boulevards, street culture, and short city stories.',
  },
];
