/**
 * JumboSTOMP React Native App
 * Creator: Sam Heilbron
 * [Link to Github]
 *  @flow
 **/

import React, {Component} from 'react';
import {
	AppRegistry,
	Text,
	StyleSheet,
	Navigator
} from 'react-native';

import { 
	Button,
	Icon
} from 'native-base';

import { Scene, Router, Route, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';

/* FULL LIST OF PAGES IN APP STRUCTURE  */
import LoginPage from './src/components/LoginPage';
import AccountPage from './src/components/AccountPage';
import EditAccountPage from './src/components/EditAccountPage';
import TransactionPage from './src/components/TransactionPage';
import CheckInPage from './src/components/CheckInPage';
import CheckOutPage from './src/components/CheckOutPage';
import MaterialListPage from './src/components/MaterialListPage';
import MaterialDetailPage from './src/components/MaterialDetailPage';

import NavigationDrawer from './src/components/navigation/NavigationDrawer'


const styles = StyleSheet.create({
	 tabBarStyle: {
    	backgroundColor: '#eee',
  	},
  	tabBarSelectedItemStyle: {
    	backgroundColor: '#ddd',
  	}
	
})

//tab display
class MenuIcon extends Component {
	render(){ return ( <Icon name='ios-menu'/>);}
}

class CartIcon extends Component {
	render(){ return ( <Icon name='ios-cart' />);}
}

class AccountIcon extends Component {
	render(){ return ( <Icon name='ios-person'/>);}
}


/* APP ARCHITECTURE */

const scenes = Actions.create(
 	<Scene key="root">
		<Scene key="Login" component={LoginPage} hideNavBar={true} title="Login" type={ActionConst.REPLACE} />

		<Scene key="AppContent" component={NavigationDrawer} open={false} wrapRouter={true}>

			<Scene key="AccountIndex" tabs={false} direction="vertical">
				<Scene key = "AccountWrapper" title="Account" hideNavBar={true} icon={AccountIcon}>
					<Scene key="AccountPage" component={AccountPage} title="My Account"/>
					<Scene key="EditAccountPage" component={EditAccountPage} title="Edit Account"/>
				</Scene>
			</Scene>
			<Scene key="MaterialIndex" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
				<Scene key="MaterialWrapper" title="Materials" icon={MenuIcon} hideNavBar={true}>
					<Scene key="MaterialListPage" component={MaterialListPage} title="Materials" />
					<Scene key="MaterialDetailPage" component={MaterialDetailPage} title="Material Detail" />
				</Scene>
				<Scene key="CheckIn" component={CheckInPage} title="CheckIn" icon={AccountIcon} hideNavBar={true}/>
				<Scene key="CheckOut" component={CheckOutPage} title="CheckOut" icon={CartIcon} hideNavBar={true}/>
			</Scene>

		</Scene>

  	</Scene> 
);


const reducerCreate = params=>{
	const defaultReducer = Reducer(params);
	return (state, action)=>{
		console.log("ACTION:", action);
		return defaultReducer(state, action);
	}
};


class JumboSTOMP extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router {...this.state} createReducer={reducerCreate} scenes={scenes} />
		)
	}
}

AppRegistry.registerComponent('JumboSTOMP', () => JumboSTOMP);