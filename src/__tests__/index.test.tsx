// __tests__/index.test.jsx

import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("renders something", () => {
    render(<Home />);
    // screen.debug();

    // const div = screen.getByRole("div");
    // expect(div).toBeInTheDocument();
  });
});
