import React, { useState } from 'react'
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"
import styles from '../structure/PageText.module.css'
import adminStyles from './AdminCreatedPage.module.css'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import UpdateContent from '../admin/UpdateContent';

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = ({ page }) => {

    return <div>
        <div className={adminStyles.container} >
            <div className={styles.pageText}>
                <hr className={adminStyles.hr} />
                <PageText text={page.text} />
                <hr className={adminStyles.hr} />
            </div>
        </div>
        <UpdateContent type={'pages'} content={page} />
        <RemovePage page={page} />
    </div>
}

export default AdminCreatedPage

