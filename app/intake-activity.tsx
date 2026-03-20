import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

export default function IntakeActivityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activityLevel, setActivityLevel] = useState('Moderate');
  const [equipment, setEquipment] = useState<string[]>(['Dumbbells', 'Resistance bands']);
  const [timeAvailable, setTimeAvailable] = useState('30 min');

  const activityOptions = [
    { label: 'None', icon: 'chair' as const },
    { label: 'Light', icon: 'directions-walk' as const },
    { label: 'Moderate', icon: 'fitness-center' as const },
  ];

  const equipmentOptions = ['No equipment', 'Dumbbells', 'Resistance bands', 'Gym access'];
  const timeOptions = ['15 min', '30 min', '45 min', '1 hr+'];

  const toggleEquipment = (item: string) => {
    if (equipment.includes(item)) {
      setEquipment(equipment.filter(e => e !== item));
    } else {
      setEquipment([...equipment, item]);
    }
  };

  const handleNext = () => {
    // Generate plan and navigate to tabs
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
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressStep}>STEP 5 OF 5</Text>
            <Text style={styles.progressPercentage}>100%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '100%' }]} />
          </View>
        </View>

        {/* Headline */}
        <View style={styles.header}>
          <Text style={styles.headline}>Your activity level.</Text>
          <Text style={styles.subhead}>Help us tailor your daily movement plan based on your current routine and available tools.</Text>
        </View>

        {/* Activity Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Current exercise</Text>
          <View style={styles.activityGrid}>
            {activityOptions.map(option => {
              const isActive = activityLevel === option.label;
              return (
                <Pressable
                  key={option.label}
                  style={[styles.activityCard, isActive && styles.activityCardActive]}
                  onPress={() => setActivityLevel(option.label)}
                >
                  {isActive && (
                    <View style={styles.activityCheck}>
                      <MaterialIcons name="check" size={12} color="#ffffff" />
                    </View>
                  )}
                  <MaterialIcons 
                    name={option.icon} 
                    size={32} 
                    color={isActive ? '#1d6f42' : '#6f7a70'} 
                  />
                  <Text style={[styles.activityLabel, isActive && styles.activityLabelActive]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Equipment Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>Equipment</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Multi-select</Text>
            </View>
          </View>
          <View style={styles.equipmentTags}>
            {equipmentOptions.map(item => {
              const isSelected = equipment.includes(item);
              return (
                <Pressable
                  key={item}
                  style={[styles.equipmentTag, isSelected && styles.equipmentTagSelected]}
                  onPress={() => toggleEquipment(item)}
                >
                  <Text style={[styles.equipmentTagText, isSelected && styles.equipmentTagTextSelected]}>
                    {item}
                  </Text>
                  {isSelected && (
                    <MaterialIcons name="close" size={14} color="#ffffff" style={{ marginLeft: 6 }} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Time Available Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Time available</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeScroll}>
            {timeOptions.map(time => {
              const isSelected = timeAvailable === time;
              return (
                <Pressable
                  key={time}
                  style={[styles.timeButton, isSelected && styles.timeButtonSelected]}
                  onPress={() => setTimeAvailable(time)}
                >
                  <Text style={[styles.timeButtonText, isSelected && styles.timeButtonTextSelected]}>
                    {time}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* AI Insight Bubble */}
        <View style={styles.insightBubble}>
          <View style={styles.insightIconContainer}>
            <MaterialIcons name="auto-awesome" size={16} color="#ffffff" />
          </View>
          <View style={styles.insightTextContainer}>
            <Text style={styles.insightText}>
              Based on your "{activityLevel}" activity level, our AI will prioritize metabolic conditioning to maximize your {timeAvailable} window.
            </Text>
          </View>
        </View>

        {/* Spacer for bottom actions */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Actions Area */}
      <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Pressable 
          style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          onPress={handleNext}
        >
          <MaterialIcons name="auto-awesome" size={20} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Generate my plan</Text>
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
    marginBottom: 32,
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
    color: '#6f7a70',
  },
  progressPercentage: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
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
  header: {
    marginBottom: 32,
  },
  headline: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 32,
    fontWeight: '900',
    color: '#1a1c1b',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subhead: {
    fontFamily: 'DM-Sans',
    fontSize: 16,
    color: '#3f4941',
    lineHeight: 24,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1c1b',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#e8e8e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    color: '#3f4941',
  },
  activityGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  activityCard: {
    flex: 1,
    height: 120,
    backgroundColor: '#f4f4f2',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activityCardActive: {
    backgroundColor: '#ffffff',
    borderColor: '#1d6f42',
    shadowColor: '#1d6f42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  activityCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#1d6f42',
    borderRadius: 10,
    padding: 2,
  },
  activityLabel: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    color: '#6f7a70',
    fontWeight: '600',
  },
  activityLabelActive: {
    color: '#1d6f42',
    fontWeight: 'bold',
    fontFamily: 'DM-Sans-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  equipmentTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  equipmentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#e8e8e6',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  equipmentTagSelected: {
    backgroundColor: '#1d6f42',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  equipmentTagText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  equipmentTagTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'DM-Sans-Bold',
  },
  timeScroll: {
    gap: 12,
    paddingBottom: 8,
  },
  timeButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#f4f4f2',
    borderRadius: 999,
  },
  timeButtonSelected: {
    backgroundColor: '#1d6f42',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  timeButtonText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  timeButtonTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'DM-Sans-Bold',
  },
  insightBubble: {
    flexDirection: 'row',
    backgroundColor: 'rgba(228, 223, 255, 0.3)',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(164, 153, 254, 0.2)',
  },
  insightIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#5c51b0',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  insightTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  insightText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    lineHeight: 22,
    color: '#443897',
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
    gap: 12,
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
