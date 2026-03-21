import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { MealOption, MealType } from '../../types/plan';
import { MEAL_TAB_LABELS } from './MealTabBar';

interface MealDetailSheetProps {
  option: MealOption | null;
  mealKey: MealType | null;
  isLogged: boolean;
  onLog: (option: MealOption) => void;
  onClose: () => void;
}

export const MealDetailSheet: React.FC<MealDetailSheetProps> = ({
  option,
  mealKey,
  isLogged,
  onLog,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['80%', '95%'], []);

  useEffect(() => {
    if (option) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [option]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
    ),
    []
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const getLocalImage = (id: string) => {
    if (id === 'b1') return require('../../assets/Foods/BreakFast/EggsBread.png');
    if (id === 'b2') return require('../../assets/Foods/BreakFast/OatsBowl.png');
    if (id === 'b3') return require('../../assets/Foods/BreakFast/PohaEggs.png');
    if (id === 'b4') return require('../../assets/Foods/BreakFast/TawaParatha.png');
    if (id === 'b5') return require('../../assets/Foods/BreakFast/DaliaEggs.jpeg');
    return { uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' };
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.dragIndicator}
      backgroundStyle={styles.sheetBackground}
      enablePanDownToClose
    >
      {option && mealKey ? (
        <>
          <BottomSheetScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                  <Text style={styles.title}>{option.name}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{option.kcal} kcal</Text>
                    <View style={styles.metaDot} />
                    <Text style={styles.metaText}>~{option.prepMinutes} min prep</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.heartBtn}>
                  <Ionicons name="heart" size={20} color="#00552e" />
                </TouchableOpacity>
              </View>
              <View style={styles.tagsContainer}>
                {option.tags.map((tag, idx) => {
                  const colors = [
                    { bg: 'rgba(0, 85, 46, 0.1)', text: '#00552e' },
                    { bg: 'rgba(136, 82, 0, 0.1)', text: '#885200' },
                    { bg: 'rgba(200, 198, 197, 0.3)', text: '#4a4949' },
                  ];
                  const color = colors[idx % colors.length];
                  return (
                    <View key={tag} style={[styles.tagBadge, { backgroundColor: color.bg }]}>
                      <Text style={[styles.tagText, { color: color.text }]}>{tag.toUpperCase()}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Hero Image */}
            <View style={styles.heroContainer}>
              <Image source={getLocalImage(option.id)} style={styles.heroImage} />
            </View>

            {/* What's In It Section */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="restaurant-outline" size={14} color="#6f7a70" />
                <Text style={styles.sectionTitle}>WHAT'S IN IT</Text>
              </View>
              <View style={styles.itemsList}>
                {option.items.map((item, idx) => (
                  <View key={idx} style={styles.itemCard}>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* How To Prepare Section */}
            {option.howToPrepare && option.howToPrepare.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Ionicons name="list-outline" size={14} color="#6f7a70" />
                  <Text style={styles.sectionTitle}>HOW TO PREPARE</Text>
                </View>
                <View style={styles.itemsList}>
                  {option.howToPrepare.map((step, idx) => (
                    <View key={idx} style={[styles.itemCard, { flexDirection: 'row', alignItems: 'flex-start', gap: 12 }]}>
                      <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#e8e8e6', alignItems: 'center', justifyContent: 'center', marginTop: -2 }}>
                         <Text style={{ fontFamily: 'DM-Sans-Bold', fontSize: 12, color: '#1a1c1b' }}>{idx + 1}</Text>
                      </View>
                      <Text style={[styles.itemText, { flex: 1, lineHeight: 20 }]}>{step}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Why It Works Section */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="medkit-outline" size={14} color="#6f7a70" />
                <Text style={styles.sectionTitle}>WHY IT WORKS</Text>
              </View>
              <View style={styles.benefitsList}>
                {option.benefits.map((benefit, idx) => (
                  <View key={idx} style={styles.benefitCard}>
                    <Ionicons name={idx === 1 ? "flash" : "fitness"} size={20} color={idx === 1 ? "#885200" : "#00552e"} style={{ marginBottom: 8 }} />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Best For Section */}
            <View style={[styles.section, { paddingBottom: 60 }]}>
              <View style={styles.bestForCard}>
                <Ionicons name="time" size={28} color="#1d6f42" />
                <View style={{ marginLeft: 16 }}>
                  <Text style={styles.bestForLabel}>BEST FOR</Text>
                  <Text style={styles.bestForValue}>{option.bestFor}</Text>
                </View>
              </View>
            </View>

          </BottomSheetScrollView>

          {/* Footer Log Action */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.actionBtn, isLogged && styles.actionBtnLogged]}
              onPress={() => onLog(option)}
              activeOpacity={0.8}
            >
              {isLogged ? (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#6B7280" />
                  <Text style={styles.actionBtnTextLogged}>Logged for {MEAL_TAB_LABELS[mealKey]?.toLowerCase()}</Text>
                </>
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                  <Text style={styles.actionBtnText}>Log this for {MEAL_TAB_LABELS[mealKey]?.toLowerCase()}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#f9f9f7',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  dragIndicator: {
    width: 48,
    height: 6,
    backgroundColor: 'rgba(111, 122, 112, 0.3)',
    borderRadius: 3,
    marginTop: 8,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 28,
    color: '#00552e',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: 'rgba(26, 28, 27, 0.8)',
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6f7a70',
    marginHorizontal: 8,
  },
  heartBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8e8e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  heroContainer: {
    width: '100%',
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f4f4f2',
    marginBottom: 40,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#6f7a70',
    letterSpacing: 1.5,
  },
  itemsList: {
    gap: 12,
  },
  itemCard: {
    backgroundColor: '#f4f4f2',
    padding: 16,
    borderRadius: 12,
  },
  itemText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    color: '#1a1c1b',
  },
  benefitsList: {
    gap: 16,
  },
  benefitCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(191, 201, 190, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  benefitText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    color: '#3f4941',
    lineHeight: 18,
  },
  bestForCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 111, 66, 0.05)',
    padding: 20,
    borderRadius: 16,
  },
  bestForLabel: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#1d6f42',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bestForValue: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 18,
    color: '#1d6f42',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(249, 249, 247, 0.9)',
    borderTopWidth: 1,
    borderColor: 'rgba(191, 201, 190, 0.1)',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00552e',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#00552e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnLogged: {
    backgroundColor: '#e8e8e6',
    shadowOpacity: 0,
    elevation: 0,
  },
  actionBtnText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#FFF',
  },
  actionBtnTextLogged: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#6B7280',
  },
});
