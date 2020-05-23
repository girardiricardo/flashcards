import { AsyncStorage } from 'react-native'

const DECKS = 'DECKS';

export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export async function getDecks() {
  return AsyncStorage.getItem(DECKS);
}

export function _addCardToDeck({ card, id }) {
  return AsyncStorage.getItem(DECKS)
    .then((results) => {
      let data = JSON.parse(results);

      data[id].questions = [ ...data[id].questions, card ];

      return AsyncStorage.setItem(DECKS, JSON.stringify(data));
    })
}

export async function _addDeck({ id, title }) {
  return await AsyncStorage.mergeItem(DECKS, JSON.stringify({
      [id]: {
        id,
        title,
        questions: []
      }
    }));
}

export async function _deleteDeck(id) {
  return await AsyncStorage.getItem(DECKS)
    .then((results) => {
      const data = JSON.parse(results);

      data[id] = undefined;

      delete data[id];

      return AsyncStorage.setItem(DECKS, JSON.stringify(data));
    })
}

export function saveDeckTitle({ id, title }) {
  return AsyncStorage.getItem(DECKS)
    .then((results) => {
      let data = JSON.parse(results);

      data[id].title = title;
      return AsyncStorage.setItem(DECKS, JSON.stringify(data))
    })
}