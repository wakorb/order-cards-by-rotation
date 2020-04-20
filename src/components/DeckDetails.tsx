import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { getDeck } from "../store/deck/actions";
import { Card } from "../store/deck/types";
import { orderCardsByRotation } from "../util/cards";
import DeckCard from "./Card";

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
  cardContainer: {
    display: "flex",
    border: "1px #0000FF",
    backgroundColor: "#D8D8D8",
    padding: 20,
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
      <div className={classes.cardContainer}>
        {orderedCards.length &&
          orderedCards.map((card) => {
            return <DeckCard card={card} />;
          })}
      </div>
    </div>
  );
};

export default DeckDetails;
