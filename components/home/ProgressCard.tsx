import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

interface ProgressCardProps {
  loggedKcal: number;
  totalKcal: number;
}

export default function ProgressCard({ loggedKcal, totalKcal }: ProgressCardProps) {
  const percentage = totalKcal > 0 ? Math.min(Math.round((loggedKcal / totalKcal) * 100), 100) : 0;

  return (
    <View style={styles.progressCard}>
      <View style={styles.progressLeft}>
        <Text style={styles.progressLabel}>TODAY'S CALORIES</Text>
        <Text style={styles.progressKcal}>
          <Text style={styles.kcalLogged}>{loggedKcal}</Text>
          <Text style={styles.kcalTotal}> / {totalKcal} kcal</Text>
        </Text>
      </View>
      <CircularProgress
        value={percentage}
        radius={36}
        activeStrokeColor="#1D6F42"
        inActiveStrokeColor="#E8F5EE"
        activeStrokeWidth={6}
        inActiveStrokeWidth={6}
        showProgressValue={true}
        valueSuffix="%"
        progressValueColor="#1A1A1A"
        progressValueFontSize={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -40, // Overlap green header
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 10,
  },
  progressLeft: {
    flex: 1,
  },
  progressLabel: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    color: '#666',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  progressKcal: {
    fontFamily: 'DMSans_600SemiBold',
  },
  kcalLogged: {
    fontSize: 24,
    color: '#1D6F42',
  },
  kcalTotal: {
    fontSize: 16,
    color: '#999',
  },
});
