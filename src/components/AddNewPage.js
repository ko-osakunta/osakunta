import React from 'react'
import { databaseRef, database } from '../config/firebase'
import { connect } from "react-redux";
import * as actions from "../actions";
import './EditorClass.css'

//This form creates a new page to the site
class AddNewPage extends React.Component {
    
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    onClick = () => {
        var pagePath = '/' + this.state.value.toLowerCase()
        var pagesRef = database.ref('pages')

        pagesRef.push().set({
            path: pagePath,
            text: "{\"blocks\":[{\"key\":\"67ca\",\"text\":\"Uusi sivu luotu! Adminina voit muokata sitä oheisesta lomakkeesta.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}", 
            title: this.state.value
        })

        console.log(this.state. value)
        window.location.reload();
    }

    onChange = (event) => {
        this.setState({value: event.target.value});
    }


    render() {
        return (
            <div>
                <div className="editorclass">
                        Uuden sivun nimi    :
                        <input type="text" name="text" value={this.state.value} onChange={this.onChange}/>
                    <button className="button" onClick={this.onClick}>
                        Lisää uusi sivu
                    </button>
                </div>
            </div>
            
        )
    }
}

export default AddNewPage