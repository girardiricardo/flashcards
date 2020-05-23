import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Decks from './Decks';
import AddDeck from './AddDeck';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Decks' && !focused) return <MaterialCommunityIcons name="cards" size={size} color={color} />
          if (route.name === 'Decks' && focused) return <MaterialCommunityIcons name="cards-outline" size={size} color={color} />
          if (route.name === 'AddDeck' && !focused) return <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
          if (route.name === 'AddDeck' && focused) return <MaterialCommunityIcons name="plus-circle-outline" size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Decks"
    >
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="AddDeck" component={AddDeck} />
    </Tab.Navigator>
  );
}

export default Home;