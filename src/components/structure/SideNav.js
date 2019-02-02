import React from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./SideNav.module.css"

class SideNav extends React.Component {

    componentWillMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }

    openNav() {
        this.sidenav.style.width = "300px"
        this.props.openNavigation()
        this.sidenav.style.outline = "9999px solid rgba(0,0,0,0.65)"
    }

    closeNav() {
        this.sidenav.style.width = "0px"
        this.props.closeNavigation()
        this.sidenav.style.outline = "9999px solid rgba(0,0,0,0)"
    }

    handleClick = event => {
        if (!this.sidenav.contains(event.target)) {
            this.closeNav();
        }
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
