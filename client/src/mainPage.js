import { Component } from "react";
import axios from "./axios";
import FriendButton from "./friendButton";
import { Link } from "react-router-dom";

export default function MainPage() {
    return (
        <div className="mainPage">
            <div className="main1">
                <Link to="/whiteBoard">WhiteBoard</Link>
            </div>

            <div className="main2">
                {" "}
                <Link to="/texteditor">Texteditor</Link>
            </div>
            <div className="main3">
                <Link to="/chat" className="chat">
                    Chat
                </Link>
            </div>
            <div className="main4">
                {" "}
                <Link to="/" className="find-people">
                    Privatspace
                </Link>
            </div>
        </div>
    );
}
