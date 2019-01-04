import React from 'react'
import { connect } from "react-redux"
//import { fetchTopNav } from "../../actions"

class SideNav extends React.Component {

    componentDidMount() {
        //this.props.fetchTopNav()
    }

    openNav() {
        this.sidenav.style.width = "250px"
    }

    closeNav() {
        this.sidenav.style.width = "0px"
    }

    render() {
        const { topNav } = this.props
        return (
            <div>
                <button className="btn btn-sidenav btn-lg page-scroll" onClick={e => this.openNav()}>☰ open</button>
                <div id="sideNavigation" className="sidenav" ref={sidenav => {this.sidenav=sidenav}}>
                    <a
                        href="javascript:void(0)"
                        className="closebtn"
                        onClick={() => this.closeNav()}
                    >
                        &times;
                    </a>
                    {topNav.map(page => <NavButton data={page} key={page.title} />)}
                </div>
            </div>
        )
    }
}

const NavButton = ({ data }) => <a href={data.path}>{data.title}</a>

const mapStateToProps = ({ topNav }) => ({ topNav }) // Not an identity function!

export default connect(mapStateToProps)(SideNav)
