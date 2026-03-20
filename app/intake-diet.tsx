import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

export default function IntakeDietScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [dietType, setDietType] = useState('Vegetarian');
  const [cookingAccess, setCookingAccess] = useState('Mostly outside');
  const [allergies, setAllergies] = useState('');
  const [budget, setBudget] = useState('₹300');

  const dietTypes = ['Vegetarian', 'Non-veg', 'Vegan'];
  const cookingOptions = [
    { label: 'Cook at home', icon: 'soup-kitchen' as const },
    { label: 'Mostly outside', icon: 'restaurant' as const },
    { label: 'Mix of both', icon: 'room-service' as const },
  ];
  const budgetOptions = ['₹100', '₹200', '₹300', '₹500+'];

  const handleNext = () => {
    // Navigate to next intake screen or tabs
    router.replace('/intake-activity');
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
            <Text style={styles.progressStep}>STEP 4 OF 5</Text>
            <Text style={styles.progressPercentage}>80%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '80%' }]} />
          </View>
        </View>

        {/* Headline */}
        <View style={styles.header}>
          <Text style={styles.headline}>Your food preferences.</Text>
          <Text style={styles.subhead}>Tailor your nutrition plan to fit your lifestyle and dietary requirements.</Text>
        </View>

        {/* Form Content */}
        <View style={styles.formContainer}>
          
          {/* Diet Type Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>What is your diet type?</Text>
            <View style={styles.dietTypesContainer}>
              {dietTypes.map(type => (
                <Pressable
                  key={type}
                  style={[styles.dietTypeButton, dietType === type && styles.dietTypeButtonActive]}
                  onPress={() => setDietType(type)}
                >
                  <Text style={[styles.dietTypeText, dietType === type && styles.dietTypeTextActive]}>
                    {type}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Cooking Access */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>How do you manage meals?</Text>
            <View style={styles.cookingContainer}>
              {cookingOptions.map(option => (
                <Pressable
                  key={option.label}
                  style={[styles.cookingOption, cookingAccess === option.label && styles.cookingOptionActive]}
                  onPress={() => setCookingAccess(option.label)}
                >
                  <Text style={[styles.cookingOptionText, cookingAccess === option.label && styles.cookingOptionTextActive]}>
                    {option.label}
                  </Text>
                  <MaterialIcons 
                    name={option.icon} 
                    size={24} 
                    color={cookingAccess === option.label ? '#1d6f42' : '#6f7a70'} 
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Allergies/Avoid */}
          <View style={styles.section}>
            <View style={styles.labelRow}>
              <Text style={styles.sectionLabel}>Allergies or restrictions</Text>
              <Text style={styles.optionalText}>Optional</Text>
            </View>
            <TextInput 
              style={styles.textArea}
              value={allergies}
              onChangeText={setAllergies}
              placeholder="e.g. no dairy, no eggs, no nuts"
              placeholderTextColor="rgba(63, 73, 65, 0.5)"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Budget Selector */}
          <View style={styles.budgetSection}>
            <View style={styles.budgetHeader}>
              <Text style={styles.sectionLabel}>Daily food budget</Text>
              <Text style={styles.budgetValue}>{budget}</Text>
            </View>
            <View style={styles.budgetOptionsContainer}>
              {budgetOptions.map(opt => (
                <Pressable
                  key={opt}
                  style={[styles.budgetOption, budget === opt && styles.budgetOptionActive]}
                  onPress={() => setBudget(opt)}
                >
                  <Text style={[styles.budgetOptionText, budget === opt && styles.budgetOptionTextActive]}>
                    {opt}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* AI Insight Bubble */}
          <View style={styles.insightBubble}>
            <View style={styles.insightIconContainer}>
              <MaterialIcons name="auto-awesome" size={16} color="#ffffff" />
            </View>
            <View style={styles.insightTextContainer}>
              <Text style={styles.insightTitle}>AI Insights</Text>
              <Text style={styles.insightText}>
                Knowing your cooking habits helps me suggest recipes that fit your schedule and budget precisely.
              </Text>
            </View>
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
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subhead: {
    fontFamily: 'DM-Sans',
    fontSize: 16,
    color: '#3f4941',
    lineHeight: 24,
  },
  formContainer: {
    gap: 32,
  },
  section: {},
  sectionLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1c1b',
    marginBottom: 16,
  },
  dietTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dietTypeButton: {
    flex: 1,
    minWidth: 90,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#f4f4f2',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dietTypeButtonActive: {
    backgroundColor: '#1d6f42',
    shadowColor: '#1d6f42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dietTypeText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
    fontWeight: '500',
  },
  dietTypeTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'DM-Sans-Bold',
  },
  cookingContainer: {
    gap: 12,
  },
  cookingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f4f4f2',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cookingOptionActive: {
    backgroundColor: '#ffffff',
    borderColor: '#1d6f42',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cookingOptionText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 16,
    color: '#1a1c1b',
  },
  cookingOptionTextActive: {
    fontFamily: 'DM-Sans-Bold',
    fontWeight: 'bold',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionalText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    color: '#6f7a70',
  },
  textArea: {
    width: '100%',
    backgroundColor: '#f4f4f2',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'DM-Sans',
    fontSize: 15,
    color: '#1a1c1b',
    minHeight: 100,
  },
  budgetSection: {
    backgroundColor: '#f4f4f2',
    borderRadius: 16,
    padding: 20,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  budgetValue: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 20,
    fontWeight: '900',
    color: '#1d6f42',
  },
  budgetOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e8e8e6',
    borderRadius: 8,
    padding: 4,
  },
  budgetOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  budgetOptionActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetOptionText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 12,
    color: '#6f7a70',
    letterSpacing: 1,
  },
  budgetOptionTextActive: {
    color: '#1d6f42',
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
    borderRadius: 18,
    backgroundColor: '#5c51b0',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  insightTextContainer: {
    flex: 1,
  },
  insightTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#443897',
    marginBottom: 4,
  },
  insightText: {
    fontFamily: 'DM-Sans',
    fontSize: 13,
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
