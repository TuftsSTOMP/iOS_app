import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import { Actions, ActionConst } from 'react-native-router-flux';
import AuthService from '../../services/AuthService';
import StompApiStore from '../../stores/StompApiStore';
import { 
  Container, 
  Content, 
  Text,
  List,
  ListItem,
  Header,
  Button,
  Spinner,
  Card,
  CardItem,
  Icon,
  Title
} from 'native-base';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
    firstName: React.PropTypes.String
  };

var styles = StyleSheet.create({
  background: {
    backgroundColor: "#292a42",
    flex: 1,
    opacity: .7,
  },
  menuNames: {
    color: "white",
    opacity: 1.0
  },
  logout: {
    backgroundColor: "black",
    alignItems: "center",
    padding:10,
    marginTop: 40
  }

});


const SideNavContent = (props, context) => {
  const drawer = context.drawer;
  const {firstName} = this.props

  return (
    <View style={styles.background}>
        <TouchableOpacity style={styles.logout} onPress={AuthService.logout}>
              <Text style={styles.menuNames}> Hi {firstName} </Text>
            </TouchableOpacity>

        <List>
          <ListItem>
            <TouchableOpacity onPress={() => {drawer.close(); Actions.AccountIndex();}}>
              <Text style={styles.menuNames}> Account Info </Text>
            </TouchableOpacity>
          </ListItem>
          
          <ListItem>
            <TouchableOpacity onPress={() => {drawer.close(); Actions.MaterialIndex();}}>
              <Text style={styles.menuNames}> Materials </Text>
            </TouchableOpacity>
          </ListItem>
       </List>

            <TouchableOpacity style={styles.logout} onPress={AuthService.logout}>
              <Text style={styles.menuNames}> Logout </Text>
            </TouchableOpacity>



    </View>
  );
};

SideNavContent.contextTypes = contextTypes;
SideNavContent.propTypes = propTypes;
export default SideNavContent;