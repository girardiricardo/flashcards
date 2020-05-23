import * as React from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getDecks } from '../utils/api';
import { setDecks } from '../actions';

export default function Decks ({ navigation }) {
  const dispatch = useDispatch();
  const decks = useSelector(state => state)

  React.useEffect(() => {
    getDecks().then((results) => {
      return dispatch(setDecks(JSON.parse(results)))
    });
  }, [decks]);

  if (!decks || (decks && Object.keys(decks).length === 0)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>No decks.</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.values(decks)}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            questions={item.questions}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

function Item ({ key, id, title, questions, navigation }) {
  return (
    <TouchableOpacity
      key={id}
      style={styles.button}
      onPress={() => navigation.navigate('Deck', {
        deck: { id, title, questions }
      })}
    >
      <Text style={styles.header}>{title}</Text>
      <Text>{questions.length} cards</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: 50
      }
    })
  },
  text: {
    color: '#000'
  },
  button: {
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginHorizontal: 15,
    marginBottom: 15,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});