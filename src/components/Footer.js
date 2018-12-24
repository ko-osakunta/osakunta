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
                <table className="footer">
                    <tr className="row">
                        <td className="col-lg-3 offset-lg-1 offset-xl-0">
                            {this.renderAsHtml(contact.nation)}
                        </td>
                        <td className="col-lg-2 col-xl-3 offset-lg-2 offset-xl-3">
                            {this.renderAsHtml(contact.socialMedia)}
                        </td>
                    </tr>
                    <tr className="row">
                        <td className="col-lg-3 offset-lg-1 offset-xl-0">
                            {this.renderAsHtml(contact.address)}
                        </td>
                        <td className="col-lg-2 col-xl-3 offset-lg-0">
                            {this.renderAsHtml(contact.HYnation)}
                        </td>
                        <td className="col-lg-2 col-xl-3">
                            {this.renderAsHtml(contact.fb)}
                        </td>
                    </tr>
                    <tr className="row">
                        <td className="col-lg-3 offset-lg-1 offset-xl-0">
                            {this.renderAsHtml(contact.apartment)}
                        </td>
                        <td className="col-lg-2 col-xl-3 offset-lg-0">
                            {this.renderAsHtml(contact.Ytieto)}
                        </td>
                        <td className="col-lg-2 col-xl-3 offset-xl-0">
                            {this.renderAsHtml(contact.ig)}
                        </td>
                    </tr>
                    <tr className="row">
                        <td className="col-xl-3 offset-xl-0">
                            {this.renderAsHtml(contact.postalCodeAndCity)}
                        </td>
                    </tr>
                </table>
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
