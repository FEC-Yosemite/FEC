/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import SortReviews from "../../client/src/components/ratingsReviews/components/SortReviews.jsx";

describe("SortReviews Component", function () {
  it("should have a sort selector", function () {
    let { getByRole } = render(<SortReviews />);
    expect(getByRole("combobox")).toMatchInlineSnapshot(`
      <select
        id="sort-select"
      >
        <option
          selected=""
          value="relevant"
        >
          relevance
        </option>
        <option
          value="newest"
        >
          newest
        </option>
        <option
          value="helpful"
        >
          helpfulness
        </option>
      </select>
    `);
  });
});