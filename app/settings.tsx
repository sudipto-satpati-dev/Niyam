import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockHomeState } from '../Data/mockHomeState';

const { user } = mockHomeState;

interface SettingItemProps {
  label: string;
  value?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  subtext?: string;
  onPress?: () => void;
  showChevron?: boolean;
  isLast?: boolean;
}

const SettingItem = ({ label, value, icon, subtext, onPress, showChevron = false, isLast = false }: SettingItemProps) => (
  <>
    <TouchableOpacity 
      style={styles.item} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.itemLabel}>{label}</Text>
        {subtext && <Text style={styles.itemSubtext}>{subtext}</Text>}
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        {icon && <Ionicons name={icon} size={20} color="rgba(63,73,65,0.4)" style={styles.itemIcon} />}
        {showChevron && <Ionicons name="chevron-forward" size={20} color="rgba(63,73,65,0.4)" style={styles.itemIcon} />}
      </View>
    </TouchableOpacity>
    {!isLast && <View style={styles.divider} />}
  </>
);

interface ToggleItemProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
}

const ToggleItem = ({ label, value, onValueChange, isLast = false }: ToggleItemProps) => (
  <>
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Switch 
        value={value} 
        onValueChange={onValueChange}
        trackColor={{ false: '#E8E8E6', true: '#1D6F42' }}
        thumbColor={Platform.OS === 'ios' ? undefined : '#FFF'}
      />
    </View>
    {!isLast && <View style={styles.divider} />}
  </>
);

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [mealReminders, setMealReminders] = useState(true);
  const [habitReminders, setHabitReminders] = useState(true);
  const [weeklyReminders, setWeeklyReminders] = useState(false);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1C1B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
      >
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PROFILE</Text>
          <View style={styles.card}>
            <SettingItem label="Name" value={user.name} />
            <SettingItem label="Age" value="29" />
            <SettingItem label="Height" value="178 cm" />
            <SettingItem label="Current weight" value="74 kg" isLast />
          </View>
        </View>

        {/* Plan Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PLAN</Text>
          <View style={styles.card}>
            <SettingItem label="View my plan" showChevron onPress={() => {}} />
            <SettingItem 
              label="Regenerate plan" 
              subtext="Updated based on latest metrics" 
              icon="refresh" 
              onPress={() => {}}
            />
            <SettingItem label="Switch to default plan" icon="reload-outline" onPress={() => {}} isLast />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>NOTIFICATIONS</Text>
          <View style={styles.card}>
            <ToggleItem 
              label="Meal reminders" 
              value={mealReminders} 
              onValueChange={setMealReminders} 
            />
            <ToggleItem 
              label="Habit reminders" 
              value={habitReminders} 
              onValueChange={setHabitReminders} 
            />
            <ToggleItem 
              label="Weekly reminders" 
              value={weeklyReminders} 
              onValueChange={setWeeklyReminders} 
              isLast
            />
          </View>
        </View>

        {/* App Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>APP</Text>
          <View style={styles.card}>
            <SettingItem label="Rate Niyam" icon="star" onPress={() => {}} />
            <SettingItem label="Share with friends" icon="share-social" onPress={() => {}} />
            <SettingItem label="Privacy Policy" icon="lock-closed" onPress={() => {}} />
            <SettingItem label="About Niyam" icon="information-circle" onPress={() => {}} isLast />
          </View>
        </View>

        {/* Destructive Section */}
        <View style={styles.destructiveWrap}>
          <TouchableOpacity style={styles.resetBtn} activeOpacity={0.7}>
            <Text style={styles.resetText}>Reset all data</Text>
          </TouchableOpacity>
          <Text style={styles.resetSubtext}>This will delete all your logs and plan.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9F9F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: 'rgba(249, 249, 247, 0.8)',
    borderBottomWidth: 0,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 18,
    color: '#1A1C1B',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 11,
    color: 'rgba(63,73,65,0.6)', /* on-surface-variant/60 */
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, // rounded-xl roughly
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEC', // surface-container
    marginHorizontal: 20,
  },
  itemLeft: {
    flex: 1,
  },
  itemLabel: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 15,
    color: '#1A1C1B',
  },
  itemSubtext: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
    color: '#885200', // secondary
    marginTop: 2,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 15,
    color: '#1A1C1B',
  },
  itemIcon: {
    marginLeft: 8,
  },
  destructiveWrap: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 48,
  },
  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: '#BA1A1A', // error
  },
  resetSubtext: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    color: 'rgba(63,73,65,0.5)', // on-surface-variant/50
    marginTop: 8,
  },
});
