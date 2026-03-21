import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { format, subWeeks, startOfWeek, endOfWeek, subMonths } from 'date-fns';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  viewMode: 'day' | 'week' | 'month';
  onSelectDate: (dateStr: string) => void;
  currentDate?: string;
};

export default function DateSelectBottomSheet({ isOpen, onClose, viewMode, onSelectDate, currentDate }: Props) {

  const renderDayPicker = () => {
    return (
      <View style={styles.pickerContainer}>
        <Calendar
          current={currentDate || new Date().toISOString().split('T')[0]}
          onDayPress={(day: any) => {
            onSelectDate(day.dateString);
            onClose();
          }}
          theme={{
            selectedDayBackgroundColor: '#1D6F42',
            todayTextColor: '#1D6F42',
            arrowColor: '#1D6F42',
            textDayFontFamily: 'DM-Sans',
            textMonthFontFamily: 'DM-Sans-Bold',
            textDayHeaderFontFamily: 'DM-Sans-Medium',
          }}
        />
      </View>
    );
  };

  const renderWeekPicker = () => {
    const weeks = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
        const d = subWeeks(today, i);
        const start = startOfWeek(d, { weekStartsOn: 1 });
        const end = endOfWeek(d, { weekStartsOn: 1 });
        const label = `${format(start, 'MMM d')} – ${format(end, 'MMM d')}`;
        weeks.push({ label, value: format(start, 'yyyy-MM-dd') });
    }

    return (
      <View style={styles.listContainer}>
        {weeks.map((w, idx) => (
           <TouchableOpacity 
             key={idx} 
             style={styles.listItem}
             onPress={() => {
                onSelectDate(w.value);
                onClose();
             }}
           >
             <Text style={styles.listItemText}>{w.label}</Text>
             {idx === 0 && <Ionicons name="checkmark" size={20} color="#1D6F42" />}
           </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderMonthPicker = () => {
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
        const d = subMonths(today, i);
        const label = format(d, 'MMMM yyyy');
        months.push({ label, value: format(d, 'yyyy-MM-dd') });
    }

    return (
      <ScrollView contentContainerStyle={styles.listContainer}>
        {months.map((m, idx) => (
           <TouchableOpacity 
             key={idx} 
             style={styles.listItem}
             onPress={() => {
                onSelectDate(m.value);
                onClose();
             }}
           >
             <Text style={styles.listItemText}>{m.label}</Text>
             {idx === 0 && <Ionicons name="checkmark" size={20} color="#1D6F42" />}
           </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={styles.sheetBackground}>
            <View style={{ alignItems: 'center', paddingVertical: 12 }}>
              <View style={styles.handleIndicator} />
            </View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Select {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#1A1C1B" />
              </TouchableOpacity>
            </View>
            
            {viewMode === 'day' && renderDayPicker()}
            {viewMode === 'week' && <ScrollView>{renderWeekPicker()}</ScrollView>}
            {viewMode === 'month' && renderMonthPicker()}
            
            <View style={{ height: 40 }} />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheetBackground: { backgroundColor: '#F9F9F7', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  handleIndicator: { backgroundColor: '#DADBDA', width: 40, height: 4, borderRadius: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 16, paddingTop: 4 },
  headerTitle: { fontFamily: 'Fraunces-Bold', fontSize: 20, color: '#1A1C1B' },
  closeBtn: { padding: 4, marginRight: -8 },
  pickerContainer: { paddingHorizontal: 16 },
  listContainer: { paddingHorizontal: 24, paddingBottom: 24 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(191,201,190,0.2)' },
  listItemText: { fontFamily: 'DM-Sans-Medium', fontSize: 16, color: '#1A1C1B' }
});
