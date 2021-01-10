import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: "",
        };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
        );
    }

    handleSubmit() {
        var formData = {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password,
        };
  

        axios
            .post("/registration", formData)
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                }
                if (!data.success) {
                    if (data.error == "empty input") {
                        this.setState({
                            error: "Please fill in all fields",
                        });
                    }
                    if (data.error == "email already exists") {
                        this.setState({
                            error:
                                "This Email already exsits, please enter a valid Email",
                        });
                    }
                    if (data.error == "no valid emailformat") {
                        this.setState({
                            error:
                                "This is not a valid Emailformat, please enter a valid email",
                        });
                    }
                } else {
                    this.setState({
                        error:
                            "Something went wrong, try again",
                    });
                }
            })
            .catch((err) => {
                console.log("error catch of post/registration", err);
                this.setState({
                    error: "Something went wrong, try again",
                });
            });
    }

    render() {
        console.log("this.state.errorType", this.state.errorType);
        return (
            <>
                <h1 className = "registration">Registration</h1>
                {this.state.error && <p className = "registration-error">{this.state.error}</p>}
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                    placeholder="first name"
                    type="text"
                    required=""
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    placeholder="last name"
                    type="text"
                    required=""
                />
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
                <Link to="/login">
                    {" "}
                    Already a member? Click here to Log in!
                </Link>
            </>
        );
    }
}
