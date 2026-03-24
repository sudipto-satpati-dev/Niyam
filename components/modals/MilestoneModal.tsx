import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { WeightMilestone } from '../../types/weight';

interface MilestoneModalProps {
  isVisible: boolean;
  milestone?: WeightMilestone;
  onClose: () => void;
  startWeight?: number;
  currentWeight?: number;
  weekNumber?: number;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isVisible,
  milestone,
  onClose,
  startWeight = 74,
  currentWeight = 72,
  weekNumber = 3,
}) => {
  if (!milestone) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={30} style={styles.overlay}>
        {isVisible && (
          <ConfettiCannon 
            count={50} 
            origin={{x: Dimensions.get('window').width / 2, y: 0}} 
            fadeOut={true}
            fallSpeed={3000}
          />
        )}
        <View style={styles.modal}>
          {/* Confetti & Star Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.headerBg} />
            <View style={styles.starCircle}>
              <MaterialIcons name="stars" size={48} color="#BA7517" />
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Milestone reached!</Text>
            <Text style={styles.milestoneText}>{milestone.label}</Text>

            {/* Metrics Pill */}
            <View style={styles.metricsPill}>
              <Text style={styles.pillText}>{startWeight} kg</Text>
              <MaterialIcons name="arrow-forward" size={14} color="#6F7A70" />
              <Text style={styles.pillTextBold}>{currentWeight} kg</Text>
            </View>

            {/* Progress Strip */}
            <View style={styles.progressStripContainer}>
              <View style={styles.progressLine} />
              <View style={[styles.progressLineActive, { width: '40%' }]} />
              <View style={styles.circlesRow}>
                <View style={[styles.circle, styles.completedCircle]}>
                  <MaterialIcons name="check" size={12} color="#FFFFFF" />
                </View>
                <View style={[styles.circle, styles.activeCircle]}>
                  <MaterialIcons name="star" size={14} color="#FFFFFF" />
                </View>
                {[3, 4, 5].map(i => (
                  <View key={i} style={[styles.circle, styles.pendingCircle]}>
                    <Text style={styles.pendingNumber}>{i}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.stripLabels}>
                <Text style={styles.stripLabel}>Kickoff</Text>
                <Text style={[styles.stripLabel, { color: '#BA7517', fontWeight: 'bold' }]}>Current</Text>
                <Text style={styles.stripLabel}>Goal</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable style={styles.primaryButton}>
                <MaterialIcons name="share" size={20} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Share progress</Text>
              </Pressable>
              
              <Pressable style={styles.secondaryButton} onPress={onClose}>
                <Text style={styles.secondaryButtonText}>Continue</Text>
              </Pressable>
            </View>

            <Text style={styles.quote}>
              "Small steps lead to great distances."
            </Text>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 28, 27, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.15,
    shadowRadius: 48,
    elevation: 12,
  },
  headerSection: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(164, 244, 187, 0.2)', // primary-fixed/30
  },
  starCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 10,
  },
  content: {
    paddingHorizontal: 28,
    paddingBottom: 24,
    paddingTop: 8,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 28,
    color: '#1A1C1B',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  milestoneText: {
    fontFamily: 'Fraunces-Italic',
    fontSize: 20,
    color: '#1D6F42',
    marginTop: 4,
    marginBottom: 16,
  },
  metricsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 12,
    marginBottom: 24,
  },
  pillText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    color: '#6F7A70',
  },
  pillTextBold: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: '#1D6F42',
  },
  progressStripContainer: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  progressLine: {
    position: 'absolute',
    top: 14,
    left: 12,
    right: 12,
    height: 2,
    backgroundColor: '#F4F4F2',
  },
  progressLineActive: {
    position: 'absolute',
    top: 14,
    left: 12,
    height: 2,
    backgroundColor: '#BA7517',
  },
  circlesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCircle: {
    backgroundColor: '#BA7517',
  },
  activeCircle: {
    backgroundColor: '#BA7517',
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowColor: '#1A1C1B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  pendingCircle: {
    backgroundColor: '#F4F4F2',
    width: 20,
    height: 20,
  },
  pendingNumber: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6F7A70',
  },
  stripLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stripLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#6F7A70',
    opacity: 0.6,
  },
  actions: {
    width: '100%',
    gap: 8,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#1D6F42',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#F4F4F2',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: '#1D6F42',
  },
  quote: {
    fontFamily: 'DM-Sans-MediumItalic',
    fontSize: 11,
    color: '#6F7A70',
    marginTop: 20,
  },
});
