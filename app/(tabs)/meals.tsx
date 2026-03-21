import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Sidebar from '../../components/home/Sidebar';
import { CalorieSummaryBar } from '../../components/meals/CalorieSummaryBar';
import { DefaultPlanNote } from '../../components/meals/DefaultPlanNote';
import { MealDetailSheet } from '../../components/meals/MealDetailSheet';
import { MealOptionCard } from '../../components/meals/MealOptionCard';
import { MealTabBar } from '../../components/meals/MealTabBar';
import { mockHomeState } from '../../Data/mockHomeState';
import { useDailyLogStore } from '../../stores/dailyLogStore';
import { usePlanStore } from '../../stores/planStore';
import { MealOption, MealType } from '../../types/plan';

const getDefaultTab = (): MealType => {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 9) return 'breakfast';
  if (hour < 12) return 'morningSnack';
  if (hour < 15) return 'lunch';
  if (hour < 19) return 'eveningSnack';
  return 'dinner';
};

export default function MealsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = mockHomeState;
  const [activeMealType, setActiveMealType] = useState<MealType>('breakfast');
  const [selectedOptionForSheet, setSelectedOptionForSheet] = useState<MealOption | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mealOptions = usePlanStore(s => s.plan.meals[activeMealType] || []);
  const targetKcal = usePlanStore(s => s.plan.calorieTargets.total);

  const todayMeals = useDailyLogStore(s => s.today.meals);
  const totalKcal = useDailyLogStore(s => s.getTodayKcal());
  const logMeal = useDailyLogStore(s => s.logMeal);
  const editMeal = useDailyLogStore(s => s.editMeal);

  const loggedOption = todayMeals.find(m => m.mealKey === activeMealType);
  const isMealLogged = !!loggedOption;

  useFocusEffect(
    useCallback(() => {
      setActiveMealType(getDefaultTab());
    }, [])
  );

  const handleInlineLog = (option: MealOption) => {
    logMeal({
      mealKey: activeMealType,
      optionId: option.id,
      optionName: option.name,
      kcal: option.kcal,
      loggedAt: new Date().toISOString(),
    });
  };

  const handleEdit = (option: MealOption) => {
    editMeal(activeMealType, {
      optionId: option.id,
      optionName: option.name,
      kcal: option.kcal,
      loggedAt: new Date().toISOString(),
    });
    setSelectedOptionForSheet(null);
  };

  const handleSheetLog = (option: MealOption) => {
    if (isMealLogged) {
      handleEdit(option);
    } else {
      handleInlineLog(option);
    }
    setSelectedOptionForSheet(null);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
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
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.stickyHeaderContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meals</Text>
          <TouchableOpacity onPress={() => router.push('/weekly-meals' as any)} style={styles.thisWeekBtn}>
            <Text style={styles.thisWeekText}>This week</Text>
            <Ionicons name="chevron-forward" size={14} color="#1D6F42" />
          </TouchableOpacity>
        </View>

        <MealTabBar activeTab={activeMealType} onTabSelect={setActiveMealType} />

        <View style={styles.paddedContent}>
          <CalorieSummaryBar loggedKcal={totalKcal} targetKcal={targetKcal} />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>CHOOSE YOUR {activeMealType.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {mealOptions.map((option: MealOption) => {
          const isLogged = loggedOption?.optionId === option.id;

          return (
            <MealOptionCard
              key={option.id}
              option={option}
              isLogged={isLogged}
              isMealLogged={isMealLogged}
              onLog={handleInlineLog}
              onEdit={handleEdit}
              onPress={(opt) => setSelectedOptionForSheet(opt)}
            />
          );
        })}

        <DefaultPlanNote />
      </ScrollView>

      <MealDetailSheet
        option={selectedOptionForSheet}
        mealKey={selectedOptionForSheet ? activeMealType : null}
        isLogged={loggedOption?.optionId === selectedOptionForSheet?.id}
        onLog={handleSheetLog}
        onClose={() => setSelectedOptionForSheet(null)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName={user.name}
      />

      {/* Floating Add Meal Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/create-meal' as any)}
        activeOpacity={0.85}
      >
        <Ionicons name="sparkles" size={18} color="#ffffff" />
        <Text style={styles.fabText}>Add Meal with AI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  topAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 64,
    backgroundColor: '#f9f9f7',
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
  logoText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 24,
    color: '#1D6F42',
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
  stickyHeaderContent: {
    backgroundColor: '#f9f9f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 22,
    color: '#1a1c1b',
  },
  thisWeekBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  thisWeekText: {
    color: '#1D6F42',
    fontFamily: 'DM-Sans-Medium',
    marginRight: 4,
  },
  paddedContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#3f4941',
    letterSpacing: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  fab: {
    position: 'absolute',
    bottom: 78,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00552e',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    shadowColor: '#00552e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  fabText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 15,
    color: '#ffffff',
  },
});
