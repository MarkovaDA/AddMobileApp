import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, FlatList, Image, Pressable, Text, View } from 'react-native';

import {
  DEFAULT_GALLERY_COLUMNS,
  GALLERY_SECTION_LABEL,
  TILE_ANIMATION,
  TILE_GRADIENT_COLORS,
  TILE_GRADIENT_LOCATIONS,
} from '../constants';
import { galleryStyles as styles } from '../styles';
import type { GalleryProps, PosterTileProps } from '../types';

function PosterTile({ item, index }: PosterTileProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(TILE_ANIMATION.initialTranslateY)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: TILE_ANIMATION.duration,
        delay: index * TILE_ANIMATION.delayStep,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: TILE_ANIMATION.duration,
        delay: index * TILE_ANIMATION.delayStep,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  const animatedStyle = {
    opacity,
    transform: [{ translateY }],
  };

  return (
    <Animated.View style={[styles.tileColumn, animatedStyle]}>
      <Pressable style={({ pressed }) => [styles.tileWrap, pressed && styles.tilePressed]}>
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
      </Pressable>
    </Animated.View>
  );
}

export function Gallery({ items, columns = DEFAULT_GALLERY_COLUMNS }: GalleryProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      numColumns={columns}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<Text style={styles.sectionLabel}>{GALLERY_SECTION_LABEL}</Text>}
      renderItem={({ item, index }) => <PosterTile item={item} index={index} />}
    />
  );
}
