/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render } from "@testing-library/react";
 import RatingChart from "../../client/src/components/ratingsReviews/components/RatingChart.jsx";

 describe("RatingChart Component", function () {
   it("should create a bar chart", function () {
     let { getByRole } = render(<RatingChart />);
     expect(getByRole("chart")).toMatchInlineSnapshot(`
     <div
       class="content c-white"
       role="chart"
     >
       <div
         class="recharts-responsive-container"
         style="width: 100%; height: 200px;"
       />
     </div>
     `);
   });
 });