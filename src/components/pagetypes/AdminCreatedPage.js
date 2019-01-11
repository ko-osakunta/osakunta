import React from "react"
import { connect } from "react-redux"
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"
import styles from "./AdminCreatedPage.module.css"
import requireAuth from "../helpers/requireAuth";

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = ({ pages, match }) =>
    <div className={styles.page}>
        <PageText text={getPageText(pages, match.path)} />
        <EditorClass />
        <RemovePage />
    </div>

const getPageText = (pages, path) =>
    pages.filter(page => page.path === path)[0].text

const mapStateToProps = ({ pages }) => ({ pages })

export default connect(mapStateToProps)(AdminCreatedPage)
