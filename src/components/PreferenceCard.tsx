// PreferenceCard.tsx
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface PreferenceCardProps {
  text: string;
  onPress: () => void;
  isSelected: boolean;
}

const PreferenceCard = (props: PreferenceCardProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handlePress = () => {
    setIsHighlighted(!isHighlighted);
    props.onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.card, props.isSelected && styles.highlightedCard]}>
        <Text style={[styles.text, props.isSelected && styles.highlightedText]}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  highlightedCard: {
    backgroundColor: '#FF6B6B',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  highlightedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

export default PreferenceCard;
