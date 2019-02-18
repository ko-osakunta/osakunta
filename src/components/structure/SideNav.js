import React from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./SideNav.module.css"

class SideNav extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    componentDidMount() {
        this.sidenav.style.width = "0px";
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }

    openNav() {
        this.setState({open: true})
        this.sidenav.style.width = "300px";
        this.sidenav.style.outline = "9999px solid rgba(0,0,0,0.65)"
        this.props.openNavigation()
    }

    closeNav() {
        this.setState({open: false})
        this.sidenav.style.width = "0px"
        this.sidenav.style.outline = "9999px solid rgba(0,0,0,0.0)";

        this.props.closeNavigation()
    }

    // Handle click will detect if the sidenav is open and if the user clicked outside the sidenav.
    // Side nav will be closed and other actions will be prevented.
    // If either of these cases aren't true it will check if open-button was clicked. Sidenav will open if this was the case.
    handleClick = event => {
        if (this.sidenav.style.width === "300px" && !this.sidenav.contains(event.target)) {
            event.preventDefault();
            this.closeNav();
        } else {
            if (event.target.id === "openNavig") {
                this.openNav()
            }
        }
    }

    render() {
        const { pages } = this.props
        return <div>
            <button id="openNavig" className={`btn ${styles.btn_sidenav} btn-lg page-scroll`}>☰ open</button>
            <div id="sideNavigation" className={styles.sidenav} ref={sidenav => { this.sidenav = sidenav }}>
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
