import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";
import NavButton from './NavButton'

class SideNav extends React.Component {

    componentDidMount() {
        this.props.fetchTopNav();
    }

    openNav() {
        this.sidenav.style.width = "250px"
    }

    closeNav() {
        this.sidenav.style.width = "0px"
    }

    renderTopNav() {
        var buttons = []
        const { topNav } = this.props
        if (!(Object.keys(topNav).length === 0)) {
            buttons.push(<a href="javascript:void(0)" className="closebtn" onClick={e => this.closeNav()}>&times;</a>)
            Object.keys(topNav).forEach(function (key) {
                buttons.push(<NavButton data={topNav[key]} />)
            })
        }
        console.log(buttons)
        return buttons
    }

    render() {
        return (
            <div>
                <span onClick={e => this.openNav()}>☰ open</span>
                <div id="sideNavigation" className="sidenav" ref={sidenav => {this.sidenav=sidenav}}>
                    {this.renderTopNav()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ topNav }) => ({ topNav }) // Not an identity function!

export default connect(mapStateToProps, actions)(SideNav)
