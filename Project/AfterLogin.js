/**
 * Created by Darius on 11/6/2016.
 */
'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Navigator,
    TouchableOpacity
} from 'react-native';
class AfterLogin extends Component {

    constructor(props){
        super(props);
        const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
        this.state={
            jsonUrl:'http://192.168.15.103:3000/Myclients?userId='+1,
            dataSource:ds.cloneWithRows(['n'])
        };
    }
    componentDidMount(){
        this.loadJsonData();
    }
    loadJsonData(){
        fetch(this.state.jsonUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(responseJson)
            });
        })
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
    renderRow(rowData){
        return (
            <View>
                <Text style={styles.fullname}>Full Name: {rowData.FirstName} {rowData.LastName}</Text>
                <Text>Email: {rowData.Email}</Text>
                <Text>Age: {rowData.Age}</Text>
                <Text>Phone: {rowData.Phone}</Text>
                <Text>Country: {rowData.Country}</Text>
                <Text>{"\n"}</Text>
            </View>
        );
    }
    renderScene(route, navigator) {
        return (
            <View style={{flex:2, alignItems: 'center', justifyContent:'center',marginTop:100}}>
                <Text style={{color:'black',fontSize:18}}>User Details</Text>
                <Text style={styles.details}>Username: {this.props.username}</Text>
                <Text style={styles.details}>FirstName: {this.props.firstname}</Text>
                <Text style={styles.details}>LastName: {this.props.lastname}</Text>
                <Text>{"\n"}</Text>
                <Text style={{color:'black',fontSize:18}}>List of Clients</Text>
                <ListView dataSource={this.state.dataSource}
                                renderRow={this.renderRow}
                          />
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
                    Logout
                </Text>
            </Button>
        );
    },
    RightButton(route, navigator, index, navState) {
        return (
            <Button style={{flex: 1, justifyContent: 'center'}}
                    onPress={() => navigator.parentNavigator.push({
                        id:'AddClient',
                        name:'AddClient'
                    })}>
                <Text style={{color: 'white', margin: 10,}}>
                    Add client
                </Text>
            </Button>
        );
    },
    Title(route, navigator, index, navState) {
        return (
            <Text style={{color: 'white', marginLeft: 80,marginTop:10,marginBottom:10, fontSize: 16}}>
                Welcome
            </Text>
        );
    }
};
var styles=StyleSheet.create({
    details:{
        color:"#656565"
    },
    fullname:{
        backgroundColor:'yellow'
    }
});
module.exports = AfterLogin;