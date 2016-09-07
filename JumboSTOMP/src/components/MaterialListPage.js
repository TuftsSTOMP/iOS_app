'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	AlertIOS
} from 'react-native';
import AuthenticatedComponent from './AuthenticatedComponent';

import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';


import StompApiService from '../services/StompApiService';
import StompApiConstants from '../constants/StompApiConstants';
import StompApiStore from '../stores/StompApiStore';


var styles = StyleSheet.create({
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
	},
	container: {
		padding: 30,
		marginTop: 65,
		alignItems: 'center'
	}
});



export default AuthenticatedComponent(class MaterialListPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			materials : this._getStompApiDataState()
		}

		this.changeStompApiDataListener = this._onStompApiDataChange.bind(this);
	}

/*
	componentWillReceiveProps() {
		this.setState({jwt : this.props.jwt});

		//StompApiService.submitGet(this.props.serverName + StompApiConstants.MATERIAL_GET_ALL_URL, this.state.jwt);
	}
	*/
	

	_getStompApiDataState() {
		return {
			data: StompApiStore.data
		};
	}

	componentDidMount() {
		//StompApiService.submitGet(this.props.serverName + StompApiConstants.MATERIAL_GET_ALL_URL, this.props.jwt);
	}


	//All loads
	componentWillMount() {
		//this.setState({jwt : this.props.jwt});
		StompApiStore.addChangeListener(this.changeStompApiDataListener);

		//StompApiService.submitGet(this.props.serverName + StompApiConstants.MATERIAL_GET_ALL_URL, this.state.jwt);
		//StompApiService.submitGet(this.props.serverName + StompApiConstants.MATERIAL_GET_ALL_URL, this.props.jwt);
	}

	_onStompApiDataChange() {
		this.setState({materials : this._getStompApiDataState()});
	}

	componentWillUnmount() {
		StompApiStore.removeChangeListener(this.changeStompApiDataListener);
	}



	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.description}>
				 MaterialListPage
				 **{this.props.jwt}**
				 
				  **{this.state.materials.data}**
				</Text>
				<Button>Get all materials</Button>
				<Button onPress={Actions.MaterialDetailPage}>next screen for MaterialDetailPage</Button>
			</View>
		);
	}
});