import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsList, handleRequest } from "./actions";
import { Link } from "react-router-dom";

export default function Texteditor() {
    return (
        <div className="container-texteditor">
            <h1>Texteditor</h1>
        </div>
    );
}
