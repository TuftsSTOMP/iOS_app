/*
 *	CheckInPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The page to handle users checkin in materials (that they have removed)
 */

'use strict';

import React, { Component } from 'react';
import {
 	StyleSheet,
 	View,
  	RefreshControl,
  	Dimensions
} from 'react-native';
import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
	Header,
	Spinner,
	Footer,
	Button,
	Icon,
	Title
} from 'native-base';

import Theme from '../../themes/version1';
import Picker from 'react-native-picker';
import {Actions} from 'react-native-router-flux';

import AuthenticatedComponent from '../AuthenticatedComponent';

import StompApiService from '../../services/StompApiService';
import StompApiStore from '../../stores/StompApiStore';

import MaterialCartStore from '../../stores/MaterialCartStore';
import MaterialCartActions from '../../actions/MaterialCartActions';

var styles = StyleSheet.create({
  	emptyCartMsg: {
		fontSize: 18,
		textAlign: 'center',
		color: '#656565',
		padding: 30,
		marginTop: 65,
  	},
  	container: {
		padding: 30,
		marginTop: 15,
		alignItems: 'center'
  	}
});

const contextTypes = {
  	drawer: React.PropTypes.object,
};

class CheckInPage extends Component {
 	constructor(props) {
		super(props)
		this.state = {
	  		loading : true,
	  		checkInCart : this._getCheckInList(),
	  		pickerData : [1,2,3],
			selectedValue : 1,
			pickerTitle : ""
		}

	  	this.changeCheckInListener = this._onCheckInDataChange.bind(this);
  	}

  	_getCheckInList() {
		var cart = MaterialCartStore.getCheckInCart();
		var list = [];
		for(var key in cart){ list.push(cart[key]) }

		return list;
	}

	_onCheckInDataChange() {
		this.setState({loading : false});
	  	this.setState({checkInCart : this._getCheckInList()});
	}

  	componentDidMount() {
		StompApiService.getMyCheckedOutTotal(this.props.serverName, this.props.jwt);
 	}

  	componentWillMount() {
	  	MaterialCartStore.addChangeListener(this.changeCheckInListener);
  	}

  	componentWillUnmount() {
	  	MaterialCartStore.removeChangeListener(this.changeCheckInListener);
  	}

	_onRefresh() {
		this.setState({loading : true});
  		StompApiService.getMyCheckedOutTotal(this.props.serverName, this.props.jwt);
	}

	_removeMaterialFromCart(materialName) {
		MaterialCartActions.RemoveCheckInItem(materialName);
	}

	changeQuantity(materialName, currentQuantity, maxQuantity) {
		var quantityOptions = [];
		for (var i = 1; i <= maxQuantity; i++) {
    		quantityOptions.push(i);
		}

		this.setState({pickerData : quantityOptions});
		this.setState({pickerTitle : materialName});
		this.setState({selectedValue: currentQuantity});

		this.picker.toggle();
  	}

	_submitCheckIn() {
		var postData = new FormData();
		this._getCheckInList().map(
			function(material) {
				postData.append( material.name.replace(' ', '_'), material.quantity );
			}
		);
		
		StompApiService.checkinMaterial(this.props.serverName, this.props.jwt, postData);
	}
  
  	_renderRow(material) {
  		let date = material.action_date;
  		let prettyDate = (new Date(date)).toDateString();

  		return (
  			<ListItem iconRight
  				onPress = {this.changeQuantity.bind(this, material.name, parseInt(material.quantity), material.maxQuantity)}
  			>
  				<Text> {material.quantity} {material.name} </Text>
  				<Text note>Earliest: { prettyDate }</Text>
  				<Icon name = 'ios-trash' onPress = {this._removeMaterialFromCart.bind(this, material.name)}/>
  			</ListItem>
  		);
  	}
  	
  	menuClick() {
		this.context.drawer.open()
	}

  	render() {
  		let submitMessage;
		if (this.state.checkInCart.length == 0) {
			//cart is empty because the api returned an empty array
			if (StompApiStore.isCheckinListEmpty()) {
				submitMessage = (
					<Text style={styles.emptyCartMsg}>
		 				There are no items in your cart  (Pull to refresh)
					</Text>
				);
			} else { // cart is emtpy because the user deleted some items from the view
				submitMessage = (
					<Text style={styles.emptyCartMsg}>
		 				To see your cart, pull to refresh
					</Text>
				);
			}
			
		} else {
			submitMessage = (
				<View style={styles.container}>
				<Button block success onPress = {this._submitCheckIn.bind(this)}>
					<Text> Submit CheckIn </Text>
				</Button>
				</View>
			);
		}
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
            	{ this.state.loading ? <Spinner/> :
            		<View>
						<List
							dataArray={this.state.checkInCart}
							renderRow = { material => (this._renderRow(material)) }>
						</List>
						<View>
							{submitMessage}
						</View>
					</View>
				}
				</Content>
				<Footer>
					<Picker
						ref={picker => {this.picker = picker}}
						style={{height: Dimensions.get('window').height / 2}}
						pickerData={this.state.pickerData}
						pickerTitle = {this.state.pickerTitle}
						pickerCancelBtnText= "Undo"
						pickerBtnText= "Save"
						showMask={true}
						elevation={5}
						selectedValue={this.state.selectedValue}
						onPickerDone={(pickedValue) => {
							console.log(pickedValue)
							MaterialCartActions.UpdateCheckInItemWithQuantity(this.state.pickerTitle, pickedValue[0]);
						}} />
				</Footer>
			</Container>
		);
  	}
}

CheckInPage.contextTypes = contextTypes;
export default AuthenticatedComponent(CheckInPage);