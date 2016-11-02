import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Card, CardItem} from 'native-base';
import Button from 'react-native-button';
import { Actions, ActionConst } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

function visitAccountInfo(drawer) {
    drawer.close();
    console.log("visit account info");
    Actions.AccountIndex();
}

function visitMaterialIndex(drawer) {
    console.log("visit material index");
    //drawer.close()
    Actions.MaterialIndex({type: ActionConst.FOCUS});

}

const SideNavContent = (props, context) => {
  const drawer = context.drawer;

  return (
    <View>
        <Card>
          <CardItem>              
            <Button onPress={() => {visitAccountInfo(drawer)}}>Account Info</Button>
          </CardItem>
          <CardItem>              
            <Button onPress={() => {visitMaterialIndex(drawer)}}>Materials</Button>
          </CardItem>
        </Card>
    </View>
  );
};

SideNavContent.contextTypes = contextTypes;

export default SideNavContent;