import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, BounceIn } from 'react-native-reanimated';

import Sidebar from '@/components/home/Sidebar';
import { usePlanStore } from '@/stores/planStore';
import { useDailyLogStore } from '@/stores/dailyLogStore';
import { AcknowledgementRing } from '@/components/habits/AcknowledgementRing';
import { NonNegotiableCard } from '@/components/habits/NonNegotiableCard';
import { RecipeCard } from '@/components/habits/RecipeCard';
import { AvoidCard } from '@/components/habits/AvoidCard';

import { mockHomeState } from '@/Data/mockHomeState';

export default function HabitsScreen() {
  const { user } = mockHomeState;
  const router = useRouter();
  const plan = usePlanStore(s => s.plan);
  const source = usePlanStore(s => s.source);
  const acknowledged = useDailyLogStore(s => s.today.acknowledgedRules);
  const streak = useDailyLogStore(s => s.streak);
  const habits = useDailyLogStore(s => s.today.habits);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const nonNegotiables = plan.habits.nonNegotiables;
  const acknowledgedCount = acknowledged.length;
  const allAcknowledged = acknowledgedCount === nonNegotiables.length;

  const isMorningDrinkDone = useMemo(() => {
    return habits.some(h => h.habitKey === 'morningDrink' && h.status === 'done');
  }, [habits]);

  const handleAcknowledge = (id: string) => {
    useDailyLogStore.getState().acknowledgeRule(id);
  };

  const handleUnacknowledge = (id: string) => {
    useDailyLogStore.getState().unacknowledgeRule(id);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.topAppBar}>
          <View style={styles.topAppLeft}>
            <TouchableOpacity onPress={() => setIsSidebarOpen(true)} style={styles.menuIconBox}>
              <Ionicons name="menu" size={28} color="#1D6F42" />
            </TouchableOpacity>
            <Image
              source={require('../../assets/Logos/secondary-logo.png')}
              style={{ height: 28, width: 88, resizeMode: 'contain', marginLeft: 4 }}
            />
          </View>
          <View style={styles.topBarRight}>
            <TouchableOpacity onPress={() => router.push('/settings' as any)} style={styles.gearBtn}>
              <Ionicons name="settings-outline" size={22} color="#1D6F42" />
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.stickyHeader}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Foundation</Text>
            <Text style={styles.headerSubtitle}>Track your habits</Text>
          </View>
          <AcknowledgementRing 
            done={acknowledgedCount} 
            total={nonNegotiables.length} 
          />
        </View>
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {allAcknowledged ? (
          <Animated.View 
            entering={BounceIn} 
            style={styles.successBanner}
          >
            <View style={styles.trophyContainer}>
              <Ionicons name="trophy" size={24} color="#1D6F42" />
            </View>
            <View style={styles.successTextContainer}>
              <Text style={styles.successTitle}>All 5 done today!</Text>
              <Text style={styles.successSub}>Your discipline score gets a full +40 points</Text>
            </View>
          </Animated.View>
        ) : acknowledgedCount === 0 ? (
          <View style={styles.introBanner}>
            <Text style={styles.introTitle}>Establish your foundation</Text>
            <Text style={styles.introSub}>
              Acknowledge your 5 core pillars every day to build lasting health momentum.
            </Text>
          </View>
        ) : null}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Non-Negotiables</Text>
          {allAcknowledged && (
            <Text style={styles.completedBadge}>COMPLETED</Text>
          )}
        </View>

        <View style={styles.cardsList}>
          {nonNegotiables.map((rule, idx) => (
            <NonNegotiableCard
              key={rule.id}
              rule={rule}
              index={idx + 1}
              isAcknowledged={acknowledged.includes(rule.id)}
              onAcknowledge={handleAcknowledge}
              onUnacknowledge={handleUnacknowledge}
            />
          ))}
        </View>

        <View style={styles.spacer} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Morning Ritual</Text>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={14} color="#5C51B0" />
            <Text style={styles.streakText}>{streak} day streak</Text>
          </View>
        </View>

        <RecipeCard 
          drink={plan.habits.morningDrink}
          isDone={isMorningDrinkDone}
          onPress={() => router.push('/morning-drink')}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Foods to Avoid</Text>
        </View>

        <View style={styles.cardsList}>
          {plan.habits.avoidList.map((item, idx) => (
            <AvoidCard key={idx} item={item} />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.planButton}
          onPress={() => router.push('/my-plan')}
        >
          <Text style={styles.planButtonText}>View My Full Plan</Text>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </TouchableOpacity>

      </ScrollView>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName={user.name}
      />
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
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  topAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 64,
    backgroundColor: '#F9F9F7',
  },
  topAppLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  menuIconBox: {
    padding: 4,
    marginLeft: -8,
    marginRight: 8,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gearBtn: {
    padding: 4,
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
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    color: '#1d6f42',
  },
  stickyHeader: {
    backgroundColor: '#F9F9F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 22,
    color: '#1A1C1B',
  },
  headerSubtitle: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 13,
    color: '#1D6F42',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 22,
    color: '#1A1C1B',
  },
  cardsList: {
    gap: 4,
  },
  successBanner: {
    flexDirection: 'row',
    backgroundColor: '#E8F5EE',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#D0E9DA',
  },
  trophyContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 18,
    color: '#1D6F42',
    marginBottom: 2,
  },
  successSub: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#1D6F42',
    opacity: 0.8,
  },
  introBanner: {
    backgroundColor: '#F1F1EF',
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
  },
  introTitle: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 18,
    color: '#1A1C1B',
    marginBottom: 8,
  },
  introSub: {
    fontFamily: 'DM-Sans',
    fontSize: 15,
    color: '#6F7A70',
    lineHeight: 22,
  },
  completedBadge: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 10,
    color: '#1D6F42',
    letterSpacing: 0.5,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEDFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  streakText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 10,
    color: '#5C51B0',
  },
  spacer: {
    height: 24,
  },
  planButton: {
    backgroundColor: '#1D6F42',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 20,
    marginTop: 24,
    gap: 12,
    shadowColor: '#1D6F42',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  planButtonText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.5,
  },
});
