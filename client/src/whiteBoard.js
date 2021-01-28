import { useSelector } from "react-redux";
import { socket } from "./socket";
import axios from "./axios";
import { useEffect, useState } from "react";
import { formateDateTime } from "./formateDate";
import OnlineUsers from "./onlineUsers";

let dataUrl;
let clickStart;
let canvas;
let ctx;

export default function WhiteBoard() {
    const [error, setError] = useState(false);
    const [colorInput, setColorInput] = useState("#000000");
    const [size, setSize] = useState("1");
    const [canvasInput, setCanvasInput] = useState("");
    const [latestWhiteboards, setLatestWhiteboards] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [drawingUser, setDrwaingUser] = useState(false);
    const [savedCanvas, setSavedCanvas] = useState(false);
    const [editModus, setEditModus] = useState(false);
    const [idForEditing, setIdForEditing] = useState();
    const [collaborativeChanges, setCollaborativeChanges] = useState("");
    const [
        answerCollaborativeChanges,
        setAnswerCollaborativeChanges,
    ] = useState("");

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
        ctx.lineCap = "round";

        if (!abort) {
            socket.on("canvas drawing", (data) => {
                //  console.log("canvas in useEffect");
                if (data.edit) {
                    setEditModus(true);
                }

                let image = new Image();
                image.onload = () => {
                    ctx.drawImage(image, 0, 0);
                };
                image.src = data.dataUrl;
            });

            socket.on("user is drawing", (data) => {
                console.log("user is drawing", data);
                if (data.isDrawing) {
                    setDrwaingUser(data.url);
                } else {
                    setDrwaingUser(false);
                }
            });

            socket.on("canvas collaborative changes", (data) => {
                console.log("collaborative changes");
                setCollaborativeChanges(
                    `${data.first} ${data.last} ${data.whiteBoardChanges.change}`
                );
            });

            socket.on("clear whiteboard", (data) => {
                console.log("clear whiteboard comes in", data);
                if (data.affirmation.affirm) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    setCollaborativeChanges("");
                    setAnswerCollaborativeChanges("confirmed! :)");
                } else {
                    setAnswerCollaborativeChanges(
                        `${data.first} ${data.last} is not ok with clearing the whiteboard`
                    );
                }
            });

            function draw(e) {
                ctx.lineTo(
                    e.pageX - canvas.offsetLeft,
                    e.pageY - canvas.offsetTop
                );
                ctx.stroke();
            }

            canvas.addEventListener("mousedown", function (e) {
                clickStart = true;
                draw(e);
                socket.emit("user is drawing");
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
                socket.emit("user stops drawing");
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
                    setSavedCanvas(true);
                }
            })
            .catch((err) => {
                console.log("error in api/latest-users", err);
                setError(true);
            });
    }

    function clearWhiteboard() {
        let whiteboardChanges = {
            change: "wants to clear the Whiteboard, are you ok with that?",
        };

        socket.emit("canvas collaborative changes", whiteboardChanges);
        setAnswerCollaborativeChanges(
            "please wait until you drawing-partner agrees :) "
        );
    }

    function handleChanges(answer) {
        console.log(answer);
        if (answer == "yes") {
            let affirmation = {
                affirm: true,
            };
            socket.emit("clear whiteboard", affirmation);
        } else if (answer == "no") {
            let affirmation = {
                affirm: false,
            };
            socket.emit("clear whiteboard", affirmation);
            setCollaborativeChanges("");
        } else if (answer == "close") {
            setAnswerCollaborativeChanges("");
        }
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

    function editWhiteboard(dataUrl, whiteboardId) {
        socket.emit("canvas edit", dataUrl);
        setEditModus(true);
        setIdForEditing(whiteboardId);
        setCanvasInput(dataUrl);
    }

    function saveChanges() {
        const data = {
            whiteboardId: idForEditing,
            drawingUrl: canvasInput,
        };

        console.log("update date", data);
        axios
            .post("/api/update-whiteboard", data)
            .then(({ data }) => {
                console.log("/api/update-whiteboard", data);
                if (data.success) {
                    setLatestWhiteboards(data.latestWhiteboards);
                    clearWhiteboard();
                    setEditModus(false);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error /api/update-whiteboard", err);
                setError(true);
            });
    }

    return (
        <div className="whiteboard-container">
            <div className="latest-whitebaords">
                <h3>Latest Whiteboards:</h3>
                {!latestWhiteboards.length && <p>no whiteboards yet</p>}
                {latestWhiteboards && (
                    <div className="whiteboard">
                        {latestWhiteboards.map((whiteboard) => (
                            <div key={whiteboard.id}>
                                <img src={whiteboard.drawing_url}></img>
                                <button
                                    onClick={() => {
                                        editWhiteboard(
                                            whiteboard.drawing_url,
                                            whiteboard.id
                                        );
                                    }}
                                >
                                    Edit
                                </button>
                                {!editModus && (
                                    <button
                                        onClick={() => {
                                            deleteWhiteboard(whiteboard.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div id="onliners-whiteboard">
                {" "}
                <OnlineUsers />
            </div>
            {error && (
                <p className="message-whiteboard">
                    Something went wrong,try again!
                </p>
            )}
            {savedCanvas && (
                <p className="saved-whiteboard">Whiteboard is saved!</p>
            )}
            <h1>Whiteboard</h1>
            <div className="tools-container">
                <div className="tool">
                    Color : &nbsp;
                    <input
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        type="color"
                    />
                </div>
                <div className="tool" id="brush">
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
                {drawingUser && (
                    <div className="tool" id="is-drawing">
                        <img src={drawingUser} /> <p>is drawing</p>
                    </div>
                )}
            </div>
            {collaborativeChanges && (
                <div className="coll-changes">
                    <p>{collaborativeChanges}</p>
                    <button onClick={() => handleChanges("yes")}>yes</button>
                    <button onClick={() => handleChanges("no")}>no</button>
                </div>
            )}
            {answerCollaborativeChanges && (
                <div className="coll-changes">
                    <p>{answerCollaborativeChanges}</p>
                    <button onClick={() => handleChanges("close")}>
                        close
                    </button>
                </div>
            )}

            <div className="drawing-surface">
                <canvas height="400px" width="800px"></canvas>

                {!editModus && (
                    <button
                        onClick={submitDrawing}
                        className="button-save"
                        type="submit"
                    >
                        Save
                    </button>
                )}
                {editModus && (
                    <button onClick={saveChanges}>Save Changes</button>
                )}

                <button onClick={clearWhiteboard}>Clear Whiteboard</button>
            </div>
        </div>
    );
}
