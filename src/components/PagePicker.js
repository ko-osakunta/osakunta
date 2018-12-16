import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";
import AdminCreatedPage from './AdminCreatedPage';
import Placeholder from './Placeholder';

//This page returns the correct type of page
class PagePicker extends React.Component {

    componentWillMount() {
        const path = window.location.pathname
        this.props.fetchPageByPath(path);
    }

    returnPage() {
        const { page } = this.props
        console.log(page)
        if (!(Object.keys(page).length === 0)) {
            if (page.type === "adminCreated") {
                return <AdminCreatedPage />
            } else if (page.type === "placeholder") {
                return <Placeholder />
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

const mapStateToProps = ({ page }) => {
    return {
        page
    };
};

export default connect(mapStateToProps, actions)(PagePicker);