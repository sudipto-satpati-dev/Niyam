import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getScoreColor, getScoreLabel } from '../../utils/trackerScore';

type DayViewProps = {
  data: any; // Using the mock data structure for now
  onLogWater?: (ml: number) => void;
};

export const DayView = ({ data, onLogWater }: DayViewProps) => {
  const {
    score, meals, mealsOnTime, mealsMissed, mealsUpcoming,
    habits, totalKcal, targetKcal, waterMl, waterTargetMl, note
  } = data;

  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  // 1. Score Card
  const renderScoreCard = () => (
    <View style={styles.card}>
      <View style={styles.scoreTextContainer}>
        <Text style={styles.sectionEyebrow}>TODAY'S SCORE</Text>
        <Text style={styles.scoreBig}>{score}</Text>
        <Text style={styles.scoreSub}>{scoreLabel}</Text>
      </View>
      <View style={styles.scoreRingContainer}>
        <CircularProgress
          value={score}
          radius={36}
          duration={1000}
          activeStrokeWidth={6}
          inActiveStrokeWidth={6}
          activeStrokeColor={scoreColor}
          inActiveStrokeColor="#EEEEEC"
          inActiveStrokeOpacity={0.5}
          showProgressValue={false}
        />
        <Text style={[styles.scoreRingText, { color: scoreColor }]}>{score}%</Text>
      </View>
    </View>
  );

  // 2. Calorie Card
  const renderCalorieCard = () => {
    const progressFill = Math.min((totalKcal / targetKcal) * 100, 100);
    const mealChips = ['breakfast', 'morningSnack', 'lunch', 'eveningSnack', 'dinner'];
    const mealNames: Record<string, string> = {
      breakfast: 'Breakfast', morningSnack: 'Snack', lunch: 'Lunch', eveningSnack: 'Eve', dinner: 'Dinner'
    };

    return (
      <View style={[styles.card, { marginTop: 16 }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Calories today</Text>
          <Text style={styles.cardHighlight}>{totalKcal.toLocaleString()} / {targetKcal.toLocaleString()} kcal</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressFill}%`, backgroundColor: '#1D6F42' }]} />
        </View>
        <View style={styles.chipRowWrap}>
          {mealChips.map(key => {
            const meal = meals.find((m: any) => m.mealKey === key);
            if (meal) {
              return (
                <View key={key} style={styles.calChip}>
                  <View style={[styles.dot, { backgroundColor: '#1D6F42' }]} />
                  <Text style={styles.calChipText}>{mealNames[key]} ({meal.kcal} kcal)</Text>
                </View>
              );
            }
            return (
              <Text key={key} style={styles.calChipGhost}>{mealNames[key]} (—)</Text>
            );
          })}
        </View>
      </View>
    );
  };

  // 3. Meals On Time Card
  const renderMealsOnTimeCard = () => {
    const mealChips = ['breakfast', 'morningSnack', 'lunch', 'eveningSnack', 'dinner'];
    const mealNames: Record<string, string> = {
      breakfast: 'Breakfast', morningSnack: 'Snack', lunch: 'Lunch', eveningSnack: 'Eve', dinner: 'Dinner'
    };

    return (
      <View style={[styles.card, { marginTop: 16 }]}>
        <Text style={styles.cardTitleLine}>Meals on time today</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollChips}>
          {mealChips.map(key => {
            const meal = meals.find((m: any) => m.mealKey === key);

            // Logged
            if (meal) {
              if (meal.onTime) {
                const timeStr = meal.loggedAt.split('T')[1].substring(0, 5);
                return (
                  <View key={key} style={[styles.motChip, styles.motChipOnTime]}>
                    <Text style={styles.motChipTextOnTime}>✓ {timeStr}</Text>
                    <Text style={styles.motChipLabelOnTime}>{mealNames[key]}</Text>
                  </View>
                );
              } else {
                return (
                  <View key={key} style={[styles.motChip, styles.motChipLate]}>
                    <Text style={styles.motChipTextLate}>⚠ Late</Text>
                    <Text style={styles.motChipLabelLate}>{mealNames[key]}</Text>
                  </View>
                );
              }
            }
            // Overdue logic (mocking for now with lunch=missed, eve/dinner=upcoming based on scenario)
            if (key === 'lunch' && mealsMissed > 0) {
              return (
                <View key={key} style={[styles.motChip, styles.motChipMissed]}>
                  <Text style={styles.motChipTextMissed}>✗ Missed</Text>
                  <Text style={styles.motChipLabelMissed}>{mealNames[key]}</Text>
                </View>
              );
            }
            if (key === 'breakfast' && mealsMissed > 0 && !meal) {
              return (
                <View key={key} style={[styles.motChip, styles.motChipMissed]}>
                  <Text style={styles.motChipTextMissed}>✗ Missed</Text>
                  <Text style={styles.motChipLabelMissed}>{mealNames[key]}</Text>
                </View>
              );
            }

            // Upcoming
            return (
              <View key={key} style={[styles.motChip, styles.motChipUpcoming]}>
                <Text style={styles.motChipTextUpcoming}>—</Text>
                <Text style={styles.motChipLabelUpcoming}>{mealNames[key]}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  // 4. Water Card
  const renderWaterCard = () => {
    const mlPerGlass = 250;
    const totalGlasses = 8; // Displaying 8 glasses for UX spacing
    const glassesDrank = Math.floor(waterMl / mlPerGlass);
    const progressFill = Math.min((waterMl / waterTargetMl) * 100, 100);

    return (
      <View style={[styles.card, { marginTop: 16 }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Water today</Text>
          <Text style={styles.cardHighlightDark}>{(waterMl / 1000).toFixed(1)} / {(waterTargetMl / 1000).toFixed(1)} L</Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: '#E6F1FB' }]}>
          <View style={[styles.progressBarFill, { width: `${progressFill}%`, backgroundColor: '#378ADD' }]} />
        </View>
        <View style={styles.waterGlasses}>
          {Array.from({ length: totalGlasses }).map((_, i) => {
            const filled = i < glassesDrank;
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                onPress={() => {
                  if (!filled && onLogWater) onLogWater(mlPerGlass);
                }}
              >
                <Ionicons
                  name={filled ? "water" : "water-outline"}
                  size={24}
                  color={filled ? "#378ADD" : "#BFC9BE"}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  // 5. Habits Card
  const renderHabitsCard = () => {
    const doneCount = habits.filter((h: any) => h.status === 'done').length;

    return (
      <View style={[styles.card, { marginTop: 16 }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitleSub}>Habits</Text>
          <Text style={styles.cardHighlightSmall}>{doneCount} of {habits.length} done</Text>
        </View>
        <View style={styles.habitList}>
          {habits.map((habit: any) => (
            <View key={habit.key} style={styles.habitRow}>
              <Text style={[styles.habitName, habit.status !== 'done' && styles.habitNameMuted]}>
                {habit.label}
              </Text>
              <Text style={
                habit.status === 'done' ? styles.habitStatusDone
                  : habit.status === 'missed' ? styles.habitStatusMissed
                    : styles.habitStatusMuted
              }>
                {habit.status === 'done' ? '✓ Done'
                  : habit.status === 'missed' ? '✗ Missed'
                    : habit.status === 'rest_day' ? '— Rest day'
                      : '⏳ Upcoming'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={160}
    >
      {renderScoreCard()}
      {renderCalorieCard()}
      {renderMealsOnTimeCard()}
      {renderWaterCard()}
      {renderHabitsCard()}

      {/* Subjective Note Input */}
      <View style={styles.noteSection}>
        <View style={styles.noteHeader}>
          <Text style={styles.noteLabel}>How did you feel today?</Text>
          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.7}>
            <Ionicons name="checkmark" size={18} color="#1D6F42" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.noteInputBox, { fontFamily: 'DM-Sans', fontSize: 14, color: '#1A1C1B', textAlignVertical: 'top' }]}
          placeholder="Energy, digestion, mood... (optional)"
          placeholderTextColor="#BFC9BE"
          multiline
          defaultValue={note}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 140, // Padding for bottom tab bar
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(191,201,190,0.15)',
  },
  // Score Card
  scoreTextContainer: { flex: 1, justifyContent: 'center' },
  sectionEyebrow: { fontFamily: 'DM-Sans-Bold', fontSize: 11, color: '#1D6F42', letterSpacing: 0.8 },
  scoreBig: { fontFamily: 'Fraunces-Bold', fontSize: 48, color: '#885200', marginTop: 4, marginBottom: 2 },
  scoreSub: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: '#6F7A70' },
  scoreRingContainer: { position: 'absolute', right: 20, top: 20, width: 72, height: 72, alignItems: 'center', justifyContent: 'center' },
  scoreRingText: { position: 'absolute', fontFamily: 'DM-Sans-Bold', fontSize: 14 },

  // Commons
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontFamily: 'DM-Sans', fontSize: 14, color: '#1A1C1B' },
  cardTitleLine: { fontFamily: 'DM-Sans-SemiBold', fontSize: 12, color: '#1A1C1B', marginBottom: 16 },
  cardTitleSub: { fontFamily: 'DM-Sans-SemiBold', fontSize: 12, color: '#1A1C1B' },
  cardHighlight: { fontFamily: 'DM-Sans-Bold', fontSize: 14, color: '#1D6F42' },
  cardHighlightDark: { fontFamily: 'DM-Sans-Bold', fontSize: 14, color: '#1A1C1B' },
  cardHighlightSmall: { fontFamily: 'DM-Sans-Bold', fontSize: 11, color: '#1D6F42' },

  progressBarBg: { height: 8, backgroundColor: '#EEEEEC', borderRadius: 4, overflow: 'hidden', marginBottom: 12 },
  progressBarFill: { height: '100%', borderRadius: 4 },

  // Calories
  chipRowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, rowGap: 6 },
  calChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  calChipText: { fontFamily: 'DM-Sans', fontSize: 11, color: '#1A1C1B' },
  calChipGhost: { fontFamily: 'DM-Sans', fontSize: 11, color: '#BFC9BE' },

  // Meals on time
  scrollChips: { gap: 8, paddingBottom: 4 },
  motChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 4, borderWidth: 1 },
  motChipOnTime: { backgroundColor: '#1D6F42', borderColor: '#1D6F42' },
  motChipTextOnTime: { fontFamily: 'DM-Sans', fontSize: 11, color: '#FFF' },
  motChipLabelOnTime: { fontFamily: 'DM-Sans-Medium', fontSize: 11, color: '#FFF' },

  motChipLate: { backgroundColor: '#FFF', borderColor: '#BA7517' },
  motChipTextLate: { fontFamily: 'DM-Sans', fontSize: 11, color: '#BA7517' },
  motChipLabelLate: { fontFamily: 'DM-Sans-Medium', fontSize: 11, color: '#BA7517' },

  motChipMissed: { backgroundColor: '#FFF', borderColor: '#BA1A1A' },
  motChipTextMissed: { fontFamily: 'DM-Sans', fontSize: 11, color: '#BA1A1A' },
  motChipLabelMissed: { fontFamily: 'DM-Sans-Medium', fontSize: 11, color: '#BA1A1A' },

  motChipUpcoming: { backgroundColor: '#FFF', borderColor: '#BFC9BE' },
  motChipTextUpcoming: { fontFamily: 'DM-Sans', fontSize: 11, color: '#BFC9BE' },
  motChipLabelUpcoming: { fontFamily: 'DM-Sans-Medium', fontSize: 11, color: '#BFC9BE' },

  // Water
  waterGlasses: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginTop: 4 },

  // Habits
  habitList: { gap: 12 },
  habitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  habitName: { fontFamily: 'DM-Sans', fontSize: 13, color: '#1A1C1B' },
  habitNameMuted: { color: '#6F7A70' },
  habitStatusDone: { fontFamily: 'DM-Sans-Bold', fontSize: 13, color: '#1D6F42' },
  habitStatusMissed: { fontFamily: 'DM-Sans-Bold', fontSize: 13, color: '#BA1A1A' },
  habitStatusMuted: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: '#6F7A70' },

  // Note
  noteSection: { marginTop: 16 },
  noteHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, marginLeft: 4, marginRight: 4 },
  noteLabel: { fontFamily: 'DM-Sans-Medium', fontSize: 13, color: '#1A1C1B' },
  saveBtn: { padding: 4 },
  noteInputBox: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, minHeight: 80, justifyContent: 'flex-start' },
  notePlaceholder: { fontFamily: 'DM-Sans', fontSize: 14, color: '#BFC9BE' }
});
