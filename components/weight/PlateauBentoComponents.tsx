import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';

// Stats Stack Cards
export const PlateauStatsStack = ({ netChange, dailyAvg }: { netChange: string, dailyAvg: string }) => (
  <View style={styles.statsStack}>
    <View style={styles.statCard}>
      <MaterialIcons name="drag-handle" size={24} color="#BA7517" style={styles.statIcon} />
      <Text style={styles.statLabel}>Net Change (14d)</Text>
      <Text style={styles.statValue}>{netChange}</Text>
    </View>
    <View style={styles.statCard}>
      <MaterialIcons name="history" size={24} color="#1D6F42" style={styles.statIcon} />
      <Text style={styles.statLabel}>Daily Average</Text>
      <Text style={styles.statValue}>{dailyAvg}</Text>
    </View>
    <View style={styles.insightImageContainer}>
      <Image 
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBowdQ9nZGkLvmwgKFBw05kbZtynRZEBUu9x_h_qGlpSbNhaCw6lv9Jx4_yX6bcTvUAlte9k7F8gv_pJxon4UsjewAlwwh-aI1BHc0Vh2FPfiNMt7XGdVVKSk8gqDZeBnDLRGvHytGOpUKKnaAR6y9aJiUF-Xye0EnDluu1P04lSYrQSjfvUdV0HQtqSvBP2sNWKLHVMBBqnoa5A9eSqMVrDo_GXOBByxi5JSJzPO4xXD7Q8N0tGtPsaD2a136WKa3EndmzX2RKsoJY' }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <View style={styles.insightImageOverlay}>
        <Text style={styles.insightText}>Consistency is the secret ingredient to long-term healing.</Text>
      </View>
    </View>
  </View>
);

// Consistency Streak Card
export const RitualStreakCard = ({ days }: { days: number }) => (
  <View style={styles.streakCard}>
    <View style={styles.circularContainer}>
      <CircularProgress
        value={days}
        radius={50}
        maxValue={20}
        initialValue={0}
        progressValueColor={'#1A1C1B'}
        activeStrokeColor={'#BA7517'}
        inActiveStrokeColor={'#e2e3e1'}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={8}
        activeStrokeWidth={8}
        duration={1500}
        title={'Days'}
        titleColor={'#6F7A70'}
        titleStyle={{ fontSize: 10, fontFamily: 'DM-Sans' }}
        valueSuffix={''}
        progressValueStyle={{ fontFamily: 'Fraunces-Bold', fontSize: 24 }}
      />
    </View>
    <Text style={styles.streakTitle}>Current Consistency Streak</Text>
    <Text style={styles.streakDesc}>You haven't missed a morning ritual in {days} days.</Text>
  </View>
);

// Expert Quote Card
export const ExpertQuoteCard = () => (
  <View style={styles.quoteCard}>
    <View style={styles.quoteContent}>
      <Text style={styles.quoteLabel}>Expert Perspective</Text>
      <Text style={styles.quoteText}>"Think of this as your body taking a breath before the next climb."</Text>
      <Text style={styles.quoteAuthor}>— Dr. Advait, Wellness Lead</Text>
    </View>
    <MaterialIcons name="spa" size={48} color="rgba(255,255,255,0.2)" />
  </View>
);

const styles = StyleSheet.create({
  statsStack: {
    gap: 16,
    flex: 1,
  },
  statCard: {
    backgroundColor: '#eeeeec', // surface-container
    borderRadius: 20,
    padding: 20,
  },
  statIcon: {
    marginBottom: 12,
  },
  statLabel: {
    fontFamily: 'DM-Sans',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#3F4941', // on-surface-variant
  },
  statValue: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 24,
    color: '#1A1C1B',
    marginTop: 4,
  },
  insightImageContainer: {
    flex: 1,
    backgroundColor: '#1D6F42',
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 140,
  },
  insightImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(29, 111, 66, 0.4)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  insightText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  streakCard: {
    backgroundColor: '#eeeeec',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
  },
  circularContainer: {
    marginBottom: 16,
  },
  streakTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 18,
    color: '#1A1C1B',
    textAlign: 'center',
  },
  streakDesc: {
    fontFamily: 'DM-Sans',
    fontSize: 13,
    color: '#3F4941',
    textAlign: 'center',
    marginTop: 8,
  },
  quoteCard: {
    backgroundColor: '#00552e', // primary
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 2,
  },
  quoteContent: {
    flex: 1,
    paddingRight: 16,
  },
  quoteLabel: {
    fontFamily: 'DM-Sans',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  quoteText: {
    fontFamily: 'Fraunces-BoldItalic',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 26,
  },
  quoteAuthor: {
    fontFamily: 'DM-Sans',
    fontSize: 13,
    color: '#a4f4bb', // primary-fixed
    marginTop: 16,
    opacity: 0.8,
  },
});
