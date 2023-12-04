import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PreferenceForm from './src/screens/PreferenceForm';
import RecommendationsScreen from './src/screens/RecommendationsScreen';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PreferenceForm"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="PreferenceForm"
          component={PreferenceForm}
          // options={{title: 'Preferences'}}
        />
        <Stack.Screen
          name="Recommendations"
          component={RecommendationsScreen}
          // options={{title: 'Top Recommendations'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
