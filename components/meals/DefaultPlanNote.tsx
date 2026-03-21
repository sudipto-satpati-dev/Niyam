import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DefaultPlanNote: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle-outline" size={20} color="#1d6f42" />
      <Text style={styles.text}>
        <Text style={styles.bold}>Default plan:</Text> Your meals are currently optimized based on your Ayurvedic Prakriti. Feel free to swap within your daily kcal limit.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 48,
    padding: 16,
    backgroundColor: 'rgba(29, 111, 66, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(29, 111, 66, 0.1)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  text: {
    flex: 1,
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#1d6f42',
    lineHeight: 20,
  },
  bold: {
    fontFamily: 'DM-Sans-Bold',
  },
});
