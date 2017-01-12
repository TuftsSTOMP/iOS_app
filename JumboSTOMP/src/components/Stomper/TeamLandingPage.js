/*
 *	TeamLandingPage.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	The Team Landing page.
 */
'use strict';

import React, { Component } from 'react';
import {
 	StyleSheet,
  	View
} from 'react-native';
import { 
	Container, 
	Content, 
	Text,
	List,
	ListItem,
	Header,
	Button,
	Title
} from 'native-base';

import Theme from '../../themes/version1';
import {Actions} from 'react-native-router-flux';
import AuthenticatedComponent from '../AuthenticatedComponent';



/*
Look to refactor and add this to the AuthenticatedComponent HOC so that it isn't required
for each new component. Leave like this for now though because it works
*/
const contextTypes = {
  drawer: React.PropTypes.object,
};



class TeamLandingPage extends Component {
	constructor(props) {
		super(props)
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
					<List>
						<ListItem>
							<Text>Team Checked Out Total</Text>
						</ListItem>
					</List>
				</Content>
		  	</Container>
		);
  	}
}

TeamLandingPage.contextTypes = contextTypes;
export default AuthenticatedComponent(TeamLandingPage);