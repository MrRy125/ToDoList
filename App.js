import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import { theme } from './src/theme';

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background }
        }}
        initialRouteName="Home"
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="TaskForm" 
          component={TaskFormScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}