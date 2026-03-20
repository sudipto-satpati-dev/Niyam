import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StreakBannerProps {
  streak: number;
}

export default function StreakBanner({ streak }: StreakBannerProps) {
  if (streak < 3) return null;

  return (
    <View style={styles.streakBanner}>
      <Ionicons name="flame" size={16} color="#BA7517" />
      <Text style={styles.streakText}>
        {streak} day streak · Keep it going!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAEEDA',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  streakText: {
    marginLeft: 8,
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 14,
    color: '#633806',
  },
});
