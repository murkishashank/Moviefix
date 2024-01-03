/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MovieListScreen } from './screens/MovieListScreen';

const AppLogo = () => {
  // Replace 'app-logo.png' with the actual path or URI of your app logo
  const logoUri = require('./assets/app-logo.png');

  return <Image source={logoUri} style={{ width: 100, height: 40, resizeMode: 'contain' }} />;
};

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MovieList2"
        screenOptions={{
          headerTitle: () => <AppLogo />, // Use AppLogo component as header title
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: backgroundStyle.backgroundColor,
          },
        }}
      >
        <Stack.Screen name="MovieList" component={MovieListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
