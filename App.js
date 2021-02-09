import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Views/Home'


export default function App() {

  const Stack = createStackNavigator();

   return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}