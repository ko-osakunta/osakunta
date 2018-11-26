import React from 'react'
import './TopNav.css'
import { connect } from "react-redux";
import * as actions from "../actions";
import { database } from '../config/firebase';
import NavButton from './NavButton'

class TopNav extends React.Component {

    componentDidMount() {
        this.props.fetchTopNav();
    }

    renderTopNav() {
        var buttons = []
        const { topNav } = this.props
        if (!(Object.keys(topNav).length === 0)) {
            Object.keys(topNav).forEach(function(key){
                buttons.push(<NavButton data={topNav[key]}/>)
            })
        }
       return buttons
    }

    render() {
        return (
            <div class="topnav">
                {this.renderTopNav()}
            </div>
        )
    }
}

const mapStateToProps = ({ topNav }) => {
    return {
        topNav
    };
};

export default connect(mapStateToProps, actions)(TopNav);