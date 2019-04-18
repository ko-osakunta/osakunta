import React, { useRef, useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./SideNav.module.css"

const SideNav = ({ openNavigation, closeNavigation, pages }) => {
    const [open, setOpen] = useState(false)

    const openNav = () => {
        openNavigation()
        setOpen(true)
    }

    const closeNav = () => {
        closeNavigation()
        setOpen(false)
    }

    const handleClick = event => {
        if (open) {
            event.preventDefault()
            closeNav()
        } else {
            if (event.target.id === "openNavig") {
                openNav()
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick, false)

        return () => {
            document.removeEventListener('click', handleClick, false)
        }
    })

    return <>
        <button id="openNavig" className={`btn ${styles.btn_sidenav} btn-lg page-scroll`}>☰ open</button>
        <div id="sideNavigation" className={open ? `${styles.sidenav} ${styles.open}`
            : `${styles.sidenav} ${styles.close}`}>
            <button
                className={styles.closebtn}
                onClick={() => closeNav()}
            >

                &times;
            </button>
            {pages.map(page =>
                <Link
                    to={page.path}
                    onClick={() => closeNav()}
                    key={page.path}
                >
                    {page.title}
                </Link>
            )}
        </div>
        </>
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps)(SideNav)
