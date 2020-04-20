import React from "react";
import { makeStyles } from "@material-ui/styles";

import { Card } from "../store/deck/types";

const useStyles = makeStyles({
  card: {
    width: 150,
    height: 220,
    borderRadius: 10,
    background: "#fff",
    boxShadow: "3px 3px 7px rgba(0,0,0,0.3)",
  },
  HEARTS: {
    color: "#ff0000",
  },
  DIAMONDS: {
    color: "#ff0000",
  },
  CLUBS: {
    color: "#000",
  },
  SPADES: {
    color: "#000",
  },
});

const SUIT_ICONS = {
  HEARTS: "♥",
  DIAMONDS: "♦",
  CLUBS: "♣",
  SPADES: "♠",
};

interface DeckCardProps {
  card: Card;
}

const DeckCard = (props: DeckCardProps) => {
  const { card } = props;
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes[card.suit]}>{SUIT_ICONS[card.suit]}</div>
      {card.value}
    </div>
  );
};

export default DeckCard;
