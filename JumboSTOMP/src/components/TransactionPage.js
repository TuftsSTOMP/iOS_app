import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text
} from 'react-native';
import AuthenticatedComponent from './AuthenticatedComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import CheckInPage from './CheckInPage';
import CheckOutPage from './CheckOutPage';

export default AuthenticatedComponent(class TransactionPage extends React.Component {
  render() {
    return (
    <ScrollableTabView>
        <CheckInPage tabLabel="Check In" />
        <CheckOutPage tabLabel="Check Out" />
    </ScrollableTabView>
    );
  }
});