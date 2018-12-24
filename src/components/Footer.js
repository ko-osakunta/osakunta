import React from 'react'
import { connect } from "react-redux"
import { fetchContact } from "../actions"

class Footer extends React.Component {

    componentDidMount() {
        this.props.fetchContact()
    }

    renderAsHtml(text) {
        return <div dangerouslySetInnerHTML={{ __html: text }} />
    }

    renderFooter() {
        const { contact } = this.props
        if (!(Object.keys(contact).length === 0)) {
            return (
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 offset-lg-1 offset-xl-0">
                                {this.renderAsHtml(contact.nation)}
                            </div>
                            <div className="col-lg-2 col-xl-3 offset-lg-2 offset-xl-3">
                                {this.renderAsHtml(contact.socialMedia)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 offset-lg-1 offset-xl-0">
                                {this.renderAsHtml(contact.address)}
                            </div>
                            <div className="col-lg-2 col-xl-3 offset-lg-0">
                                {this.renderAsHtml(contact.HYnation)}
                            </div>
                            <div className="col-lg-2 col-xl-3">
                                {this.renderAsHtml(contact.fb)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 offset-lg-1 offset-xl-0">
                                {this.renderAsHtml(contact.apartment)}
                            </div>
                            <div className="col-lg-2 col-xl-3 offset-lg-0">
                                {this.renderAsHtml(contact.Ytieto)}
                            </div>
                            <div className="col-lg-2 col-xl-3 offset-xl-0">
                                {this.renderAsHtml(contact.ig)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 offset-xl-0">
                                {this.renderAsHtml(contact.postalCodeAndCity)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="footer">
                {this.renderFooter()}
            </div>
        )
    }
}

const mapStateToProps = ({ contact }) => ({ contact }) // Not an identity function!

export default connect(mapStateToProps, {fetchContact})(Footer)
