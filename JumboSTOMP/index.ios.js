/**
 * JumboSTOMP React Native App
 * Creator: Sam Heilbron
 * [Link to Github]
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
	Image,
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
const navigationImageSrc = <Icon name='ios-menu'/>

const styles = StyleSheet.create({
	 tabBarStyle: {
    	backgroundColor: '#eee',
  	},
  	tabBarSelectedItemStyle: {
    	backgroundColor: '#ddd',
  	}
	
})


//tab display
class ListIcon extends Component {
	render(){ return ( <Icon name='ios-list'/>);}
}

class CartIcon extends Component {
	render(){ return ( <Icon name='ios-cart' />);}
}

class AccountIcon extends Component {
	render(){ return ( <Icon name='ios-person'/>);}
}


/* APP ARCHITECTURE */

const scenes = Actions.create(
	<Scene key="modal" component={Modal} >
 	<Scene key="root">
		<Scene key="Login" component={LoginPage} hideNavBar={true} title="Login" type={ActionConst.REPLACE} />

		<Scene key="AppContent" component={NavigationDrawer} tabs={false} open={false} direction="vertical">

			<Scene key="MaterialIndex" initial tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
				<Scene key="MaterialWrapper" title="Materials" icon={ListIcon} hideNavBar={true}>
					<Scene key="MaterialListPage" component={MaterialListPage} title="List of Materials" navImageSrc={navigationImageSrc}/>
					<Scene key="MaterialDetailPage" component={MaterialDetailPage} title="Material Detail" />
				</Scene>
				<Scene key="CheckInWrapper" icon={AccountIcon} hideNavBar={true}>
					<Scene key="CheckIn" title="Check In" component={CheckInPage} navImageSrc={navigationImageSrc}/>
				</Scene>
				<Scene key="CheckOutWrapper" icon={CartIcon} hideNavBar={true}>
					<Scene key="CheckOut" title="Check Out" component={CheckOutPage} navImageSrc={navigationImageSrc}/>
				</Scene>
			</Scene>
			<Scene key="AccountIndex" tabs={false} title="Account" hideNavBar={true}>
				<Scene key="AccountPage" component={AccountPage} title="My Account" navImageSrc={navigationImageSrc}/>
				<Scene key="EditAccountPage" component={EditAccountPage} title="Edit Account" direction="vertical"/>
			</Scene>

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