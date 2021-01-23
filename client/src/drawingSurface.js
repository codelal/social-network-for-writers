import axios from "./axios";
import { socket } from "./socket";
import { useEffect, useState } from "react";

export default function DrawingSurface() {
    const [canvasInput, setCanvasInput] = useState("");
    const [error, setError] = useState(false);

    let dataUrl;

    useEffect(() => {
        console.log("useEffect runs");
        socket.on("canvas drawing", (data) => {
            console.log("canvas in useEffect", data);
            let canvas = document.querySelector("canvas");
            let ctx = canvas.getContext("2d");
            let image = new Image();
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data.dataUrl;
        });

        drawOnCanvas();

    }, [canvasInput]);

    function drawOnCanvas() {
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
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
            console.log("canvas data befor url", canvas);
            clickStart = false;
            ctx.beginPath();
            dataUrl = canvas.toDataURL();
            // console.log("dataUrl3", dataUrl);
            setCanvasInput(dataUrl);
            socket.emit("canvas drawing", dataUrl);
        });
    }

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
