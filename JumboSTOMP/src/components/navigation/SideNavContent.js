import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
});

const SideNavContent = (props, context) => {
  const drawer = context.drawer;
  return (
    <View style={[styles.container, props.sceneStyle ]}>
      <Button onPress={() => { Actions.AccountIndex(); }}>Account Info</Button>
      <Button onPress={() => { Actions.MaterialIndex(); }}>Materials</Button>
    </View>
  );
};

SideNavContent.contextTypes = contextTypes;
SideNavContent.propTypes = propTypes;

export default SideNavContent;