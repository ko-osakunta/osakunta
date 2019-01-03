import React from 'react';
import { Route, Redirect } from "react-router-dom";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

class NotLoggedInRoute extends React.Component {

    constructor() {
        super()
        this.state = {
            user: null
        }
    }

    componentWillMount() {
        const loggedUser = window.localStorage.getItem('appToken')
        if (loggedUser) {
            this.setState({ user: loggedUser })
        }
    }

    render() {
        const { component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={props => (
                    this.state.user === null ?
                        <Component {...props} /> :
                        <Redirect to='/' />
                )}
            />
        )
    }
}

export default NotLoggedInRoute