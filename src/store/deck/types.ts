export const CREATE_DECK_STARTED = "CREATE_DECK_STARTED";
export const CREATE_DECK_SUCCEEDED = "CREATE_DECK_SUCCEEDED";
export const CREATE_DECK_FAILED = "CREATE_DECK_FAILED";

export const CREATE_DECK_PILE_STARTED = "CREATE_DECK_PILE_STARTED";
export const CREATE_DECK_PILE_SUCCEEDED = "CREATE_DECK_PILE_SUCCEEDED";
export const CREATE_DECK_PILE_FAILED = "CREATE_DECK_PILE_FAILED";

export const GET_DECK_STARTED = "GET_DECK_STARTED";
export const GET_DECK_SUCCEEDED = "GET_DECK_SUCCEEDED";
export const GET_DECK_FAILED = "GET_DECK_FAILED";

interface CreateDeckStartedAction {
  type: typeof CREATE_DECK_STARTED;
}

interface CreateDeckSucceededAction {
  type: typeof CREATE_DECK_SUCCEEDED;
  deckId: string;
}

interface CreateDeckFailedAction {
  type: typeof CREATE_DECK_FAILED;
  error: string;
}

interface GetDeckStartedAction {
  type: typeof GET_DECK_STARTED;
}

interface GetDeckSucceededAction {
  type: typeof GET_DECK_SUCCEEDED;
  deck: Deck;
}

interface GetDeckFailedAction {
  type: typeof GET_DECK_FAILED;
  error: string;
}

export type DeckActionTypes =
  | CreateDeckStartedAction
  | CreateDeckSucceededAction
  | CreateDeckFailedAction
  | GetDeckStartedAction
  | GetDeckSucceededAction
  | GetDeckFailedAction;

export interface DeckState {
  deck?: Deck;
  lastCreatedDeckId: string;
  createDeckPending: boolean;
  createDeckError: string;
  getDeckLoading: boolean;
  getDeckError: string;
}

export interface Deck {
  deckId: string;
  rotationCard?: Card;
  cards: Card[];
}

export interface Card {
  code: string;
  image: string;
  value:
    | "2"
    | "A"
    | "K"
    | "Q"
    | "J"
    | "10"
    | "9"
    | "8"
    | "7"
    | "6"
    | "5"
    | "4"
    | "3";
  suit: "HEARTS" | "DIAMONDS" | "CLUBS" | "SPADES";
}

export interface CardPile {
  cards: Card[];
}

export interface PileListResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  piles: {
    [pile: string]: CardPile;
  };
}
