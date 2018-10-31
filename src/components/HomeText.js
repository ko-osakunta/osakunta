import React from 'react'
import TopNav from './TopNav'
import { database } from '../config/firebase'

class HomeText extends React.Component {

    constructor() {
        super();
        this.state = {
            HomeText: ''
        }
        database.ref('hometext/-LQA2RhvSlNJpoRpFv6Z')
            .once('value')
            .then(snapshot => {
                var json = JSON.parse(snapshot.node_.value_)
                this.setState({
                    HomeText: json.blocks[0].text
                })
            }
        )
    }
  
    render() {
        
    
        return (
            <div>
                <h2>Mikä on KO?</h2>
                <div>
                    <p>Karjalainen Osakunta on yksi Helsingin yliopiston osakunnista. Järjestön tarkoituksena on järjestää jäsenilleen sosiaalista harrastustoimintaa, vaalia karjalaista kulttuuria ja pitää yllä jäsentensä kiinnostusta maakunnallisiin asioihin sekä avustaa opiskelijoita muun muassa opiskelija-asunnoilla ja stipendeillä. Osakunnat ovat poliittisesti ja uskonnollisesti riippumattomia järjestöjä.</p>
                
                    <p>Osakunnan jäseniksi voivat liittyä kaikki pääkaupunkiseudun korkeakouluissa opiskelevat opintovuosista riippumatta (Helsingin yliopisto, Aalto-yliopisto, Sibelius-Akatemia, Teatterikorkeakoulu, eri ammattikorkeakoulut jne.). Jäsenet ovat pääasiassa Pohjois-Karjalan maakunnan alueelta Helsinkiin opiskelemaan muuttaneita, mutta kotipaikka ei ole vaatimus osakunnan jäsenyydelle.</p>

                    <p>{this.state.HomeText}</p>
                </div>
            </div>
        )
    }
}

export default HomeText;