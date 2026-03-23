import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockTodayMidDay } from '../Data/mockTrackerData';
import { mockHomeState } from '../Data/mockHomeState';
import { mockWeekHistory } from '../Data/mockWeekHistory';
import { useDailyLogStore } from '../stores/dailyLogStore';
import { usePlanStore } from '../stores/planStore';

// ── Types ──────────────────────────────────────────────────────────────
type MessageRole = 'user' | 'ai';

interface MealBar { label: string; pct: number; weakest?: boolean }
interface StructuredResponse {
  type: 'meal_consistency' | 'plain';
  title?: string;
  subtitle?: string;
  bars?: MealBar[];
  body?: string;
  highlights?: string[];   // words in body to highlight orange
  fix?: string;
  fixHighlights?: string[]; // words in fix to bold
  followUp?: string;
  plain?: string;
}

interface Message {
  id: string;
  role: MessageRole;
  structured?: StructuredResponse;
  timestamp: Date;
}

// ── User Context ───────────────────────────────────────────────────────
function buildCtx(
  todayLog: ReturnType<typeof useDailyLogStore.getState>['today'],
  targetKcal: number,
  streak: number,
) {
  const loggedMeals = todayLog.meals.map(m => m.mealKey);
  const skippedMeals = ['breakfast', 'morningSnack', 'lunch', 'eveningSnack', 'dinner'].filter(
    m => !loggedMeals.includes(m),
  );
  const weekDone = mockWeekHistory.filter(d => d.dayScore > 0);
  const weekAvgScore = weekDone.length
    ? Math.round(weekDone.reduce((a, b) => a + b.dayScore, 0) / weekDone.length)
    : 0;
  const weekWithKcal = mockWeekHistory.filter(d => d.totalKcal > 0);
  const weekAvgKcal = weekWithKcal.length
    ? Math.round(weekWithKcal.reduce((a, b) => a + b.totalKcal, 0) / weekWithKcal.length)
    : 0;

  const mealSkipCounts: Record<string, number> = {
    breakfast: 0, morningSnack: 0, lunch: 0, eveningSnack: 0, dinner: 0,
  };
  mockWeekHistory.forEach(d => {
    Object.keys(mealSkipCounts).forEach(m => {
      if (!d.meals.includes(m)) mealSkipCounts[m]++;
    });
  });
  const mealHitRates: Record<string, number> = {
    breakfast: Math.round(((7 - mealSkipCounts.breakfast) / 7) * 100),
    morningSnack: Math.round(((7 - mealSkipCounts.morningSnack) / 7) * 100),
    lunch: Math.round(((7 - mealSkipCounts.lunch) / 7) * 100),
    eveningSnack: Math.round(((7 - mealSkipCounts.eveningSnack) / 7) * 100),
    dinner: Math.round(((7 - mealSkipCounts.dinner) / 7) * 100),
  };
  const mostSkipped = Object.entries(mealSkipCounts).sort((a, b) => b[1] - a[1])[0][0];

  return {
    user: mockHomeState.user,
    streak,
    today: {
      loggedKcal: todayLog.totalKcal,
      targetKcal,
      loggedMeals,
      skippedMeals,
      waterMl: mockTodayMidDay.waterMl,
      waterTargetMl: mockTodayMidDay.waterTargetMl,
      score: mockTodayMidDay.score,
    },
    week: { avgScore: weekAvgScore, avgKcal: weekAvgKcal },
    mealHitRates,
    mostSkipped,
    weight: {
      current: mockHomeState.user.currentWeightKg,
      start: mockHomeState.user.startWeightKg,
      goal: mockHomeState.user.goalWeightKg,
    },
  };
}

// ── AI Response Engine ─────────────────────────────────────────────────
function generateResponse(
  question: string,
  ctx: ReturnType<typeof buildCtx>,
): StructuredResponse {
  const q = question.toLowerCase();
  const name = ctx.user.name;

  // Skip / which meal
  if (q.includes('skip') || q.includes('miss') || q.includes('which meal') || q.includes('meal consistency')) {
    const rates = ctx.mealHitRates;
    const bars: MealBar[] = [
      { label: 'Breakfast',     pct: rates.breakfast    },
      { label: 'Dinner',        pct: rates.dinner       },
      { label: 'Lunch',         pct: rates.lunch        },
      { label: 'Morning snack', pct: rates.morningSnack },
      { label: 'Evening snack', pct: rates.eveningSnack, weakest: ctx.mostSkipped === 'eveningSnack' },
    ].sort((a, b) => b.pct - a.pct);
    // Mark the one with lowest pct as weakest
    const minPct = Math.min(...bars.map(b => b.pct));
    bars.forEach(b => { if (b.pct === minPct) b.weakest = true; });
    const weakestLabel = bars.find(b => b.weakest)?.label ?? 'Evening snack';
    const weakestLower = weakestLabel.toLowerCase();
    return {
      type: 'meal_consistency',
      title: 'Meal Consistency',
      subtitle: 'Based on your last week, here\'s your ritual breakdown:',
      bars,
      body: `You skip ${weakestLower} most often. This is actually affecting your dinner — when you miss it, you tend to eat 200–300 kcal more at dinner.`,
      highlights: [weakestLower, '200–300 kcal more'],
      fix: `Set a 4:30 PM alarm and keep a snack at your desk. Even roasted chana or a handful of nuts takes under 2 min.`,
      fixHighlights: ['4:30 PM alarm'],
      followUp: 'What snacks do you suggest?',
    };
  }

  // Week summary
  if (q.includes('week') || q.includes('this week')) {
    const best = mockWeekHistory.reduce((a, b) => a.dayScore > b.dayScore ? a : b);
    return {
      type: 'plain',
      plain: `Your week was solid, ${name}. 📊 Avg score: ${ctx.week.avgScore}/100. Avg calories: ${ctx.week.avgKcal} kcal/day (target ${ctx.today.targetKcal}). Best day: ${best.date} with ${best.dayScore} — "${best.note || 'No note'}". Your streak is at ${ctx.streak} days 🔥. Focus area: hit your ${ctx.mostSkipped.replace(/([A-Z])/g, ' $1').toLowerCase()} consistently.`,
    };
  }

  // Weight
  if (q.includes('weight') && (q.includes('not') || q.includes('losing') || q.includes("haven't"))) {
    return {
      type: 'plain',
      plain: `${name}, you've lost ${ctx.weight.start - ctx.weight.current} kg so far (${ctx.weight.start} → ${ctx.weight.current} kg). Weight loss isn't always linear — your body retains water during stress, poor sleep, or salty meals. Your weekly avg is ${ctx.week.avgKcal} kcal vs. ${ctx.today.targetKcal} target. You're in a mild deficit which is sustainable. Keep tracking — the scale will catch up.`,
    };
  }

  // Water
  if (q.includes('water') || q.includes('hydrat')) {
    const waterL = (ctx.today.waterMl / 1000).toFixed(1);
    const targetL = (ctx.today.waterTargetMl / 1000).toFixed(1);
    const pct = Math.round((ctx.today.waterMl / ctx.today.waterTargetMl) * 100);
    return {
      type: 'plain',
      plain: pct >= 100
        ? `You're fully hydrated today, ${name}! ${waterL}L — meeting your ${targetL}L target. Proper hydration supports digestion, energy, and fat metabolism. Keep it up!`
        : `Today you've had ${waterL}L out of ${targetL}L (${pct}%). You still need ${((ctx.today.waterTargetMl - ctx.today.waterMl) / 1000).toFixed(1)}L. Try sipping between meals. Dehydration often feels like hunger — causing extra snacking.`,
    };
  }

  // Focus / advice
  if (q.includes('focus') || q.includes('advice') || q.includes('improve') || q.includes('suggest') || q.includes('snack')) {
    return {
      type: 'plain',
      plain: `Here's what I'd focus on, ${name}:\n\n1. ${ctx.today.skippedMeals.length > 0 ? `Log your remaining meals today (${ctx.today.skippedMeals.map(m => m.replace(/([A-Z])/g, ' $1')).join(', ')})` : 'Keep up the full meal logging'}\n2. ${ctx.today.waterMl < ctx.today.waterTargetMl * 0.7 ? 'Drink more water (at ' + Math.round(ctx.today.waterMl / ctx.today.waterTargetMl * 100) + '% of target)' : 'Hydration is good — keep it up'}\n3. Hit your ${ctx.mostSkipped.replace(/([A-Z])/g, ' $1').toLowerCase()} — it's your most skipped meal\n\nYou're on a ${ctx.streak}-day streak 🔥 — momentum is on your side!`,
    };
  }

  // Calories
  if (q.includes('calorie') || q.includes('kcal') || q.includes('eating')) {
    const remaining = ctx.today.targetKcal - ctx.today.loggedKcal;
    return {
      type: 'plain',
      plain: `Today: ${ctx.today.loggedKcal} kcal logged out of ${ctx.today.targetKcal} target. ${remaining > 0 ? `${remaining} kcal remaining.` : 'Target hit!'} Logged: ${ctx.today.loggedMeals.map(m => m.replace(/([A-Z])/g, ' $1')).join(', ')}. ${ctx.today.skippedMeals.length > 0 ? `Still to log: ${ctx.today.skippedMeals.map(m => m.replace(/([A-Z])/g, ' $1')).join(', ')}.` : 'All meals done!'}`,
    };
  }

  // Default
  return {
    type: 'plain',
    plain: `Great question, ${name}! Based on your data: ${ctx.today.loggedKcal} kcal logged today, on a ${ctx.streak}-day streak, and you've lost ${ctx.weight.start - ctx.weight.current} kg since starting. I can help with meals, calories, water, habits, weight trends, or weekly summaries — just ask!`,
  };
}

// ── Suggested chips ───────────────────────────────────────────────────
const SUGGESTED = [
  'Why am I not losing weight?',
  'How was my week?',
  'Which meal do I skip most?',
  'Am I drinking enough water?',
  'What should I focus on?',
  'How many calories today?',
];

// ── Highlighted text ──────────────────────────────────────────────────
function HighlightedText({
  text, highlights, style, highlightStyle,
}: { text: string; highlights?: string[]; style?: any; highlightStyle?: any }) {
  if (!highlights || highlights.length === 0) {
    return <Text style={style}>{text}</Text>;
  }
  // Split text by highlight tokens
  const pattern = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return (
    <Text style={style}>
      {parts.map((part, i) => {
        const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
        return isHighlight
          ? <Text key={i} style={highlightStyle}>{part}</Text>
          : <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────
function SkeletonLoader() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.7] });

  return (
    <View style={sk.row}>
      <View style={sk.icon} />
      <View style={sk.card}>
        {/* Skeleton title */}
        <Animated.View style={[sk.line, { width: '55%', height: 14, marginBottom: 10, opacity }]} />
        {/* Skeleton subtitle */}
        <Animated.View style={[sk.line, { width: '85%', height: 10, marginBottom: 16, opacity }]} />
        {/* Skeleton bars */}
        {[90, 75, 60, 50].map((w, i) => (
          <View key={i} style={sk.barRow}>
            <Animated.View style={[sk.line, { width: `${w * 0.4}%`, height: 9, opacity }]} />
            <Animated.View style={[sk.line, { width: `${w}%`, height: 8, borderRadius: 4, opacity }]} />
          </View>
        ))}
        {/* Skeleton body */}
        <Animated.View style={[sk.line, { width: '100%', height: 10, marginTop: 16, opacity }]} />
        <Animated.View style={[sk.line, { width: '80%', height: 10, marginTop: 6, opacity }]} />
        {/* Skeleton fix box */}
        <Animated.View style={[sk.fixBox, { opacity }]}>
          <Animated.View style={[sk.line, { width: '40%', height: 9, marginBottom: 8, opacity }]} />
          <Animated.View style={[sk.line, { width: '90%', height: 9, opacity }]} />
        </Animated.View>
      </View>
    </View>
  );
}

const sk = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 12, paddingHorizontal: 16 },
  icon: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#D0E8D9', flexShrink: 0, marginTop: 4 },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  line: { backgroundColor: '#EEEEEC', borderRadius: 6 },
  barRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 8 },
  fixBox: { backgroundColor: '#F4F4F2', borderRadius: 14, padding: 14, marginTop: 14 },
});

// ── Rich AI card ──────────────────────────────────────────────────────
function MealConsistencyCard({ resp, onFollowUp }: { resp: StructuredResponse; onFollowUp: (q: string) => void }) {
  return (
    <View style={rc.card}>
      <Text style={rc.title}>{resp.title}</Text>
      <Text style={rc.subtitle}>{resp.subtitle}</Text>

      {/* Progress bars */}
      <View style={rc.barsSection}>
        {resp.bars?.map(bar => (
          <View key={bar.label} style={rc.barRow}>
            <View style={rc.barLabelRow}>
              <Text style={rc.barLabel}>{bar.label}</Text>
              {bar.weakest && (
                <View style={rc.weakestTag}>
                  <Text style={rc.weakestText}>+ YOUR WEAKEST</Text>
                </View>
              )}
            </View>
            <View style={rc.barTrackRow}>
              <View style={rc.barTrack}>
                <View style={[rc.barFill, { width: `${bar.pct}%`, backgroundColor: bar.weakest ? '#BA7517' : '#1D6F42' }]} />
              </View>
              <Text style={[rc.barPct, { color: bar.weakest ? '#BA7517' : '#1A1C1B' }]}>{bar.pct}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Analysis */}
      {resp.body && (
        <HighlightedText
          text={resp.body}
          highlights={resp.highlights}
          style={rc.body}
          highlightStyle={rc.highlight}
        />
      )}

      {/* The Fix */}
      {resp.fix && (
        <View style={rc.fixBox}>
          <View style={rc.fixHeader}>
            <View style={rc.fixDot} />
            <Text style={rc.fixLabel}>THE FIX</Text>
          </View>
          <HighlightedText
            text={resp.fix}
            highlights={resp.fixHighlights}
            style={rc.fixText}
            highlightStyle={rc.fixBold}
          />
        </View>
      )}

      {/* Follow-up chip */}
      {resp.followUp && (
        <TouchableOpacity style={rc.followUpChip} onPress={() => onFollowUp(resp.followUp!)} activeOpacity={0.75}>
          <Text style={rc.followUpText}>{resp.followUp}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const rc = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2, maxWidth: '88%' },
  title: { fontFamily: 'Fraunces-Bold', fontSize: 20, color: '#1A1C1B', marginBottom: 4 },
  subtitle: { fontFamily: 'DM-Sans', fontSize: 12, color: 'rgba(26,28,27,0.5)', marginBottom: 18, fontStyle: 'italic' },
  barsSection: { gap: 12, marginBottom: 18 },
  barRow: { gap: 4 },
  barLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  barLabel: { fontFamily: 'DM-Sans-SemiBold', fontSize: 12, color: '#1A1C1B', flex: 1 },
  weakestTag: { backgroundColor: 'rgba(253,173,78,0.2)', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  weakestText: { fontFamily: 'DM-Sans-Bold', fontSize: 9, color: '#885200', letterSpacing: 0.5 },
  barTrackRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barTrack: { flex: 1, height: 8, backgroundColor: '#EEEEEC', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  barPct: { fontFamily: 'DM-Sans-SemiBold', fontSize: 12, width: 34, textAlign: 'right' },
  body: { fontFamily: 'DM-Sans', fontSize: 13, color: '#3F4941', lineHeight: 21, marginBottom: 16 },
  highlight: { backgroundColor: 'rgba(253,173,78,0.25)', borderRadius: 3, fontFamily: 'DM-Sans-SemiBold', color: '#664000' },
  fixBox: { backgroundColor: '#F4F4F2', borderRadius: 14, padding: 14, marginBottom: 16 },
  fixHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  fixDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#1D6F42' },
  fixLabel: { fontFamily: 'DM-Sans-Bold', fontSize: 10, color: '#1D6F42', letterSpacing: 1.2 },
  fixText: { fontFamily: 'DM-Sans', fontSize: 13, color: '#3F4941', lineHeight: 20 },
  fixBold: { fontFamily: 'DM-Sans-Bold', color: '#1A1C1B' },
  followUpChip: { alignSelf: 'flex-start', borderWidth: 1.5, borderColor: 'rgba(29,111,66,0.3)', backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 50 },
  followUpText: { fontFamily: 'DM-Sans-SemiBold', fontSize: 12, color: '#1D6F42' },
});

// ── Main Component ─────────────────────────────────────────────────────
export default function AskNiyamAI() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = mockHomeState;
  const today = useDailyLogStore(s => s.today);
  const streak = useDailyLogStore(s => s.streak);
  const targetKcal = usePlanStore(s => s.plan.calorieTargets.total);
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pulse animation for welcome orb
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulse1, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(pulse2, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulse2, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop1.start();
    loop2.start();
    return () => { loop1.stop(); loop2.stop(); };
  }, []);

  const ctx = buildCtx(today, targetKcal, streak);
  const showWelcome = messages.length === 0;

  const sendMessage = (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      structured: { type: 'plain', plain: text.trim() },
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const delay = 1400 + Math.random() * 500;
    setTimeout(() => {
      setIsLoading(false);
      const resp = generateResponse(text, ctx);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        structured: resp,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, delay);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';

    if (isUser) {
      return (
        <View style={[styles.messageRow, styles.messageRowUser]}>
          <View style={styles.userBubble}>
            <Text style={styles.userText}>{item.structured?.plain}</Text>
          </View>
        </View>
      );
    }

    const resp = item.structured!;
    return (
      <View style={styles.messageRow}>
        <View style={styles.aiBubbleIcon}>
          <Ionicons name="sparkles" size={14} color="#fff" />
        </View>
        {resp.type === 'meal_consistency'
          ? <MealConsistencyCard resp={resp} onFollowUp={sendMessage} />
          : (
            <View style={styles.aiBubble}>
              <Text style={styles.aiText}>{resp.plain}</Text>
            </View>
          )
        }
      </View>
    );
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1D6F42" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image
            source={require('../assets/Logos/secondary-logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>AI</Text>
          </View>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 64 : 0}
      >
        {/* Welcome state */}
        {showWelcome ? (
          <View style={styles.welcomeContainer}>
            <View style={styles.orbArea}>
              {[pulse1, pulse2].map((anim, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.pulseRing,
                    {
                      transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.8] }) }],
                      opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 0.45, 0] }),
                    },
                  ]}
                />
              ))}
              <View style={styles.orbOuter}>
                <View style={styles.orbMid}>
                  <View style={styles.orbInner}>
                    <Ionicons name="sparkles" size={24} color="#fff" />
                  </View>
                </View>
              </View>
              <View style={styles.orbBadge}>
                <Ionicons name="time" size={12} color="#fff" />
              </View>
            </View>

            <Text style={styles.welcomeTitle}>Ask me anything about{'\n'}your progress</Text>
            <Text style={styles.welcomeSub}>
              I have access to your meal logs, calories, water intake, habits, and weight history.
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipsScroll}
              contentContainerStyle={styles.chipsContent}
            >
              {SUGGESTED.map(q => (
                <TouchableOpacity key={q} style={styles.chip} activeOpacity={0.75} onPress={() => sendMessage(q)}>
                  <Text style={styles.chipText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              renderItem={renderMessage}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              ListFooterComponent={isLoading ? <SkeletonLoader /> : null}
            />
            {/* Follow-up chips after ≤2 messages */}
            {messages.length <= 2 && !isLoading && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.chipsScrollBottom}
                contentContainerStyle={styles.chipsContent}
              >
                {SUGGESTED.slice(2).map(q => (
                  <TouchableOpacity key={q} style={styles.chip} activeOpacity={0.75} onPress={() => sendMessage(q)}>
                    <Text style={styles.chipText}>{q}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        )}

        {/* Input bar */}
        <View style={[styles.inputBar, { paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }]}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about your progress..."
            placeholderTextColor="rgba(26,28,27,0.35)"
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(inputText)}
            multiline={false}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!inputText.trim() || isLoading) && styles.sendBtnDisabled]}
            onPress={() => sendMessage(inputText)}
            activeOpacity={0.85}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons name="arrow-up" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F9F7' },

  // Header
  header: { height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(191,201,190,0.2)', backgroundColor: '#F9F9F7' },
  backBtn: { padding: 4, marginLeft: -4 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerLogo: { height: 30, width: 95 },
  aiBadge: { backgroundColor: '#1D6F42', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  aiBadgeText: { fontFamily: 'DM-Sans-Bold', fontSize: 14, color: '#fff', letterSpacing: 0.8 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(29,111,66,0.1)', borderWidth: 1.5, borderColor: 'rgba(29,111,66,0.3)', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: 'DM-Sans-SemiBold', fontSize: 14, color: '#1D6F42' },

  // Welcome
  welcomeContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingBottom: 40 },
  orbArea: { width: 96, height: 96, alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  pulseRing: { position: 'absolute', width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: 'rgba(29,111,66,0.45)', backgroundColor: 'transparent' },
  orbOuter: { width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(29,111,66,0.08)', justifyContent: 'center', alignItems: 'center' },
  orbMid: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(29,111,66,0.14)', justifyContent: 'center', alignItems: 'center' },
  orbInner: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1D6F42', justifyContent: 'center', alignItems: 'center' },
  orbBadge: { position: 'absolute', bottom: -2, right: -2, width: 30, height: 30, borderRadius: 15, backgroundColor: '#FDAD4E', borderWidth: 3, borderColor: '#F9F9F7', justifyContent: 'center', alignItems: 'center' },
  welcomeTitle: { fontFamily: 'Fraunces-Bold', fontSize: 22, color: '#1A1C1B', textAlign: 'center', lineHeight: 30, marginBottom: 12 },
  welcomeSub: { fontFamily: 'DM-Sans', fontSize: 14, color: 'rgba(26,28,27,0.55)', textAlign: 'center', lineHeight: 22, marginBottom: 36 },
  chipsScroll: { flexGrow: 0, width: '120%', marginHorizontal: -16 },
  chipsContent: { paddingHorizontal: 24, gap: 10 },
  chip: { borderWidth: 1.5, borderColor: 'rgba(29,111,66,0.3)', backgroundColor: '#fff', paddingHorizontal: 18, height: 38, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  chipText: { fontFamily: 'DM-Sans-SemiBold', fontSize: 12, color: '#1D6F42' },

  // Chat messages
  messagesContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 16 },
  messageRowUser: { flexDirection: 'row-reverse' },
  aiBubbleIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#1D6F42', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: 4 },
  aiBubble: { flex: 1, maxWidth: '88%', backgroundColor: '#fff', borderRadius: 20, borderBottomLeftRadius: 6, paddingHorizontal: 16, paddingVertical: 13, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  aiText: { fontFamily: 'DM-Sans', fontSize: 14, color: '#1A1C1B', lineHeight: 22 },
  userBubble: { backgroundColor: '#1D6F42', borderRadius: 20, borderBottomRightRadius: 6, paddingHorizontal: 16, paddingVertical: 13, maxWidth: '80%' },
  userText: { fontFamily: 'DM-Sans', fontSize: 14, color: '#fff', lineHeight: 22 },

  // Bottom suggestion chips
  chipsScrollBottom: { flexGrow: 0, paddingBottom: 8 },

  // Input
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(191,201,190,0.2)', backgroundColor: '#F9F9F7' },
  input: { flex: 1, height: 48, backgroundColor: '#EEEEEC', borderRadius: 50, paddingHorizontal: 20, fontFamily: 'DM-Sans', fontSize: 14, color: '#1A1C1B' },
  sendBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#1D6F42', justifyContent: 'center', alignItems: 'center', shadowColor: '#1D6F42', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  sendBtnDisabled: { backgroundColor: 'rgba(29,111,66,0.3)', shadowOpacity: 0, elevation: 0 },
});
