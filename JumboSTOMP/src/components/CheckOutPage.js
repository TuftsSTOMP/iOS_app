/*
 *	CheckOutPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The page to handle users checking out materials
 */

'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions
} from 'react-native';
import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
	Card,
	CardItem,
	Spinner,
	Header,
	Footer,
	Button,
	Icon,
	Title
} from 'native-base';

import Theme from '../themes/version1';
import Picker from 'react-native-picker';
import {Actions} from 'react-native-router-flux';
import {AlertIOS} from 'react-native';

import AuthenticatedComponent from './AuthenticatedComponent';

import MaterialCartStore from '../stores/MaterialCartStore';
import MaterialCartActions from '../actions/MaterialCartActions';

import StompApiService from '../services/StompApiService';

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


class CheckOutPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			cart : this._getMaterialCart(),
			pickerData : [1,2,3],
			selectedValue : 1,
			pickerTitle : "",
			returnDate: this._getReturnDate()
		}

		this.changeMaterialCartListener = this._onMaterialCartChange.bind(this);
		this.changeReturnDateListener = this._onReturnDateChange.bind(this);
	}
	

	_getMaterialCart() {
		var materialCart = MaterialCartStore.getCart();
		var materialList = [];
		for(var key in materialCart){ materialList.push(materialCart[key]) }

		return materialList;
	}

	_getReturnDate() {
		return MaterialCartStore.getReturnDate();
	}

	componentWillMount() {
		MaterialCartStore.addChangeListener(this.changeMaterialCartListener);
		MaterialCartStore.addChangeListener(this.changeReturnDateListener);
	}

	_onMaterialCartChange() {
		this.setState({cart : this._getMaterialCart()});
	}

	_onReturnDateChange() {
		this.setState({returnDate: this._getReturnDate()});
	}

	componentWillUnmount() {
		MaterialCartStore.removeChangeListener(this.changeMaterialCartListener);
		MaterialCartStore.removeChangeListener(this.changeReturnDateListener);
	}

	_removeMaterialFromCart(materialName) {
		MaterialCartActions.RemoveItem(materialName);
	}

	//
	//	Adjust the quantity of a material in the cart
	//	Max quantity is used to limit the adjustment
	//
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

	//
	//	Submit the material cart for checkout. Query the Stomp API remove endpoint
	//
	_submitCheckout() {
		if(this.state.returnDate == null) {
			AlertIOS.alert("Invalid Checkout", "You have not specified a return date");
			return
		}

		this.setState({submitting : true});

		var postData = new FormData();
		this._getMaterialCart().map(
			function(material) {
				postData.append( material.name.replace(' ', '_'), material.quantity );
			}
		);

		var returnDateFormatted = this.state.returnDate.toJSON().split('T')[0];
		postData.append("due", returnDateFormatted);
		
		StompApiService.checkoutMaterial_remove(this.props.serverName, this.props.jwt, postData);

		this.setState({submitting : false});
	}

	//
	//	Render the row in the list of materials that are in the checkout store
	//
	_renderRow(material) {
		return (
			<ListItem iconRight 
				onPress = {this.changeQuantity.bind(this, material.name, material.quantity, material.maxQuantity)}>
					<Text>{material.quantity} {material.name}</Text>
					<Icon name = 'ios-trash' onPress = {this._removeMaterialFromCart.bind(this, material.name)}/>
			</ListItem>
		);
	}

	selectCalendarPage() {
		Actions.CheckOutDate();
  	}

	menuClick() {
		this.context.drawer.open()
	}

	render() {
		let submitMessage;
		if (this.state.cart.length == 0) {
			submitMessage = (
				<View>
					<Text style={styles.emptyCartMsg}>
		 				There are no items in your cart
					</Text>
				</View>
			);
		} else {
			let returnDate = this.state.returnDate;
			submitMessage = (
				<View>
					<Card>
                    	<CardItem onPress = {this.selectCalendarPage.bind(this)}>
                    		<Icon name='ios-calendar'/>
                        	<Text>{returnDate == null ? "Select Return Date" : "Return On: " + returnDate.toDateString()}</Text>
                        </CardItem>
                    </Card>
					<Button block success onPress = {this._submitCheckout.bind(this)}>
						<Text> Submit CheckOut </Text>
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
            	<Content>
					<List
						dataArray={this.state.cart}
						renderRow = { material => (this._renderRow(material)) }>
					</List>
					<View>
						{submitMessage}
					</View>
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
							MaterialCartActions.UpdateItemWithQuantity(this.state.pickerTitle, pickedValue[0]);
						}} />
				</Footer>
			</Container>
		);
	}
}

CheckOutPage.contextTypes = contextTypes;
export default AuthenticatedComponent(CheckOutPage);