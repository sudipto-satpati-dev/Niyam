import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MorningDrink } from '../../types/plan';

interface RecipeCardProps {
  drink: MorningDrink;
  onPress: () => void;
  isDone: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ drink, onPress, isDone }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{drink.name}</Text>
          <Text style={styles.tagline}>{drink.tagline}</Text>
        </View>
        <View style={[styles.statusBadge, isDone ? styles.statusBadgeDone : styles.statusBadgePending]}>
          <Text style={[styles.statusText, isDone ? styles.statusTextDone : styles.statusTextPending]}>
            {isDone ? 'COMPLETE' : 'LOG'}
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <View style={styles.benefitContainer}>
          {drink.benefits.slice(0, 2).map((benefit, idx) => (
            <View key={idx} style={styles.benefitChip}>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6F7A70" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 20,
    color: '#1A1C1B',
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#6F7A70',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgePending: {
    backgroundColor: '#E8F5EE',
  },
  statusBadgeDone: {
    backgroundColor: '#1D6F42',
  },
  statusText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  statusTextPending: {
    color: '#1D6F42',
  },
  statusTextDone: {
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1EF',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  benefitContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  benefitChip: {
    backgroundColor: '#F4F4F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  benefitText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    color: '#3F4941',
  },
});
