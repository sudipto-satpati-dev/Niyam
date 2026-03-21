import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockWeeklyMeals } from '../Data/mockWeeklyMeals';

const MEAL_SEQUENCE = [
  { key: 'breakfast', label: 'Bfst', icon: 'restaurant' },
  { key: 'morningSnack', label: 'Snack', icon: 'fast-food' },
  { key: 'lunch', label: 'Lunch', icon: 'nutrition' },
  { key: 'eveningSnack', label: 'Eve', icon: 'cafe' },
  { key: 'dinner', label: 'Dinner', icon: 'moon' },
];

export default function WeeklyMealsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderMealIcons = (day: any, isToday: boolean, isFuture: boolean) => {
    if (isFuture) {
      return (
        <View style={styles.futureDashesContainer}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <View key={i} style={styles.futureDash} />
          ))}
        </View>
      );
    }

    const currentMealIdx = 1; // Simulating 'Snack' as the current active meal for Today

    return (
      <View style={styles.mealIconsContainer}>
        {MEAL_SEQUENCE.map((meal, idx) => {
          const isLogged = (day.logged as any)[meal.key];

          if (isToday) {
            if (idx < currentMealIdx) {
              return isLogged ? (
                <View key={idx} style={styles.iconBlock}>
                  <View style={styles.iconBoxGreen}><Ionicons name={meal.icon as any} size={16} color="#9fefb6" /></View>
                  <Text style={styles.iconLabel}>{meal.label}</Text>
                </View>
              ) : (
                <View key={idx} style={styles.iconBlock}>
                  <View style={styles.iconBoxRed}><Ionicons name="close" size={16} color="#ba1a1a" /></View>
                  <Text style={styles.iconLabelRed}>{meal.label}</Text>
                </View>
              );
            } else if (idx === currentMealIdx) {
              return (
                <View key={idx} style={styles.iconBlock}>
                  <View style={styles.iconBoxActive}><Ionicons name="add" size={18} color="#6f7a70" /></View>
                  <Text style={styles.iconLabelActive}>{meal.label}</Text>
                </View>
              );
            } else {
              return (
                <View key={idx} style={styles.iconBlock}>
                  <View style={styles.iconBoxFuture}><Ionicons name={meal.icon as any} size={16} color="rgba(111, 122, 112, 0.4)" /></View>
                  <Text style={styles.iconLabelFuture}>{meal.label}</Text>
                </View>
              );
            }
          }

          return isLogged ? (
            <View key={idx} style={styles.iconBlock}>
              <View style={styles.iconBoxGreen}><Ionicons name={meal.icon as any} size={16} color="#9fefb6" /></View>
              <Text style={styles.iconLabel}>{meal.label}</Text>
            </View>
          ) : (
            <View key={idx} style={styles.iconBlock}>
              <View style={styles.iconBoxRed}><Ionicons name="close" size={16} color="#ba1a1a" /></View>
              <Text style={styles.iconLabelRed}>{meal.label}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {/* Sticky Top Header */}
      <View style={[styles.appBar, { paddingTop: insets.top + 8 }]}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1a1c1b" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>This week</Text>
        </View>
        <View style={styles.appBarRight}>
          <Ionicons name="calendar-outline" size={16} color="#1d6f42" />
          <Text style={styles.appBarDate}>Mon 17 – Sun 23 Mar</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 70 }]}>

        {/* Weekly Goal Bento Header */}
        <View style={styles.bentoHeader}>
          <View style={styles.bentoLeft}>
            <View>
              <Text style={styles.bentoLeftLabel}>WEEKLY GOAL</Text>
              <Text style={styles.bentoLeftTitle}>Nourishment Ritual</Text>
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.progressText}>82<Text style={styles.progressPercent}>%</Text></Text>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
            </View>
          </View>

          <View style={styles.bentoRight}>
            <Text style={styles.bentoRightLabel}>QUICK ACTION</Text>
            <Text style={styles.bentoRightTitle}>Ready for Lunch?</Text>
            <TouchableOpacity style={styles.bentoRightBtn}>
              <Text style={styles.bentoRightBtnText}>Log Meal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Day-by-Day Journey List */}
        <View style={styles.journeyList}>
          {mockWeeklyMeals.map((day, idx) => {
            const isToday = day.day === 'Sat'; // Hardcoded based on mock data comment
            const isFuture = day.dayScore === null;

            return (
              <View
                key={idx}
                style={[
                  styles.dayCard,
                  isToday && styles.dayCardToday,
                  isFuture && styles.dayCardFuture
                ]}
              >
                <View style={styles.dayCardHeader}>
                  <View>
                    <Text style={[styles.dayCardTitle, isFuture && { color: '#6f7a70' }]}>
                      {day.day === 'Sat' ? 'Saturday' : day.day === 'Mon' ? 'Monday' : day.day === 'Tue' ? 'Tuesday' : day.day === 'Wed' ? 'Wednesday' : day.day === 'Thu' ? 'Thursday' : day.day === 'Fri' ? 'Friday' : 'Sunday'}
                    </Text>
                    <Text style={[styles.dayCardDate, isToday && { color: '#1d6f42', fontWeight: 'bold' }]}>
                      {isToday ? `TODAY • ${day.date.split('-')[2]} MARCH` : `${day.date.split('-')[2]} MARCH`}
                    </Text>
                  </View>
                  {!isFuture && (
                    <View style={styles.scoreBadge}>
                      <Text style={styles.scoreBadgeText}>{day.dayScore ? `${day.dayScore}% SCORE` : '-- SCORE'}</Text>
                    </View>
                  )}
                </View>

                {renderMealIcons(day, isToday, isFuture)}
              </View>
            );
          })}
        </View>

        {/* Week summary Dashboard */}
        <View style={styles.summarySection}>
          <Text style={styles.summarySectionTitle}>WEEK SUMMARY</Text>
          <View style={styles.summaryCard}>

            <View style={styles.summaryTop}>
              {/* Fake Donut visualization using border radii overlapping */}
              <View style={styles.donutPlaceholder}>
                <View style={styles.donutBg}>
                  <View style={styles.donutFill}>
                    <Text style={styles.donutText}>80%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.summaryTextStats}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Meals Logged</Text>
                  <Text style={styles.statValueBase}>14/18</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Avg Score</Text>
                  <Text style={styles.statValuePrimary}>82%</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Top Ingredient</Text>
                  <Text style={styles.statValueBase}>Spinach</Text>
                </View>
              </View>
            </View>

            <View style={styles.summaryBottomTokens}>
              <View style={styles.summaryToken}>
                <Ionicons name="flame" size={24} color="#885200" style={{ marginBottom: 8 }} />
                <Text style={styles.tokenValue}>2,140</Text>
                <Text style={styles.tokenLabel}>AVG CALORIES</Text>
              </View>
              <View style={styles.summaryToken}>
                <Ionicons name="leaf" size={24} color="#1d6f42" style={{ marginBottom: 8 }} />
                <Text style={styles.tokenValue}>92g</Text>
                <Text style={styles.tokenLabel}>AVG PROTEIN</Text>
              </View>
            </View>

          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  appBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(247, 247, 245, 0.8)',
    borderBottomWidth: 1,
    borderColor: 'rgba(191, 201, 190, 0.1)',
    zIndex: 10,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
    marginLeft: -4,
  },
  appBarTitle: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 18,
    color: '#1a1c1b',
  },
  appBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appBarDate: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  bentoHeader: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 32,
  },
  bentoLeft: {
    flex: 1,
    backgroundColor: '#f4f4f2',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    minHeight: 160,
  },
  bentoLeftLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#6f7a70',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  bentoLeftTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 24,
    color: '#00552e',
    lineHeight: 28,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  progressText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 36,
    color: '#1a1c1b',
    lineHeight: 36,
  },
  progressPercent: {
    fontSize: 20,
  },
  progressBarBg: {
    height: 8,
    width: 64,
    backgroundColor: '#e8e8e6',
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    width: '82%',
    backgroundColor: '#1d6f42',
    borderRadius: 4,
  },
  bentoRight: {
    flex: 1,
    backgroundColor: '#1d6f42',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    minHeight: 160,
  },
  bentoRightLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  bentoRightTitle: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 26,
  },
  bentoRightBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bentoRightBtnText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1d6f42',
  },
  journeyList: {
    gap: 16,
  },
  dayCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(191, 201, 190, 0.1)',
  },
  dayCardToday: {
    backgroundColor: '#f4f4f2',
    borderLeftWidth: 4,
    borderLeftColor: '#1d6f42',
    shadowOpacity: 0,
    elevation: 0,
  },
  dayCardFuture: {
    backgroundColor: '#ffffff',
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  dayCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayCardTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 20,
    color: '#1a1c1b',
    marginBottom: 2,
  },
  dayCardDate: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#6f7a70',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  scoreBadge: {
    backgroundColor: 'rgba(29, 111, 66, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scoreBadgeText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#1d6f42',
  },
  mealIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBlock: {
    alignItems: 'center',
    gap: 8,
    width: 48,
  },
  iconBoxGreen: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#1d6f42',
    justifyContent: 'center', alignItems: 'center',
  },
  iconBoxRed: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255, 218, 214, 0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  iconBoxActive: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#e8e8e6',
    borderWidth: 2, borderColor: 'rgba(29, 111, 66, 0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  iconBoxFuture: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#e8e8e6',
    justifyContent: 'center', alignItems: 'center',
  },
  iconLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9, textTransform: 'uppercase',
    color: '#3f4941',
  },
  iconLabelRed: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9, textTransform: 'uppercase',
    color: '#ba1a1a',
  },
  iconLabelActive: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9, textTransform: 'uppercase',
    color: '#00552e',
  },
  iconLabelFuture: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9, textTransform: 'uppercase',
    color: '#a3a3a3',
  },
  futureDashesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  futureDash: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e8e8e6',
  },
  summarySection: {
    marginTop: 48,
    marginBottom: 24,
  },
  summarySectionTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 12,
    letterSpacing: 2,
    color: '#3f4941',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#e8e8e6',
    borderRadius: 32,
    padding: 24,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  donutPlaceholder: {
    width: 96, height: 96,
    borderRadius: 48,
    borderWidth: 8,
    borderColor: '#fdad4e',
    borderRightColor: 'rgba(253, 173, 78, 0.2)', // Fake progress indicator approach
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  donutBg: {
    transform: [{ rotate: '45deg' }],
    alignItems: 'center', justifyContent: 'center'
  },
  donutFill: {
  },
  donutText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 22, color: '#1a1c1b',
  },
  summaryTextStats: {
    flex: 1,
    marginLeft: 32,
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#3f4941',
  },
  statValueBase: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1a1c1b',
  },
  statValuePrimary: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1d6f42',
  },
  summaryBottomTokens: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryToken: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
  },
  tokenValue: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 26,
    color: '#1a1c1b',
    marginBottom: 4,
  },
  tokenLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    letterSpacing: 1,
    color: 'rgba(26, 28, 27, 0.5)',
  },
});
