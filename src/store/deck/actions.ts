import axios from "../../util/axios";
import { AppThunk } from "../types/AppThunk";

import {
  CREATE_DECK_STARTED,
  CREATE_DECK_SUCCEEDED,
  CREATE_DECK_FAILED,
  CREATE_DECK_PILE_STARTED,
  CREATE_DECK_PILE_SUCCEEDED,
  CREATE_DECK_PILE_FAILED,
  GET_DECK_STARTED,
  GET_DECK_SUCCEEDED,
  GET_DECK_FAILED,
  DeckActionTypes,
} from "./types";

const onCreateDeckStarted = (): DeckActionTypes => ({
  type: CREATE_DECK_STARTED,
});

const onCreateDeckSucceeded = (payload: any): DeckActionTypes => ({
  type: CREATE_DECK_SUCCEEDED,
  payload,
});

const onCreateDeckFailed = (error: string): DeckActionTypes => ({
  type: CREATE_DECK_FAILED,
  error,
});

const onCreateDeckPileStarted = (): DeckActionTypes => ({
  type: CREATE_DECK_PILE_STARTED,
});

const onCreateDeckPileSucceeded = (payload: any): DeckActionTypes => ({
  type: CREATE_DECK_PILE_SUCCEEDED,
  payload,
});

const onCreateDeckPileFailed = (error: string): DeckActionTypes => ({
  type: CREATE_DECK_PILE_FAILED,
  error,
});

const onGetDeckStarted = (): DeckActionTypes => ({
  type: GET_DECK_STARTED,
});

const onGetDeckSucceeded = (payload: any): DeckActionTypes => ({
  type: GET_DECK_SUCCEEDED,
  payload,
});

const onGetDeckFailed = (error: string): DeckActionTypes => ({
  type: GET_DECK_FAILED,
  error,
});

export const createDeck = (): AppThunk => (dispatch) => {
  dispatch(onCreateDeckStarted());
  return axios
    .post("deck/new")
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(onCreateDeckSucceeded(response));
      return response.data;
    })
    .catch((error) => {
      const { response } = error;
      dispatch(onCreateDeckPileFailed(response));
      throw error;
    });
};

export const createDeckPile = (deckId: string, cards: string[]): AppThunk => (
  dispatch
) => {
  dispatch(onCreateDeckPileStarted());
  let url = `deck/${deckId}/pile/default/add/?cards=${cards.toString()}`;
  return axios
    .post(url)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(onCreateDeckPileSucceeded(response));
      return response.data;
    })
    .catch((error) => {
      const { response } = error;
      dispatch(onCreateDeckFailed(response));
      throw error;
    });
};

// need to auto set limit and offset in the case that params are supplied but without limit/offset
export const getDeck = (deckId: string): AppThunk => (dispatch) => {
  dispatch(onGetDeckStarted());
  const url = `deck/${deckId}/pile/default/list`;
  return axios
    .get(url)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(onGetDeckSucceeded(response));
    })
    .catch((error) => {
      const { response } = error;
      dispatch(onGetDeckFailed(response));
      throw error;
    });
};
