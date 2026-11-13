import { StyleSheet } from 'react-native';

import { fonts } from '@/constants';
import { colors, spacing } from '@/theme';

export const galleryListItemStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backLabel: {
    color: colors.accentSoft,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.inkSoft,
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    color: colors.accentSoft,
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  date: {
    color: colors.muted,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  title: {
    color: colors.paper,
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  place: {
    color: 'rgba(244,240,232,0.78)',
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  section: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  sectionLabel: {
    color: colors.accentSoft,
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  description: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
  },
  calendarButton: {
    marginTop: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: 14,
    backgroundColor: colors.accent,
  },
  calendarButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  calendarButtonDisabled: {
    opacity: 0.7,
  },
  calendarButtonLabel: {
    color: colors.paper,
    fontFamily: fonts.bold,
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
