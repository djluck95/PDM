'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import * as Progress from 'react-native-progress';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible:false,
            username: '',
            password:''
        };
    }
    render() {
       return (
         <Navigator
            renderScene={this.renderScene.bind(this)}
            navigationBar={
               <Navigator.NavigationBar style={{backgroundColor: '#1d8427', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
            } />
       );
    }
    _login() {
        this.setState({
            visible:!this.state.visible
        });
        let username = this.state.username;
        let password = this.state.password;
        let serverUrl='http://192.168.15.103:3000';
        setTimeout(()=>{
            fetch(serverUrl+'/Login?username=' + username + '&password=' + password, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.data != null) {
                    this.setState({
                        visible:!this.state.visible
                    });
                    var navigator = this.props.navigator;
                    navigator.push({
                        id:'AfterLogin',
                        name:'AfterLogin',
                        passProps:{
                            id:responseJson.data[0].UserID,
                            username:responseJson.data[0].Username,
                            firstname:responseJson.data[0].FirstName,
                            lastname:responseJson.data[0].LastName
                        }
                    });
                }
                else {
                    this.setState({
                        visible:!this.state.visible
                    });
                    ToastAndroid.show('Login failed...', ToastAndroid.SHORT);
                }
            })
        },2000);
    }
    renderScene(route, navigator) {
          let pic = {
              uri: 'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/256/shop-icon.png'
          };
          return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Progress.CircleSnail size={70} animating={this.state.visible}/>
              <Image source={pic} style={{width: 250, height: 190}}/>
              <TextInput
                  style={{width: 200}}
                  placeholder="Username"
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}
              />
              <TextInput
                  secureTextEntry={true}
                  style={{width: 200}}
                  placeholder="Password"
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
              />
              <Button
                  style={{fontSize: 20, color: 'green',backgroundColor:'pink'}}
                  styleDisabled={{color: 'red'}}
                  onPress={() => this._login()}>
                  Log in
              </Button>
              <Button
                 onPress={this.gotoNext.bind(this)}>
                 <Text style={{backgroundColor: 'yellow', color: 'black',fontSize:18,marginTop:50}}>Register</Text>
              </Button>

            </View>
          );
      }
      gotoNext() {
        this.props.navigator.push({
          id: 'RegisterPage',
          name: 'Register'
        });
      }
}
var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
        <Text style={{color: 'white', marginLeft: 80,marginTop:10,marginBottom:10, fontSize: 16}}>
          Login
        </Text>
    );
  }
};

module.exports = LoginPage;
