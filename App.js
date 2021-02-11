import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Views/Home';
import HeroPage from './src/Views/HeroPage';


export default function App() {

  const Stack = createStackNavigator();

   return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="HeroPage" component={HeroPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}