import React from 'react'
import PageText from './PageText'
import EditorClass from './EditorClass'
import AddNewPage from './AddNewPage';
import RemovePage from './RemovePage';

class PageContent extends React.Component {

    render() {
        return (
            <div>
                <PageText />
                <EditorClass />
                <AddNewPage />
                <RemovePage />
            </div>
        )
    }
}

export default PageContent;