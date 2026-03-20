import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

export default function ChoosePlanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleStartCustomPlan = () => {
    // Navigate to basic info intake
    router.push('/basic-info');
  };

  const handleDefaultPlan = () => {
    // Navigate straight to tabs with default plan
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 24) }]}>
      <StatusBar style="dark" />

      {/* Sticky Logo Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/Logos/secondary-logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>How do you want to start?</Text>
          <Text style={styles.subtitle}>You can always switch later.</Text>
        </View>

        {/* Selection Cards */}
        <View style={styles.cardsContainer}>
          {/* AI Plan Card */}
          <View style={styles.primaryCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconWrapperPrimary}>
                <MaterialIcons name="auto-awesome" size={24} color="#1d6f42" />
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>RECOMMENDED</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Build my own plan</Text>
            <Text style={styles.cardDescription}>
              Answer a few questions and our AI will design a personalised routine and diet for you.
            </Text>
            <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
              onPress={handleStartCustomPlan}
            >
              <Text style={styles.primaryButtonText}>Start</Text>
            </Pressable>
          </View>

          {/* Default Plan Card */}
          <View style={styles.secondaryCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconWrapperSecondary}>
                <MaterialIcons name="person" size={24} color="#3f4941" />
              </View>
            </View>
            <Text style={styles.cardTitle}>Use the default plan</Text>
            <Text style={styles.cardDescription}>
              Start with a pre-built plan for a busy professional. You can customise it later.
            </Text>
            <Pressable
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
              onPress={handleDefaultPlan}
            >
              <Text style={styles.secondaryButtonText}>Use default</Text>
            </Pressable>
          </View>
        </View>

        {/* Footnote / Insight Bubble */}
        <View style={styles.footnoteContainer}>
          <MaterialIcons name="info" size={16} color="#5c51b0" style={{ marginTop: 2 }} />
          <Text style={styles.footnoteText}>
            <Text style={styles.footnoteBold}>Default plan:</Text> Indian diet, corporate schedule.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#f9f9f7',
    zIndex: 10,
    alignItems: 'flex-start',
  },
  logo: {
    width: 160,
    height: 48,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1c1b',
    lineHeight: 34,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'DM-Sans',
    fontSize: 16,
    color: '#3f4941',
  },
  cardsContainer: {
    gap: 24,
  },
  primaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#1d6f42',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
  },
  secondaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(191, 201, 190, 0.3)',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconWrapperPrimary: {
    padding: 12,
    backgroundColor: 'rgba(29, 111, 66, 0.1)',
    borderRadius: 12,
  },
  iconWrapperSecondary: {
    padding: 12,
    backgroundColor: '#e8e8e6',
    borderRadius: 12,
  },
  badge: {
    backgroundColor: '#1d6f42',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardTitle: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1c1b',
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    lineHeight: 22,
    color: '#3f4941',
    marginBottom: 24,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1d6f42',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: '#bfc9be',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#1a1c1b',
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonPressed: {
    backgroundColor: '#f4f4f2',
    transform: [{ scale: 0.98 }],
  },
  footnoteContainer: {
    marginTop: 'auto',
    marginBottom: 24,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'rgba(228, 223, 255, 0.3)',
    borderRadius: 16,
    padding: 16,
  },
  footnoteText: {
    fontFamily: 'DM-Sans',
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#443897',
  },
  footnoteBold: {
    fontWeight: 'bold',
    fontFamily: 'DM-Sans-Bold',
  },
});
