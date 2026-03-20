import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrackerScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Tracker</Text>
      <Text style={styles.sub}>Your progress charts will appear here.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F9F7', alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: 'Fraunces-Bold', fontSize: 28, color: '#1D6F42', marginBottom: 8 },
  sub: { fontFamily: 'DM-Sans', fontSize: 15, color: '#6F7A70' },
});
