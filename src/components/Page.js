import React from 'react'
import TopImage from './TopImage'
import TopNav from './TopNav'
import PageContent from './PageContent'

class Page extends React.Component {

    render() {
        return (
            <div>
                <TopImage />
                <TopNav />
                <PageContent />
            </div>
        )
    }
}

export default Page;