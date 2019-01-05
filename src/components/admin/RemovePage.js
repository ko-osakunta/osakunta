import React from 'react'
import { connect } from "react-redux";
import { fetchKeyByPath, removePageByKey } from "../../actions";

//Pressing the button in this class will remove the page. Admin tool.
class RemovePage extends React.Component {
    
    componentWillMount() {
        const path = window.location.pathname
        this.props.fetchKeyByPath(path)
    }

    onClick = (event) => {
        event.preventDefault();
        const { pageKey } = this.props
        if (pageKey !== undefined) {
            this.props.removePageByKey(pageKey);
        }
        window.location.reload()
    }

    render() {
        return (
            <div>
                <div>
                    <button className="btn-primary" onClick={this.onClick}>
                        Poista nykyinen sivu
                    </button>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = ({ pageKey }) => ({ pageKey }) // Not an identity function!

export default connect(mapStateToProps, {fetchKeyByPath, removePageByKey})(RemovePage);