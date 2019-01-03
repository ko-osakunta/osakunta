import React from 'react'
import { connect } from "react-redux"
import { fetchPageByPath } from "../../actions"

import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'

//Here is the main text of the page that admin can edit
class PageText extends React.Component {

    
    componentWillMount() {
        const path = window.location.pathname
        console.log(path)
        this.props.fetchPageByPath(path);
    }

    getAlign(alignment) {
        return (alignment === 'center' ? "middle" : alignment);
    }
    renderText() {
        const { page } = this.props
        let options = {
            entityStyleFn: (entity) => {
              const entityType = entity.get('type').toLowerCase();
              if (entityType === 'image') {
                const data = entity.getData();
                console.log(data)
                return {
                  element: 'img',
                  attributes: {
                    src: data.src,
                    align: this.getAlign(data.alignment),
                    //Bubblegum-solution
                    className: 'img-' + data.alignment,
                    width: data.width + '%'
                  },
                };
              }
            },
          };    
        if (!(Object.keys(page).length === 0)) {
            console.log(JSON.parse(page.text))
            const pageText = stateToHTML(convertFromRaw(JSON.parse(page.text)), options);
            console.log(pageText)
            return <div dangerouslySetInnerHTML={{ __html: pageText}} />
        }
    }

    render() {
        return (
            <div className="pageText">
                {this.renderText()}
            </div>
        )
    }
}

const mapStateToProps = ({ page }) => ({ page }) // Not an identity function!

export default connect(mapStateToProps, {fetchPageByPath})(PageText)
