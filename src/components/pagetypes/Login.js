import React from "react";
import { loginWithGoogle } from "../helpers/auth";
import { firebaseAuth } from "../../config/firebase";


const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false
        };

        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    componentWillMount() {
        firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                console.log("User signed in: ", JSON.stringify(user));

                localStorage.removeItem(firebaseAuthKey);

                // here you could authenticate with you web server to get the
                // application specific token so that you do not have to
                // authenticate with firebase every time a user logs in
                localStorage.setItem(appTokenKey, user.uid);
            }
        });
    }

    render() {
        console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
        if (localStorage.getItem(firebaseAuthKey) === "1") {
            return <p>Loading..</p>
        }
        return (
            <div>
                <h1>Login</h1>
                <div>
                    <button
                        className="btn-primary"
                        label="Sign in with Google"
                        onClick={this.handleGoogleLogin()}
                    />
                </div>
            </div>
        )
    }
}
export default Login