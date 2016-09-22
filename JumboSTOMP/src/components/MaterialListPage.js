'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	AlertIOS
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

import Picker from 'react-native-picker';

import AuthenticatedComponent from './AuthenticatedComponent';

import {Actions} from 'react-native-router-flux';

import StompApiService from '../services/StompApiService';
import StompApiConstants from '../constants/StompApiConstants';
import StompApiStore from '../stores/StompApiStore';

import MaterialCartActions from '../actions/MaterialCartActions';
import MaterialCartStore from '../stores/MaterialCartStore';


const styles = StyleSheet.create({
  selectedQuantity: {
  	color: 'green'
  }
});


export default AuthenticatedComponent(class MaterialListPage extends Component {

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


	//All loads
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

  	//
  	// Render the content of a row in the list
  	//
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

	render() {
		return (
			<Container theme={Theme}>
                <Header>
                	<Title>List of Materials</Title>
                	<Button transparent>
                 		<Icon name = 'ios-search' />
                 	</Button>
                </Header>
                <Content>
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
						showMask={true}
						elevation={5}
						selectedValue={this.state.selectedValue}
						onPickerDone={(pickedValue) => {
							MaterialCartActions.AddItem(this.state.pickerTitle, pickedValue[0], this.state.selectedValueMax);
						}} />
				</Footer>
			</Container>
		);
	}
});


