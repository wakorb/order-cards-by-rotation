import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import CreateDeck from "./CreateDeck";
import DeckDetails from "./DeckDetails";

const RootRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/deck/new" component={CreateDeck} />
        <Route path="/deck/:deckId" component={DeckDetails} />
        <Redirect to="/deck/new" />
      </Switch>
    </Router>
  );
};

export default RootRouter;
