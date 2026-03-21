import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalorieSummaryBarProps {
  loggedKcal: number;
  targetKcal: number;
}

export const CalorieSummaryBar: React.FC<CalorieSummaryBarProps> = ({ loggedKcal, targetKcal }) => {
  const fraction = Math.min(loggedKcal / targetKcal, 1);
  const fillWidth = `${fraction * 100}%`;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>TODAY</Text>
        <Text style={styles.valueRow}>
          <Text style={styles.logged}>{loggedKcal.toLocaleString()}</Text>
          <Text style={styles.target}> / {targetKcal.toLocaleString()} kcal</Text>
        </Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: fillWidth as any }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 12,
    color: '#3f4941',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  valueRow: {
    textAlign: 'right',
  },
  logged: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 20,
    color: '#00552e',
  },
  target: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 16,
    color: '#3f4941',
  },
  barBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#eeeeec',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#1d6f42',
    borderRadius: 4,
  },
});
