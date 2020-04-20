import React from "react";
import { makeStyles } from "@material-ui/styles";
import CreateDeckForm from "./CreateDeckForm";

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

const CreateDeck = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.text}>CARDS</h1>
      </div>
      <CreateDeckForm />
    </div>
  );
};

export default CreateDeck;
