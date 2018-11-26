import React from 'react'

//A single button that's rendered on the nav bar
class NavButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <a href={this.state.data.path}>{this.state.data.title}</a>
       )
    }
}



export default NavButton;