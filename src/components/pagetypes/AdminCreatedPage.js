import React from "react"
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = ({ page }) =>
    <div>
        <PageText text={page.text} />
        <EditorClass updatePath={'pages/' + page.key + '/text'} />
        <RemovePage page={page} />
    </div>

export default AdminCreatedPage