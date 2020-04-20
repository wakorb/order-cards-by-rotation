import {
  CREATE_DECK_STARTED,
  CREATE_DECK_SUCCEEDED,
  CREATE_DECK_FAILED,
  GET_DECK_STARTED,
  GET_DECK_SUCCEEDED,
  GET_DECK_FAILED,
  DeckActionTypes,
  DeckState,
} from "./types";

const initialState: DeckState = {
  deck: undefined,
  lastCreatedDeckId: "",
  createDeckPending: false,
  createDeckError: "",
  getDeckLoading: false,
  getDeckError: "",
};

const deckReducer = (
  state = initialState,
  action: DeckActionTypes
): DeckState => {
  let newState: DeckState;
  switch (action.type) {
    case CREATE_DECK_STARTED:
      newState = {
        ...state,
        createDeckPending: true,
        lastCreatedDeckId: "",
      };
      return newState;
    case CREATE_DECK_SUCCEEDED:
      newState = {
        ...state,
        createDeckPending: false,
        lastCreatedDeckId: action.deckId,
      };
      return newState;
    case CREATE_DECK_FAILED:
      newState = {
        ...state,
        createDeckPending: false,
        createDeckError: action.error,
      };
      return newState;
    case GET_DECK_STARTED:
      newState = {
        ...state,
        getDeckLoading: true,
      };
      return newState;
    case GET_DECK_SUCCEEDED:
      newState = {
        ...state,
        getDeckLoading: false,
        deck: action.deck,
      };
      return newState;
    case GET_DECK_FAILED:
      newState = {
        ...state,
        getDeckLoading: false,
        getDeckError: action.error,
      };
      return newState;
    default:
      return state;
  }
};

export default deckReducer;
