import React from 'react'
import PageText from './PageText'
import EditorClass from './EditorClass'
import RemovePage from './RemovePage';

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = () =>
    <div id="page">
        <PageText />
        <EditorClass />
        <RemovePage />
    </div>

export default AdminCreatedPage;
