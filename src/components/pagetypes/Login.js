
import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions";
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

    render() {
        return (
            <div className="row social-signin-container">
                <div className="col s10 offset-s1 center-align">
                    <a href="#" className="social-signin" onClick={this.props.signIn}>
                        <i className="fa fa-google social-signin-icon" />
                        Kirjaudu sisään Google-tilillä
          </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth }) // Not an identity function!

export default connect(mapStateToProps, { signIn })(Login);