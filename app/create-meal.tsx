import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockHomeState } from '../Data/mockHomeState';

const QUICK_INGREDIENTS = ['Eggs', 'Roti', 'Dal', 'Rice', 'Spinach', 'Paneer'];
const PREP_TIMES = ['5 min', '10 min', '20 min', '30+ min'];
const CALORIE_TARGETS = ['Light', 'Medium', 'High'];
const COOKING_METHODS = [
  { label: 'Baked', icon: 'flame-outline' },
  { label: 'Sautéed', icon: 'restaurant-outline' },
  { label: 'Steamed', icon: 'water-outline' },
];

export default function CreateMealScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = mockHomeState;

  const [ingredients, setIngredients] = useState('');
  const [selectedPrepTime, setSelectedPrepTime] = useState('10 min');
  const [selectedCalorie, setSelectedCalorie] = useState('Medium');
  const [restrictions, setRestrictions] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('Sautéed');

  const addQuickIngredient = (item: string) => {
    setIngredients(prev => prev ? `${prev}, ${item}` : item);
  };

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
        <View style={styles.appBarRight}>
          <View style={styles.mealTypePill}>
            <Text style={styles.mealTypePillText}>LUNCH</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 72 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* AI Onboarding Banner */}
        <View style={styles.aiBanner}>
          <View style={styles.aiBannerIcon}>
            <Ionicons name="sparkles" size={24} color="#ffffff" />
          </View>
          <View style={styles.aiBannerText}>
            <Text style={styles.aiBannerTitle}>AI Nutritionist</Text>
            <Text style={styles.aiBannerBody}>
              Describe what's in your pantry, and I'll craft a balanced Vaidya-approved meal plan for you.
            </Text>
          </View>
        </View>

        {/* Main Form Card */}
        <View style={styles.formCard}>

          {/* Ingredients */}
          <View style={styles.formSection}>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionLabel}>INGREDIENTS</Text>
              <TouchableOpacity onPress={() => setIngredients('')}>
                <Text style={styles.clearAll}>Clear all</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.ingredientsInput}
              placeholder="What's in your kitchen today?"
              placeholderTextColor="rgba(26, 28, 27, 0.3)"
              multiline
              value={ingredients}
              onChangeText={setIngredients}
              textAlignVertical="top"
            />
            <View style={styles.chipsRow}>
              {QUICK_INGREDIENTS.map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.chip}
                  onPress={() => addQuickIngredient(item)}
                >
                  <Ionicons name="add" size={14} color="#3f4941" />
                  <Text style={styles.chipText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Preparation Time */}
          <View style={styles.formSection}>
            <Text style={styles.sectionLabel}>PREPARATION TIME</Text>
            <View style={styles.prepTimeRow}>
              {PREP_TIMES.map(time => (
                <TouchableOpacity
                  key={time}
                  style={[styles.prepTimeBtn, selectedPrepTime === time && styles.prepTimeBtnActive]}
                  onPress={() => setSelectedPrepTime(time)}
                >
                  <Text style={[styles.prepTimeBtnText, selectedPrepTime === time && styles.prepTimeBtnTextActive]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Calorie Target */}
          <View style={styles.formSection}>
            <Text style={styles.sectionLabel}>CALORIE TARGET</Text>
            <View style={styles.calorieToggle}>
              {CALORIE_TARGETS.map(target => (
                <TouchableOpacity
                  key={target}
                  style={[styles.calorieBtn, selectedCalorie === target && styles.calorieBtnActive]}
                  onPress={() => setSelectedCalorie(target)}
                >
                  <Text style={[styles.calorieBtnText, selectedCalorie === target && styles.calorieBtnTextActive]}>
                    {target}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Restrictions */}
          <View style={styles.formSection}>
            <Text style={styles.sectionLabel}>RESTRICTIONS & PREFERENCES</Text>
            <View style={styles.restrictionRow}>
              <Ionicons name="ban-outline" size={20} color="rgba(26, 28, 27, 0.3)" style={{ marginRight: 12 }} />
              <TextInput
                style={styles.restrictionInput}
                placeholder="e.g. No nuts, Vegan, Gluten-free"
                placeholderTextColor="rgba(26, 28, 27, 0.3)"
                value={restrictions}
                onChangeText={setRestrictions}
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Cooking Method */}
          <View style={styles.formSection}>
            <Text style={styles.sectionLabel}>PREFERRED METHOD</Text>
            <View style={styles.methodRow}>
              {COOKING_METHODS.map(method => (
                <TouchableOpacity
                  key={method.label}
                  style={[styles.methodChip, selectedMethod === method.label && styles.methodChipActive]}
                  onPress={() => setSelectedMethod(method.label)}
                >
                  <Ionicons
                    name={method.icon as any}
                    size={18}
                    color={selectedMethod === method.label ? '#1d6f42' : 'rgba(26, 28, 27, 0.5)'}
                  />
                  <Text style={[styles.methodChipText, selectedMethod === method.label && styles.methodChipTextActive]}>
                    {method.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>

        {/* Submit */}
        <View style={styles.submitSection}>
          <TouchableOpacity style={styles.submitBtn} activeOpacity={0.88}>
            <Ionicons name="sparkles" size={22} color="#ffffff" />
            <Text style={styles.submitBtnText}>Create my meal option</Text>
          </TouchableOpacity>
          <Text style={styles.submitFooter}>
            POWERED BY NIYAM VEDA AI • SEASONAL RECOMMENDATIONS
          </Text>
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
    color: '#1a1c1b',
  },
  appBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mealTypePill: {
    backgroundColor: '#a4f4bb',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
  },
  mealTypePillText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 11,
    color: '#00522c',
    letterSpacing: 1,
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
    color: '#1d6f42',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 48,
    gap: 16,
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: 'rgba(164, 244, 187, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(164, 244, 187, 0.4)',
    borderRadius: 20,
    padding: 20,
  },
  aiBannerIcon: {
    backgroundColor: '#1d6f42',
    padding: 10,
    borderRadius: 14,
  },
  aiBannerText: {
    flex: 1,
    gap: 4,
  },
  aiBannerTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 16,
    color: '#00522c',
  },
  aiBannerBody: {
    fontFamily: 'DM-Sans',
    fontSize: 13,
    color: '#3f4941',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    gap: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  formSection: {
    paddingVertical: 20,
    gap: 14,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    letterSpacing: 1.5,
    color: 'rgba(26, 28, 27, 0.6)',
    textTransform: 'uppercase',
  },
  clearAll: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    color: '#00552e',
  },
  ingredientsInput: {
    backgroundColor: '#f4f4f2',
    borderRadius: 14,
    padding: 16,
    minHeight: 110,
    fontFamily: 'DM-Sans',
    fontSize: 15,
    color: '#1a1c1b',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#eeeeec',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },
  chipText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 13,
    color: '#3f4941',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0ee',
  },
  prepTimeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  prepTimeBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#eeeeec',
    alignItems: 'center',
  },
  prepTimeBtnActive: {
    backgroundColor: '#1d6f42',
    shadowColor: '#1d6f42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  prepTimeBtnText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 12,
    color: 'rgba(26, 28, 27, 0.6)',
  },
  prepTimeBtnTextActive: {
    color: '#ffffff',
  },
  calorieToggle: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f2',
    borderRadius: 16,
    padding: 4,
  },
  calorieBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  calorieBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calorieBtnText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 13,
    color: 'rgba(26, 28, 27, 0.4)',
  },
  calorieBtnTextActive: {
    color: '#885200',
  },
  restrictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f2',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  restrictionInput: {
    flex: 1,
    paddingVertical: 16,
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#1a1c1b',
  },
  methodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  methodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f4f4f2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  methodChipActive: {
    backgroundColor: 'rgba(164, 244, 187, 0.2)',
    borderColor: 'rgba(29, 111, 66, 0.25)',
  },
  methodChipText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 13,
    color: 'rgba(26, 28, 27, 0.6)',
  },
  methodChipTextActive: {
    color: '#1d6f42',
  },
  submitSection: {
    gap: 16,
    paddingTop: 8,
    alignItems: 'center',
  },
  submitBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#00552e',
    paddingVertical: 18,
    borderRadius: 20,
    shadowColor: '#00552e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  submitBtnText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 17,
    color: '#ffffff',
  },
  submitFooter: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9,
    letterSpacing: 1.5,
    color: 'rgba(26, 28, 27, 0.35)',
    textAlign: 'center',
  },
});
