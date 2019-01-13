import React, { Component } from 'react';
import { uploadBanner } from '../../actions'
import { connect } from "react-redux"

class UploadBanner extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            image: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState({ image });
        }
    }

    render() {
        return (
            <div>  
                <input type="file" onChange={this.handleChange} />
                {this.state.image !== null && <button onClick={() => this.props.uploadBanner(this.state.image)}>Lataa kuva</button>}
                
            </div>
        )
    }
}

export default connect(null, { uploadBanner })(UploadBanner)
