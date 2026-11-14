import { useCallback } from 'react';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getEventById } from '@/data/events';
import { GalleryListItemComponent } from '@/modules/gallery';
import { appStyles as styles } from '@/styles';

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const eventId = Array.isArray(id) ? id[0] : id;
  const item = eventId ? getEventById(eventId) : undefined;

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  if (!item) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <GalleryListItemComponent item={item} onBack={handleBack} />
    </SafeAreaView>
  );
}
