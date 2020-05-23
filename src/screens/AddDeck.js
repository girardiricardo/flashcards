import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';

import { addDeck } from '../actions';
import { generateUID, _addDeck } from '../utils/api';

export default function AddDeck({ navigation }) {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState('');

  const handleOnSubmit = async () => {
    const id = generateUID();

    _addDeck({ id, title })
      .then(() => dispatch(addDeck({ id, title })))
      .then(() => navigation.navigate('Deck', {
        deck: { id, title, questions: [] }
      }))
      .then(() => setTitle(''))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What is the title of your new deck?</Text>
      <TextInput value={title} onChangeText={(text) => setTitle(text)} style={styles.input} />
      <Button title="Submit" disabled={!title} onPress={handleOnSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'grey',
    padding: 10
  }
});