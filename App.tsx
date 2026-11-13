import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import {
  APP_BACKGROUND_GRADIENT,
  APP_BACKGROUND_LOCATIONS,
  HERO_EYEBROW,
  HERO_SUBTITLE,
  HERO_TITLE,
} from '@/constants';
import { MOSCOW_EVENTS } from '@/data/events';
import { GalleryListItemComponent, LoadGalleryModule } from '@/modules/gallery';
import { appStyles as styles } from '@/styles';
import { colors } from '@/theme';
import type { GalleryItem } from '@/modules/gallery/types';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  
  const [selectedEvent, setSelectedEvent] = useState<GalleryItem | null>(null);

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={APP_BACKGROUND_GRADIENT}
        locations={APP_BACKGROUND_LOCATIONS}
        style={styles.background}
      />

      <SafeAreaView style={styles.safe}>
        {selectedEvent ? (
          <GalleryListItemComponent
            item={selectedEvent}
            onBack={() => setSelectedEvent(null)}
          />
        ) : (
          <>
            <View style={styles.header}>
              <View style={styles.eyebrowRow}>
                <View style={styles.accentDot} />
                <Text style={styles.eyebrow}>{HERO_EYEBROW}</Text>
              </View>
              <Text style={styles.title}>{HERO_TITLE}</Text>
              <Text style={styles.subtitle}>{HERO_SUBTITLE}</Text>
              <View style={styles.divider} />
            </View>

            <LoadGalleryModule
              items={MOSCOW_EVENTS}
              onItemPress={setSelectedEvent}
            />
          </>
        )}
      </SafeAreaView>

      <StatusBar style="light" />
    </View>
  );
}
