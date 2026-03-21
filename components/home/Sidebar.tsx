import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  Easing,
  interpolate
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.65; // Reduced from 0.75

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const MENU_ITEMS = [
  { id: 'profile', label: 'My Profile', icon: 'person-outline' },
  { id: 'history', label: 'History & Stats', icon: 'stats-chart-outline' },
  { id: 'achievements', label: 'Achievements', icon: 'trophy-outline' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'podium-outline' },
  { id: 'settings', label: 'Settings', icon: 'settings-outline', route: '/settings' },
  { id: 'support', label: 'Help & Support', icon: 'help-buoy-outline' },
];

export default function Sidebar({ isOpen, onClose, userName }: SidebarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const translateX = useSharedValue(-SIDEBAR_WIDTH);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
      backdropOpacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
    } else {
      translateX.value = withTiming(-SIDEBAR_WIDTH, { duration: 300, easing: Easing.in(Easing.ease) });
      backdropOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [isOpen]);

  const sidebarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    pointerEvents: backdropOpacity.value > 0.01 ? 'auto' : 'none',
  }));

  const handlePress = (route?: string) => {
    onClose();
    if (route) {
      setTimeout(() => router.push(route as any), 300);
    }
  };

  return (
    <View style={styles.absoluteTarget} pointerEvents="box-none">
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Sidebar Panel */}
      <Animated.View style={[styles.sidebar, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }, sidebarAnimatedStyle]}>
        
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <TouchableOpacity><Text style={styles.viewProfile}>View Profile</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#1A1C1B" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.menuList}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => handlePress(item.route)}
            >
              <Ionicons name={item.icon as any} size={22} color="#1A1C1B" style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.footer}>
          <Text style={styles.version}>Niyam App v1.0.0</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteTarget: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: '#F9F9F7',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1D6F42',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 22,
    color: 'white',
  },
  userName: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
    color: '#1A1C1B',
    marginBottom: 2,
  },
  viewProfile: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    color: '#1D6F42',
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 0,
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E6',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  menuList: {
    paddingHorizontal: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  menuIcon: {
    marginRight: 16,
    opacity: 0.8,
  },
  menuLabel: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 16,
    color: '#1A1C1B',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  version: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    color: 'rgba(26,28,27,0.4)',
  },
});
