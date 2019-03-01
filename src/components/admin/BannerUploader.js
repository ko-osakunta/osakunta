import React, { useState } from 'react'
import { connect } from 'react-redux'
import { uploadBanner } from "../../actions"

const BannerUploader = ({ uploadBanner }) => {
    const [image, setImage] = useState(null)

    return <div>
        <input type="file" onChange={e => setImage(e.target.files[0] ? e.target.files[0] : null)} />
        {image !== null && <button onClick={() => uploadBanner(image)}>Lataa kuva</button>}
    </div>
}

export default connect(null, { uploadBanner })(BannerUploader)
