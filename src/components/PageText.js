import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

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
            const text = stateToHTML(convertFromRaw(JSON.parse(page)))
            return <div dangerouslySetInnerHTML={{ __html: text}} />
        }
    }

    render() {
        return (
            <div>
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