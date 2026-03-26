import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface AcknowledgementRingProps {
  done: number;
  total: number;
}

export const AcknowledgementRing: React.FC<AcknowledgementRingProps> = ({ done, total }) => {
  const size = 64;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = done / total;
  const strokeDashoffset = circumference * (1 - progress);
  const isComplete = done === total;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E8F5EE"
          strokeWidth={strokeWidth}
          fill={done > 0 ? "#D0E9DA" : "transparent"}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1D6F42"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.doneText}>{done}/{total}</Text>
        <Text style={styles.label}>RITUALS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  doneText: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 18,
    color: '#1D6F42',
    lineHeight: 22,
  },
  label: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 7,
    color: '#6F7A70',
    letterSpacing: 0.5,
    marginTop: -2,
  },
});
