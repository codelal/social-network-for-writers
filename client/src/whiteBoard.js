import { useSelector } from "react-redux";
import { socket } from "./socket";
import { useEffect, useState } from "react";
import DrawingSurface from "./drawingSurface";

export default function WhiteBoard() {
    const [colorInput, setColorInput] = useState("#257788");
    const [size, setSize] = useState("1");
    const [rubber, setRubber] = useState("#FFFFFF");

    return (
        <div className="whiteboard-container">
            <h1>WhiteBoard</h1>
            <div className="color-picker">
                Color : &nbsp;
                <input
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    type="color"
                />
            </div>
            <div className="brush-size">
                Brash Size : &nbsp;
                <select
                    value={size}
                    onChange={(e) => {
                        setSize(e.target.value);
                    }}
                >
                    <option>1</option>
                    <option>4</option>
                    <option>8</option>
                    <option>12</option>
                    <option>15</option>
                    <option>18</option>
                </select>
            </div>
            <div className="rubbers">
                Rubber: &nbsp;
            </div>

            <DrawingSurface color={colorInput} size={size} />
        </div>
    );
}
