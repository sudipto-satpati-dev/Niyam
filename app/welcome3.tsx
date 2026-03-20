import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function Welcome3Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleStart = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top 60%: Illustration Canvas */}
      <View style={[styles.illustrationArea, { paddingTop: insets.top }]}>
        {/* Abstract decorative elements */}
        <View style={styles.bgBlobTopLeft} />
        <View style={styles.bgBlobBottomRight} />

        {/* Main Illustration: Weight Chart */}
        <View style={styles.mockupContainer}>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>Weight Goal Progress</Text>
                <Text style={styles.chartValue}>-12.5 lbs</Text>
              </View>
              <View style={styles.iconContainer}>
                <MaterialIcons name="trending-down" size={24} color="#1d6f42" />
              </View>
            </View>

            {/* Custom React Native Chart Simulation */}
            <View style={styles.chartArea}>
              {/* Grid Lines */}
              <View style={[styles.gridLine, { top: '25%' }]} />
              <View style={[styles.gridLine, { top: '50%' }]} />
              <View style={[styles.gridLine, { top: '75%' }]} />

              {/* Data Points */}
              <View style={[styles.dataPoint, { left: '0%', bottom: '70%' }]} />
              <View style={[styles.dataPoint, { left: '20%', bottom: '75%' }]} />
              <View style={[styles.dataPoint, { left: '40%', bottom: '45%' }]} />
              <View style={[styles.dataPoint, { left: '60%', bottom: '55%' }]} />
              <View style={[styles.dataPoint, { left: '80%', bottom: '30%' }]} />
              <View style={[styles.dataPoint, { left: '100%', bottom: '35%', transform: [{ translateX: -8 }] }]} />

              {/* Simple connecting lines representation (simulated with rotated borders or we just rely on the dots for the aesthetic) */}
              <View style={[styles.trendLine, { left: '0%', bottom: '72%', width: '22%', transform: [{ rotate: '-14deg' }] }]} />
              <View style={[styles.trendLine, { left: '20%', bottom: '60%', width: '26%', transform: [{ rotate: '56deg' }] }]} />
              <View style={[styles.trendLine, { left: '40%', bottom: '50%', width: '22%', transform: [{ rotate: '-26deg' }] }]} />
              <View style={[styles.trendLine, { left: '60%', bottom: '42%', width: '25%', transform: [{ rotate: '51deg' }] }]} />
              <View style={[styles.trendLine, { left: '80%', bottom: '32%', width: '21%', transform: [{ rotate: '-14deg' }] }]} />
            </View>

            {/* Labels */}
            <View style={styles.chartLabels}>
              <Text style={styles.labelText}>Week 1</Text>
              <Text style={styles.labelText}>Week 3</Text>
              <Text style={styles.labelText}>Week 5</Text>
              <Text style={styles.labelText}>Target</Text>
            </View>
          </View>

          {/* AI Insight Floating Bubble */}
          <View style={styles.aiInsightBubble}>
            <MaterialIcons name="auto-awesome" size={16} color="#5c51b0" />
            <Text style={styles.aiInsightText}>
              You're 85% more likely to reach your goal by logging weekly.
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom 40%: Content & Actions */}
      <View style={[styles.contentCard, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        {/* Text Content */}
        <View style={styles.textContent}>
          <Text style={styles.title}>Watch the progress happen.</Text>
          <Text style={styles.subtitle}>
            Log your weight weekly. See the trend line fall toward your goal.
          </Text>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        {/* Action Button */}
        <View style={styles.actions}>
          <Pressable 
            style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
            onPress={handleStart}
          >
            <Text style={styles.primaryButtonText}>Get started</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  illustrationArea: {
    height: '60%',
    backgroundColor: '#E8F5EE',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  bgBlobTopLeft: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: 'rgba(164, 244, 187, 0.2)', // primary-fixed/20
  },
  bgBlobBottomRight: {
    position: 'absolute',
    bottom: '-5%',
    right: '-5%',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(228, 223, 255, 0.3)', // secondary-fixed/30
  },
  mockupContainer: {
    width: '100%',
    paddingHorizontal: 32,
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  chartCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3f4941',
    marginBottom: 4,
  },
  chartValue: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 28,
    fontWeight: '800',
    color: '#1d6f42',
    letterSpacing: -0.5,
  },
  iconContainer: {
    backgroundColor: '#a4f4bb',
    padding: 8,
    borderRadius: 8,
  },
  chartArea: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#e2e3e1',
  },
  dataPoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1d6f42',
    zIndex: 10,
  },
  trendLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#1d6f42',
    transformOrigin: 'left center', // simulated rotation
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  labelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3f4941',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  aiInsightBubble: {
    position: 'absolute',
    bottom: -24,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
    borderRadius: 16,
    maxWidth: 200,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  aiInsightText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: '#1a1c1b',
    fontWeight: '500',
  },
  contentCard: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContent: {
    alignItems: 'center',
    gap: 16,
    maxWidth: 320,
  },
  title: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 32,
    lineHeight: 36,
    color: '#1a1c1b',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'DM-Sans',
    fontSize: 18,
    lineHeight: 28,
    color: '#3f4941',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e8e8e6',
  },
  dotActive: {
    width: 24,
    height: 6,
    backgroundColor: '#1d6f42',
  },
  actions: {
    width: '100%',
    paddingHorizontal: 16,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1d6f42',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 18,
  },
});
