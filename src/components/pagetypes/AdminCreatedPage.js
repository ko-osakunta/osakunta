import React from 'react'
import PageText from '../structure/PageText'
import EditorClass from '../editor/EditorClass'
import RemovePage from '../admin/RemovePage';
import requireAuth from '../helpers/requireAuth'

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = () =>
    <div id="page">
        <PageText />
        {requireAuth(EditorClass)}
        {requireAuth(RemovePage)}
    </div>

export default AdminCreatedPage;
