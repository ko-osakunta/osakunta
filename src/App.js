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
            let i = 0;
            for (let page in pages) {
                routes.push(<Route exact path={pages[i].path} page={pages[i]} component={Page} />)
                i++;
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
                    <Route exact path="/login" component={Login} />
                    {/* <div>
                        {
                            pages.length !== 0
                                ? [<Route key={pages[0].path} path={pages[0].path} component={Page} />,
                                <NotLoggedInRoute exact path="/login" component={Login} />
                                ]
                                : []
                        }
                    </div> */}
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { fetchPages, fetchContact, fetchUser })(App)
