import React from 'react'
import Banner from './Banner'
import TopNav from './TopNav'
import PageContent from './PageContent'

class Page extends React.Component {
    
    render() {
        return (
            <div>
                <Banner />
                <TopNav />
                <PageContent />
            </div>
        )
    }
}

export default Page;