import React from 'react'
import PageText from './../structure/PageText'
import AddNewPage from './AddNewPage';

//Admin tools
const Admin = () =>
    <div id="page">
        <div className="pageText">
            Adminin muokkaussivu. Toistaiseksi voit lisätä uusia sivuja sivulle.
        </div>
        <AddNewPage />
    </div>

export default Admin;
