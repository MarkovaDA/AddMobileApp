import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  PanResponder,
  type PressableStateCallbackType,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { DETAIL_ANIMATION } from '@/constants';
import { AddToCalendarService } from '../services';
import { galleryListItemStyles as styles } from '../styles';
import type { GalleryListItemProps } from '../types';

const SCREEN_WIDTH = Dimensions.get('window').width;

function getBackButtonStyle({ pressed }: PressableStateCallbackType) {
  return [styles.backButton, pressed && styles.backButtonPressed];
}

export function GalleryListItemComponent({ item, onBack }: GalleryListItemProps) {
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const isClosing = useRef(false);
  const onBackRef = useRef(onBack);
  const isAddingRef = useRef(false);
  const [isAddingToCalendar, setIsAddingToCalendar] = useState(false);

  onBackRef.current = onBack;

  const handleAddToCalendar = useCallback(async () => {
    if (isAddingRef.current) {
      return;
    }

    isAddingRef.current = true;
    setIsAddingToCalendar(true);
    try {
      await AddToCalendarService.addEvent(item);
    } finally {
      isAddingRef.current = false;
      setIsAddingToCalendar(false);
    }
  }, [item]);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: DETAIL_ANIMATION.duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  const closeWithSwipe = useCallback((toValue = SCREEN_WIDTH) => {
    if (!onBackRef.current || isClosing.current) {
      return;
    }

    isClosing.current = true;

    Animated.timing(translateX, {
      toValue,
      duration: DETAIL_ANIMATION.dismissDuration,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        onBackRef.current?.();
      } else {
        isClosing.current = false;
      }
    });
  }, [translateX]);

  const handleBackPress = useCallback(() => {
    closeWithSwipe();
  }, [closeWithSwipe]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          gesture.dx > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderMove: (_, gesture) => {
          if (gesture.dx > 0) {
            translateX.setValue(gesture.dx);
          }
        },
        onPanResponderRelease: (_, gesture) => {
          const shouldClose =
            gesture.dx > DETAIL_ANIMATION.swipeThreshold ||
            gesture.vx > DETAIL_ANIMATION.swipeVelocity;

          if (shouldClose) {
            closeWithSwipe(SCREEN_WIDTH);
            return;
          }

          Animated.spring(translateX, {
            toValue: 0,
            tension: 80,
            friction: 12,
            useNativeDriver: true,
          }).start();
        },
      }),
    [closeWithSwipe, translateX],
  );

  const panelStyle = useMemo(
    () => ({
      transform: [{ translateX }],
    }),
    [translateX],
  );

  const getCalendarButtonStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      styles.calendarButton,
      pressed && styles.calendarButtonPressed,
      isAddingToCalendar && styles.calendarButtonDisabled,
    ],
    [isAddingToCalendar],
  );

  return (
    <Animated.View style={[styles.root, panelStyle]} {...panResponder.panHandlers}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {onBack ? (
          <Pressable style={getBackButtonStyle} onPress={handleBackPress}>
            <Text style={styles.backLabel}>← Swipe or tap to go back</Text>
          </Pressable>
        ) : null}

        <View style={styles.card}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />

          <View style={styles.content}>
            <View style={styles.metaRow}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.place}>{item.place}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>About</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            <Pressable
              style={getCalendarButtonStyle}
              onPress={handleAddToCalendar}
              disabled={isAddingToCalendar}
            >
              <Text style={styles.calendarButtonLabel}>
                {isAddingToCalendar ? 'Opening calendar…' : 'Add to calendar'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
