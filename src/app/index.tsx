import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import {
  HERO_EYEBROW,
  HERO_SUBTITLE,
  HERO_TITLE,
} from '@/constants';
import { MOSCOW_EVENTS } from '@/data/events';
import {
  GalleryListComponent,
  type GalleryItem,
} from '@/modules/gallery';
import { appStyles as styles } from '@/styles';

export default function HomeScreen() {
  const router = useRouter();

  const handleItemPress = useCallback(
    (item: GalleryItem) => {
      router.push(`/event/${item.id}`);
    },
    [router],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.eyebrowRow}>
          <View style={styles.accentDot} />
          <Text style={styles.eyebrow}>{HERO_EYEBROW}</Text>
        </View>
        <Text style={styles.title}>{HERO_TITLE}</Text>
        <Text style={styles.subtitle}>{HERO_SUBTITLE}</Text>
        <View style={styles.divider} />
      </View>

      <GalleryListComponent
        items={MOSCOW_EVENTS}
        onItemPress={handleItemPress}
      />
    </SafeAreaView>
  );
}
