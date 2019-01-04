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

        return (
            <Router>
                <Switch>
                    <div>
                        {
                            pages.length !== 0
                                ? [<Route key={pages[0].path} path={pages[0].path} component={Page} />,
                                <Route exact path="/login" component={Login} />
                                ]
                                : []
                        }
                    </div>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { fetchPages, fetchContact, fetchUser })(App)
