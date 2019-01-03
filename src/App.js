import React from "react"
import Page from "./components/structure/Page"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fetchPages, fetchContact } from "./actions"
import { connect } from "react-redux"
import NotLoggedInRoute from './components/helpers/NotLoggedInRoute'
import Login from './components/pagetypes/Login'

class App extends React.Component {

    componentDidMount() {
        this.props.fetchPages()
        this.props.fetchContact()
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
                                <NotLoggedInRoute exact path="/login" component={Login} />
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

export default connect(mapStateToProps, { fetchPages, fetchContact })(App)
