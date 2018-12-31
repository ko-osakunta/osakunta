import React from 'react'
import { connect } from "react-redux"
import { fetchPageByPath, loginWithGoogle } from "../../actions"
import AdminCreatedPage from '../pagetypes/AdminCreatedPage'
import Admin from '../admin/Admin'

//This page returns the correct type of page
class PagePicker extends React.Component {

    componentWillMount() {
        const path = window.location.pathname
        this.props.fetchPageByPath(path);
    }

    returnPage() {
        const { page } = this.props
        if (!(Object.keys(page).length === 0)) {
            if (page.type === "adminCreated") {
                return <AdminCreatedPage />
            } else if (page.type === "admin") {
                return <Admin />
            }
            //Return 404
        }
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

export default connect(mapStateToProps, {fetchPageByPath})(PagePicker)
