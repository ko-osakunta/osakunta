import React from 'react'
import PageText from './PageText'
import EditorClass from './EditorClass'
import AddNewPage from './AddNewPage';
import RemovePage from './RemovePage';

const PageContent = () =>
    <div id="page">
        <PageText />
        <EditorClass />
        <AddNewPage />
        <RemovePage />
    </div>

export default PageContent;
