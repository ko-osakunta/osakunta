import React from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import pic from './Praasniekat2013_01.png'

var sectionStyle = {
    width: "100%",
    height: "250px",
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  };

class Banner extends React.Component {
    
    /* componentWillMount() {
        this.props.fetchTopImage('karjalaolut.jpeg');
    } */

    /* renderTopImage() {
        const { topImage } = this.props
        return  <img src={topImage} width="945" height="200" />
    } */
      
    render() {
        return (
            <section style={sectionStyle}>
                {/* this.renderTopImage() */}
            </section>
        )
    }
}

const mapStateToProps = ({ topImage }) => ({ topImage }) // Not an identity function!

export default connect(mapStateToProps)(Banner)
