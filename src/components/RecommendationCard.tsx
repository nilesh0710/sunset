// RecommendationCard.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface RecommendationCardProps {
  index: number;
  name: string;
  type: string;
  location: {
    latitude: number;
    longitude: number;
  };
  selectedIndex: number;
  onPress: (index: number) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  index,
  name,
  type,
  location,
  selectedIndex,
  onPress,
}) => {
  const handlePress = () => {
    onPress(index);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.card,
          index === selectedIndex && styles.highlightedCard,
        ]}>
        <Text
          style={[
            styles.cardTitle,
            index === selectedIndex && styles.highlightedCardTitle,
          ]}>
          {name}
        </Text>
        <Text
          style={[
            styles.cardText,
            index === selectedIndex && styles.highlightedCardText,
          ]}>
          Type: {type}
        </Text>
        <Text
          style={[
            styles.cardText,
            index === selectedIndex && styles.highlightedCardText,
          ]}>
          Location: {location.latitude}, {location.longitude}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  highlightedCard: {
    backgroundColor: '#FF6B6B',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  highlightedCardTitle: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  cardText: {
    fontSize: 14,
  },
  highlightedCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

export default RecommendationCard;
