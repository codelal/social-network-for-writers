import axios from "./axios";
import { socket } from "./socket";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DrawingSurface() {
    const [canvasInput, setCanvasInput] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        socket.on("canvas drawing", (data) => {
            setCanvasInput(data);
        });

        const canvas = document.querySelector("canvas");
        //console.log("canvas", canvas);
        let ctx = canvas.getContext("2d");
        //console.log("ctx", ctx);
        let dataUrl;
        let clickStart;

        function draw(e) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
            ctx.stroke();
        }

        canvas.addEventListener("mousedown", function (e) {
            console.log("mousedown works");
            clickStart = true;
            draw(e);
        });

        canvas.addEventListener("mousemove", function (e) {
            console.log("mousemove works");
            if (!clickStart) {
                return;
            } else {
                draw(e);
            }
        });

        canvas.addEventListener("mouseup", function () {
            clickStart = false;
            ctx.beginPath();
            dataUrl = canvas.toDataURL();
            // console.log("dataUrl", dataUrl);
            setCanvasInput(dataUrl);
            socket.emit("canvas drawing", canvas);
        });

        console.log("canvasInput", canvasInput);
    }, []);

    function submitDrawing() {
        console.log("submitDrawing works");

        let data = {
            drawingUrl: canvasInput,
        };
        console.log("canvas", data);

        axios
            .post("/api/whiteboard", data)
            .then((data) => {
                console.log("data from /api/whiteboard", data);
            })
            .catch((err) => {
                console.log("error in api/latest-users", err);
                setError(true);
            });
    }

    return (
        <div className="drawing-surface">
            <h1>Drawing-Surface</h1>
            <canvas width="500" height="150">
                <input
                    className="canvasInput"
                    type="hidden"
                    name="canvasInput"
                />
            </canvas>
            <button
                onClick={submitDrawing}
                className="button-save"
                type="submit"
            >
                Save
            </button>
        </div>
    );
}
