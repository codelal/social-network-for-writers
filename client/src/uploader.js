import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick() {
        console.log("props in Uploader", this.props.setImage);
        this.props.setImage("image");
        //image URL
    }


    render() {
        return (
            <div>
                <h1 onClick={() => this.handleClick()}>Uploader</h1>
            </div>
        );
    }
}
