import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { usePlanStore } from '@/stores/planStore';
import { PlanRoutineRow } from '@/components/habits/PlanRoutineRow';

export default function MyPlanScreen() {
  const router = useRouter();
  const plan = usePlanStore(s => s.plan);
  const source = usePlanStore(s => s.source);
  const [activeTab, setActiveTab] = useState<'routine' | 'timeline'>('routine');

  const isWeekend = [0, 6].includes(new Date().getDay());
  const routine = isWeekend ? plan.weekendRoutine : plan.weekdayRoutine;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#1A1C1B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{plan.goalSummary}</Text>
          {source === 'ai' && (
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI</Text>
            </View>
          )}
        </View>
      </SafeAreaView>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(600)}>
          <Text style={styles.planTitle}>My Health Blueprint</Text>
          <Text style={styles.planSub}>
            Your personalized guide to achieving your target weight of {plan.weight.goalWeightKg} kg.
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>KCAL / DAY</Text>
              <Text style={styles.statValue}>{plan.stats.kcalPerDay}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>MEALS / DAY</Text>
              <Text style={styles.statValue}>{plan.stats.mealsPerDay}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>WORKOUTS</Text>
              <Text style={styles.statValue}>{plan.stats.workoutDays}</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'routine' && styles.activeTab]}
            onPress={() => setActiveTab('routine')}
          >
            <Text style={[styles.tabText, activeTab === 'routine' && styles.activeTabText]}>ROUTINE</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'timeline' && styles.activeTab]}
            onPress={() => setActiveTab('timeline')}
          >
            <Text style={[styles.tabText, activeTab === 'timeline' && styles.activeTabText]}>TIMELINE</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'routine' ? (
          <Animated.View entering={FadeInUp.duration(600)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {isWeekend ? "Weekend Routine" : "Weekday Routine"}
              </Text>
              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>TODAY</Text>
              </View>
            </View>
            
            <View style={styles.routineList}>
              {routine.map((item, idx) => (
                <PlanRoutineRow key={idx} item={item} />
              ))}
            </View>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInUp.duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Projected Progress</Text>
            <View style={styles.timelineList}>
              {plan.weeklyTimeline.map((item, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.weekText}>Week {item.week}</Text>
                    <Text style={styles.weightText}>{item.expectedWeightKg} kg</Text>
                  </View>
                  <Text style={styles.phaseTitle}>{item.phase}</Text>
                  <Text style={styles.focusText}>{item.focus}</Text>
                  {idx < plan.weeklyTimeline.length - 1 && <View style={styles.timelineConnector} />}
                </View>
              ))}
            </View>
          </Animated.View>
        )}

        <TouchableOpacity 
          style={styles.regenerateButton}
          onPress={() => router.push('/settings')}
        >
          <Text style={styles.regenerateButtonText}>Adjust Plan Preferences</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    paddingHorizontal: 16,
    gap: 12,
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
    flex: 1,
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#6F7A70',
  },
  aiBadge: {
    backgroundColor: '#EEEDFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  aiBadgeText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#5C51B0',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  planTitle: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 28,
    color: '#1A1C1B',
    marginBottom: 8,
  },
  planSub: {
    fontFamily: 'DM-Sans',
    fontSize: 15,
    color: '#6F7A70',
    lineHeight: 22,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  statLabel: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 9,
    color: '#6F7A70',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: '#1D6F42',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F2',
    padding: 4,
    borderRadius: 12,
    marginBottom: 32,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    color: '#6F7A70',
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: '#1D6F42',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 20,
    color: '#1A1C1B',
  },
  dayBadge: {
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dayBadgeText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#1D6F42',
  },
  routineList: {
    // Gap handled by component margin
  },
  timelineList: {
    paddingLeft: 12,
  },
  timelineItem: {
    marginBottom: 24,
    paddingLeft: 24,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  weekText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1D6F42',
  },
  weightText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    color: '#1A1C1B',
  },
  phaseTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: '#1A1C1B',
    marginBottom: 4,
  },
  focusText: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#6F7A70',
    lineHeight: 20,
  },
  timelineConnector: {
    position: 'absolute',
    left: -12,
    top: 24,
    bottom: -24,
    width: 2,
    backgroundColor: '#E8F5EE',
  },
  regenerateButton: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8E6',
    alignItems: 'center',
    marginTop: 16,
  },
  regenerateButtonText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 15,
    color: '#3F4941',
  },
});
