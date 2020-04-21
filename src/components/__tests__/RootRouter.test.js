import React from "react";
import { shallow } from "enzyme";
import RootRouter from "../RootRouter";

describe("RootRouter", () => {
  it("renders without crashing", () => {
    shallow(<RootRouter />);
  });
});
