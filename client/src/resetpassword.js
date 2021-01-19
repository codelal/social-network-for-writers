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
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmitEmail() {
        let data = {
            email: this.state.email,
        };

        axios
            .post("/api/reset/password", data)
            .then(({ data }) => {
                if (data.success) {
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
        var data = {
            code: this.state.code,
            password: this.state.password,
        };

        axios
            .post("/api/reset/password/verify", data)
            .then(({ data }) => {
                if (data.success) {
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
            <div className="childs-welcome-container">
                <h1>Reset Password</h1>

                {this.state.view === 1 && (
                    <>
                        {this.state.error && (
                            <p className="error">
                                Something went wrong, try again!
                            </p>
                        )}
                        <h3 id="h3-reset-password">
                            Please enter the email adress with which you
                            registered
                        </h3>
                        <div className="input-container" id="reset-password">
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
                        </div>
                    </>
                )}

                {this.state.view === 2 && (
                    <>
                        {this.state.error && (
                            <p className="error">
                                Something went wrong, try again!
                            </p>
                        )}

                        <h3 id="h3-reset-password">
                            Please enter the code you received via Email and
                            enter a new Password
                        </h3>
                        <div className="input-container" id="reset-password">
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="code"
                                placeholder="code"
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
                            <button
                                onClick={() => this.handleSubmitCodeAndNewPW()}
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}

                {this.state.view === 3 && (
                    <>
                        <h2 id="h2-success">Success!</h2>
                        <p id="link-success-pw">
                            You can now <Link to="/login">login </Link>with you
                            new password
                        </p>
                    </>
                )}
            </div>
        );
    }
}
