import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, type GestureResponderEvent, Platform } from 'react-native';

import { RIPPLE_SIZE, TILE_ANIMATION } from '@/modules/gallery/constants';
import type { GalleryItem } from '@/modules/gallery/types';
import { getRippleOrigin } from '@/modules/gallery/utils';

const PRESS_NAVIGATION_DELAY_MS = Platform.OS === 'web' ? 220 : 120;

export function useTilePressAnimation(
  index: number,
  item: GalleryItem,
  onPress?: (item: GalleryItem) => void,
) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(TILE_ANIMATION.initialTranslateY)).current;
  const scale = useRef(new Animated.Value(TILE_ANIMATION.initialScale)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const [rippleOrigin, setRippleOrigin] = useState({ x: 0, y: 0 });
  const navigateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onPressRef = useRef(onPress);
  const itemRef = useRef(item);

  onPressRef.current = onPress;
  itemRef.current = item;

  useEffect(() => {
    const delay = index * TILE_ANIMATION.delayStep;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: TILE_ANIMATION.duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        tension: TILE_ANIMATION.tension,
        friction: TILE_ANIMATION.friction,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay,
        tension: TILE_ANIMATION.tension,
        friction: TILE_ANIMATION.friction,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      if (navigateTimeout.current) {
        clearTimeout(navigateTimeout.current);
      }
    };
  }, [index, opacity, scale, translateY]);

  const runRipple = useCallback(
    (event: GestureResponderEvent) => {
      setRippleOrigin(getRippleOrigin(event));
      rippleScale.setValue(0.15);
      rippleOpacity.setValue(0.95);
      flashOpacity.setValue(0.45);

      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 3.2,
          duration: 520,
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 520,
          useNativeDriver: true,
        }),
        Animated.timing(flashOpacity, {
          toValue: 0,
          duration: 320,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [flashOpacity, rippleOpacity, rippleScale],
  );

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      runRipple(event);

      if (navigateTimeout.current) {
        clearTimeout(navigateTimeout.current);
      }

      navigateTimeout.current = setTimeout(() => {
        onPressRef.current?.(itemRef.current);
      }, PRESS_NAVIGATION_DELAY_MS);
    },
    [runRipple],
  );

  const animatedStyle = useMemo(
    () => ({
      opacity,
      transform: [{ translateY }, { scale }],
    }),
    [opacity, scale, translateY],
  );

  const rippleStyle = useMemo(
    () => ({
      left: rippleOrigin.x - RIPPLE_SIZE / 2,
      top: rippleOrigin.y - RIPPLE_SIZE / 2,
      opacity: rippleOpacity,
      transform: [{ scale: rippleScale }],
    }),
    [rippleOpacity, rippleOrigin.x, rippleOrigin.y, rippleScale],
  );

  return {
    animatedStyle,
    flashOpacity,
    handlePress,
    rippleStyle,
  };
}
