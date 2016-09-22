'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	ListView,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
	Header,
	Footer,
	Button,
	Icon,
	Title
} from 'native-base';

import Theme from '../themes/version1';

import Picker from 'react-native-picker';
import AuthenticatedComponent from './AuthenticatedComponent';

import { SwipeListView } from 'react-native-swipe-list-view';

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
  	}
});


export default AuthenticatedComponent(class CheckOutPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			cart : this._getMaterialCart(),
			pickerData : [1,2,3],
			selectedValue : 1,
			pickerTitle : ""
		}

		this.changeMaterialCartListener = this._onMaterialCartChange.bind(this);
		this.changeQuantityBound = this.changeQuantity.bind(this);
	}
	

	_getMaterialCart() {
		var materialCart = MaterialCartStore.getCart();
		var materialList = [];
		for(var key in materialCart){ materialList.push(materialCart[key]) }

		return materialList;
	}
	componentWillReceiveProps(nextProps) {
		console.log("check out page willl receive props");
		console.log("nextProps", nextProps);
	}

	componentWillUpdate(nextProps, nextState) {
		console.log("check out page will update");
	}

	//All loads
	componentWillMount() {
		console.log("check out page will mount");
		MaterialCartStore.addChangeListener(this.changeMaterialCartListener);
	}

	_onMaterialCartChange() {
		this.setState({cart : this._getMaterialCart()});
	}

	componentWillUnmount() {
		console.log("check out page will UNmount");
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
	_submitCheckout() {
		var postData = new FormData();
		this._getMaterialCart().map(
			function(material) {
				postData.append( material.name.replace(' ', '_'), material.quantity );
			}
		);
		
		StompApiService.checkoutMaterial_remove(this.props.serverName, this.props.jwt, postData);
	}

	//
	//	Render the row in the list of materials that are in the checkout store
	//
	_renderRow(material) {
		return (
			<ListItem iconRight 
				onPress = {this.changeQuantityBound.bind(this, material.name, material.quantity, material.maxQuantity)}>
					<Text>{material.quantity} {material.name}</Text>
					<Icon name = 'ios-trash' onPress = {this._removeMaterialFromCart.bind(this, material.name)}/>
			</ListItem>
		);
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
				<Button block success onPress = {this._submitCheckout.bind(this)}>
					<Text> Submit CheckOut </Text>
				</Button>
			);
		}
		return (
			<Container theme={Theme}>
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
							MaterialCartActions.AddItem(this.state.pickerTitle, pickedValue[0]);
						}} />
				</Footer>
			</Container>
		);
	}
});