import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";

//This form creates a new page to the site
class AddNewPage extends React.Component {
    
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    //When called this method will check if formatted path and title exist, 
    //and creates a new page if they don't
    onClick = () => {
        var pagePath = this.convertValueToPath();

        if (this.isUsed("title", this.state.value.toLowerCase())) {
            window.alert("Sivu on jo olemassa tällä nimellä!");
        } else if (this.isUsed("path", pagePath)) {
            window.alert("Sivu on jo olemassa tällä polulla!");
        } else {
            this.props.createNewPage(pagePath, this.state.value)
            window.location.reload()
        }
    }

    isUsed(property, value) {
        const { pages } = this.props
        let containsValue = false
        for (const key in pages) {
            if (pages[key][property] === value) {
                containsValue = true
            }
        }
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
                        Uuden sivun nimi:
                    <input type="text" name="text" value={this.state.value} onChange={this.onChange}/>
                        <button className="btn-primary" onClick={this.onClick}>
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
