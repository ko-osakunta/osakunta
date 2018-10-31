import React from 'react'
import TopImage from './TopImage'
import TopNav from './TopNav'
import HomeText from './HomeText'
import EditorClass from './EditorClass'

class Home extends React.Component {


    render() {
        return (
            <div>
                <TopImage />
                <TopNav />
                <HomeText />
                <EditorClass />
            </div>
        )
    }
}

export default Home;