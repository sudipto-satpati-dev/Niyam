import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts, Fraunces_600SemiBold, Fraunces_700Bold, Fraunces_400Regular_Italic } from '@expo-google-fonts/fraunces';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    'Fraunces-SemiBold': Fraunces_600SemiBold,
    'Fraunces-Bold': Fraunces_700Bold,
    'Fraunces-Italic': Fraunces_400Regular_Italic,
    'DM-Sans': DMSans_400Regular,
    'DM-Sans-Medium': DMSans_500Medium,
    'DM-Sans-SemiBold': DMSans_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="welcome2" options={{ headerShown: false }} />
          <Stack.Screen name="welcome3" options={{ headerShown: false }} />
          <Stack.Screen name="choose-plan" options={{ headerShown: false }} />
          <Stack.Screen name="basic-info" options={{ headerShown: false }} />
          <Stack.Screen name="intake-goals" options={{ headerShown: false }} />
          <Stack.Screen name="intake-schedule" options={{ headerShown: false }} />
          <Stack.Screen name="intake-diet" options={{ headerShown: false }} />
          <Stack.Screen name="intake-activity" options={{ headerShown: false }} />
          <Stack.Screen name="create-meal" options={{ headerShown: false }} />
          <Stack.Screen name="ai-crafting" options={{ headerShown: false }} />
          <Stack.Screen name="ai-meal-result" options={{ headerShown: false }} />
          <Stack.Screen name="weekly-meals" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="ask-niyam-ai" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
