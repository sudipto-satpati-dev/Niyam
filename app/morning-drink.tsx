import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { usePlanStore } from '@/stores/planStore';
import { useDailyLogStore } from '@/stores/dailyLogStore';

export default function MorningDrinkScreen() {
  const router = useRouter();
  const plan = usePlanStore(s => s.plan);
  const drink = plan.habits.morningDrink;
  const habits = useDailyLogStore(s => s.today.habits);
  const streak = useDailyLogStore(s => s.streak);

  const isDone = useMemo(() => {
    return habits.some(h => h.habitKey === 'morningDrink' && h.status === 'done');
  }, [habits]);

  const handleToggleDone = () => {
    const newStatus = isDone ? 'upcoming' : 'done';
    useDailyLogStore.getState().logHabit({
      habitKey: 'morningDrink',
      status: newStatus,
      loggedAt: new Date().toISOString()
    });
    
    if (newStatus === 'done') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#1A1C1B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(600)}>
          <Text style={styles.subtitle}>{drink.tagline}</Text>
          <Text style={styles.title}>{drink.name}</Text>
          
          <View style={styles.streakInfo}>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color="#5C51B0" />
              <Text style={styles.streakText}>{streak} Day Streak</Text>
            </View>
            <View style={styles.timeInfo}>
              <Ionicons name="time-outline" size={16} color="#6F7A70" />
              <Text style={styles.timeText}>Best 07:00 – 07:15 AM</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.card}>
            {drink.ingredients.map((ing, idx) => (
              <View key={idx} style={[styles.ingredientRow, idx === drink.ingredients.length - 1 && styles.lastRow]}>
                <Text style={styles.ingName}>{ing.name}</Text>
                <Text style={styles.ingAmount}>{ing.amount}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <View style={styles.card}>
            {drink.steps.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{idx + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Why it works</Text>
          <View style={styles.whyGrid}>
            {drink.whyItWorks.map((item, idx) => (
              <View key={idx} style={[styles.whyCard, { backgroundColor: item.color }]}>
                <Text style={styles.whyIngredient}>{item.ingredient}</Text>
                <Text style={styles.whyBenefit}>{item.benefit}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <SafeAreaView style={styles.bottomBar} edges={['bottom']}>
        <TouchableOpacity 
          style={[styles.doneButton, isDone && styles.doneButtonActive]} 
          onPress={handleToggleDone}
        >
          <Ionicons 
            name={isDone ? "checkmark-circle" : "radio-button-off"} 
            size={24} 
            color={isDone ? "white" : "#1D6F42"} 
          />
          <Text style={[styles.doneButtonText, isDone && styles.doneButtonTextActive]}>
            {isDone ? 'COMPLETED TODAY' : 'MARK AS DONE TODAY'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9F9F7',
  },
  safeArea: {
    backgroundColor: '#F9F9F7',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 16,
    color: '#1A1C1B',
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  subtitle: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    color: '#1D6F42',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 32,
    color: '#1A1C1B',
    lineHeight: 38,
    marginBottom: 16,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEDFE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  streakText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    color: '#5C51B0',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    color: '#6F7A70',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 20,
    color: '#1A1C1B',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1EF',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  ingName: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 15,
    color: '#1A1C1B',
  },
  ingAmount: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 15,
    color: '#1D6F42',
  },
  stepRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F4F4F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    color: '#1D6F42',
  },
  stepText: {
    flex: 1,
    fontFamily: 'DM-Sans',
    fontSize: 15,
    color: '#3F4941',
    lineHeight: 22,
  },
  whyGrid: {
    gap: 12,
  },
  whyCard: {
    padding: 20,
    borderRadius: 16,
  },
  whyIngredient: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 16,
    color: '#1A1C1B',
    marginBottom: 4,
  },
  whyBenefit: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#3F4941',
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(249,249,247,0.9)',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  doneButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1D6F42',
  },
  doneButtonActive: {
    backgroundColor: '#1D6F42',
    borderColor: '#1D6F42',
  },
  doneButtonText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 16,
    color: '#1D6F42',
  },
  doneButtonTextActive: {
    color: 'white',
  },
});
