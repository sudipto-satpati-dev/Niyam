import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Platform, KeyboardAvoidingView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

export default function IntakeScheduleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [hasLunchBreak, setHasLunchBreak] = useState(true);
  const [weekendSchedule, setWeekendSchedule] = useState('');

  const handleNext = () => {
    // Navigate to next intake screen or tabs
    router.replace('/intake-diet');
  };

  const handleBack = () => {
    router.back();
  };

  const TimeRow = ({ label, time }: { label: string, time: string }) => (
    <Pressable style={styles.timeRow}>
      <Text style={styles.timeRowLabel}>{label}</Text>
      <View style={styles.timeRowValueContainer}>
        <Text style={styles.timeRowValue}>{time}</Text>
        <MaterialIcons name="chevron-right" size={20} color="#bfc9be" />
      </View>
    </Pressable>
  );

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
            <Text style={styles.progressStep}>STEP 3 OF 5</Text>
            <Text style={styles.progressPercentage}>60%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '60%' }]} />
          </View>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>What does your day look like?</Text>

        {/* AI Insight Bubble */}
        <View style={styles.insightBubble}>
          <MaterialIcons name="auto-awesome" size={18} color="#5c51b0" style={{ marginTop: 2 }} />
          <Text style={styles.insightText}>
            Understanding your routine helps me suggest the best windows for activity and nutrition.
          </Text>
        </View>

        {/* Time Picker Rows */}
        <View style={styles.timeRowsContainer}>
          <TimeRow label="Wake up time" time="06:30 AM" />
          <TimeRow label="Work/college start" time="09:00 AM" />
          
          {/* Lunch Break Toggle Row */}
          <View style={styles.lunchBreakContainer}>
            <View style={styles.lunchBreakToggleRow}>
              <Text style={styles.timeRowLabel}>Lunch break available</Text>
              <Switch 
                value={hasLunchBreak}
                onValueChange={setHasLunchBreak}
                trackColor={{ false: '#e2e3e1', true: '#1d6f42' }}
                thumbColor="#ffffff"
              />
            </View>
            {hasLunchBreak && (
              <Pressable style={styles.lunchBreakTimeRow}>
                <Text style={styles.lunchBreakTimeLabel}>Break time</Text>
                <View style={styles.timeRowValueContainer}>
                  <Text style={styles.timeRowValue}>12:30 PM</Text>
                  <MaterialIcons name="chevron-right" size={20} color="#bfc9be" />
                </View>
              </Pressable>
            )}
          </View>

          <TimeRow label="Work end time" time="05:30 PM" />
          <TimeRow label="Sleep target time" time="10:30 PM" />
        </View>

        {/* Weekend Schedule Textarea */}
        <View style={styles.weekendSection}>
          <Text style={styles.weekendLabel}>Describe your weekend schedule</Text>
          <TextInput 
            style={styles.weekendInput}
            value={weekendSchedule}
            onChangeText={setWeekendSchedule}
            placeholder="e.g. free mornings, usually at home, can cook"
            placeholderTextColor="rgba(63, 73, 65, 0.5)"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
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
  logo: {
    width: 120,
    height: 32,
  },
  appBarSpacer: {
    width: 32,
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
    fontSize: 32,
    fontWeight: '900',
    color: '#1a1c1b',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  insightBubble: {
    marginBottom: 32,
    backgroundColor: 'rgba(228, 223, 255, 0.3)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
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
  timeRowsContainer: {
    gap: 16,
    marginBottom: 40,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  timeRowLabel: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 16,
    color: '#1a1c1b',
  },
  timeRowValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeRowValue: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 16,
    color: '#00552e',
    fontWeight: '600',
  },
  lunchBreakContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  lunchBreakToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(191, 201, 190, 0.2)',
  },
  lunchBreakTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(244, 244, 242, 0.4)',
  },
  lunchBreakTimeLabel: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  weekendSection: {
    marginBottom: 32,
  },
  weekendLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1c1b',
    marginBottom: 12,
  },
  weekendInput: {
    width: '100%',
    backgroundColor: '#f4f4f2',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'DM-Sans',
    fontSize: 15,
    color: '#1a1c1b',
    minHeight: 100,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#ffffff',
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
});
