/*
 *	MaterialTransactionInfoPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The page to view information about a specific material's transactions
 */

'use strict';

import React, { Component } from 'react';
import {
	ListView
} from 'react-native';
import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
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

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class MaterialTransactionInfoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			materialTransactions : ds.cloneWithRows([]),
			//loading : true
		}

		//this.changeStompApiDataListener = this._onStompApiDataChange.bind(this);
	}
	/*
	_getStompApiDataState() {
		return StompApiStore.getMaterialDetail();
	}

	componentWillMount() {
		StompApiStore.addChangeListener(this.changeStompApiDataListener);
	}

	_onStompApiDataChange() {
		var jsArr = JSON.parse(this._getStompApiDataState());
		this.setState({materialDetail : ds.cloneWithRows(jsArr)});
		
		this.setState({loading : false});
	}

	componentWillUnmount() {
		StompApiStore.removeChangeListener(this.changeStompApiDataListener);
	}

	_seeMaterialTransactionDetails(materialName) {
		Actions.MaterialTransactionInfoPage({materialName})
	}

	_renderRow(material) {
		return (
			<List>
                <ListItem iconLeft>
                	<Icon name='ios-cube' />
                    <Text>Name </Text>
                    <Badge>{material.name}</Badge>
                </ListItem>
                <ListItem iconLeft>
                    <Icon name='ios-eye' />
                    <Text>Quantity Available</Text>
                    <Badge>{material.q_avail}</Badge>
                </ListItem>
                <ListItem iconLeft>
                    <Icon name='ios-eye-off' />
                    <Text>Quantity Reserved </Text>
                    <Badge>{material.q_reserved}</Badge>
                </ListItem>
                <ListItem iconLeft>
                    <Icon name='ios-eye-off' />
                    <Text>Quantity Removed</Text>
                    <Badge>{material.q_removed}</Badge>
                </ListItem>
                <ListItem iconLeft>
                    <Icon name='ios-flag' />
                    <Text>Maximum Checkout Quantity</Text>
                    <Badge>{material.max_checkout_q}</Badge>
                </ListItem>
                <ListItem iconLeft>
                    <Icon name='ios-notifications' />
                    <Text>Low Quantity Threshold</Text>
                    <Badge>{material.low_q_thresh}</Badge>
                </ListItem>
                <ListItem button onPress = {this._seeMaterialTransactionDetails.bind(this, material.name)}>
               		<Text>Transaction details</Text>
                    <Text note>See who currently has this material</Text>
                </ListItem>
            </List>
		);
	}

	<ListView
						enableEmptySections = {true}
						dataSource={this.state.materialDetail}
						renderRow = {this._renderRow} />

	*/

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
					<Text> Material Transaction Info Page </Text>
				
				}
				</Content>
			</Container>
		);
	}
}

MaterialTransactionInfoPage.contextTypes = contextTypes;
export default AuthenticatedComponent(MaterialTransactionInfoPage);