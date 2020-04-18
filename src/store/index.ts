import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import deckReducer from "./deck/reducers";

export const rootReducer = combineReducers({
  deck: deckReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let appliedMiddlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, appliedMiddlewares);

export default store;
