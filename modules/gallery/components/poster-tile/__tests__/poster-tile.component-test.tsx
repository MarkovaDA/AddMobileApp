import { fireEvent, render } from '@testing-library/react-native';

import { PosterTile } from '@/modules/gallery/components/poster-tile';
import { mockGalleryItem } from '@/modules/gallery/__fixtures__/gallery-item.fixture';

describe('<PosterTile />', () => {
  test('renders tile content', async () => {
    const { getByText } = await render(
      <PosterTile item={mockGalleryItem} index={0} />,
    );

    expect(getByText(mockGalleryItem.title)).toBeTruthy();
    expect(getByText(mockGalleryItem.category)).toBeTruthy();
    expect(getByText(mockGalleryItem.place)).toBeTruthy();
    expect(getByText(mockGalleryItem.date)).toBeTruthy();
  });

  test('invokes onPress after press', async () => {
    jest.useFakeTimers();
    const onPress = jest.fn();

    const { getByText } = await render(
      <PosterTile item={mockGalleryItem} index={0} onPress={onPress} />,
    );

    fireEvent.press(getByText(mockGalleryItem.title));
    jest.runAllTimers();

    expect(onPress).toHaveBeenCalledWith(mockGalleryItem);
    jest.useRealTimers();
  });
});
