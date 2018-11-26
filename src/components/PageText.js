import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";
import ShowThePath from './ShowThePath'
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

//Here is the main text of the page that admin can edit
class PageText extends React.Component {

    componentWillMount() {
        const path = window.location.pathname
        console.log(path)
        this.props.fetchPageByPath(path);
    }

    renderText() {
        const { page } = this.props
        console.log(page)
        if (!(Object.keys(page).length === 0)) {
            const text = stateToHTML(convertFromRaw(JSON.parse(page)))
            return <div dangerouslySetInnerHTML={{ __html: text}} />
        }
    }

    render() {
        return (
            <div>
                <div>
                    {/* <p>Karjalainen Osakunta on yksi Helsingin yliopiston osakunnista. Järjestön tarkoituksena on järjestää jäsenilleen sosiaalista harrastustoimintaa, vaalia karjalaista kulttuuria ja pitää yllä jäsentensä kiinnostusta maakunnallisiin asioihin sekä avustaa opiskelijoita muun muassa opiskelija-asunnoilla ja stipendeillä. Osakunnat ovat poliittisesti ja uskonnollisesti riippumattomia järjestöjä.</p> */}
                    <p>Osakunnan jäseniksi voivat liittyä kaikki pääkaupunkiseudun korkeakouluissa opiskelevat opintovuosista riippumatta (Helsingin yliopisto, Aalto-yliopisto, Sibelius-Akatemia, Teatterikorkeakoulu, eri ammattikorkeakoulut jne.). Jäsenet ovat pääasiassa Pohjois-Karjalan maakunnan alueelta Helsinkiin opiskelemaan muuttaneita, mutta kotipaikka ei ole vaatimus osakunnan jäsenyydelle.</p>
                    {this.renderText()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ page }) => {
    return {
        page
    };
};

export default connect(mapStateToProps, actions)(PageText);