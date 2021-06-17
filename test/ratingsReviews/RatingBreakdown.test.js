/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render } from "@testing-library/react";
 import RatingBreakdown from "../../client/src/components/ratingsReviews/components/RatingBreakdown.jsx";

 describe("RatingBreakdown Component", function () {
   it("should render a chart displaying the star ratings", function () {
     let { getByRole } = render(<RatingBreakdown />);
     expect(getByRole("")).toMatchInlineSnapshot(`

     `);
   });
 });