import { useSelector } from "react-redux";
import { socket } from "./socket";
import axios from "./axios";
import { useEffect, useState } from "react";
import { formateDateTime } from "./formateDate";

let dataUrl;
let clickStart;
let canvas;
let ctx;

export default function WhiteBoard() {
    const [error, setError] = useState(false);
    const [colorInput, setColorInput] = useState("#257788");
    const [size, setSize] = useState("1");
    const [canvasInput, setCanvasInput] = useState("");
    const [latestWhiteboards, setLatestWhiteboards] = useState([]);
    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
        console.log("useEffect runs");
        let abort;

        axios
            .get("/api/latest-whiteboards")
            .then(({ data }) => {
                if (data.success) {
                    setLatestWhiteboards(data.latestWhiteboards);
                    //console.log(data, data.latestWhiteboards);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in api/latest-setLatestWritebaords", err);
                setError(true);
            });

        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        ctx.strokeStyle = colorInput;
        ctx.lineWidth = size;

        if (!abort) {
            socket.on("canvas drawing", (data) => {
                //  console.log("canvas in useEffect");
                let image = new Image();
                image.onload = () => {
                    ctx.drawImage(image, 0, 0);
                };
                image.src = data.dataUrl;
            });

            ctx.lineCap = "round";

            function draw(e) {
                ctx.lineTo(
                    e.clientX - canvas.offsetLeft,
                    e.clientY - canvas.offsetTop
                );
                ctx.stroke();
             
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
        }

        return () => {
            abort = true;
        };
    }, [canvasInput, colorInput, size, updateList]);

    function submitDrawing() {
        let data = {
            drawingUrl: canvasInput,
        };

        axios
            .post("/api/whiteboard", data)
            .then(({ data }) => {
                console.log("data from /api/whiteboard", data);
                if (data.success) {
                    setUpdateList(true);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            })
            .catch((err) => {
                console.log("error in api/latest-users", err);
                setError(true);
            });
    }

    function clearWhiteboard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function deleteWhiteboard(whiteboardId) {
        console.log("delete runs");
        const boardId = {
            boardId: whiteboardId,
        };
        axios
            .post("/api/delete-board", boardId)
            .then(({ data }) => {
                if (data.success) {
                    setLatestWhiteboards(data.latestWhiteboards);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in /api/delete-board", err);
                this.setState({
                    error: true,
                });
            });
    }

    return (
        <div className="whiteboard-container">
            <div className="latest-whitebaords">
                Latest Whiteboards:
                {!latestWhiteboards.length && <p>no whiteboards yet</p>}
                {latestWhiteboards && (
                    <div className="latest-whiteboards">
                        {latestWhiteboards.map((whiteboard) => (
                            <div key={whiteboard.id}>
                                <img src={whiteboard.drawing_url}></img>
                                Whiteboard from{" "}
                                {formateDateTime(whiteboard.timestamp)}
                                <button
                                    onClick={() => {
                                        deleteWhiteboard(whiteboard.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && <p className="error">Something went wrong,try again!</p>}

            <h1>WhiteBoard</h1>
            <div className="tools-container">
                <div className="tool">
                    Color : &nbsp;
                    <input
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        type="color"
                    />
                </div>
                <div className="tool">
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
            </div>

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
                    Save and Close
                </button>

                <button onClick={clearWhiteboard}>Clear Whiteboard</button>
            </div>
        </div>
    );
}
