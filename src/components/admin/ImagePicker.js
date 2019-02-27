import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from "./ImagePicker.module.css"

const ImagePicker = ({ images, banners }) => {
    const [selected, setSelected] = useState(banners)

    const toggle = (url) => () =>
        selected.includes(url) ?
            setSelected(selected.filter(u => u !== url)) :
            setSelected([ ...selected, url ])

    return <div className={styles.container}>
        {images.slice(0, 20)
            .map(url =>
                <img
                    src={url}
                    key={url}
                    onClick={toggle(url)}
                    className={selected.includes(url) ? styles.toggled : styles.regular}
                />)
        }
    </div>
}

const mapStateToProps = ({ images, banners }) => ({ images, banners })

export default connect(mapStateToProps)(ImagePicker)
