import { fireEvent, render } from '@testing-library/react-native';

import { GalleryListComponent } from '@/modules/gallery/components/gallery-list';
import { GALLERY_SECTION_LABEL } from '@/modules/gallery/constants';
import { mockGalleryItems } from '@/modules/gallery/__fixtures__/gallery-item.fixture';

describe('<GalleryListComponent />', () => {
  test('renders section label and event titles', async () => {
    const { getByText } = await render(
      <GalleryListComponent items={mockGalleryItems} />,
    );

    expect(getByText(GALLERY_SECTION_LABEL)).toBeTruthy();
    expect(getByText('Kremlin Lights')).toBeTruthy();
    expect(getByText('Red Square Walk')).toBeTruthy();
  });

  test('calls onItemPress when a tile is pressed', async () => {
    jest.useFakeTimers();
    const onItemPress = jest.fn();

    const { getByText } = await render(
      <GalleryListComponent
        items={mockGalleryItems}
        onItemPress={onItemPress}
      />,
    );

    fireEvent.press(getByText('Kremlin Lights'));
    jest.runAllTimers();

    expect(onItemPress).toHaveBeenCalledWith(mockGalleryItems[0]);
    jest.useRealTimers();
  });
});
