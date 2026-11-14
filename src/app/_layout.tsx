import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { LinearGradient } from 'expo-linear-gradient';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

import {
  APP_BACKGROUND_GRADIENT,
  APP_BACKGROUND_LOCATIONS,
} from '@/constants';
import { appStyles as styles } from '@/styles';
import { colors } from '@/theme';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'transparent',
    card: 'transparent',
  },
};

export default function RootLayout() {
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
    <LinearGradient
      colors={APP_BACKGROUND_GRADIENT}
      locations={APP_BACKGROUND_LOCATIONS}
      style={styles.root}
    >
      <ThemeProvider value={navigationTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'slide_from_right',
          }}
        />
      </ThemeProvider>

      <StatusBar style="light" />
    </LinearGradient>
  );
}
