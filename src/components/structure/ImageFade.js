import React from 'react'
import styles from "./ImageFade.module.css"

//This method will be used to apply the fading image transition effect
class ImageFade extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            topImg: props.img,
            bottomOpacity: 0,
            bottomImg: props.img
        }
    }

    componentWillReceiveProps(newProps) {
        const oldImg = this.state.topImg
        const newImg = newProps.img
        this.setState({ bottomImg: false, topImg: false }, () =>
            this.setState({ bottomImg: oldImg, topImg: newImg, bottomOpacity: 1 }, () => {

                this.timeout = setTimeout(() => this.setState({ bottomOpacity: 0 }), 20)
            })
        )

    }

    render() {
        const { topImg, bottomOpacity, bottomImg } = this.state
        console.log(topImg)
        console.log(bottomImg)
        return (
            <div>
                {
                    <div>
                        <img className={styles.imagefade}
                            src={typeof topImg !== "undefined" && topImg.url}
                            alt="banner"
                        />
                    </div>}
                {
                    <div>
                        <img className={styles.imagefade} style={{
                            opacity: bottomOpacity,
                            transition: `opacity 0.5s ease-out 0s`
                        }}
                            src={typeof bottomImg !== "undefined" && bottomImg.url}
                            alt="banner"
                        />
                    </div>}
            </div>
        )
    }
}

export default ImageFade
