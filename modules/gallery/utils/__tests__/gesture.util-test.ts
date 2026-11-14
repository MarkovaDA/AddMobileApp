import type { GestureResponderEvent } from 'react-native';

import { DETAIL_ANIMATION } from '@/modules/gallery/constants';
import {
  getRippleOrigin,
  shouldCaptureHorizontalSwipe,
  shouldDismissDetail,
} from '@/modules/gallery/utils';

function createTouchEvent(
  overrides: Partial<GestureResponderEvent['nativeEvent']> = {},
): GestureResponderEvent {
  return {
    nativeEvent: {
      locationX: 40,
      locationY: 60,
      ...overrides,
    },
  } as GestureResponderEvent;
}

describe('gesture utils', () => {
  test('getRippleOrigin reads location coordinates', () => {
    expect(getRippleOrigin(createTouchEvent())).toEqual({ x: 40, y: 60 });
  });

  test('getRippleOrigin falls back when coordinates are missing', () => {
    const event = createTouchEvent({
      locationX: undefined,
      locationY: undefined,
      // @ts-expect-error test fallback path
      offsetX: undefined,
      offsetY: undefined,
    });

    expect(getRippleOrigin(event, 12)).toEqual({ x: 12, y: 12 });
  });

  test('shouldDismissDetail respects swipe threshold', () => {
    expect(
      shouldDismissDetail({
        dx: DETAIL_ANIMATION.swipeThreshold + 1,
        vx: 0,
      }),
    ).toBe(true);
    expect(
      shouldDismissDetail({
        dx: DETAIL_ANIMATION.swipeThreshold - 1,
        vx: 0,
      }),
    ).toBe(false);
  });

  test('shouldDismissDetail respects swipe velocity', () => {
    expect(
      shouldDismissDetail({
        dx: 0,
        vx: DETAIL_ANIMATION.swipeVelocity + 0.1,
      }),
    ).toBe(true);
  });

  test('shouldCaptureHorizontalSwipe detects horizontal drag', () => {
    expect(shouldCaptureHorizontalSwipe({ dx: 20, dy: 2 })).toBe(true);
    expect(shouldCaptureHorizontalSwipe({ dx: 4, dy: 2 })).toBe(false);
    expect(shouldCaptureHorizontalSwipe({ dx: 10, dy: 20 })).toBe(false);
  });
});
