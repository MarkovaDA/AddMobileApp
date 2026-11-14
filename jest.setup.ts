jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});

jest.mock('@/modules/gallery/services', () => ({
  AddToCalendarService: {
    addEvent: jest.fn(() => Promise.resolve()),
  },
}));
