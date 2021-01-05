//client/src/welcome.js
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./Login";

export default function Welcome() {
    return (
        <div>
            <div>LOGO</div>
            <h1>Welcome to the Socialnetwork</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
