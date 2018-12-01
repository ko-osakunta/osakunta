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
        var pagePath = this.convertValueToPath();
        console.log(pagePath)   

        var pagesRef = database.ref('pages')

        if (this.titleIsUsed(this.state.value.toLowerCase())) {
            window.alert("Sivu on jo olemassa tällä nimellä!");
        } else if (this.pathIsUsed(pagePath)) {
            window.alert("Sivu on jo olemassa tällä polulla!");
        } else {
            pagesRef.push().set({
                path: pagePath,
                text: "{\"blocks\":[{\"key\":\"67ca\",\"text\":\"Uusi sivu luotu! Adminina voit muokata sitä oheisesta lomakkeesta.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}", 
                title: this.state.value
            })
            window.location.reload()
        }
        console.log(this.state.value)
    }

    titleIsUsed(title) {
        const { pages } = this.props
        var containsValue = false;
        Object.keys(pages).forEach(function(key) {
            console.log(pages[key].title + ' ' + title)
            if (pages[key].title == title) {
                containsValue = true
                //Break doesn't work in map, but practically irrelevant in case of performance?
            }
        });
        return containsValue
    }

    pathIsUsed(path) {
        const { pages } = this.props
        var containsValue = false;
        Object.keys(pages).forEach(function(key) {
            console.log(pages[key].path + '-' + path)
            if (pages[key].path === path) {
                containsValue = true
            }
        });
        return containsValue
    }

    //This method will normalize characters for path, and then remove all non-latin characters
    convertValueToPath() {
        var pagePath = this.state.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        pagePath = '/' + pagePath.replace(/[^a-zA-Z0-9]+/g, "");
        return pagePath.toLowerCase()
    }

    onChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <div>
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


const mapStateToProps = ({ pages }) => {
    return {
        pages
    };
};

export default connect(mapStateToProps, actions)(AddNewPage);