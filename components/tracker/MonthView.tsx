import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { getCalorieNote, getMonthMealColor, getScoreColor } from '../../utils/trackerScore';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

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

        <View style={styles.miniChartContainer}>
          {scoreTrend.map((score: number, i: number) => {
            const heightPct = Math.max((score / 100) * 100, 10);
            const color = score === 0 ? '#E2E3E1' : getScoreColor(score);
            return (
              <View key={i} style={styles.miniBarColumn}>
                <View style={[styles.miniBar, { height: `${heightPct}%`, backgroundColor: color }]} />
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  // 1b. Score Trend Area Chart
  const renderScoreTrend = () => {
    // Generate smooth mock data for 4 weeks matching the "Peak: 92%" image
    const data = {
      labels: ['W1', 'W2', 'W3', 'W4'],
      datasets: [
        {
          data: [60, 50, 92, 70],
          color: (opacity = 1) => `rgba(29, 111, 66, ${opacity})`, // #1D6F42
          strokeWidth: 3
        }
      ],
    };

    const chartConfig = {
      backgroundGradientFrom: '#FFFFFF',
      backgroundGradientTo: '#FFFFFF',
      fillShadowGradientFrom: '#1D6F42',
      fillShadowGradientFromOpacity: 0.1,
      fillShadowGradientTo: '#1D6F42',
      fillShadowGradientToOpacity: 0.0,
      color: (opacity = 1) => `rgba(29, 111, 66, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(26,28,27,0.5)`,
      strokeWidth: 3,
      propsForDots: {
        r: '0', 
      },
      useShadowColorFromDataset: false,
    };

    return (
      <View style={{ marginTop: 8 }}>
        <View style={[styles.card, { paddingHorizontal: 0, paddingBottom: 0, paddingTop: 0, overflow: 'hidden' }]}>
          {/* Header inside the card */}
          <View style={[styles.rowBetween, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 }]}>
            <Text style={styles.cardTitleMediumPrimary}>Score trend</Text>
            <Text style={styles.cardValuePrimary}>76% <Text style={{ fontFamily: 'DM-Sans', fontSize: 12, opacity: 0.6 }}>avg</Text></Text>
          </View>

          {/* Custom Tooltip marker for the Peak */}
          <View style={{ position: 'absolute', top: 56, left: '60%', backgroundColor: '#004A27', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, zIndex: 10 }}>
            <Text style={{ fontFamily: 'DM-Sans-Bold', fontSize: 10, color: '#FFFFFF' }}>Peak: 92%</Text>
          </View>
          <View style={{ position: 'absolute', top: 82, left: '63.5%', width: 8, height: 8, borderRadius: 4, backgroundColor: '#004A27', zIndex: 10 }} />

          <LineChart
            data={data}
            width={screenWidth - 24} // wider to ensure labels are contained
            height={180}
            chartConfig={chartConfig}
            bezier
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            withHorizontalLabels={false}
            yAxisLabel=""
            yAxisSuffix=""
            style={{
              paddingRight: 0,
              paddingLeft: 0,
              marginLeft: -8, // slight nudge back
              marginBottom: 4,
            }}
          />
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
    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    // Exactly replicating a full 31-day visual layout
    const gridCells = [
      { day: '', type: 'empty' }, { day: '', type: 'empty' }, { day: '', type: 'empty' }, { day: '', type: 'empty' }, { day: '', type: 'empty' },
      { day: 1, type: 'good' }, { day: 2, type: 'average' },
      { day: 3, type: 'good' }, { day: 4, type: 'excellent' }, { day: 5, type: 'excellent' }, { day: 6, type: 'good' }, { day: 7, type: 'excellent' }, { day: 8, type: 'bad' }, { day: 9, type: 'good' },
      { day: 10, type: 'excellent' }, { day: 11, type: 'excellent' }, { day: 12, type: 'good' }, { day: 13, type: 'excellent' }, { day: 14, type: 'good' }, { day: 15, type: 'average' }, { day: 16, type: 'excellent' },
      { day: 17, type: 'good' }, { day: 18, type: 'excellent' }, { day: 19, type: 'good' }, { day: 20, type: 'average' }, { day: 21, type: 'excellent' }, { day: 22, type: 'excellent' }, { day: 23, type: 'good' },
      { day: 24, type: 'bad' }, { day: 25, type: 'good' }, { day: 26, type: 'excellent' }, { day: 27, type: 'good' }, { day: 28, type: 'average' }, { day: 29, type: 'excellent' }, { day: 30, type: 'excellent' }, { day: 31, type: 'good' }
    ];

    const getColor = (type: string) => {
      switch (type) {
        case 'excellent': return '#297347'; // dark green as it is
        case 'good': return '#92BAA2';      // lighter green
        case 'average': return '#DCE2DD';   // gray as it is
        case 'bad': return '#C24D4D';       // red
        case 'empty': return 'transparent';
        default: return 'transparent';
      }
    };

    const getTextColor = (type: string) => {
      return (type === 'excellent' || type === 'bad') ? '#FFFFFF' : '#1A1C1B';
    };

    return (
      <View style={styles.card}>
        {/* Calendar Header */}
        <View style={styles.calHeaderRow}>
          {weekDays.map((d, i) => (
            <Text key={i} style={styles.calHeaderText}>{d}</Text>
          ))}
        </View>

        {/* Grid */}
        <View style={styles.calGrid}>
          {gridCells.map((cell, i) => (
            <View key={i} style={styles.calCellWrapper}>
              <View style={[styles.calCell, { backgroundColor: getColor(cell.type) }]}>
                <Text style={[styles.calCellText, { color: getTextColor(cell.type) }]}>{cell.day}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.calLegendContainer}>
          <View style={styles.calLegendItem}>
            <View style={[styles.calLegendBox, { backgroundColor: getColor('bad') }]} />
            <Text style={styles.calLegendText}>Bad</Text>
          </View>
          <View style={styles.calLegendItem}>
            <View style={[styles.calLegendBox, { backgroundColor: getColor('average') }]} />
            <Text style={styles.calLegendText}>Average</Text>
          </View>
          <View style={styles.calLegendItem}>
            <View style={[styles.calLegendBox, { backgroundColor: getColor('good') }]} />
            <Text style={styles.calLegendText}>Good</Text>
          </View>
          <View style={styles.calLegendItem}>
            <View style={[styles.calLegendBox, { backgroundColor: getColor('excellent') }]} />
            <Text style={styles.calLegendText}>Excellent</Text>
          </View>
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
      {renderScoreTrend()}
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

  // Monthly Trend Chart
  miniChartContainer: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 80, gap: 2, marginTop: 8 },
  miniBarColumn: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  miniBar: { width: '100%', borderRadius: 4 },

  // Calorie
  cardTitleMediumPrimary: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: '#00552E' },
  cardValuePrimary: { fontFamily: 'DM-Sans-Bold', fontSize: 15, color: '#00552E' },
  cardTitleMediumMuted: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: 'rgba(26,28,27,0.4)' },
  cardValueMuted: { fontFamily: 'DM-Sans-Bold', fontSize: 15, color: 'rgba(26,28,27,0.4)' },
  infoBox: { backgroundColor: 'rgba(29, 111, 66, 0.05)', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  infoBoxText: { flex: 1, fontFamily: 'DM-Sans', fontSize: 13, color: '#3F4941', lineHeight: 20 },

  // Days Calendar
  calHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0, marginTop: 4, marginBottom: 4 },
  calHeaderText: { width: '14.28%', textAlign: 'center', fontFamily: 'DM-Sans-Bold', fontSize: 10, color: 'rgba(26,28,27,0.4)' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginHorizontal: -4 },
  calCellWrapper: { width: '14.28%', padding: 4 },
  calCell: { flex: 1, aspectRatio: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  calCellText: { fontFamily: 'DM-Sans-Bold', fontSize: 13 },
  calLegendContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 16, paddingBottom: 0 },
  calLegendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  calLegendBox: { width: 12, height: 12, borderRadius: 3 },
  calLegendText: { fontFamily: 'DM-Sans-Medium', fontSize: 10, color: 'rgba(26,28,27,0.7)' },

  // Food habits
  barLabel: { fontFamily: 'DM-Sans-Bold', fontSize: 11, color: 'rgba(26,28,27,0.5)' },
  progressBarBg: { backgroundColor: '#EEEEEC', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%' },

  // Water Habit
  habitGrid2x2: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 16 },
  habitCell: { width: '50%', gap: 4 },
  habitCellLabel: { fontFamily: 'DM-Sans-Medium', fontSize: 12, color: 'rgba(26,28,27,0.6)' },
});
