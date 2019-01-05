import React from "react"
import Page from "./components/structure/Page"
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
        }
        return Page
    }

    renderRoutes = () => {
        const { pages } = this.props
        console.log(pages)
        return pages.map(page =>
            <Route
                exact path={page.path}
                component={this.returnCorrectComponent(page.type)}
                key={page.path}
            />
            
        )
    }

    render() {
        const { pages } = this.props

        const routes = this.renderRoutes(pages);
        console.log(routes)
        return (
            <div>
                <Banner />
                <SideNav />
                <Router>
                    <Switch>
                        {routes}
                    </Switch>
                </Router>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { fetchPages, fetchContact, fetchUser, fetchTopNav })(App)
