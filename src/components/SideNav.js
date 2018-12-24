import React from 'react'
import { connect } from "react-redux"
import { fetchTopNav } from "../actions"

class SideNav extends React.Component {

    componentDidMount() {
        this.props.fetchTopNav()
    }

    openNav() {
        this.sidenav.style.width = "250px"
    }

    closeNav() {
        this.sidenav.style.width = "0px"
    }

    renderTopNav() {
        let buttons = []
        const { topNav } = this.props
        console.log(this.props)
        if (!(Object.keys(topNav).length === 0)) {
            buttons.push(<a href="javascript:void(0)" className="closebtn" onClick={e => this.closeNav()}>&times;</a>)
            Object.keys(topNav).forEach(function (key) {
                buttons.push(<NavButton data={topNav[key]} />)
            })
        }
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

const NavButton = ({ data }) => <a href={data.path}>{data.title}</a>

const mapStateToProps = ({ topNav }) => ({ topNav }) // Not an identity function!

export default connect(mapStateToProps, {fetchTopNav})(SideNav)
