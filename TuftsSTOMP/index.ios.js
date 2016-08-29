'use strict';


var React = require('react');
var Native = require('react-native');
var LoginPage = require('./App/LoginPage');


const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});


class TuftsSTOMP extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
      </View>
    );
  }
}

React.AppRegistry.registerComponent('TuftsSTOMP', () => TuftsSTOMP);
