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
        var routes = []
        const { pages } = this.props
        console.log(pages)
        if (!(Object.keys(pages).length === 0)) {
            for (let i in pages) {
                if (pages[i].type === "login") {
                    routes.push(<Route exact path="/login" component={Login} />)
                } else {
                    routes.push(<Route exact path={pages[i].path} page={pages[i]} component={Page} />)
                }
            }
        }
        return routes
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
