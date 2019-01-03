import React from 'react'
import { connect } from "react-redux"
import { fetchPageByPath, loginWithGoogle } from "../../actions"
import AdminCreatedPage from '../pagetypes/AdminCreatedPage'
import Login from '../pagetypes/Login'
import Admin from '../admin/Admin'
import PageNotFound from '../pagetypes/PageNotFound';

//This page returns the correct type of page
class PagePicker extends React.Component {

    componentWillMount() {
        const path = window.location.pathname
        this.props.fetchPageByPath(path);
    }

    returnPage() {
        const { page } = this.props
        console.log(window.localStorage.getItem('firebaseUser'))
        console.log(page)
        if (page === null) {
            return <PageNotFound />
        }

         switch (page.type) {
            case "adminCreated":
                return <AdminCreatedPage />
            case "admin":
                return <Admin />
            case "login":
                return <Login />
        }
        //Return 404

    }

    render() {
        return (
            <div>
                {this.returnPage()}
            </div>
        )
    }
}

const mapStateToProps = ({ page }) => ({ page }) // Not an identity function!

export default connect(mapStateToProps, { fetchPageByPath })(PagePicker)
