import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from "./Banner.module.css"

const Banner = ({ banners }) => {
    const [visible, setVisible] = useState(randomElem(banners))

    if (!visible && banners.length !== 0) {
        setVisible(randomElem(banners))
    }

    useEffect(() => {
        const id = setTimeout(() => {
            const invisible = banners.filter(b => b !== visible)
            setVisible(randomElem(invisible))
        }, 15000)

        return () => {
            clearTimeout(id)
        }
    })

    return (
        <div className={styles.bannerContainer}>
            {banners.map(b =>
                <img
                    src={b.url}
                    key={b.url}
                    className={b === visible ? styles.visible : styles.invisible}
                />
            )}
        </div>
    )
}

const randomElem = (array) => array[Math.floor(Math.random() * array.length)]

const mapStateToProps = ({ banners }) => ({ banners }) // Not an identity function!

export default connect(mapStateToProps)(Banner)
