import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";
import { database } from '../config/firebase';

class PageBottom extends React.Component {



    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 offset-lg-1 offset-xl-0">
                            <p>Karjalainen Osakunta</p>
                        </div>
                        <div className="col-lg-2 col-xl-3 offset-lg-2 offset-xl-3">
                            <p>Sosiaaliset mediat</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 offset-lg-1 offset-xl-0">
                            <p>Domus Gaudium</p>
                        </div>
                        <div className="col-lg-2 col-xl-3 offset-lg-0">
                            <p>Helsingin yliopiston osakunta</p>
                        </div>
                        <div className="col-lg-2 col-xl-3">
                            <p>fb: <a href="https://www.facebook.com/KarjalainenOsakunta">Karjalainen Osakunta</a></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 offset-lg-1 offset-xl-0">
                            <p>Leppäsuonkatu 11</p>
                        </div>
                        <div className="col-lg-2 col-xl-3 offset-lg-0">
                            <p>Paragraph</p>
                        </div>
                        <div className="col-lg-2 col-xl-3 offset-xl-0">
                            <p>ig: <a href="https://instagram.com/karjalainenosakunta/">@karjalainenosakunta</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageBottom