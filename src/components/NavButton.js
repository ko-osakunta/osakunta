
import React from 'react'

class NavButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    //data tarvitsee erillisen pathin..
    render() {
        console.log(this.state.data)
        return (
            <a href={this.state.data.title}>{this.state.data.title}</a>
       )
    }
}



export default NavButton;