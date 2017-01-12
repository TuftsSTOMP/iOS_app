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
  View
} from 'react-native';
import { 
	Container, 
	Content, 
	Text,
	Header,
	Button,
	Footer,
	Title
} from 'native-base';

import CalendarPicker from 'react-native-calendar-picker';
import Theme from '../../themes/version1';
import AuthenticatedComponent from '../AuthenticatedComponent';
import {Actions} from 'react-native-router-flux';

import MaterialCartStore from '../../stores/MaterialCartStore';
import MaterialCartActions from '../../actions/MaterialCartActions';

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
			 returnDate: new Date()
		}

		this.changeReturnDateListener = this._onReturnDateChange.bind(this);
	}

	componentWillMount() {
		MaterialCartStore.addChangeListener(this.changeReturnDateListener);
	}

	componentWillUnmount() {
		MaterialCartStore.removeChangeListener(this.changeReturnDateListener);
	}

	_onReturnDateChange() {
		this.setState({returnDate: this._getReturnDate()});
	}

	_getReturnDate() {
		return MaterialCartStore.getReturnDate();
	}

	onDateChange(newReturnDate) {
		this.setState({returnDate: newReturnDate});
  	}

  	_submitReturnDate() {
  		MaterialCartActions.UpdateCheckOutReturnDate(this.state.returnDate);
  		Actions.pop();
  	}

	render() {
		return (
			<Container theme={Theme}>
				<Header>
					<Button transparent onPress={Actions.pop}>
                 		<Text> Cancel </Text>
                 	</Button>
                 	<Title>{this.props.title}</Title>
                </Header>
            	<Content>
					<View style={styles.container}>
        				<CalendarPicker 
          					selectedDate={this.state.returnDate}
          					onDateChange={this.onDateChange.bind(this)}
          					screenWidth={Dimensions.get('window').width}
          					selectedBackgroundColor={'#5ce600'} />
      				</View>

      				<Button block success onPress = {this._submitReturnDate.bind(this)}>
						<Text> Set as Return Date </Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default AuthenticatedComponent(CalendarPage);