/*
 *	MaterialTransactionInfoPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 01-10-2017
 *
 *	The page to view information about a specific material's transactions
 */

'use strict';

import React, { Component } from 'react';
import {
	ListView,
	AlertIOS
} from 'react-native';
import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
	Card,
	CardItem,
	Badge,
	Header,
	Button,
	Spinner,
	Icon,
	Title
} from 'native-base';

import Theme from '../../themes/version1';
import {Actions} from 'react-native-router-flux';

import AuthenticatedComponent from '../AuthenticatedComponent';

import StompApiService from '../../services/StompApiService';
import StompApiConstants from '../../constants/StompApiConstants';
import StompApiStore from '../../stores/StompApiStore';

const contextTypes = {
  drawer: React.PropTypes.object,
};

class MaterialTransactionInfoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			materialName: this.props.name,
			materialTransactions : [],
			loading : true
		}

		this.changeStompApiMaterialTransactionListener = this._onStompApiMaterialTransactionChange.bind(this);
	}
	
	_getStompApiMaterialTransactionState() {
		return StompApiStore.getMaterialTransactionTotal();
	}

	componentWillMount() {
		StompApiStore.addChangeListener(this.changeStompApiMaterialTransactionListener);
	}

	_onStompApiMaterialTransactionChange() {
		var jsArr = JSON.parse(this._getStompApiMaterialTransactionState());
		this.setState({materialTransactions : jsArr});
		
		this.setState({loading : false});
	}

	componentWillUnmount() {
		StompApiStore.removeChangeListener(this.changeStompApiMaterialTransactionListener);
	}

	_renderRow(transaction) {
		let prettyDate = (new Date(transaction.action_date)).toDateString();
		return (
			<ListItem>
				<Card>
					<CardItem>
						<Text>{transaction.f_name} {transaction.l_name} ({transaction.quantity})</Text>
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
					<Button transparent onPress={Actions.pop}>
						<Icon name = 'ios-arrow-back'/>
					</Button>
					<Title>{this.props.title}</Title>
				</Header>
				<Content>
				{this.state.loading ? <Spinner /> : 
					<List
						dataArray={this.state.materialTransactions}
						renderRow = { transaction => (this._renderRow(transaction)) }>
					</List>
				}
				</Content>
			</Container>
		);
	}
}

MaterialTransactionInfoPage.contextTypes = contextTypes;
export default AuthenticatedComponent(MaterialTransactionInfoPage);