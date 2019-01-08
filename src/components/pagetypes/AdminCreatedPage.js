import React from "react"
import { connect } from "react-redux"
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"
import requireAuth from "../helpers/requireAuth"
import styles from "./AdminCreatedPage.module.css"

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = ({ pages: { remote }, match }) =>
    <div className={styles.page}>
        <PageText text={getPageText(remote, match.path)} />
        {requireAuth(EditorClass)}
        {requireAuth(RemovePage)}
    </div>

const getPageText = (pages, path) =>
    pages.filter(page => page.path === path)[0].text

const mapStateToProps = ({ pages }) => ({ pages })

export default connect(mapStateToProps)(AdminCreatedPage)
