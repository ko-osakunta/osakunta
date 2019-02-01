import React from 'react'
import AddNewPage from "./AddNewPage"
import styles from "../structure/PageText.module.css"
import BannerUploader from './BannerUploader'
import ImageUploader from './ImageUploader'
//Admin tools
const Admin = () =>
    <div id="page">
        <div className={styles.pageText}>
            <p>Adminin muokkaussivu. Toistaiseksi voit lisätä uusia sivuja sivulle.</p>
            <a href="https://console.firebase.google.com/project/ko-osakunta/overview">Linkki konsoliin</a>
        </div>
        <div className={styles.pageText}>
            Luo uusi sivu:
            <AddNewPage />
        </div>
        <div className={styles.pageText}>
            Lataa banneri sivulle:
            <BannerUploader />
        </div>
        <div className={styles.pageText}>
            Lataa gallerian kuva sivulle:
            <ImageUploader />
        </div>
    </div>

export default Admin
