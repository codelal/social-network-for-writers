
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        <div className="parent-welcome-container">
            <header>
                <img src="../logo1.png" className="logo" />
            </header>

            <h1>Welcome to the Socialnetwork</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
