import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface NonNegotiableCardProps {
  rule: { id: string; title: string; reason: string };
  index: number;
  isAcknowledged: boolean;
  onAcknowledge: (id: string) => void;
  onUnacknowledge: (id: string) => void;
}

export const NonNegotiableCard: React.FC<NonNegotiableCardProps> = ({ 
  rule, 
  index, 
  isAcknowledged, 
  onAcknowledge,
  onUnacknowledge
}) => {
  const handlePress = () => {
    if (!isAcknowledged) {
      onAcknowledge(rule.id);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleLongPress = () => {
    if (isAcknowledged) {
      onUnacknowledge(rule.id);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  };

  return (
    <Pressable 
      style={[styles.container, isAcknowledged && styles.containerDone]} 
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={800}
    >
      <View style={[styles.numberCircle, isAcknowledged ? styles.numberCircleDone : styles.numberCirclePending]}>
        <Text style={[styles.numberText, isAcknowledged ? styles.numberTextDone : styles.numberTextPending]}>
          {index}
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, isAcknowledged && styles.textDone]}>{rule.title}</Text>
        <Text style={[styles.reason, isAcknowledged && styles.textDone]}>{rule.reason}</Text>
      </View>

      <View style={[styles.checkCircle, isAcknowledged ? styles.checkCircleDone : styles.checkCirclePending]}>
        {isAcknowledged && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  containerDone: {
    backgroundColor: '#F0F7F3',
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  numberCirclePending: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#1D6F42',
  },
  numberCircleDone: {
    backgroundColor: '#1D6F42',
  },
  numberText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 16,
  },
  numberTextPending: {
    color: '#1D6F42',
  },
  numberTextDone: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 15,
    color: '#1A1C1B',
    marginBottom: 4,
  },
  reason: {
    fontFamily: 'DM-Sans',
    fontSize: 13,
    color: '#6F7A70',
    lineHeight: 18,
  },
  textDone: {
    opacity: 0.6,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkCirclePending: {
    borderWidth: 2,
    borderColor: '#E8E8E6',
  },
  checkCircleDone: {
    backgroundColor: '#1D6F42',
  },
});
