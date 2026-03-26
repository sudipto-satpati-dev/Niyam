import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoutineItem } from '../../types/plan';

interface PlanRoutineRowProps {
  item: RoutineItem;
}

const TYPE_BADGES = {
  meal:     { label: 'Meal',     bg: '#E8F5EE', text: '#0F6E56' },
  habit:    { label: 'Habit',    bg: '#E1F5EE', text: '#085041' },
  exercise: { label: 'Exercise', bg: '#EEEDFE', text: '#3C3489' },
};

export const PlanRoutineRow: React.FC<PlanRoutineRowProps> = ({ item }) => {
  const badge = TYPE_BADGES[item.type];

  return (
    <View style={styles.container}>
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>{item.time}</Text>
        <View style={styles.dot} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
    marginRight: 16,
  },
  timeText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#6F7A70',
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1D6F42',
  },
  content: {
    flex: 1,
    backgroundColor: '#F9F9F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 15,
    color: '#1A1C1B',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
});
