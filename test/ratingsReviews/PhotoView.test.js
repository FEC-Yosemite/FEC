/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render } from "@testing-library/react";
 import PhotoView from "../../client/src/components/ratingsReviews/components/PhotoView.jsx";

 describe("PhotoView Component", function () {
   it("should render an image", function () {
     let { getByRole } = render(<PhotoView />);
     expect(getByRole("img")).toMatchInlineSnapshot(`
     <img
       id="expanded-image"
     />
     `);
   });

   it("should render a back button", function () {
    let { getByRole } = render(<PhotoView />);
    expect(getByRole("button")).toMatchSnapshot();
   });
 });