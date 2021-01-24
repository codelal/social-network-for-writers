import axios from "./axios";
import { socket } from "./socket";
import { useEffect, useState, useRef } from "react";

export default function DrawingSurface({ color, size }) {
    const [canvasInput, setCanvasInput] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {


        console.log("useEffect runs");
        let userIsDrawing = false;

        socket.on("canvas drawing", (data) => {
            console.log("canvas in useEffect");
            let image = new Image();
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data.dataUrl;
        });

        let dataUrl;
        let clickStart;
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = "round";

        function draw(e) {
            ctx.lineTo(
                e.clientX - canvas.offsetLeft,
                e.clientY - canvas.offsetTop
            );
            ctx.stroke();
            // console.log(
            //     "e.clientX - canvas.offsetLeft",
            //     e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop,
            //     e.clientX, e.clientY
            // );
        }

        canvas.addEventListener("mousedown", function (e) {
            clickStart = true;
            draw(e);
        });

        canvas.addEventListener("mousemove", function (e) {
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
            setCanvasInput(dataUrl);
            socket.emit("canvas drawing", dataUrl);
        });

    }, [canvasInput, color, size]);

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
