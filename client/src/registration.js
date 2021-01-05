import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";


export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        if (e.target.email == "") {
            this.setState({ error: true });
        }
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
            // () => console.log("this.state in handleChange", this.state.first)
        );
    }

    handleSubmit() {
        var formData = {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password,
        };
        //console.log("formdata", formdata);

        axios
            .post("/registration", formData)
            .then((res) => {
                if (res.data[0].id) {
                    location.replace("/");
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
                <h1>Registration</h1>

                {this.state.error && <p>Something went wrong, try again!</p>}
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
                <Link to="/login"> Already a member? Click here to Log in!</Link>
            </>
        );
    }
}


