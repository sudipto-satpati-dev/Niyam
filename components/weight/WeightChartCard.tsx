import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { WeightEntry } from '../../types/weight';

interface WeightChartCardProps {
  entries: WeightEntry[];
  goalWeight: number;
  projectedEntries?: WeightEntry[];
}

export const WeightChartCard: React.FC<WeightChartCardProps> = ({
  entries,
}) => {
  const screenWidth = Dimensions.get('window').width - 48; // Global padding 24 * 2
  
  // Prepare data (last 8 entries)
  const last8Entries = entries.slice(-8);
  if (last8Entries.length < 2) return null;

  // X-Axis Labels: matching image exactly
  const labels = last8Entries.map((e, index) => {
    if (index === 0) return '8W AGO';
    if (index === Math.floor(last8Entries.length / 2)) return '4W AGO';
    if (index === last8Entries.length - 1) return 'TODAY';
    return '';
  });

  const dataValues = last8Entries.map(e => e.weightKg);

  const chartData = {
    labels: labels, 
    datasets: [
      {
        data: dataValues,
        color: (opacity = 1) => `rgba(29, 111, 66, ${opacity})`, // primary-container
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(29, 111, 66, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(111, 122, 112, ${opacity})`,
    style: {
      borderRadius: 24,
    },
    propsForDots: {
      r: '0', // Hide dots
    },
    propsForBackgroundLines: {
      strokeDasharray: '0', // No dashes if possible
      stroke: '#EEEEEC',
      opacity: 0.05,
    },
    fillShadowGradient: '#1D6F42',
    fillShadowGradientOpacity: 0.08,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontFamily: 'DM-Sans-Bold',
      fontSize: 10,
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>LAST 8 WEEKS</Text>
      </View>
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          hidePointsAtIndex={dataValues.map((_, i) => i)} // Extra layer of hiding dots
          segments={2} // Only show min/max labels roughly
          formatYLabel={(val) => `${Math.round(parseFloat(val))}kg`}
          yAxisSuffix=""
          xLabelsOffset={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 24,
    color: '#1A1C1B',
  },
  subtitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#6F7A70',
    opacity: 0.8,
  },
  chartWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingTop: 40,
    paddingBottom: 24,
    paddingRight: 24,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chart: {
    borderRadius: 24,
    marginLeft: -20, // Move left to align labels
  },
});
