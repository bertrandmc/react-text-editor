import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  // sorry, just quick dirty fix so I can continue without spending time configuring jest
  window.scrollTo = jest.fn();
});

test("renders without crashing", () => {
  expect(() => render(<App />)).not.toThrow();
});
