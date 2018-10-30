import React from 'react'
import juhaJaOtso from '../juhoJaOtso.jpg'
class TopImage extends React.Component {

    state = {

    }

    render() {
        return (
            <div>
                <img src={juhaJaOtso} width="661" height="160" />
            </div>
        )
    }
}

export default TopImage;