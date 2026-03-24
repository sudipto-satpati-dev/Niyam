import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { parseISO, format } from 'date-fns';
import { LogRow } from '../../types/weight';

interface WeightLogHistoryProps {
  rows: LogRow[];
}

export const WeightLogHistory: React.FC<WeightLogHistoryProps> = ({ rows }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleRows = showAll ? rows : rows.slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly History</Text>
      <View style={styles.card}>
        {rows.length === 0 ? (
          <Text style={{ padding: 20, color: '#6F7A70', fontFamily: 'DM-Sans' }}>No entries found</Text>
        ) : (
          <>
            {visibleRows.map((row, index) => (
              <View 
                key={index} 
                style={[
                  styles.row, 
                  index !== visibleRows.length - 1 && styles.borderBottom
                ]}
              >
                <View style={styles.left}>
                  <View style={styles.iconCircle}>
                    <MaterialIcons name="event" size={20} color="#1D6F42" />
                  </View>
                  <View>
                    <Text style={styles.date}>{format(parseISO(row.date), 'MMM dd')}</Text>
                    <Text style={styles.weight}>{row.weightKg.toFixed(1)} kg</Text>
                  </View>
                </View>
                <View style={styles.right}>
                  <Text 
                    style={[
                      styles.changeText, 
                      row.changePill.color === 'green' ? styles.green : row.changePill.color === 'red' ? styles.red : styles.gray
                    ]}
                  >
                    {row.changePill.text}
                  </Text>
                  <Text style={styles.changeLabel}>Net Change</Text>
                </View>
              </View>
            ))}

            {rows.length > 5 && (
              <Pressable 
                style={styles.moreButton} 
                onPress={() => setShowAll(!showAll)}
              >
                <Text style={styles.moreText}>{showAll ? 'Show less' : 'View full history'}</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F2',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#F4F4F2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIcon: {
    fontSize: 18,
  },
  date: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1C1B',
  },
  weight: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    color: '#6F7A70',
  },
  right: {
    alignItems: 'flex-end',
  },
  changeText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 16,
  },
  green: {
    color: '#1D6F42',
  },
  red: {
    color: '#BA7517',
  },
  gray: {
    color: '#6F7A70',
  },
  changeLabel: {
    fontFamily: 'DM-Sans',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6F7A70',
    marginTop: 2,
  },
  moreButton: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F9F9F7',
  },
  moreText: {
    fontFamily: 'DM-Sans',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1D6F42',
  },
});
