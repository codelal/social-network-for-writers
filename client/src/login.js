import { Component } from "react";
import axios from "./axios";

export default class login extends Component {
    constructor() {
        super();
        this.state = {
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
            <>
                <h1>login</h1>
                {this.state.error && <p>Something went wrong, try again!</p>}
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
            </>
        );
    }
}
