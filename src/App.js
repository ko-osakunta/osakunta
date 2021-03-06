import React, { useState, useEffect } from "react"
import Banner from "./components/structure/Banner"
import SideNav from "./components/structure/SideNav"
import Footer from "./components/structure/Footer"
import { Route, Switch, withRouter } from 'react-router-dom'
import { fetchPages, fetchContact, fetchUser, fetchImages, fetchBanners, fetchAnnouncements } from "./actions"
import { connect } from "react-redux"
import PageNotFound from "./components/pagetypes/PageNotFound"

const App = (props) => {
    const {
        pages,
        fetchBanners,
        fetchPages,
        fetchContact,
        fetchUser,
        fetchImages,
        fetchAnnouncements
    } = props

    const routes = renderRoutes(pages)

    const [open, changeOpen] = useState(false)

    useEffect(() => {
        fetchBanners()
        fetchPages()
        fetchContact()
        fetchUser()
        fetchImages()
        fetchAnnouncements()
    }, [])

    return <div className="main">
        <div className={open ? "openNav" : "closeNav"} >
            <div className="pageWrapper">
                <Banner />
                <SideNav
                    openNavigation={() => changeOpen(true)}
                    closeNavigation={() => changeOpen(false)}
                />
                <div className="contentWrapper">
                    <Switch>
                        {routes}
                        {pages.length !== 0 &&
                            <Route path="*" component={PageNotFound} />
                        }
                    </Switch>
                </div>
            </div>
            <Footer />
        </div>
    </div >
}

const renderRoutes = (pages) =>
    pages.map(({ Component, path, ...rest }) =>
        <Route
            exact path={path}
            render={(props) => <Component {...props} page={{ path, ...rest }} />}
            key={path}
        />)

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default withRouter(connect(mapStateToProps, { fetchPages, fetchContact, fetchUser, fetchImages, fetchBanners, fetchAnnouncements })(App))
