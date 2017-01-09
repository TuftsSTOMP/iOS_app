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
	Spinner,
	Header,
	Footer,
	Button,
	Icon,
	Title
} from 'native-base';

import Theme from '../themes/version1';
import Picker from 'react-native-picker';

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
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row'
  	},
  	leftButton: {
  		alignSelf: 'stretch',
  		flex: 0.5,
  		marginRight: 10
  	},
  	rightButton: {
  		alignSelf: 'stretch',
  		flex: 0.5,
  		marginLeft: 10
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
			pickerTitle : ""
		}

		this.changeMaterialCartListener = this._onMaterialCartChange.bind(this);
	}
	

	_getMaterialCart() {
		var materialCart = MaterialCartStore.getCart();
		var materialList = [];
		for(var key in materialCart){ materialList.push(materialCart[key]) }

		return materialList;
	}

	componentWillMount() {
		MaterialCartStore.addChangeListener(this.changeMaterialCartListener);
	}

	_onMaterialCartChange() {
		this.setState({cart : this._getMaterialCart()});
	}

	componentWillUnmount() {
		MaterialCartStore.removeChangeListener(this.changeMaterialCartListener);
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
	_submitCheckout(type) {
		this.setState({submitting : true});

		var postData = new FormData();
		this._getMaterialCart().map(
			function(material) {
				postData.append( material.name.replace(' ', '_'), material.quantity );
			}
		);
		
		if (type == "remove") {
			StompApiService.guestRemoveMaterial(this.props.serverName, this.props.jwt, postData);
		} else if (type == "return") {
			StompApiService.guestReturnMaterial(this.props.serverName, this.props.jwt, postData);
		}

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
			submitMessage = (
				<View style={styles.container}>
				<Button style={styles.leftButton} large success onPress = {this._submitCheckout.bind(this, "return")}>
					<Text> Return </Text>
				</Button>
				
				<Button style={styles.rightButton} large danger onPress = {this._submitCheckout.bind(this, "remove")}>
					<Text> Remove </Text>
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