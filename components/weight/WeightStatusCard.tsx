import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeightStatusCardProps {
  currentWeight: number;
  startWeight: number;
  goalWeight: number;
}

export const WeightStatusCard: React.FC<WeightStatusCardProps> = ({
  currentWeight,
  startWeight,
  goalWeight,
}) => {
  const lostKg = parseFloat((startWeight - currentWeight).toFixed(1));
  const totalToLose = startWeight - goalWeight;
  const progressPct = totalToLose > 0 
    ? Math.min(Math.round((lostKg / totalToLose) * 100), 100)
    : 0;

  return (
    <View style={styles.card}>
      <View style={styles.statsRow}>
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>Current</Text>
          <Text style={styles.statValue}>
            {currentWeight.toFixed(1)}
            <Text style={styles.unit}>kg</Text>
          </Text>
        </View>
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>Lost so far</Text>
          <Text style={[styles.statValue, { color: '#BA7517' }]}>
            {lostKg > 0 ? lostKg.toFixed(1) : '0.0'}
            <Text style={styles.unit}>kg</Text>
          </Text>
        </View>
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>Goal</Text>
          <Text style={[styles.statValue, { color: '#4a4949' }]}>
            {goalWeight}
            <Text style={styles.unit}>kg</Text>
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progress to goal</Text>
          <Text style={styles.progressPct}>{progressPct}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${Math.max(progressPct, 4)}%` } 
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statColumn: {
    flex: 1,
  },
  statLabel: {
    fontFamily: 'DM-Sans',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#6F7A70',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 28,
    color: '#1D6F42',
  },
  unit: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#3F4941',
    marginLeft: 2,
  },
  progressSection: {
    gap: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressTitle: {
    fontFamily: 'DM-Sans',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: -0.2,
    color: '#3F4941',
  },
  progressPct: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1D6F42',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#EEEEEC',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1D6F42',
    borderRadius: 99,
  },
});
