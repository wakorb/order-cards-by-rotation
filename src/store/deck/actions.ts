import axios from "../../util/axios";
import { AppThunk } from "../types/AppThunk";

import {
  CREATE_DECK_STARTED,
  CREATE_DECK_SUCCEEDED,
  CREATE_DECK_FAILED,
  GET_DECK_STARTED,
  GET_DECK_SUCCEEDED,
  GET_DECK_FAILED,
  DeckActionTypes,
  Deck,
  PileListResponse,
  CardPile,
} from "./types";

const onCreateDeckStarted = (): DeckActionTypes => ({
  type: CREATE_DECK_STARTED,
});

const onCreateDeckSucceeded = (deckId: string): DeckActionTypes => ({
  type: CREATE_DECK_SUCCEEDED,
  deckId,
});

const onCreateDeckFailed = (error: string): DeckActionTypes => ({
  type: CREATE_DECK_FAILED,
  error,
});

const onGetDeckStarted = (): DeckActionTypes => ({
  type: GET_DECK_STARTED,
});

const onGetDeckSucceeded = (deck: Deck): DeckActionTypes => ({
  type: GET_DECK_SUCCEEDED,
  deck,
});

const onGetDeckFailed = (error: string): DeckActionTypes => ({
  type: GET_DECK_FAILED,
  error,
});

export const createDeck = (cards: string[], rotationCard: string): AppThunk => (
  dispatch
) => {
  dispatch(onCreateDeckStarted());

  // first we want to create a deck with only the specified cards
  // next we want to draw all the cards from the deck so we can insert them into piles
  // then we create a pile to store the cards
  // also create a pile to store the rotation

  return axios
    .get(`deck/new/shuffle/?cards=${cards.toString()},${rotationCard}`)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      const {
        data: { deck_id },
      } = response;

      const drawCardsUrl = `deck/${deck_id}/draw/?count=${cards.length + 1}`;

      const cardsPileUrl = `deck/${deck_id}/pile/cards/add/?cards=${cards.toString()}`;
      const rotationPileUrl = `deck/${deck_id}/pile/rotation/add/?cards=${rotationCard}`;

      axios.get(drawCardsUrl).then((drawRes) => {
        if (drawRes.status !== 200) {
          throw Error(response.statusText);
        }

        axios.get(cardsPileUrl).then((addCardsRes) => {
          if (addCardsRes.status !== 200) {
            throw Error(addCardsRes.statusText);
          }

          axios.get(rotationPileUrl).then((addRotationRes) => {
            if (addRotationRes.status !== 200) {
              throw Error(addRotationRes.statusText);
            }

            // ideally the create calls would be useful and return the created deck and
            // piles, which we could then cacdhe in redux

            dispatch(onCreateDeckSucceeded(deck_id));
          });
        });
      });
    })
    .catch((error) => {
      const { response } = error;
      dispatch(onCreateDeckFailed(response));
      throw error;
    });
};

export const getDeck = (deckId: string): AppThunk => (dispatch) => {
  dispatch(onGetDeckStarted());
  const cardsPileUrl = `deck/${deckId}/pile/cards/list`;
  const rotationPileUrl = `deck/${deckId}/pile/rotation/list`;
  return axios
    .get(cardsPileUrl)
    .then((cardsRes) => {
      if (cardsRes.status !== 200) {
        throw Error(cardsRes.statusText);
      }

      const deck: Deck = {
        deckId,
        cards: [],
      };

      const cardPileList: PileListResponse = cardsRes.data;
      const cardPile: CardPile = cardPileList.piles.cards;

      deck.cards = cardPile.cards;

      axios.get(rotationPileUrl).then((rotationRes) => {
        if (rotationRes.status !== 200) {
          throw Error(rotationRes.statusText);
        }

        const rotationPileList: PileListResponse = rotationRes.data;
        const rotationPile: CardPile = rotationPileList.piles.rotation;

        // this is not ideal practice, but since the API is less than ideal
        // and we're enforcing assumptions through hardcoding...
        deck.rotationCard = rotationPile.cards[0];
        dispatch(onGetDeckSucceeded(deck));
      });
    })
    .catch((error) => {
      const { response } = error;
      dispatch(onGetDeckFailed(response));
      throw error;
    });
};
