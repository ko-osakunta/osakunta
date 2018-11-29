import React from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";

class Banner extends React.Component {
    
    componentWillMount() {
        this.props.fetchTopImage('karjalaolut.jpeg');
    }

    renderTopImage() {
        const { topImage } = this.props
        return  <img src={topImage} width="945" height="200" />
    }

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

export default connect(mapStateToProps, actions)(Banner);