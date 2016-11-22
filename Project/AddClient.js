/**
 * Created by Darius on 11/7/2016.
 */
'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import * as Progress from 'react-native-progress';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Navigator,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
class AddClient extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            email:'',
            age:'',
            country:'',
            phone:'',
            firstname:'',
            lastname:''
        }
    }
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
    _AddClient() {
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let email = this.state.email;
        let age = this.state.age;
        let phone = this.state.phone;
        let country = this.state.country;
        if(firstname==''){
            ToastAndroid.show('Firstname required !', ToastAndroid.SHORT);
            return;
        }
        if(lastname==''){
            ToastAndroid.show('Lastname required !', ToastAndroid.SHORT);
            return;
        }
        if(email==''){
            ToastAndroid.show('Email required !', ToastAndroid.SHORT);
            return;
        }
        if(phone==''){
            ToastAndroid.show('Phone required !', ToastAndroid.SHORT);
            return;
        }
        if(country==''){
            ToastAndroid.show('Country required !', ToastAndroid.SHORT);
            return;
        }
        this.setState({
            visible:!this.state.visible
        });
        let serverUrl='http://192.168.15.102:3000';
        setTimeout(()=>{
            fetch(serverUrl+'/AddClient?firstname=' + firstname +
                            '&lastname=' + lastname +
                            '&email=' + email +
                            '&age=' + age +
                            '&phone=' + phone +
                            '&country=' + country +
                            '&userid=' +1
                , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.valid ==1) {
                        this.setState({
                            visible:!this.state.visible
                        });
                        ToastAndroid.show('Client added with successfull...', ToastAndroid.SHORT);
                    }
                    else {
                        this.setState({
                            visible:!this.state.visible
                        });
                        ToastAndroid.show('Client already exist...', ToastAndroid.SHORT);
                    }
                })
        },2000);
    }
    renderScene(route, navigator) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Progress.CircleSnail size={70} animating={this.state.visible}/>
                <TextInput
                    style={{width: 200}}
                    placeholder="Firstname"
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                />
                <TextInput
                    style={{width: 200}}
                    placeholder="Lastname"
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                />
                <TextInput
                    style={{width: 200}}
                    placeholder="Email"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    style={{width: 200}}
                    placeholder="Age"
                    onChangeText={(age) => this.setState({age})}
                    value={this.state.age}
                />
                <TextInput
                    style={{width: 200}}
                    placeholder="Phone"
                    onChangeText={(phone) => this.setState({phone})}
                    value={this.state.phone}
                />
                <TextInput
                    style={{width: 200}}
                    placeholder="Country"
                    onChangeText={(country) => this.setState({country})}
                    value={this.state.country}
                />
                <Button
                    style={{fontSize: 20, color: 'green',backgroundColor:'pink'}}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this._AddClient()}>
                    Add Client
                </Button>
            </View>
        );
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
                Add client
            </Text>
        );
    }
};

module.exports = AddClient;