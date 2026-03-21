import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockHomeState } from '../Data/mockHomeState';

const LOADING_STEPS = [
  'Checking your ingredients...',
  'Balancing nutritional profile...',
  'Applying Vaidya principles...',
  'Finalizing your meal plan...',
];

export default function AiCraftingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = mockHomeState;

  // Pulsing animation for the outer orb
  const pulseAnim = useRef(new Animated.Value(1)).current;
  // Cycling text animation
  const textOpacity = useRef(new Animated.Value(1)).current;
  const stepIndex = useRef(0);
  const stepText = useRef(new Animated.Value(1)).current;
  const [currentStep, setCurrentStep] = React.useState(LOADING_STEPS[0]);

  // Floating nodes animation
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulsing orb
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    // Floating nodes
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, { toValue: -8, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatAnim1, { toValue: 4, duration: 1800, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, { toValue: 6, duration: 2200, useNativeDriver: true }),
        Animated.timing(floatAnim2, { toValue: -4, duration: 2200, useNativeDriver: true }),
      ])
    ).start();

    // Cycle through loading steps
    const stepInterval = setInterval(() => {
      Animated.timing(stepText, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        stepIndex.current = (stepIndex.current + 1) % LOADING_STEPS.length;
        setCurrentStep(LOADING_STEPS[stepIndex.current]);
        Animated.timing(stepText, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    }, 2000);

    // After ~6 seconds navigate to AI result screen
    const navTimer = setTimeout(() => {
      router.replace('/ai-meal-result' as any);
    }, 6000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(navTimer);
    };
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {/* Top App Bar */}
      <View style={[styles.appBar, { paddingTop: insets.top + 8 }]}>
        <Ionicons name="menu" size={26} color="#1d6f42" />
        <Text style={styles.appBarLogo}>Niyam</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
      </View>

      {/* Centered Loading Content */}
      <View style={[styles.centerContent, { paddingTop: insets.top + 64 }]}>
        <View style={styles.card}>

          {/* Pulsing Orb */}
          <View style={styles.orbArea}>
            <Animated.View style={[styles.orbOuter, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.orbMid}>
                <View style={styles.orbInner} />
              </View>
            </Animated.View>
            {/* Floating decorative nodes */}
            <Animated.View style={[styles.floatDot1, { transform: [{ translateY: floatAnim1 }] }]} />
            <Animated.View style={[styles.floatDot2, { transform: [{ translateY: floatAnim2 }] }]} />
          </View>

          {/* Title & status */}
          <Text style={styles.title}>Crafting your meal...</Text>

          <View style={styles.statusRow}>
            <Ionicons name="restaurant-outline" size={14} color="#885200" style={{ marginRight: 6 }} />
            <Animated.Text style={[styles.statusText, { opacity: stepText }]}>
              {currentStep}
            </Animated.Text>
          </View>

          <Text style={styles.engineLabel}>NIYAM INTELLIGENCE ENGINE</Text>

          {/* Vaidya Wisdom hint */}
          <View style={styles.wisdomCard}>
            <Ionicons name="sparkles" size={20} color="#1d6f42" style={{ marginRight: 10, marginTop: 1 }} />
            <View style={styles.wisdomText}>
              <Text style={styles.wisdomTitle}>VAIDYA WISDOM</Text>
              <Text style={styles.wisdomBody}>
                Warm meals are easier to digest during your peak metabolic window. We're optimizing for your current cycle.
              </Text>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  appBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 14,
    backgroundColor: 'rgba(249,249,247,0.85)',
    zIndex: 10,
  },
  appBarLogo: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 24,
    color: '#1d6f42',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(29, 111, 66, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(29, 111, 66, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1d6f42',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: '20%',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  orbArea: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  orbOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 85, 46, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbMid: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(0, 85, 46, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00552e',
  },
  floatDot1: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fdad4e',
    opacity: 0.7,
  },
  floatDot2: {
    position: 'absolute',
    bottom: -2,
    left: -10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1d6f42',
    opacity: 0.4,
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 26,
    color: '#00552e',
    textAlign: 'center',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  engineLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9,
    color: 'rgba(26, 28, 27, 0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 32,
  },
  wisdomCard: {
    width: '100%',
    backgroundColor: '#f4f4f2',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  wisdomText: {
    flex: 1,
    gap: 4,
  },
  wisdomTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9,
    letterSpacing: 1.5,
    color: '#1d6f42',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  wisdomBody: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    color: '#3f4941',
    lineHeight: 18,
  },
});
