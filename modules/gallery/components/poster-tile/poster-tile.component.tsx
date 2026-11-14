import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';

import { TILE_GRADIENT_COLORS, TILE_GRADIENT_LOCATIONS } from '@/modules/gallery/constants';
import { useTilePressAnimation } from '@/modules/gallery/hooks';
import type { PosterTileProps } from '@/modules/gallery/types';
import { getTileWrapStyle } from '@/modules/gallery/utils';

import { posterTileStyles as styles } from './poster-tile.style';

export const PosterTile = memo(function PosterTile({
  item,
  index,
  onPress,
}: PosterTileProps) {
  const { animatedStyle, flashOpacity, handlePress, rippleStyle } =
    useTilePressAnimation(index, item, onPress);

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

        <Animated.View
          pointerEvents="none"
          style={[styles.ripple, rippleStyle]}
        />
      </Pressable>
    </Animated.View>
  );
});
