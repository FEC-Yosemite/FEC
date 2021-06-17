/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render } from "@testing-library/react";
 import ProductBreakdown from "../../client/src/components/ratingsReviews/components/ProductBreakdown.jsx";

 describe("ProductBreakdown Component", function () {
   it("should have chart showing characteristics", function () {
     let { getByRole } = render(<ProductBreakdown />);
     expect(getByRole("")).toMatchInlineSnapshot(`

     `);
   });
 });