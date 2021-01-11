import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaIsVisible: false,
            
        };
    }

    toggleTextarea() {
        this.setState({
            textareaIsVisible: !this.state.textareaIsVisible,
            bio: this.props.bio  
        });
    }

    handleChange(e) {
        this.setState({
            bio: e.target.value
        });
    }

    submitBio() {
        var data = { bio: this.state.bio };
        // console.log("upload bio runs", data.bio);

        axios
            .post("/api/update/bio", data)
            .then(({ data}) => {
                if (data.success) {
                    this.props.setBio(data.bio);
                    this.setState({
                        textareaIsVisible: !this.state.textareaIsVisible,
                       
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error catch of /update/bio", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        let showBio = this.props.bio;
        let noBio = !this.props.bio;

        if (this.state.textareaIsVisible) {
            showBio = "";
            noBio = "";
        }

        return (
            <div className="bio-editor-container">
                <h1>BioEditor</h1>
                {this.state.error && <p>Something went wrong, try again!</p>}

                {noBio && (
                    <button onClick={() => this.toggleTextarea()}>
                        Add Bio
                    </button>
                )}

                {showBio && (
                    <div>
                        Bio:{this.props.bio}
                        <button onClick={() => this.toggleTextarea()}>
                            Edit Bio
                        </button>
                    </div>
                )}

                {this.state.textareaIsVisible && (
                    <div>
                        <textarea value = {this.state.bio} onChange={(e) => this.handleChange(e)} />
                        <button onClick={() => this.submitBio()}>
                            send Bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
