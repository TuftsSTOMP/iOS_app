'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
  TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	RecyclerViewBackedScrollView,
	ListView,
	AlertIOS
} from 'react-native';

import Picker from 'react-native-picker';

import AuthenticatedComponent from './AuthenticatedComponent';

import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import { SwipeListView } from 'react-native-swipe-list-view';


import StompApiService from '../services/StompApiService';
import StompApiConstants from '../constants/StompApiConstants';
import StompApiStore from '../stores/StompApiStore';

import MaterialCartActions from '../actions/MaterialCartActions';
import MaterialCartStore from '../stores/MaterialCartStore';


const styles = StyleSheet.create({
  container: {
	backgroundColor: 'white',
	flex: 1
  },
  standalone: {
	marginTop: 30,
	marginBottom: 30,
  },
  standaloneRowFront: {
	alignItems: 'center',
	backgroundColor: '#CCC',
	justifyContent: 'center',
	height: 50,
  },
  standaloneRowBack: {
	alignItems: 'center',
	backgroundColor: '#8BC645',
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'space-between',
	padding: 15
  },
  backTextWhite: {
	color: '#FFF'
  },
  rowFront: {
	alignItems: 'center',
	backgroundColor: '#CCC',
	borderBottomColor: 'black',
	borderBottomWidth: 1,
	justifyContent: 'center',
	height: 50,
  },
   rowFrontSelected: {
	alignItems: 'center',
	backgroundColor: '#EEE',
	borderBottomColor: 'black',
	borderBottomWidth: 1,
	justifyContent: 'center',
	height: 50,
  },
  rowBack: {
	alignItems: 'center',
	backgroundColor: '#DDD',
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'space-between',
	paddingLeft: 15,
  },
  backRightBtn: {
	alignItems: 'center',
	bottom: 0,
	justifyContent: 'center',
	position: 'absolute',
	top: 0,
	width: 75
  },
  backRightBtnLeft: {
	backgroundColor: 'blue',
	right: 75
  },
  backRightBtnRight: {
	backgroundColor: 'red',
	right: 0
  },
  controls: {
	alignItems: 'center',
	marginBottom: 30
  },
  switchContainer: {
	flexDirection: 'row',
	justifyContent: 'center',
	marginBottom: 5
  },
  switch: {
	alignItems: 'center',
	borderWidth: 1,
	borderColor: 'black',
	paddingVertical: 10,
	width: 100,
  }, 
  separator: {
	height: 0.5,
	backgroundColor: '#CCCCCC',
  },
});


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default AuthenticatedComponent(class MaterialListPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			materials : ds.cloneWithRows([]),
			pickerData : [1,2,3],
			selectedValue : 1,
			pickerTitle : "Material Name"
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
		console.log("component will mount on material list page")
		//this.setState({jwt : this.props.jwt});
		StompApiStore.addChangeListener(this.changeStompApiDataListener);
	}

	_onStompApiDataChange() {
		var jsArr = JSON.parse(this._getStompApiDataState());
		this.setState({materials : ds.cloneWithRows(jsArr)});
	}

	componentWillUnmount() {
		console.log("component will unmount on material list page")
		StompApiStore.removeChangeListener(this.changeStompApiDataListener);
	}

  	viewDetails(materialName) {
		StompApiService.getMaterialDetailPage(this.props.serverName, this.props.jwt, materialName);
		Actions.MaterialDetailPage({materialName});
  	}

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

			this.picker.toggle();
		}
	  		
  	}

	_renderRow(material) {
		let rowContent;
		if (MaterialCartStore.hasMaterial(material.name)) {
			let current_quantity = MaterialCartStore.getMaterial(material.name).quantity;
			rowContent = (
				<View style={[styles.postDetailsContainer, styles.rowFrontSelected]}>
					<Text style={styles.postTitle}>{ material.name} </Text>
					<Text style={styles.commentorDetails}>current : {current_quantity}</Text>
					<View style={styles.separator} />
				</View>
			);
		} else {
			rowContent = (
				<View style={[styles.postDetailsContainer, styles.rowFront]}>
					<Text style={styles.postTitle}>{ material.name} </Text>
					<View style={styles.separator} />
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<TouchableOpacity onPress ={this.toggleMaterial.bind(this, material.name, material.max_quantity)}>
					{rowContent}
				</TouchableOpacity>
			</View>
		)
	}

	_renderHiddenRow(material) {
		return (
			<View style={styles.rowBack}>
				<TouchableOpacity 
					style={[styles.backRightBtn, styles.backRightBtnRight]} 
					onPress ={this.viewDetails.bind(this, material.name)} 
				>
					<Text style={styles.backTextWhite}>View Details</Text>
				</TouchableOpacity>
			</View>    
		)
	}

	render() {
		return (
			<View>
				<Text> MaterialListPage </Text>
				<SwipeListView
					enableEmptySections = {true}
					dataSource={this.state.materials}
					renderRow = { material => (this._renderRow(material))} 
					renderHiddenRow={ material => (this._renderHiddenRow(material))}
					rightOpenValue={-75} />

				<Picker
					ref={picker => this.picker = picker}
					style={{height: 120}}
					pickerData={this.state.pickerData}
					pickerTitle = {this.state.pickerTitle}
					pickerCancelBtnText= "Undo"
					pickerBtnText= "Save"
					selectedValue={this.state.selectedValue}
					onPickerDone={(pickedValue) => {
						MaterialCartActions.AddItem(this.state.pickerTitle, pickedValue);
					}} />
			</View>
		);
	}
});


