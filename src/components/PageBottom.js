import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";
import { database } from '../config/firebase';

class PageBottom extends React.Component {

    

    render() {
        return (
            <div className="bottomPage">
                <div className="row">
                    <div class="col-sm-4">
                        <p>Domus Gaudium</p>
                        <p>Leppäsuonkatu 11</p>
                        <p>00100 Helsinki</p>
                    </div>
                    <div class="col-sm-4">
                        <p>Domus Gaudium</p>
                        <p>Leppäsuonkatu 11</p>
                        <p>00100 Helsinki</p>
                    </div>
                    <div class="col-sm-4">
                        <p>Domus Gaudium</p>
                        <p>Leppäsuonkatu 11</p>
                        <p>00100 Helsinki</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageBottom