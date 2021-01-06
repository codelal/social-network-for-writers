import { Component } from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email:"",
            url:"",
            uploaderIsVisible: false,
        };
    }
    componentDidMount() {
        console.log("componentDidMount runs");
        axios.get("/profile").then(({ data }) => {
            console.log(
                "res from get /profile",
                data
            );
            this.setState({
                first: data[0].first,
                last: data[0].last,
                email: data[0].email,
                url: data[0].url
            });
        });
    }
    toggleUploader() {
        //console.log("toggleUploader runs");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(image) {
        console.log("in App image from uploader", image);
        this.setState({
            profilePic: image,
        });
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <Profilepic
                    url={this.state.url}
                    first={this.state.first}
                    last={this.state.last}
                    email={this.state.email}
                />
                <h2 onClick={() => this.toggleUploader()}>
                    click for demo purpose
                </h2>
                {this.state.uploaderIsVisible && (
                    <Uploader uploadImage={(image) => this.setImage(image)} />
                )}
            </div>
        );
    }
}
