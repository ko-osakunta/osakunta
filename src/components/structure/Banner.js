import React from 'react'
import { connect } from "react-redux"
import * as actions from "../../actions"
import ImageFade from './ImageFade'

import pic from './Praasniekat2013_01.png'

import pic1 from './Praasniekat2013_1.png'
import pic2 from './Praasniekat2013_2.png'
import kalja1 from './kuva1.jpg'
import kalja2 from './kuva2.jpg'

const pics = [
    pic1, pic2, kalja1, kalja2
]

let counter = 0;
let max = pics.length - 1;

class Banner extends React.Component {

    constructor() {
        super();
        this.state = {
            index: 0
        };
    }

    //This will keep resetting the banner
    componentDidMount() {
        this.interval = setInterval(() => this.changeCounter(), 15000);
    }

    //The method will randomize a new banner image which is not the same as the previous one
    changeCounter = () => {
        let number = this.state.index
        console.log(number)
        //In case there's just one banner image..
        if (max !== 1) {
            while (number === this.state.index) {
                console.log(number)
                number = Math.floor(Math.random() * max) + 1
            }
            this.setState({ index: number })
        }
    }

    render() {
        return (
            <div>
                <ImageFade img={pics[this.state.index]} />
            </div>

        )
    }
}

const mapStateToProps = ({ topImage }) => ({ topImage }) // Not an identity function!

export default connect(mapStateToProps)(Banner)
