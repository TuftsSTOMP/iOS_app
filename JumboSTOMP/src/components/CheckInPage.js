'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  RefreshControl,
  AlertIOS,
  ScrollView
} from 'react-native';

import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
	Badge,
	Header,
	Spinner,
	Footer,
	Button,
	Icon,
	Title
} from 'native-base';

import Theme from '../themes/version1';

import {Actions} from 'react-native-router-flux';

import StompApiService from '../services/StompApiService';

import StompApiConstants from '../constants/StompApiConstants';
import AuthenticatedComponent from './AuthenticatedComponent';

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


export default AuthenticatedComponent(class CheckInPage extends Component {
  constructor(props) {
	super(props)
	this.state = {
	  materialList : [],
	  loading : true
	}

	  this.changeStompApiDataListener = this._onStompApiDataChange.bind(this);
  }

  	_getStompApiDataState() {
		return (StompApiStore.getCheckinList());
  	}

  	componentDidMount() {
		StompApiService.getMyCheckedOutList(this.props.serverName, this.props.jwt);
 	}

  	componentWillMount() {
	  	StompApiStore.addChangeListener(this.changeStompApiDataListener);
  	}

  	_onStompApiDataChange() {
		this.setState({loading : false});

		var jsArr = JSON.parse(this._getStompApiDataState());
	  	this.setState({materialList : jsArr});
  }

  	componentWillUnmount() {
	  	StompApiStore.removeChangeListener(this.changeStompApiDataListener);
  	}


	_onRefresh() {
		this.setState({loading : true});
  		StompApiService.getMyCheckedOutList(this.props.serverName, this.props.jwt);
	}
  
  _renderRow(material) {
  		let date = material.transaction_date;
  		let dateOptions = {
  			hour12 : true,
  			//timeZoneName : 'short',
  			// weekday: 'long', 
  			// year: 'numeric', 
  			// month: 'long', 
  			// day: 'numeric' 
  		}
  		let prettyDate = (new Date(date)).toLocaleString('en-US', dateOptions);

  		return (
  		<ListItem iconRight>
  			<Text> {material.quantity} {material.name} </Text>
  			<Text note>{ prettyDate }</Text>
  			<Icon name = 'ios-trash'/>
  		</ListItem>
  		);
  }

  render() {
	return (
	  <Container theme={Theme}>
            <Content
            	refreshControl={
         			<RefreshControl
            			refreshing={false}
            			onRefresh={this._onRefresh.bind(this)} />
        		}
            >
            { this.state.loading ? <Spinner/> :
					<List
						dataArray={this.state.materialList}
						renderRow = { material => (this._renderRow(material)) }>
					</List>
			}
				
			</Content>
		</Container>
	);
  }
});