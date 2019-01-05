import React from 'react'
import { connect } from "react-redux"
import { fetchPageByPath, loginWithGoogle } from "../../actions"
import AdminCreatedPage from '../pagetypes/AdminCreatedPage'
import Login from '../pagetypes/Login'
import Admin from '../admin/Admin'
import PageNotFound from '../pagetypes/PageNotFound';

//This page returns the correct type of page. Could be useless class as of now
class PagePicker extends React.Component {

    componentWillMount() {
        const path = window.location.pathname
        this.props.fetchPageByPath(path);
    }

    returnPage() {
        const { page } = this.props

        //This will unfortunately redirect at /login
        /* if (page === null) {
            return <PageNotFound />
        }
 */
        switch (page.type) {
            case "adminCreated":
                return <AdminCreatedPage />
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
