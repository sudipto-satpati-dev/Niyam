import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WeightMilestone } from '../../types/weight';

interface MilestoneStripProps {
  milestones: WeightMilestone[];
}

export const MilestoneStrip: React.FC<MilestoneStripProps> = ({ milestones }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Milestones</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {milestones.map((m, i) => (
          <View 
            key={i} 
            style={[
              styles.card, 
              m.reached ? styles.reachedCard : styles.unreachedCard,
              m.isCurrent && styles.currentCardRing
            ]}
          >
            {m.reached ? (
              <View style={[styles.iconContainer, styles.reachedIcon]}>
                <MaterialIcons name="stars" size={20} color="#FFFFFF" />
              </View>
            ) : (
              <View style={[styles.iconContainer, styles.unreachedIcon]}>
                <MaterialIcons name="lock" size={20} color="#6F7A70" />
              </View>
            )}
            <View style={styles.infoContainer}>
              <Text style={[styles.weightText, m.reached ? styles.reachedText : styles.unreachedText]}>
                {m.weightKg} kg
              </Text>
              <Text style={[styles.label, m.reached ? styles.reachedLabel : styles.unreachedLabel]}>
                {m.reached ? 'Reached' : 'Upcoming'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 20,
    color: '#1A1C1B',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 16,
    paddingBottom: 8,
  },
  card: {
    width: 128,
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    textAlign: 'center',
    gap: 10,
  },
  reachedCard: {
    backgroundColor: 'rgba(29, 111, 66, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(29, 111, 66, 0.1)',
  },
  unreachedCard: {
    backgroundColor: '#F4F4F2',
    opacity: 0.6,
  },
  currentCardRing: {
    borderWidth: 2,
    borderColor: '#1D6F42',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reachedIcon: {
    backgroundColor: '#1D6F42',
  },
  unreachedIcon: {
    backgroundColor: '#E2E3E1',
  },
  reachedCheck: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lockText: {
    fontSize: 16,
  },
  infoContainer: {
    alignItems: 'center',
  },
  weightText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 16,
  },
  reachedText: {
    color: '#1D6F42',
  },
  unreachedText: {
    color: '#1A1C1B',
  },
  label: {
    fontFamily: 'DM-Sans',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: -0.2,
    marginTop: 2,
  },
  reachedLabel: {
    color: '#1D6F42',
  },
  unreachedLabel: {
    color: '#6F7A70',
  },
});
