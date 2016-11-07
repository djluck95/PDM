'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity
} from 'react-native';
class RegisterPage extends Component {
  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#258c29'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
    renderScene(route, navigator) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Button style={{backgroundColor: 'yellow', padding: 10}}
                                    onPress={this.gotoNext.bind(this)}>
                    <Text style={{backgroundColor: 'yellow', color: 'green',fontSize:18}}>About Application</Text>
                </Button>
            </View>
        );
    }
    gotoNext() {
        this.props.navigator.push({
            id: 'AboutAppPage',
            name: 'AboutApp',
        });
    }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <Button style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
           Back
        </Text>
      </Button>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
        <Text style={{color: 'white', marginLeft: 80,marginTop:10,marginBottom:10, fontSize: 16}}>
          Register
        </Text>
    );
  }
};

module.exports = RegisterPage;
