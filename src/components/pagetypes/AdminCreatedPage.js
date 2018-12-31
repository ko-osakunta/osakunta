import React from 'react'
import PageText from '../structure/PageText'
import EditorClass from '../editor/EditorClass'
import RemovePage from '../admin/RemovePage';

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = () =>
    <div id="page">
        <PageText />
        <EditorClass />
        <RemovePage />
    </div>

export default AdminCreatedPage;
