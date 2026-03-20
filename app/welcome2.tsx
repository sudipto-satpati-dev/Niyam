import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


const { width } = Dimensions.get('window');

export default function Welcome2Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleNext = () => {
    // Navigate to the next welcome screen
    router.replace('/welcome3');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Illustration Section (Top 60%) */}
      <View style={[styles.illustrationArea, { paddingTop: insets.top }]}>
        {/* Decorative background elements for Editorial feel */}
        <View style={styles.bgBlobTopRight} />
        <View style={styles.bgBlobBottomLeft} />
        
        <View style={styles.mockupContainer}>
          <View style={styles.phoneMockup}>
            {/* Internal phone UI simulation */}
            <View style={styles.phoneSpeaker} />

            <View style={styles.checklist}>
              <View style={[styles.checklistItem, styles.checklistItemActive]}>
                <MaterialIcons name="check-circle" size={24} color="#1d6f42" />
                <View style={[styles.bar, { width: 96, backgroundColor: 'rgba(29, 111, 66, 0.2)' }]} />
              </View>

              <View style={[styles.checklistItem, styles.checklistItemInactive]}>
                <MaterialIcons name="radio-button-unchecked" size={24} color="#bfc9be" />
                <View style={[styles.bar, { width: 128, backgroundColor: 'rgba(191, 201, 190, 0.3)' }]} />
              </View>

              <View style={[styles.checklistItem, styles.checklistItemActive]}>
                <MaterialIcons name="check-circle" size={24} color="#1d6f42" />
                <View style={[styles.bar, { width: 80, backgroundColor: 'rgba(29, 111, 66, 0.2)' }]} />
              </View>
            </View>

            {/* Floating AI Insight Bubble */}
            <View style={styles.aiInsightBubble}>
              <View style={styles.aiInsightHeader}>
                <MaterialIcons name="auto-awesome" size={12} color="#5c51b0" />
                <Text style={styles.aiInsightTitle}>AI INSIGHT</Text>
              </View>
              <Text style={styles.aiInsightText}>Consistent logging improves results by 40%.</Text>
            </View>

            <View style={styles.mockupImagePlaceholder}>
              <MaterialIcons name="restaurant" size={32} color="#bfc9be" />
            </View>
          </View>
        </View>
      </View>

      {/* Content Section (Bottom 40%) */}
      <View style={[styles.contentCard, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.interactionArea}>
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>

          {/* Typography Content */}
          <View style={styles.textContent}>
            <Text style={styles.title}>Log meals in 10 seconds.</Text>
            <Text style={styles.subtitle}>
              Tap to mark what you ate. The app tracks calories, streaks, and habits automatically.
            </Text>
          </View>
        </View>

        {/* Action Area */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  illustrationArea: {
    height: '60%',
    backgroundColor: '#E8F5EE',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  bgBlobTopRight: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: 256,
    height: 256,
    backgroundColor: 'rgba(0, 85, 46, 0.05)',
    borderRadius: 128,
  },
  bgBlobBottomLeft: {
    position: 'absolute',
    bottom: '10%',
    left: '-5%',
    width: 192,
    height: 192,
    backgroundColor: 'rgba(92, 81, 176, 0.05)',
    borderRadius: 96,
  },
  mockupContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 48,
    zIndex: 10,
  },
  phoneMockup: {
    width: 280,
    aspectRatio: 0.8,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 16,
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  phoneSpeaker: {
    width: 48,
    height: 4,
    backgroundColor: '#e2e3e1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  checklist: {
    gap: 16,
    marginTop: 8,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  checklistItemActive: {
    backgroundColor: 'rgba(164, 244, 187, 0.3)', // primary-fixed/30
  },
  checklistItemInactive: {
    backgroundColor: '#f4f4f2', // surface-container-low
  },
  bar: {
    height: 8,
    borderRadius: 4,
  },
  mockupImagePlaceholder: {
    width: '100%',
    height: 96,
    borderRadius: 12,
    marginTop: 'auto',
    backgroundColor: '#f4f4f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsightBubble: {
    position: 'absolute',
    right: -24,
    bottom: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 16,
    maxWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 20,
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  aiInsightTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#5c51b0',
    letterSpacing: 0.5,
  },
  aiInsightText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#3f4941',
    fontWeight: '500',
  },
  contentCard: {
    height: '40%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingHorizontal: 32,
    paddingTop: 40,
    zIndex: 20,
    justifyContent: 'space-between',
  },
  interactionArea: {
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e3e1',
  },
  dotActive: {
    width: 24,
    height: 8,
    backgroundColor: '#1d6f42',
  },
  textContent: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 28,
    lineHeight: 32,
    color: '#1a1c1b',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'DM-Sans',
    fontSize: 16,
    lineHeight: 24,
    color: '#3f4941',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  actions: {
    gap: 24,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1d6f42', // Fallback
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 18,
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipButtonText: {
    color: '#3f4941',
    fontFamily: 'DM-Sans',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
});
