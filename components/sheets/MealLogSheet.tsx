import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
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

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['75%']}
      enablePanDownToClose
      onClose={() => {
        setSelectedId(null);
        onClose();
      }}
      backgroundStyle={styles.sheetBg}
      handleIndicatorStyle={styles.indicator}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.sheetTitle}>Log {mealLabel}</Text>
        <Text style={styles.sheetSub}>Choose what you had</Text>

        <ScrollView style={{ marginTop: 24 }} showsVerticalScrollIndicator={false}>
          {options.map((option, index) => {
            const isSelected = selectedId === option.id;
            const avatarText = String.fromCharCode(65 + index); // A, B, C...

            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                onPress={() => setSelectedId(option.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.avatar, isSelected && styles.avatarSelected]}>
                  <Text style={[styles.avatarText, isSelected && styles.avatarTextSelected]}>
                    {avatarText}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.optionName, isSelected && styles.optionNameSelected]}>
                    {option.name}
                  </Text>
                  <Text style={[styles.optionKcal, isSelected && styles.optionKcalSelected]}>
                    {option.kcal} KCAL
                  </Text>
                </View>
                
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={24} color="#1D6F42" />
                )}
              </TouchableOpacity>
            );
          })}

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
    backgroundColor: '#F9F9F7', // Matches app background
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  indicator: {
    backgroundColor: '#E2E3E1',
    width: 48,
    height: 4,
    marginTop: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sheetTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 26,
    color: '#1A1C1B',
    marginBottom: 4,
  },
  sheetSub: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#6F7A70',
    marginBottom: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: 'transparent', // Reserved for selected state
  },
  optionCardSelected: {
    backgroundColor: '#F4F9F6',
    borderLeftColor: '#1D6F42',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarSelected: {
    backgroundColor: '#1D6F42',
  },
  avatarText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1A1C1B',
  },
  avatarTextSelected: {
    color: '#FFFFFF',
  },
  optionName: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 15,
    color: '#1A1C1B',
    marginBottom: 4,
  },
  optionNameSelected: {
    color: '#1A1C1B',
  },
  optionKcal: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 11,
    color: '#8AA393', // Unselected green/gray
    letterSpacing: 0.5,
  },
  optionKcalSelected: {
    color: '#1D6F42', // Vivid green when selected
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 10,
    marginTop: 8,
    marginBottom: 24,
  },
  customText: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#6F7A70',
  },
  saveButton: {
    backgroundColor: '#1D6F42',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#A3CAB3', // Faded green
  },
  saveButtonText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: 'white',
  },
});
