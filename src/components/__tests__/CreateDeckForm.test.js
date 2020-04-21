import React from "react";
import { shallow } from "enzyme";
import CreateDeckForm from "../CreateDeckForm";

describe("DeckCard", () => {
  it("renders without crashing", () => {
    shallow(<CreateDeckForm />);
  });
});
