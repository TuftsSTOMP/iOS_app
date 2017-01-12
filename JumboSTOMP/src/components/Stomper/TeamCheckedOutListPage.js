/*
 *	TeamCheckedOutListPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The Team Landing page.
 */
'use strict';

import React, { Component } from 'react';
import {
 	StyleSheet,
  	View,
  	RefreshControl
} from 'react-native';
import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
	Card,
	CardItem,
	Header,
	Button,
	Spinner,
	Title
} from 'native-base';

import Theme from '../../themes/version1';
import {Actions} from 'react-native-router-flux';
import AuthenticatedComponent from '../AuthenticatedComponent';

import StompApiService from '../../services/StompApiService';
import StompApiStore from '../../stores/StompApiStore';


/*
Look to refactor and add this to the AuthenticatedComponent HOC so that it isn't required
for each new component. Leave like this for now though because it works
*/
const contextTypes = {
  drawer: React.PropTypes.object,
};



class TeamCheckedOutListPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedOutList : [],
			loading : true
		}

		this.changeStompApiTeamCheckedoutListListener = this._onStompApiTeamCheckedoutListChange.bind(this);
	}

	componentWillMount() {
		StompApiStore.addChangeListener(this.changeStompApiTeamCheckedoutListListener);
	}

	componentWillUnmount() {
		StompApiStore.removeChangeListener(this.changeStompApiTeamCheckedoutListListener);
	}

	componentDidMount() {
		StompApiService.getTeamCheckedoutList(this.props.serverName, this.props.jwt);
	}

	_getStompApiTeamCheckedoutList() {
		return StompApiStore.getTeamCheckedoutList();
	}

	_onStompApiTeamCheckedoutListChange() {
		var jsArr = JSON.parse(this._getStompApiTeamCheckedoutList());
		this.setState({checkedOutList : jsArr});
		
		this.setState({loading : false});
	}

	_onRefresh() {
		this.setState({loading : true});
  		StompApiService.getTeamCheckedoutList(this.props.serverName, this.props.jwt);
	}

	menuClick() {
		this.context.drawer.open()
	}

	_renderRow(transaction) {
		let prettyDate = (new Date(transaction.action_date)).toDateString();
		return (
			<ListItem>
				<Card>
					<CardItem>
						<Text>{transaction.name} ({transaction.quantity})</Text>
						<Text note>Due back: {prettyDate}</Text>
					</CardItem>
				</Card>
			</ListItem>
		);
	}

  	render() {
		return (
			<Container theme={Theme}>
				<Header> 
                 	<Button transparent onPress = {this.menuClick.bind(this)}> 
                 		{this.props.navImageSrc}
                 	</Button>
					<Title>{this.props.title}</Title>
				</Header>

				<Content
					refreshControl={
         				<RefreshControl
            				refreshing={false}
            				onRefresh={this._onRefresh.bind(this)} />
        			}
				>
				{this.state.loading ? <Spinner /> : 
					<List
						dataArray={this.state.checkedOutList}
						renderRow = { transaction => (this._renderRow(transaction)) }>
					</List>
				}
				</Content>
		  	</Container>
		);
  	}
}

TeamCheckedOutListPage.contextTypes = contextTypes;
export default AuthenticatedComponent(TeamCheckedOutListPage);