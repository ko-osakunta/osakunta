import React from 'react'
import TopImage from './TopImage'
import TopNav from './TopNav'
import HomeText from './HomeText'

class Home extends React.Component {

    state = {

    }

    render() {
        return (
            <div className="container">
                <TopImage />
                <TopNav />
                <HomeText />
            </div>
        )
    }
}

export default Home;