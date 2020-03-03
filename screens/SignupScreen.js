import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import * as firebase from 'firebase';

class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            email: "",
            password: "",
            passwordConfirm: ""        
        };

    }

    
    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message + '  email: '+this.state.email); });
    }
 
    onBackToLoginPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: "Login"})
            ]
        });
        this.props.navigation.dispatch(navActions);       
    };

    render() {
        return (
            <View  style={{paddingTop:50,    alignItems:"center"}}>
                <Text>Sign up</Text>
                <TextInput style={{width:200, height:35, borderWidth:1}} 
                    value={this.state.email} 
                    onChangeText={(text) => {this.setState({email: text})}}/>
                <TextInput style={{width:200, height:35, borderWidth:1}} 
                    value={this.state.password} 
                    onChangeText={(text) => {this.setState({password: text}) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false} />
                <TextInput style={{width:200, height:35, borderWidth:1}} 
                    value={this.state.passwordConfirm} 
                    onChangeText={(text) => {this.setState({passwordConfirm: text}) }}
                    placeholder="Password (confirm)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false} />
                <View style={{marginBottom: 1}}>
                    <Button title="Sign up" onPress={this.onSignupPress} /> 
                </View>
                <Button title="Back to login" onPress={this.onBackToLoginPress} />
            </View>        
        );  
    }
}

const style = StyleSheet.create({

});

export default SignupScreen