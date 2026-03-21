import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getScoreColor, getWeekScoreLabel, getMealConsistencyColor } from '../../utils/trackerScore';

type WeekViewProps = {
  data: any; // Using the mock week data arrays/objects
};

export const WeekView = ({ data }: WeekViewProps) => {
  const {
    weekDays, weekAvgScore, weekAvgKcal, weekAvgWater,
    mealConsistency, habitConsistency, targetKcal, waterTargetMl
  } = data;

  const scoreColor = getScoreColor(weekAvgScore);
  const scoreLabel = getWeekScoreLabel(weekAvgScore);

  // 1. Week Score Card with 7 mini bars
  const renderWeekScoreCard = () => {
    return (
      <View style={styles.cardHeaderOnly}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={styles.sectionEyebrow}>THIS WEEK</Text>
            <Text style={[styles.scoreBig, { color: scoreColor }]}>{weekAvgScore}</Text>
            <Text style={styles.scoreSub}>{scoreLabel}</Text>
          </View>
          <View style={styles.miniChartContainer}>
            {weekDays.map((day: any, i: number) => {
              const heightPct = Math.max((day.score / 100) * 100, 10); // min 10% for empty days
              const color = day.score === 0 ? '#E2E3E1' : getScoreColor(day.score);
              return (
                <View key={i} style={styles.miniBarColumn}>
                  <View style={[styles.miniBar, { height: `${heightPct}%`, backgroundColor: color }]} />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  // 2. Calorie Chart
  const renderCalorieChart = () => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Avg calories</Text>
          <Text style={styles.cardHighlight}>{weekAvgKcal} <Text style={styles.unitText}>kcal/day</Text></Text>
        </View>

        <View style={styles.chartArea}>
          {/* Target line */}
          <View style={styles.targetLineContainer}>
             <View style={styles.targetLine} />
          </View>
          
          <View style={styles.chartBars}>
            {weekDays.map((day: any, i: number) => {
              // rough calc for simple view
              const heightPct = Math.min((day.kcal / targetKcal) * 75, 100); 
              return (
                <View key={i} style={styles.calBarColumn}>
                   <View style={[styles.calBar, { height: `${heightPct}%` }]} />
                </View>
              );
            })}
          </View>
        </View>
        <Text style={styles.chartFooterText}>Target: {targetKcal} kcal</Text>
      </View>
    );
  };

  // 3. Meal Consistency
  const renderMealConsistency = () => {
    const meals = [
      { key: 'breakfast', label: 'Breakfast' },
      { key: 'morningSnack', label: 'Snack' },
      { key: 'lunch', label: 'Lunch' },
      { key: 'eveningSnack', label: 'Eve snack' },
      { key: 'dinner', label: 'Dinner' },
    ];

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitleLine}>Meals hit this week</Text>
        <View style={styles.consistencyList}>
          {meals.map(m => {
            const row = mealConsistency[m.key];
            const pct = (row.hit / row.total) * 100;
            const color = getMealConsistencyColor(row.hit, row.total);

            return (
              <View key={m.key} style={styles.consistencyRow}>
                <Text style={styles.consistencyLabel}>{m.label}</Text>
                <View style={styles.consistencyBarBg}>
                  <View style={[styles.consistencyBarFill, { width: `${pct}%`, backgroundColor: color }]} />
                </View>
                <Text style={[styles.consistencyValue, { color }]}>{row.hit}/{row.total}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  // 4. Water avg
  const renderWaterCard = () => {
    const avgL = (weekAvgWater / 1000).toFixed(1);
    const targetL = (waterTargetMl / 1000).toFixed(1);
    const pct = Math.min((weekAvgWater / waterTargetMl) * 100, 100);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Avg water intake</Text>
          <Text style={[styles.cardHighlight, { color: '#2563EB' }]}>{avgL} <Text style={styles.unitText}>L/day</Text></Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: '#EFF6FF', height: 28, borderRadius: 12, padding: 3 }]}>
          <View style={[styles.progressBarFill, { width: `${pct}%`, backgroundColor: '#3B82F6', borderRadius: 8 }]} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={styles.waterSubText}>{Math.round(pct)}% of daily goal</Text>
          <Text style={styles.waterSubTextDark}>Goal: {targetL}L</Text>
        </View>
      </View>
    );
  };

  // 5. Best / Worst Card
  const renderBestWorst = () => {
    // Find best and worst completed days (ignore day score 0)
    const validDays = [...weekDays].filter(d => d.score > 0);
    if (validDays.length === 0) return null;

    validDays.sort((a, b) => b.score - a.score);
    const best = validDays[0];
    const worst = validDays[validDays.length - 1];

    return (
      <View style={styles.rowCards}>
        <View style={[styles.halfCard, { backgroundColor: 'rgba(29, 111, 66, 0.05)', borderColor: 'rgba(29, 111, 66, 0.05)' }]}>
          <Text style={[styles.sectionEyebrow, { color: '#1D6F42' }]}>BEST DAY</Text>
          <Text style={styles.dayLabel}>{best.label}</Text>
          <Text style={[styles.scoreBig, { fontSize: 24, color: '#1D6F42' }]}>{best.score}%</Text>
        </View>
        <View style={[styles.halfCard, { backgroundColor: 'rgba(186, 26, 26, 0.05)', borderColor: 'rgba(186, 26, 26, 0.05)' }]}>
          <Text style={[styles.sectionEyebrow, { color: '#BA1A1A' }]}>TOUGHEST</Text>
          <Text style={styles.dayLabel}>{worst.label}</Text>
          <Text style={[styles.scoreBig, { fontSize: 24, color: '#BA1A1A' }]}>{worst.score}%</Text>
        </View>
      </View>
    );
  };

  // 6. Habit Completion
  const renderHabitCompletion = () => {
    const habitsList = [
      { key: 'morningDrink', label: 'Morning drink', color: '#1D6F42' },
      { key: 'exercise',     label: 'Exercise',      color: '#BA7517' },
      { key: 'eveningWalk',  label: 'Evening walk',  color: '#1D6F42' },
      { key: 'sleepOnTime',  label: 'Sleep on time', color: '#BA7517' },
    ];

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitleLine}>Habit completion</Text>
        <View style={styles.habitList}>
          {habitsList.map(h => {
             const row = habitConsistency[h.key];
             if (!row) return null;
             
             // Build array of 7 dots based on whether hit
             return (
               <View key={h.key} style={styles.habitRow}>
                 <View style={{ flex: 1 }}>
                   <Text style={styles.habitName}>{h.label}</Text>
                   <Text style={[styles.habitScoreText, { color: h.color }]}>{row.hit}/{row.total} days</Text>
                 </View>
                 <View style={styles.dotsContainer}>
                   {weekDays.map((d: any, i: number) => {
                     const isDone = d.habits[h.key];
                     const isFuture = d.score === 0;
                     const dotColor = isFuture ? '#EEEEEC' : (isDone ? h.color : '#EEEEEC');
                     return <View key={i} style={[styles.dot, { backgroundColor: dotColor }]} />;
                   })}
                 </View>
               </View>
             );
          })}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {renderWeekScoreCard()}
      {renderCalorieChart()}
      {renderMealConsistency()}
      {renderWaterCard()}
      {renderBestWorst()}
      {renderHabitCompletion()}
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
  
  // Week Score
  sectionEyebrow: { fontFamily: 'DM-Sans-Bold', fontSize: 11, color: '#1D6F42', letterSpacing: 1.5, marginBottom: 8 },
  scoreBig: { fontFamily: 'Fraunces-Bold', fontSize: 48, color: '#885200', lineHeight: 56 },
  scoreSub: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: '#1A1C1B', opacity: 0.5 },
  
  miniChartContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 80, gap: 6, paddingTop: 16 },
  miniBarColumn: { width: 12, height: '100%', justifyContent: 'flex-end' },
  miniBar: { width: '100%', borderRadius: 6 },
  
  // Calorie
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 },
  cardTitle: { fontFamily: 'DM-Sans-Bold', fontSize: 14, color: 'rgba(26,28,27,0.8)' },
  cardHighlight: { fontFamily: 'Fraunces-Bold', fontSize: 18, color: '#1D6F42' },
  unitText: { fontFamily: 'DM-Sans', fontSize: 12, opacity: 0.6 },
  
  chartArea: { height: 120, position: 'relative', marginBottom: 8 },
  targetLineContainer: { position: 'absolute', width: '100%', top: '25%', height: 1, overflow: 'hidden' },
  targetLine: { width: '100%', height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(26,28,27,0.1)' },
  chartBars: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 4 },
  calBarColumn: { width: 10, height: '100%', justifyContent: 'flex-end' },
  calBar: { width: '100%', backgroundColor: 'rgba(29, 111, 66, 0.4)', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  chartFooterText: { fontFamily: 'DM-Sans', fontSize: 10, color: 'rgba(26,28,27,0.4)', textAlign: 'center' },
  
  // Meal Consistency
  cardTitleLine: { fontFamily: 'DM-Sans-Bold', fontSize: 14, color: 'rgba(26,28,27,0.8)', marginBottom: 16 },
  consistencyList: { gap: 12 },
  consistencyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  consistencyLabel: { width: 70, fontFamily: 'DM-Sans', fontSize: 12, color: 'rgba(26,28,27,0.6)' },
  consistencyBarBg: { flex: 1, height: 6, backgroundColor: '#F4F4F2', borderRadius: 4, overflow: 'hidden' },
  consistencyBarFill: { height: '100%', borderRadius: 4 },
  consistencyValue: { width: 20, fontFamily: 'DM-Sans-Bold', fontSize: 11, textAlign: 'right' },
  
  // Water
  progressBarBg: { width: '100%', overflow: 'hidden' },
  progressBarFill: { height: '100%' },
  waterSubText: { fontFamily: 'DM-Sans', fontSize: 10, color: 'rgba(37, 99, 235, 0.6)' },
  waterSubTextDark: { fontFamily: 'DM-Sans', fontSize: 10, color: 'rgba(26,28,27,0.4)' },
  
  // Best Worst
  rowCards: { flexDirection: 'row', gap: 16 },
  halfCard: { flex: 1, borderRadius: 24, padding: 12, borderWidth: 1 },
  dayLabel: { fontFamily: 'DM-Sans-Bold', fontSize: 14, color: '#1A1C1B', marginBottom: 2 },
  
  // Habits
  habitList: { gap: 24 },
  habitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  habitName: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: '#1A1C1B', marginBottom: 2 },
  habitScoreText: { fontFamily: 'DM-Sans-Bold', fontSize: 11 },
  dotsContainer: { flexDirection: 'row', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
});
