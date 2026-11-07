import { StyleSheet } from 'react-native';

import { fonts, GALLERY_GAP, TILE_ASPECT_RATIO } from '../constants';
import { colors, spacing } from '../theme';

export const galleryStyles = StyleSheet.create({
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
  tileColumn: {
    flex: 1,
  },
  tileWrap: {
    width: '100%',
    aspectRatio: TILE_ASPECT_RATIO,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.inkSoft,
  },
  tilePressed: {
    opacity: 0.9,
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  tile: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  tileTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    color: colors.accentSoft,
    fontFamily: fonts.bold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    backgroundColor: 'rgba(10,11,15,0.45)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  date: {
    color: colors.paper,
    opacity: 0.85,
    fontFamily: fonts.medium,
    fontSize: 11,
  },
  tileBottom: {
    gap: 6,
  },
  tileTitle: {
    color: colors.paper,
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  place: {
    color: 'rgba(244,240,232,0.78)',
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
