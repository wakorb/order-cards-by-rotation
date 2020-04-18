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
  payload: any;
}

interface CreateDeckFailedAction {
  type: typeof CREATE_DECK_FAILED;
  error: string;
}

interface CreateDeckPileStartedAction {
  type: typeof CREATE_DECK_PILE_STARTED;
}

interface CreateDeckPileSucceededAction {
  type: typeof CREATE_DECK_PILE_SUCCEEDED;
  payload: any;
}

interface CreateDeckPileFailedAction {
  type: typeof CREATE_DECK_PILE_FAILED;
  error: string;
}

interface GetDeckStartedAction {
  type: typeof GET_DECK_STARTED;
}

interface GetDeckSucceededAction {
  type: typeof GET_DECK_SUCCEEDED;
  payload: any;
}

interface GetDeckFailedAction {
  type: typeof GET_DECK_FAILED;
  error: string;
}

export type DeckActionTypes =
  | CreateDeckStartedAction
  | CreateDeckSucceededAction
  | CreateDeckFailedAction
  | CreateDeckPileStartedAction
  | CreateDeckPileSucceededAction
  | CreateDeckPileFailedAction
  | GetDeckStartedAction
  | GetDeckSucceededAction
  | GetDeckFailedAction;

export interface DeckState {
  byId: object;
  allIds: string[];
  createDeckPending: boolean;
  createDeckError: string;
  getDeckLoading: boolean;
  getDeckError: string;
}
