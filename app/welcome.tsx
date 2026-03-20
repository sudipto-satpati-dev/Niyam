import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleNext = () => {
    // Navigate to next welcome screen or tabs
    router.replace('/welcome2');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Aesthetic Accents (Background blobs) */}
      <View style={[styles.bgBlob, styles.bgBlobLeft]} />
      <View style={[styles.bgBlob, styles.bgBlobRight]} />

      {/* Illustration Area (Top 60%) */}
      <View style={[styles.illustrationArea, { paddingTop: insets.top }]}>
        <View style={styles.mockupContainer}>
          {/* Abstract background shape */}
          <View style={styles.abstractShape} />
          
          {/* Main Illustration Mockup */}
          <View style={styles.mockupCard}>
            <View style={styles.iconsRow}>
              <View style={[styles.iconBox, { backgroundColor: '#a4f4bb' }]}>
                <MaterialIcons name="calendar-today" size={28} color="#1d6f42" />
              </View>
              <View style={[styles.iconBox, { backgroundColor: '#e4dfff' }]}>
                <MaterialIcons name="restaurant" size={28} color="#5c51b0" />
              </View>
            </View>
            <View style={styles.barsContainer}>
              <View style={styles.barFull} />
              <View style={styles.barPartial} />
            </View>
          </View>

          {/* Floating AI Badge */}
          <View style={styles.aiBadge}>
            <MaterialIcons name="auto-awesome" size={14} color="#ffffff" />
            <Text style={styles.aiBadgeText}>AI ADAPTIVE</Text>
          </View>
        </View>
      </View>

      {/* White Content Card (Bottom 40%) */}
      <View style={[styles.contentCard, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.textContent}>
          <Text style={styles.title}>A plan built around your life</Text>
          <Text style={styles.subtitle}>
            Not generic advice — a routine designed for your exact schedule, food habits, and goals.
          </Text>
        </View>

        <View style={styles.interactionArea}>
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Pressable 
              style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
              onPress={handleNext}
            >
              <Text style={styles.primaryButtonText}>Next</Text>
            </Pressable>
            <Pressable 
              style={({ pressed }) => [styles.skipButton, pressed && { opacity: 0.8 }]}
              onPress={handleSkip}
            >
              <Text style={styles.skipButtonText}>SKIP</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5EE', // light greenish background 
  },
  illustrationArea: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  mockupContainer: {
    position: 'relative',
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  abstractShape: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(29, 111, 66, 0.05)',
  },
  mockupCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(29, 111, 66, 0.1)',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
    width: '100%',
  },
  iconsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barsContainer: {
    width: '100%',
    gap: 8,
  },
  barFull: {
    height: 8,
    width: '100%',
    backgroundColor: '#e8e8e6',
    borderRadius: 8,
  },
  barPartial: {
    height: 8,
    width: '75%',
    backgroundColor: '#e8e8e6',
    borderRadius: 8,
  },
  aiBadge: {
    position: 'absolute',
    top: -16,
    right: -16,
    backgroundColor: '#5c51b0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 20,
  },
  aiBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  contentCard: {
    height: '40%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 32,
    paddingTop: 40,
    justifyContent: 'space-between',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 16,
    zIndex: 30,
  },
  textContent: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontFamily: 'DM-Sans-SemiBold', // Ensure we use the loaded font, or standard bold if not
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
    color: '#1a1c1b',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'DM-Sans',
    fontSize: 15,
    lineHeight: 22,
    color: '#3f4941',
    textAlign: 'center',
    maxWidth: 280,
  },
  interactionArea: {
    width: '100%',
    gap: 32,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e3e1',
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1d6f42',
  },
  actions: {
    gap: 16,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1d6f42',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  skipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  skipButtonText: {
    color: 'rgba(63, 73, 65, 0.6)',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  bgBlob: {
    position: 'absolute',
    borderRadius: 999,
    zIndex: 1,
  },
  bgBlobLeft: {
    top: '40%',
    left: '-20%',
    width: 160,
    height: 160,
    backgroundColor: 'rgba(92, 81, 176, 0.08)',
  },
  bgBlobRight: {
    top: '15%',
    right: '-10%',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(29, 111, 66, 0.06)',
  },
});
