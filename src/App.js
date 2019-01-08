import React from "react"
import Banner from "./components/structure/Banner"
import SideNav from "./components/structure/SideNav"
import Footer from "./components/structure/Footer"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fetchPages, fetchContact, fetchUser, fetchTopNav, fetchImages } from "./actions"
import { connect } from "react-redux"
import Login from './components/pagetypes/Login'
import Admin from "./components/admin/Admin";
import AdminCreatedPage from "./components/pagetypes/AdminCreatedPage";
import PageNotFound from "./components/pagetypes/PageNotFound"
import ImageGallery from "./components/pagetypes/ImageGallery.js"
import requireAuth from './components/helpers/requireAuth'
class App extends React.Component {

    componentDidMount() {
        this.props.fetchPages()
        this.props.fetchContact()
        this.props.fetchUser()
        this.props.fetchTopNav()
        this.props.fetchImages()
    }

    render() {
        const { pages } = this.props
        const routes = renderRoutes(pages)

        return <div>
            <Banner />
            <Router>
                <div>
                    <SideNav />
                    <Switch>
                        {routes}
                        {pages.length !== 0 &&
                                <Route path="*" component={PageNotFound} />
                        }
                    </Switch>
                </div>
            </Router>
            <Footer />
        </div>
    }
}

const renderRoutes = (pages) =>
    pages
        .map(({ type, path }) => ({
            component: returnCorrectComponent(type),
            path
        }))
        .concat(localPages)
        .map(({ component, path }) =>
            <Route exact path={path} component={component} key={path} />
        )

const returnCorrectComponent = (pageType) => {
    switch (pageType) {
        case "login":
            return Login
        case "admin":
            return requireAuth(Admin)
        default:
            return AdminCreatedPage
    }
}

const localPages = [
    {
        component: ImageGallery,
        path: "/gallery"
    }
]

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { fetchPages, fetchContact, fetchUser, fetchTopNav, fetchImages })(App)
