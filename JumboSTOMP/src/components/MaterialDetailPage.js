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
  ListView
} from 'react-native';
import AuthenticatedComponent from './AuthenticatedComponent';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';


import StompApiService from '../services/StompApiService';
import StompApiConstants from '../constants/StompApiConstants';
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

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default AuthenticatedComponent(class MaterialDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materialDetail : ds.cloneWithRows([])
    }

    this.changeStompApiDataListener = this._onStompApiDataChange.bind(this);
  }
  

  _getStompApiDataState() {
    return StompApiStore.getMaterialDetail();
  }



  //All loads
  componentWillMount() {
    StompApiStore.addChangeListener(this.changeStompApiDataListener);
  }

  _onStompApiDataChange() {
    var jsArr = JSON.parse(this._getStompApiDataState());
    this.setState({materialDetail : ds.cloneWithRows(jsArr)});
    console.log(this.state.materialDetail);
  }

  componentWillUnmount() {
    StompApiStore.removeChangeListener(this.changeStompApiDataListener);
  }


//[{"name":"Laptops","q_avail":"15","q_reserved":"0","q_removed":"0","max_checkout_q":"4","low_q_thresh":"0"}]
  _renderRow(material) {
    return (
      <View>
          <Text style={styles.postTitle}>Name: { material.name} </Text>
          <Text style={styles.postTitle}>q_avail: { material.q_avail} </Text>
          <Text style={styles.postTitle}>q_reserved: { material.q_reserved} </Text>
          <Text style={styles.postTitle}>q_removed: { material.q_removed} </Text>
          <Text style={styles.postTitle}>max_checkout_q: { material.max_checkout_q} </Text>
          <Text style={styles.postTitle}>low_q_thresh: { material.low_q_thresh} </Text>
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
         MaterialDetailPage
        </Text>
        <ListView
            enableEmptySections = {true}
            dataSource={this.state.materialDetail}
            renderRow = {this._renderRow} />
        <Button onPress={Actions.pop}>Back</Button>
      </View>
    );
  }
});