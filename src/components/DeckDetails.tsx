import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { getDeck } from "../store/deck/actions";
import { Card } from "../store/deck/types";
import orderCardsByRotation from "../util/cards";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#258600",
    height: 136,
  },
  text: {
    color: "#FBE500",
    fontSize: 48,
    textAlign: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#DFF4F7",
    flexGrow: 1,
  },
});

const DeckDetails = () => {
  const classes = useStyles();
  const { deckId } = useParams();
  const dispatch = useDispatch();

  const deck = useSelector((state: RootState) => state.deck.deck);
  const [orderedCards, setOrderedCards] = useState<Card[]>([]);

  useEffect(() => {
    if (deckId) {
      dispatch(getDeck(deckId));
    }
  }, [deckId, dispatch]);

  useEffect(() => {
    if (deck && deck.rotationCard) {
      setOrderedCards(orderCardsByRotation(deck.cards, deck.rotationCard));
    }
  }, [deck]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.text}>Ordered Pile</h1>
      </div>
    </div>
  );
};

export default DeckDetails;
