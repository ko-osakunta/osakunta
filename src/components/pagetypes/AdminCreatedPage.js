import React from 'react'
import PageText from '../structure/PageText'
import EditorClass from '../editor/EditorClass'
import RemovePage from '../admin/RemovePage';

const returnAdminTools = () => {
    const loggedUser = window.localStorage.getItem('appToken')
    if (loggedUser) {
        return (<div>
            <EditorClass />
            <RemovePage />
        </div>
        )
    }
    return ""
}

//This particular type of page can be created, and removed by admin
const AdminCreatedPage = () =>
    <div id="page">
        <PageText />
        {returnAdminTools()}
    </div>

export default AdminCreatedPage;
