import React from "react";
import { shallow } from "enzyme";
import FormField from "../FormField";

describe("FormField", () => {
  it("renders without crashing", () => {
    shallow(<FormField />);
  });
});
