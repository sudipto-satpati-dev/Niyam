import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';
import { Stack, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Sidebar from '../../components/home/Sidebar';
import { MilestoneModal } from '../../components/modals/MilestoneModal';
import { MilestoneStrip } from '../../components/weight/MilestoneStrip';
import { ExpertQuoteCard, PlateauStatsStack, RitualStreakCard } from '../../components/weight/PlateauBentoComponents';
import { PlateauCard } from '../../components/weight/PlateauCard';
import { PlateauChartCard } from '../../components/weight/PlateauChartCard';
import { WeightChartCard } from '../../components/weight/WeightChartCard';
import { WeightLogHistory } from '../../components/weight/WeightLogHistory';
import { WeightLogSheet } from '../../components/weight/WeightLogSheet';
import { WeightStatusCard } from '../../components/weight/WeightStatusCard';
import { mockHomeState } from '../../Data/mockHomeState';

import { DEV_SCENARIO, mockLogRows, mockProjectionEntries, mockWeightEntries } from '../../Data/mockWeightData';
import { usePlanStore } from '../../stores/planStore';
import { useWeightLogStore } from '../../stores/weightLogStore';
import { WeightEntry, WeightMilestone } from '../../types/weight';

export default function WeightScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = mockHomeState;

  const { entries, logWeight, getCurrentWeight, addCompletedMilestone, completedMilestoneWeights } = useWeightLogStore();
  const { plan } = usePlanStore();

  const [isLogSheetVisible, setIsLogSheetVisible] = useState(false);
  const [isMilestoneModalVisible, setIsMilestoneModalVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<WeightMilestone | undefined>(undefined);
  const [forcePlateau, setForcePlateau] = useState(false);

  // For Demo: If no entries, use mock data
  const displayEntries = entries.length > 0 ? entries : mockWeightEntries;
  const displayMilestones = plan.weight.milestones;

  const currentWeight = entries.length > 0
    ? getCurrentWeight() || plan.weight.startWeightKg
    : (mockWeightEntries.at(-1)?.weightKg || plan.weight.startWeightKg);
  const startWeight = plan.weight.startWeightKg;
  const goalWeight = plan.weight.goalWeightKg;

  // Derived History Rows
  const historyRows = useMemo(() => {
    if (entries.length === 0) return mockLogRows;

    return [...entries]
      .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
      .map((entry, i, arr) => {
        const prev = arr[i + 1];
        if (!prev) return { ...entry, changePill: { text: 'Start', color: 'gray' as const } };
        const diff = parseFloat((entry.weightKg - prev.weightKg).toFixed(1));
        return {
          ...entry,
          changePill: {
            text: diff < 0 ? `−${Math.abs(diff).toFixed(1)} kg` : diff > 0 ? `+${diff.toFixed(1)} kg` : '0.0 kg',
            color: diff < 0 ? 'green' as const : diff > 0 ? 'red' as const : 'gray' as const,
          },
        };
      });
  }, [entries]);

  const handleLogWeight = (weight: number) => {
    const entry: WeightEntry = {
      date: format(new Date(), 'yyyy-MM-dd'),
      weightKg: weight,
    };
    logWeight(entry);
    setIsLogSheetVisible(false);

    // Check for milestones
    const hit = displayMilestones.find(m =>
      weight <= m.weightKg && !completedMilestoneWeights.includes(m.weightKg)
    );

    if (hit) {
      addCompletedMilestone(hit.weightKg);
      setActiveMilestone(hit);
      setIsMilestoneModalVisible(true);
    }
  };

  const isPlateau = DEV_SCENARIO === 'plateau' || forcePlateau;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Top App Bar - Same as Tracker */}
      <View style={styles.topAppBar}>
        <View style={styles.topAppLeft}>
          <TouchableOpacity onPress={() => setIsSidebarOpen(true)} style={styles.menuIconBox}>
            <Ionicons name="menu" size={28} color="#1D6F42" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/Logos/secondary-logo.png')}
            style={{ height: 28, width: 88, resizeMode: 'contain', marginLeft: 4 }}
          />
        </View>
        <View style={styles.topBarRight}>
          <TouchableOpacity onPress={() => router.push('/settings' as any)} style={styles.gearBtn}>
            <Ionicons name="settings-outline" size={22} color="#1D6F42" />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isPlateau ? (
          /* Plateau Bento Grid Layout */
          <View style={styles.plateauLayout}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setForcePlateau(false)}
            >
              <MaterialIcons name="arrow-back" size={20} color="#1D6F42" />
              <Text style={styles.backButtonText}>Back to Progress</Text>
            </TouchableOpacity>

            <View style={styles.plateauHeader}>
              <Text style={styles.statusLabel}>Status Update</Text>
              <Text style={styles.plateauTitle}>Stable & Grounded</Text>
              <Text style={styles.plateauDesc}>Your body is finding its natural rhythm at {currentWeight.toFixed(1)} kg.</Text>
            </View>

            <PlateauChartCard currentWeight={currentWeight} />

            <View style={styles.bentoRow}>
              <PlateauStatsStack netChange="0.0 kg" dailyAvg="72.02 kg" />
            </View>

            <PlateauCard isVisible={true} />

            <View style={styles.bentoRow}>
              <RitualStreakCard days={12} />
            </View>

            <View style={styles.bentoRow}>
              <ExpertQuoteCard />
            </View>
          </View>
        ) : (
          /* Normal Layout */
          <View>
            <View style={styles.headerArea}>
              <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Progress</Text>
                <Pressable
                  style={styles.logButton}
                  onPress={() => setIsLogSheetVisible(true)}
                >
                  <Text style={styles.logButtonText}>Log weight</Text>
                </Pressable>
              </View>
            </View>

            <WeightStatusCard
              currentWeight={currentWeight}
              startWeight={startWeight}
              goalWeight={goalWeight}
            />

            <WeightChartCard
              entries={displayEntries}
              goalWeight={goalWeight}
              projectedEntries={mockProjectionEntries}
            />

            <TouchableOpacity
              style={styles.statusUpdateCard}
              onPress={() => setForcePlateau(true)}
            >
              <View>
                <Text style={styles.statusLabelSmall}>Status Update</Text>
                <Text style={styles.statusTitleSmall}>Stable & Grounded</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#BA7517" />
            </TouchableOpacity>

            <MilestoneStrip milestones={displayMilestones} />

            <WeightLogHistory rows={historyRows} />
          </View>
        )}
      </ScrollView>

      <WeightLogSheet
        isVisible={isLogSheetVisible}
        lastWeight={currentWeight}
        onSave={handleLogWeight}
        onClose={() => setIsLogSheetVisible(false)}
      />

      <MilestoneModal
        isVisible={isMilestoneModalVisible}
        milestone={activeMilestone}
        onClose={() => setIsMilestoneModalVisible(false)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName={user.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9F9F7',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  // Top App Bar
  topAppBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, height: 64 },
  topAppLeft: { flexDirection: 'row', alignItems: 'center', gap: 0 },
  menuIconBox: { padding: 4, marginLeft: -8, marginRight: 8 },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  gearBtn: { padding: 4 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(29, 111, 66, 0.1)', borderWidth: 1.5, borderColor: 'rgba(29, 111, 66, 0.3)', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: 'DM-Sans-SemiBold', fontSize: 14, color: '#1d6f42' },

  headerArea: { paddingHorizontal: 4, paddingTop: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontFamily: 'Fraunces-Bold', fontSize: 22, color: '#1A1C1B' },

  logButton: {
    backgroundColor: '#1D6F42',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  logButtonText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  // Plateau specific styles
  plateauLayout: {
    gap: 24,
  },
  plateauHeader: {
    marginBottom: 8,
  },
  statusLabel: {
    fontFamily: 'DM-Sans',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#BA7517',
    marginBottom: 4,
  },
  plateauTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 36,
    color: '#1A1C1B',
    letterSpacing: -0.5,
  },
  plateauDesc: {
    fontFamily: 'DM-Sans',
    fontSize: 16,
    color: '#3F4941',
    lineHeight: 24,
    marginTop: 8,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statusUpdateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEEEEC',
    marginVertical: 16,
    shadowColor: '#1A1C3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  statusLabelSmall: {
    fontFamily: 'DM-Sans',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#BA7517',
    marginBottom: 2,
  },
  statusTitleSmall: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 16,
    color: '#1A1C1B',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  backButtonText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1D6F42',
  },
});
