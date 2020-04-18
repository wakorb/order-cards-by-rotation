import React from "react";

const CreateDeck = () => {
  const cards = ["AS", "AH", "AC"];
  return <div>Create a new deck - {`${cards.toString()}`}</div>;
};

export default CreateDeck;
