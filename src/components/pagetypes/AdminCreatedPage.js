import React from 'react'
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"
import styles from '../structure/PageText.module.css'
import adminStyles from './AdminCreatedPage.module.css'

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = ({ page }) => <>
    <div className={adminStyles.container} >
        <div className={styles.pageText}>
            <hr className={adminStyles.hr} />
            <PageText text={page.text} />
            <hr className={adminStyles.hr} />
        </div>
    </div>
    <EditorClass text={page.text} updatePath={'pages/' + page.key} />
    <RemovePage page={page} />
    </>

export default AdminCreatedPage
