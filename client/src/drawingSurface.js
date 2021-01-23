import axios from "./axios";
import { socket } from "./socket";
import { useEffect, useState } from "react";

export default function DrawingSurface({ color, size }) {
    const [canvasInput, setCanvasInput] = useState("");
    const [error, setError] = useState(false);

    let dataUrl;

    useEffect(() => {
        let abort;
        console.log("useEffect runs");

        let clickStart;
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = "round";

        if (!abort) {
            socket.on("canvas drawing", (data) => {
                console.log("canvas in useEffect");
                let image = new Image();
                image.onload = () => {
                    ctx.drawImage(image, 0, 0);
                };
                image.src = data.dataUrl;
            });

            function draw(e) {
                ctx.lineTo(
                    e.pageX - canvas.offsetLeft,
                    e.pageY - canvas.offsetTop
                );
                ctx.stroke();
                console.log(
                    "ctx.strokeStyle,ctx.lineWidth",
                    ctx.strokeStyle,
                    ctx.lineWidth
                );
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
                    // let timeout;
                    // if (timeout != undefined) {
                    //     clearTimeout(timeout);
                    // }
                    //     timeout = setTimeout(function () {
                    //         dataUrl = canvas.toDataURL();
                    //     }, 100);
                    //     // console.log("dataUrl3", dataUrl);
                    //     setCanvasInput(dataUrl);
                    //     socket.emit("canvas drawing", dataUrl);
                }
            });

            canvas.addEventListener("mouseup", function () {
                clickStart = false;
                ctx.beginPath();
                dataUrl = canvas.toDataURL();
                setCanvasInput(dataUrl);
                socket.emit("canvas drawing", dataUrl);
            });
        }

        return () => {
            abort = true;
        };
    }, [canvasInput]);

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
