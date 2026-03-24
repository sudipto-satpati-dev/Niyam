import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as Haptics from 'expo-haptics';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

interface WeightLogSheetProps {
  lastWeight: number;
  isVisible: boolean;
  onSave: (weight: number) => void;
  onClose: () => void;
}

export const WeightLogSheet: React.FC<WeightLogSheetProps> = ({
  lastWeight,
  isVisible,
  onSave,
  onClose,
}) => {
  const [weightStr, setWeightStr] = useState(lastWeight.toFixed(1));
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // snap points - expanded to show numpad
  const snapPoints = useMemo(() => ['85%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
      />
    ),
    []
  );

  useEffect(() => {
    if (isVisible) {
      setWeightStr(lastWeight.toFixed(1));
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible, lastWeight]);

  const handleSave = () => {
    const numericWeight = parseFloat(weightStr);
    if (!isNaN(numericWeight) && numericWeight > 30 && numericWeight < 250) {
      onSave(numericWeight);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleKeyPress = (val: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (val === 'back') {
      setWeightStr(prev => prev.length > 0 ? prev.slice(0, -1) : '');
      return;
    }

    if (val === '.') {
      if (weightStr.includes('.')) return;
      setWeightStr(prev => prev + '.');
      return;
    }

    // Maximum 5 digits including decimal
    if (weightStr.replace('.', '').length >= 4) return;

    setWeightStr(prev => {
      if (prev === '0') return val;
      return prev + val;
    });
  };

  const adjustWeight = (amount: number) => {
    const current = parseFloat(weightStr) || lastWeight;
    setWeightStr((current + amount).toFixed(1));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const todayStr = format(new Date(), 'MMM dd');

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Log your weight</Text>
          <Text style={styles.subtitle}>
            Weigh yourself in the morning before breakfast for the most accurate daily ritual.
          </Text>
          <View style={styles.datePill}>
            <MaterialIcons name="event" size={14} color="#1D6F42" />
            <Text style={styles.dateText}>Today, {todayStr}</Text>
          </View>
        </View>

        {/* Weight Selector */}
        <View style={styles.weightSelector}>
          <Pressable 
            style={styles.adjustButton} 
            onPress={() => adjustWeight(-0.1)}
          >
            <MaterialIcons name="remove" size={24} color="#1D6F42" />
          </Pressable>
          
          <View style={styles.weightDisplayContainer}>
            <View style={styles.weightDisplay}>
              <Text style={styles.weightValue}>{weightStr}</Text>
              <Text style={styles.unitText}>kg</Text>
            </View>
            <View style={styles.underline} />
          </View>

          <Pressable 
            style={styles.adjustButton} 
            onPress={() => adjustWeight(0.1)}
          >
            <MaterialIcons name="add" size={24} color="#1D6F42" />
          </Pressable>
        </View>

        {/* Num Pad */}
        <View style={styles.numPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'back'].map((key) => (
            <Pressable
              key={key.toString()}
              style={({ pressed }) => [
                styles.keyButton,
                pressed && styles.keyButtonPressed,
                (key === 'back' || key === '.') && styles.specialKey
              ]}
              onPress={() => handleKeyPress(key.toString())}
            >
              {key === 'back' ? (
                <Ionicons name="backspace-outline" size={24} color="#3F4941" />
              ) : (
                <Text style={[styles.keyText, (key === '.' || key === 'back') && styles.specialKeyText]}>
                  {key}
                </Text>
              )}
            </Pressable>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable 
            style={[styles.saveButton, (parseFloat(weightStr) <= 30 || parseFloat(weightStr) >= 250) && styles.disabledButton]} 
            onPress={handleSave}
            disabled={parseFloat(weightStr) <= 30 || parseFloat(weightStr) >= 250}
          >
            <Text style={styles.saveButtonText}>Save Entry</Text>
          </Pressable>
          
          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  handleIndicator: {
    backgroundColor: '#E2E3E1',
    width: 48,
    height: 6,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 28,
    color: '#1A1C1B',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#3F4941',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginTop: 4,
  },
  dateText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 12,
    color: '#1D6F42',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  weightSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  adjustButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EEEEEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightDisplayContainer: {
    alignItems: 'center',
  },
  weightDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  weightValue: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 64,
    color: '#1D6F42',
    letterSpacing: -2,
  },
  unitText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 20,
    color: '#3F4941',
    marginBottom: 12,
  },
  underline: {
    height: 4,
    width: 48,
    backgroundColor: 'rgba(186, 117, 23, 0.2)', // secondary opacity
    borderRadius: 2,
    marginTop: -4,
  },
  numPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  keyButton: {
    width: '30%',
    height: 60,
    backgroundColor: '#F4F4F2',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyButtonPressed: {
    backgroundColor: '#EEEEEC',
  },
  specialKey: {
    backgroundColor: 'transparent',
  },
  keyText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 24,
    color: '#1A1C1B',
  },
  specialKeyText: {
    fontSize: 28,
    color: '#3F4941',
  },
  actions: {
    gap: 12,
    marginTop: 'auto',
  },
  saveButton: {
    width: '100%',
    height: 64,
    backgroundColor: '#1D6F42',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1D6F42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#DADAD8',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 15,
    color: '#3F4941',
  },
});
