import React from 'react'
import Banner from './Banner'
import TopNav from './TopNav'
import PageContent from './PageContent'
import PageBottom from './PageBottom'

class Page extends React.Component {
    
    render() {
        return (
            <div>
                <Banner />
                <TopNav />
                <PageContent />
                <PageBottom />
            </div>
        )
    }
}

export default Page;