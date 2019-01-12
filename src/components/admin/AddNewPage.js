import React from 'react'
import { connect } from "react-redux";
import { push } from "connected-react-router"
import { createNewPage, uploadBannerToDatabase } from "../../actions";

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
        const pagePath = this.convertValueToPath()

        try {
            this.props.createNewPage(pagePath, this.state.value)
            this.props.push("/")
        } catch (error) {
            window.alert(error)
        }
    }

    //This method will normalize characters for path, and then remove all non-latin characters
    convertValueToPath() {
        let pagePath = this.state.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        pagePath = '/' + pagePath.replace(/[^a-zA-Z0-9]+/g, "");
        return pagePath.toLowerCase()
    }

    onChange = (event) => {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div>
                Uuden sivun nimi:
                    <input type="text" name="text" value={this.state.value} onChange={this.onChange} />
                <button className="btn-primary" onClick={this.onClick}>
                    Lisää uusi sivu
                        </button>
            </div>

        )
    }
}


const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { createNewPage, push })(AddNewPage);
