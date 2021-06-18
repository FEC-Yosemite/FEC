/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render, fireEvent } from "@testing-library/react";
 import Review from "../client/src/components/ratingsReviews/components/Review.jsx";

 describe("Review Component", function () {

  const reviewData = {
    "review_id": 406947,
    "rating": 3,
    "summary": "Howdy",
    "recommend": true,
    "response": null,
    "body": "ljsfslkjdflksjdflksjdfljsdlfjslfjsldjflskdjflsjdflkjsdfljsdlfjsldjflsdjflsdjflsjdflsjdflsjdflsjdflk",
    "date": "2021-06-16T00:00:00.000Z",
    "reviewer_name": "Lexus",
    "photos": []
  };

  const initialHelpfulReviewCount = 2;

  reviewData.helpfulness = initialHelpfulReviewCount;

  // const initialExpectedText = `(${initialHelpfulReviewCount})`;
  // const incrementedExpectedText = `${Number(initialHelpfulReviewCount) + 1}`;

   it("should render a review", function () {
    let { getByText, getAllByRole } = render(<Review review={reviewData} />);
    // check that initial value of helpfulCount === 2
    // translates to: check if text "(2)" is on the screen
    expect(getByText(initialHelpfulReviewCount)).toBeTruthy();
    // click "Yes" to signify it was helpful
    const allButtons = getAllByRole('button');
    const yesButton = allButtons[0];
    fireEvent.click(yesButton);
    // check that the helpfulCount === 3
    expect(getByText(initialHelpfulReviewCount + 1)).toBeTruthy();
   });
 });