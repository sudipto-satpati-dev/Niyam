/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = {
  fraunces: {
    semiBold: 'Fraunces-SemiBold',
    bold: 'Fraunces-Bold',
    italic: 'Fraunces-Italic',
  },
  dmSans: {
    regular: 'DM-Sans',
    medium: 'DM-Sans-Medium',
    semiBold: 'DM-Sans-SemiBold',
  },
  // Legacy aliases for compatibility if needed
  sans: 'DM-Sans',
  serif: 'Fraunces-SemiBold',
};
