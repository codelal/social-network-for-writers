import { Component } from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import BioEditor from "./BioEditor";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            url: "",
            bio: "",
            uploaderIsVisible: false,
        };
    }
    componentDidMount() {
        // console.log("componentDidMount runs");
        axios.get("/profile").then(({ data }) => {
            console.log("res from get /profile", data);
            this.setState({
                first: data[0].first,
                last: data[0].last,
                email: data[0].email,
                url: data[0].url,
                bio: data[0].bio,
            });
        });
    }
    toggleUploader() {
        console.log("toggleUploader runs");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(url) {
        console.log("in App image from uploader", url);
        this.setState({
            url: url,
        });
    }

    render() {
        return (
            <div>
                <header>
                    <p className="logo">Logo</p>
                    <Profilepic
                        first={this.state.first}
                        last={this.state.last}
                        email={this.state.email}
                        url={this.state.url}
                        toggleUploader={() => this.toggleUploader()}
                    />
                </header>
                <Profile
                    url={this.state.url}
                    toggleUploader={() => this.toggleUploader()}
                    first={this.state.first}
                    last={this.state.last}
                    email={this.state.email}
                />
                <BioEditor />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={(url) => this.setImage(url)}
                        toggleUploader={() => this.toggleUploader()}
                    />
                )}
            </div>
        );
    }
}
