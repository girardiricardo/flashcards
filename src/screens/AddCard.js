import * as React from 'react';
import { 
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { _addCardToDeck } from '../utils/api';
import { addCardToDeck } from '../actions';

export default function AddCard({ route, navigation }) {
  const { deck: { id }} = route.params;
  
  const decks = useSelector((state) => state);
  const dispatch = useDispatch();

  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = () => {
    const card = { question, answer };
    _addCardToDeck({ id, card })
      .then(dispatch(addCardToDeck({ id, card })))
      .then(() => navigation.navigate('Deck', {
        deck: decks[id]
      }))
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Question"
        value={question}
        onChangeText={(text) => setQuestion(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Answer"
        value={answer}
        onChangeText={(text) => setAnswer(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={!question || !answer}>
        <Text style={styles.buttonText}>Submit</Text>
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
  },
  input: {
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
    padding: 10,
    fontSize: 16,
  }
})