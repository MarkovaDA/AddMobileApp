import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  type GestureResponderEvent,
  Image,
  type ListRenderItemInfo,
  Platform,
  type PressableStateCallbackType,
  Pressable,
  Text,
  View,
} from 'react-native';

import {
  DEFAULT_GALLERY_COLUMNS,
  GALLERY_SECTION_LABEL,
  TILE_ANIMATION,
  TILE_GRADIENT_COLORS,
  TILE_GRADIENT_LOCATIONS,
} from '@/constants';
import { galleryStyles as styles } from '../styles';
import type { EventListProps, GalleryItem, PosterTileProps } from '../types';

const RIPPLE_SIZE = 160;
const PRESS_NAVIGATION_DELAY_MS = Platform.OS === 'web' ? 220 : 120;

function keyExtractor(item: GalleryItem) {
  return item.id;
}

function getTileWrapStyle({ pressed }: PressableStateCallbackType) {
  return [styles.tileWrap, pressed && styles.tilePressed];
}

const listHeader = (
  <Text style={styles.sectionLabel}>{GALLERY_SECTION_LABEL}</Text>
);

const PosterTile = memo(function PosterTile({ item, index, onPress }: PosterTileProps) {
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
      const nativeEvent = event.nativeEvent as GestureResponderEvent['nativeEvent'] & {
        offsetX?: number;
        offsetY?: number;
      };
      const x = nativeEvent.locationX ?? nativeEvent.offsetX ?? RIPPLE_SIZE / 2;
      const y = nativeEvent.locationY ?? nativeEvent.offsetY ?? RIPPLE_SIZE / 2;

      setRippleOrigin({ x, y });
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
    () => [
      styles.ripple,
      {
        left: rippleOrigin.x - RIPPLE_SIZE / 2,
        top: rippleOrigin.y - RIPPLE_SIZE / 2,
        opacity: rippleOpacity,
        transform: [{ scale: rippleScale }],
      },
    ],
    [rippleOpacity, rippleOrigin.x, rippleOrigin.y, rippleScale],
  );

  return (
    <Animated.View style={[styles.tileColumn, animatedStyle]}>
      <Pressable style={getTileWrapStyle} onPress={handlePress}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <LinearGradient
          colors={TILE_GRADIENT_COLORS}
          locations={TILE_GRADIENT_LOCATIONS}
          style={styles.tile}
        >
          <View style={styles.tileTop}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>

          <View style={styles.tileBottom}>
            <Text style={styles.tileTitle} numberOfLines={3}>
              {item.title}
            </Text>
            <Text style={styles.place}>{item.place}</Text>
          </View>
        </LinearGradient>

        <Animated.View
          pointerEvents="none"
          style={[styles.pressFlash, { opacity: flashOpacity }]}
        />
        <Animated.View pointerEvents="none" style={rippleStyle} />
      </Pressable>
    </Animated.View>
  );
});

export function EventListComponent({
  items,
  columns = DEFAULT_GALLERY_COLUMNS,
  onItemPress,
}: EventListProps) {
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<GalleryItem>) => (
      <PosterTile item={item} index={index} onPress={onItemPress} />
    ),
    [onItemPress],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      numColumns={columns}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeader}
      renderItem={renderItem}
    />
  );
}
