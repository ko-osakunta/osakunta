import React from 'react'
import { storage } from '../config/firebase'

class TopImage extends React.Component {
    
    constructor() {
        super()
        this.state = {
            pic: ''
        }
        this.getImage('karjalaolut.jpeg')
    }

    getImage (image) {
        storage.ref().child(`${image}`).getDownloadURL().then((url) => {
            this.setState({ pic : url })
        })
    }
    

    render() {
        return (
            <div>
                <img src={this.state.pic} width="945" height="200" />
            </div>
        )
    }
}

export default TopImage;