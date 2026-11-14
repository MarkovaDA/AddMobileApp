import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { DETAIL_ANIMATION } from '@/modules/gallery/constants';
import { AddToCalendarService } from '@/modules/gallery/services';
import type { GalleryListItemProps } from '@/modules/gallery/types';
import {
  getBackButtonStyle,
  getCalendarButtonStyle,
  shouldCaptureHorizontalSwipe,
  shouldDismissDetail,
} from '@/modules/gallery/utils';

import { galleryListItemStyles as styles } from './gallery-list-item.style';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
          shouldCaptureHorizontalSwipe(gesture),
        onPanResponderMove: (_, gesture) => {
          if (gesture.dx > 0) {
            translateX.setValue(gesture.dx);
          }
        },
        onPanResponderRelease: (_, gesture) => {
          if (shouldDismissDetail(gesture)) {
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

  const calendarButtonStyle = useMemo(
    () => getCalendarButtonStyle(isAddingToCalendar),
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
              style={calendarButtonStyle}
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
