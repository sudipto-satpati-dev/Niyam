import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlateauCardProps {
  isVisible: boolean;
}

export const PlateauCard: React.FC<PlateauCardProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>ℹ️</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Steady is a Sign of Strength</Text>
        <Text style={styles.message}>
          Your weight has been stable for 2 weeks. This is normal and often called a <Text style={styles.bold}>physiological plateau</Text>. During this time, your body is recalibrating its metabolic baseline. Continue your rituals; the next shift is preparing beneath the surface.
        </Text>
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Metabolic Reset</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Patient Progress</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffdcbb', // secondary-fixed
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    gap: 16,
    marginVertical: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 20,
    color: '#2b1700', // on-secondary-fixed
  },
  message: {
    fontFamily: 'DM-Sans',
    fontSize: 15,
    color: '#2b1700',
    lineHeight: 22,
    opacity: 0.9,
  },
  bold: {
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: 'rgba(43, 23, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  tagText: {
    fontFamily: 'DM-Sans',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#2b1700',
  },
});
