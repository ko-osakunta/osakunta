import React from 'react'
import PageText from '../structure/PageText'
import EditorClass from '../editor/EditorClass'
import RemovePage from '../admin/RemovePage';

//404 needs some fun stuff
const PageNotFound = () =>
    <div id="page">
        <p>404! Sivua ei löytynyt! Tai jos /login niin redirect kirjautuneena ei toimi halutulla tavalla</p>
    </div>

export default PageNotFound;
