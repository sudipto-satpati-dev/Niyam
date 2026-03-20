import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;
  const pulse3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animatePulse = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 1000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          })
        ])
      );
    };

    const anim1 = animatePulse(pulse1, 0);
    const anim2 = animatePulse(pulse2, 200);
    const anim3 = animatePulse(pulse3, 400);

    anim1.start();
    anim2.start();
    anim3.start();

    const timer = setTimeout(() => {
      // Navigate to the main tabs
      router.replace('/(tabs)');
    }, 3000);

    return () => {
      clearTimeout(timer);
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [router, pulse1, pulse2, pulse3]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="dark" />

      {/* Decorative Blobs */}
      <View style={[styles.blob, styles.blobTopLeft]} />
      <View style={[styles.blob, styles.blobBottomRight]} />

      <View style={styles.centerContent}>
        <Image
          source={require('@/assets/Logos/primary-logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.tagline}>RULE YOUR ROUTINE</Text>
      </View>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.dot, { opacity: pulse1 }]} />
        <Animated.View style={[styles.dot, { opacity: pulse2 }]} />
        <Animated.View style={[styles.dot, { opacity: pulse3 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    opacity: 0.1,
  },
  blobTopLeft: {
    top: -160,
    left: -160,
    backgroundColor: '#a4f4bb',
  },
  blobBottomRight: {
    bottom: -160,
    right: -160,
    backgroundColor: '#e4dfff',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    width: '100%',
  },
  logo: {
    width: 320,
    height: 160,
  },
  tagline: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#71717a',
    marginTop: 12,
    letterSpacing: 4,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1d6f42',
  },
});
