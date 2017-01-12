/*
 *	index.ios.js
 *
 *	Author: Sam Heilbron
 *	Last Updated: 10-04-2016
 *
 *	JumboSTOMP React Native App
 *	
 *	Application used to handle all STOMP related activities at Tufts University.
 *	See Docs for further information about functionality
 *
 *	Github: https://github.com/TuftsSTOMP/iOS_app
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { 
	Scene, 
	Router,
	Modal, 
	Actions, 
	Reducer, 
	ActionConst 
} from 'react-native-router-flux';

/* FULL LIST OF PAGES IN APP STRUCTURE  */
import LoginPage from './src/components/LoginPage';

import AccountPage from './src/components/Stomper/AccountPage';
import EditAccountPage from './src/components/Stomper/EditAccountPage';
import CheckInPage from './src/components/Stomper/CheckInPage';
import CheckOutPage from './src/components/Stomper/CheckOutPage';
import MaterialListPage from './src/components/Stomper/MaterialListPage';
import MaterialDetailPage from './src/components/Stomper/MaterialDetailPage';
import MaterialTransactionInfoPage from './src/components/Stomper/MaterialTransactionInfoPage';
import CalendarPage from './src/components/Stomper/CalendarPage';
import TeamCheckedOutListPage from './src/components/Stomper/TeamCheckedOutListPage';

import GuestCheckOutPage from './src/components/Guest/GuestCheckOutPage';
import GuestMaterialListPage from './src/components/Guest/GuestMaterialListPage';
import GuestMaterialDetailPage from './src/components/Guest/GuestMaterialDetailPage';

/* NAVIGATION DRAWER COMPONENTS */
import StomperNavigationDrawer from './src/components/navigation/StomperNavigationDrawer';
import GuestNavigationDrawer from './src/components/navigation/GuestNavigationDrawer';
const navigationImageSrc = <Icon name='ios-menu'/>

/* TAB ICONS */
class ListIcon extends Component {
	render(){ return ( <Icon name='ios-list'/>);}
}

class CartIcon extends Component {
	render(){ return ( <Icon name='ios-cart'/>);}
}

class AccountIcon extends Component {
	render(){ return ( <Icon name='ios-person'/>);}
}

/* TAB STYLES */
const styles = StyleSheet.create({
	 tabBarStyle: {
    	backgroundColor: '#eee',
  	},
  	tabBarSelectedItemStyle: {
    	backgroundColor: '#ddd',
  	}
})

/* APP ARCHITECTURE */
const scenes = Actions.create(
	<Scene key="modal" component={Modal} >
 	<Scene key="root">
		<Scene key="Login" component={LoginPage} hideNavBar={true} title="Login" type={ActionConst.REPLACE} />

		<Scene key="StomperAppContent" component={StomperNavigationDrawer} tabs={false} open={false} type={ActionConst.REPLACE}>
			<Scene key="MaterialIndex" initial tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
				<Scene key="MaterialWrapper" title="Materials" icon={ListIcon} hideNavBar={true}>
					<Scene key="MaterialListPage" component={MaterialListPage} title="List of Materials" navImageSrc={navigationImageSrc}/>
					<Scene key="MaterialDetailPage" component={MaterialDetailPage} title="Material Detail" />
					<Scene key="MaterialTransactionInfoPage" component={MaterialTransactionInfoPage} title="Material Transactions" />
				</Scene>
				<Scene key="CheckInWrapper" icon={AccountIcon} hideNavBar={true}>
					<Scene key="CheckIn" title="Check In" component={CheckInPage} navImageSrc={navigationImageSrc}/>
				</Scene>
				<Scene key="CheckOutWrapper" icon={CartIcon} hideNavBar={true}>
					<Scene key="CheckOut" title="Check Out" component={CheckOutPage} navImageSrc={navigationImageSrc}/>
					<Scene key="CheckOutDate" title="Return Date" component={CalendarPage} direction="vertical"/>
				</Scene>
			</Scene>
			<Scene key="TeamIndex" tabs={false} title="Team" hideNavBar={true}>
				<Scene key="TeamCheckedOutListPage" component={TeamCheckedOutListPage} title="Team Checked Out List" navImageSrc={navigationImageSrc}/>
			</Scene>
			<Scene key="AccountIndex" tabs={false} title="Account" hideNavBar={true}>
				<Scene key="AccountPage" component={AccountPage} title="My Account" navImageSrc={navigationImageSrc}/>
				<Scene key="EditAccountPage" component={EditAccountPage} title="Edit Account" direction="vertical"/>
			</Scene>
		</Scene>

		<Scene key="GuestAppContent" component={GuestNavigationDrawer} tabs={false} open={false} type={ActionConst.REPLACE}>
			<Scene key="GuestIndex" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
				<Scene key="GuestListWrapper" icon={ListIcon} hideNavBar={true}>
					<Scene key="GuestMaterialListPage" component={GuestMaterialListPage} title="List of Materials" navImageSrc={navigationImageSrc}/>
					<Scene key="GuestMaterialDetailPage" component={GuestMaterialDetailPage} title="Material Detail" />
				</Scene>
				<Scene key="GuestCheckoutWrapper" icon={CartIcon} hideNavBar={true}>
					<Scene key="GuestCart" title="Cart" component={GuestCheckOutPage} navImageSrc={navigationImageSrc}/>
				</Scene>
			</Scene>
		</Scene>

  	</Scene> 
  	</Scene>
);


const reducerCreate = params=>{
	const defaultReducer = Reducer(params);
	return (state, action)=>{
		//DEBUG: console.log("ACTION:", action);
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