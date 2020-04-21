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
    display: "flex",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  fieldsContainer: {
    display: "flex",
    flexWrap: "wrap",
    margin: "40px auto 0 auto",
    width: 1360,
  },
  fieldContainer: {
    margin: 10,
  },
  submit: {
    backgroundColor: "#1C0063",
    color: "#FBE500",
    fontSize: 40,
    padding: "10px 55px",
    border: "none",
    borderRadius: 25,
    fontFamily: "sans-serif",
    margin: "0 auto 70px auto",
    display: "block",
  },
  rotationContainer: {
    margin: "50px auto",
    padding: "0 50px 0 0",
    width: 600,
    display: "flex",
  },
  rotationText: {
    fontSize: 36,
    display: "inline-block",
    fontFamily: "sans-serif",
    textAlign: "right",
  },
  rotationInput: {
    display: "inline-block",
    margin: "0 0 0 15px",
    verticalAlign: "middle",
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

const fields: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
        <Form className={classes.form}>
          <div className={classes.fieldsContainer}>
            {fields.map((fieldNumber) => {
              return (
                <div key={fieldNumber} className={classes.fieldContainer}>
                  <FormField
                    name={`card${fieldNumber}`}
                    label={`CARD ${fieldNumber}`}
                    placeholder="Enter card"
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.rotationContainer}>
            <label className={classes.rotationText}>Rotation Card</label>
            <FormField
              className={classes.rotationInput}
              name="rotation"
              placeholder="Enter card"
            />
          </div>
          <div className={classes.flexGrow} />

          <button className={classes.submit} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateDeckForm;
