import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { Card } from "../store/deck/types";

const useStyles = makeStyles({
  card: {
    width: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  cardTop: {
    fontSize: 35,
    padding: "6px 0px 0px 12px",
  },
  cardBottom: {
    fontSize: 35,
    transform: "rotate(180deg)",
    padding: "6px 0px 0px 12px",
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
      <div className={clsx(classes.cardTop, classes[card.suit])}>{`${
        card.value[0]
      } ${SUIT_ICONS[card.suit]}`}</div>

      <div className={clsx(classes.cardBottom, classes[card.suit])}>{`${
        card.value[0]
      } ${SUIT_ICONS[card.suit]}`}</div>
    </div>
  );
};

export default DeckCard;
