import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockHomeState } from '../Data/mockHomeState';

const MEAL_RESULT = {
  label: 'AI RECOMMENDED',
  name: 'Egg & dal toast',
  kcal: 420,
  time: '8 min',
  nutrition: [
    { label: 'Protein', value: '24g' },
    { label: 'Carbs', value: '38g' },
    { label: 'Fat', value: '12g' },
  ],
  ingredients: [
    '2 slices of Sourdough bread',
    '1/2 cup leftover cooked Moong Dal',
    '2 medium organic Eggs',
    '1/4 tsp Turmeric & Black Pepper',
    'Fresh cilantro for garnish',
  ],
  steps: [
    'Toast the sourdough slices until golden and crisp.',
    'Warm the leftover dal in a small pan, mashing it slightly to create a thick spread.',
    'Poach or fry the eggs to your preference (runny yolk recommended).',
    'Spread dal on toast, top with egg, and sprinkle turmeric and black pepper.',
  ],
};

export default function AiMealResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = mockHomeState;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {/* Top App Bar */}
      <View style={[styles.appBar, { paddingTop: insets.top + 8 }]}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1a1c1b" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Create a meal</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 72 }]}
        showsVerticalScrollIndicator={false}
      >

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>{MEAL_RESULT.label}</Text>
          <Text style={styles.heroTitle}>{MEAL_RESULT.name}</Text>

          <View style={styles.heroMetaRow}>
            <View style={styles.metaBadge}>
              <Ionicons name="flame-outline" size={16} color="#1D6F42" />
              <Text style={styles.metaBadgeText}>{MEAL_RESULT.kcal} kcal</Text>
            </View>
            <View style={styles.metaBadge}>
              <Ionicons name="time-outline" size={16} color="#1D6F42" />
              <Text style={styles.metaBadgeText}>{MEAL_RESULT.time}</Text>
            </View>
          </View>

          {/* Meal Image */}
          <View style={styles.heroImageBox}>
            <Image
              source={require('../assets/Foods/BreakFast/EggDalToast.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
          </View>
        </View>

        {/* Nutrition Mini-Grid */}
        <View style={styles.nutritionGrid}>
          {MEAL_RESULT.nutrition.map(item => (
            <View key={item.label} style={styles.nutritionCell}>
              <Text style={styles.nutritionLabel}>{item.label.toUpperCase()}</Text>
              <Text style={styles.nutritionValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="basket-outline" size={22} color="#1D6F42" />
            <Text style={styles.sectionTitle}>Ingredients</Text>
          </View>
          {MEAL_RESULT.ingredients.map((ing, i) => (
            <View key={i} style={styles.ingredientRow}>
              <View style={styles.ingredientDot} />
              <Text style={styles.ingredientText}>{ing}</Text>
            </View>
          ))}
        </View>

        {/* How to make it */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="restaurant-outline" size={22} color="#1D6F42" />
            <Text style={styles.sectionTitle}>How to make it</Text>
          </View>
          {MEAL_RESULT.steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.88}
            onPress={() => router.push('/(tabs)/meals' as any)}
          >
            <Text style={styles.primaryBtnText}>Add to my Lunch options</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryBtnText}>Try again</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Navigation Mimic */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.navItem}>
          <Ionicons name="leaf-outline" size={24} color="rgba(26, 28, 27, 0.4)" />
          <Text style={styles.navText}>RITUALS</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="restaurant" size={24} color="#1D6F42" />
          <Text style={[styles.navText, { color: '#1D6F42' }]}>MEALS</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="book-outline" size={24} color="rgba(26, 28, 27, 0.4)" />
          <Text style={styles.navText}>ALMANAC</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="rgba(26, 28, 27, 0.4)" />
          <Text style={styles.navText}>PROFILE</Text>
        </View>
      </View>
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
    paddingBottom: 14,
    backgroundColor: 'rgba(249,249,247,0.92)',
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
    fontFamily: 'Fraunces-Bold',
    fontSize: 20,
    color: '#1D6F42',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(29, 111, 66, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(29, 111, 66, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1D6F42',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, // Space for bottom nav
    gap: 24,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#1D6F42',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  heroLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    letterSpacing: 2,
    color: '#885200',
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 32,
    color: '#1a1c1b',
    lineHeight: 38,
    marginBottom: 16,
  },
  heroMetaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f4f4f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  metaBadgeText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 13,
    color: '#1a1c1b',
  },
  heroImageBox: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 28, 27, 0.1)',
  },
  nutritionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  nutritionCell: {
    flex: 1,
    backgroundColor: '#f4f4f2',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  nutritionLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    color: 'rgba(26, 28, 27, 0.6)',
    marginBottom: 6,
  },
  nutritionValue: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 22,
    color: '#1D6F42',
  },
  section: {
    gap: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 20,
    color: '#1a1c1b',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 4,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1D6F42',
  },
  ingredientText: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: 'rgba(26, 28, 27, 0.8)',
    lineHeight: 22,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1D6F42',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  stepNumberText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 12,
    color: '#ffffff',
  },
  stepText: {
    flex: 1,
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: 'rgba(26, 28, 27, 0.8)',
    lineHeight: 22,
  },
  actionsSection: {
    gap: 12,
    paddingTop: 12,
  },
  primaryBtn: {
    backgroundColor: '#00552e',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#00552e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: '#ffffff',
  },
  secondaryBtn: {
    backgroundColor: '#eeeeec',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: 'rgba(26, 28, 27, 0.6)',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 249, 247, 0.95)',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(26, 28, 27, 0.05)',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9,
    letterSpacing: 1,
    color: 'rgba(26, 28, 27, 0.4)',
  },
});
