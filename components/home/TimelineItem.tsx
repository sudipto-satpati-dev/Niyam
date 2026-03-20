import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TimelineItem as ITimelineItem, ItemStatus } from '../../types/log';

interface TimelineItemProps {
  item: ITimelineItem;
  status: ItemStatus;
  onPress: () => void;
}

const statusConfig = {
  done:     { pillText: 'Done',     pillBg: '#E8F5EE', pillColor: '#0F6E56', leftBorder: null },
  overdue:  { pillText: 'Log now',  pillBg: '#FAEEDA', pillColor: '#633806', leftBorder: '#BA7517' },
  upcoming: { pillText: 'Upcoming', pillBg: '#F5F5F0', pillColor: '#9B9B96', leftBorder: null },
  missed:   { pillText: 'Missed',   pillBg: '#FCEBEB', pillColor: '#791F1F', leftBorder: '#E24B4A' },
};

export default function TimelineItem({ item, status, onPress }: TimelineItemProps) {
  const config = statusConfig[status];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        config.leftBorder ? { borderLeftWidth: 4, borderLeftColor: config.leftBorder, paddingLeft: 12 } : { paddingLeft: 16 }
      ]}
    >
      <View style={styles.timeLineContainer}>
         <Text style={styles.timeText}>{item.time}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{item.label}</Text>
        <Text style={styles.descText} numberOfLines={1}>{item.description}</Text>
      </View>
      
      <View style={[styles.pill, { backgroundColor: config.pillBg }]}>
        <Text style={[styles.pillText, { color: config.pillColor }]}>{config.pillText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  timeLineContainer: {
    width: 60,
  },
  timeText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 14,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  titleText: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  descText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: '#666',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pillText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 12,
  }
});
