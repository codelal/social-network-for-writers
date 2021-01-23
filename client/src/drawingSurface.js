import { useSelector } from "react-redux";
import { socket } from "./socket";
import { useEffect, useRef } from "react";

export default function DrawingSurface() {
    (function () {
        const canvas = document.querySelector("canvas");
        //console.log("canvas", canvas[0].offsetLeft);
        let ctx = canvas.getContext("2d");
        let canvasInput = document.querySelector(".canvasInput");
        let dataUrl;
        let clickStart;

        function draw(event) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.lineTo(
                event.pageX - canvas.offsetLeft,
                event.pageY - canvas.offsetTop
            );
            ctx.stroke();
        }

        canvas.on("mousedown", function (event) {
            clickStart = true;
            draw(event);
        });

        canvas.on("mousemove", function (event) {
            if (!clickStart) {
                return;
            } else {
                draw(event);
            }
        });

        canvas.on("mouseup", function () {
            clickStart = false;
            ctx.beginPath();
            dataUrl = canvas[0].toDataURL();
            canvasInput.val(dataUrl);
        });
    })();

    return (
        <div className="drawing-surface">
            <h1>Drawing-Surface</h1>
            <canvas width="500" height="150"><input className="canvasInput" type="hidden" name="signature" placeholder = "signature"/></canvas>
        </div>
    );
}
