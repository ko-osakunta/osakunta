import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";
//Here is the main text of the page that admin can edit
class PageText extends React.Component {

    componentWillMount() {
        const path = window.location.pathname
        console.log(path)
        this.props.fetchPageTextByPath(path);
    }

    renderText() {
        const { pageText } = this.props
        
        if (!(Object.keys(pageText).length === 0)) {
            console.log(pageText)
            return <div dangerouslySetInnerHTML={{ __html: pageText}} />
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

const mapStateToProps = ({ pageText }) => {
    return {
        pageText
    };
};

export default connect(mapStateToProps, actions)(PageText);