import React from 'react'
import TopNav from './TopNav'
import { database } from '../config/firebase'
import { convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

class HomeText extends React.Component {

    constructor() {
        super();
        this.state = {
            editorContentHtml: ''
        }
        database.ref('hometext')
            .once('value')
            .then(snapshot => {
                this.setState({editorContentHtml: stateToHTML(convertFromRaw(JSON.parse(snapshot.val())))})
            }
        )

        console.log(this.state.editorContentHtml)
    }
    
  
    render() {
        console.log(this.state.editorContentHtml);
        return (
            <div>
                <div>
                    {/* <p>Karjalainen Osakunta on yksi Helsingin yliopiston osakunnista. Järjestön tarkoituksena on järjestää jäsenilleen sosiaalista harrastustoimintaa, vaalia karjalaista kulttuuria ja pitää yllä jäsentensä kiinnostusta maakunnallisiin asioihin sekä avustaa opiskelijoita muun muassa opiskelija-asunnoilla ja stipendeillä. Osakunnat ovat poliittisesti ja uskonnollisesti riippumattomia järjestöjä.</p> */}
                    <p>Osakunnan jäseniksi voivat liittyä kaikki pääkaupunkiseudun korkeakouluissa opiskelevat opintovuosista riippumatta (Helsingin yliopisto, Aalto-yliopisto, Sibelius-Akatemia, Teatterikorkeakoulu, eri ammattikorkeakoulut jne.). Jäsenet ovat pääasiassa Pohjois-Karjalan maakunnan alueelta Helsinkiin opiskelemaan muuttaneita, mutta kotipaikka ei ole vaatimus osakunnan jäsenyydelle.</p>
                    <div dangerouslySetInnerHTML={{ __html: this.state.editorContentHtml }} />
                </div>
            </div>
        )
    }
}

export default HomeText;