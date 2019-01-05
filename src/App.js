import React from "react"
import Banner from "./components/structure/Banner"
import SideNav from "./components/structure/SideNav"
import Footer from "./components/structure/Footer"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fetchPages, fetchContact, fetchUser, fetchTopNav } from "./actions"
import { connect } from "react-redux"
import Login from './components/pagetypes/Login'
import Admin from "./components/admin/Admin";
import AdminCreatedPage from "./components/pagetypes/AdminCreatedPage";
import requireAuth from './components/helpers/requireAuth'
class App extends React.Component {

    componentDidMount() {
        this.props.fetchPages()
        this.props.fetchContact()
        this.props.fetchUser()
        this.props.fetchTopNav()
    }

    returnCorrectComponent(pageType) {
        switch (pageType) {
            case "login":
                return Login
            case "admin":
                return requireAuth(Admin)
            default:
                return AdminCreatedPage
        }
    }

    renderRoutes() {
        const { pages } = this.props
        return pages.map(page => {
            const Component = this.returnCorrectComponent(page.type)
            return <Route
                exact path={page.path}
                component={Component}
                key={page.path}
            />
        })
    }

    render() {
        const { pages } = this.props

        const routes = this.renderRoutes(pages)
        return <div>
            <Banner />
            <Router>
                <div>
                    <SideNav />
                    <Switch>
                        {routes}
                    </Switch>
                </div>
            </Router>
            <Footer />
        </div>
    }
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { fetchPages, fetchContact, fetchUser, fetchTopNav })(App)
