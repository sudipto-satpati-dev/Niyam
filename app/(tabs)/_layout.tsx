import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: { name: string; label: string; icon: IoniconName; iconActive: IoniconName }[] = [
  { name: 'index',   label: 'Home',    icon: 'home-outline',          iconActive: 'home' },
  { name: 'meals',   label: 'Meals',   icon: 'restaurant-outline',    iconActive: 'restaurant' },
  { name: 'tracker', label: 'Tracker', icon: 'bar-chart-outline',     iconActive: 'bar-chart' },
  { name: 'weight',  label: 'Weight',  icon: 'scale-outline',         iconActive: 'scale' },
  { name: 'habits',  label: 'Habits',  icon: 'checkmark-circle-outline', iconActive: 'checkmark-circle' },
];

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1D6F42',
        tabBarInactiveTintColor: 'rgba(26,28,27,0.40)',
        tabBarLabelStyle: {
          fontFamily: 'DM-Sans-SemiBold',
          fontSize: 10,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          marginTop: 2,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(249,249,247,0.96)',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              tint="light"
              intensity={60}
              style={[StyleSheet.absoluteFill, styles.tabBarBlur]}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, styles.tabBarAndroid]} />
          ),
        tabBarIcon: ({ focused, color }) => {
          const tab = TABS.find(t => t.name === route.name);
          const iconName = focused ? tab?.iconActive : tab?.icon;
          return (
            <View style={focused ? styles.iconActiveWrap : undefined}>
              <Ionicons name={(iconName ?? 'home') as IoniconName} size={24} color={color} />
            </View>
          );
        },
        tabBarShowLabel: true,
      })}
    >
      {TABS.map(tab => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.label }} />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBlur: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  tabBarAndroid: {
    backgroundColor: 'rgba(249,249,247,0.97)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 12,
  },
  iconActiveWrap: {
    // subtle indicator via dot below is handled by active color
  },
});
