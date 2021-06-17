/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render } from "@testing-library/react";
 import ReviewsList from "../../client/src/components/ratingsReviews/components/ReviewsList.jsx";

 describe("ReviewsList Component", function () {
   it("should have a list of reviews", function () {
     let { getByRole } = render(<ReviewsList />);
     expect(getByRole("reviews-list")).toMatchInlineSnapshot();
   });
 });