import React from "react";
import Page from "./components/Page";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import * as actions from "./actions";
import { connect } from "react-redux";


class RouteComponent extends React.Component {

	componentDidMount() {
		this.props.fetchPages();
	}

	renderRoutes() {
		var routes = []
		const { pages } = this.props
		console.log(pages)
		if (!(Object.keys(pages).length === 0)) {
			Object.keys(pages).forEach(function(key){
				console.log(pages[key].path)
				routes.push((<Route key={pages[key].path} path={"/" + pages[key].path} component={App} />))
				// components.push([pages[key].path, <App />])
			})
		}
		return routes
	}

	render() {
		return (
			<Router >
				<div>
					{this.renderRoutes()}
				</div>
			</Router>
		);
	}
}

const mapStateToProps = ({ pages }) => {
	return {
		pages
	};
};

export default connect(mapStateToProps, actions)(RouteComponent);