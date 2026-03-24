import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface PlateauChartCardProps {
  currentWeight: number;
}

export const PlateauChartCard: React.FC<PlateauChartCardProps> = ({ currentWeight }) => {
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(29, 111, 66, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(111, 122, 112, ${opacity})`,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#1D6F42',
      fill: '#ffffff',
    },
    propsForBackgroundLines: {
      strokeDasharray: '0',
      stroke: '#EEEEEC',
      opacity: 0.1,
    },
    fillShadowGradient: '#1D6F42',
    fillShadowGradientOpacity: 0.05,
    useShadowColorFromDataset: false,
  };

  // Create a 14-day flat trend
  const data = {
    labels: ['Oct 12', 'Oct 19', 'Oct 26'],
    datasets: [
      {
        data: Array(7).fill(currentWeight), // Simulating 14 days with 7 data points for simplicity
        color: (opacity = 1) => `rgba(29, 111, 66, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>14-Day Weight Trend</Text>
          <Text style={styles.subtitle}>Oct 12 — Oct 26</Text>
        </View>
        <View style={styles.currentWeightContainer}>
          <Text style={styles.currentWeightValue}>{currentWeight.toFixed(1)}</Text>
          <Text style={styles.unit}>kg</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 80}
          height={180}
          chartConfig={chartConfig}
          bezier={false} // Flat line
          withDots={true}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLabels={true}
          withHorizontalLabels={false}
          style={styles.chart}
          transparent={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    minHeight: 320,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 20,
    color: '#1A1C1B',
  },
  subtitle: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#6F7A70',
    marginTop: 4,
  },
  currentWeightContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentWeightValue: {
    fontFamily: 'Fraunces-ExtraBold',
    fontSize: 32,
    color: '#1D6F42',
  },
  unit: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#6F7A70',
    marginLeft: 4,
  },
  chartContainer: {
    height: 180,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginLeft: -16, // Adjusting for chart labels
  },
});
