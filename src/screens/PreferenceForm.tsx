import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import PreferenceCard from '../components/PreferenceCard';
import Icon from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import {storeUserData, retrieveUserData} from '../utils/storageHelper';

interface PreferenceFormProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const PreferenceForm = ({navigation}: PreferenceFormProps) => {
  const [selectedPreference, setSelectedPreference] = useState<string>('');
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    city: string;
  } | null>(null);

  const preferences = ['Restaurant', 'Bar', 'Experiences'];

  const handlePreferenceSelection = (preference: string) => {
    setSelectedPreference(preference);
  };

  const handleGetLocation = () => {
    // Implement the logic to get the current location
    // This will involve using Geolocation API or other location services
    // For simplicity, I'm setting a dummy location
    setLocation({
      latitude: 40.7612,
      longitude: -73.9785,
      city: 'New York City',
    });
  };

  useEffect(() => {
    // On component mount, retrieve user data if available
    const fetchUserData = async () => {
      const userData = await retrieveUserData();
      if (userData) {
        setSelectedPreference(userData.preference);
        setLocation(userData.location);
      }
    };

    fetchUserData();
  }, []);

  const fetchRecommendation = async () => {
    // Make API call to the backend with user preferences
    const response = await fetch(
      'http://192.168.0.109:3000/api/recommendations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userLocation: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          preferences: {
            selectedPreference,
          },
        }),
      },
    );

    const data = await response.json();
    console.log('Recommendations:', data.recommendations);

    // Store user data for future use
    storeUserData(location, selectedPreference);

    // Navigate to the Recommendations screen
    navigation.navigate('Recommendations', {
      recommendations: data.recommendations,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#edb9b8', '#fff']} style={styles.container}>
        <View>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Sunset Matches</Text>
          </View>
          <Text style={styles.label}>Pick Your Perfect Date Setting</Text>
          {preferences.map(preference => (
            <PreferenceCard
              key={preference}
              text={preference}
              onPress={() => handlePreferenceSelection(preference)}
              isSelected={selectedPreference === preference}
            />
          ))}

          {location ? (
            <View style={styles.textContainer}>
              <Text style={[styles.cityText]}>Discovering Locations in </Text>
              <Text style={styles.label}>{location.city}</Text>
            </View>
          ) : (
            <Text style={styles.label}>
              Enable Location to Find Nearby Locations
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.touchable,
              (!location || !selectedPreference) && styles.disabledTouchable,
            ]}
            onPress={fetchRecommendation}
            disabled={!location || !selectedPreference}>
            <Text style={styles.buttonText}>Get Recommendations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleGetLocation}>
            <Icon name="location-arrow" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#fdb9b8',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    marginTop: 8,
  },
  cityText: {
    fontWeight: '400',
    fontSize: 14,
    fontStyle: 'italic',
  },
  touchable: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    marginVertical: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  locationButton: {
    padding: 8,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    marginVertical: 8,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  disabledTouchable: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  disabledButtonText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PreferenceForm;
