import { _addDeck } from '../utils/api';

export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const ADD_DECK = 'ADD_DECK';
export const SET_DECKS = 'SET_DECKS';
export const DELETE_DECK = 'DELETE_DECK';

export function setDecks(payload) {
  return {
    type: SET_DECKS,
    payload
  }
}

export function getDeck(id) {
  return {
    type: ADD_ENTRY,
    id,
  }
}

export function addDeck(payload) {
  return {
    type: ADD_DECK,
    payload,
  }
}

export function addCardToDeck(payload) {
  return {
    type: ADD_CARD_TO_DECK,
    payload,
  }
}

export function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    id,
  }
}