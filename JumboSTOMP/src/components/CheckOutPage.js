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
  Button,
  ListView,
  TouchableOpacity
} from 'react-native';
import AuthenticatedComponent from './AuthenticatedComponent';

import { SwipeListView } from 'react-native-swipe-list-view';

import MaterialCartStore from '../stores/MaterialCartStore';
import MaterialCartActions from '../actions/MaterialCartActions';

import StompApiService from '../services/StompApiService';


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

export default AuthenticatedComponent(class CheckOutPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cart : ds.cloneWithRows(this._getMaterialCart())
    }

    this.changeMaterialCartListener = this._onMaterialCartChange.bind(this);

    console.log("Constructor cart", this.state.cart);
  }
  

  _getMaterialCart() {
    var materialCart = MaterialCartStore.getCart();
    var materialList = [];
    for(var key in materialCart){ materialList.push(materialCart[key]) }

    return materialList;
  }

  //All loads
  componentWillMount() {
    MaterialCartStore.addChangeListener(this.changeMaterialCartListener);
  }

  _onMaterialCartChange() {
    this.setState({cart : ds.cloneWithRows(this._getMaterialCart())});
  }

  componentWillUnmount() {
    MaterialCartStore.removeChangeListener(this.changeMaterialCartListener);
  }

  _removeMaterialFromCart(materialName) {
    MaterialCartActions.RemoveItem(materialName);
  }

  _submitCheckout() {
    var postData = new FormData();

    this._getMaterialCart().map(
      function(material) {
        postData.append( material.name.replace(' ', '_'), material.quantity );
      }
    );

    console.log("Post data", postData);
    
    StompApiService.checkoutMaterial_remove(this.props.serverName, this.props.jwt, postData);
  }

  _renderRow(material) {
    return (
        <View>
            <Text >Name: { material.name} </Text>
            <Text >Quantity: { material.quantity} </Text>
            <TouchableOpacity 
              onPress ={this._removeMaterialFromCart.bind(this, material.name)}
            >
              
              <Text style = {{color: 'red'}}>Remove Item</Text>
            </TouchableOpacity>
        </View>
      );
  }

  render() {
    let submitMessage;
    if(this.state.cart.getRowCount() == 0) {
        submitMessage = (
            <Text> There are no items in your cart </Text>
          );
    } else {
        submitMessage = (
            <TouchableOpacity
              onPress = {this._submitCheckout.bind(this)}
            >
              <Text style = {{color : 'blue'}}> Submit CheckOut </Text>
            </TouchableOpacity>
          );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
         MaterialListPage
        </Text>
        <Text style={styles.description}>
          **{this.props.userLoggedIn ? "logged in" : "not logged in"}**
        </Text>

        <SwipeListView
            enableEmptySections = {true}
            dataSource= {this.state.cart}
            renderRow = { material => (this._renderRow(material))} />

        <View>
          {submitMessage}
        </View>

      </View>
    );
  }
});