import React from 'react'
import AddNewPage from "./AddNewPage"
import styles from "../structure/PageText.module.css"
import BannerUploader from './BannerUploader'
import ImageUploader from './ImageUploader'
//Admin tools
const Admin = () =>
    <div id="page">
        <div className={styles.pageText}>
            <hr className={styles.hr} />
            <p>Adminin hallintatyökalut.</p>
            <a href="https://console.firebase.google.com/project/ko-osakunta/overview">Linkki konsoliin</a>
        </div>
        <div className={styles.pageText}>
            <hr className={styles.hr} />
            Luo uusi sivu:
            <AddNewPage />
        </div>
        <div className={styles.pageText}>
            <hr className={styles.hr} />

            Lataa banneri sivulle:
            <BannerUploader />
        </div>
        <div className={styles.pageText}>
            <hr className={styles.hr} />

            Lataa gallerian kuva sivulle:
            <ImageUploader />
            <hr className={styles.hr} />
        </div>
    </div>

export default Admin
