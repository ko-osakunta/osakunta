import React from 'react'
import '../innova/css/style.css'
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
            <nav nav id="menu" class="navbar navbar-default navbar-fixed-top">
                <div class="navbar-default">
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" >
                        <ul class="nav navbar-nav navbar-right">
                            {this.renderTopNav()}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({ topNav }) => {
    return {
        topNav
    };
};

export default connect(mapStateToProps, actions)(TopNav);