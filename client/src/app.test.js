// import React from "react";
// import App from "./App";
// import { render, waitForElement } from "@testing-library/react";
// import axios from "./axios";

// //create fake axios
// jest.mock("./axios");
// //fake axios response
// axios.get.mockResolvedValue({
//     data: {
//         id: "1",
//         first: "anna",
//         last: "schwarz",
//         url: "www.google.de",
//     },
// });

// test("app eventually renders the div", async () => {
//     const { container } = render(<App />);

//     console.log("container.innerHTML", container.innerHTML);

//     await waitForElement(() => container.querySelector("div"));

//     expect(container.querySelector("div").children.length).toBe(1);
});
