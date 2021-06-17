/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render } from "@testing-library/react";
 import Review from "../../client/src/components/ratingsReviews/components/Review.jsx";

 describe("Review Component", function () {
   it("should render a review", function () {
     let { getByRole } = render(<Review />);
     expect(getByRole("")).toMatchInlineSnapshot();
   });
 });