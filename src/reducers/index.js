import { GET_DECK, SET_DECKS, ADD_CARD_TO_DECK, ADD_DECK, DELETE_DECK } from '../actions'

const INITIAL_STATE = {};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DECKS: {
      return action.payload;
    }

    case GET_DECK:
      return state.decks[action.id];

    case ADD_DECK:
      return {
        ...state,
        [action.payload.id]: {
          title: [action.payload.title],
          questions: []
        }
      }

    case ADD_CARD_TO_DECK:
      const newState = state;

      let questions = state[action.payload.id].questions;

      const card = action.payload.card;

      questions = [ ...questions, card ];

      newState[action.payload.id] = { ...newState[action.payload.id], questions };

      return newState;

    case DELETE_DECK:
      state[action.id] = undefined;

      delete state[action.id];

      return state;

    default:
      return state
  }
}

export default reducer