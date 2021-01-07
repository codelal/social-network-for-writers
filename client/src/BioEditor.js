import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaIsVisible: false,
            draftBio: "", // onChange eventHandler
        };
    }

    toggleTextarea() {
        this.setState({
            textareaIsVisible: !this.state.textareaIsVisible,
        });
    }

    // editBio() {
    //     axios.post("/edit/bio").then((res){
    //         console.log(res);
    //         //call a function here passed down by App, give the value of app and app updates value of bio
    //         //toggle textarea dissapear
    //     })
    // }

    render() {
        return (
            <div div className ="bio-editor-container">
                <h1>BioEditor</h1>
                {this.state.textareaIsVisible && <textarea />}
                <button onClick={() => this.toggleTextarea()}>Edit Bio</button>
            </div>
        );
    }
}
