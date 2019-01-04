import React from "react"
import Page from "./components/structure/Page"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fetchPages, fetchContact, fetchUser } from "./actions"
import { connect } from "react-redux"
import Login from './components/pagetypes/Login'

class App extends React.Component {

    componentDidMount() {
        this.props.fetchPages()
        this.props.fetchContact()
        this.props.fetchUser()
    }

    renderRoutes = () => {
        const { pages } = this.props
        return pages.map(page =>
            <Route
                exact path={page.type === "login" ? "/login" : page.path}
                component={page.type === "login" ? Login : Page}
                key={page.path}
            />
        )
    }

    render() {
        const { pages } = this.props

        let routes = this.renderRoutes();
        console.log(routes)
        return (
            <Router>
                <Switch>
                    {routes}
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { fetchPages, fetchContact, fetchUser })(App)
