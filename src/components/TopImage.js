import React from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";

class TopImage extends React.Component {
    
    componentWillMount() {
        this.props.fetchTopImage('karjalaolut.jpeg');
    }

    renderTopImage() {
        const { topImage } = this.props
        console.log(topImage)
        return  <img src={topImage} width="945" height="200" />
    }
     /* getImage (image) {
        storage.ref().child(`${image}`).getDownloadURL().then((url) => {
            this.setState({ pic : url })
        })
    } */
    

    render() {
        return (
            <div>
                {this.renderTopImage()}
            </div>
        )
    }
}

const mapStateToProps = ({ topImage }) => {
    return {
        topImage
    };
};

export default connect(mapStateToProps, actions)(TopImage);