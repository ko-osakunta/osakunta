import React, { useState } from 'react'
import { connect } from 'react-redux'
import { uploadImage } from "../../actions"

const ImageUploader = ({ uploadImage }) => {
    const [image, setImage] = useState(null)

    return (
        <div>
            <input type="file" onChange={e => setImage(e.target.files[0] ? e.target.files[0] : null)} />
            {image !== null && <button onClick={() => uploadImage(image)}>Lataa kuva</button>}
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({ auth }) // Not an identity function!

export default connect(null, { uploadImage })(ImageUploader)
