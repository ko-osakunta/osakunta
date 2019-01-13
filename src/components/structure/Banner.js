import React from 'react'
import { connect } from "react-redux"
import * as actions from "../../actions"
import ImageFade from './ImageFade'


class Banner extends React.Component {

    constructor() {
        super();
        this.state = {
            index: 0,
            max: -1
        };
    }

    //This will keep resetting the banner
    componentDidMount() {
        this.interval = setInterval(() => this.changeCounter(), 15000);
    }

    //The method will randomize a new banner image which is not the same as the previous one
    changeCounter = () => {
        //In case there's just one banner image..
        if (this.state.max !== 1) {
            
            //If the length hasn't been defined yet, async issues
            if (this.state.max === -1) {
                this.setState({max: this.props.banners.length - 1})
            }
            let number = this.state.index

            while (number === this.state.index) {
                console.log(number)
                number = Math.floor(Math.random() * this.state.max) + 1
            }
            this.setState({ index: number })
        }
    }

    render() {
        const { banners } = this.props
        console.log(banners)
        console.log(banners[this.state.index])
        return (
            <div>
                <ImageFade img={banners[this.state.index]} />
            </div>

        )
    }
}

const mapStateToProps = ({ banners }) => ({ banners }) // Not an identity function!

export default connect(mapStateToProps)(Banner)
