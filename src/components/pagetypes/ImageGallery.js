import React from 'react'
import { connect } from 'react-redux'

const ImageGallery = ({ urls }) =>
    <div>
        {urls.map(url => <img src={url} alt="asd" />)}
    </div>

const mapStateToProps = ({ images }) => ({ urls: images })

export default connect(mapStateToProps)(ImageGallery)