import React from 'react'
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = ({ page }) => <>
    <PageText text={page.text} />
    <EditorClass text={page.text} updatePath={'pages/' + page.key} />
    <RemovePage page={page} />
</>

export default AdminCreatedPage
