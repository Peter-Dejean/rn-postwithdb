import React, { Component } from 'react'
import { Text, TextInput, View, Button, StyleSheet } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation';
import * as firebase from 'firebase';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

    };

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {

        }, (error) => {

        });
    }
    onForgotPasswordPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: "ForgotPassword"})
            ]
        });
        this.props.navigation.dispatch(navActions);
    }
    onCreateAccountPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: "Signup"})
            ]
        });
        this.props.navigation.dispatch(navActions);
        
        //this.props.navigation.navigate("Signup")
    }
 
    render() {
        return (
            <View  style={{paddingTop:50, alignItems:"center"}}>
                <Text>Login</Text>
                <TextInput style={{width:200, height:35, borderWidth:1}} 
                    value={this.state.email} 
                    onChangeText={(text) => {this.setState({email: text}) }}/>
                <TextInput style={{width:200, height:35, borderWidth:1}} 
                    value={this.state.password} 
                    onChangeText={(text) => {this.setState({password: text}) }}/>
                <View style={StyleSheet.btnContainer}>
                    <View style={{marginBottom: 1}}>
                        <Button title="Login" onPress={this.onLoginPress} />
                    </View>
                    <View style={{marginBottom: 1}}>
                        <Button title="Sign up" onPress={this.onCreateAccountPress} />
                    </View>
                    <Button title="Forgot password" onPress={this.onForgotPasswordPress} />
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    }

})
export default LoginScreen
