import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from "./Banner.module.css"

    /*class Banner extends React.Component {

    constructor() {
        super()
        this.state = { visible: null }
    }

    componentWillReceiveProps(nextProps) {
        const { banners } = nextProps
        this.setState({ visible: randomElem(banners) })

        clearInterval(this.interval)
        this.interval = setInterval(() => {
            const invisible = banners.filter(b => b !== this.state.visible)
            this.setState({ visible: randomElem(invisible) })
        }, 15000)
    }

    render() {
        const { banners } = this.props
        return (
            <div>
                {banners.map(b =>
                    <img
                        src={b.url}
                        key={b.url}
                        className={b === this.state.visible ? styles.visible : styles.invisible}
                    />
                )}
            </div>
        )
    }
}*/

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
        <div>
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
