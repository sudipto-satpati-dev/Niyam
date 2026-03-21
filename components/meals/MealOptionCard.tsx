import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MealOption } from '../../types/plan';
import { Ionicons } from '@expo/vector-icons';

interface MealOptionCardProps {
  option: MealOption;
  isLogged: boolean;
  isMealLogged: boolean;
  onLog: (option: MealOption) => void;
  onPress: (option: MealOption) => void;
  onEdit: (option: MealOption) => void;
}

export const MealOptionCard: React.FC<MealOptionCardProps> = ({
  option,
  isLogged,
  isMealLogged,
  onLog,
  onPress,
  onEdit,
}) => {
  const isCheat = option.isCheat;
  const opacity = !isLogged && isMealLogged && !isCheat ? 0.7 : 1;
  const isDifferentLogged = isMealLogged && !isLogged;

  const handleAction = () => {
    if (isLogged) {
      onEdit(option);
    } else {
      if (isDifferentLogged) {
        onEdit(option);
      } else {
        onLog(option);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isLogged && styles.cardLogged,
        isCheat && styles.cardCheat,
        { opacity }
      ]}
      onPress={() => onPress(option)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={
            option.id === 'b1' ? require('../../assets/Foods/BreakFast/EggsBread.png') :
            option.id === 'b2' ? require('../../assets/Foods/BreakFast/OatsBowl.png') :
            option.id === 'b3' ? require('../../assets/Foods/BreakFast/PohaEggs.png') :
            option.id === 'b4' ? require('../../assets/Foods/BreakFast/TawaParatha.png') :
            option.id === 'b5' ? require('../../assets/Foods/BreakFast/DaliaEggs.jpeg') :
            { uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' }
          }
          style={styles.image}
        />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={[styles.badge, isLogged && styles.badgeLogged, isCheat && styles.badgeCheat]}>
              {isLogged ? (
                <Ionicons name="checkmark" size={12} color="#FFF" />
              ) : (
                <Text style={[styles.badgeText, isCheat && styles.badgeTextCheat]}>{option.label}</Text>
              )}
            </View>
            <Text style={styles.title}>{option.name}</Text>
          </View>
          <Text style={styles.kcalText}>{option.kcal} kcal</Text>
        </View>

        <Text style={styles.description} numberOfLines={1}>{option.description}</Text>

        <View style={styles.footer}>
          <View style={styles.tagsContainer}>
            {option.tags.map((tag, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{tag.toUpperCase()}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={isLogged ? styles.actionBtnLogged : (isCheat ? styles.actionBtnCheat : styles.actionBtn)}
            onPress={handleAction}
          >
            {isLogged ? (
              <View style={{alignItems: 'center'}}>
                <Text style={styles.actionTextLogged}>Logged ✓</Text>
              </View>
            ) : (
              <Text style={isCheat ? styles.actionTextCheat : styles.actionText}>
                {isCheat ? 'Avoid' : (isDifferentLogged ? 'Switch' : 'Log')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLogged: {
    backgroundColor: '#F5FBF7',
  },
  cardCheat: {
    backgroundColor: '#FFFCF5',
  },
  imageContainer: {
    width: 96,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#eeeeec',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#BA7517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLogged: {
    backgroundColor: '#1D6F42',
  },
  badgeCheat: {
    backgroundColor: '#F59E0B',
  },
  badgeText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#FFF',
  },
  badgeTextCheat: {
    color: '#FFF',
  },
  title: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    color: '#1a1c1b',
  },
  kcalText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 12,
    color: '#3f4941',
    marginLeft: 8,
  },
  description: {
    fontFamily: 'DM-Sans',
    fontSize: 12,
    color: '#3f4941',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#eeeeec',
  },
  tagText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 10,
    color: '#3f4941',
  },
  actionBtn: {
    backgroundColor: '#1d6f42',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionBtnCheat: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionText: {
    fontFamily: 'DM-Sans-Bold',
    color: '#FFFFFF',
    fontSize: 12,
  },
  actionTextCheat: {
    fontFamily: 'DM-Sans-Bold',
    color: '#F59E0B',
    fontSize: 12,
  },
  actionBtnLogged: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionTextLogged: {
    fontFamily: 'DM-Sans-Bold',
    color: '#1d6f42',
    fontSize: 12,
  },
});
