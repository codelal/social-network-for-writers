import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    handleUpload(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/api/upload", formData)
            .then(({ data }) => {
                if (data.success) {
                    this.props.setImage(data.url);
                } else {
                    console.log("error in then() of post/upload");
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error catch of post/registration", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="uploader">
                {this.state.error && <p>Something went wrong, try again!</p>}
                <div id="close" onClick={this.props.toggleUploader}>
                    X
                </div>
                <h3>Upload a profile picture</h3>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="file"
                    type="file"
                    accept="image/*"
                />
                <button onClick={(e) => this.handleUpload(e)}>Upload</button>
            </div>
        );
    }
}
