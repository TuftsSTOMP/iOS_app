/*
 *	MaterialListPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The page to view information the list of materials and add them to cart
 */

'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	RefreshControl,
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

import Theme from '../themes/version1';
import Picker from 'react-native-picker';
import {Actions} from 'react-native-router-flux';

import AuthenticatedComponent from './AuthenticatedComponent';

import StompApiService from '../services/StompApiService';
import StompApiStore from '../stores/StompApiStore';

import MaterialCartActions from '../actions/MaterialCartActions';
import MaterialCartStore from '../stores/MaterialCartStore';

const styles = StyleSheet.create({
  	selectedQuantity: {
  		color: 'green'
  	}
});

const contextTypes = {
  drawer: React.PropTypes.object,
};

class MaterialListPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			materials : [],
			pickerData : [1,2,3],
			selectedValue : 1,
			selectedValueMax: 1,
			pickerTitle : "Material Name",
			loading : true
		}

		this.changeStompApiDataListener = this._onStompApiDataChange.bind(this);
	}

	_getStompApiDataState() {
		return (StompApiStore.getMaterialList());
	}

	componentDidMount() {
		StompApiService.getFullMaterialList(this.props.serverName, this.props.jwt);
	}

	componentWillMount() {
		StompApiStore.addChangeListener(this.changeStompApiDataListener);
	}

	_onStompApiDataChange() {
		this.setState({loading : false});

		var jsArr = JSON.parse(this._getStompApiDataState());
		this.setState({materials : jsArr});
	}

	componentWillUnmount() {
		StompApiStore.removeChangeListener(this.changeStompApiDataListener);
	}

  	viewDetails(materialName) {
		StompApiService.getMaterialDetailPage(this.props.serverName, this.props.jwt, materialName);
		Actions.MaterialDetailPage({materialName});
  	}

  	_onRefresh() {
		this.setState({loading : true});
  		StompApiService.getFullMaterialList(this.props.serverName, this.props.jwt);
	}

  	//
  	// Handle the action when a user selects a material
  	// Material is already in cart : Remove it
  	// Material is NOT already in cart : Show picker to allow selection
  	//
  	toggleMaterial(materialName, max_quantity) {

		if (MaterialCartStore.hasMaterial(materialName)) {
			MaterialCartActions.RemoveItem(materialName);
		} else {
			var quantityOptions = [];
			for (var i = 1; i <= max_quantity; i++) {
    			quantityOptions.push(i);
			}
			this.setState({pickerData : quantityOptions});
			this.setState({pickerTitle : materialName});
			this.setState({selectedValueMax : max_quantity});

			this.picker.toggle();
		}
	  		
  	}

	_renderRow(material) {
		let rowContent;
		if (MaterialCartStore.hasMaterial(material.name)) {
			let current_quantity = MaterialCartStore.getMaterial(material.name).quantity;
			rowContent = (
				<ListItem iconRight onPress ={this.toggleMaterial.bind(this, material.name, material.max_quantity)} >
					<Icon name='ios-information-circle' onPress ={this.viewDetails.bind(this, material.name)} />
					<Text style={styles.selectedQuantity}>{material.name} ({current_quantity})</Text>
				</ListItem>
			);
		} else {
			rowContent = (
				<ListItem iconRight onPress ={this.toggleMaterial.bind(this, material.name, material.max_quantity)}>
					<Icon name='ios-information-circle' onPress ={this.viewDetails.bind(this, material.name)} />
					<Text>{material.name}</Text>
				</ListItem>
			);
		}

		return (
			<View>
				{rowContent}
			</View>
			
		);
	}

	menuClick() {
		this.context.drawer.open()
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
            		{ this.state.loading ? <Spinner/> :
						<List
							dataArray={this.state.materials}
							renderRow = { material => (this._renderRow(material)) }>
						</List>
					}
				</Content>
				<Footer>
					<Picker
						ref={picker => this.picker = picker}
						style={{height: Dimensions.get('window').height / 2}}
						pickerData={this.state.pickerData}
						pickerTitle = {this.state.pickerTitle}
						pickerCancelBtnText= "Undo"
						pickerBtnText= "Save"
						pickerToolBarFontSize = {10}
						pickerFontSize = {10}
						showMask={true}
						elevation={5}
						selectedValue={this.state.selectedValue}
						onPickerDone={(pickedValue) => {
							MaterialCartActions.AddItemWithMaxQuantity(this.state.pickerTitle, pickedValue[0], this.state.selectedValueMax);
						}} />
				</Footer>
			</Container>
		);
	}
}

MaterialListPage.contextTypes = contextTypes;
export default AuthenticatedComponent(MaterialListPage);


