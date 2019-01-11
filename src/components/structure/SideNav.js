import React from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./SideNav.module.css"

class SideNav extends React.Component {
    openNav() {
        this.sidenav.style.width = "250px"
    }

    closeNav() {
        this.sidenav.style.width = "0px"
    }

    render() {
        const { pages } = this.props

        return <div>
            <button className={`btn ${styles.btn_sidenav} btn-lg page-scroll`} onClick={() => this.openNav()}>☰ open</button>
            <div id="sideNavigation" className={styles.sidenav} ref={sidenav => {this.sidenav=sidenav}}>
                <button
                    className={styles.closebtn}
                    onClick={() => this.closeNav()}
                >
                    &times;
                </button>
                {pages.map(page =>
                    <Link
                        to={page.path}
                        onClick={() => this.closeNav()}
                        key={page.path}
                    >
                        {page.title}
                    </Link>
                )}
            </div>
        </div>
    }
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps)(SideNav)
