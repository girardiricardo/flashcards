import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Deck from './src/screens/Deck';
import AddCard from './src/screens/AddCard';
import EmptyQuiz from './src/screens/EmptyQuiz';
import Quiz from './src/screens/Quiz';

import { setNotification } from './src/utils/notification';
import reducer from './src/reducers';

const store = createStore(reducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

export default function App() {
  React.useEffect(() => {
    setNotification();
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Deck" component={Deck} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="EmptyQuiz" component={EmptyQuiz} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
