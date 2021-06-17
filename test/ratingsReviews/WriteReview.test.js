/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render } from "@testing-library/react";
 import WriteReview from "../../client/src/components/ratingsReviews/components/WriteReview.jsx";
 import ReviewsList from "../../client/src/components/ratingsReviews/components/ReviewsList.jsx";

 describe("WriteReview Component", function () {
   it("should render a modal window with review form", function () {
     let list = render(<ReviewsList />);
     ReviewsList.setState({ write : true })
     let { getByRole } = render(<WriteReview />);
     expect(getByRole("modal")).toMatchInlineSnapshot(`

     `);
   });
 });