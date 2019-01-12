import React from 'react'
import PageText from './../structure/PageText'
import AddNewPage from './AddNewPage';
import styles from "../structure/PageText.module.css"

//Admin tools
const Admin = () =>
    <div id="page">
        <div className={styles.pageText}>
            <p>Adminin muokkaussivu. Toistaiseksi voit lisätä uusia sivuja sivulle.</p>
            <a href="https://console.firebase.google.com/project/ko-osakunta/overview">Linkki konsoliin</a>
        </div>
        <AddNewPage />
    </div>

export default Admin;
