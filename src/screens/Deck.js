import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import { useDispatch } from 'react-redux';
import { _deleteDeck } from '../utils/api';
import { deleteDeck } from '../actions';

export default function Deck ({ route, navigation }) {
  const { deck } = route.params;
  const { id, title, questions } = deck;

  const dispatch = useDispatch();

  const handleDeleteDeck = () => {
    _deleteDeck(id)
      .then(dispatch(deleteDeck(id)))
      .then(navigation.navigate('Home'))
  }

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      return navigation.navigate('EmptyQuiz')
    }

    return navigation.navigate('Quiz', {
      deck
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.small}>{questions.length} cards</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddCard', {
            deck
          })
        }}
      >
        <Text style={styles.buttonText}>Add card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleStartQuiz()}
      >
        <Text style={styles.buttonText}>Start quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleDeleteDeck()}
      >
        <Text style={styles.buttonText}>Delete card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  small: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})