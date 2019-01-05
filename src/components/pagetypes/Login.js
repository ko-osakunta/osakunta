
import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";
import PropTypes from "prop-types";

class Login extends Component {
    
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps) {
        if (nextProps.auth) {
            this.context.router.history.push("/");
        }
    }

    returnLoginButton() {
        const { auth } = this.props
        console.log(auth)
        if (auth === null) {
            return <div> <button className="btn-primary" onClick={this.props.signIn}>
                <i className="fa fa-google social-signin-icon" />
                Kirjaudu sisään Google-tilillä
            </button>
            </div>
        }
        return <div> <button className="btn-primary" onClick={this.props.signOut}>
            <i className="fa fa-google social-signin-icon" />
            Kirjaudu ulos Google-tililtä {auth.email}
            </button>
        </div>
    }

    render() {
        return (
            <div>
                    {this.returnLoginButton()}
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth }) // Not an identity function!

export default connect(mapStateToProps, { signIn, signOut })(Login);