import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Sidebar from '../../components/home/Sidebar';
import { mockHomeState } from '../../Data/mockHomeState';

// Views
import { DayView } from '../../components/tracker/DayView';
import { WeekView } from '../../components/tracker/WeekView';
import { MonthView } from '../../components/tracker/MonthView';
import DateSelectBottomSheet from '../../components/tracker/DateSelectBottomSheet';

// Mocks
import {
  mockTodayMidDay,
  mockWeekDays, mockWeekAvgScore, mockWeekAvgKcal, mockWeekAvgWater,
  mockWeekMealConsistency, mockWeekHabitConsistency,
  mockMonthStats, mockMonthScores, mockMonthMealRates, mockMonthHabitRates,
  mockScoreTrend, MEAL_TIPS
} from '../../Data/mockTrackerData';

type TrackerView = 'day' | 'week' | 'month';

export default function TrackerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = mockHomeState;

  const [view, setView] = useState<TrackerView>('day');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Format the date if one is selected, else fallback to the mock static date
  const getNavLabel = () => {
    if (!selectedDate) {
      if (view === 'day') return 'Today, Sat 21 Mar';
      if (view === 'week') return 'Mar 16 – Mar 22';
      return 'March 2026';
    }
    
    const d = new Date(selectedDate);
    if (view === 'day') return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    if (view === 'week') {
      const d2 = new Date(d);
      d2.setDate(d.getDate() + 6);
      return `${d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric'})} – ${d2.toLocaleDateString('en-GB', { month: 'short', day: 'numeric'})}`;
    }
    return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  };

  const navLabel = getNavLabel();

  const renderContent = () => {
    switch (view) {
      case 'day':
        return <DayView data={mockTodayMidDay} />;
      case 'week':
        return <WeekView data={{
          weekDays: mockWeekDays,
          weekAvgScore: mockWeekAvgScore,
          weekAvgKcal: mockWeekAvgKcal,
          weekAvgWater: mockWeekAvgWater,
          mealConsistency: mockWeekMealConsistency,
          habitConsistency: mockWeekHabitConsistency,
          targetKcal: 1810,
          waterTargetMl: 2500,
        }} />;
      case 'month':
        return <MonthView data={{
          monthStats: mockMonthStats,
          monthScores: mockMonthScores,
          monthMealRates: mockMonthMealRates,
          monthHabitRates: mockMonthHabitRates,
          scoreTrend: mockScoreTrend,
          mealTips: MEAL_TIPS
        }} />;
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      
      {/* Top App Bar */}
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

      {/* Screen Header & Segment Control */}
      <View style={styles.headerArea}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Tracker</Text>
          
          <View style={styles.segmentContainer}>
            <TouchableOpacity 
              style={[styles.segmentBtn, view === 'day' && styles.segmentBtnActive]}
              onPress={() => setView('day')}
            >
              <Text style={[styles.segmentText, view === 'day' && styles.segmentTextActive]}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.segmentBtn, view === 'week' && styles.segmentBtnActive]}
              onPress={() => setView('week')}
            >
              <Text style={[styles.segmentText, view === 'week' && styles.segmentTextActive]}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.segmentBtn, view === 'month' && styles.segmentBtnActive]}
              onPress={() => setView('month')}
            >
              <Text style={[styles.segmentText, view === 'month' && styles.segmentTextActive]}>Month</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Navigation */}
        <View style={styles.dateNav}>
          <TouchableOpacity style={styles.dateBtn}>
            <Ionicons name="chevron-back" size={20} color="#1D6F42" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsDateSelectOpen(true)} style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Text style={styles.dateLabel}>{navLabel}</Text>
            <Ionicons name="chevron-down" size={16} color="#1A1C1B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateBtn} disabled={true}>
            <Ionicons name="chevron-forward" size={20} color="#BFC9BE" />
          </TouchableOpacity>
        </View>
      </View>

      {/* View Content */}
      <View style={styles.contentArea}>
        {renderContent()}
      </View>

      <DateSelectBottomSheet 
        isOpen={isDateSelectOpen} 
        onClose={() => setIsDateSelectOpen(false)} 
        viewMode={view} 
        onSelectDate={setSelectedDate} 
        currentDate={selectedDate} 
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName={user.name}
      />

      {/* Floating Ask Niyam AI Button */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 80 }]}
        onPress={() => router.push('/ask-niyam-ai' as any)}
        activeOpacity={0.85}
      >
        <Ionicons name="sparkles" size={18} color="#ffffff" />
        <Text style={styles.fabText}>Ask Niyam AI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9F9F7',
  },
  // Top App Bar
  topAppBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, height: 64 },
  topAppLeft: { flexDirection: 'row', alignItems: 'center', gap: 0 },
  menuIconBox: { padding: 4, marginLeft: -8, marginRight: 8 },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  gearBtn: { padding: 4 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(29, 111, 66, 0.1)', borderWidth: 1.5, borderColor: 'rgba(29, 111, 66, 0.3)', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: 'DM-Sans-SemiBold', fontSize: 14, color: '#1d6f42' },
  
  headerArea: { paddingHorizontal: 24, paddingTop: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontFamily: 'Fraunces-Bold', fontSize: 22, color: '#1A1C1B' },
  
  // Segment Control
  segmentContainer: { flexDirection: 'row', backgroundColor: '#F4F4F2', borderRadius: 100, padding: 4, alignSelf: 'center' },
  segmentBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100 },
  segmentBtnActive: { backgroundColor: '#1D6F42', shadowColor: '#1A1C1B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  segmentText: { fontFamily: 'DM-Sans-SemiBold', fontSize: 13, color: 'rgba(26,28,27,0.6)' },
  segmentTextActive: { color: '#FFFFFF' },

  // Date Nav
  dateNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 },
  dateLabel: { fontFamily: 'DM-Sans-Bold', fontSize: 13, color: '#1A1C1B', letterSpacing: 1.5, textTransform: 'uppercase' },
  dateBtn: { padding: 4 },
  
  contentArea: { flex: 1 },

  // FAB
  fab: {
    position: 'absolute',
    // bottom is handled inline for insets
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00552e',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    shadowColor: '#00552e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  fabText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 15,
    color: '#ffffff',
  },
});
