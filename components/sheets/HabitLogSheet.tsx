import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

const habitInfoMap: Record<string, { name: string; description: string; icon: string }> = {
  morningDrink: {
    name: 'Morning Drink',
    description: 'Start the day with ajwain-saunf water with ginger and lime to kickstart digestion.',
    icon: 'water-outline',
  },
  eveningWalk: {
    name: 'Evening Walk',
    description: 'A 5–10 minute slow walk after dinner helps digestion and wind-down.',
    icon: 'walk-outline',
  },
  sleep: {
    name: 'Sleep',
    description: '7–8 hours of sleep is key for fat loss. Target 11 PM.',
    icon: 'moon-outline',
  },
};

interface HabitLogSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  habitKey: string;
  onMarkDone: () => void;
  onSkip: () => void;
  onClose: () => void;
}

export default function HabitLogSheet({ bottomSheetRef, habitKey, onMarkDone, onSkip, onClose }: HabitLogSheetProps) {
  const info = habitInfoMap[habitKey] ?? { name: habitKey, description: '', icon: 'star-outline' };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['45%']}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={styles.sheetBg}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name={info.icon as any} size={32} color="#1D6F42" />
        </View>
        <Text style={styles.sheetTitle}>{info.name}</Text>
        <Text style={styles.description}>{info.description}</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipButtonText}>Skip today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton} onPress={onMarkDone}>
            <Ionicons name="checkmark" size={18} color="white" />
            <Text style={styles.doneButtonText}>Mark done</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#E8F5EE',
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  sheetTitle: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 22,
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  skipButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1D6F42',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
    color: '#1D6F42',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#1D6F42',
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  doneButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: 'white',
  },
});
