
import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";
import PropTypes from "prop-types";
import { firebaseAuth } from '../../config/firebase'

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE
        };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps) {
        if (nextProps.auth) {
            this.context.router.history.push("/");
        }
    }

    onSubmit = event => {
        const { auth, email, password } = this.state;

        firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.context.router.history.push("/");
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };


    returnLoginButton() {
        const { auth, email, password, error } = this.props
        console.log(email)
        if (auth) {
            return (
                <div>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Sähköposti"
                    />
                    <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Salasana"
                    />
                    <button className="btn-primary" type="submit" onClick={this.onSubmit}>
                        Kirjaudu sisään
                        </button>
                    {error && <p>{error.message}</p>}
                </div>
            )
        } else {
            return (
                <button type="button" onClick={firebaseAuth.doSignOut}>
                    Sign Out
        </button>
            )
        }

    }



    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return <div>
            {this.returnLoginButton()}
        </div>
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Login);
