import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: false,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit() {
        var data = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log("formdata", data);

        axios
            .post("/api/login", data)
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                }
                if (!data.success) {
                    if (data.error == "empty input") {
                        this.setState({
                            error: "Please fill in all fields",
                        });
                    } else {
                        this.setState({
                            error:
                                "Something went wrong, make sure you enter you data correctly!",
                        });
                    }
                }
            })
            .catch((err) => {
                console.log("error in post/login", err);
                this.setState({
                    error: "Something went wrong, try again!",
                });
            });
    }

    render() {
        return (
            <div className="childs-welcome-container">
                <h2>login</h2>
                <img className="work-img" src="../vector1.png"></img>
                {this.state.error && (
                    <p className="error">{this.state.error}</p>
                )}
                <Link to="/reset-password">
                    click here, when you forgot your password!
                </Link>
                <div className="input-container">
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="email"
                        type="text"
                        required=""
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="password"
                        type="password"
                        required=""
                    />
                    <button onClick={() => this.handleSubmit()}>Submit</button>
                </div>
            </div>
        );
    }
}
