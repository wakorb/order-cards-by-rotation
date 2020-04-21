import React from "react";
import { shallow } from "enzyme";
import DeckCard from "../DeckCard";

describe("DeckCard", () => {
  it("renders without crashing", () => {
    shallow(<DeckCard />);
  });
});
