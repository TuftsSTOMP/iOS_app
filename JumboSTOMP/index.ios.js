/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	StyleSheet
} from 'react-native';
import { 
	Button,
	Icon
} from 'native-base';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

/* FULL LIST OF PAGES IN APP STRUCTURE  */
import LoginPage from './src/components/LoginPage';
import AccountPage from './src/components/AccountPage';
import TransactionPage from './src/components/TransactionPage';
import CheckInPage from './src/components/CheckInPage';
import CheckOutPage from './src/components/CheckOutPage';
import MaterialListPage from './src/components/MaterialListPage';
import MaterialDetailPage from './src/components/MaterialDetailPage';

//tab display
// style ={{color: this.props.selected ? 'red' :'black'}} 
class MenuIcon extends React.Component {
	render(){ return ( <Icon name='ios-menu'/>);}
}

class CartIcon extends React.Component {
	render(){ return ( <Icon name='ios-cart' />);}
}

class AccountIcon extends React.Component {
	render(){ return ( <Icon name='ios-person'/>);}
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  }
});

/* APP ARCHITECTURE */
const scenes = Actions.create(
  <Scene key="root">
	<Scene key="Login" component={LoginPage} hideNavBar={true} title="Login" type={ActionConst.REPLACE} />
	
	<Scene key="HomeTabbar" tabs={true}  tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
		<Scene key="AccountPage" component={AccountPage} title="My Account" hideNavBar={true} icon={AccountIcon}/>
		<Scene key = "TransactionWrapper" title="Transaction" hideNavBar={true} icon={CartIcon}>
			<Scene key="Transaction" component={TransactionPage} title="Transaction" icon={CartIcon}/>
		</Scene>
		<Scene key="MaterialWrapper" title="Materials" icon={MenuIcon} hideNavBar={true}>
			<Scene key="MaterialListPage" component={MaterialListPage} title="Materials" />
			<Scene key="MaterialDetailPage" component={MaterialDetailPage} title="Material Detail" />
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