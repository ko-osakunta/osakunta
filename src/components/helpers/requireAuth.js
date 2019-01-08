import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//This class will check whether the user is authenticated or not
export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (this.props.authenticated === null) {
        alert("Kirjaudu sisään näyttääksesi admin-sivun!")
        this.context.router.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.history.push("/");
      }
    }

    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  const mapStateToProps = (state) => {
    return { authenticated: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}