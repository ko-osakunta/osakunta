import React from 'react'
import { connect } from 'react-redux'
import ImageUploader from "./ImageUploader"

const ImageGallery = ({ images }) => {
    return <div>
        {images.map(({ url }) => <img src={url} key={url} />)}
        <ImageUploader />
    </div>
}

const mapStateToProps = ({ images }) => ({ images })

export default connect(mapStateToProps)(ImageGallery)
