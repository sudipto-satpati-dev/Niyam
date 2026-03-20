import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

export default function IntakeGoalsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [weight, setWeight] = useState('72.5');
  const [timeframe, setTimeframe] = useState('2 months');

  const timeframes = ['1 month', '2 months', '3 months', '6 months'];

  const handleNext = () => {
    // Navigate to next intake screen or tabs
    router.replace('/intake-schedule');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#ffffff' }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      
      {/* TopAppBar */}
      <View style={[styles.appBar, { paddingTop: Math.max(insets.top, 60) }]}>
        <Pressable onPress={handleBack} style={({pressed}) => [styles.backButton, pressed && { opacity: 0.7 }]}>
          <MaterialIcons name="arrow-back" size={24} color="#1d6f42" />
        </Pressable>
        <Image 
          source={require('@/assets/Logos/secondary-logo.png')} 
          style={styles.logo} 
          contentFit="contain" 
        />
        <View style={styles.appBarSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} showsVerticalScrollIndicator={false}>
        {/* Progress Bar Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressStep}>STEP 2 OF 5</Text>
            <Text style={styles.progressPercentage}>40%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '40%' }]} />
          </View>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>What's your goal?</Text>

        {/* Large Goal Weight Input */}
        <View style={styles.weightInputContainer}>
          <View style={styles.weightInputRow}>
            <TextInput 
              style={styles.weightInput}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              maxLength={5}
            />
            <Text style={styles.weightUnit}>kg</Text>
          </View>
          <View style={styles.weightUnderline} />
        </View>

        {/* Timeframe Picker */}
        <View style={styles.timeframeSection}>
          <Text style={styles.timeframeLabel}>TIMEFRAME</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeframeScroll}>
            {timeframes.map(tz => (
              <Pressable 
                key={tz}
                style={[styles.timeframeItem, timeframe === tz && styles.timeframeItemActive]}
                onPress={() => setTimeframe(tz)}
              >
                <Text style={[styles.timeframeText, timeframe === tz && styles.timeframeTextActive]}>
                  {tz}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <MaterialIcons name="auto-awesome" size={20} color="#00552e" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryTitle}>AI Recommendation</Text>
            <Text style={styles.summaryText}>
              To reach <Text style={styles.summaryBoldHighlight}>{weight}kg</Text> you need to lose <Text style={styles.summaryBold}>5.5kg</Text> — about <Text style={styles.summaryBold}>0.7kg</Text> per week on a <Text style={styles.summaryBold}>{timeframe}</Text> plan.
            </Text>
          </View>
          {/* Decorative Subtle Pattern */}
          <View style={styles.summaryDeco} />
        </View>

        {/* AI Insight Bubble */}
        <View style={styles.insightBubble}>
          <MaterialIcons name="lightbulb" size={18} color="#5c51b0" style={{ marginTop: 2 }} />
          <Text style={styles.insightText}>
            Steady progress (0.5–1kg per week) is clinically proven to be more sustainable for long-term health than rapid weight loss.
          </Text>
        </View>

        {/* Spacer for bottom actions */}
        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Bottom Actions Area */}
      <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Pressable 
          style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          onPress={handleNext}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
          <MaterialIcons name="chevron-right" size={24} color="#ffffff" style={styles.primaryButtonIcon} />
        </Pressable>
        <Pressable onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>SKIP FOR NOW</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    zIndex: 50,
  },
  backButton: {
    padding: 4,
  },
  appBarSpacer: {
    width: 32, // to balance the flex-between with the back button
  },
  logo: {
    width: 120,
    height: 32,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  progressSection: {
    marginBottom: 40,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  progressStep: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    letterSpacing: 1,
    color: '#3f4941',
  },
  progressPercentage: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#00552e',
    fontWeight: 'bold',
  },
  progressBarTrack: {
    height: 6,
    width: '100%',
    backgroundColor: '#e8e8e6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1d6f42',
    borderRadius: 3,
  },
  headline: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 40,
    fontWeight: '900',
    color: '#1a1c1b',
    marginBottom: 32,
    letterSpacing: -1,
  },
  weightInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  weightInputRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  weightInput: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 72,
    fontWeight: '900',
    color: '#1a1c1b',
    textAlign: 'center',
    padding: 0,
    minWidth: 140,
  },
  weightUnit: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3f4941',
    marginLeft: 8,
  },
  weightUnderline: {
    height: 4,
    width: 96,
    backgroundColor: 'rgba(29, 111, 66, 0.2)',
    borderRadius: 2,
    marginTop: 8,
  },
  timeframeSection: {
    marginBottom: 40,
  },
  timeframeLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3f4941',
    letterSpacing: 1,
    marginBottom: 16,
  },
  timeframeScroll: {
    gap: 12,
    paddingBottom: 8,
  },
  timeframeItem: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#e8e8e6',
    borderRadius: 999,
  },
  timeframeItemActive: {
    backgroundColor: '#1d6f42',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeframeText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1c1b',
  },
  timeframeTextActive: {
    color: '#ffffff',
  },
  summaryCard: {
    backgroundColor: '#E8F5EE',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    gap: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 85, 46, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    zIndex: 10,
  },
  summaryTextContainer: {
    flex: 1,
    zIndex: 10,
  },
  summaryTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1c1b',
    marginBottom: 4,
  },
  summaryText: {
    fontFamily: 'DM-Sans',
    fontSize: 15,
    lineHeight: 22,
    color: '#3f4941',
  },
  summaryBoldHighlight: {
    fontFamily: 'DM-Sans-Bold',
    fontWeight: 'bold',
    color: '#00552e',
  },
  summaryBold: {
    fontFamily: 'DM-Sans-Bold',
    fontWeight: 'bold',
  },
  summaryDeco: {
    position: 'absolute',
    top: -16,
    right: -16,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(0, 85, 46, 0.05)',
    zIndex: 1,
  },
  insightBubble: {
    marginTop: 32,
    backgroundColor: 'rgba(228, 223, 255, 0.3)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  insightText: {
    flex: 1,
    fontFamily: 'DM-Sans',
    fontSize: 14,
    lineHeight: 20,
    color: '#443897',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#ffffff', // MATCH container background to blend in nicely, fading not required usually in simple native apps unless requested. But let's keep it solid.
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1d6f42',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1d6f42',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryButtonIcon: {
    position: 'absolute',
    right: 24,
  },
  skipButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipButtonText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: '#3f4941',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.7,
  },
});
