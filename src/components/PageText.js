import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";
//Here is the main text of the page that admin can edit
class PageText extends React.Component {

    componentWillMount() {
        const path = window.location.pathname
        console.log(path)
        this.props.fetchPageByPath(path);
    }

    renderText() {
        const { page } = this.props
        console.log(page)
        if (!(Object.keys(page).length === 0)) {
            console.log(page)
            return <div dangerouslySetInnerHTML={{ __html: page.text}} />
        }
    }

    render() {
        return (
            <div className="pageText">
                {this.renderText()}
            </div>
        )
    }
}

const mapStateToProps = ({ page }) => {
    return {
        page
    };
};

export default connect(mapStateToProps, actions)(PageText);