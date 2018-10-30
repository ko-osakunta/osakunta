import React from 'react'
import TopNav from './TopNav'

class HomeText extends React.Component {

    state = {

    }

    render() {
        return (
            <div>
                <h2>Mikä on KO?</h2>
                <div>
                    <p>Karjalainen Osakunta on yksi Helsingin yliopiston osakunnista. Järjestön tarkoituksena on järjestää jäsenilleen sosiaalista harrastustoimintaa, vaalia karjalaista kulttuuria ja pitää yllä jäsentensä kiinnostusta maakunnallisiin asioihin sekä avustaa opiskelijoita muun muassa opiskelija-asunnoilla ja stipendeillä. Osakunnat ovat poliittisesti ja uskonnollisesti riippumattomia järjestöjä.</p>
                
                    <p>Osakunnan jäseniksi voivat liittyä kaikki pääkaupunkiseudun korkeakouluissa opiskelevat opintovuosista riippumatta (Helsingin yliopisto, Aalto-yliopisto, Sibelius-Akatemia, Teatterikorkeakoulu, eri ammattikorkeakoulut jne.). Jäsenet ovat pääasiassa Pohjois-Karjalan maakunnan alueelta Helsinkiin opiskelemaan muuttaneita, mutta kotipaikka ei ole vaatimus osakunnan jäsenyydelle.</p>

                    <p>Karjalaisen Osakunnan tilat sijaitsevat Helsingin Kampissa yhdessä Kymenlaakson Osakunnan ja Wiipurilaisen Osakunnan kanssa. Osakunta on auki yliopiston lukukausien aikana ja osakunnassa on päivystys ti–pe klo 18–20. Syyslukukaudella on lisäksi erityinen fuksipäivystys.</p>

                    <p>Jäseneksi voi liittyä mihin aikaan tahansa ja osakunnalla on toimintaa ympäri vuoden.
                    Lisätietoja liittymisestä löytyy fuksisivuilta. Toiminnasta tiedotetaan pääasiassa kaikille jäsenille avoimella sähköpostilistalla.</p>

                    <p>P.S. Seuraa osakuntaa myös sosiaalisissa medioissa, Facebookissa Karjalainen Osakunta ja Instagramissa @karjalainenosakunta</p>
                </div>
            </div>
        )
    }
}

export default HomeText;