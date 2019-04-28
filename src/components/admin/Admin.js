import React from 'react'
import AddNewPage from "./AddNewPage"
import AddNewAnnouncement from "./AddNewAnnouncement"
import styles from "../structure/PageText.module.css"
import BannerUploader from "./BannerUploader"
import ImageUploader from "./ImageUploader"
import ImagePicker from "./ImagePicker"

//Admin tools
const Admin = () => {
    return <div id="page">
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
            <AddNewAnnouncement />
        </div>
        <div className={styles.pageText}>
            <hr className={styles.hr} />

            Lataa banneri sivulle:
            <BannerUploader />
        </div>
        <div className={styles.pageText}>
            <hr className={styles.hr} />

            <BannerUploader />
        </div>
        <div className={styles.pageText}>
            <hr className={styles.hr} />

            Lataa gallerian kuva sivulle:
            <ImageUploader />
        </div>
        <div className={styles.pageText}>
            <hr className={styles.hr} />
            <ImagePicker />
            <hr className={styles.hr} />
        </div>
    </div>
}

export default Admin
