import React from "react";
import ProfilePic from "./ProfilePic";
import { render, fireEvent } from "@testing-library/react";


// test(`when no url is passed, /default.jpg is used as src`, () => {
//     const { container } = render(<ProfilePic />);
//     console.log(container.querySelector("img"));
//     expect(container.querySelector("img").src).endWith("/defaultpic.png").toBe(true);
// });

// test(`when url is passed as a prop url is set as the value of the  src attribute`, () => {
//     const { container } = render(<ProfilePic url="www"/>);
//     console.log(container.querySelector("img").src);
//     expect(container.querySelector("img").src).toBe("http://localhost/www");
// });

// test(`When first and last props are passed, first and last are assigned as values of the alt attribute`, () => {
//     const { container } = render(<ProfilePic first="anna" last="schwarz" />)
//         .expect(container.querySelector("img").alt)
//         .toBe("anna schwarz");
// });

test("onClick prop runs when the img is clicke", () => {
    const mockOnClick = jest.fn();
    const { container } = render(<ProfilePic onClick ={mockOnClick} />);
//when man mehrere Clicks testen will, kann das fireEvent entsprechend oft kopiert werden
    fireEvent.click(container.querySelector("img"));
    expect(mockOnClick.mock.calls.length).toBe(1);
});
