import { Component } from "react";
//import axios from "./axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //bekommt server automatisch wenn /:// match is object, das object gat das params hat und dort findet sich die id

        console.log(
            "this.props.match:",
            this.props.match,
            this.props.match.params.id
        );

        // if (this.props.match.params.id == 34) {
        //     this.props.history.push("/");
        // }

        //id anpassen
    }

    render() {
        return (
            <div>
                <h1>Other Component</h1>
                <h2>oher stuff</h2>
            </div>
        );
    }
}
