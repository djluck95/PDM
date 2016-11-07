/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
var BeginPage = require('./BeginPage');
var LoginPage = require('./LoginPage');
var RegisterPage = require('./RegisterPage');
var AboutAppPage=require('./AboutAppPage');
var AfterLogin=require('./AfterLogin');
var AddClient=require('./AddClient');
export default class Project extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{id: 'BeginPage', name: 'Index'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }} />
        );
    }
    renderScene(route, navigator) {
        var routeId = route.id;
        switch(routeId){
            case 'BeginPage':
                return (
                    <BeginPage
                        navigator={navigator} />
                );
                break;
            case 'LoginPage':
                return (
                    <LoginPage
                        navigator={navigator} />
                );
                break;
            case 'RegisterPage':
                return (
                    <RegisterPage
                        navigator={navigator} />
                );
                break;
            case 'AboutAppPage':
                return (
                    <AboutAppPage
                        navigator={navigator} />
                );
                break;
            case 'AfterLogin':
                return (
                    <AfterLogin
                        navigator={navigator} userID={route.passProps.id} username={route.passProps.username} firstname={route.passProps.firstname} lastname={route.passProps.lastname}/>
                );
                break;
            case 'AddClient':
                return (
                    <AddClient
                        navigator={navigator}/>
                );
                break;
            default:
                return this.noRoute(navigator);
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Project', () => Project);
