import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            email: "",
            code: "",
            password: "",
            view: 1,
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

    handleSubmitEmail() {
        var formData = {
            email: this.state.email,
        };
        console.log("formdata", formData);

        axios
            .post("/reset/password", formData)
            .then((res) => {
                console.log("res post/reset/password", res);
                if (res.data[0].id) {
                    this.setState({
                        view: 2,
                    });
                }
            })
            .catch((err) => {
                console.log("error in post/reset/password", err);
                this.setState({
                    error: true,
                });
            });
    }

    handleSubmitCodeAndNewPW() {
        var formData = {
            code: this.state.code,
            password: this.state.password,
        };
        console.log("formdata", formData);

        axios
            .post("/reset/password/verify", formData)
            .then((res) => {
                console.log("res post/reset-password", res);
                if (res.data[0].id) {
                    this.setState({
                        view: 3,
                    });
                }
            })
            .catch((err) => {
                console.log("error in post/registration", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <>
                <h1>Reset Password</h1>
                {this.state.error && <p>Something went wrong, try again!</p>}

                {this.state.view === 1 && (
                    <>
                        <p>
                            Please enter the email adress with which you
                            registered
                        </p>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="email"
                            placeholder="email"
                            type="text"
                            required=""
                        />
                        <button onClick={() => this.handleSubmitEmail()}>
                            Submit
                        </button>
                    </>
                )}

                {this.state.view === 2 && (
                    <>
                        <p>Please enter the code you received via Email</p>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="code"
                            placeholder="code"
                            type="text"
                            required=""
                        />
                        <p>Please enter a new password</p>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="password"
                            placeholder="password"
                            type="password"
                            required=""
                        />
                        <button onClick={() => this.handleSubmitCodeAndNewPW()}>
                            Submit
                        </button>
                    </>
                )}

                {this.state.view === 3 && (
                    <>
                        <p>Success!</p>
                        <p>
                            You can now <Link to="/login">login </Link>with you
                            new password
                        </p>
                    </>
                )}
            </>
        );
    }
}
