import React from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./SideNav.module.css"

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
                <button className={`btn ${styles.btn_sidenav} btn-lg page-scroll`} onClick={e => this.openNav()}>☰ open</button>
                <div id="sideNavigation" className={styles.sidenav} ref={sidenav => {this.sidenav=sidenav}}>
                    <button
                        className={styles.closebtn}
                        onClick={() => this.closeNav()}
                    >
                        &times;
                    </button>
                    {topNav.map(page => <NavButton data={page} key={page.title} />)}
                </div>
            </div>
        )
    }
}

const NavButton = ({ data }) => <Link to={data.path}>{data.title}</Link>

const mapStateToProps = ({ topNav }) => ({ topNav }) // Not an identity function!

export default connect(mapStateToProps)(SideNav)
