import React from 'react'
import PageText from './../structure/PageText'
import AddNewPage from './AddNewPage';

const returnAdminTools = () => {
    const loggedUser = window.localStorage.getItem('appToken')
    if (loggedUser) {
        return (<div>
            <AddNewPage />
        </div>
        )
    }
    return ""
}

//Admin tools
const Admin = () =>
    <div id="page">
        <PageText />
        {returnAdminTools()}
    </div>

export default Admin;
