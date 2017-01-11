/*
 *	CalendarPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 01-10-2017
 *
 *	The page to handle users selecting a return date for checkout
 */

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker',
import Theme from '../themes/version1';
import AuthenticatedComponent from './AuthenticatedComponent';

const contextTypes = {
  	drawer: React.PropTypes.object,
};

var styles = StyleSheet.create({
	container: {
    	marginTop: 30,
  	},
  	selectedDate: {
    	backgroundColor: 'rgba(0,0,0,0)',
    	color: '#000',
  	}
});

class CalendarPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			 date: new Date()
		}
	}

	onDateChange(date) {
    	this.setState({ date: date });
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
            	<Content>
					<View style={styles.container}>
        				<CalendarPicker 
          					selectedDate={this.state.date}
          					onDateChange={this.onDateChange}
          					screenWidth={Dimensions.get('window').width}
          					selectedBackgroundColor={'#5ce600'} />
        				<Text style={styles.selectedDate}> Date: { this.state.date.toString() } </Text>
      				</View>
				</Content>
			</Container>
		);
	}
}

CalendarPage.contextTypes = contextTypes;
export default AuthenticatedComponent(CalendarPage);