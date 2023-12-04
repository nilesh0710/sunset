// RecommendationsScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LinearGradient} from 'react-native-linear-gradient';
import RecommendationCard from '../components/RecommendationCard';

type RootStackParamList = {
  Recommendations: {
    recommendations: {
      name: string;
      type: string;
      location: {
        latitude: number;
        longitude: number;
      };
    }[];
  };
};

type RecommendationsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Recommendations'
>;

type RecommendationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Recommendations'
>;

interface RecommendationsScreenProps {
  route: RecommendationsScreenRouteProp;
  navigation: RecommendationsScreenNavigationProp;
}

const RecommendationsScreen = ({route}: RecommendationsScreenProps) => {
  const {recommendations} = route.params;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleCardPress = (index: number) => {
    setSelectedIndex(index === selectedIndex ? -1 : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#fdb9b8', '#fff']} style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Sunset Matches</Text>
        </View>
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RecommendationCard
              name={item.name}
              type={item.type}
              location={item.location}
              selectedIndex={selectedIndex}
              onPress={handleCardPress}
              index={index}
            />
          )}
        />
        <TouchableOpacity
          style={[
            styles.touchable,
            selectedIndex < 0 && styles.disabledTouchable,
          ]}
          disabled={selectedIndex > -1}>
          <Text style={styles.buttonText}>Reserve</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 32,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  touchable: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  disabledTouchable: {
    backgroundColor: 'gray',
  },
});

export default RecommendationsScreen;
