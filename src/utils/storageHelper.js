import EncryptedStorage from 'react-native-encrypted-storage';

const USER_DATA_KEY = 'user_data';

// Function to store user location and preference
export async function storeUserData(userLocation, selectedPreference) {
  try {
    const userData = {
      location: userLocation,
      preference: selectedPreference,
    };

    await EncryptedStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (error) {
    // Handle errors
    console.error('Error storing user data:', error);
  }
}

// Function to retrieve user location and preference
export async function retrieveUserData() {
  try {
    const userDataString = await EncryptedStorage.getItem(USER_DATA_KEY);

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData;
    } else {
      // Data not found, handle accordingly
      return null;
    }
  } catch (error) {
    // Handle errors
    console.error('Error retrieving user data:', error);
    return null;
  }
}
