import { render } from "@testing-library/react";

import Tiki from "./Tiki";

const tiki = {
  name: "tiki-name",
  image: "tiki-image",
};

test("renders Tiki component", () => {
  render(<Tiki tiki={tiki} />);
});
