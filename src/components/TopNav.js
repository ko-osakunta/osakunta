import React from 'react'
import './TopNav.css'

class TopNav extends React.Component {

    state = {

    }

    render() {
        return (
            <div class="topnav">
                <a class="active" href="#osakunta">Osakunta</a>
                <a href="#tiedotteita">Tiedotteita</a>
                <a href="#pienipuukello">Toiminta</a>
                <a href="#asunnot">Asunnot</a>
                <a href="#yhteystiedot">Yhteystiedot</a>
                <a href="#seniorit">Seniorit</a>
                <a href="#liity">Liity</a>

            </div>
        )
    }
}

export default TopNav;