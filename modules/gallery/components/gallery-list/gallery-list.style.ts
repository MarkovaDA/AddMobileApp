import { StyleSheet } from 'react-native';

import { fonts } from '@/constants';
import { GALLERY_GAP } from '@/modules/gallery/constants';
import { colors, spacing } from '@/theme';

export const galleryListStyles = StyleSheet.create({
  list: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    rowGap: GALLERY_GAP,
  },
  columnWrapper: {
    gap: GALLERY_GAP,
  },
  sectionLabel: {
    color: colors.muted,
    fontFamily: fonts.medium,
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
});
