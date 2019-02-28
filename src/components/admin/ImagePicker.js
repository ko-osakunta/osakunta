import React from 'react'
import { connect } from 'react-redux'
import { uploadBannerToDb, deleteBannerFromDb } from "../../actions"
import styles from "./ImagePicker.module.css"

const ImagePicker = ({ images, banners }) => {
    const bannerUrls = banners.map(({ url }) => url)

    const toggle = (url) => () =>
        bannerUrls.includes(url)
            ? deleteBannerFromDb(getBannerKey(url))
            : uploadBannerToDb(url)

    const getBannerKey = bannerUrl => banners.filter(({ url }) => url === bannerUrl)[0].key


    return <div className={styles.container}>
        {images
            .map(url =>
                <img
                    src={url}
                    key={url}
                    onClick={toggle(url)}
                    className={bannerUrls.includes(url) ? styles.toggled : styles.regular}
                />)
        }
    </div>
}

const mapStateToProps = ({ images, banners }) => ({ images, banners })

export default connect(mapStateToProps, { uploadBannerToDb, deleteBannerFromDb })(ImagePicker)
