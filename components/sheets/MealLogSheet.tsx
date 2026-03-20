import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

const mealLabelMap: Record<string, string> = {
  breakfast: 'Breakfast',
  morningSnack: 'Morning Snack',
  lunch: 'Lunch',
  eveningSnack: 'Evening Snack',
  dinner: 'Dinner',
};

// Mock options per meal
const mealOptionsMap: Record<string, { id: string; name: string; kcal: number }[]> = {
  breakfast: [
    { id: 'b1', name: 'Eggs + bread + banana', kcal: 480 },
    { id: 'b2', name: 'Poha + a glass of milk', kcal: 430 },
    { id: 'b3', name: 'Upma + fruit', kcal: 400 },
    { id: 'b4', name: 'Idli + sambar (3 pieces)', kcal: 360 },
    { id: 'b5', name: 'Paratha + curd (1 piece)', kcal: 490 },
  ],
  morningSnack: [
    { id: 's1', name: 'Roasted chana (30g)', kcal: 130 },
    { id: 's2', name: 'Banana (1 medium)', kcal: 90 },
    { id: 's3', name: 'Mixed nuts (20g)', kcal: 120 },
  ],
  lunch: [
    { id: 'l1', name: 'Dal + 2 roti + salad', kcal: 580 },
    { id: 'l2', name: 'Chicken + roti + sabji', kcal: 600 },
    { id: 'l3', name: 'Rice + dal + vegetable', kcal: 550 },
  ],
  eveningSnack: [
    { id: 'es1', name: 'Roasted chana (30g)', kcal: 130 },
    { id: 'es2', name: 'Mixed nuts + black coffee', kcal: 150 },
    { id: 'es3', name: 'Fruit bowl', kcal: 100 },
  ],
  dinner: [
    { id: 'd1', name: '2 roti + sabji + dal', kcal: 480 },
    { id: 'd2', name: 'Khichdi + curd', kcal: 450 },
    { id: 'd3', name: 'Soup + salad + egg', kcal: 380 },
  ],
};

interface MealLogSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  mealKey: string;
  onSave: (optionId: string, kcal: number) => void;
  onClose: () => void;
}

export default function MealLogSheet({ bottomSheetRef, mealKey, onSave, onClose }: MealLogSheetProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mealLabel = mealLabelMap[mealKey] ?? mealKey;
  const options = mealOptionsMap[mealKey] ?? [];
  const selectedOption = options.find(o => o.id === selectedId);

  const handleSave = useCallback(() => {
    if (selectedOption) {
      onSave(selectedOption.id, selectedOption.kcal);
      setSelectedId(null);
    }
  }, [selectedOption, onSave]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['70%']}
      enablePanDownToClose
      onClose={() => {
        setSelectedId(null);
        onClose();
      }}
      backgroundStyle={styles.sheetBg}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.sheetTitle}>Log {mealLabel}</Text>
        <Text style={styles.sheetSub}>Choose what you had</Text>

        <ScrollView style={{ marginTop: 12 }} showsVerticalScrollIndicator={false}>
          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedId === option.id && styles.optionCardSelected,
              ]}
              onPress={() => setSelectedId(option.id)}
              activeOpacity={0.8}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.optionName}>{option.name}</Text>
                <Text style={styles.optionKcal}>{option.kcal} kcal</Text>
              </View>
              {selectedId === option.id && (
                <Ionicons name="checkmark-circle" size={22} color="#1D6F42" />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.customRow}>
            <Ionicons name="pencil-outline" size={16} color="#6B6B6B" />
            <Text style={styles.customText}>Ate something else? Enter manually</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={[styles.saveButton, !selectedOption && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!selectedOption}
        >
          <Text style={styles.saveButtonText}>
            {selectedOption ? `Save — ${selectedOption.kcal} kcal` : 'Select an option'}
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBg: {
    backgroundColor: '#FAFAF8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  indicator: {
    backgroundColor: '#D0D0C8',
    width: 40,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  sheetTitle: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 22,
    color: '#1A1A1A',
    marginBottom: 4,
    marginTop: 8,
  },
  sheetSub: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#F0F0EC',
  },
  optionCardSelected: {
    borderColor: '#1D6F42',
    backgroundColor: '#F1FAF5',
  },
  optionName: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  optionKcal: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: '#888',
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 10,
    marginBottom: 16,
  },
  customText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#6B6B6B',
  },
  saveButton: {
    backgroundColor: '#1D6F42',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#B8D4C5',
  },
  saveButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: 'white',
  },
});
