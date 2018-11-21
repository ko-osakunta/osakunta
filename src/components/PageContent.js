import React from 'react'
import PageText from './PageText'
import EditorClass from './EditorClass'

class PageContent extends React.Component {

    render() {
        return (
            <div>
                <PageText />
                <EditorClass />
            </div>
        )
    }
}

export default PageContent;