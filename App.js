import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Views/Home';
import HeroPage from './src/Views/HeroPage';
import ComicPage from './src/Views/ComicPage';
import SeriePage from './src/Views/SeriesPage';
import CreatorsPage from './src/Views/CreatorsPage';
import EventPage from './src/Views/EventPage';

export default function App() {

  const Stack = createStackNavigator();

   return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="HeroPage" component={HeroPage} />
        <Stack.Screen name="ComicPage" component={ComicPage} />
        <Stack.Screen name="SeriePage" component={SeriePage} />
        <Stack.Screen name="CreatorsPage" component={CreatorsPage} />
        <Stack.Screen name="EventPage" component={EventPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}