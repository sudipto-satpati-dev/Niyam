import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AvoidItem } from '../../types/plan';

interface AvoidCardProps {
  item: AvoidItem;
}

export const AvoidCard: React.FC<AvoidCardProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="close-circle" size={20} color="#BA1A1A" />
          <Text style={styles.title}>{item.item}</Text>
        </View>
        <Text style={styles.reason}>{item.reason}</Text>
      </View>
      
      <View style={styles.replaceContainer}>
        <Text style={styles.replaceLabel}>REPLACE WITH</Text>
        <Text style={styles.replaceText}>{item.replace}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F9F1F1',
  },
  content: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 15,
    color: '#1A1C1B',
  },
  reason: {
    fontFamily: 'DM-Sans',
    fontSize: 13,
    color: '#6F7A70',
    lineHeight: 18,
    paddingLeft: 28,
  },
  replaceContainer: {
    backgroundColor: '#F9F9F7',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  replaceLabel: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 10,
    color: '#6F7A70',
    letterSpacing: 0.5,
  },
  replaceText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 13,
    color: '#1D6F42',
    flex: 1,
    textAlign: 'right',
  },
});
