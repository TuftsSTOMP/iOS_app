/*
 *  SideNavContent.js
 *
 *  Author: Sam Heilbron
 *  Last Updated: 10-04-2016
 *
 *  The content of the Navigation Drawer which slides out from the left
 */

'use strict';

import React from 'react';
import {PropTypes} from "react";
import { Actions } from 'react-native-router-flux';
import AuthService from '../../services/AuthService';
import StompApiStore from '../../stores/StompApiStore';

import {
	StyleSheet, 
	View, 
	TouchableOpacity
} from "react-native";
import { 
  	Text,
  	List,
  	ListItem,
  	Icon
} from 'native-base';

const contextTypes = {
 	drawer: React.PropTypes.object,
};

const propTypes = {
    firstName: React.PropTypes.string
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
  	},
    userName: {
      marginBottom: 30,
      marginTop: 30,
      alignItems: "center"
    }
});

const SideNavContent = (props, context) => {
  	const drawer = context.drawer;
  	const {firstName} = props

  	return (
    	<View style={styles.background}>
        	<TouchableOpacity style={styles.userName}>
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