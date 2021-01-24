import { useSelector } from "react-redux";
import { socket } from "./socket";
import axios from "./axios";
import { useEffect, useState } from "react";
import DrawingSurface from "./drawingSurface";

const formateDateTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(new Date(date));
};

export default function WhiteBoard() {
    const [error, setError] = useState(false);
    const [colorInput, setColorInput] = useState("#257788");
    const [size, setSize] = useState("1");
    const [rubber, setRubber] = useState("#FFFFFF");
    const [latestWhiteboards, setLatestWhiteboards] = useState([]);

    useEffect(() => {
        // let abort;

        axios
            .get("/api/latest-whiteboards")
            .then(({ data }) => {
                if (data.success) {
                    setLatestWhiteboards(data.latestWhiteboards);
                    console.log(data, data.latestWhiteboards);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in api/latest-setLatestWritebaords", err);
                setError(true);
            });

        // return () => {
        //     abort = true;
        // };
    }, []);

    return (
        <div className="whiteboard-container">
            <div className="latest-whitebaords">
                Latest Whiteboards:
                {latestWhiteboards && (
                    <div className="latest-whiteboards">
                        {latestWhiteboards.map((whiteboard) => (
                            <div key={whiteboard.id}>
                                <img src={whiteboard.drawing_url}></img>
                                Whiteboard from{" "}
                                {formateDateTime(whiteboard.timestamp)}
                                <button>Edit</button>
                                <button>Delete</button>
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
                <div className="tool">Rubber: &nbsp;</div>
            </div>

            <DrawingSurface color={colorInput} size={size} />
        </div>
    );
}
