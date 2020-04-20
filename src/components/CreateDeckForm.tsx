import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Formik, Form } from "formik";

import FormField from "./FormField";
import { createDeck } from "../store/deck/actions";
import { RootState } from "../store";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: "flex",
  },
});

interface DeckFormValues {
  [key: string]: string;
  card1: string;
  card2: string;
  card3: string;
  card4: string;
  card5: string;
  card6: string;
  card7: string;
  card8: string;
  card9: string;
  card10: string;
  rotation: string;
}

const initialValues: DeckFormValues = {
  card1: "",
  card2: "",
  card3: "",
  card4: "",
  card5: "",
  card6: "",
  card7: "",
  card8: "",
  card9: "",
  card10: "",
  rotation: "",
};

const CreateDeckForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const deckId = useSelector(
    (state: RootState) => state.deck.lastCreatedDeckId
  );

  useEffect(() => {
    if (deckId) {
      history.push(`/deck/${deckId}`);
    }
  }, [deckId, history]);

  const handleSubmit = async (values: DeckFormValues) => {
    const cards: string[] = [];

    const valueKeys = Object.keys(values);

    valueKeys.forEach((key) => {
      if (values[key] !== "") {
        cards.push(values[key]);
      }
    });

    const rotation = cards.pop()!;

    dispatch(createDeck(cards, rotation));
  };

  return (
    <div className={classes.root}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className={classes.flex}>
            <FormField name="card1" label="CARD 1" placeholder="Enter card" />
            <FormField name="card2" label="CARD 2" placeholder="Enter card" />
            <FormField name="card3" label="CARD 3" placeholder="Enter card" />
            <FormField name="card4" label="CARD 4" placeholder="Enter card" />
            <FormField name="card5" label="CARD 5" placeholder="Enter card" />
          </div>
          <div className={classes.flex}>
            <FormField name="card6" label="CARD 6" placeholder="Enter card" />
            <FormField name="card7" label="CARD 7" placeholder="Enter card" />
            <FormField name="card8" label="CARD 8" placeholder="Enter card" />
            <FormField name="card9" label="CARD 9" placeholder="Enter card" />
            <FormField name="card10" label="CARD 10" placeholder="Enter card" />
          </div>
          <FormField
            name="rotation"
            label="Rotation Card"
            placeholder="Enter card"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateDeckForm;
