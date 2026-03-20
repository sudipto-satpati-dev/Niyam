import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { mockHomeState } from '../../Data/mockHomeState';
import { useDailyLogStore } from '../../stores/dailyLogStore';
import { getGreeting } from '../../utils/greeting';
import { getItemStatus } from '../../utils/timelineStatus';

import HabitLogSheet from '../../components/sheets/HabitLogSheet';
import MealLogSheet from '../../components/sheets/MealLogSheet';
import { TimelineItem } from '../../types/log';

const { user, calorieTargets, todayRoutine, streak } = mockHomeState;

const getDayOfWeek = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

// ─── Circular Ring ─────────────────────────────────────────────────────────
const RADIUS = 32;
const STROKE = 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = (RADIUS + STROKE) * 2 + 4;

function CalorieRing({ percentage }: { percentage: number }) {
  const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
  return (
    <View style={styles.ringWrapper}>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          stroke="#E8F5EE" strokeWidth={STROKE} fill="none"
        />
        <Circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          stroke="#1D6F42" strokeWidth={STROKE} fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Text style={styles.ringPercent}>{Math.round(percentage)}%</Text>
      </View>
    </View>
  );
}

// ─── Timeline Item ──────────────────────────────────────────────────────────
type ItemStatus = 'done' | 'overdue' | 'upcoming' | 'missed';

function TimelineRow({ item, status, onPress }: { item: TimelineItem; status: ItemStatus; onPress: () => void }) {
  const isDone = status === 'done';
  const isOverdue = status === 'overdue';
  const isUpcoming = status === 'upcoming';

  const formatTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    const ampm = h < 12 ? 'AM' : 'PM';
    const hh = h % 12 || 12;
    return `${hh}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.timelineRow,
        isDone && styles.timelineRowDone,
        isOverdue && styles.timelineRowOverdue,
        isUpcoming && styles.timelineRowUpcoming,
      ]}
    >
      {/* Icon bubble */}
      <View style={[
        styles.iconBubble,
        isDone && styles.iconBubbleDone,
        isOverdue && styles.iconBubbleOverdue,
        isUpcoming && styles.iconBubbleUpcoming,
      ]}>
        {isDone ? (
          <Ionicons name="checkmark" size={16} color="white" />
        ) : isOverdue ? (
          <Ionicons name={item.type === 'habit' ? 'water-outline' : 'restaurant-outline'} size={16} color="#885200" />
        ) : (
          <Ionicons name="time-outline" size={16} color="#9B9B96" />
        )}
      </View>

      {/* Text */}
      <View style={styles.timelineText}>
        <Text style={[
          styles.timelineTime,
          isOverdue && { color: '#885200' },
          isUpcoming && { color: 'rgba(60,75,62,0.5)' },
        ]}>
          {formatTime(item.time)}
        </Text>
        <Text style={[styles.timelineLabel, isUpcoming && { color: '#9B9B96' }]}>
          {item.label}
        </Text>
      </View>

      {/* Status badge */}
      {isDone && <Text style={styles.badgeDone}>Done</Text>}
      {isOverdue && (
        <View style={styles.badgeOverdue}>
          <Text style={styles.badgeOverdueText}>Log now</Text>
        </View>
      )}
      {isUpcoming && <Text style={styles.badgeUpcoming}>Upcoming</Text>}
    </TouchableOpacity>
  );
}

// ─── Main Screen ────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { today } = useDailyLogStore();
  const [refreshing, setRefreshing] = useState(false);
  const [activeMealKey, setActiveMealKey] = useState('');
  const [activeHabitKey, setActiveHabitKey] = useState('');
  const [tick, setTick] = useState(0);
  const mealSheetRef = useRef<BottomSheet>(null);
  const habitSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  const greeting = getGreeting();
  const completedCount = today.completedItems.length;
  const totalCount = todayRoutine.length;
  const loggedKcal = today.totalKcal;
  const percentage = calorieTargets.total > 0
    ? Math.min((loggedKcal / calorieTargets.total) * 100, 100)
    : 0;

  const handleItemPress = useCallback((item: TimelineItem) => {
    if (item.type === 'meal' && item.mealKey) {
      setActiveMealKey(item.mealKey);
      setTimeout(() => mealSheetRef.current?.expand(), 50);
    } else if (item.type === 'habit' && item.habitKey) {
      setActiveHabitKey(item.habitKey);
      setTimeout(() => habitSheetRef.current?.expand(), 50);
    }
  }, []);

  const handleFabPress = useCallback(() => {
    const next = todayRoutine.find(item => {
      const s = getItemStatus(item, today);
      return s === 'overdue' || s === 'upcoming';
    });
    if (next) handleItemPress(next);
  }, [today, handleItemPress]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => { setTick(n => n + 1); setRefreshing(false); }, 600);
  }, []);

  const renderItem = useCallback(({ item }: { item: TimelineItem }) => {
    const status = getItemStatus(item, today);
    return (
      <TimelineRow item={item} status={status} onPress={() => handleItemPress(item)} />
    );
  }, [today, tick, handleItemPress]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="#1D6F42" />

        {/* ══════ STICKY HEADER (does not scroll) ══════ */}
        <View>
          {/* ── Green Hero ── */}
          <View style={[styles.hero, { paddingTop: insets.top + 8 }]}>
            <View style={styles.topBar}>
              <Image
                source={require('../../assets/Logos/white-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <View style={styles.topBarRight}>
                <TouchableOpacity style={styles.gearBtn}>
                  <Ionicons name="settings-outline" size={22} color="white" />
                </TouchableOpacity>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.greeting}>{greeting}, {user.name}</Text>
            <Text style={styles.subline}>{getDayOfWeek()} · {completedCount} of {totalCount} done</Text>
            <View style={{ height: 44 }} />
          </View>

          {/* ── Progress Card (overlaps into hero) ── */}
          <View style={styles.cardWrap}>
            <View style={styles.progressCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardLabel}>TODAY'S CALORIES</Text>
                <View style={styles.cardKcalRow}>
                  <Text style={styles.cardKcalBig}>{loggedKcal.toLocaleString()}</Text>
                  <Text style={styles.cardKcalTotal}> / {calorieTargets.total.toLocaleString()} kcal</Text>
                </View>
                {streak >= 3 && (
                  <View style={styles.streakInCard}>
                    <Ionicons name="flame" size={13} color="#BA7517" />
                    <Text style={styles.streakInCardText}>{streak} day streak · Keep it going!</Text>
                  </View>
                )}
              </View>
              <CalorieRing percentage={percentage} />
            </View>
          </View>

          {/* ── Section header ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAY'S ROUTINE</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
          </View>
        </View>

        {/* ══════ SCROLLABLE TIMELINE ONLY ══════ */}
        <FlatList
          data={todayRoutine}
          keyExtractor={item => item.time}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100, paddingTop: 4 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
              tintColor="#1D6F42" colors={['#1D6F42']} />
          }
        />

        {/* ── FAB ── */}
        <TouchableOpacity
          style={[styles.fab, { bottom: insets.bottom + 80 }]}
          onPress={handleFabPress}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        {/* ── Sheets ── */}
        <MealLogSheet
          bottomSheetRef={mealSheetRef}
          mealKey={activeMealKey}
          onSave={(id, kcal) => { console.log('Saved:', id, kcal); mealSheetRef.current?.close(); }}
          onClose={() => setActiveMealKey('')}
        />
        <HabitLogSheet
          bottomSheetRef={habitSheetRef}
          habitKey={activeHabitKey}
          onMarkDone={() => { console.log('Done:', activeHabitKey); habitSheetRef.current?.close(); }}
          onSkip={() => { console.log('Skip:', activeHabitKey); habitSheetRef.current?.close(); }}
          onClose={() => setActiveHabitKey('')}
        />
      </View>
    </GestureHandlerRootView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F9F7' },
  listContent: { paddingBottom: 120 },

  // Hero
  hero: {
    backgroundColor: '#1D6F42',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    height: 28,
    width: 110,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gearBtn: { padding: 4 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  greeting: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 20,
    color: 'white',
    marginBottom: 2,
  },
  subline: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    color: 'rgba(255,255,255,0.70)',
  },

  // Progress card
  cardWrap: {
    paddingHorizontal: 16,
    marginTop: -38,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#1D6F42',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardLabel: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 10,
    color: '#1D6F42',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  cardKcalRow: { flexDirection: 'row', alignItems: 'baseline' },
  cardKcalBig: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 26,
    color: '#1D6F42',
  },
  cardKcalTotal: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: 'rgba(29,111,66,0.55)',
  },

  // Ring
  ringWrapper: {
    width: SIZE, height: SIZE,
    justifyContent: 'center', alignItems: 'center',
  },
  ringPercent: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 18,
    color: '#1D6F42',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: SIZE / 2 - 12,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 11,
    color: '#6F7A70',
    letterSpacing: 1.2,
  },
  seeAll: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    color: '#1D6F42',
  },

  // Timeline rows
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#F4F4F2',
  },
  timelineRowDone: { backgroundColor: '#F4F4F2' },
  timelineRowOverdue: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'rgba(253,173,78,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  timelineRowUpcoming: { backgroundColor: '#F4F4F2', opacity: 0.6 },

  iconBubble: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  iconBubbleDone: { backgroundColor: '#1D6F42' },
  iconBubbleOverdue: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#FDAD4E' },
  iconBubbleUpcoming: { backgroundColor: '#E8E8E6' },

  timelineText: { flex: 1 },
  timelineTime: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 10,
    color: 'rgba(60,75,62,0.55)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  timelineLabel: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 15,
    color: '#1A1C1B',
  },

  badgeDone: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    color: '#1D6F42',
  },
  badgeOverdue: {
    backgroundColor: '#FDAD4E',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeOverdueText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    color: 'white',
  },
  badgeUpcoming: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    color: 'rgba(60,75,62,0.4)',
    fontStyle: 'italic',
  },

  // Streak inside card
  streakInCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 5,
  },
  streakInCardText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    color: '#633806',
  },

  // FAB
  fab: {
    position: 'absolute',
    right: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#1D6F42',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#1D6F42',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
});
