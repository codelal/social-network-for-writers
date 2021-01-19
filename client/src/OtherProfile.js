import { Component } from "react";
import axios from "./axios";
import FriendButton from "./friendButton";
import { Link } from "react-router-dom";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidMount() {
        axios
            .get(`/api/users/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (data.success) {
                    if (data.loggedInId == this.props.match.params.id) {
                        this.props.history.push("/");
                    } else {
                        if (!data.url) {
                            data.url = "../defaultpic.png";
                        }
                        this.setState({
                            first: data.first,
                            last: data.last,
                            email: data.email,
                            url: data.url,
                            bio: data.bio,
                        });
                    }
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error in post/login", err);
                this.setState({
                    error: true,
                });
            });
    }
    redirect() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="other-profile-container">
                {this.state.error && (
                    <p className="error-other-profile">
                        Something went wrong, probably this user doenst exists!
                        Try it again or{" "}
                        <Link to="/"> here </Link> or you profile
                    </p>
                )}

                <img src={this.state.url} alt="PROFILE - PIC" />
                <h3>
                    {this.state.first} {this.state.last}
                </h3>
                <p>My Bio: {this.state.bio}</p>
                <FriendButton otherUserId={this.props.match.params.id} />
            </div>
        );
    }
}
