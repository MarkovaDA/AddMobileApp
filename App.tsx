import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import { Gallery } from './components/Gallery';
import {
  APP_BACKGROUND_GRADIENT,
  APP_BACKGROUND_LOCATIONS,
  HERO_EYEBROW,
  HERO_SUBTITLE,
  HERO_TITLE,
} from './constants';

import { MOSCOW_EVENTS } from './data/events';
import { appStyles as styles } from './styles';
import { colors } from './theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

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
        <View style={styles.header}>
          <View style={styles.eyebrowRow}>
            <View style={styles.accentDot} />
            <Text style={styles.eyebrow}>{HERO_EYEBROW}</Text>
          </View>
          <Text style={styles.title}>{HERO_TITLE}</Text>
          <Text style={styles.subtitle}>{HERO_SUBTITLE}</Text>
          <View style={styles.divider} />
        </View>

        <Gallery items={MOSCOW_EVENTS} />
      </SafeAreaView>

      <StatusBar style="light" />
    </View>
  );
}
