import { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";

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
            error: false,
        };
    }

    componentDidMount() {
        // console.log("componentDidMount runs");
        axios
            .get("/api/profile")
            .then(({ data }) => {
                this.setState({
                    first: data[0].first,
                    last: data[0].last,
                    email: data[0].email,
                    url: data[0].url,
                    bio: data[0].bio,
                });
            })
            .catch((err) => {
                console.log("error in post/login", err);
                this.setState({
                    error: true,
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
        // console.log("in App image from uploader", url);
        this.setState({
            url: url,
        });
    }

    setBio(bio) {
        console.log("bio in App", bio);
        this.setState({
            bio: bio,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <header>
                        <p className="logo">Logo</p>
                        <Link to="/find-people" className="find-people">
                            Find people
                        </Link>
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            email={this.state.email}
                            url={this.state.url}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    </header>
                    <Route path="/find-people" component={FindPeople} />

                    {this.state.error && (
                        <p>Something went wrong, try again!</p>
                    )}

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                email={this.state.email}
                                url={this.state.url}
                                toggleUploader={() => this.toggleUploader()}
                                bio={this.state.bio}
                                setBio={(bio) => this.setBio(bio)}
                            />
                        )}
                    />

                    <Route
                        path="/users/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route
                        path="/find-people/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setImage={(url) => this.setImage(url)}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
