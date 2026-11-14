import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { GalleryListItemComponent } from '@/modules/gallery/components/gallery-list-item';
import { AddToCalendarService } from '@/modules/gallery/services';
import { mockGalleryItem } from '@/modules/gallery/__fixtures__/gallery-item.fixture';

describe('<GalleryListItemComponent />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders event details', async () => {
    const { getByText } = await render(
      <GalleryListItemComponent item={mockGalleryItem} />,
    );

    expect(getByText(mockGalleryItem.title)).toBeTruthy();
    expect(getByText(mockGalleryItem.category)).toBeTruthy();
    expect(getByText(mockGalleryItem.place)).toBeTruthy();
    expect(getByText(mockGalleryItem.description)).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
    expect(getByText('Add to calendar')).toBeTruthy();
  });

  test('shows back control when onBack is provided', async () => {
    const { getByText } = await render(
      <GalleryListItemComponent
        item={mockGalleryItem}
        onBack={jest.fn()}
      />,
    );

    expect(getByText('← Swipe or tap to go back')).toBeTruthy();
  });

  test('adds event to calendar on button press', async () => {
    const { getByText } = await render(
      <GalleryListItemComponent item={mockGalleryItem} />,
    );

    fireEvent.press(getByText('Add to calendar'));

    await waitFor(() => {
      expect(AddToCalendarService.addEvent).toHaveBeenCalledWith(
        mockGalleryItem,
      );
    });
  });
});
