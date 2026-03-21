import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getCalorieNote, getMonthMealColor } from '../../utils/trackerScore';

type MonthViewProps = {
  data: any; // Using the mock month data arrays/objects
};

export const MonthView = ({ data }: MonthViewProps) => {
  const {
    monthStats, monthScores, monthMealRates, monthHabitRates,
    scoreTrend, mealTips
  } = data;

  // 1. Month Score Area Chart Card
  const renderMonthScore = () => {
    const scoreText = monthStats.avgScore;
    const scoreColor = '#BA7517'; // hardcode amber for 76 matches the design 

    // Very simple SVG path approximation with Views since we don't have SVG loaded
    return (
      <View style={styles.cardHeaderOnly}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <View>
            <Text style={styles.sectionEyebrow}>MARCH 2026</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
              <Text style={[styles.scoreBig, { color: scoreColor }]}>{scoreText}</Text>
              <Text style={styles.scoreSub}>Monthly Score</Text>
            </View>
          </View>
          <View style={[styles.badge, { backgroundColor: 'rgba(186,117,23,0.1)' }]}>
            <Text style={[styles.badgeText, { color: scoreColor }]}>Good</Text>
          </View>
        </View>

        <Text style={styles.monthNoteText}>Consistent — room to improve</Text>

        <View style={styles.fauxChartBox}>
          {/* Faux area chart using a curved-looking view */}
          <View style={styles.fauxChartCurve} />
          <View style={styles.fauxChartDot} />
        </View>
      </View>
    );
  };

  // 2. Monthly Calories
  const renderKalories = () => {
    const note = getCalorieNote(monthStats.avgKcal, monthStats.targetKcal);
    return (
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitleMediumPrimary}>Avg daily calories</Text>
          <Text style={styles.cardValuePrimary}>{monthStats.avgKcal} kcal</Text>
        </View>
        <View style={[styles.rowBetween, { marginTop: 4, marginBottom: 16 }]}>
          <Text style={styles.cardTitleMediumMuted}>Plan target</Text>
          <Text style={styles.cardValueMuted}>{monthStats.targetKcal} kcal</Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#1D6F42" />
          <Text style={styles.infoBoxText}>
            You averaged <Text style={{ fontFamily: 'DM-Sans-Bold' }}>130 kcal</Text> below target. Good deficit for gradual fat loss.
          </Text>
        </View>
      </View>
    );
  };

  // 3. Days on Track Calendar
  const renderCalendar = () => {
    // We need an array of 31 days. Using a mock pattern mimicking the design:
    // mostly green, some red, some future (gray)
    const mockGrid = [
      1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, -1, -1
    ];
    return (
      <View style={styles.card}>
        <Text style={styles.sectionEyebrow}>DAYS ON TRACK THIS MONTH</Text>
        <View style={styles.pillsRow}>
          <View style={[styles.tagPill, { backgroundColor: 'rgba(29, 111, 66, 0.1)' }]}>
            <View style={[styles.dot, { backgroundColor: '#1D6F42' }]} />
            <Text style={[styles.tagText, { color: '#1D6F42' }]}>{monthStats.daysTracked} days tracked</Text>
          </View>
          <View style={[styles.tagPill, { backgroundColor: 'rgba(136, 82, 0, 0.1)' }]}>
            <View style={[styles.dot, { backgroundColor: '#885200' }]} />
            <Text style={[styles.tagText, { color: '#885200' }]}>{monthStats.bestStreak} day best streak</Text>
          </View>
          <View style={[styles.tagPill, { backgroundColor: 'rgba(186, 26, 26, 0.1)' }]}>
            <View style={[styles.dot, { backgroundColor: '#BA1A1A' }]} />
            <Text style={[styles.tagText, { color: '#BA1A1A' }]}>3 days missed</Text>
          </View>
        </View>

        <View style={styles.gridBox}>
          {mockGrid.map((state, i) => {
            let color = '#1D6F42'; // green
            if (state === 0) color = 'rgba(186, 26, 26, 0.4)'; // light red
            if (state === -1) color = '#EEEEEC'; // future/gray
            return <View key={i} style={[styles.gridCell, { backgroundColor: state === 1 ? 'rgba(29, 111, 66, 0.8)' : color }]} />;
          })}
        </View>
      </View>
    );
  };

  // 4. Food Habits
  const renderFoodHabits = () => {
    const meals = [
      { key: 'breakfast', label: 'Breakfast' },
      { key: 'lunch', label: 'Lunch' },
      { key: 'dinner', label: 'Dinner' },
      { key: 'morningSnack', label: 'Morning snack' },
      { key: 'eveningSnack', label: 'Evening snack' },
    ];

    // Sort logic to match UI mock: Breakfast (90%) -> Eve snack (62%)
    const tip = mealTips['eveningSnack'];

    return (
      <View style={styles.card}>
        <Text style={[styles.sectionEyebrow, { marginBottom: 16 }]}>HOW WELL DID YOU EAT?</Text>
        <View style={{ gap: 16 }}>
          {meals.map(m => {
            const val = monthMealRates[m.key];
            const color = getMonthMealColor(val);
            return (
              <View key={m.key}>
                <View style={styles.rowBetween}>
                  <Text style={styles.barLabel}>{m.label}</Text>
                  <Text style={styles.barLabel}>{val}%</Text>
                </View>
                <View style={[styles.progressBarBg, { height: 6, marginTop: 6 }]}>
                  <View style={[styles.progressBarFill, { width: `${val}%`, backgroundColor: color }]} />
                </View>
              </View>
            );
          })}
        </View>

        <View style={[styles.infoBox, { backgroundColor: 'rgba(136, 82, 0, 0.05)', marginTop: 24 }]}>
          <Ionicons name="bulb-outline" size={20} color="#885200" />
          <Text style={[styles.infoBoxText, { color: '#3F4941' }]}>
            Your weakest meal is <Text style={{ fontFamily: 'DM-Sans-Bold' }}>evening snack</Text> — {tip}
          </Text>
        </View>
      </View>
    );
  };

  // 5. Water and Core Habits
  const renderWaterHabits = () => {
    return (
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Ionicons name="water" size={24} color="#3B82F6" />
            <Text style={styles.cardTitleMediumPrimary}>Water Consumption</Text>
          </View>
          <Text style={[styles.cardTitleMediumPrimary, { color: '#2563EB' }]}>Avg {monthStats.avgWaterL} L/day</Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionEyebrow, { color: 'rgba(26,28,27,0.4)', marginBottom: 16 }]}>CORE HABIT CONSISTENCY</Text>
          <View style={styles.habitGrid2x2}>

            <View style={styles.habitCell}>
              <Text style={styles.habitCellLabel}>Morning drink</Text>
              <Text style={[styles.scoreBig, { fontSize: 18, color: '#1D6F42', lineHeight: 28 }]}>{monthHabitRates.morningDrink}%</Text>
            </View>
            <View style={styles.habitCell}>
              <Text style={styles.habitCellLabel}>Evening walk</Text>
              <Text style={[styles.scoreBig, { fontSize: 18, color: '#885200', lineHeight: 28 }]}>{monthHabitRates.eveningWalk}%</Text>
            </View>
            <View style={styles.habitCell}>
              <Text style={styles.habitCellLabel}>Sleep hygiene</Text>
              <Text style={[styles.scoreBig, { fontSize: 18, color: 'rgba(26,28,27,0.8)', lineHeight: 28 }]}>{monthHabitRates.sleepOnTime}%</Text>
            </View>
            <View style={styles.habitCell}>
              <Text style={styles.habitCellLabel}>No junk food</Text>
              <Text style={[styles.scoreBig, { fontSize: 18, color: '#1D6F42', lineHeight: 28 }]}>{monthHabitRates.noJunkFood}%</Text>
            </View>

          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {renderMonthScore()}
      {renderKalories()}
      {renderCalendar()}
      {renderFoodHabits()}
      {renderWaterHabits()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 140, // for bottom tab bar
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 3,
  },
  cardHeaderOnly: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 3,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  // Section text
  sectionEyebrow: { fontFamily: 'DM-Sans-Bold', fontSize: 11, color: 'rgba(26,28,27,0.4)', letterSpacing: 1.5, textTransform: 'uppercase' },
  scoreBig: { fontFamily: 'Fraunces-Bold', fontSize: 48, lineHeight: 56 },
  scoreSub: { fontFamily: 'DM-Sans-Medium', fontSize: 12, color: 'rgba(26,28,27,0.6)', fontStyle: 'italic' },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  badgeText: { fontFamily: 'DM-Sans-Bold', fontSize: 10, textTransform: 'uppercase', letterSpacing: -0.5 },
  monthNoteText: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: 'rgba(26,28,27,0.6)', marginBottom: 24 },

  // Faux Chart
  fauxChartBox: { height: 96, width: '100%', position: 'relative', overflow: 'hidden' },
  fauxChartCurve: {
    position: 'absolute', width: '120%', height: 120,
    borderTopWidth: 2, borderColor: '#BA7517',
    borderRadius: 100, top: 40, left: -20,
    backgroundColor: 'rgba(186,117,23,0.1)'
  },
  fauxChartDot: {
    position: 'absolute', width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#BA7517', right: 20, top: 46
  },

  // Calorie
  cardTitleMediumPrimary: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: '#00552E' },
  cardValuePrimary: { fontFamily: 'DM-Sans-Bold', fontSize: 15, color: '#00552E' },
  cardTitleMediumMuted: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: 'rgba(26,28,27,0.4)' },
  cardValueMuted: { fontFamily: 'DM-Sans-Bold', fontSize: 15, color: 'rgba(26,28,27,0.4)' },
  infoBox: { backgroundColor: 'rgba(29, 111, 66, 0.05)', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  infoBoxText: { flex: 1, fontFamily: 'DM-Sans', fontSize: 13, color: '#3F4941', lineHeight: 20 },

  // Days Calendar
  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16, marginBottom: 8 },
  tagPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  tagText: { fontFamily: 'DM-Sans-Bold', fontSize: 11 },
  gridBox: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingTop: 8 },
  gridCell: { width: '12.6%', aspectRatio: 1, borderRadius: 4 }, // roughly 7 cols

  // Food habits
  barLabel: { fontFamily: 'DM-Sans-Bold', fontSize: 11, color: 'rgba(26,28,27,0.5)' },
  progressBarBg: { backgroundColor: '#EEEEEC', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%' },

  // Water Habit
  habitGrid2x2: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 16 },
  habitCell: { width: '50%', gap: 4 },
  habitCellLabel: { fontFamily: 'DM-Sans-Medium', fontSize: 12, color: 'rgba(26,28,27,0.6)' },
});
