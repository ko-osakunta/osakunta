import React from 'react'
import { connect } from 'react-redux'

const ImageGallery = ({ images }) => {
    return <div>
        {images.map(({ url }) => <img src={url} key={url} />)}
    </div>
}

const mapStateToProps = ({ images }) => ({ images })

export default connect(mapStateToProps)(ImageGallery)
