import React from "react"
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"
import styles from "./AdminCreatedPage.module.css"

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = ({ page }) =>
    <div className={styles.page}>
        <PageText text={page.text} />
        <EditorClass />
        <RemovePage page={page} />
    </div>

export default AdminCreatedPage
