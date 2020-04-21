import React from "react";
import { shallow } from "enzyme";
import DeckDetails from "../DeckDetails";

describe("DeckCard", () => {
  it("renders without crashing", () => {
    shallow(<DeckDetails />);
  });
});
