import { useSelector } from "react-redux";
import { socket } from "./socket";
import { useEffect, useRef } from "react";
import DrawingSurface from "./drawingSurface";

export default function WhiteBoard() {
    return (
        <div className="whiteboard-container">
            <h1>WhiteBoard</h1>
            <div className="color-picker">
                <input type="color" />
                <DrawingSurface />
            </div>
        </div>
    );
}
