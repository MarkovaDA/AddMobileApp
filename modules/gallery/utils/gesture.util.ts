import type { GestureResponderEvent } from 'react-native';

import { DETAIL_ANIMATION, RIPPLE_SIZE } from '@/modules/gallery/constants';

type NativeTouchOffsets = GestureResponderEvent['nativeEvent'] & {
  offsetX?: number;
  offsetY?: number;
};

export function getRippleOrigin(
  event: GestureResponderEvent,
  fallback = RIPPLE_SIZE / 2,
) {
  const nativeEvent = event.nativeEvent as NativeTouchOffsets;
  const x = nativeEvent.locationX ?? nativeEvent.offsetX ?? fallback;
  const y = nativeEvent.locationY ?? nativeEvent.offsetY ?? fallback;

  return { x, y };
}

export function shouldDismissDetail(gesture: { dx: number; vx: number }) {
  return (
    gesture.dx > DETAIL_ANIMATION.swipeThreshold ||
    gesture.vx > DETAIL_ANIMATION.swipeVelocity
  );
}

export function shouldCaptureHorizontalSwipe(gesture: {
  dx: number;
  dy: number;
}) {
  return gesture.dx > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy);
}
