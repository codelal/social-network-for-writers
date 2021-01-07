import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaIsVisible: false,
            bio: "", // onChange eventHandler
        };
    }

    toggleTextarea() {
        this.setState({
            textareaIsVisible: !this.state.textareaIsVisible,
        });
    }

    handleChange(e) {
        this.setState({
            bio: e.target.value,
        });
    }

    submitBio() {
        var data = { bio: this.state.bio };
        console.log("upload bio runs", data.bio);

        axios
            .post("/update/bio", data)
            .then((res) => {
                console.log(res);
                if (res.data.sucess) {
                    this.props.setBio(this.state.bio);

                    //toggle textarea dissapear
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
            <div className="bio-editor-container">
                <h1>BioEditor</h1>
                {this.state.textareaIsVisible && (
                    <div>
                        <textarea onChange={(e) => this.handleChange(e)} />
                        <button onClick={() => this.submitBio()}>
                            send Bio
                        </button>
                    </div>
                )}
                <button onClick={() => this.toggleTextarea()}>Edit Bio</button>
                <button onClick={() => this.toggleTextarea()}>Add Bio</button>
            </div>
        );
    }
}
