import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BasicInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [sex, setSex] = useState('Male');
  const [heightUnit, setHeightUnit] = useState('CM');

  const handleNext = () => {
    // Navigate to next intake screen or tabs
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />

      {/* TopAppBar */}
      <View style={[styles.appBar, { paddingTop: Math.max(insets.top, 60) }]}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}>
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
            <Text style={styles.progressStep}>Step 1 of 5</Text>
            <Text style={styles.progressPercentage}>20%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '20%' }]} />
          </View>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>Tell us about yourself</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#bfc9be"
            />
          </View>

          {/* Age & Sex Row */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#bfc9be"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 2.2 }]}>
              <Text style={styles.label}>Sex</Text>
              <View style={styles.toggleContainer}>
                {['Male', 'Female', 'Other'].map(option => (
                  <Pressable
                    key={option}
                    style={[styles.toggleButton, sex === option && styles.toggleButtonActive]}
                    onPress={() => setSex(option)}
                  >
                    <Text style={[styles.toggleButtonText, sex === option && styles.toggleButtonTextActive]}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Height */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height</Text>
            <View style={styles.inputWithSuffix}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="175"
                placeholderTextColor="#bfc9be"
                keyboardType="numeric"
              />
              <View style={styles.unitToggleContainer}>
                {['CM', 'FT'].map(unit => (
                  <Pressable
                    key={unit}
                    style={[styles.unitToggleButton, heightUnit === unit && styles.unitToggleButtonActive]}
                    onPress={() => setHeightUnit(unit)}
                  >
                    <Text style={[styles.unitToggleText, heightUnit === unit && styles.unitToggleTextActive]}>
                      {unit}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Weight */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Current Weight</Text>
              <View style={styles.inputWithSuffix}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="70"
                  placeholderTextColor="#bfc9be"
                  keyboardType="numeric"
                />
                <Text style={styles.suffixText}>KG</Text>
              </View>
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Goal Weight</Text>
              <View style={styles.inputWithSuffix}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="65"
                  placeholderTextColor="#bfc9be"
                  keyboardType="numeric"
                />
                <Text style={styles.suffixText}>KG</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Insight Bubble */}
        <View style={styles.aiInsight}>
          <View style={styles.aiIconContainer}>
            <MaterialIcons name="auto-awesome" size={14} color="#ffffff" />
          </View>
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>Why we ask?</Text>
            <Text style={styles.aiSubtitle}>
              Basic metrics allow our AI to calculate your BMR and personalize your health journey accurately.
            </Text>
          </View>
        </View>

        {/* Spacer for bottom actions */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Actions Area */}
      <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          onPress={handleNext}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
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
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressStep: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  progressPercentage: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1d6f42',
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1c1b',
    marginBottom: 32,
    letterSpacing: -0.5,
  },
  formContainer: {
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#3f4941',
    paddingHorizontal: 4,
  },
  input: {
    height: 52,
    backgroundColor: '#f4f4f2',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'DM-Sans-Medium',
    fontSize: 16,
    color: '#1a1c1b',
  },
  inputWithSuffix: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f2',
    borderRadius: 12,
    paddingRight: 12,
  },
  suffixText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3f4941',
    marginLeft: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#f4f4f2',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButtonText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  toggleButtonTextActive: {
    color: '#1d6f42',
    fontWeight: 'bold',
    fontFamily: 'DM-Sans-Bold',
  },
  unitToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e6',
    borderRadius: 8,
    padding: 2,
  },
  unitToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  unitToggleButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unitToggleText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3f4941',
  },
  unitToggleTextActive: {
    color: '#1a1c1b',
  },
  aiInsight: {
    marginTop: 32,
    padding: 16,
    backgroundColor: 'rgba(228, 223, 255, 0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  aiIconContainer: {
    backgroundColor: '#5c51b0',
    padding: 8,
    borderRadius: 999,
  },
  aiTextContainer: {
    flex: 1,
    gap: 4,
  },
  aiTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#443897',
  },
  aiSubtitle: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    lineHeight: 18,
    color: '#443897',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
