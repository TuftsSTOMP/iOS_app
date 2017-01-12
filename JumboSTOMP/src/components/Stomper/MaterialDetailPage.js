/*
 *	MaterialDetailPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The page to view information about a specific material
 */

'use strict';

import React, { Component } from 'react';
import {
	View,
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

//const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


class MaterialDetailPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			materialName: this.props.name,
			materialDetail : [],
			loading : true
		}

		this.changeStompApiDataListener = this._onStompApiDataChange.bind(this);
	}
	
	_getStompApiDataState() {
		return StompApiStore.getMaterialDetail();
	}

	componentWillMount() {
		StompApiStore.addChangeListener(this.changeStompApiDataListener);
	}

	_onStompApiDataChange() {
		var jsArr = JSON.parse(this._getStompApiDataState());
		this.setState({materialDetail : jsArr});
		
		this.setState({loading : false});
	}

	componentWillUnmount() {
		StompApiStore.removeChangeListener(this.changeStompApiDataListener);
	}

	_seeMaterialTransactionDetails(materialName) {
		StompApiService.getMaterialTransactionInfo(this.props.serverName, this.props.jwt, materialName);
		Actions.MaterialTransactionInfoPage({name: materialName});
	}

	_renderRow(material) {
		return (
			<View>
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
            </View>
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
					<View>
					<List
						dataArray={this.state.materialDetail}
						renderRow = {this._renderRow} />
					<Card>
						<CardItem onPress = {this._seeMaterialTransactionDetails.bind(this, this.state.materialName)}>
							<Text style={{textAlign:'center'}}> See who has this material currently </Text>
						</CardItem>
					</Card>
					</View>
				}
				</Content>
			</Container>
		);
	}
}

MaterialDetailPage.contextTypes = contextTypes;
export default AuthenticatedComponent(MaterialDetailPage);