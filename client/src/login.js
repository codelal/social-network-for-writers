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
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
            // () => console.log("this.state in handleChange", this.state.first)
        );
    }

    handleSubmit() {
        var formData = {
            email: this.state.email,
            password: this.state.password,
        };
        //console.log("formdata", formdata);

        axios
            .post("/login", formData)
            .then((res) => {
                console.log("res.data.sucess", res, res.data, res.data.sucess);
                if (res.data.id) {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("error in post/login", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="childs-welcome-container">
                <h2>login</h2>
                {this.state.error && (
                    <p className="error">
                        Something went wrong, try again!
                    </p>
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
