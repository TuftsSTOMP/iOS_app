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
import AuthenticatedComponent from './AuthenticatedComponent';

import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import { SwipeListView } from 'react-native-swipe-list-view';


import StompApiService from '../services/StompApiService';
import StompApiConstants from '../constants/StompApiConstants';
import StompApiStore from '../stores/StompApiStore';

import MaterialCartActions from '../actions/MaterialCartActions';
import MaterialCartStore from '../stores/MaterialCartStore';


var styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFD',
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginRight: 15,
    marginLeft: 15
  },
  postDetailsContainer:{
    flex: 1,
  },
  postTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginRight: 10,
    color: '#DA552F'
  },
  commentorDetails: {
    fontSize: 12,
    marginBottom: 5,
    color: 'gray'
  },
  postDetailsLine: {
    fontSize: 12,
    marginRight: 10,
    color: 'gray',
  },
  childPostDetailsLine: {
    fontSize: 12,
    marginRight: 10,
    marginBottom: 10,
    color: 'gray'
  },
  postChildrenDetails: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 5,
    color: 'gray',
    textAlign: 'right',
    flex: 1
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  icon: {
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    width: 12,
    height: 12
  },
  pageContainer: {
  	flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

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
  }
});


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default AuthenticatedComponent(class MaterialListPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			materials : ds.cloneWithRows([])
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


	_renderRow(material) {
		return (
 			<View style={styles.container}>
        <TouchableOpacity onPress ={() => {
            MaterialCartStore.hasMaterial(material.name) ? 
              MaterialCartActions.RemoveItem(material.name) :
              MaterialCartActions.AddItem(material.name, 0);
        }}>
        	 <View style={[styles.postDetailsContainer, styles.rowFront]}>
                <Text style={styles.postTitle}>{ material.name} </Text>
          			<Text style={styles.commentorDetails}>| maximum quantity: {material.max_quantity} |</Text>
          			<View style={styles.separator} />
        		</View>
        </TouchableOpacity>
      </View>
    );
	}


	render() {
		return (
			<View>
				<Text>
				 MaterialListPage
				</Text>
        <SwipeListView
            enableEmptySections = {true}
            dataSource={this.state.materials}
            renderRow = {this._renderRow} 
            renderHiddenRow={ material => (
                <View style={styles.rowBack}>
                    <TouchableOpacity 
                        style={[styles.backRightBtn, styles.backRightBtnRight]} 
                        onPress ={this.viewDetails.bind(this, material.name)} 
                    >
                      <Text style={styles.backTextWhite}>View Details</Text>
                    </TouchableOpacity>
                </View>
            )}
            rightOpenValue={-75} />
            <Button onPress = {() => {console.log(MaterialCartStore.getCart())}}> Show cart </Button>
    </View>
		);
	}
});


