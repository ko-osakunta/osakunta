import React from 'react'
import '../onepage/css/style.css'
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
            <div class="navbar navbar-default navbar-fixed-top">
                <div class ="col-md-10">
                    <div class="nav navbar-nav navbar-right">
                        {this.renderTopNav()}
                    </div>
                </div>
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