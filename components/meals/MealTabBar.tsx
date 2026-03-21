import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MealType } from '../../types/plan';

export const MEAL_TAB_LABELS: Record<MealType, string> = {
  breakfast:    'Breakfast',
  morningSnack: 'Snack',
  lunch:        'Lunch',
  eveningSnack: 'Eve Snack',
  dinner:       'Dinner',
};

interface MealTabBarProps {
  activeTab: MealType;
  onTabSelect: (tab: MealType) => void;
}

export const MealTabBar: React.FC<MealTabBarProps> = ({ activeTab, onTabSelect }) => {
  const tabs = Object.keys(MEAL_TAB_LABELS) as MealType[];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onTabSelect(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {MEAL_TAB_LABELS[tab]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f7',
    paddingBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#f4f4f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeTab: {
    backgroundColor: '#1d6f42',
  },
  tabText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  activeTabText: {
    fontFamily: 'DM-Sans-SemiBold',
    color: '#FFFFFF',
  },
});
